import { site } from '../../config/site'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-edge/60 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center sm:px-6">
        <p className="font-mono text-[11px] tracking-widest text-ink-dim uppercase">
          {site.name} — {site.studio}
        </p>
        <p className="text-xs text-ink-dim">
          Builds privadas para playtest. Não redistribua os links.
        </p>
      </div>
    </footer>
  )
}
