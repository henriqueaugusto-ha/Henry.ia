# API Brasil — Integração Bem-Sucedida

**Data:** 02/03/2026 17h21  
**Duração total:** 1h15min (16h05-17h21)  
**Status:** ✅ 100% FUNCIONAL

---

## Configuração Final

### Endpoint
```
POST https://cluster.apigratis.com/api/v2/vehicles/dados
```

### Headers Necessários
```
DeviceToken: 6838ac15-cb03-48cf-93d9-279520d46336
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9... (420 chars)
SecretKey: fd247893-bc08-11ef-bacf-000c298680d9
Content-Type: application/json
```

### Body
```json
{
  "placa": "ABC1234"
}
```

---

## Credenciais no 1Password

**Item:** API Brasil - Consultas  
**Vault:** IA-OPERACIONAL  
**UUID:** pxqiqpv6s5qr3t66kzx5vkblme

**Campos:**
- `password`: DeviceToken UUID (36 chars)
- `notesPlain`: Bearer JWT (420 chars)
- `username`: "Token Principal"

---

## Teste de Validação

**Placa consultada:** ABC1234  
**Resultado:**
- Marca: VW
- Modelo: SANTANA CG
- Ano: 1986
- Cor: Vermelha
- Combustível: Álcool
- UF: PR
- Município: Lobato
- RENAVAM: disponível
- Chassi: 9BWZZZ32ZGP246344
- Situação: Normal

**API Limits:**
- `api_limit`: 1 consulta por request
- `api_limit_used`: 0
- Status code: 200

---

## Arquitetura da API

### 3 Tokens Necessários

1. **DeviceToken** (Header)
   - Tipo: UUID (36 chars)
   - Onde obter: Painel gateway.apibrasil.io → Dispositivos → henryia-veiculos
   - Label no painel: "Device Token"
   - Formato: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

2. **Bearer JWT** (Header Authorization)
   - Tipo: JSON Web Token (420 chars)
   - Onde obter: Painel gateway.apibrasil.io → Login OAuth
   - Label no painel: "Token Principal"
   - Formato: `eyJ0eXAiOiJKV1QiLCJhbGc...`
   - Validade: até 2027 (exp: 1804013789)

3. **SecretKey** (Header)
   - Tipo: UUID específico por API
   - Onde obter: Endpoint `/api/v2/apis` → campo `secretkey`
   - Para "Placa Dados": `fd247893-bc08-11ef-bacf-000c298680d9`
   - Custo: R$0.70 por consulta

---

## Erros Comuns e Como Evitar

### ❌ "Dispositivo não encontrado"
- **Causa:** Usando UUID sozinho sem Bearer JWT
- **Solução:** Incluir header `Authorization: Bearer [JWT]`

### ❌ "Bearer Token informado é inválido"
- **Causa 1:** Usando UUID no lugar do JWT
- **Causa 2:** JWT expirado
- **Solução:** Verificar que token tem 400+ chars e começa com `eyJ`

### ❌ "Você não informou o Bearer Token"
- **Causa:** Header Authorization ausente
- **Solução:** Adicionar `Authorization: Bearer [JWT]`

### ❌ "Plano ativo não encontrado"
- **Causa:** Plano não ativado no painel
- **Solução:** Acessar painel e ativar plano (mínimo R$69.90)

---

## Script de Exemplo (Bash)

```bash
#!/bin/bash

export OP_SERVICE_ACCOUNT_TOKEN=$(grep OP_SERVICE_ACCOUNT_TOKEN /data/.openclaw/.env | cut -d= -f2-)

BEARER_TOKEN=$(/data/op item get "API Brasil - Consultas" --vault "IA – OPERACIONAL" --fields notesPlain --reveal | grep -oP 'eyJ[A-Za-z0-9_\-\.]+')
DEVICE_UUID="6838ac15-cb03-48cf-93d9-279520d46336"
SECRET_KEY="fd247893-bc08-11ef-bacf-000c298680d9"
PLACA="$1"

curl -s -X POST \
  "https://cluster.apigratis.com/api/v2/vehicles/dados" \
  -H "Content-Type: application/json" \
  -H "DeviceToken: $DEVICE_UUID" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -H "SecretKey: $SECRET_KEY" \
  -d "{\"placa\":\"$PLACA\"}" | python3 -c "
import json, sys
data = json.load(sys.stdin)
if data.get('error'):
    print('❌ ERRO:', data.get('message'))
else:
    resp = data.get('response', {})
    print(f\"✅ {resp.get('marca')} {resp.get('modelo')} {resp.get('ano')}\")
    print(f\"Cor: {resp.get('cor')}\")
    print(f\"Combustível: {resp.get('combustivel')}\")
    print(f\"UF: {resp.get('uf')} | Município: {resp.get('municipio')}\")
"
```

**Uso:**
```bash
./scripts/consulta-placa.sh ABC1234
```

---

## Próximos Passos Sugeridos

### 1. Script Workspace
- Criar `scripts/consulta-placa.sh`
- Adicionar parsing customizado (extrair só campos relevantes)
- Adicionar cache local (evitar consultas duplicadas)

### 2. Integração N8N
- Webhook trigger recebe placa
- Chama API Brasil
- Salva resultado no ClickUp campo customizado
- Alerta Slack se houver restrição/débito

### 3. Skill OpenClaw
- Criar skill `veiculos-brasil`
- Comando: "consultar placa ABC1234"
- Resposta formatada em português
- Integração com 1Password automática

---

## Lições Aprendidas

### O que deu certo
1. Print da tela revelou "Token Principal" separado
2. Salvar tokens em campos diferentes (password + notesPlain)
3. Testar incrementalmente até encontrar combinação correta

### O que evitar
1. Assumir que "DeviceToken" sozinho é suficiente
2. Sobrescrever credenciais existentes sem backup
3. Não pedir "todos os tokens visíveis" desde o início

### Tempo de troubleshooting
- Poderia ter sido 15 minutos com abordagem correta
- Levou 1h15min por tentar inferir ao invés de pedir print completo
- **Regra:** APIs com "dispositivos" → sempre pedir print da tela completa

---

## Contatos de Suporte

**API Brasil:**
- Site: https://apibrasil.com.br
- Painel: https://gateway.apibrasil.io
- WhatsApp suporte: (disponível no painel)
- Email cadastrado: artur.umbelino@apibrasil.com.br

**Plano ativo:**
- Valor: R$69.90/mês (mínimo)
- Limite: 1 consulta por request
- Válido até: 2027

---

**Integração concluída com sucesso em 02/03/2026 às 17h21 BRT** ✅
