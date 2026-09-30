import type { Game } from '../types/game'

/**
 * ============================================================
 *  CATÁLOGO DE JOGOS
 * ============================================================
 *
 *  Para adicionar um jogo exportado do Godot:
 *
 *  1. No Godot: Projeto → Exportar → Web.
 *     Export Path: `public/games/<slug>/index.html`
 *
 *  2. A pasta deve ficar assim:
 *       public/games/light-chase/
 *         ├─ index.html
 *         ├─ index.js
 *         ├─ index.wasm
 *         ├─ index.pck
 *         ├─ index.audio.worklet.js
 *         ├─ cover.png        ← opcional, 1280×720 (16:9)
 *         └─ hero.png         ← opcional, 1920×600 (16:5)
 *
 *  3. Adicione uma entrada no array abaixo apontando para
 *     `/games/<slug>/index.html`.
 *
 *  O `slug` também é o endereço da página: /jogo/light-chase
 *
 *  ATENÇÃO ao nome do arquivo: o Godot nomeia a exportação a partir
 *  do Export Path, então uma build salva como `VortexWing.html` NÃO
 *  responde em `/games/<slug>/index.html`. Ou você exporta com o nome
 *  `index.html`, ou aponta o campo `url` para o nome real do arquivo.
 *  É o erro mais fácil de cometer aqui — o jogo some do site sem dar
 *  nenhum aviso.
 * ============================================================
 */

export const games: Game[] = [
  {
    slug: 'vortexwing',
    title: 'VortexWing',
    tagline: 'Monte a nave, aguente dois minutos, volte e conserte o que sobrou.',
    description:
      'Um roguelite de construção de naves. No hangar você monta a sua nave bloco a bloco numa grade livre — casco, motores, armas, geradores — e leva ela para uma arena de dois minutos contra naves geradas na hora. O combate é visto de cima e tem inércia de verdade: a nave continua andando depois que você solta o acelerador, e cada peça que você prega muda o peso e o jeito de girar. O que você ganha em combate paga as peças da próxima montagem.',
    // O arquivo exportado se chama VortexWing.html, não index.html.
    url: '/games/vortexwing/VortexWing.html',
    cover: '/games/vortexwing/cover.png',
    hero: '/games/vortexwing/hero.png',
    badge: 'Novo',
    tags: ['naves', 'roguelite', 'construção'],
    features: [
      'Monte a sua nave bloco a bloco numa grade livre',
      'Combate visto de cima com inércia — peso e formato mudam o pilotar',
      'Arenas de dois minutos contra naves geradas na hora',
      'Cada vitória paga peças novas para a próxima montagem',
      'Progressão roguelite: você melhora a nave até conseguir vencer',
      'Campos de detritos e o espaço aberto como cenário',
    ],
    // Sem suporte a toque: a arena lê teclado e mouse direto
    // (Input.is_physical_key_pressed / is_mouse_button_pressed),
    // não há tratamento de InputEventScreenTouch em lugar nenhum.
    mobileSupport: false,
    orientation: 'paisagem',
    controls: [
      { label: 'Girar', keys: 'A D · ← →' },
      { label: 'Acelerar', keys: 'W · ↑' },
      { label: 'Ré / frear', keys: 'S · ↓' },
      { label: 'Apontar para o cursor', keys: 'Botão direito' },
      { label: 'Atirar', keys: 'Espaço · botão esquerdo' },
      { label: 'Voltar / pausar', keys: 'Esc' },
    ],
  },

  {
    slug: 'feather-and-fire',
    title: 'Feather & Fire',
    tagline: 'Um corvo, um dragão adormecido e dez câmaras de ouro.',
    description:
      'O dragão dorme sobre o tesouro, e o olho dele é uma lanterna. Enquanto ele ronca, a câmara é sua; quando levanta a cabeça, tudo que a luz alcança vira cinza. As rochas projetam sombra de verdade — calculada a partir do olho dele — então cada abrigo tem um alcance exato, e agachar é a diferença entre caber na sombra e virar tocha. Dez câmaras, sono cada vez mais curto, nenhum aviso na tela. Só tentativa, erro e sangue-frio.',
    url: '/games/feather-and-fire/index.html',
    cover: '/games/feather-and-fire/cover.png',
    hero: '/games/feather-and-fire/hero.png',
    badge: 'Novo',
    tags: ['furtividade', 'pixel art', 'puzzle'],
    features: [
      'Sombras calculadas em tempo real a partir do olho do dragão',
      'Dez câmaras com sono cada vez mais curto',
      'Agache para caber nas sombras rasas',
      'Ruído acorda o dragão: correr e pisar em ossos cobram caro',
      'Nenhum medidor na tela — você aprende a câmara errando',
      'Três estrelas por câmara: concluir, todo o ouro e bater o tempo-par',
    ],
    mobileSupport: true,
    orientation: 'paisagem',
    controls: [
      { label: 'Andar', keys: '← → · botões na tela' },
      { label: 'Correr', keys: 'Shift · CORRER' },
      { label: 'Agachar', keys: '↓ · AGACHAR' },
      { label: 'Pausar', keys: 'P' },
      { label: 'Reiniciar a câmara', keys: 'R' },
    ],
  },

  {
    slug: 'light-chase',
    title: 'Light Chase',
    tagline: 'Sobreviva à escuridão. A luz é a sua maior arma.',
    description:
      'Criaturas estranhas espreitam nas sombras, e a sua lanterna é a única coisa entre você e elas. Explore ambientes escuros, descubra o perigo em cada esquina e use a luz para revidar contra as criaturas que caçam você. Um jogo de ação acelerado, feito para o celular. Até quando você aguenta com a escuridão te caçando?',
    url: '/games/light-chase/index.html',
    cover: '/games/light-chase/cover.png',
    hero: '/games/light-chase/hero.png',
    tags: ['ação', 'sobrevivência', 'mobile'],
    features: [
      'Enfrente criaturas das sombras usando a sua lanterna',
      'Explore ambientes escuros e misteriosos',
      'Ação acelerada, pensada para o celular',
      'Controles simples, fáceis de aprender',
      'Visual atmosférico e trilha sonora inquietante',
      'Sobreviva o máximo que conseguir contra inimigos cada vez mais perigosos',
    ],
    mobileSupport: true,
    orientation: 'retrato',
    controls: [
      { label: 'Mover', keys: 'Arrastar · WASD · setas' },
      { label: 'Pulso de luz', keys: 'Toque curto · Espaço' },
      { label: 'Esquiva', keys: 'Deslizar rápido · Shift' },
    ],
  },

  {
    slug: 'dungeon-defender',
    title: 'You Must Defend the Princess',
    tagline: 'A princesa está sob ataque. Você é a última linha de defesa.',
    description:
      'Construa suas defesas, enfrente ondas de inimigos perigosos e proteja a princesa a qualquer custo. De goblins e orcs a criaturas mortas-vivas e monstros aterrorizantes, cada onda traz um desafio novo. Quantas ondas você aguenta? A princesa está contando com você.',
    url: '/games/dungeon-defender/index.html',
    cover: '/games/dungeon-defender/cover.png',
    hero: '/games/dungeon-defender/hero.png',
    tags: ['tower defense', 'estratégia', 'pixel art'],
    features: [
      'Defenda a princesa contra ondas de inimigos',
      'Construa e melhore as suas defesas',
      'Enfrente tipos diferentes de inimigos, cada um com sua ameaça',
      'Sobreviva a ondas cada vez mais desafiadoras',
      'Controles simples, pensados para o celular',
      'Atmosfera pixel art medieval sombria',
    ],
    /*
     * ATENÇÃO — por que está como `false`:
     *
     * O projeto TEM um provedor de toque pronto (TouchInput, com joystick
     * virtual), mas `input_service.gd` escolhe entre teclado e toque assim:
     *
     *     if OS.has_feature("mobile"):
     *
     * e essa tag NÃO existe num export Web rodando no celular — ela só
     * aparece em export nativo Android/iOS. Resultado: o celular cai no
     * KeyboardMouseInput e o herói não anda.
     *
     * Para liberar o celular, trocar por:
     *     if OS.has_feature("mobile") \
     *        or OS.has_feature("web_android") or OS.has_feature("web_ios"):
     *
     * e conferir se a HUD tem botões de pausar / desfazer / rotacionar /
     * cancelar, porque no modo toque esses atalhos retornam `false` de
     * propósito. Depois é só reexportar e marcar `mobileSupport: true`.
     */
    mobileSupport: false,
    orientation: 'retrato',
    controls: [
      { label: 'Mover herói', keys: 'WASD · setas' },
      { label: 'Atacar', keys: 'Clique · Espaço' },
      { label: 'Cancelar construção', keys: 'Esc · botão direito' },
      { label: 'Rotacionar', keys: 'R' },
      { label: 'Desfazer construção', keys: 'Ctrl+Z' },
      { label: 'Velocidade', keys: 'Tab' },
      { label: 'Pausar', keys: 'P' },
    ],
  },
]

/** Somente os jogos não ocultos. */
export function visibleGames(): Game[] {
  return games.filter((game) => !game.hidden)
}

export function findGame(slug: string): Game | undefined {
  return games.find((game) => game.slug === slug && !game.hidden)
}
