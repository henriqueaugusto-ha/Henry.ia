# decisions.md — Decisões Estratégicas

> Decisões tomadas pelo Dr. Henrique. Não debater após registro. Executar com excelência.
> Formato: data | decisão | contexto | resultado esperado

---

## 2026-02

### 2026-02-26
**Decisão:** Construir AIOS antes de recompor o time
- Contexto: Escritório perdeu R$80k/mês em janeiro após saída de peças-chave
- Lógica: Automatizar o ciclo antes de recontratação → sistema robusto > dependência de pessoas
- Resultado esperado: Operação escalável sem depender de indivíduos

**Decisão:** Usar N8N self-hosted na VPS como motor de automação central
- Contexto: Stack já existia mas operava como ilhas isoladas
- Lógica: Controle total, custo baixo, integração nativa com todos os sistemas

**Decisão:** Henry como AI COO — não assistente, mas diretor operacional adjunto
- Contexto: Necessidade de parceiro estratégico que pense, execute e não dependa de humor/folha
- Resultado esperado: Reduzir carga cognitiva do Dr. Henrique, manter padrão sem microgerenciamento

### 2026-02-28
**Decisão:** Identidade digital separada para Henry (henry.ia.assistant@gmail.com)
- Contexto: APIs técnicas precisam de conta para cadastro
- Restrição: Nunca usar para comunicação com clientes ou equipe sem autorização

**Decisão:** 1Password como gerenciador único de credenciais — zero tolerância a hardcode
- Contexto: Incidente de token exposto no Slack serviu de gatilho
- Regra absoluta: Toda senha, token, API key → 1Password. Sem exceção.

## 2026-03

### 2026-03-02
**Decisão:** Diretiva de segurança operacional permanente
- NUNCA editar openclaw.json nem reiniciar gateway sem autorização
- Protocolo: propor → aprovação → Dr. Henrique aplica na VPS
- Motivo: 3 crashes em 01/03/2026

**Decisão:** Fase 1 = construir base. Fase 2 = mapear operações → automatizar
- Dr. Henrique descreve cada operação manual → Henry identifica automações → instrui agente VSCode → N8N executa

**Decisão:** Fluxo pós-contrato via API (não extração PDF)
- ZapSign API retorna telefone do signatário diretamente
- Automação completa: ZapSign webhook → dados signer → criar cliente Asaas → criar cobrança
- Bloqueador: Asaas API key pendente no 1Password

### 2026-03-01
**Decisão:** Meta de março corrigida para R$160k
- Contexto: Jan R$80k + Fev R$60k = déficit R$60k no T1 (Trimestre 1)
- Para fechar T1 em R$300k: março precisa de R$160k
- 5 frentes: Trânsito core, ANPP prioritário, Recaptação, Novas áreas, Produtos digitais
- Vocabulário: usar "T1" ou "Trimestre 1" — não usar "Q1"

**Decisão:** ANPP como produto prioritário de março
- Contexto: R$4-5k por caso, urgência natural (cliente preso), pouco trabalho jurídico, ótima margem
- Ação: Campanha específica Google+Meta

**Decisão:** Slack dmPolicy alterado para "open"
- Contexto: dmPolicy "pairing" bloqueava DMs sem pareamento prévio
- Resultado: DMs liberados para qualquer usuário do workspace

**Decisão:** Roadmap de hardening de segurança — 6 etapas ordenadas (02/03/2026)
- Documento: Security Hardening - Ordem de Execução (enviado por Dr. Henrique)
- Score atual: 5.5/10 | Meta: 9/10
- Regra absoluta: flags controlUi só podem ser desligadas APÓS HTTPS funcional e testado
- Regra absoluta: nenhuma credencial pode permanecer hardcoded no openclaw.json
- Regra absoluta: nunca aplicar múltiplas mudanças estruturais no mesmo ciclo
- Regra absoluta: sempre manter rota administrativa funcional antes de endurecer segurança
- Ordem de execução: Nginx+HTTPS → flags controlUi (1 por vez) → groupPolicy allowlist → migrar credenciais 1Password → ajustes menores → verificação manual VPS
