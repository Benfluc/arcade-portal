import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, KeyRound, Loader2, LockKeyhole, TriangleAlert } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { failureMessages } from '../lib/auth'
import { site } from '../config/site'
import { Logo } from '../components/ui/Logo'

export function LoginPage() {
  const { session, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const inputRef = useRef<HTMLInputElement>(null)

  const [value, setValue] = useState('')
  const [remember, setRemember] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  if (session) {
    const from = (location.state as { from?: string } | null)?.from
    return <Navigate to={from ?? '/jogos'} replace />
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (submitting || !value.trim()) return

    setSubmitting(true)
    setError(null)

    const result = await signIn(value, remember)

    if (result.ok) {
      const from = (location.state as { from?: string } | null)?.from
      navigate(from ?? '/jogos', { replace: true })
      return
    }

    setError(failureMessages[result.reason])
    setSubmitting(false)
    inputRef.current?.select()
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="animate-rise w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo size="lg" />
          <p className="mt-4 text-sm text-ink-soft">{site.tagline}</p>
        </div>

        <div className="glass rounded-xl2 border border-edge p-6 shadow-2xl shadow-black/50 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-edge bg-surface-2">
              <LockKeyhole className="size-4.5 text-lantern" />
            </span>
            <div>
              <h1 className="font-display text-base font-semibold text-ink">Entrar</h1>
              <p className="text-xs text-ink-dim">Informe sua chave de acesso para ver os jogos.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="access-key" className="sr-only">
              Chave de acesso
            </label>

            <div className={`relative ${error ? 'animate-shake' : ''}`}>
              <KeyRound className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-dim" />
              <input
                id="access-key"
                ref={inputRef}
                type="text"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value)
                  if (error) setError(null)
                }}
                placeholder="XXXX-XXXX-XXXX"
                autoComplete="off"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'access-key-error' : undefined}
                disabled={submitting}
                className={`w-full rounded-lg border bg-abyss/80 py-3.5 pr-4 pl-11 font-mono text-sm tracking-widest text-ink uppercase transition-colors outline-none placeholder:tracking-normal placeholder:text-ink-dim/60 disabled:opacity-60 ${
                  error
                    ? 'border-ember/60 focus:border-ember'
                    : 'border-edge focus:border-ink/50 focus:ring-2 focus:ring-ink/15'
                }`}
              />
            </div>

            {error && (
              <p
                id="access-key-error"
                role="alert"
                className="mt-3 flex items-start gap-2 text-xs text-ember"
              >
                <TriangleAlert className="mt-px size-3.5 shrink-0" />
                {error}
              </p>
            )}

            <label className="mt-4 flex cursor-pointer items-center gap-2.5 text-xs text-ink-soft select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="size-4 shrink-0 cursor-pointer appearance-none rounded border border-edge bg-abyss checked:border-ink checked:bg-ink"
                style={{
                  backgroundImage: remember
                    ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3.5 8.5l3 3 6-6'/%3E%3C/svg%3E\")"
                    : undefined,
                }}
              />
              Manter conectado neste dispositivo
            </label>

            <button
              type="submit"
              disabled={submitting || !value.trim()}
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3.5 text-sm font-semibold text-void shadow-lg shadow-black/40 transition-all hover:bg-white active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-ink-dim disabled:shadow-none"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Verificando…
                </>
              ) : (
                <>
                  Entrar
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {site.contactUrl && (
            <p className="mt-5 text-center text-xs text-ink-dim">
              Não tem uma chave?{' '}
              <a
                href={site.contactUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-ink underline-offset-2 hover:underline"
              >
                {site.contactLabel}
              </a>
            </p>
          )}
        </div>

        <p className="mt-6 text-center font-mono text-[10px] tracking-widest text-ink-dim/70 uppercase">
          Acesso restrito
        </p>
      </div>
    </main>
  )
}
