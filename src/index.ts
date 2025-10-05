/**
 * Este arquivo é o ponto de entrada do pacote @fumagallilaura/rpg-system-core.
 * Ele exporta todos os tipos e interfaces públicas para que os microsserviços
 * possam importá-los de um local centralizado.
 * * Exemplo de uso em outro serviço:
 * import { Personagem, StatusPersonagem, PersonagemIniciadoEvent } from '@fumagallilaura/rpg-system-core';
 */

export * from './domain/personagem';
export * from './domain/sistema';
export * from './events/personagem-events';