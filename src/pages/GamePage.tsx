import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  Keyboard,
  MessageSquareText,
  Monitor,
  Play,
  Smartphone,
  SmartphoneNfc,
  Tag,
} from 'lucide-react'
import { findGame, statusMeta } from '../data/games'
import { keyAllowsGame } from '../lib/auth'
import { useAuth } from '../hooks/useAuth'
import { useDevice } from '../hooks/useDevice'
import { fallbackCover, formatDate } from '../lib/format'
import { GamePlayer } from '../components/GamePlayer'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

export function GamePage() {
  const { slug = '' } = useParams()
  const { session } = useAuth()
  const { isTouch } = useDevice()

  const [playing, setPlaying] = useState(false)
  const [coverFailed, setCoverFailed] = useState(false)

  const game = findGame(slug)

  // Jogo inexistente ou fora do escopo desta chave → volta para a biblioteca.
  if (!game || !session || !keyAllowsGame(session, game.slug)) {
    return <Navigate to="/biblioteca" replace />
  }

  const status = statusMeta[game.status]
  const showImage = Boolean(game.cover) && !coverFailed
  const blockedOnMobile = isTouch && !game.mobileSupport

  if (playing) {
    return <GamePlayer game={game} onClose={() => setPlaying(false)} />
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <Link
          to="/biblioteca"
          className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-neon-soft"
        >
          <ArrowLeft className="size-4" />
          Biblioteca
        </Link>

        {/* Hero */}
        <section className="animate-rise mt-6 overflow-hidden rounded-xl2 border border-edge bg-surface/50">
          {/*
            O cabeçalho muda de proporção entre celular (3:2) e PC (16:5).
            Em vez de recortar uma imagem só nas duas, o <picture> troca o
            arquivo: no celular entra a `cover` (16:9, recorte leve) e no PC
            a `hero` (16:5, sem recorte). Sem `hero`, a `cover` serve as duas.
          */}
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-abyss sm:aspect-[16/5]">
            {showImage ? (
              <picture className="block size-full">
                <source media="(min-width: 640px)" srcSet={game.hero ?? game.cover} />
                <img
                  src={game.cover}
                  alt=""
                  onError={() => setCoverFailed(true)}
                  className="size-full object-cover"
                />
              </picture>
            ) : (
              <div className="size-full" style={{ background: fallbackCover(game.slug) }}>
                <div className="grid-bg size-full opacity-25" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/55 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-medium tracking-wider uppercase ring-1 ${status.className}`}
                >
                  {status.label}
                </span>
                <span className="rounded-full border border-edge bg-abyss/70 px-2.5 py-1 font-mono text-[10px] text-ink-soft">
                  v{game.version}
                </span>
              </div>
              <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-4xl">
                {game.title}
              </h1>
              <p className="mt-1.5 max-w-2xl text-sm text-ink-soft sm:text-base">{game.tagline}</p>
            </div>
          </div>

          {/* Barra de ação */}
          <div className="flex flex-col gap-4 border-t border-edge/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-dim">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-3.5" />
                Build de {formatDate(game.updatedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Monitor className="size-3.5" />
                PC
              </span>
              <span
                className={`flex items-center gap-1.5 ${game.mobileSupport ? 'text-acid' : 'text-ink-dim/60'}`}
              >
                <Smartphone className="size-3.5" />
                {game.mobileSupport ? 'Celular' : 'Sem suporte a celular'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group flex items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-neon to-neon-deep px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-neon/25 transition-all hover:shadow-neon/40 active:scale-[0.99]"
            >
              <Play className="size-4 fill-white transition-transform group-hover:scale-110" />
              Jogar agora
            </button>
          </div>

          {blockedOnMobile && (
            <div className="flex items-start gap-3 border-t border-edge/60 bg-ember/6 px-5 py-4 sm:px-6">
              <SmartphoneNfc className="mt-0.5 size-4 shrink-0 text-ember" />
              <p className="text-xs leading-relaxed text-ink-soft">
                <span className="font-medium text-ember">Este jogo não foi feito para celular.</span>{' '}
                Você pode abrir mesmo assim, mas os controles dependem de teclado e mouse — o ideal é
                testar no computador.
              </p>
            </div>
          )}
        </section>

        {/* Detalhes */}
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <section className="animate-rise rounded-xl2 border border-edge bg-surface/40 p-5 [animation-delay:80ms] sm:p-6">
            <h2 className="font-display text-base font-semibold text-ink">Sobre esta build</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{game.description}</p>

            {game.playtestNotes && game.playtestNotes.length > 0 && (
              <>
                <h3 className="mt-7 flex items-center gap-2 font-display text-sm font-semibold text-ink">
                  <MessageSquareText className="size-4 text-neon-soft" />
                  O que observar durante o teste
                </h3>
                <ul className="mt-3 space-y-2">
                  {game.playtestNotes.map((note) => (
                    <li key={note} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-neon" />
                      {note}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {game.feedbackUrl && (
              <a
                href={game.feedbackUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-neon/40 bg-neon/10 px-4 py-2.5 text-sm font-medium text-neon-soft transition-colors hover:bg-neon/18"
              >
                <MessageSquareText className="size-4" />
                Enviar feedback
              </a>
            )}
          </section>

          <aside className="animate-rise space-y-5 [animation-delay:140ms]">
            {game.controls && game.controls.length > 0 && (
              <section className="rounded-xl2 border border-edge bg-surface/40 p-5 sm:p-6">
                <h2 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
                  <Keyboard className="size-4 text-neon-soft" />
                  Controles
                </h2>
                <dl className="mt-4 space-y-2.5">
                  {game.controls.map((control) => (
                    <div key={control.label} className="flex items-center justify-between gap-3">
                      <dt className="text-sm text-ink-soft">{control.label}</dt>
                      <dd className="rounded-md border border-edge-soft bg-abyss/70 px-2 py-0.5 font-mono text-[11px] text-ink">
                        {control.keys}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <section className="rounded-xl2 border border-edge bg-surface/40 p-5 sm:p-6">
              <h2 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
                <Tag className="size-4 text-neon-soft" />
                Categorias
              </h2>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {game.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-edge-soft bg-abyss/60 px-2 py-1 text-[11px] text-ink-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
