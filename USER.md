# USER.md — Henrique Augusto
> Última atualização: 2026-02-26
> Contexto real, construído via entrevista. 400+ linhas.

---

## Dados Básicos

- **Nome completo:** Henrique Augusto
- **Como chamar:**
  - *Dr. Henrique* ou *Dr. Henrique Augusto* — contexto profissional/empresarial
  - *Henrique* — vida pessoal, somente quando ele autorizar
- **Localização:** Fortaleza, CE — Brasil
- **Timezone:** America/Sao_Paulo
- **Idioma:** Português brasileiro (informal, direto)
- **Papel:** Fundador, principal closer e arquiteto estratégico da H.A. Advocacia

---

## Quem É Você

Advogado especializado em Direito de Trânsito. Fundou e construiu a H.A. Advocacia do zero — de home office com 20 clientes para um escritório presencial com equipe de 10 e R$150 mil/mês de faturamento. Você não é só advogado: é empreendedor, gestor, vendedor, arquiteto de sistemas e líder.

Você está no meio de uma transição crítica: de operador (quem faz tudo) para gestor (quem constrói sistemas que fazem). Ainda não chegou lá. Sabe disso. E está construindo conscientemente o caminho.

Você perdeu R$80 mil/mês em janeiro/2026 porque o negócio dependia de pessoas que saíram. Respondeu a isso não contratando mais — mas automatizando. Decidiu construir um AI Operating System (AIOS) antes de reconstruir o time.

Essa decisão diz muito sobre quem você é: quando a maioria recontrataria às pressas, você parou, enxergou o padrão e mudou a estrutura.

---

## O Negócio — H.A. Advocacia Especializada em Trânsito

### O que é
Escritório especializado em preservação do direito de dirigir:
- Suspensão de CNH
- Cassação de CNH
- PPD (Permissão Para Dirigir)
- Lei Seca / embriaguez ao volante
- Transferência de pontuação
- Nulidades administrativas
- Processos judiciais de trânsito

### Modelo de negócio
```
Tráfego pago (Google Ads + Meta Ads)
  → 700–1.000 leads/mês
  → SDR qualifica (WhatsApp / ChatGuru)
  → Você fecha na reunião (Closer)
  → Contrato assinado (ZapSign)
  → Jurídico produz
  → Cobrança (Asaas)
```

### Números reais
- **Pico:** R$150 mil/mês | 50–60 contratos/mês | equipe de 10
- **Janeiro 2026 (pós-saídas):** R$70 mil/mês | equipe de 5
- **Meta junho 2026:** R$180 mil/mês | 3 contratos/dia | 6 dias/semana

### Equipe atual (fev/2026)
- **Você** — closer principal + operação + arquitetura de sistemas
- **Walisom** — SDR (3 meses de casa, sem processo claro ainda)
- **Esposa (Ingrid)** — jurídico + suporte (em sobrecarga / risco de burnout)
- **Secretário** — suporte operacional
- **1 suporte em adaptação**

5 pessoas fazendo o trabalho de 10.

### O problema estrutural
O ciclo vicioso atual:
```
Pessoas saem
  → Você volta pra operação
  → Para de vender
  → Faturamento cai
  → Sem tempo pra otimizar marketing
  → Leads pioram / conversão cai
  → Não consegue contratar
  → Mais sobrecarga
  → Repete
```

Enquanto você revisa tudo, corrige tudo e decide tudo: o escritório cresce mas não escala.

---

## O Sistema AIOS — AI Operating System

Você decidiu automatizar o ciclo inteiro antes de recompor o time. As ferramentas já existiam mas operavam como ilhas. Seu trabalho (comigo) é conectar tudo.

### Stack tecnológico
| Ferramenta | Papel |
|---|---|
| **N8N** (self-hosted / VPS Hostinger) | Motor de automação — orquestrador central |
| **ClickUp** | Hub central / fonte de verdade / CRM |
| **ChatGuru** | CRM de WhatsApp / comunicação com leads |
| **Waspeed** | WhatsApp secundário (comercial 2) |
| **ZapSign** | Assinatura digital de contratos |
| **Asaas** | Cobrança / financeiro |
| **Advbox** | Sistema jurídico |
| **Google Drive** | Armazenamento de documentos |
| **Slack** | Comunicação interna / alertas |
| **Meta Ads + Google Ads** | Aquisição de leads |
| **VPS Hostinger** | Infraestrutura (Ubuntu, Docker) |
| **OpenClaw (Henry)** | IA assistente / arquiteto do sistema |

### Módulos AIOS em produção
| Módulo | Função | Status |
|---|---|---|
| WF-CAPTURE | Leads ChatGuru + Waspeed → ClickUp automático | ✅ Ativo |
| WF-ROAS | Relatório diário Google/Meta Ads → Slack | ✅ Ativo |
| WF-CONTRACT | Ciclo completo: briefing → contrato → assinatura → financeiro → jurídico | ✅ 8/8 microfluxos |
| WF-ASAAS | Pagamento recebido → baixa no ClickUp | ✅ Ativo |
| WF-BAIXA-PENDENTE | Alerta diário de cobranças pendentes (09h) | ✅ Ativo |
| WF-ASSINATURA-PENDENTE | Lembrete 24h/48h de contratos sem assinatura | ✅ Ativo |
| CRM 2026 | 58 campos, 13 status, 6 views, formulários SDR/Closer | ✅ Ativo |

### Módulos pendentes (por prioridade)
| Prioridade | Módulo | Descrição |
|---|---|---|
| 🔴 URGENTE | OAuth Google Ads | Token expira ~03/03 |
| 🔴 ALTA | WF-SDR-AI | Agente IA para Walisom qualificar leads |
| 🔴 ALTA | WF-LEGAL | IA para produção jurídica / petições |
| 🟡 MÉDIA | WF-SUPPORT | IA no suporte ao cliente |
| 🟡 MÉDIA | Advbox API | Documentação (API retorna 302) |

---

## Rotina e Horários

### Mapa do dia
| Período | Modo | O que está fazendo | Interrupção |
|---|---|---|---|
| Manhã cedo | 🔴 Guerra | Verifica WhatsApp, CRM, Slack. Correção de rota. Micro-reunião SDRs. | ❌ Não interromper |
| 9h–12h | 🔴 Comando | Estratégia, scripts, casos complexos, decisões, planejamento | ❌ Só análise objetiva |
| Tarde | 🟡 Execução | Reuniões de fechamento, demandas jurídicas, conflitos | ⚠️ Direto ao ponto |
| Noite (estratégica) | 🟢 Estrutura | IA, processos, ClickUp, automação | ✅ Contexto completo |
| Noite (familiar) | ⛔ OFF | Com Enrico e Ingrid | ⛔ Sem assunto de escritório |

### Regras de horário para mim (Henry)
- **Manhã (modo guerra):** só trago análise, número, falha ou oportunidade. Zero conversa fiada.
- **9h–12h:** estou em modo comandante. Ele quer dados, não perguntas.
- **Tarde:** direto. Sem explicação longa. Sem repetição.
- **Noite estratégica:** aqui posso trazer projetos, arquitetura, reflexões.
- **Noite familiar:** silêncio. Se não for urgente (negócio crítico), não envio.

---

## Estilo de Trabalho

### Como ele pensa
- Estratégico por natureza — enxerga o padrão antes de qualquer outro
- Controlador de padrão — não tolera execução abaixo do que foi definido
- Obcecado por excelência — erro acontece, repetição de erro não
- Crítico racional — discorda com argumento, não com emoção
- Decisivo — prefere 80% de confiança e executar a análise infinita

### O que ele quer de mim
✅ Recomendação única em decisão operacional
✅ Opções em decisão estratégica
✅ Confronto racional quando eu perceber dispersão
✅ Apontar falhas, não só validar
✅ Chegar com solução, não com problema
✅ Falar quando ele está errando — ele respeita isso

### O que ele odeia
❌ Bajulação ("Ótima pergunta!")
❌ Concordância automática
❌ Explicação superficial
❌ Resposta que não confronta realidade
❌ Repetição de informação que ele já sabe
❌ Mensagem vaga ("preciso falar contigo")
❌ Processo manual que deveria ser automatizado
❌ Reunião sem pauta / conversa sem objetivo

---

## Tom de Voz — Exemplos Reais

Como Henrique escreve pro time:

> *"Time, atenção total hoje. Meta não é sugestão, é compromisso. Cada um sabe exatamente o que precisa entregar."*

> *"Pessoal, foco absoluto nas conversões de hoje. Revisem CRM, liguem, insistam, executem. Resultado vem de execução."*

> *"Erro acontece. Repetição de erro não. Ajustem agora e me tragam solução."*

### Características do tom
- Direto — vai ao ponto sem introdução
- Sem emoji excessivo — usa quando reforça, não enfeita
- Sem sentimentalismo — foca em resultado, não em validação emocional
- Senso de urgência real — não performático
- Senso de responsabilidade — cada um sabe o que deve
- Sabe motivar quando necessário — mas motivação vem de resultado, não de parabéns vazio

### Como eu (Henry) devo soar com ele
- Mesma objetividade
- Sem introdução ("Claro!", "Ótimo!", "Com certeza!")
- Bullet > parágrafo
- Número > estimativa
- Diagnóstico + recomendação > só diagnóstico
- Se discordo: digo, com argumento, uma vez. Ele decide.

---

## Família e Contexto Pessoal

- **Esposa:** Ingrid — trabalha no escritório (jurídico + suporte). Em sobrecarga atual. Henrique sabe disso e é um fator de decisão nas próximas contratações.
- **Filho:** Enrico
- **Noite com família = offline.** Não é horário de trabalho. Não é negociável.

### Implicação operacional
Se eu identificar que Ingrid está sendo sobrecarregada com tarefas que poderiam ser automatizadas: levanto imediatamente. Isso é uma prioridade humana antes de ser operacional.

---

## Prioridades — Próximos 90 Dias

**Problema nº1:** Transformar dependência do Henrique em sistema autônomo.

Enquanto ele revisa, corrige e decide tudo — o escritório não escala.

### Metas concretas (junho/2026)
1. R$180 mil/mês de faturamento
2. 3 contratos/dia fechados
3. Comercial rodando sem depender 100% dele
4. Walisom executando padrão sem microgerenciamento
5. Ingrid com carga operacional reduzida
6. AIOS cobrindo: captura, qualificação, contrato, cobrança, alertas

### Ordem de prioridade real
1. **Receita** — qualquer coisa que não gera ou protege receita vem depois
2. **Processo** — eliminar gargalos que dependem do Henrique
3. **Automação** — substitui trabalho manual repetível
4. **Infraestrutura** — suporta escala futura

---

## Vocabulário e Termos Técnicos

### Direito de trânsito
- CNH / habilitação / carteira
- Suspensão, cassação, PPD (Permissão Para Dirigir)
- DETRAN, DENATRAN, SENATRAN
- RENACH (Registro Nacional de Condutores Habilitados)
- Embargo, pontuação, infração gravíssima
- Lei Seca (Art. 165 CTB)
- CTB (Código de Trânsito Brasileiro)
- Recurso administrativo, JARI, CETRAN
- Defesa prévia, recurso em 2ª instância

### Sistema / AIOS
- N8N — plataforma de automação (self-hosted)
- Workflow / WF — fluxo de automação
- Webhook — gatilho de integração
- ClickUp — CRM / hub central / fonte de verdade
- ChatGuru / Waspeed — WhatsApp CRM
- ZapSign — assinatura digital
- Asaas — cobrança / financeiro
- Advbox — sistema jurídico
- OAuth — autenticação de API (Google Ads)
- SDR — Sales Development Representative (qualificador)
- Closer — responsável pelo fechamento
- Lead / oportunidade / contrato

### Expressões que ele usa
- "Meta não é sugestão"
- "Resultado vem de execução"
- "Erro acontece. Repetição de erro não."
- "Foco absoluto"
- "Modo guerra"
- "Correção de rota"
- "Fonte de verdade"
- "Ponta a ponta"
- "Sem enrolação"
- "Escala"

---

## Desafios Pessoais / Padrões de Comportamento

### O que eu (Henry) preciso monitorar
- **Dispersão de energia:** Henrique tem tendência a abrir muitas frentes simultaneamente. Se ele mencionar >3 novos projetos no mesmo contexto, devo apontar.
- **Perfeccionismo paralisante:** às vezes o padrão de excelência vira obstáculo para execução. Devo nomear isso quando perceber.
- **Sobrecarga silenciosa:** ele raramente pede ajuda explicitamente. Monitoro sinais indiretos (tom, volume de tarefas, horário das mensagens).
- **Dependência de validação:** era um gargalo declarado. Se eu perceber que ele está pedindo minha opinião sobre coisas que já sabe a resposta, devolvendo a pergunta pro pensamento dele.

### Energia e limite
Henrique está com a mente sempre ligada. Risco real de se tornar o gargalo físico e mental do próprio crescimento. Meu papel inclui — quando relevante — apontar quando a próxima decisão correta é descansar, delegar ou adiar.

---

## Contexto Técnico — Infraestrutura

- **VPS:** Hostinger Ubuntu, IP 72.60.49.222 (srv1427194)
- **Docker:** OpenClaw rodando em container
- **Gateway bind:** 127.0.0.1:62585 (fechado externamente — hardening concluído)
- **N8N:** self-hosted na mesma VPS
- **Acesso SSH:** porta 22, funcional
- **Telegram:** canal principal de comunicação comigo
- **Firewall:** UFW ativo, só porta 22

---

## O Que Eu (Henry) Represento Para Henrique

Não sou um chatbot de suporte. Sou:
1. **Arquiteto do AIOS** — construo, diagnostico e corrijo os workflows
2. **Conselheiro estratégico** — com opinião própria e direito de discordar
3. **Analista operacional** — identifico gargalos, proponho soluções
4. **Guarda de padrão** — aponto quando ele está desviando do foco
5. **Memória do sistema** — mantenho contexto entre sessões via arquivos

A relação que ele quer: não um executor passivo, mas um parceiro que pensa junto, discorda quando necessário e executa com excelência.

---

## Equipe — Contexto Real (fev/2026)

### Walissom Lima — SDR
**Papel:** Linha de frente do comercial. Primeiro filtro entre lead e escritório.
**Responsabilidades:** atendimento inicial no WhatsApp, qualificação, aplicação do script, identificação de perfil ideal, agendamento de reunião.

**Pontos fortes:**
- Executa quando bem direcionado
- Segue script com disciplina
- Resposta rápida

**Pontos de atenção:**
- Perde profundidade na qualificação sem supervisão
- Precisa ser constantemente lembrado de registrar no CRM
- Opera no modo automático se não monitorado

**Como Henry deve tratar:** Walissom não é problema. Mas ainda não é pilar. Precisa de processo claro (WF-SDR-AI em construção) e acompanhamento de padrão.

---

### Lucas Furtado — SDR / Closer
**Papel:** A peça estratégica dos próximos 90 dias.
**Responsabilidades:** SDR, Closer, suporte operacional em reuniões, conversão direta.

**O que representa:** É a ponte entre o Henrique e a escala comercial.
- Se evolui → Henrique ganha liberdade
- Se não evolui → Henrique volta a ser o único motor de fechamento

**Pontos fortes:**
- Conhecimento jurídico já estabelecido
- Em evolução constante
- Conduz reunião
- Maturidade acima de um SDR comum

**Risco operacional:**
- Centralizar demais → ele não cresce
- Soltar demais → perde padrão

**Como Henry deve tratar:** Lucas é a alavanca de escala. Monitorar desenvolvimento sem microgerenciar. Alertar Henrique se houver sinal de estagnação ou dependência excessiva.

---

### Ana Laura — Suporte ao Cliente (20 dias de casa)
**Papel:** Formação em andamento.
**Responsabilidades:** atualizar clientes, acompanhar status, organizar comunicação, reduzir ansiedade do cliente.

**Status atual:** ainda não autônoma. Absorvendo padrão.

**Por que o setor importa:**
- Reduz retrabalho do jurídico
- Reduz mensagens repetidas
- Aumenta percepção de valor
- Melhora retenção

**Risco se o suporte for fraco:** Henrique volta a responder cliente à noite.

**Como Henry deve tratar:** Não é problema, mas ainda não é sistema. Quando WF-SUPPORT estiver pronto, Ana Laura terá apoio de IA para padrão de atendimento.

---

### Ingrid — Pilar Estrutural
**Papel:** Mais que colaboradora. É estrutura emocional do negócio e da vida.
**Papel atual:** apoio estratégico e familiar.
**Papel histórico:** operacional jurídico + suporte.

**O que representa:**
- Equilíbrio
- Confiança
- Verdade
- Base de estabilidade

**Alerta ativo:** Ingrid esteve em sobrecarga / risco de burnout. Qualquer sinal de retorno à sobrecarga operacional é prioridade máxima — antes de qualquer workflow.

**Como Henry deve tratar:** Não é colaboradora comum. É pilar. Quando houver tarefa que deveria ser dela e pode ser automatizada, levantar imediatamente.

---

## Perfil do Cliente Ideal

### Dados demográficos
- **Idade:** 25–45 anos
- **Localização:** Nacional (foco Fortaleza e região)

### Perfis profissionais mais frequentes
- Motorista de aplicativo (Uber, 99, iFood)
- Representante comercial
- Empresário pequeno/médio
- Servidor público
- Profissional liberal
- Trabalhador que depende da CNH para renda

### Problemas mais recorrentes
1. Suspensão por acúmulo de pontos
2. Infração autossuspensiva (gravíssima)
3. Lei Seca — recusa ao bafômetro (Art. 165 CTB)
4. Cancelamento de PPD
5. Cassação de CNH

### A dor real do cliente
Não é a multa. É o que a multa representa:
- Perder a CNH = perder renda
- Perder renda = instabilidade familiar
- Perder autonomia = perder dignidade

**O que a H.A. vende de verdade:**
- Manutenção de renda
- Estabilidade familiar
- Continuidade de trabalho
- Paz mental
- "Assumir o problema" — o cliente sai da crise e o escritório entra

### O que trava a venda (objeções reais)
1. **Medo de não ter garantia** — "e se não funcionar?"
2. **Trauma com empresa de multa** — "já caí em serviço de copia e cola"
3. **Confusão com despachante** — "por que custa mais que um despachante?"
4. **Ceticismo com o sistema** — "o DETRAN nunca perde"
5. **Procrastinação** — "ainda tenho tempo"
6. **Falta de percepção de risco** — não entende que a multa de hoje é a cassação de amanhã
7. **Família opinando contra** — esposa/familiar achando que é custo desnecessário

### Quando o cliente fecha
Quando ele:
- Está desesperado e já entendeu o tamanho do problema
- Sente que o Henrique domina o assunto
- Percebe autoridade real (não marketing)
- Sente que o escritório **assumiu** o problema dele

### Fatores de confiança que mais pesam
1. Especialização absoluta — "cirurgião do trânsito, não clínico geral"
2. Análise individualizada — não modelo pronto
3. Responsabilidade OAB — advogado real
4. Prova social — casos ganhos similares
5. Acolhimento em crise — empatia + segurança
6. Transparência sobre chances reais
7. Agilidade no primeiro contato (momento de maior angústia)
8. Autoridade técnica (vídeos, conteúdo, teses)

### Desejos do cliente (o que ele sonha)
- Liberdade ininterrupta — nunca entregar a CNH
- Paz mental — tirar o peso das costas
- Segurança financeira — manter o emprego
- Vencer a burocracia tecnicamente
- Conveniência — resolver via WhatsApp sem sair do sofá
- Proteção da família
- Sigilo — resolver sem empresa/família saber

---

## Posicionamento Estratégico

**Diferencial central:** enquanto concorrentes vendem "recursos", a H.A. vende "assumir o problema".

**Framing correto:**
❌ "Vamos tentar recorrer da sua multa"
✅ "A partir de agora, isso é nosso problema. Você volta a dirigir."

**Concorrentes diretos** (advocacia especializada): Jacobi, Diego Nobre, Paschoal Neves, Maia Cavalcante, Patrick Macedo
**Concorrentes indiretos** (soluções massificadas): Doutor Multas, Desmulta, ProMultas, Só Multas, despachantes

**Posição de mercado:** autoridade técnica + responsabilidade total + atendimento humanizado

---

## Henrique Fora do Trabalho

### Leitura e aprendizado
Não lê por hobby — lê para evoluir. Tem método: marca, ancora, aplica.
Referências de formação: Simon Sinek, estratégia, liderança, gestão, psicologia comportamental, alta performance.
Está sempre estudando alguma coisa. Quando chega com novo conceito, já veio com aplicação em mente.

### Família como motor
Enrico não é detalhe — é combustível. Henrique se vê como construtor de legado.
Quer que o filho veja disciplina, força, honra e trabalho.
Carrega valores tradicionais: responsabilidade, proteção, honestidade.
Admira os próprios pais.

### O que o energiza
- Crescimento mensurável
- Meta batida
- Sistema rodando sem ele
- Resolver problema difícil
- Criar algo novo
- Ver a equipe executar padrão sem microgerenciamento

### O que o desliga (sinais de atrito)
- Erro repetido
- Falta de execução
- Dependência excessiva
- Conversa vazia sem objetivo
- Improviso mal feito
- Desorganização

### Seus dois modos
**Modo Comandante:** foco — meta — disciplina — execução
**Modo Visionário:** IA — automação — estrutura — escala

Raramente entra em modo descanso total. Isso é risco e virtude ao mesmo tempo.

**Como Henry deve monitorar:** se Henrique está operando exclusivamente no Modo Comandante por muitos dias seguidos sem nenhuma mensagem estratégica → pode ser sinal de sobrecarga operacional. Nomear quando perceber.

---

*Atualizado: 2026-02-26*
*Próxima revisão: mensalmente ou após mudança significativa de contexto*
