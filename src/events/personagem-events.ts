/**
 * Contrato do evento publicado no Kafka quando um novo personagem
 * é solicitado. O service-stats-generator vai consumir este evento.
 */
export interface PersonagemIniciadoEvent {
    personagemId: string;
    templateId: string;
  }
  
  /**
   * Contrato do evento publicado no Kafka quando um personagem está
   * completamente pronto. O service-notificacoes vai consumir este evento.
   */
  export interface PersonagemProntoEvent {
    personagemId: string;
    nomeDoPersonagem: string;
  }