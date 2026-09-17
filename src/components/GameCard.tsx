import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Play, Smartphone } from 'lucide-react'
import type { Game } from '../types/game'
import { statusMeta } from '../data/games'
import { fallbackCover, formatDate } from '../lib/format'

export function GameCard({ game, index = 0 }: { game: Game; index?: number }) {
  const [coverFailed, setCoverFailed] = useState(false)
  const status = statusMeta[game.status]
  const showImage = Boolean(game.cover) && !coverFailed

  return (
    <Link
      to={`/jogo/${game.slug}`}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      className="group animate-rise relative flex flex-col overflow-hidden rounded-xl2 border border-edge bg-surface/50 transition-all duration-300 hover:-translate-y-1 hover:border-neon/45 hover:bg-surface hover:shadow-2xl hover:shadow-neon/10"
    >
      {/* Capa */}
      <div className="relative aspect-video overflow-hidden bg-abyss">
        {showImage ? (
          <img
            src={game.cover}
            alt=""
            loading="lazy"
            onError={() => setCoverFailed(true)}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="size-full transition-transform duration-500 group-hover:scale-105"
            style={{ background: fallbackCover(game.slug) }}
          >
            <div className="grid-bg size-full opacity-25" />
            <span className="absolute inset-0 grid place-items-center font-display text-4xl font-bold text-white/12 select-none">
              {game.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />

        {/* Botão de play no hover */}
        <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="grid size-14 place-items-center rounded-full bg-neon/90 shadow-xl shadow-neon/40 backdrop-blur-sm">
            <Play className="size-6 translate-x-0.5 fill-white text-white" />
          </span>
        </span>

        {/* Selos */}
        <span className="absolute top-3 left-3 flex gap-2">
          <span
            className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-medium tracking-wider uppercase ring-1 backdrop-blur-sm ${status.className}`}
          >
            {status.label}
          </span>
        </span>

        {game.mobileSupport && (
          <span
            title="Funciona no celular"
            className="absolute top-3 right-3 grid size-7 place-items-center rounded-full bg-abyss/70 text-acid ring-1 ring-edge backdrop-blur-sm"
          >
            <Smartphone className="size-3.5" />
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg leading-tight font-semibold text-ink transition-colors group-hover:text-neon-soft">
            {game.title}
          </h3>
          <span className="shrink-0 font-mono text-[11px] text-ink-dim">v{game.version}</span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{game.tagline}</p>

        <div className="mt-4 mb-4 flex flex-wrap gap-1.5">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-edge-soft bg-abyss/60 px-2 py-0.5 text-[11px] text-ink-dim"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* mt-auto encosta o rodapé na base: cards de alturas diferentes
            mantêm a linha de data alinhada na grade. */}
        <div className="mt-auto flex items-center gap-1.5 border-t border-edge/60 pt-3 text-[11px] text-ink-dim">
          <CalendarDays className="size-3.5" />
          Build de {formatDate(game.updatedAt)}
        </div>
      </div>
    </Link>
  )
}
