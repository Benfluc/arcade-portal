/**
 * Camada decorativa de fundo: grade técnica, brilho difuso, linha de
 * varredura e grão. Puramente visual.
 *
 * A marca é monocromática, então os halos são brancos em opacidade muito
 * baixa — só o suficiente para o carvão não ficar chapado. O único ponto
 * de cor é o âmbar embaixo, que evoca o facho de lanterna.
 */
export function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-void" />

      {/* Grade em perspectiva, esmaecendo para baixo */}
      <div
        className="grid-bg absolute inset-0 opacity-30"
        style={{ maskImage: 'linear-gradient(to bottom, black, transparent 78%)' }}
      />

      {/* Halos */}
      <div className="animate-pulse-slow absolute -top-48 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-ink/8 blur-[130px]" />
      <div className="animate-pulse-slow absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-ink/5 blur-[140px] [animation-delay:2s]" />
      <div className="animate-pulse-slow absolute -bottom-52 -left-32 h-[32rem] w-[32rem] rounded-full bg-lantern/6 blur-[150px] [animation-delay:4s]" />

      {/* Linha de varredura */}
      <div className="animate-scan absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent via-ink/4 to-transparent" />

      {/* Grão */}
      <div className="noise absolute inset-0 opacity-[0.04] mix-blend-overlay" />

      {/* Vinheta */}
      <div className="absolute inset-0 bg-[radial-gradient(110%_80%_at_50%_0%,transparent_35%,rgba(3,3,6,0.88)_100%)]" />
    </div>
  )
}
