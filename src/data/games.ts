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
    tagline: 'Fuja do labirinto antes que a lanterna apague.',
    description:
      'Um guaxinim com uma lanterna preso em labirintos gerados aleatoriamente. A lanterna é a barra de vida: conforme a carga cai, a escuridão fecha e a área jogável encolhe. Sombras perseguem você pelo labirinto, o pulso de luz as atordoa por alguns segundos, e baterias espalhadas pelo mapa devolvem fôlego. Achar a chave e alcançar a porta de saída encerra a fase.',
    url: '/games/light-chase/index.html',
    // Imagens — coloque os arquivos em public/games/light-chase/ e descomente.
       //cover.png  1280×720  (16:9) → card da biblioteca + topo no celular
       //hero.png   1920×600  (16:5) → topo da página do jogo no PC
       cover: '/games/light-chase/cover.png',
       hero: '/games/light-chase/hero.png',
    status: 'alpha',
    version: '0.1.0',
    tags: ['labirinto', 'sobrevivência', 'arcade', 'mobile'],
    updatedAt: '2026-09-14',
    mobileSupport: true,
    orientation: 'retrato',
    controls: [
      { label: 'Mover', keys: 'Arrastar · WASD · setas' },
      { label: 'Pulso de luz', keys: 'Toque curto · Espaço' },
      { label: 'Esquiva', keys: 'Deslizar rápido · Shift' },
    ],
    playtestNotes: [
      'A lanterna acaba rápido demais ou devagar demais?',
      'Dá para perceber que o pulso de luz atordoa as sombras, ou isso passou batido?',
      'No celular, o joystick de arrastar respondeu bem?',
      'Em algum momento você ficou perdido sem saber para onde ir?',
    ],
  },

  {
    slug: 'dungeon-defender',
    title: 'You Must Defend the Princess',
    tagline: 'Tower defense com herói controlável.',
    description:
      'Defenda a princesa na base do mapa. Entre as waves você constrói e posiciona defesas com o ouro disponível; durante o ataque, controla o herói diretamente para tapar os buracos. Nenhum inimigo voa nem ataca à distância — todos precisam alcançar a princesa fisicamente, então o que decide a partida é o traçado do caminho e onde você gasta o ouro.',
    url: '/games/dungeon-defender/index.html',
    // Imagens — coloque os arquivos em public/games/dungeon-defender/ e descomente.
    //   cover.png  1280×720  (16:9) → card da biblioteca + topo no celular
    //   hero.png   1920×600  (16:5) → topo da página do jogo no PC
    cover: '/games/dungeon-defender/cover.png',
    hero: '/games/dungeon-defender/hero.png',
    status: 'beta',
    version: '1.0.0',
    tags: ['tower defense', 'estratégia', 'singleplayer'],
    updatedAt: '2026-09-15',
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
    playtestNotes: [
      'O ouro que você recebe entre as waves parece justo para o tamanho da ameaça?',
      'Em algum momento uma wave pareceu impossível em vez de difícil?',
      'Controlar o herói ajuda de verdade, ou dá para vencer só construindo?',
      'A contagem regressiva entre waves dá tempo de construir com calma?',
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

export const statusMeta: Record<
  Game['status'],
  { label: string; className: string }
> = {
  prototipo: {
    label: 'Protótipo',
    className: 'bg-ember/12 text-ember ring-ember/30',
  },
  alpha: {
    label: 'Alpha',
    className: 'bg-cyber/12 text-cyber ring-cyber/30',
  },
  beta: {
    label: 'Beta',
    className: 'bg-neon/15 text-neon-soft ring-neon/35',
  },
  release: {
    label: 'Lançado',
    className: 'bg-acid/12 text-acid ring-acid/30',
  },
}
