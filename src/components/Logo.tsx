type LogoSize = 'sm' | 'md' | 'lg'

interface LogoProps {
  size?: LogoSize
  showWordmark?: boolean
  className?: string
}

const sizeClasses: Record<LogoSize, { box: string; wordmark: string }> = {
  sm: { box: 'h-9 w-9', wordmark: 'text-[10px]' },
  md: { box: 'h-12 w-12 sm:h-14 sm:w-14', wordmark: 'text-[11px] sm:text-xs' },
  lg: { box: 'h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]', wordmark: 'text-xs sm:text-sm' },
}

export function Logo({ size = 'md', showWordmark = true, className = '' }: LogoProps) {
  const { box, wordmark } = sizeClasses[size]

  return (
    <div className={`flex flex-col items-center justify-center gap-2.5 ${className}`}>
      <div
        className={`relative flex shrink-0 items-center justify-center rounded-[22%] ${box}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-[22%] bg-celeste/15 blur-md" />
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="relative h-full w-full drop-shadow-[0_8px_24px_rgba(108,180,238,0.25)]"
          role="img"
          aria-label="Feriadapp"
        >
          <defs>
            <linearGradient id="logo-bg" x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--logo-bg-start, #1e2838)" />
              <stop offset="1" stopColor="var(--logo-bg-end, #151c28)" />
            </linearGradient>
            <linearGradient id="logo-f" x1="14" y1="10" x2="34" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a8d4f5" />
              <stop offset="1" stopColor="#6cb4ee" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="13" fill="url(#logo-bg)" />
          <rect
            x="0.75"
            y="0.75"
            width="46.5"
            height="46.5"
            rx="12.25"
            stroke="url(#logo-f)"
            strokeOpacity="0.35"
          />
          <path
            d="M16 14h14.5c1.1 0 2 .9 2 2s-.9 2-2 2H20v7h9.5c1.1 0 2 .9 2 2s-.9 2-2 2H20v9c0 1.1-.9 2-2 2s-2-.9-2-2V14z"
            fill="url(#logo-f)"
          />
        </svg>
      </div>

      {showWordmark && (
        <span
          className={`${wordmark} font-bold uppercase tracking-[0.28em] text-celeste-soft`}
        >
          Feriadapp
        </span>
      )}
    </div>
  )
}
