import { accessKeys, type AccessKey } from '../config/access-keys'

export type AuthFailure = 'invalida' | 'expirada' | 'revogada'

export type ValidationResult =
  | { ok: true; key: AccessKey }
  | { ok: false; reason: AuthFailure }

/** Normaliza o que o usuário digitou: sem espaços, maiúsculas. */
export function normalizeKey(raw: string): string {
  return raw.trim().replace(/\s+/g, '').toUpperCase()
}

/**
 * Único ponto de validação do portal.
 *
 * Para migrar para um backend depois, troque o corpo desta função por um
 * `fetch` e transforme-a em `async` — o restante do app já trata a chamada
 * como assíncrona.
 */
export async function validateKey(raw: string): Promise<ValidationResult> {
  const candidate = normalizeKey(raw)

  // Pequeno atraso: evita que a resposta seja instantânea o bastante para
  // permitir testes automatizados rápidos, e dá tempo de mostrar o loading.
  await new Promise((resolve) => setTimeout(resolve, 450))

  const found = accessKeys.find((entry) => normalizeKey(entry.key) === candidate)

  if (!found) return { ok: false, reason: 'invalida' }
  if (found.revoked) return { ok: false, reason: 'revogada' }

  if (found.expiresAt) {
    // Compara em fim-do-dia local para a chave valer durante toda a data.
    const limit = new Date(`${found.expiresAt}T23:59:59`)
    if (!Number.isNaN(limit.getTime()) && Date.now() > limit.getTime()) {
      return { ok: false, reason: 'expirada' }
    }
  }

  return { ok: true, key: found }
}

export const failureMessages: Record<AuthFailure, string> = {
  invalida: 'Chave de acesso inválida. Confira se digitou corretamente.',
  expirada: 'Esta chave expirou. Peça uma nova ao desenvolvedor.',
  revogada: 'Esta chave foi desativada.',
}

/** Esta chave pode ver este jogo? */
export function keyAllowsGame(key: AccessKey, slug: string): boolean {
  return key.games === '*' || key.games.includes(slug)
}
