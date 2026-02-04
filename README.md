# Projeto Front End - Pets MT - guilhermenunesazevedo065005

## Sumário
- [](#introdução)
- [](#como-executar)
- [Arquitetura](#arquitetura)
- [Testes Unitários](#testes-unitários)
- [Containerização com Docker e Deploy](#containerização-com-docker-e-deploy)


# Como executar
A aplicação foi empacotada em um container Docker que pode ser executada da seguinte forma:
## 📖 Guia Passo-a-Passo

### Passo 1: Entrar no diretório
```bash
cd guilhermenunesazevedo065005/pets-mt
```

### Passo 2: Build da aplicação
```bash
docker-compose build
```

### Passo 3: Iniciar
```bash
docker-compose up -d
```

### Passo 4: Verificar se está rodando
```bash
docker-compose ps
```

Você deve ver:
```
NAME          COMMAND            STATUS
pets-mt-app   serve -s dist...   Up 10 seconds (healthy) ✓
```

### Passo 5: Acessar
```
http://localhost:3000
```

### Passo 6: Ver logs
```bash
docker-compose logs -f pets-mt
```

### Passo 7: Parar
```bash
docker-compose down
```


# Arquitetura

## React

## Docker
### 📁 Arquivos

| Arquivo | Uso |
|---------|-----|
| `Dockerfile` | Build de produção |
| `docker-compose.yml` | Executar em produção |
| `docker-compose.dev.yml` | Desenvolvimento com hot reload |
| `docker-compose.prod.yml` | Produção com Nginx |
| `scripts/healthcheck.js` | Verificação de saúde |

### 🔄 Fluxo de Build Multi-Stage

```
Dockerfile (Multi-Stage Build)
│
├─ STAGE 1: Builder (1.5 GB)
│  ├─ FROM node:20-alpine
│  ├─ npm ci (instala todas as deps)
│  ├─ npm run build (compila React/Vite)
│  └─ Resultado: /app/dist (150 MB)
│
├─ DESCARTA Stage 1
│
└─ STAGE 2: Production (200 MB final)
   ├─ FROM node:20-alpine (novo)
   ├─ npm ci --only=production (apenas deps de produção)
   ├─ COPY --from=builder /app/dist ./dist
   ├─ npm install -g serve (server estático)
   └─ CMD: serve -s dist -l 3000
```

### 🏥 Health Check Flow

```
Docker HEALTHCHECK
│
├─ Interval: 30 segundos
├─ Timeout: 10 segundos
├─ Retries: 3 falhas = unhealthy
├─ Start Period: 5 segundos (permite aquecimento)
│
└─ Executa: node /app/scripts/healthcheck.js
   │
   ├─ GET http://localhost:3000
   │
   ├─ Status 200-399? 
   │  ├─ SIM → Exit 0 (healthy) ✓
   │  └─ NÃO → Exit 1 (unhealthy) ✗
   │
   └─ Timeout/Error? → Exit 1 (unhealthy) ✗
```

# Testes Unitários

Este projeto contém testes unitários implementados com **Vitest** e **Testing Library**.

## 📦 Dependências de Teste

- **Vitest** - Framework de testes rápido e moderno
- **@testing-library/react** - Utilitários para testar componentes React
- **@testing-library/jest-dom** - Matchers adicionais para testes DOM
- **happy-dom** - Ambiente de teste leve
- **msw** - Mock Service Worker para mockar APIs

## 🚀 Como Executar os Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes em modo watch (atualiza automaticamente)
```bash
npm test -- --watch
```

### Executar testes com interface gráfica
```bash
npm test:ui
```

### Executar testes com cobertura de código
```bash
npm test:coverage
```

## 📋 Testes Disponíveis

### 1. **useInputMasks.test.ts**
Testa as funções de máscara de entrada:
- `maskPhone()` - Formata números de telefone
  - Telefones com 10 dígitos (landline): (11) 4000-1234
  - Telefones com 11 dígitos (mobile): (11) 99988-7766
  - Remove caracteres não-numéricos automaticamente
- `maskCPF()` - Formata números de CPF
  - Formato: 123.456.789-01
  - Remove caracteres não-numéricos

### 2. **api.test.ts**
Testa as funções de serviço de API:
- `petService.getPets()` - Listar pets com paginação e busca
- `petService.getPetById()` - Buscar um pet por ID
- `tutorService.getTutorById()` - Buscar um tutor por ID
- `tutorService.getPetsByTutorId()` - Listar pets de um tutor
- `tutorService.linkPetToTutor()` - Vincular pet a tutor
- `tutorService.unlinkPetFromTutor()` - Remover vínculo pet-tutor

### 3. **text.test.tsx**
Testa o componente Text:
- Renderização com diferentes variantes (default, heading, blast, muted)
- Renderização com diferentes elementos HTML (div, h1, h2, span)
- Aplicação de classes customizadas
- Renderização de filhos e elementos aninhados

### 4. **search-bar.test.tsx**
Testa o componente SearchBar:
- Renderização do input de busca
- Exibição do termo de busca atual
- Chamada da função de callback ao mudar o input
- Atributos id e name corretos
- Múltiplas alterações sequenciais

### 5. **card-background.test.tsx**
Testa o componente CardBackground:
- Renderização de conteúdo filho
- Aplicação de classes customizadas
- Estilos de background corretos

## 📊 Estrutura de Testes

Cada arquivo de teste segue a estrutura:

```typescript
import { describe, it, expect } from 'vitest';

describe('Feature/Component Name', () => {
    it('should do something specific', () => {
        // Arrange - Preparar
        // Act - Executar
        // Assert - Verificar
        expect(result).toBe(expected);
    });
});
```

# Containerização com Docker e Deploy

## 📖 Guia Passo-a-Passo

### Passo 1: Entrar no diretório
```bash
cd guilhermenunesazevedo065005/pets-mt
```

### Passo 2: Build da aplicação
```bash
docker-compose build
```

### Passo 3: Iniciar
```bash
docker-compose up -d
```

### Passo 4: Verificar se está rodando
```bash
docker-compose ps
```

Você deve ver:
```
NAME          COMMAND            STATUS
pets-mt-app   serve -s dist...   Up 10 seconds (healthy) ✓
```

### Passo 5: Acessar
```
http://localhost:3000
```

### Passo 6: Ver logs
```bash
docker-compose logs -f pets-mt
```

### Passo 7: Parar
```bash
docker-compose down
```

---

## 🌍 Deploy em Produção

### Opção 1: Deploy com Docker Compose em VPS

```bash
# Conectar ao servidor
ssh user@seu-servidor.com

# Clonar ou transferir projeto
git clone seu-repo-url
cd pets-mt

# Fazer build
docker-compose build

# Iniciar aplicação
docker-compose up -d

# Verificar status
docker-compose ps
docker-compose logs
```

### Opção 2: Deploy em Kubernetes

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pets-mt
  labels:
    app: pets-mt
spec:
  replicas: 3
  selector:
    matchLabels:
      app: pets-mt
  template:
    metadata:
      labels:
        app: pets-mt
    spec:
      containers:
      - name: pets-mt
        image: seu-registry/pets-mt:latest
        ports:
        - containerPort: 3000
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 30
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
          failureThreshold: 3
        resources:
          limits:
            cpu: 500m
            memory: 512Mi
          requests:
            cpu: 250m
            memory: 256Mi
---
apiVersion: v1
kind: Service
metadata:
  name: pets-mt-service
spec:
  selector:
    app: pets-mt
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

Deploy no Kubernetes:
```bash
kubectl apply -f deployment.yaml
```

## 🌍 Caso Deseje Fazer o Deploy em Produção com Nginx

```bash
# Usar docker-compose.prod.yml
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Acessar
http://seu-servidor.com
```

---

## 📊 Verificar Saúde

```bash
# Status dos containers
docker-compose ps

# Deve mostrar: healthy

# Ou manualmente
curl http://localhost:3000
echo $?  # 0 = ok, 1 = erro
```

---

## 🔧 Liveness/Readiness (Kubernetes)

Liveness/Readiness com os seguintes probes:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pets-mt
spec:
  containers:
  - name: pets-mt
    image: pets-mt:latest
    
    # Liveness Probe - mata container se falhar
    livenessProbe:
      httpGet:
        path: /
        port: 3000
      initialDelaySeconds: 5    # Aguarda 5s antes de começar
      periodSeconds: 30         # Verifica a cada 30s
      timeoutSeconds: 10        # Timeout de 10s
      failureThreshold: 3       # 3 falhas = restart

    # Readiness Probe - remove do load balancer se falhar
    readinessProbe:
      httpGet:
        path: /
        port: 3000
      initialDelaySeconds: 5    # Aguarda 5s
      periodSeconds: 10         # Verifica a cada 10s
      timeoutSeconds: 5         # Timeout de 5s
      failureThreshold: 1       # 1 falha = remove do LB
```
