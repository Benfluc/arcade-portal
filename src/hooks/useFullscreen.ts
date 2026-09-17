import { useCallback, useEffect, useState, type RefObject } from 'react'

/**
 * Fullscreen com fallback para o webkit do Safari/iOS.
 * No iPhone o Safari não implementa a Fullscreen API em elementos comuns;
 * nesse caso `supported` vem false e a UI mostra um modo "imersivo" via CSS.
 */
export function useFullscreen(ref: RefObject<HTMLElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    const element = ref.current
    setSupported(
      Boolean(
        document.fullscreenEnabled ||
          // Safari antigo
          (document as Document & { webkitFullscreenEnabled?: boolean }).webkitFullscreenEnabled,
      ) && Boolean(element),
    )
  }, [ref])

  useEffect(() => {
    const sync = () => {
      const current =
        document.fullscreenElement ??
        (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement
      setIsFullscreen(Boolean(current))
    }
    document.addEventListener('fullscreenchange', sync)
    document.addEventListener('webkitfullscreenchange', sync)
    return () => {
      document.removeEventListener('fullscreenchange', sync)
      document.removeEventListener('webkitfullscreenchange', sync)
    }
  }, [])

  const toggle = useCallback(async () => {
    const element = ref.current
    if (!element) return

    type LegacyElement = HTMLElement & { webkitRequestFullscreen?: () => Promise<void> }
    type LegacyDocument = Document & { webkitExitFullscreen?: () => Promise<void> }

    try {
      const active =
        document.fullscreenElement ??
        (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement

      if (active) {
        await (document.exitFullscreen?.() ?? (document as LegacyDocument).webkitExitFullscreen?.())
      } else {
        await (element.requestFullscreen?.({ navigationUI: 'hide' }) ??
          (element as LegacyElement).webkitRequestFullscreen?.())

        // Em celulares, tenta travar na horizontal. Falha silenciosa é esperada
        // (o navegador só permite em fullscreen e nem todos implementam).
        const orientation = screen.orientation as ScreenOrientation & {
          lock?: (value: string) => Promise<void>
        }
        await orientation?.lock?.('landscape').catch(() => undefined)
      }
    } catch {
      /* usuário negou ou navegador não permitiu — mantém a tela normal */
    }
  }, [ref])

  return { isFullscreen, supported, toggle }
}
