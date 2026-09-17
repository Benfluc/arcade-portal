/** '2026-09-10' → '10 set 2026' */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
    .format(date)
    .replace('.', '')
}

/** Hash estável para gerar uma capa procedural quando o jogo não tem imagem. */
export function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

/**
 * Gradiente determinístico usado como capa quando o jogo não tem imagem.
 *
 * O matiz é sorteado dentro da faixa da identidade (azul → violeta → magenta),
 * e não em 360°: assim cada jogo ganha uma cor própria sem que um verde ou um
 * laranja quebre a paleta do portal.
 */
export function fallbackCover(slug: string): string {
  const hue = 225 + (hashString(slug) % 105) // 225–330
  const hue2 = hue + 34
  return `radial-gradient(125% 125% at 15% 10%, hsl(${hue} 65% 24%) 0%, hsl(${hue2} 60% 13%) 50%, #0a0a12 100%)`
}

export function isExternal(url: string): boolean {
  return /^https?:\/\//i.test(url)
}
