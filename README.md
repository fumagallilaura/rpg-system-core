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

2.  **Use no seu código:**
    ```typescript
    import { Personagem, PersonagemIniciadoEvent } from '@fumagallilaura/rpg-system-core';

    // Agora você pode usar os tipos importados
    function processarEvento(evento: PersonagemIniciadoEvent): Personagem {
      // ... sua lógica
    }
    ```

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
Use o comando `npm version` para atualizar o número da versão no `package.json` e criar um commit + tag de Git automaticamente. Escolha uma das opções a seguir, de acordo com o [Versionamento Semântico (SemVer)](https://semver.org/lang/pt-BR/):

-   **PATCH (`x.x.1`):** Para correções de bugs que não quebram a compatibilidade.
    ```bash
    npm version patch
    ```

-   **MINOR (`x.1.x`):** Para novas funcionalidades que não quebram a compatibilidade.
    ```bash
    npm version minor
    ```

-   **MAJOR (`2.x.x`):** Para mudanças que quebram a compatibilidade.
    ```bash
    npm version major
    ```

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
*(A flag `--follow-tags` garante que a nova tag de versão seja enviada junto com o commit.)*

---
#### **Resumo Rápido do Fluxo de Publicação:**
```bash
# 1. Sincronizar
git checkout main
git pull origin main

# 2. Versionar (escolha um)
npm version patch

# 3. Publicar
npm publish

# 4. Enviar para o Git
git push origin main --follow-tags
```