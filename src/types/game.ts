export type GameStatus = 'prototipo' | 'alpha' | 'beta' | 'release'

export type GameOrientation = 'qualquer' | 'paisagem' | 'retrato'

export interface Game {
  /** Identificador usado na URL: /jogo/:slug. Use kebab-case, sem acentos. */
  slug: string
  title: string
  /** Frase curta mostrada no card. */
  tagline: string
  /** Texto mais longo, mostrado na página do jogo. */
  description: string
  /**
   * Caminho (ou URL) do `index.html` exportado pelo Godot.
   * Local:    '/games/meu-jogo/index.html'
   * Externo:  'https://exemplo.com/meu-jogo/index.html'
   */
  url: string
  /**
   * Capa 16:9 — usada no card da biblioteca e, no celular, no topo da
   * página do jogo. Resolução recomendada: 1280×720.
   * Ex.: '/games/meu-jogo/cover.png'
   */
  cover?: string
  /**
   * Banner largo 16:5 — usado no topo da página do jogo em telas de PC.
   * Resolução recomendada: 1920×600.
   * Se você não informar, o portal usa a `cover` também aqui (e ela será
   * recortada em cima e embaixo).
   */
  hero?: string
  status: GameStatus
  version: string
  tags: string[]
  /** Data da última build, formato ISO: '2026-09-13'. */
  updatedAt: string
  /** Funciona em celular? Controla o aviso exibido antes de abrir. */
  mobileSupport: boolean
  /** Orientação recomendada quando jogado no celular. */
  orientation?: GameOrientation
  /** Instruções de controle exibidas na página do jogo. */
  controls?: { label: string; keys: string }[]
  /** Notas da versão / o que você quer que o testador observe. */
  playtestNotes?: string[]
  /** Link de formulário de feedback (Google Forms, Discord, etc.). Opcional. */
  feedbackUrl?: string
  /** Marque como true para esconder o jogo sem apagar o cadastro. */
  hidden?: boolean
}
