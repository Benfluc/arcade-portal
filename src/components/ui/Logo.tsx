import { site } from '../../config/site'
import { RaccoonMark } from './RaccoonMark'

/**
 * Assinatura da marca: guaxinim + nome em tipografia pixelada,
 * do jeito que aparece na vinheta de abertura.
 */
export function Logo({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const large = size === 'lg'

  if (large) {
    // Versão empilhada, usada na tela de entrada.
    return (
      <span className="flex flex-col items-center gap-4">
        <RaccoonMark className="h-16 w-auto text-ink drop-shadow-[0_0_28px_rgba(255,255,255,0.14)]" />
        <span className="font-pixel text-xl tracking-tight text-ink sm:text-2xl">{site.name}</span>
      </span>
    )
  }

  // Versão horizontal, usada no cabeçalho.
  return (
    <span className="flex items-center gap-2.5">
      <RaccoonMark className="h-7 w-auto text-ink" />
      <span className="font-pixel text-[13px] tracking-tight text-ink">{site.name}</span>
    </span>
  )
}
