/**
 * Representa um sistema de RPG, como "Dungeons & Dragons 5e".
 * É a entidade de mais alto nível para agrupar as regras.
 */
export interface Sistema {
    id: string; // UUID
    nome: string;
    versao?: string;
  }
  
  /**
   * Representa um "molde" ou "receita" de ficha dentro de um Sistema.
   * Ex: "Ficha de Jogador Padrão", "Ficha de Monstro".
   * É o Template que define quais atributos e regras serão usados.
   */
  export interface Template {
    id: string; // UUID
    sistema_id: string; // Relaciona-se com a interface Sistema
    nome: string;
  }