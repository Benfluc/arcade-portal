import { Link } from 'react-router-dom'
import { Logo } from '../ui/Logo'

export function Header() {
  return (
    <header className="glass sticky top-0 z-40 border-b border-edge/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
        <Link to="/" className="shrink-0 transition-opacity hover:opacity-80">
          <Logo />
        </Link>
      </div>
    </header>
  )
}
