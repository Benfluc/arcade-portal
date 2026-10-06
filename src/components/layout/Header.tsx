import { Link } from 'react-router-dom'
import { Logo } from '../ui/Logo'
import { site } from '../../config/site'

/**
 * Cabeçalho do site, em duas formas:
 *
 *  'hero'  → abertura da página inicial. Com a tela de chave removida, esta
 *            passou a ser a primeira coisa que a pessoa vê, então a marca
 *            aparece grande e centralizada, como na vinheta.
 *  'bar'   → barra fixa e discreta, usada nas páginas de jogo, onde o que
 *            importa é o jogo e não a marca.
 */
export function Header({ variant = 'bar' }: { variant?: 'hero' | 'bar' }) {
  if (variant === 'hero') {
    return (
      <header className="relative overflow-hidden border-b border-edge/60">
        {/* Brilho atrás do logo — o mesmo fundo escuro da vinheta */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 h-[26rem] bg-[radial-gradient(ellipse_55%_60%_at_50%_60%,rgba(255,255,255,0.10),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent"
        />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-14 text-center sm:px-6 sm:py-20">
          <Link to="/" aria-label={site.name} className="transition-opacity hover:opacity-90">
            <Logo variant="stack" />
          </Link>
          <p className="mt-6 max-w-sm text-sm text-ink-soft">{site.tagline}</p>
        </div>
      </header>
    )
  }

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
