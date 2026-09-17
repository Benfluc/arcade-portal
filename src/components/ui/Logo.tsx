import { Gamepad2 } from 'lucide-react'
import { site } from '../../config/site'

export function Logo({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const large = size === 'lg'
  return (
    <span className="flex items-center gap-3">
      <span
        className={`relative grid place-items-center rounded-xl bg-gradient-to-br from-neon to-neon-deep ring-1 ring-neon-soft/40 ${
          large ? 'size-12' : 'size-9'
        }`}
      >
        <span className="absolute inset-0 rounded-xl bg-neon/50 blur-lg" />
        <Gamepad2 className={`relative text-white ${large ? 'size-6' : 'size-5'}`} strokeWidth={2.2} />
      </span>
      <span
        className={`font-display font-bold tracking-tight text-ink ${
          large ? 'text-2xl sm:text-3xl' : 'text-lg'
        }`}
      >
        {site.name}
      </span>
    </span>
  )
}
