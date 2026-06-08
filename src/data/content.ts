/** Conteúdo editorial do app — edite aqui sem alterar telas */

export interface ArcoverdeHistoryItem {
  title: string;
  text: string;
}

export interface ArcoverdeHistorySection {
  title: string;
  paragraphs: string[];
  items?: ArcoverdeHistoryItem[];
}

export const arcoverdeHistory = {
  title: 'História de Arcoverde',
  subtitle: 'A Porta de Entrada do Sertão pernambucano',
  intro:
    'Arcoverde é conhecida como a "Porta de Entrada do Sertão" pernambucano. A cidade une uma rica trajetória de desenvolvimento econômico a uma identidade cultural vibrante, consolidando-se como um dos maiores polos de tradição e arte do interior do estado.',
  sections: [
    {
      title: 'A História: Da Caatinga aos Trilhos do Progresso',
      paragraphs: [
        'O surgimento de Arcoverde remonta ao início dos anos 1800. Originalmente, a região era uma vasta área de caatinga habitada por povos indígenas, com destaque para os Xucurus de Ararobá.',
        'Com o avanço das fazendas de gado, começou a se formar um pequeno povoado chamado Olho d\'Água dos Bredos. Em 1812, o fazendeiro português Leonardo Pacheco Couto ergueu uma capela dedicada a Nossa Senhora do Livramento, impulsionando o crescimento do local ao longo do antigo "caminho das boiadas".',
        'A grande transformação aconteceu no início do século XX:',
      ],
      items: [
        {
          title: 'A Estrada de Ferro (1912)',
          text: 'A chegada dos trilhos da linha férrea mudou o destino do povoado. O comércio disparou e a vila passou a se chamar Barão do Rio Branco (ou simplesmente Rio Branco).',
        },
        {
          title: 'Emancipação (1928)',
          text: 'Em 11 de setembro de 1928, a localidade foi elevada à categoria de cidade.',
        },
        {
          title: 'O Nome Atual (1943)',
          text: 'O município foi rebatizado como Arcoverde. O nome é uma homenagem a Dom Joaquim Arcoverde Albuquerque Cavalcanti, o primeiro Cardeal do Brasil e da América Latina, nascido na Fazenda Fundão, localizada no município.',
        },
      ],
    },
    {
      title: 'As Tradições Culturais: O Coração do Sertão',
      paragraphs: [
        'Arcoverde ferve culturalmente o ano inteiro, sendo um celeiro de artistas, músicos e artesãos. Suas tradições mais fortes incluem:',
      ],
      items: [
        {
          title: 'O Samba de Coco e o "Trupé"',
          text: 'O município é a Capital do Samba de Coco. Essa dança ancestral de origem negra e indígena ganhou projeção nacional. A principal característica do coco arcoverdense é o trupé — a batida rápida e ritmada dos pés usando tamancos de madeira artesanais, que ecoa como um instrumento de percussão sobre o chão. Grupos icônicos como o Samba de Coco Raízes de Arcoverde (fundado pelas famílias Lopes e Calixto) e o Samba de Coco Trupé mantêm essa chama acesa no Alto do Cruzeiro.',
        },
        {
          title: 'O São João de Arcoverde',
          text: 'Considerado um dos festejos juninos mais autênticos do Nordeste, o São João da cidade atrai milhares de turistas. A festa preserva a essência do forró pé-de-serra e da cultura popular, sem perder o espaço para grandes shows nacionais. O destaque absoluto é a Caminhada do Forró, que arrasta multidões fantasiadas pelas ruas.',
        },
        {
          title: 'O Carnaval Folia dos Bois',
          text: 'Durante o período de Momo, as ruas de Arcoverde são invadidas pelo colorido da Folia dos Bois. Dezenas de agremiações tradicionais, como o Boi Maracatu, Boi Furioso e Boi Bola de Fogo, desfilam competindo em criatividade, música e coreografia.',
        },
        {
          title: 'Artesanato e Renda Renascença',
          text: 'Na economia criativa, a cidade se destaca como um importante polo de produção e comércio da Renda Renascença e de bordados delicados, uma técnica artesanal refinada trazida por freiras europeias que se tornou sustento e orgulho de centenas de famílias da região.',
        },
      ],
    },
  ] satisfies ArcoverdeHistorySection[],
  highlights: [
    'Capital do Samba de Coco',
    'São João de Arcoverde',
    'Folia dos Bois',
    'Renda Renascença',
  ],
};

export interface Developer {
  id: string;
  name: string;
  role: string;
  /** URL ou asset local (require) */
  avatar?: string | number;
  github?: string;
  linkedin?: string;
  instagram?: string;
  email?: string;
  website?: string;
}

export const appInfo = {
  name: 'São João em Arcoverde',
  version: '1.0.0',
  description: 'Guia oficial da festa junina de Arcoverde — PE',
};

export const professorOrientador = {
  label: 'Professor Orientador',
  name: 'Willams de Jesus',
};

export const facultyInfo = {
  institution: 'Centro de Ensino Superior de Arcoverde (CESA)',
  course: 'Análise e Desenvolvimento de Sistemas',
  description:
    'Este aplicativo foi desenvolvido pelas alunas do Curso Tecnológico em Análise e Desenvolvimento de Sistemas, em projeto acadêmico da instituição de ensino superior de Arcoverde, com apoio da AESA e da Prefeitura de Arcoverde.',
  logo: require('../../assets/logo-faculdade.png'),
};

export const developers: Developer[] = [
  {
    id: 'marina-grazielly',
    name: 'Marina Grazielly',
    role: 'Desenvolvedora',
    avatar: require('../../assets/marina-grazielly.png'),
  },
  {
    id: 'raniely-bezerra',
    name: 'Raniely Bezerra',
    role: 'Desenvolvedora',
    avatar: require('../../assets/raniely-bezerra.png'),
  },
];
