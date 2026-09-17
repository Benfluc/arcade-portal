import { Link } from 'react-router-dom'
import { LogOut, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { Logo } from '../ui/Logo'

export function Header() {
  const { session, signOut } = useAuth()

  return (
    <header className="glass sticky top-0 z-40 border-b border-edge/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/biblioteca" className="shrink-0 transition-opacity hover:opacity-80">
          <Logo />
        </Link>

        {session && (
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-edge bg-surface/60 px-3 py-1.5 text-xs text-ink-soft sm:flex">
              <ShieldCheck className="size-3.5 text-acid" />
              <span className="max-w-[16ch] truncate font-medium text-ink">{session.label}</span>
            </span>

            <button
              type="button"
              onClick={signOut}
              className="flex items-center gap-2 rounded-full border border-edge bg-surface/60 px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-ember/50 hover:text-ember"
            >
              <LogOut className="size-3.5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
