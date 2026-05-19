/** Conteúdo editorial do app — edite aqui sem alterar telas */

export const saoJoaoHistory = {
  title: 'A História do São João de Arcoverde',
  subtitle: 'Tradição, fé e forró no coração do Sertão de Pernambuco',
  paragraphs: [
    'O São João de Arcoverde é uma das maiores festas juninas do interior pernambucano. Todo ano, a cidade se veste de bandeirinhas, quadrilhas e sanfona para celebrar São João, reunindo moradores e visitantes em noites de muita alegria.',
    'Com polos espalhados pelo município, o evento mistura grandes shows, manifestações culturais como o coco e a quadrilha, comidas típicas e a hospitalidade marcante do povo arcoverdense.',
    'Em 2026, a festa segue fortalecendo essa tradição com programação diversa — do forró pé de serra aos grandes nomes da música nordestina — mantendo viva a essência junina que faz de Arcoverde um destino especial no calendário do São João.',
  ],
  highlights: [
    'Mais de 15 dias de festa',
    'Cultura nordestina e quadrilhas',
    'Shows nacionais e artistas regionais',
  ],
};

export interface Developer {
  id: string;
  name: string;
  role: string;
  /** URL da foto (opcional) */
  avatar?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  email?: string;
  website?: string;
}

export const appInfo = {
  name: 'São João Arcoverde',
  version: '1.0.0',
  description: 'Guia oficial da festa junina de Arcoverde — PE',
};

/** Cadastre a equipe em developers[] para exibir na tela Desenvolvedores. */
export const developers: Developer[] = [];
