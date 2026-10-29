/**
 * FONTE DE VERDADE VERIFICADA — SEÇÃO 0
 * Único módulo com fatos históricos, engenharia real e referências de linha da Kenner.
 * Projeto conceitual / direção de arte independente. Zero dados inventados.
 */

export interface EngineeringLayer {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  technicalParallel: string;
  cameraPreset: {
    position: [number, number, number];
    rotation: [number, number, number];
    targetLabel: string;
  };
}

export interface ReferenceLine {
  id: 'rakka' | 'kivah' | 'megah';
  name: string;
  yearOrEra: string;
  positioning: string;
  engineeringSummary: string;
  isPrimary3DReference?: boolean;
}

export interface TimelineMilestone {
  year: string;
  location: string;
  headline: string;
  detail: string;
}

export const BRAND_DATA = {
  meta: {
    brandName: 'KENNER',
    foundedYear: 1988,
    foundedCity: 'Rio de Janeiro, RJ',
    founder: 'Peter Simon',
    currentCEO: 'Thomas Simon',
    parentGroup: 'Grupo S2 (ao lado de Redley e Cantão)',
    firstSponsoredAthlete: {
      year: 1990,
      name: 'Pedro Muller',
      sport: 'Surf',
    },
    officialWebsite: 'https://www.kenner.com.br',
    conceptualDisclaimer:
      'Projeto conceitual independente de direção criativa e visualização 3D. A geometria tridimensional apresentada é uma interpretação conceitual inspirada na arquitetura da linha Rakka — não representa reprodução industrial exata nem comunicação institucional oficial.',
  },

  hero: {
    kicker: 'RIO DE JANEIRO • DESDE 1988 • CONCEITO DIGITAL',
    headlineTop: 'KENNER',
    headlineBottom: 'FEITA PRA MARCAR PRESENÇA.',
    lead: 'Nascida na brisa das praias cariocas e forjada no concreto das metrópoles. Onde a borracha vulcanizada de alta engenharia encontra o pulso real da cultura de rua brasileira.',
    ctaPrimary: 'EXPLORE A KENNER',
    scrollPrompt: 'ROLE PARA INSPECIONAR A ARQUITETURA',
    modelReferenceTag: 'INTERPRETAÇÃO CONCEITUAL 3D — REF. LINHA RAKKA',
  },

  heritageTimeline: [
    {
      year: '1988',
      location: 'ZONA SUL, RIO DE JANEIRO',
      headline: 'A Origem Carioca',
      detail:
        'Fundada por Peter Simon no Rio de Janeiro dentro do ecossistema do Grupo S2 (ao lado de Redley e Cantão), inicialmente inspirada nos chinelos praianos dos surfistas californianos.',
    },
    {
      year: '1990',
      location: 'LITORAL BRASILEIRO',
      headline: 'Primeiro Atleta Patrocinado',
      detail:
        'Patrocínio ao surfista Pedro Muller, consolidando a presença autêntica nas areias antes da transição para o asfalto urbano.',
    },
    {
      year: 'ANOS 2000',
      location: 'ASFALTO & PERIFERIA',
      headline: 'A Virada Cultural',
      detail:
        'Após atravessar a crise dos importados nos anos 1990, a marca se reposiciona nos anos 2000, cria a linha Kivah em 2001 e passa a ser adotada organicamente pelas periferias e pelo movimento funk.',
    },
    {
      year: 'PRESENTE',
      location: 'DO BAILE PARA O MUNDO',
      headline: 'Liderança & Expansão Global',
      detail:
        'Sob a liderança do CEO Thomas Simon, soma colaborações no rap, no funk e no futebol com expansão internacional em curso — mantendo o pino metálico "K" como selo de identidade.',
    },
  ] satisfies TimelineMilestone[],

  engineering: {
    sectionKicker: '02 // BUILT DIFFERENT — ENGENHARIA DE PRODUTO',
    sectionHeadline: 'A MESMA ENGENHARIA QUE SEGURA UM CARRO NA PISTA.',
    sectionLead:
      'Nada aqui é ornamento vazio. Cada milímetro responde ao atrito do concreto, ao impacto do passo e à umidade do clima tropical.',
    layers: [
      {
        id: 'vulcanized-sole',
        code: 'ENG-01 // SOLADO',
        title: 'Borracha Vulcanizada Megatratorada',
        subtitle: 'Processo químico análogo à fabricação de pneus',
        description:
          'Composto de borracha submetido à vulcanização sob calor e pressão, esculpido em desenhos tratorados com canaletas anguladas para tração agressiva no asfalto seco ou molhado.',
        technicalParallel: 'Paralelo industrial: vulcanização de pneus de alta aderência.',
        cameraPreset: {
          position: [0.25, -0.32, 1.95],
          rotation: [-0.48, 0.65, 0.12],
          targetLabel: 'SOLADO VULCANIZADO & CANALETAS ANGULADAS',
        },
      },
      {
        id: 'reamp-heel',
        code: 'ENG-02 // AMORTECIMENTO',
        title: 'Peça Amortecedora Vazada Re.Amp',
        subtitle: 'Absorção mecânica de impacto no calcanhar',
        description:
          'Arquitetura da linha Rakka com cavidade estrutural vazada no calcanhar. Atua como zona de deformação controlada, dissipando a energia vertical a cada pisada no concreto.',
        technicalParallel: 'Geometria funcional Re.Amp integrada ao bloco tratorado.',
        cameraPreset: {
          position: [-0.42, -0.1, 1.85],
          rotation: [0.16, 2.35, -0.08],
          targetLabel: 'CAVIDADE ESTRUTURAL RE.AMP NO CALCANHAR',
        },
      },
      {
        id: 'neoprene-hydro',
        code: 'ENG-03 // CABEDAL',
        title: 'Nylon de Alta Tenacidade + Forro em Neoprene',
        subtitle: 'Zero atrito interno e tecnologia Hydro-Off',
        description:
          'Tiras robustas construídas em poliéster/nylon de alta tenacidade (ou tecido ripstop acolchoado na versão Rakka Puffy), forradas internamente com neoprene macio que evita bolhas, aliado ao acabamento impermeável Hydro-Off em linhas dedicadas.',
        technicalParallel: 'Proteção térmica e mecânica contra abrasão contínua.',
        cameraPreset: {
          position: [0.1, 0.42, 1.9],
          rotation: [0.42, -0.35, 0.05],
          targetLabel: 'CABEDAL TÉCNICO & FORRO EM NEOPRENE',
        },
      },
      {
        id: 'memory-polymer',
        code: 'ENG-04 // PALMILHA',
        title: 'Palmilha High-Confy em Polímero com Memória',
        subtitle: 'Fórmula proprietária tipo EVA de retorno elástico',
        description:
          'Desenvolvida em polímero com memória elástica — com versões lixadas voltadas ao uso urbano intenso e versões com película impermeável para ambientes aquáticos.',
        technicalParallel: 'Mapeamento anatômico de pressão plantar.',
        cameraPreset: {
          position: [0.0, 0.55, 2.05],
          rotation: [0.58, 0.22, -0.05],
          targetLabel: 'PALMILHA ANATÔMICA HIGH-CONFY',
        },
      },
      {
        id: 'metal-k-pin',
        code: 'ENG-05 // IDENTIFICADOR',
        title: 'Pino Metálico "K"',
        subtitle: 'Assinatura física de autenticidade',
        description:
          'Aplicado em metal banhado diretamente sobre a tira robusta, o identificador "K" funciona como ponto de luz na peça e assinatura inconfundível em praticamente todos os modelos da marca.',
        technicalParallel: 'Hardware metálico anticorrosão cravado no cabedal.',
        cameraPreset: {
          position: [0.38, 0.25, 1.75],
          rotation: [0.22, -0.58, 0.08],
          targetLabel: 'PINO METÁLICO "K" NO CABEDAL',
        },
      },
    ] satisfies EngineeringLayer[],
  },

  referenceLines: [
    {
      id: 'rakka',
      name: 'Linha Rakka',
      yearOrEra: 'Protagonista Visual Contemporânea',
      positioning: 'Urbano pesado, presença monumental e engenharia aparente.',
      engineeringSummary:
        'Tiras robustas com forro em neoprene (ou ripstop acolchoado na Rakka Puffy), palmilha High-Confy, solado megatratorado e peça amortecedora vazada Re.Amp no calcanhar.',
      isPrimary3DReference: true,
    },
    {
      id: 'kivah',
      name: 'Linha Kivah',
      yearOrEra: 'Criada em 2001',
      positioning: 'Clássico urbano versátil que definiu a virada dos anos 2000.',
      engineeringSummary:
        'Solado em borracha vulcanizada tratorada de alta durabilidade, cabedal com forro em neoprene e equilíbrio entre uso diário e identidade de rua.',
    },
    {
      id: 'megah',
      name: 'Linha Megah',
      yearOrEra: 'Arquitetura Extrema',
      positioning: 'A silhueta mais imponente visualmente do portfólio.',
      engineeringSummary:
        'Solado supertratorado diretamente inspirado em rodas de trator, elevando a escala escultural da borracha vulcanizada ao limite.',
    },
  ] satisfies ReferenceLine[],

  urbanEnergy: {
    sectionKicker: '03 // URBAN ENERGY — CULTURA & PERTENCIMENTO',
    sectionHeadline: 'DO CONCRETO AO BAILE. SÍMBOLO DE ASCENSÃO.',
    sectionLead:
      'Nas favelas e periferias brasileiras, calçar uma Kenner transcendeu o vestuário: tornou-se afirmação de autoestima, dignidade e conquista — o fenômeno cultural conhecido nas ruas como "Kenner de cria".',
    culturalContextNote:
      'Presente no uniforme estético do funk, do rap e do trap, a marca foi sintetizada no rap nacional como uma verdadeira "micro ascensão" dentro da comunidade: o orgulho de quem conquista o próprio espaço sem abrir mão da origem.',
    editorialFrames: [
      {
        id: 'frame-concreto',
        index: '01',
        captionTitle: 'ARQUITETURA DE CONCRETO & ASFALTO',
        captionBody:
          'Escadarias, vielas e avenidas que exigem tração real. O design pensado para o litoral nos anos 80 encontrou no concreto brasileiro sua vocação definitiva.',
        aspectClass: 'aspect-[4/5]',
        image: '/assets/images/urban-01-arquitetura.png',
        imageAlt:
          'Arquitetura urbana brasileira em concreto e asfalto noturno iluminada por luz dourada lateral',
      },
      {
        id: 'frame-baile',
        index: '02',
        captionTitle: 'ESTÉTICA DO SOM: FUNK, RAP & TRAP',
        captionBody:
          'Do baile à sessão de estúdio, a silhueta tratorada e o brilho discreto do pino "K" compõem o código visual de quem dita a estética urbana no Brasil.',
        aspectClass: 'aspect-[16/10]',
        image: '/assets/images/urban-02-noite.png',
        imageAlt:
          'Retrato editorial noturno de jovens adultos brasileiros vestindo streetwear autêntico em espaço urbano de concreto',
      },
      {
        id: 'frame-ascensao',
        index: '03',
        captionTitle: 'PERTENCIMENTO & MICRO ASCENSÃO',
        captionBody:
          'Mais que status: o reconhecimento imediato entre pares. Uma conquista tangível que carrega respeito, identidade e memória afetiva periférica.',
        aspectClass: 'aspect-[3/4]',
        image: '/assets/images/urban-03-presenca.png',
        imageAlt:
          'Modelo masculino brasileiro em terraço de concreto à noite com luzes da cidade ao fundo em contraluz dourado',
      },
    ],
  },

  spotlight: {
    sectionKicker: '04 // PRODUCT SPOTLIGHT — ESTÚDIO VIRTUAL 3D',
    sectionHeadline: 'ESCULTURA INDUSTRIAL EM ESCALA REAL.',
    sectionLead:
      'Explore os ângulos da interpretação conceitual inspirada na linha Rakka. Alterne o enquadramento de estúdio ou gire livremente para inspecionar o relevo tratorado e a volumetria do cabedal.',
    angles: [
      {
        id: 'perfil-rakka',
        label: '01 / PERFIL ESCULTURAL',
        tag: 'SILHUETA LATERAL & RE.AMP',
        description:
          'Leitura integral da altura do solado megatratorado e da peça vazada Re.Amp integrada ao bloco do calcanhar.',
        rotation: [0.12, -0.35, 0.04] as [number, number, number],
        cameraZ: 2.15,
      },
      {
        id: 'cabedal-k',
        label: '02 / CABEDAL & PINO "K"',
        tag: 'NEOPRENE + HARDWARE METÁLICO',
        description:
          'Enquadramento superior destacando as tiras largas de alta tenacidade, a palmilha High-Confy e o ponto focal do pino metálico "K".',
        rotation: [0.62, 0.28, -0.08] as [number, number, number],
        cameraZ: 1.95,
      },
      {
        id: 'tracao-vulcanizada',
        label: '03 / MATRIZ TRATORADA',
        tag: 'CANALETAS ANGULADAS DE BORRACHA',
        description:
          'Vista dramática inferior do solado de borracha vulcanizada, revelando o desenho tratorado inspirado na engenharia de pneus.',
        rotation: [-0.55, 0.85, 0.15] as [number, number, number],
        cameraZ: 2.0,
      },
      {
        id: 'perspectiva-hero',
        label: '04 / ÂNGULO MONUMENTAL',
        tag: 'TRÊS QUARTOS DE ESTÚDIO',
        description:
          'Balanço entre o volume frontal da palmilha em polímero com memória, o forro interno em neoprene e a projeção agressiva do solado.',
        rotation: [0.24, -0.78, 0.06] as [number, number, number],
        cameraZ: 1.9,
      },
    ],
  },

  finalStatement: {
    sectionKicker: '05 // FINAL STATEMENT — ASSINATURA',
    headlineTop: 'O SEU CAMINHO.',
    headlineBottom: 'A SUA MARCA.',
    manifesto:
      'De 1988 no Rio de Janeiro para cada esquina onde a cultura de rua escreve a própria história. Presença não se pede — se constrói passo a passo.',
    ctaOfficialLabel: 'VISITAR KENNER.COM.BR',
    ctaReplayLabel: 'VOLTAR AO TOPO DA EXPERIÊNCIA',
  },
} as const;
