/**
 * ============================================================
 *  CHAVES DE ACESSO
 * ============================================================
 *
 *  ⚠️  LEIA ISTO ANTES DE USAR
 *
 *  A validação acontece NO NAVEGADOR. As chaves abaixo são
 *  compiladas dentro do arquivo JavaScript enviado ao usuário,
 *  ou seja: qualquer pessoa com conhecimento técnico consegue
 *  abrir o DevTools e ler todas elas.
 *
 *  Isto é uma PORTA, não um COFRE. Serve para:
 *    ✓ impedir que o portal seja acessado por acaso ou por
 *      buscadores;
 *    ✓ organizar quem recebeu acesso a quê.
 *
 *  NÃO serve para proteger conteúdo confidencial ou comercial.
 *  Se precisar disso, migre a validação para um backend
 *  (Supabase, Cloudflare Workers, etc.) — o ponto de troca é a
 *  função `validateKey` em `src/lib/auth.ts`.
 *
 *  Os arquivos dos jogos em /public/games também ficam
 *  acessíveis por URL direta para quem souber o caminho.
 * ============================================================
 */

export interface AccessKey {
  /** A chave que o testador digita. Case-insensitive, espaços ignorados. */
  key: string
  /** Para quem é esta chave — aparece no cabeçalho após o login. */
  label: string
  /**
   * Quais jogos esta chave enxerga.
   *  '*'                → todos os jogos visíveis
   *  ['slug-a','slug-b'] → apenas estes
   */
  games: '*' | string[]
  /**
   * Data de expiração no formato 'AAAA-MM-DD' (opcional).
   * Depois dela a chave para de funcionar.
   */
  expiresAt?: string
  /** Marque para desativar temporariamente sem apagar a linha. */
  revoked?: boolean
}

export const accessKeys: AccessKey[] = [
  {
    key: 'NOVA-DEMO-2026',
    label: 'Acesso de demonstração',
    games: '*',
  },
  {
    key: 'PLAYTEST-ALPHA',
    label: 'Grupo de playtest — Alpha',
    games: '*',
    expiresAt: '2027-12-31',
  },
  {
    key: 'AMIGO-JOAO',
    label: 'João',
    games: ['light-chase'],
  },
]
