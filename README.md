# Projeto Front End - Pets MT - guilhermenunesazevedo065005

## Sumário
- [Introdução](#introdução)
- [Como executar?](#como-executar)
- [Arquitetura](#arquitetura)
- [Como testar? - Testes Unitários](#como-testar---testes-unitários)
- [Containerização com Docker e Deploy](#containerização-com-docker-e-deploy)

# Introdução
## Dados de inscrição
| Inscrição | Nome | Data de Nascimento | PCD |
|----------|----------|----------|----------|
| 16300  | GUILHERME NUNES AZEVEDO  | 30/07/2003 | Não


## Vaga
| ANALISTA DE TI - PERFIL PROFISSIONAL/ESPECIALIDADE | 
|----------|
| Engenheiro da Computação - Sênior  |

## O que é Pets MT?
É um registro público que permite cadastrar, editar e apresentar dados de Pets e tutores do Estado de Mato Grosso.

## Sobre a aplicação
A aplicação é uma Single Page Application (SPA) desenvolvida com **React 19.2.0** e **TypeScript 5.9.3**, implementando uma arquitetura modular baseada em componentes com separação de responsabilidades. Também utiliza bibliotecas como Axios para fazer chamadas a API, React Router para simular navegação de páginas dentro do SPA e Tailwind para auxiliar no estilo da aplicação.


# Como executar?
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

#### Se desejar, também é possível

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

### 🏗️ Visão Geral da Arquitetura

A aplicação é uma Single Page Application (SPA) desenvolvida com **React 19.2.0** e **TypeScript 5.9.3**, implementando uma arquitetura modular baseada em componentes com separação clara de responsabilidades. Também utiliza bibliotecas como Axios para fazer as chamadas a API, React Router para simular navegação de páginas dentro do SPA e Tailwind para auxiliar no estilo da aplicação.

### 📁 Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
│   ├── button.tsx
│   ├── card-background.tsx
│   ├── card-data.tsx
│   ├── card.tsx
│   ├── search-bar.tsx
│   ├── text.tsx
│   └── *.test.tsx       # Testes dos componentes
├── hooks/               # Hooks personalizados
│   ├── useInputMasks.ts # Formatação de entrada (telefone, CPF)
│   └── usePetDetails.ts # Busca de detalhes do pet
├── pages/               # Páginas principais da aplicação
│   ├── HomePage.tsx
│   ├── PetDetailsPage.tsx
│   ├── PetFormPage.tsx
│   ├── TutorDetailsPage.tsx
│   └── TutorFormPage.tsx
├── services/            # Serviços de API e lógica de negócio
│   ├── api.ts           # Cliente HTTP com Axios
│   └── api.test.ts      # Testes dos serviços
├── loaders/             # Data loaders para pré-carregar dados
│   ├── get-pets.tsx
│   └── set-login.tsx
├── types/               # Definições de tipos TypeScript
│   └── index.ts
├── App.tsx              # Componente raiz com roteamento
├── main.tsx             # Ponto de entrada
└── index.css            # Estilos globais (Tailwind CSS)
```

### 📦 Módulos e Responsabilidades

#### **1. Components (Componentes Reutilizáveis)**

| Componente | Responsabilidade |
|-----------|-----------------|
| `Text` | Renderização de textos com variantes (heading, default, muted, blast) |
| `Button` | Botões estilizados com Tailwind CSS |
| `Card` | Cards para exibição de dados (pets/tutores) |
| `CardBackground` | Container com estilo de fundo da aplicação |
| `CardData` | Componente para estrutura de dados em cards |
| `SearchBar` | Input de busca com sincronização de estado |

**Características:**
- ✅ Totalmente reutilizáveis
- ✅ Sem estado (stateless)
- ✅ Recebem dados via props
- ✅ Testes unitários inclusos

#### **2. Pages (Páginas Principais)**

| Página | Funcionalidade |
|--------|----------------|
| `HomePage` | Listagem paginada de pets com busca |
| `PetDetailsPage` | Detalhes completos do pet com tutores vinculados |
| `PetFormPage` | Criar/editar pet com upload de foto |
| `TutorDetailsPage` | Detalhes do tutor com pets vinculados |
| `TutorFormPage` | Criar/editar tutor com upload de foto |

**Características:**
- ✅ Carregadas via lazy loading (React.lazy)
- ✅ Suspense fallback com LoadingFallback
- ✅ Gerenciam estado local (useState)
- ✅ Integram múltiplos componentes

#### **3. Hooks Personalizados**

**useInputMasks**
```typescript
// Fornece formatação de entrada
const { maskPhone, maskCPF } = useInputMasks();

maskPhone('11999887766')    // → (11) 99988-7766
maskCPF('12345678901')      // → 123.456.789-01
```

**usePetDetails**
```typescript
// Busca detalhes do pet com tutores associados
const { pet, loading, error } = usePetDetails(token, petId);
```

#### **4. Services (Camada de API)**

Centraliza toda comunicação HTTP com o backend:

```typescript
// Pet Service
petService.getPets(token, page, searchTerm)
petService.getPetById(token, id)
petService.createPet(token, petData)
petService.updatePet(token, id, petData)
petService.uploadPetPhoto(token, petId, file)

// Tutor Service
tutorService.getTutorById(token, id)
tutorService.createTutor(token, tutorData)
tutorService.updateTutor(token, id, tutorData)
tutorService.uploadTutorPhoto(token, tutorId, file)
tutorService.linkPetToTutor(token, tutorId, petId)
tutorService.unlinkPetFromTutor(token, tutorId, petId)
tutorService.getPetsByTutorId(token, tutorId)
```

**Características:**
- ✅ Client Axios com headers de autenticação
- ✅ Tipagem completa com TypeScript
- ✅ Tratamento de erros centralizado
- ✅ Testes unitários (api.test.ts)

#### **5. Types (Definições de Tipos)**

```typescript
// Entidade Pet
interface Pet {
    id: number;
    nome: string;
    raca: string;
    idade: number;
    foto: { id, nome, contentType, url };
    tutorIds?: number[];
}

// Entidade Tutor
interface Tutor {
    id: number;
    nome: string;
    email?: string;
    telefone?: string;
    endereco?: string;
    cpf?: number;
    foto?: { id, nome, contentType, url };
}

// Pet com detalhes (herança)
interface PetDetalhes extends Pet {
    tutores?: Tutor[];
}
```

**Características:**
- ✅ Tipagem forte em toda aplicação
- ✅ Evita erros em tempo de compilação
- ✅ Melhor autocompletar no IDE

#### **6. Loaders (Pré-carregamento de Dados)**

- get-pets.tsx → Busca lista paginada de pets
- set-login.tsx → Auto-autenticação ao carregar


### 🎯 Padrões e Melhores Práticas

#### **1. Lazy Loading com Suspense**
```typescript
const PetDetailsPage = lazy(() => import("./pages/PetDetailsPage"));

<Suspense fallback={<LoadingFallback />}>
  <Routes>
    <Route path="/pet/:id" element={<PetDetailsPage />} />
  </Routes>
</Suspense>
```
- ✅ Reduz tamanho do bundle inicial
- ✅ Carrega módulos sob demanda
- ✅ Melhor performance

#### **2. Type Safety Completo**
```typescript
// Sem any, sem coerção de tipos
// TypeScript captura erros antes da execução
const pet: Pet = await petService.getPetById(token, id);
```

#### **3. Composição de Componentes**
```typescript
// Componentes pequenos, focados, reutilizáveis
<Card pet={pet} onEdit={handleEdit} onDelete={handleDelete} />
<SearchBar searchTerm={term} onSearchChange={setTerm} />
<Text variant="heading" className="custom">Título</Text>
```

#### **4. State Management com Hooks**
```typescript
// useState para estado local
const [pets, setPets] = useState<Pet[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// useEffect para efeitos colaterais
useEffect(() => {
    fetchPets();
}, [token, currentPage, searchTerm]);
```

#### **5. Separação de Responsabilidades**
```
Components → Renderização e interação visual
Pages      → Lógica de página e fluxo
Services   → Comunicação com API
Hooks      → Lógica reutilizável
Types      → Contrato de dados
```

### 🔐 Autenticação e Autorização

```typescript
// Auto-login via set-login.tsx
POST /autenticacao/login → Recebe access_token
Token armazenado na memória (useState)
Passado em todas requisições via header Authorization
```

### 🔗 Roteamento

```typescript
// React Router v7.13.0 - Roteamento declarativo

GET  /                    → HomePage (listagem)
GET  /pet/:id             → PetDetailsPage (detalhes)
GET  /pet/form/new        → PetFormPage (criar)
PUT  /pet/form/:id        → PetFormPage (editar)
GET  /tutor/:id           → TutorDetailsPage (detalhes)
GET  /tutor/form/new      → TutorFormPage (criar)
PUT  /tutor/form/:id      → TutorFormPage (editar)
```

### 💅 Styling com Tailwind CSS 4.1.18

```typescript
// Tailwind CSS + CSS Custom Variables
// Tema customizado com cores e gradientes

<Text variant="heading" className="text-blue-500">
<Card className="bg-gray-800 rounded-lg shadow-lg">
<Button className="bg-green-500 hover:bg-green-600">
```

**Tema Customizado:**
- Fonte: Rubik
- Cores primárias: Blue, Green
- Dark mode

### ✅ Testes Unitários

```typescript
// Vitest + Testing Library
npm test                    // Todos os testes
npm test -- --watch        // Modo watch
npm test:ui                // Interface gráfica
npm test:coverage          // Cobertura

// Testes inclusos:
✓ useInputMasks.test.ts    (10 testes)
✓ api.test.ts              (8 testes)
✓ text.test.tsx            (8 testes)
✓ search-bar.test.tsx      (6 testes)
✓ card-background.test.tsx (3 testes)
```

### 📈 Performance

- ✅ Lazy loading de rotas
- ✅ Code splitting automático
- ✅ Tailwind CSS purged
- ✅ React Compiler ativo (babel-plugin-react-compiler)
- ✅ Build otimizado com Vite

### 🎯 Stack Tecnológico React

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React | 19.2.0 | Framework principal |
| React Router | 7.13.0 | Roteamento SPA |
| TypeScript | 5.9.3 | Type safety |
| Vite | 7.2.4 | Build tool |
| Tailwind CSS | 4.1.18 | Styling |
| Axios | 1.13.4 | HTTP client |
| Vitest | 4.0.18 | Testes unitários |
| Testing Library | 16.3.2 | Testes de componentes |

---

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

# Como testar? - Testes Unitários

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
