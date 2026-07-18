import { useEffect, useState } from 'react'
import './Loader.css'

const marqueeItems = [
  'Software Engineer',
  'Full Stack Developer',
  'Frontend Systems',
  'UI Engineering',
  'Scalable Interfaces',
  'Performance First',
]

export default function Loader({ onRevealStart, onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isWelcomeExpanding, setIsWelcomeExpanding] = useState(false)
  const label = isComplete ? 'Welcome' : `Loading ${progress}%`

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(intervalId)
          return 100
        }

        const increment = current < 65 ? 4 : current < 88 ? 2 : 1
        return Math.min(current + increment, 100)
      })
    }, 45)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (progress < 100) {
      return undefined
    }

    const completeTimeoutId = window.setTimeout(() => {
      setIsComplete(true)
    }, 140)

    const expandTimeoutId = window.setTimeout(() => {
      setIsWelcomeExpanding(true)
      onRevealStart()
    }, 1080)

    const hideTimeoutId = window.setTimeout(() => {
      onComplete()
    }, 2480)

    return () => {
      window.clearTimeout(completeTimeoutId)
      window.clearTimeout(expandTimeoutId)
      window.clearTimeout(hideTimeoutId)
    }
  }, [progress, onComplete, onRevealStart])

  return (
    <div
      className={`portfolio-loader ${isWelcomeExpanding ? 'portfolio-loader--fade' : ''}`}
      aria-hidden={isWelcomeExpanding}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(220,20,60,0.24),_transparent_32%),radial-gradient(circle_at_18%_82%,_rgba(127,29,29,0.18),_transparent_28%),radial-gradient(circle_at_80%_18%,_rgba(91,12,24,0.15),_transparent_22%),linear-gradient(180deg,_#040404_0%,_#080808_52%,_#010101_100%)]" />
      <div className="absolute left-1/2 top-18 h-52 w-52 -translate-x-1/2 rounded-full bg-[#DC143C]/18 blur-[120px] sm:h-72 sm:w-72 sm:blur-[150px]" />
      <div className="absolute bottom-0 left-0 h-72 w-72 bg-[radial-gradient(circle,_rgba(220,20,60,0.16)_0%,_rgba(220,20,60,0)_68%)] blur-2xl sm:h-96 sm:w-96" />

      <p className="font-ui loader-name absolute left-1/2 top-5 -translate-x-1/2 text-center text-[0.7rem] font-medium uppercase tracking-[0.3em] text-[rgba(148,163,184,0.75)] sm:left-auto sm:right-8 sm:top-8 sm:translate-x-0 sm:text-xs sm:tracking-[0.42em]">
        Millat Hossain
      </p>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
        <div className="loader-marquee pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden">
          <div
            className={`loader-marquee__track ${isComplete ? 'loader-marquee__track--fade' : ''}`}
          >
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="font-display mx-4 inline-flex items-center gap-4 whitespace-nowrap text-[2.35rem] font-semibold uppercase tracking-[0.08em] text-white/18 sm:mx-8 sm:gap-6 sm:text-[4.2rem] md:text-[6rem] lg:text-[7rem]"
              >
                <span>{item}</span>
                <span className="text-[#DC143C]/45">•</span>
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-20 flex flex-col items-center gap-5">
          <div
            className={`loader-pill ${isWelcomeExpanding ? 'loader-pill--fade' : ''} ${
              isComplete ? 'loader-pill--complete' : ''
            }`}
          >
            <span className="loader-pill__dot loader-pill__dot--left" />
            <div
              className={`loader-pill__label ${
                isWelcomeExpanding ? 'loader-welcome--expand' : ''
              }`}
            >
              {label}
            </div>
            <span className="loader-pill__dot loader-pill__dot--right" />
          </div>

          <p
            className={`font-ui text-[0.72rem] font-medium uppercase tracking-[0.32em] text-[rgba(148,163,184,0.75)] transition-all duration-500 sm:text-sm sm:tracking-[0.42em] ${
              isComplete || isWelcomeExpanding
                ? 'opacity-0 blur-sm'
                : 'opacity-100 blur-0'
            }`}
          >
            Loading Portfolio Experience
          </p>
        </div>
      </div>
    </div>
  )
}
