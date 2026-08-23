export default function ScrollProgress() {
  return (
    <>
      <div
        aria-hidden="true"
        className="fixed bottom-0 left-0 w-full h-[2px] bg-outline-variant/30 z-[60] pointer-events-none"
      >
        <div className="h-full bg-secondary origin-left" data-scroll-progress-bar="" style={{ transform: 'scaleX(0)' }} />
      </div>
      <span
        aria-hidden="true"
        data-scroll-progress-percent=""
        className="fixed bottom-2 right-4 font-label-sm text-[10px] tracking-widest text-on-surface-variant/70 z-[60] pointer-events-none"
      >
        0%
      </span>
    </>
  )
}
