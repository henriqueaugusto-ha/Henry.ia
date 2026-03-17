# Google Agenda — Integração Comercial

> Configurado em: 17/03/2026
> Status: ✅ Todos os 4 calendários acessíveis via ICS (leitura)

---

## Calendários Configurados

### 1. ADM_ H.A. Advocacia
- **Uso:** Agenda administrativa geral do escritório
- **Owner:** adv.henriqueaugusto@gmail.com
- **Timezone:** America/Sao_Paulo
- **ICS URL:** `https://calendar.google.com/calendar/ical/adv.henriqueaugusto%40gmail.com/private-276abc1fb7f333f6ba972bff521611aa/basic.ics`

### 2. Henrique - Closer
- **Uso:** Reuniões de fechamento do Dr. Henrique
- **Timezone:** America/Sao_Paulo
- **Descrição:** "Agenda de reuniões de fechamento."
- **ICS URL:** `https://calendar.google.com/calendar/ical/e50e3cabb583ec22c6f1189eeb0b0ada0bb058abd208a0d05577c739bc405118%40group.calendar.google.com/private-e094cdd8f55577c5412392991d999366/basic.ics`

### 3. Lucas - Closer
- **Uso:** Reuniões de fechamento do Lucas Furtado
- **Timezone:** America/Sao_Paulo
- **ICS URL:** `https://calendar.google.com/calendar/ical/6c8ed9278f1271811c39ea28fd268d5048cce40b7222ce1edfdf888a15fa1a48%40group.calendar.google.com/private-983bfd48dbab59b798799f39905a9719/basic.ics`

### 4. Walissom - SDR
- **Uso:** Marcações de reuniões para Henrique/Lucas realizarem + follow-ups + informações SDR
- **Timezone:** America/Fortaleza
- **ICS URL:** `https://calendar.google.com/calendar/ical/ha.advocacia.walisonlima%40gmail.com/private-067644b5b8c5f1594977a0cbade98d6f/basic.ics`

---

## Padrão de Eventos — Henrique-Closer e Lucas-Closer

### Formato do título
```
[STATUS -] NOME DO LEAD - TIPO DE CASO - CIDADE - ESTADO - ORIGEM
```

**Status no título (quando presente):**
- `REALIZADA` — reunião aconteceu
- `FECHOU` — reunião resultou em contrato
- *(sem prefixo)* — agendada / sem resultado registrado

**Tipos de caso comuns:** SUSPENSÃO DE CNH, LEI SECA, BAFOMETRO, CASSAÇÃO

**Origens comuns:** GOOGLE, FACEBOOK, INSTAGRAM, TIKTOK, CCNI, GOOGLE MEU NEGÓCIO

### Descrição dos eventos
- Observações da reunião (objeções, contexto, próximos passos)
- Motivos de não fechamento
- Dados relevantes para follow-up

---

## Padrão de Eventos — Walissom SDR

- Follow-up de leads (ex: "LIGAR - CARLOS YURI MONTEIRO DE PAIVA")
- Reuniões de treinamento numeradas (ex: "19 - REUNIÃO DE TREINAMENTO")
- Alinhamentos estratégicos

---

## Uso Planejado pelo Henry

1. Leitura diária das 3 agendas de fechamento (Henrique + Lucas) e SDR (Walissom)
2. Cruzamento: reuniões agendadas X realizadas X fechadas
3. Correlação com Slack Comercial + ClickUp CRM
4. Relatório: agendadas / realizadas / no-show / conversões
5. Alertar quando reunião aconteceu mas lead não avançou no CRM
6. Detectar padrões: origem com maior conversão, horário, tipo de caso

---

## Limitações Atuais

- **Somente leitura** via ICS (não escreve na agenda)
- Para criar/editar eventos: precisaria OAuth Google Calendar API
- ICS não tem atualização em tempo real — precisa fazer novo fetch a cada consulta

---

## Como Consultar (via web_fetch)

```
GET [URL ICS acima]
Content-Type: text/calendar
Retorna: VCALENDAR com todos os VEVENTs
```

Campos relevantes por VEVENT:
- `DTSTART` — data/hora início (America/Sao_Paulo ou Fortaleza)
- `DTEND` — data/hora fim
- `SUMMARY` — título (nome + caso + cidade + estado + origem)
- `DESCRIPTION` — observações da reunião
- `STATUS` — CONFIRMED / CANCELLED / TENTATIVE
- `LAST-MODIFIED` — última atualização
