/**
 * A subtle, public-facing "system signature" watermark — the light-mode echo of
 * the Laine HQ command-center watermark, kept understated for a marketing site.
 *
 * Deliberately:
 *  - bottom-LEFT (the Ask Lane launcher sits bottom-right — no collision),
 *  - desktop-only (hidden below lg to avoid crowding mobile),
 *  - pointer-events-none + low opacity so it never distracts or blocks clicks.
 */
export function SystemSignature() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-5 left-5 z-30 hidden select-none lg:block"
    >
      <div className="font-mono text-[10px] uppercase leading-tight tracking-[0.18em] text-slate-400/70">
        <div className="font-semibold text-slate-500/70">Lane Industries</div>
        <div>Systems for Small Business</div>
      </div>
    </div>
  )
}
