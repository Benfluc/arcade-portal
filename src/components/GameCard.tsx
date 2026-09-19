import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Smartphone } from 'lucide-react'
import type { Game } from '../types/game'
import { fallbackCover } from '../lib/format'

export function GameCard({ game, index = 0 }: { game: Game; index?: number }) {
  const [coverFailed, setCoverFailed] = useState(false)
  const showImage = Boolean(game.cover) && !coverFailed

  return (
    <Link
      to={`/jogo/${game.slug}`}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      className="group animate-rise relative flex flex-col overflow-hidden rounded-xl2 border border-edge bg-surface/50 transition-all duration-300 hover:-translate-y-1 hover:border-ink/25 hover:bg-surface hover:shadow-2xl hover:shadow-black/50"
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
            <span className="absolute inset-0 grid place-items-center font-pixel text-3xl text-ink/12 select-none">
              {game.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />

        {/* Botão de play no hover */}
        <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="grid size-14 place-items-center rounded-full bg-ink shadow-xl shadow-black/50">
            <Play className="size-6 translate-x-0.5 fill-void text-void" />
          </span>
        </span>

        {game.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-ink/95 px-2.5 py-1 font-pixel text-[9px] tracking-wide text-void">
            {game.badge}
          </span>
        )}

        {game.mobileSupport && (
          <span
            title="Funciona no celular"
            className="absolute top-3 right-3 grid size-7 place-items-center rounded-full bg-abyss/75 text-ink-soft ring-1 ring-edge backdrop-blur-sm"
          >
            <Smartphone className="size-3.5" />
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg leading-tight font-semibold text-ink">{game.title}</h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{game.tagline}</p>

        {/* mt-auto encosta as categorias na base: cards de alturas diferentes
            mantêm a última linha alinhada na grade. */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-edge-soft bg-abyss/60 px-2 py-0.5 text-[11px] text-ink-dim"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
