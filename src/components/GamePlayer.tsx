import { useEffect, useRef, useState } from 'react'
import {
  Expand,
  Loader2,
  Minimize,
  RotateCcw,
  RotateCw,
  TriangleAlert,
  X,
} from 'lucide-react'
import type { Game } from '../types/game'
import { useFullscreen } from '../hooks/useFullscreen'
import { useDevice } from '../hooks/useDevice'

/** Se o iframe não sinalizar carregamento neste tempo, mostramos ajuda. */
const LOAD_TIMEOUT_MS = 30_000

export function GamePlayer({ game, onClose }: { game: Game; onClose: () => void }) {
  const shellRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)

  const [loading, setLoading] = useState(true)
  const [timedOut, setTimedOut] = useState(false)
  const [reloadToken, setReloadToken] = useState(0)

  const { isFullscreen, supported: fullscreenSupported, toggle } = useFullscreen(shellRef)
  const { isTouch, isPortrait } = useDevice()

  /** Deve pedir para o jogador girar o celular? */
  const askRotate = isTouch && isPortrait && game.orientation === 'paisagem'

  /**
   * Enquadramento: um jogo em retrato numa tela de PC recebe uma caixa
   * vertical centralizada em vez da tela inteira, senão a interface dele se
   * espalha pelas bordas. Ver `.fit-portrait` / `.fit-landscape` no index.css.
   */
  const fitClass =
    game.orientation === 'retrato'
      ? 'fit-portrait'
      : game.orientation === 'paisagem'
        ? 'fit-landscape'
        : ''

  // Trava o scroll da página enquanto o player está aberto.
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  // Esc fecha o player (quando não está em fullscreen — aí o Esc sai do fullscreen).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !document.fullscreenElement) onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  // Aviso de carregamento demorado.
  useEffect(() => {
    if (!loading) return
    const timer = window.setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS)
    return () => window.clearTimeout(timer)
  }, [loading, reloadToken])

  function handleLoad() {
    setLoading(false)
    setTimedOut(false)
    // O Godot só recebe teclado se o iframe estiver focado.
    window.setTimeout(() => frameRef.current?.focus(), 60)
  }

  function reload() {
    setLoading(true)
    setTimedOut(false)
    setReloadToken((token) => token + 1)
  }

  return (
    <div
      ref={shellRef}
      className="fixed inset-0 z-50 flex flex-col bg-black"
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* O jogo */}
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <iframe
          key={reloadToken}
          ref={frameRef}
          src={game.url}
          title={game.title}
          onLoad={handleLoad}
          allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope; clipboard-write; cross-origin-isolated"
          allowFullScreen
          className={`size-full border-0 bg-black ${fitClass}`}
        />
      </div>

      {/* Carregando */}
      {loading && (
        <div className="absolute inset-0 grid place-items-center bg-abyss px-6 text-center">
          <div>
            <Loader2 className="mx-auto size-8 animate-spin text-lantern" />
            <p className="mt-5 font-display text-lg font-semibold text-ink">{game.title}</p>
            <p className="mt-1.5 text-sm text-ink-soft">
              Carregando a build… a primeira vez costuma demorar mais.
            </p>

            {timedOut && (
              <div className="mx-auto mt-7 max-w-sm rounded-lg border border-ember/35 bg-ember/8 p-4 text-left">
                <p className="flex items-center gap-2 text-sm font-medium text-ember">
                  <TriangleAlert className="size-4" />
                  Está demorando mais que o normal
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                  Pode ser conexão lenta ou um erro na build. Tente recarregar; se persistir,
                  abra o console do navegador (F12) e envie o erro ao desenvolvedor.
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={reload}
                    className="rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-void transition-colors hover:bg-white"
                  >
                    Recarregar
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-edge px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:text-ink"
                  >
                    Voltar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pedido para girar o celular */}
      {askRotate && !loading && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-abyss/95 px-8 text-center backdrop-blur-sm">
          <div>
            <RotateCw className="animate-float mx-auto size-10 text-lantern" />
            <p className="mt-5 font-display text-lg font-semibold text-ink">Gire o celular</p>
            <p className="mt-2 max-w-xs text-sm text-ink-soft">
              {game.title} foi feito para a tela na horizontal.
            </p>
          </div>
        </div>
      )}

      {/*
        Barra de controles.

        Ela fica SEMPRE visível e sempre clicável. Não use auto-hide aqui:
        enquanto o ponteiro está sobre o iframe, a página de fora não recebe
        mousemove nem touch — o jogo consome os eventos. Uma barra que some
        sozinha nunca reapareceria, e o testador ficaria preso dentro do jogo
        sem conseguir sair.

        A solução é dimmer + hover: discreta durante o jogo, nítida ao aproximar.
      */}
      <div
        className="pointer-events-none absolute top-0 right-0 left-0 z-20 flex items-center justify-between gap-3 bg-gradient-to-b from-black/75 via-black/30 to-transparent px-3 py-3 sm:px-4"
        style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
      >
        <button
          type="button"
          onClick={onClose}
          className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/65 px-3 py-2 text-xs font-medium text-ink-soft opacity-60 ring-1 ring-white/12 backdrop-blur-sm transition-all hover:bg-black/85 hover:text-ink hover:opacity-100 focus-visible:opacity-100"
        >
          <X className="size-4" />
          <span className="hidden sm:inline">Sair do jogo</span>
        </button>

        <span className="truncate font-display text-sm font-semibold text-white/45">
          {game.title}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={reload}
            title="Reiniciar a build"
            className="pointer-events-auto grid size-9 place-items-center rounded-full bg-black/65 text-ink-soft opacity-60 ring-1 ring-white/12 backdrop-blur-sm transition-all hover:bg-black/85 hover:text-ink hover:opacity-100 focus-visible:opacity-100"
          >
            <RotateCcw className="size-4" />
            <span className="sr-only">Reiniciar</span>
          </button>

          {fullscreenSupported && (
            <button
              type="button"
              onClick={toggle}
              title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
              className="pointer-events-auto grid size-9 place-items-center rounded-full bg-black/65 text-ink-soft opacity-60 ring-1 ring-white/12 backdrop-blur-sm transition-all hover:bg-black/85 hover:text-ink hover:opacity-100 focus-visible:opacity-100"
            >
              {isFullscreen ? <Minimize className="size-4" /> : <Expand className="size-4" />}
              <span className="sr-only">Tela cheia</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
