import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const defaultPointer = { x: 50, y: 34, active: false }

export default function Hero({ isIntroReady = true }) {
  const [pointer, setPointer] = useState(defaultPointer)
  const heroRef = useRef(null)
  const heroContentRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      return undefined
    }

    const context = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.85,
          },
        })
        .to(
          heroContentRef.current,
          {
            yPercent: -18,
            opacity: 0,
            scale: 1.08,
            ease: 'none',
            force3D: false, // Prevents text anti-aliasing loss on load
          },
          0
        )
        .to(
          '.hero-scroll-layer',
          {
            yPercent: 24,
            opacity: 0,
            scale: 1.15,
            ease: 'none',
            force3D: false,
          },
          0
        )
    }, heroRef)

    return () => context.revert()
  }, [])

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100

    setPointer({ x, y, active: true })
  }

  const handlePointerLeave = () => {
    setPointer(defaultPointer)
  }

  const handleScrollToContact = (event) => {
    const contactSection = document.getElementById('contact')

    if (!contactSection) {
      return
    }

    event.preventDefault()
    window.lenis?.scrollTo(contactSection, {
      offset: -24,
      duration: 1.4,
    })
    window.history.replaceState(null, '', '#contact')
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className={`relative -mt-[120px] flex min-h-screen items-center justify-center overflow-hidden px-4 pb-12 pt-40 text-center sm:-mt-[108px] sm:px-6 sm:pb-14 sm:pt-36 md:-mt-[96px] md:px-10 md:pb-20 md:pt-36 ${
        isIntroReady ? 'hero-intro-ready' : ''
      }`}
    >
      <div className="hero-scroll-layer absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(220,20,60,0.24),_transparent_34%),radial-gradient(circle_at_18%_82%,_rgba(127,29,29,0.22),_transparent_28%),radial-gradient(circle_at_80%_18%,_rgba(91,12,24,0.18),_transparent_22%),linear-gradient(180deg,_#040404_0%,_#080808_52%,_#010101_100%)]" />
      <div className="hero-scroll-layer absolute left-1/2 top-12 h-56 w-56 -translate-x-1/2 rounded-full bg-[#DC143C]/20 blur-[120px] sm:h-72 sm:w-72 sm:blur-[140px] md:h-80 md:w-80 md:blur-[160px]" />
      <div className="hero-scroll-layer absolute bottom-0 left-0 h-72 w-72 bg-[radial-gradient(circle,_rgba(220,20,60,0.18)_0%,_rgba(220,20,60,0)_68%)] blur-2xl sm:h-96 sm:w-96 md:h-[28rem] md:w-[28rem]" />
      <div className="hero-scroll-layer absolute right-2 top-20 h-44 w-44 rounded-full bg-red-950/20 blur-[110px] sm:right-6 sm:top-24 sm:h-56 sm:w-56 sm:blur-[120px] md:right-8 md:h-64 md:w-64 md:blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[#010101]/80 to-[#010101]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: pointer.active ? 1 : 0,
          background: `radial-gradient(circle 180px at ${pointer.x}% ${pointer.y}%, rgba(220,20,60,0.18), rgba(220,20,60,0) 62%)`,
        }}
      />

      <div
        ref={heroContentRef}
        className="relative mx-auto flex w-full max-w-[110rem] flex-col items-center justify-center"
      >
        <div className="relative w-full space-y-2 sm:space-y-3">
          <div className="hero-soft-reveal delay-1 flex flex-col items-center gap-3">
            {/* <p className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[#DC143C] sm:text-xs sm:tracking-[0.42em] md:text-sm">
              {'</MH>'}
            </p> */}
            <p className="font-ui shine-text inline-block text-[0.72rem] font-medium uppercase tracking-[0.28em] sm:text-sm sm:tracking-[0.36em] md:text-base md:tracking-[0.42em]">
              Full Stack Developer
            </p>
          </div>

          <div
            className="relative"
            style={{
              '--cursor-x': `${pointer.x}%`,
              '--cursor-y': `${pointer.y}%`,
            }}
          >
            <div className="pointer-events-none absolute inset-0">
              <div
                aria-hidden="true"
                className="font-display select-none whitespace-nowrap text-[clamp(1.5rem,7.2vw,7.4rem)] font-semibold uppercase leading-[0.86] tracking-[0.02em] text-transparent opacity-0 transition-opacity duration-300 sm:tracking-[0.055em] md:tracking-[0.08em]"
                style={{
                  opacity: pointer.active ? 1 : 0,
                  background:
                    'radial-gradient(circle 190px at var(--cursor-x) var(--cursor-y), rgba(255,122,122,0.98) 0%, rgba(220,20,60,0.94) 30%, rgba(220,20,60,0) 68%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                MILLAT HOSSAIN
              </div>
              <div
                aria-hidden="true"
                className="font-ui select-none whitespace-nowrap text-[clamp(1.2rem,4.8vw,4.2rem)] font-semibold uppercase leading-none tracking-[0.08em] text-transparent opacity-0 transition-opacity duration-300 sm:tracking-[0.12em] md:tracking-[0.16em]"
                style={{
                  opacity: pointer.active ? 1 : 0,
                  background:
                    'radial-gradient(circle 190px at var(--cursor-x) var(--cursor-y), rgba(255,122,122,0.98) 0%, rgba(220,20,60,0.94) 30%, rgba(220,20,60,0) 68%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                SOFTWARE ENGINEER
              </div>
            </div>

            <h1 className="font-display hero-cinematic-reveal delay-2 whitespace-nowrap text-[clamp(1.5rem,7.2vw,7.4rem)] font-semibold uppercase leading-[0.86] tracking-[0.02em] text-white sm:tracking-[0.055em] md:tracking-[0.08em]">
              MILLAT HOSSAIN
            </h1>
            <div className="hero-cinematic-reveal delay-3">
              <h2 className="font-ui inline-block whitespace-nowrap text-[clamp(1.2rem,4.8vw,4.2rem)] font-semibold uppercase leading-none tracking-[0.08em] text-[#DC143C] sm:tracking-[0.12em] md:tracking-[0.16em]">
                SOFTWARE ENGINEER
              </h2>
            </div>
          </div>
        </div>

        <p className="font-ui hero-soft-reveal delay-4 mt-6 max-w-3xl px-2 text-sm leading-6 text-slate-300 sm:mt-8 sm:px-0 sm:leading-7 md:text-base md:leading-8">
          I build fast, modern digital products with a strong focus on clean
          user experience, scalable frontend systems, and thoughtful interaction
          design.
        </p>

        <div className="hero-soft-reveal delay-5 mt-10 flex w-full flex-col items-center gap-5 sm:mt-12 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-6 md:mt-14">
          <div className="hidden sm:block" />

          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="slow-blink rounded-full border border-[#DC143C] px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-[rgba(148,163,184,0.75)] transition-all duration-300 hover:bg-[#DC143C] hover:text-white hover:shadow-[0_0_30px_rgba(220,20,60,0.28)] sm:justify-self-center sm:px-8 sm:text-sm sm:tracking-[0.42em]"
          >
            Hire Me
          </a>

          <p className="text-center text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[rgba(148,163,184,0.75)] sm:justify-self-end sm:text-right sm:text-xs sm:tracking-[0.36em] md:text-sm md:tracking-[0.42em]">
            Based in Dhaka
          </p>
        </div>
      </div>
    </section>
  )
}
