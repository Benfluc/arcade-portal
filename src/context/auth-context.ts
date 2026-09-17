import { createContext } from 'react'
import type { AccessKey } from '../config/access-keys'
import type { ValidationResult } from '../lib/auth'

export interface AuthContextValue {
  /** null = visitante (sem sessão). */
  session: AccessKey | null
  /** true enquanto a sessão salva é restaurada, no primeiro render. */
  booting: boolean
  signIn: (raw: string, remember: boolean) => Promise<ValidationResult>
  signOut: () => void
}

/**
 * Em arquivo separado do provider de propósito: o Fast Refresh do Vite só
 * consegue recarregar um módulo que exporta apenas componentes.
 */
export const AuthContext = createContext<AuthContextValue | null>(null)
