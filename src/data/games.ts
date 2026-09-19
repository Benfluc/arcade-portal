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
 * ============================================================
 */

export const games: Game[] = [
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
