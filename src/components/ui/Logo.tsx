import { RaccoonMark } from './RaccoonMark'
import { Wordmark } from './Wordmark'

/**
 * Assinatura da marca: guaxinim + letreiro, do jeito que aparece na
 * vinheta de abertura. Os dois são vetor, então escalam sem perder nitidez.
 *
 *  'bar'   → deitado, para a barra fixa do topo
 *  'stack' → empilhado e centralizado, para a abertura da página inicial
 */
export function Logo({ variant = 'bar' }: { variant?: 'bar' | 'stack' }) {
  if (variant === 'stack') {
    return (
      <span className="flex flex-col items-center">
        <RaccoonMark className="h-16 w-auto text-ink sm:h-20" />
        <Wordmark className="mt-5 h-5 w-auto text-ink sm:mt-6 sm:h-7" />
      </span>
    )
  }

  return (
    <span className="flex items-center gap-2.5">
      <RaccoonMark className="h-7 w-auto text-ink" />
      <Wordmark className="h-[11px] w-auto text-ink" />
    </span>
  )
}
