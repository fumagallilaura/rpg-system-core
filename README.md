![Status de Depreciação](https://img.shields.io/badge/Status-DEPRECATED-red?style=for-the-badge)

# RPG System - Core Package

[![NPM Version](https://img.shields.io/npm/v/@fumagallilaura/rpg-system-core.svg)](https://www.npmjs.com/package/@fumagallilaura/rpg-system-core)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

Este repositório contém o pacote NPM `@fumagallilaura/rpg-system-core`. Ele é a **fonte única da verdade** para os tipos de dados, interfaces e contratos compartilhados entre todos os microsserviços do ecossistema RPG System.

O objetivo deste pacote é garantir que todos os serviços "falem a mesma língua", prevenindo inconsistências e erros de comunicação.

## 🏛️ O que este Pacote Contém? (A Estratégia de Shared Kernel)

Este pacote segue a estratégia de **Shared Kernel** (Núcleo Compartilhado), contendo apenas código que é, por natureza, acoplado entre os serviços:

-   **Interfaces e Tipos TypeScript:** Definições para as entidades principais (`Personagem`, `Template`, etc.) e para os eventos do Kafka (`PersonagemIniciadoEvent`, `PersonagemProntoEvent`).
-   **Enums:** Enumeradores para valores constantes, como `StatusPersonagem` (`INICIADO`, `COMPLETO`, `ERRO`).
-   **Classes de Erro Comuns:** Erros customizados para manter um padrão de tratamento de exceções em todo o sistema.
-   **Constantes:** Nomes de tópicos do Kafka, chaves de configuração, etc.

**O que este pacote NUNCA deve conter:**
-   Lógica de negócio específica de um serviço.
-   Conexões com banco de dados ou qualquer outra infraestrutura.
-   Dependências de frameworks pesados como NestJS ou Express.

## 📦 Instalação e Uso

Como este é um pacote público no registro do NPM, a instalação é direta e não requer nenhuma configuração especial.

1.  **Instale o pacote em qualquer um dos seus microsserviços:**
    ```bash
    npm install @fumagallilaura/rpg-system-core
    ```

2.  **Use no seu código para garantir consistência e segurança de tipos.**

### Exemplo Prático: Usando os Tipos em um Microsserviço

Imagine que o nosso pacote `@fumagallilaura/rpg-system-core` exporta os seguintes tipos em seu arquivo `src/index.ts`:

```typescript
// DENTRO DE @fumagallilaura/rpg-system-core

export enum StatusPersonagem {
  INICIADO = 'INICIADO',
  COMPLETO = 'COMPLETO',
  ERRO = 'ERRO',
}

export interface Personagem {
  id: string;
  templateId: string;
  nome: string;
  nivel: number;
  status: StatusPersonagem;
}
```

Agora, em outro repositório, como o `rpg-system-api`, um desenvolvedor pode usar esses tipos para construir a lógica de negócio com segurança:

```typescript
// DENTRO DO MICROSSERVIÇO rpg-system-api

import { Personagem, StatusPersonagem } from '@fumagallilaura/rpg-system-core';
import { randomUUID } from 'crypto';

/**
 * Função que cria um objeto de personagem inicial antes de enviar para o Kafka.
 * Note como os tipos importados garantem que o objeto `novoPersonagem`
 * tenha exatamente a estrutura que todos os outros serviços esperam.
 */
function criarPersonagemInicial(nome: string, templateId: string): Personagem {
  const novoPersonagem: Personagem = {
    id: randomUUID(),
    templateId: templateId,
    nome: nome,
    nivel: 1, // Todo personagem começa no nível 1
    status: StatusPersonagem.INICIADO, // Usando o Enum importado
  };

  console.log(`Personagem '${novoPersonagem.nome}' criado com status '${novoPersonagem.status}'.`);

  // Este objeto agora pode ser salvo no banco e enviado para o Kafka.
  return novoPersonagem;
}

// Exemplo de chamada da função
const templateIdEscolhido = 'uuid-do-template-de-guerreiro';
const personagemGerado = criarPersonagemInicial('Grog', templateIdEscolhido);
```

#### Vantagens Demonstradas no Exemplo:

* **Segurança de Tipos (Type Safety):** O TypeScript irá gerar um erro se você tentar criar um objeto `Personagem` sem o campo `id` ou com um `status` que não seja um dos valores do enum `StatusPersonagem`.
* **Autocompletar (IntelliSense):** Seu editor de código saberá exatamente quais campos um objeto `Personagem` possui, acelerando o desenvolvimento.
* **Consistência:** Garante que a "definição" de um Personagem é a mesma na API, no gerador de stats e no serviço de notificação.

## 🤝 Como Contribuir

Qualquer alteração neste pacote pode impactar múltiplos serviços. Portanto, o processo de contribuição deve ser cuidadoso.

1.  **Abra uma Issue:** Discuta a mudança que você deseja fazer em uma issue antes de começar a codificar.
2.  **Crie um Pull Request:** Siga as diretrizes de código do projeto. Assegure-se de que todos os testes estão passando.
3.  **Aprovação e Merge:** Após a aprovação e o merge do PR na branch `main`, a nova versão poderá ser publicada.

## 🚀 Versionamento e Publicação

Publicar uma nova versão no NPM é um processo deliberado que deve ser feito a partir da branch `main` atualizada.

#### Passo 1: Sincronize sua Branch `main`
Antes de tudo, garanta que você está na branch `main` e com a versão mais recente do código.
```bash
git checkout main
git pull origin main
```

#### Passo 2: Atualize a Versão do Pacote
Use o comando `npm version` para atualizar o número da versão no `package.json` e criar um commit + tag de Git automaticamente.

-   Para correções de bugs (`x.x.1`): `npm version patch`
-   Para novas features (`x.1.x`): `npm version minor`
-   Para mudanças que quebram a compatibilidade (`2.x.x`): `npm version major`

#### Passo 3: Publique no NPM
Com a nova versão commitada, publique o pacote no registro do NPM.
```bash
npm publish
```

#### Passo 4: Envie as Mudanças para o GitHub
O comando `npm version` cria um commit e uma tag localmente. Você precisa enviá-los para o repositório remoto.
```bash
git push origin main --follow-tags
```
---
#### **Resumo Rápido do Fluxo de Publicação:**
```bash
# 1. Sincronizar
git checkout main && git pull origin main
# 2. Versionar (escolha um)
npm version patch
# 3. Publicar
npm publish
# 4. Enviar para o Git
git push origin main --follow-tags
```
