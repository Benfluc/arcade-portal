import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { AccessKey } from '../config/access-keys'
import { normalizeKey, validateKey } from '../lib/auth'
import { AuthContext, type AuthContextValue } from './auth-context'

const STORAGE_KEY = 'nova-arcade:session'

interface StoredSession {
  key: string
  persist: boolean
}

function readStored(): StoredSession | null {
  for (const store of [sessionStorage, localStorage]) {
    try {
      const raw = store.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw) as StoredSession
    } catch {
      /* modo privado ou storage bloqueado — segue sem sessão salva */
    }
  }
  return null
}

function writeStored(value: StoredSession) {
  try {
    const store = value.persist ? localStorage : sessionStorage
    store.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    /* ignora */
  }
}

function clearStored() {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignora */
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AccessKey | null>(null)

  // Só há o que restaurar se existir algo salvo — sem isso o portal já
  // começa pronto, sem um piscar de "carregando" para quem nunca entrou.
  const [booting, setBooting] = useState(() => readStored() !== null)

  // Revalida a chave salva: se ela foi removida do código ou expirou desde o
  // último acesso, a sessão cai sozinha.
  useEffect(() => {
    const stored = readStored()
    if (!stored) return

    let active = true

    validateKey(stored.key).then((result) => {
      if (!active) return
      if (result.ok) setSession(result.key)
      else clearStored()
      setBooting(false)
    })

    return () => {
      active = false
    }
  }, [])

  const signIn = useCallback(async (raw: string, remember: boolean) => {
    const result = await validateKey(raw)
    if (result.ok) {
      setSession(result.key)
      writeStored({ key: normalizeKey(raw), persist: remember })
    }
    return result
  }, [])

  const signOut = useCallback(() => {
    clearStored()
    setSession(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ session, booting, signIn, signOut }),
    [session, booting, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
