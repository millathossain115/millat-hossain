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
const marqueeGroups = [0, 1]

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
      <div className="loader-backdrop" />
      <div className="loader-glow loader-glow--center" />
      <div className="loader-glow loader-glow--corner" />

      <p className="font-ui loader-name">
        Millat Hossain
      </p>

      <div className="loader-marquee" aria-hidden="true">
        <div
          className={`loader-marquee__track ${isComplete ? 'loader-marquee__track--fade' : ''}`}
        >
          {marqueeGroups.map((groupIndex) => (
            <div className="loader-marquee__group" key={groupIndex}>
              {marqueeItems.map((item) => (
                <span
                  key={`${groupIndex}-${item}`}
                  className="font-display loader-marquee__item"
                >
                  <span>{item}</span>
                  <span className="loader-marquee__dot">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="loader-core">
        <div className="loader-stack">
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
            className={`font-ui loader-subtitle ${
              isComplete || isWelcomeExpanding
                ? 'loader-subtitle--hidden'
                : ''
            }`}
          >
            Loading Portfolio Experience
          </p>
        </div>
      </div>
    </div>
  )
}
