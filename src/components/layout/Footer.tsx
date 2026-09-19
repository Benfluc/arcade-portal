import { site } from '../../config/site'
import { RaccoonMark } from '../ui/RaccoonMark'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-edge/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center sm:px-6">
        <RaccoonMark className="h-6 w-auto text-ink-dim" />
        <p className="font-pixel text-[10px] tracking-wide text-ink-soft">{site.name}</p>
        <p className="text-xs text-ink-dim">{site.studio}</p>
      </div>
    </footer>
  )
}
