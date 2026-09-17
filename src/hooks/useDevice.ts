import { useEffect, useState } from 'react'

/**
 * "É um aparelho de toque?"
 *
 * Só a media query não basta: notebooks com tela sensível ao toque casam com
 * `pointer: coarse` em alguns navegadores, e certos Android reportam
 * `hover: hover` por engano. Cruzar com `maxTouchPoints` remove os dois casos —
 * um notebook com touch continua sendo tratado como PC (tem mouse: `hover:
 * hover` + `pointer: fine`), e um celular continua sendo celular.
 */
function detectTouch(): boolean {
  if (typeof window === 'undefined') return false
  const hasTouchPoints = navigator.maxTouchPoints > 0
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const noHover = window.matchMedia('(hover: none)').matches
  return hasTouchPoints && (coarse || noHover)
}

/** Informações do dispositivo usadas para adaptar o player. */
export function useDevice() {
  const [isTouch, setIsTouch] = useState(detectTouch)
  const [isPortrait, setIsPortrait] = useState(
    () => typeof window !== 'undefined' && window.innerHeight > window.innerWidth,
  )

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: coarse)')
    const hoverQuery = window.matchMedia('(hover: none)')
    const portraitQuery = window.matchMedia('(orientation: portrait)')

    const syncTouch = () => setIsTouch(detectTouch())
    const syncOrientation = () => setIsPortrait(portraitQuery.matches)

    pointerQuery.addEventListener('change', syncTouch)
    hoverQuery.addEventListener('change', syncTouch)
    portraitQuery.addEventListener('change', syncOrientation)
    syncTouch()
    syncOrientation()

    return () => {
      pointerQuery.removeEventListener('change', syncTouch)
      hoverQuery.removeEventListener('change', syncTouch)
      portraitQuery.removeEventListener('change', syncOrientation)
    }
  }, [])

  return { isTouch, isPortrait }
}
