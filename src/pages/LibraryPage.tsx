import { useMemo, useState } from 'react'
import { Gamepad2, Search, SearchX, X } from 'lucide-react'
import { visibleGames } from '../data/games'
import { keyAllowsGame } from '../lib/auth'
import { useAuth } from '../hooks/useAuth'
import { GameCard } from '../components/GameCard'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { site } from '../config/site'

export function LibraryPage() {
  const { session } = useAuth()
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  /** Só os jogos que a chave liberou. */
  const allowed = useMemo(() => {
    if (!session) return []
    return visibleGames().filter((game) => keyAllowsGame(session, game.slug))
  }, [session])

  const tags = useMemo(
    () => [...new Set(allowed.flatMap((game) => game.tags))].sort((a, b) => a.localeCompare(b, 'pt-BR')),
    [allowed],
  )

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return allowed.filter((game) => {
      const matchesTag = !activeTag || game.tags.includes(activeTag)
      const matchesQuery =
        !needle ||
        game.title.toLowerCase().includes(needle) ||
        game.tagline.toLowerCase().includes(needle) ||
        game.tags.some((tag) => tag.toLowerCase().includes(needle))
      return matchesTag && matchesQuery
    })
  }, [allowed, query, activeTag])

  const filtering = Boolean(query.trim() || activeTag)

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        {/* Cabeçalho da página */}
        <div className="animate-rise">
          <p className="font-pixel text-[10px] tracking-[0.18em] text-ink-dim uppercase">
            {site.name}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Nossos jogos
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
            {allowed.length === 0
              ? 'Nenhum jogo liberado para esta chave no momento.'
              : 'Todos rodam direto no navegador, no computador ou no celular. Sem instalar nada — é só escolher e jogar.'}
          </p>
        </div>

        {/* Filtros */}
        {allowed.length > 0 && (
          <div className="animate-rise mt-8 flex flex-col gap-4 [animation-delay:80ms] sm:flex-row sm:items-center">
            <div className="relative sm:max-w-xs sm:flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-dim" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar jogo…"
                aria-label="Buscar jogo"
                className="w-full rounded-lg border border-edge bg-surface/50 py-2.5 pr-3 pl-10 text-sm text-ink transition-colors outline-none placeholder:text-ink-dim/70 focus:border-ink/45 focus:ring-2 focus:ring-ink/12"
              />
            </div>

            {tags.length > 0 && (
              /* No celular os filtros viram uma faixa rolável: com wrap, sete
                 ou oito tags empurram os jogos para fora da primeira tela. */
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
                {tags.map((tag) => {
                  const active = activeTag === tag
                  return (
                    <button
                      key={tag}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setActiveTag(active ? null : tag)}
                      className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        active
                          ? 'border-ink/45 bg-ink/10 text-ink'
                          : 'border-edge bg-surface/40 text-ink-soft hover:border-edge hover:text-ink'
                      }`}
                    >
                      {tag}
                      {active && <X className="ml-1 inline size-3" />}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Grade */}
        {results.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((game, index) => (
              <GameCard key={game.slug} game={game} index={index} />
            ))}
          </div>
        ) : (
          <EmptyState
            filtering={filtering}
            onClear={() => {
              setQuery('')
              setActiveTag(null)
            }}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

function EmptyState({ filtering, onClear }: { filtering: boolean; onClear: () => void }) {
  const Icon = filtering ? SearchX : Gamepad2

  return (
    <div className="animate-rise mt-10 grid place-items-center rounded-xl2 border border-dashed border-edge bg-surface/25 px-6 py-20 text-center">
      <span className="grid size-14 place-items-center rounded-full border border-edge bg-surface-2">
        <Icon className="size-6 text-ink-dim" />
      </span>
      <h2 className="mt-5 font-display text-lg font-semibold text-ink">
        {filtering ? 'Nenhum resultado' : 'Nada por aqui ainda'}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-ink-soft">
        {filtering
          ? 'Nenhum jogo corresponde a esses filtros.'
          : 'Esta chave de acesso ainda não tem nenhum jogo liberado.'}
      </p>
      {filtering && (
        <button
          type="button"
          onClick={onClear}
          className="mt-5 rounded-lg border border-edge bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/30"
        >
          Limpar filtros
        </button>
      )}
    </div>
  )
}
