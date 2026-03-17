# memory/ — Estrutura de Memória

> Atualizado: 17/03/2026
> Organizado por espaço temático — cada grupo escreve na sua pasta, todos podem ler qualquer pasta.

## Estrutura

```
memory/
├── gestao/          ← Planos, metas, decisões estratégicas (Gestão & Estratégia)
│   ├── plano-marco-2026.md
│   ├── projects.md
│   ├── decisions.md
│   └── livro-poder-da-gestao.md
│
├── comercial/       ← Funil, leads, conversão, scripts, SDR (Comercial)
│   └── comercial.json (feedback loop)
│
├── automacoes/      ← N8N, workflows, bugs, integrações (Automações)
│   ├── api-brasil-integration-success.md
│   ├── docxtemplater-contratos-guia.md
│   ├── automacao.json (feedback loop)
│   └── operacional.json (feedback loop)
│
├── juridico/        ← Clientes, processos, prazos, ADVbox (Jurídico)
│   ├── clickup-estrutura.md
│   └── projeto-agentes-juridico.md
│
├── pessoas/         ← Equipe, clientes, contatos relevantes
│   └── people.md
│
├── diario/          ← Notas diárias (YYYY-MM-DD.md) — rascunho pré-compactação
│   └── [arquivos por data]
│
├── lessons.md       ← Lições aprendidas permanentes (global)
├── pending.md       ← Pendências abertas (global)
└── README.md        ← Este arquivo
```

## Regras

- Cada grupo salva na sua subpasta por padrão
- Henry pode ler qualquer subpasta para análise cruzada
- `MEMORY.md` (raiz do workspace) = índice enxuto + alertas críticos
- `lessons.md` e `pending.md` = globais, acessíveis por todos os grupos
- Notas diárias → `diario/YYYY-MM-DD.md`
- Lição aprendida → `lessons.md`
- Decisão estratégica → `gestao/decisions.md`
- Contexto de pessoa nova → `pessoas/people.md`
