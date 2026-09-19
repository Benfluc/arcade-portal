export type GameOrientation = 'qualquer' | 'paisagem' | 'retrato'

export interface Game {
  /** Identificador usado na URL: /jogo/:slug. Use kebab-case, sem acentos. */
  slug: string
  title: string
  /** Frase curta de chamada, mostrada no card e sob o título. */
  tagline: string
  /** Texto de apresentação do jogo, mostrado na página dele. */
  description: string
  /**
   * Caminho (ou URL) do `index.html` exportado pelo Godot.
   * Local:    '/games/meu-jogo/index.html'
   * Externo:  'https://exemplo.com/meu-jogo/index.html'
   */
  url: string
  /**
   * Capa 16:9 — usada no card e, no celular, no topo da página do jogo.
   * Resolução recomendada: 1280×720.
   */
  cover?: string
  /**
   * Banner largo 16:5 — topo da página do jogo em telas de PC.
   * Resolução recomendada: 1920×600. Sem ele, a `cover` serve nos dois.
   */
  hero?: string
  /**
   * Selo opcional no canto da capa: 'Novo', 'Em breve', 'Atualizado'…
   * Deixe de fora para não mostrar selo nenhum.
   */
  badge?: string
  /** Categorias, usadas nos filtros da página inicial. */
  tags: string[]
  /** Os destaques do jogo — a lista "Key Features". */
  features: string[]
  /** Funciona em celular? Controla o aviso exibido antes de abrir. */
  mobileSupport: boolean
  /** Orientação do jogo — também enquadra o player em telas largas. */
  orientation?: GameOrientation
  /** Instruções de controle exibidas na página do jogo. */
  controls?: { label: string; keys: string }[]
  /** Link externo (loja, página do jogo, formulário). Opcional. */
  externalUrl?: string
  externalLabel?: string
  /** Marque como true para esconder o jogo sem apagar o cadastro. */
  hidden?: boolean
}
