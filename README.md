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
É um registro público que permite cadastrar, editar, excluir e apresentar dados de Pets e tutores do Estado de Mato Grosso.

## Sobre a aplicação
A aplicação é uma Single Page Application (SPA) desenvolvida com **React 19.2.0** e **TypeScript 5.9.3**, implementando uma arquitetura modular baseada em componentes com separação de responsabilidades. Também utiliza bibliotecas como Axios para fazer chamadas a API, React Router para simular navegação de páginas dentro do SPA e Tailwind para auxiliar no estilo da aplicação.

A arquitetura implementa dois padrões principais:
- **Padrão Facade**: Simplifica a interação entre componentes e serviços
- **Gerenciamento de Estado com RxJS**: Usa BehaviorSubject para estado reativo centralizado

### 🔐 Sistema de Autenticação
A aplicação implementa um sistema robusto de autenticação com refresh automático de tokens:
- **Login**: Credenciais (username/password) → access_token + refresh_token
- **Requisições**: Todas as requisições usam o access_token no header Authorization
- **Refresh Automático**: Se uma requisição retorna 401, o refresh_token é usado para obter novos tokens
- **Logout Automático**: Se o refresh falha, o usuário é redirecionado para o login


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
├── context/             # Contextos React (autenticação)
│   └── AuthContext.tsx  # Gerenciamento de estado de autenticação
├── facade/              # Padrão Facade (camada de abstração)
│   └── ApplicationFacade.ts # Interface simplificada de negócio
├── hooks/               # Hooks personalizados
│   ├── useInputMasks.ts # Formatação de entrada (telefone, CPF)
│   ├── useAuth.ts       # Gerenciamento de autenticação
│   ├── usePetDetails.ts # Busca de detalhes do pet
│   └── useObservable.ts # Conversão de RxJS Observable → React state
├── pages/               # Páginas principais da aplicação
│   ├── LoginPage.tsx
│   ├── HomePage.tsx
│   ├── PetDetailsPage.tsx
│   ├── PetFormPage.tsx
│   ├── TutorDetailsPage.tsx
│   └── TutorFormPage.tsx
├── services/            # Serviços HTTP (camada de rede)
│   ├── api.ts           # Cliente HTTP com Axios
│   ├── api.test.ts      # Testes dos serviços
│   └── axiosSetup.ts    # Configuração de interceptadores
├── store/               # Gerenciamento de estado com RxJS
│   └── StateStore.ts    # BehaviorSubject para estado reativo
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
| `LoginPage` | Formulário de autenticação (username/password) com refresh automático |
| `HomePage` | Listagem paginada de pets com busca |
| `PetDetailsPage` | Detalhes completos do pet com tutores vinculados e opção de deletar |
| `PetFormPage` | Criar/editar pet com upload de foto |
| `TutorDetailsPage` | Detalhes do tutor com pets vinculados |
| `TutorFormPage` | Criar/editar tutor com upload de foto |

**Características:**
- ✅ Carregadas via lazy loading (React.lazy)
- ✅ Suspense fallback com LoadingFallback
- ✅ Gerenciam estado local (useState)
- ✅ Integram múltiplos componentes

#### **3. Hooks Personalizados**

**useAuth**
```typescript
// Gerencia autenticação (login, refresh, logout)
// Usa o Facade (ApplicationFacade) por baixo
const { isAuthenticated, accessToken, login, logout } = useAuth();

await login('admin', 'admin');  // Usa appFacade.login()
logout();                        // Usa appFacade.logout()
```

**useObservable**
```typescript
// Converte RxJS Observables em React state
// Simplifica o uso de BehaviorSubjects em componentes
const authState = useObservable(stateStore.auth$, initialValue);
const petsState = useObservable(stateStore.pets$, initialValue);
```

**useAppState**
```typescript
// Acesso completo ao estado global da aplicação
const { auth, pets, tutors, app } = useAppState();

// Uso em componentes
function HomePage() {
    const { pets, loading } = useAppState();
    return (
        <div>
            {loading ? <Spinner /> : <PetsList pets={pets.pets} />}
        </div>
    );
}
```

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
// Auth Service
authService.login(username, password)          // POST /autenticacao/login
authService.refresh(refreshToken)              // PUT /autenticacao/refresh

// Pet Service
petService.getPets(token, page, searchTerm)
petService.getPetById(token, id)
petService.createPet(token, petData)
petService.updatePet(token, id, petData)
petService.uploadPetPhoto(token, petId, file)
petService.deletePet(token, id)

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
- ✅ Interceptor automático de refresh de tokens
- ✅ Testes unitários (api.test.ts)

#### **6. Store Layer (StateStore com RxJS)**

Gerencia estado centralizado com BehaviorSubjects:

```typescript
// StateStore - Fonte única de verdade
export class StateStore {
    // BehaviorSubjects privados
    private authSubject = new BehaviorSubject<AuthState>(initial);
    private petSubject = new BehaviorSubject<PetState>(initial);

    // Observables públicos (read-only)
    readonly auth$ = this.authSubject.asObservable();
    readonly pets$ = this.petSubject.asObservable();

    // Métodos para atualizar estado
    setAuthSuccess(token: string, refreshToken: string) {
        this.authSubject.next({ ... });
    }

    addPet(pet: Pet) {
        const current = this.petSubject.value;
        this.petSubject.next({ ...current, pets: [...] });
    }
}

// Uso em componentes
const authState = useObservable(stateStore.auth$, initial);
const petsState = useObservable(stateStore.pets$, initial);
```

**Características:**
- ✅ Fonte única de verdade (SSOT)
- ✅ Reatividade automática
- ✅ Estado imutável
- ✅ Sincronização automática entre componentes

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

#### **1. Padrão Facade com Arquitetura em Camadas**

A aplicação implementa uma arquitetura em **4 camadas** com o padrão Facade:

```
┌─────────────────────────────────────────────────────┐
│  Presentation Layer (Componentes React)             │
│  - LoginPage, HomePage, PetDetailsPage, etc.       │
└────────────────┬────────────────────────────────────┘
                 │
                 ↓ usa
┌─────────────────────────────────────────────────────┐
│  Facade Layer (ApplicationFacade)                    │
│  - login(), loadPets(), updatePet(), etc.          │
│  - Simplifica operações complexas                   │
│  - Orquestra chamadas de serviços e estado         │
└────────────────┬────────────────────────────────────┘
                 │
      ┌──────────┼──────────┐
      ↓          ↓          ↓
┌──────────┐  ┌────────┐  ┌───────────┐
│  State   │  │Services│  │Interceptor│
│  Layer   │  │ Layer  │  │ Layer     │
│(RxJS)    │  │(API)   │  │(Axios)    │
└──────────┘  └────────┘  └───────────┘
```

**Benefícios:**
- ✅ Separação clara de responsabilidades
- ✅ Componentes não precisam conhecer detalhes da API
- ✅ Fácil testes (mock do Facade)
- ✅ Código mais legível e manutenível

#### **2. Autenticação com Context API**
```typescript
// Usar contexto para compartilhar estado de autenticação
<AuthProvider>
  <AppContent />
</AuthProvider>

// Em qualquer componente
const { isAuthenticated, accessToken, login, logout } = useAuthContext();
```
- ✅ Estado de autenticação centralizado
- ✅ Tokens persistidos no localStorage
- ✅ Refresh automático transparente ao usuário

#### **2. Gerenciamento de Estado Reativo com RxJS e BehaviorSubject**

```typescript
// StateStore.ts - Gerenciador centralizado com RxJS
export class StateStore {
    // BehaviorSubjects privados (fonte única de verdade)
    private authSubject = new BehaviorSubject<AuthState>(initialAuthState);
    private petSubject = new BehaviorSubject<PetState>(initialPetState);
    private tutorSubject = new BehaviorSubject<TutorState>(initialTutorState);

    // Observables públicos (read-only)
    readonly auth$ = this.authSubject.asObservable();
    readonly pets$ = this.petSubject.asObservable();
    readonly tutors$ = this.tutorSubject.asObservable();

    // Métodos para atualizar estado
    setAuthSuccess(token: string, refreshToken: string) {
        this.authSubject.next({ isAuthenticated: true, ... });
    }

    addPet(pet: Pet) {
        const current = this.petSubject.value;
        this.petSubject.next({ ...current, pets: [pet, ...current.pets] });
    }
}

// useObservable.ts - Hook para consumir observables no React
export function useObservable<T>(observable: Observable<T>): T {
    const [state, setState] = useState<T>(initialValue);
    
    useEffect(() => {
        const subscription = observable.subscribe(setState);
        return () => subscription.unsubscribe();
    }, [observable]);

    return state;
}

// Uso em componentes
const { pets, loading } = useAppState();
```

**Benefícios:**
- ✅ Fonte única de verdade (Single Source of Truth)
- ✅ Reatividade built-in
- ✅ Fácil debug com RxJS DevTools
- ✅ Performance otimizada (observables)
- ✅ Funciona perfeitamente com async/await

#### **3. Contexto de Autenticação com Context API**
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

#### **4. Interceptor de Refresh Automático**
```typescript
// Configurado uma vez na inicialização
setupAxiosInterceptors(
  getAccessToken,   // Função que retorna access_token atual
  getRefreshToken,  // Função que retorna refresh_token atual
  onRefresh,        // Callback quando token é renovado
  onTokenExpired    // Callback quando refresh falha
);

// Resultado:
// - Requisições 401 disparam refresh automático
// - Requisição original é retentada com novo token
// - Se refresh falha, usuário é deslogado
```
- ✅ Transparente para componentes
- ✅ Sem propagação de erros 401
- ✅ Melhor UX (usuário nunca vê erro de expiração)

#### **5. Lazy Loading com Suspense**
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
LoginPage        → UI de autenticação
AuthContext      → Estado de autenticação (global)
useAuth          → Lógica de autenticação
authService      → Chamadas HTTP de autenticação
axiosSetup       → Interceptador de refresh automático
ProtectedRoute   → Guarda de rota com autenticação
Components       → Renderização e interação visual
Pages            → Lógica de página e fluxo
Services         → Comunicação com API
Hooks            → Lógica reutilizável
Types            → Contrato de dados
```

### 🔐 Autenticação e Autorização

```typescript
// Fluxo de autenticação:
1. Usuário entra em /login
2. Submete username + password
3. POST /autenticacao/login → { access_token, refresh_token }
4. Tokens armazenados no localStorage
5. Usuário redirecionado para home

// Requisições subsequentes:
6. Todas requisições incluem access_token no header Authorization
7. Se 401 recebido → PUT /autenticacao/refresh com refresh_token
8. Novo access_token + refresh_token retornados
9. Requisição original é retentada com novo token
10. Se refresh falha → Logout automático e redirecionamento para login

// Contexto de autenticação:
<AuthProvider>
  ↓
  <useAuthContext> → { isAuthenticated, accessToken, login, logout }
  ↓
  <ProtectedRoute> → Redireciona para /login se não autenticado
```

**Armazenamento de Tokens:**
- `localStorage.pets_mt_access_token` - Access token (curta duração)
- `localStorage.pets_mt_refresh_token` - Refresh token (longa duração)
- Tokens persistem entre sessões (refresh automático ao carregar app)

### 🔗 Roteamento

```typescript
// React Router v7.13.0 - Roteamento declarativo

GET  /login              → LoginPage (sem autenticação)
GET  /                   → HomePage (com autenticação)
GET  /pet/:id            → PetDetailsPage (com autenticação)
GET  /pet/form/new       → PetFormPage (com autenticação)
PUT  /pet/form/:id       → PetFormPage (com autenticação)
GET  /tutor/:id          → TutorDetailsPage (com autenticação)
GET  /tutor/form/new     → TutorFormPage (com autenticação)
PUT  /tutor/form/:id     → TutorFormPage (com autenticação)

// Rotas protegidas redirecionam para /login se não autenticado
// Todas as rotas da aplicação usam o contexto AuthContext
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
| RxJS | 7.8.1 | Gerenciamento de estado reativo |
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
- `authService.login()` - Fazer login com username/password
- `authService.refresh()` - Renovar tokens com refresh_token
- `petService.getPets()` - Listar pets com paginação e busca
- `petService.getPetById()` - Buscar um pet por ID
- `petService.deletePet()` - Deletar um pet por ID
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
