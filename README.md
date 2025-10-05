# RPG System - Core Package

<!-- [![npm version](https://img.shields.io/npm/v/@fumagallilaura/rpg-system-core.svg)](https://www.npmjs.com/package/@fumagallilaura/rpg-system-core) -->

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

Este é um pacote NPM. Para instalá-lo em um microsserviço, você precisa estar autenticado no GitHub Packages.

1.  **Configure seu arquivo `.npmrc`:** Crie um arquivo `.npmrc` na raiz do projeto do seu microsserviço com o seguinte conteúdo:
    ```
    @fumagallilaura:registry=[https://npm.pkg.github.com/](https://npm.pkg.github.com/)
    ```

2.  **Instale o pacote:**
    ```bash
    npm install @fumagallilaura/rpg-system-core
    ```

3.  **Use no seu código:**
    ```typescript
    import { Personagem, PersonagemIniciadoEvent } from '@fumagallilaura/rpg-system-core';

    // Agora você pode usar os tipos importados
    function processarEvento(evento: PersonagemIniciadoEvent): Personagem {
      // ... sua lógica
    }
    ```

## 🤝 Como Contribuir e Publicar uma Nova Versão

Qualquer alteração neste pacote pode impactar múltiplos serviços. Portanto, o processo de contribuição é mais rigoroso.

1.  **Abra uma Issue:** Discuta a mudança que você deseja fazer em uma issue antes de começar a codificar.
2.  **Crie um Pull Request:** Siga as diretrizes de código do projeto.
3.  **Atualize a Versão:** Após a aprovação do PR, o mantenedor do projeto deve atualizar a versão do pacote no arquivo `package.json` seguindo o [Versionamento Semântico (SemVer)](https://semver.org/lang/pt-BR/).
    -   **PATCH (`x.x.1`):** Para correções de bugs retrocompatíveis.
    -   **MINOR (`x.1.x`):** Para novas funcionalidades retrocompatíveis (ex: adicionar um novo campo opcional a uma interface).
    -   **MAJOR (`2.x.x`):** Para mudanças que quebram a compatibilidade (ex: remover um campo ou renomear uma interface).
4.  **Publique no GitHub Packages:** O mantenedor deve rodar o comando para publicar a nova versão. É recomendado automatizar este passo com GitHub Actions.

**Atenção:** Após a publicação de uma nova versão, será necessário atualizar a dependência em todos os microsserviços que utilizam este pacote.