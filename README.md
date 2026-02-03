# Projeto Front End - Pets MT - guilhermenunesazevedo065005


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

