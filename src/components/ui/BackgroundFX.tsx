/**
 * Camada decorativa de fundo: grade técnica, brilhos de neon,
 * linha de varredura e grão. Puramente visual.
 */
export function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-void" />

      {/* Grade em perspectiva, esmaecendo para baixo */}
      <div
        className="grid-bg absolute inset-0 opacity-40"
        style={{ maskImage: 'linear-gradient(to bottom, black, transparent 78%)' }}
      />

      {/* Halos de cor */}
      <div className="animate-pulse-slow absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-neon/18 blur-[120px]" />
      <div className="animate-pulse-slow absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-cyber/10 blur-[130px] [animation-delay:1.5s]" />
      <div className="animate-pulse-slow absolute -bottom-40 -left-24 h-[30rem] w-[30rem] rounded-full bg-neon-deep/20 blur-[140px] [animation-delay:3s]" />

      {/* Linha de varredura */}
      <div className="animate-scan absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent via-neon/6 to-transparent" />

      {/* Grão */}
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />

      {/* Vinheta */}
      <div className="absolute inset-0 bg-[radial-gradient(110%_80%_at_50%_0%,transparent_35%,rgba(3,3,6,0.85)_100%)]" />
    </div>
  )
}
