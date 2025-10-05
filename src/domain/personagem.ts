/**
 * Enum para os status do ciclo de vida da criação de um personagem.
 * Usar um enum previne erros de digitação e mantém a consistência.
 */
export enum StatusPersonagem {
    INICIADO = 'INICIADO',
    PROCESSANDO_STATS = 'PROCESSANDO_STATS',
    PROCESSANDO_BACKSTORY = 'PROCESSANDO_BACKSTORY',
    COMPLETO = 'COMPLETO',
    ERRO = 'ERRO',
  }
  
  /**
   * Representa a entidade principal do nosso sistema: um personagem de RPG.
   * Esta interface será usada em toda a comunicação entre os serviços.
   */
  export interface Personagem {
    id: string; // UUID
    templateId: string; // O ID do Template usado como base
    nome?: string; // Opcional no início, pode ser gerado depois
    status: StatusPersonagem;
  }