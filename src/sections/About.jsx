import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profileImg from '../assets/Image/about-profile.webp'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const aboutRef = useRef(null)
  const aboutImageRef = useRef(null)
  const aboutContentRef = useRef(null)

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return undefined
    }

    const appContent = aboutRef.current?.parentElement?.parentElement
    const refreshAfterAppReveal = (event) => {
      if (event.target === appContent && event.animationName === 'appReveal') {
        ScrollTrigger.refresh()
      }
    }

    appContent?.addEventListener('animationend', refreshAfterAppReveal)

    const context = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches
      const imageStartX = isDesktop ? '25vw' : 0
      const copyStartX = isDesktop ? '-25vw' : 0
      const mobileStartY = isDesktop ? 0 : 36

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: isDesktop ? 'top top' : 'top 82%',
          end: () => isDesktop ? `+=${window.innerHeight * 1.25}` : 'top 28%',
          scrub: true,
          pin: isDesktop,
          pinSpacing: true,
          pinType: 'transform',
          anticipatePin: isDesktop ? 1 : 0,
          invalidateOnRefresh: true,
        },
      })

      timeline
        .fromTo(
          aboutImageRef.current,
          {
            x: imageStartX,
            y: mobileStartY,
            autoAlpha: 0,
            scale: 0.8,
          },
          {
            x: imageStartX,
            y: mobileStartY,
            autoAlpha: 1,
            scale: 1,
            duration: 1,
            ease: 'none',
          },
        )
        .to(aboutImageRef.current, {
          x: 0,
          y: 0,
          duration: 1.5,
          ease: 'none',
        })
        .fromTo(
          aboutContentRef.current,
          {
            x: copyStartX,
            y: mobileStartY,
            autoAlpha: 0,
          },
          {
            x: 0,
            y: 0,
            autoAlpha: 1,
            duration: 1.5,
            ease: 'none',
            force3D: false,
          },
          '<0.5',
        )
    }, aboutRef)

    return () => {
      appContent?.removeEventListener('animationend', refreshAfterAppReveal)
      context.revert()
    }
  }, [])

  return (
    <section
      ref={aboutRef}
      id="about"
      className="theme-section relative flex min-h-screen items-center overflow-hidden bg-[#020202] px-6 py-24 scroll-mt-16 sm:px-8 lg:h-screen lg:px-10"
    >
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div
          ref={aboutImageRef}
          className="gsap-ken-burns relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem]"
        >
          <div className="absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(220,20,60,0.28),_transparent_62%)] blur-2xl" />
          <div className="absolute inset-4 rounded-[2rem] border border-[#DC143C]/28" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(220,20,60,0.16),transparent_36%,rgba(255,255,255,0.03)_72%,rgba(220,20,60,0.1))] " />
            <img
              src={profileImg}
              alt="Millat Hossain"
              width="960"
              height="1280"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover rounded-[2rem]"
            />
          </div>
        </div>

        <div ref={aboutContentRef} className="space-y-6">
          <p className="about-label font-ui text-xs font-medium uppercase tracking-[0.38em] text-[#DC143C]">
            About Me
          </p>

          <div className="space-y-4">
            <h2
              className="about-heading font-display max-w-2xl text-4xl font-semibold uppercase leading-tight text-white sm:text-5xl"
              style={{ overflow: 'hidden' }}
            >
              Building clean products with strong frontend focus.
            </h2>

            <p className="about-body max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              I build fast web experiences that feel sharp, scale smoothly, and stay easy
              to use.
            </p>
          </div>

          <p className="about-body font-ui max-w-2xl text-sm uppercase leading-7 tracking-[0.22em] text-slate-400">
            Modern UI. Full stack mindset. Performance first.
          </p>
        </div>
      </div>
    </section>
  )
}
