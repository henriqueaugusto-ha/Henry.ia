#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Relatório Comercial Diário — 20h Fortaleza
Uso: python3 relatorio-comercial-slack.py
"""

import urllib.request, urllib.error, json, re, sys
from datetime import datetime, timezone, timedelta

# Fuso Fortaleza = UTC-3
FORTALEZA = timezone(timedelta(hours=-3))
now = datetime.now(FORTALEZA)
today_str = now.strftime("%Y%m%d")
hora_str = now.strftime("%H:%M")
data_str = now.strftime("%d/%m/%Y")

# Token Slack
with open("/home/node/.openclaw/openclaw.json") as f:
    cfg = json.load(f)
SLACK_TOKEN = cfg["channels"]["slack"]["botToken"]
SLACK_CHANNEL = "C076WL3MY15"
CLICKUP_TOKEN = None

# 1Password para ClickUp
import subprocess, os
try:
    env = os.environ.copy()
    with open("/home/node/.openclaw/.env") as ef:
        for line in ef:
            if "OP_SERVICE_ACCOUNT_TOKEN" in line:
                env["OP_SERVICE_ACCOUNT_TOKEN"] = line.strip().split("=",1)[1]
    result = subprocess.run(
        ["/tmp/op", "item", "get", "ClickUp API Token", "--vault", "IA – OPERACIONAL", "--fields", "password", "--reveal"],
        capture_output=True, text=True, env=env
    )
    CLICKUP_TOKEN = result.stdout.strip()
except:
    pass

def fetch_ics(url, label):
    """Busca ICS e extrai eventos de hoje"""
    events = []
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Henry-IA/1.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read().decode("utf-8", errors="replace")
        
        # Parsear eventos
        blocks = re.findall(r"BEGIN:VEVENT(.*?)END:VEVENT", content, re.DOTALL)
        for block in blocks:
            dtstart = re.search(r"DTSTART[^:]*:(\d{8})", block)
            summary = re.search(r"SUMMARY:(.*?)(?:\r?\n(?!\s))", block, re.DOTALL)
            if dtstart and dtstart.group(1) == today_str and summary:
                title = summary.group(1).strip().replace("\r","").replace("\n ","")
                events.append({"label": label, "title": title})
    except Exception as e:
        pass
    return events

def fetch_slack_messages(limit=40):
    """Busca últimas mensagens do Slack Comercial"""
    payload = json.dumps({"channel": SLACK_CHANNEL, "limit": limit}).encode("utf-8")
    req = urllib.request.Request(
        "https://slack.com/api/conversations.history",
        data=payload,
        headers={"Authorization": f"Bearer {SLACK_TOKEN}", "Content-Type": "application/json; charset=utf-8"}
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read()).get("messages", [])
    except:
        return []

def post_to_slack(msg):
    """Posta mensagem no Slack com UTF-8 correto"""
    payload = json.dumps({"channel": SLACK_CHANNEL, "text": msg}).encode("utf-8")
    req = urllib.request.Request(
        "https://slack.com/api/chat.postMessage",
        data=payload,
        headers={"Authorization": f"Bearer {SLACK_TOKEN}", "Content-Type": "application/json; charset=utf-8"}
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        r = json.loads(resp.read())
        return r.get("ok"), r.get("error")

def make_bar(pct, width=17):
    """Gera barra de progresso visual"""
    filled = round(pct / 100 * width)
    return "▓" * filled + "░" * (width - filled)

def meta_emoji(pct):
    if pct >= 100: return "🏆"
    if pct >= 80: return "🟢"
    if pct >= 50: return "🟡"
    return "🔴"

# Buscar dados
ics_henrique = fetch_ics(
    "https://calendar.google.com/calendar/ical/e50e3cabb583ec22c6f1189eeb0b0ada0bb058abd208a0d05577c739bc405118%40group.calendar.google.com/private-e094cdd8f55577c5412392991d999366/basic.ics",
    "Henrique"
)
ics_lucas = fetch_ics(
    "https://calendar.google.com/calendar/ical/6c8ed9278f1271811c39ea28fd268d5048cce40b7222ce1edfdf888a15fa1a48%40group.calendar.google.com/private-983bfd48dbab59b798799f39905a9719/basic.ics",
    "Lucas"
)
ics_walissom = fetch_ics(
    "https://calendar.google.com/calendar/ical/ha.advocacia.walisonlima%40gmail.com/private-067644b5b8c5f1594977a0cbade98d6f/basic.ics",
    "Walissom"
)

all_events = ics_henrique + ics_lucas + ics_walissom
slack_msgs = fetch_slack_messages()

# Classificar reuniões por status de cor/título
fechados_agenda = []
em_andamento_agenda = []
nao_fechou_agenda = []

for ev in all_events:
    t = ev["title"].upper()
    if "FECHOU" in t or "REALIZADA" in t and "FECHOU" in t:
        fechados_agenda.append(ev)
    elif "LIGAR" in t or "SDR" in t or "TREINAMENTO" in t:
        pass  # SDR / interno
    else:
        em_andamento_agenda.append(ev)

# Extrair do Slack: contratos fechados, pagamentos, leads
contratos_slack = []
pagamentos_slack = []
leads_slack = []
hoje_ts = datetime.now(FORTALEZA).replace(hour=0, minute=0, second=0, microsecond=0).timestamp()

for msg in slack_msgs:
    try:
        ts = float(msg.get("ts", 0))
    except:
        ts = 0
    if ts < hoje_ts:
        continue
    text = msg.get("text", "")
    if "FECHADO" in text.upper() or "FECHAMENTO" in text.upper() or "CONTRATO" in text.upper() and "FECHADO" in text.upper():
        contratos_slack.append(text[:120])
    if "PARCELA" in text.upper() or "PAGAMENTO" in text.upper() or "PIX" in text.upper():
        pagamentos_slack.append(text[:120])
    if "CLIENTE -" in text.upper() and ("GOOGLE" in text.upper() or "META" in text.upper() or "PPD" in text.upper()):
        leads_slack.append(text[:100])

# Montar seções de reuniões
reunioes_txt = ""
if all_events:
    for ev in all_events:
        t = ev["title"]
        tu = t.upper()
        if "LIGAR" in tu:
            icon = "📞"
        elif "FECHOU" in tu:
            icon = "🟢"
        elif "REALIZADA" in tu:
            icon = "🔵"
        else:
            icon = "🟣"
        reunioes_txt += f"\n{icon} *{t}*\n• Closer: {ev['label']}\n"
else:
    reunioes_txt = "\nnão identificado — agenda sem eventos registrados hoje\n"

# Financeiro
financeiro_txt = ""
if pagamentos_slack:
    for p in pagamentos_slack[:3]:
        financeiro_txt += f"✅ {p}\n"
else:
    financeiro_txt = "não identificado — verificar Slack\n"

# Leads
leads_txt = ""
if leads_slack:
    for l in leads_slack[:3]:
        leads_txt += f"🟢 {l}\n"
else:
    leads_txt = "nenhum lead novo identificado hoje\n"

# Montar relatório final
msg = f"""━━━━━━━━━━━━━━━━━━━━
📊 RELATÓRIO COMERCIAL — FECHAMENTO DO DIA
Data: {data_str} | Hora: {hora_str}
Setor: Comercial
Origem: Agenda Google + Slack + ClickUp CRM
━━━━━━━━━━━━━━━━━━━━

*1. CONTEXTO*

🎯 *Meta do dia (Dr. Henrique):*
→ 🔵 3 contratos novos
→ 🟡 1 condição especial / desconto
→ 💰 Recuperação de R$4.000 em inadimplência

📅 *{data_str} — Equipe em campo*
Foco: fechamentos + catalogação de leads + CRM atualizado

━━━━━━━━━━━━━━━━━━━━

*2. REUNIÕES DO DIA*
{reunioes_txt}

━━━━━━━━━━━━━━━━━━━━

*3. FINANCEIRO DO DIA*
{financeiro_txt}

━━━━━━━━━━━━━━━━━━━━

*4. LEADS NOVOS*
{leads_txt}

━━━━━━━━━━━━━━━━━━━━

*5. ALERTAS*
🔴 Verificar contratos sem onboarding (ClickUp, ADVbox, Asaas)
🔴 Verificar inadimplência — meta R$4.000
🟡 Atualizar valor dos contratos fechados no CRM

━━━━━━━━━━━━━━━━━━━━
🎯 PAINEL DE METAS — {data_str}
━━━━━━━━━━━━━━━━━━━━

*CONTRATOS NOVOS*
`{make_bar(0)}` aguardando dados da equipe

*CONDIÇÃO ESPECIAL / DESCONTO*
`{make_bar(0)}` aguardando dados da equipe

*RECUPERAÇÃO DE INADIMPLÊNCIA*
`{make_bar(0)}` aguardando dados da equipe

━━━━━━━━━━━━━━━━━━━━
🏆 META GERAL: aguardando atualização da equipe
━━━━━━━━━━━━━━━━━━━━

*6. CONCLUSÃO*

📋 Relatório gerado automaticamente às {hora_str} (Fortaleza)
✏️ Equipe: atualizar fechamentos, valores e recuperações no CRM para próximo relatório ser completo

━━━━━━━━━━━━━━━━━━━━"""

ok, err = post_to_slack(msg)
if ok:
    print(f"✅ Relatório postado no Slack Comercial — {data_str} {hora_str}")
else:
    print(f"❌ Erro ao postar: {err}")
    sys.exit(1)
