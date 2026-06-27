import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profileImg from '../assets/Image/Untitled design.png'

gsap.registerPlugin(ScrollTrigger)



export default function About() {
  const aboutRef = useRef(null)
  const aboutImageRef = useRef(null)
  const aboutContentRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return undefined
    }

    const context = gsap.context(() => {
      // 1. "getting up with smooth scroll" for the section
      gsap.from(aboutRef.current, {
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 90%',
          end: 'top 50%',
          scrub: 1.5,
        }
      })

      // 2. Timeline for Image and Content panning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 75%',
          end: 'top 25%', // Animation finishes earlier so it is completely clean before it takes up the full screen
          scrub: 1, // Smooth scrubbing driven by scroll
        },
      })

      // In a scrubbed timeline, duration acts as a proportion of the scroll distance
      // Image appears first at the center
      tl.fromTo(
        aboutImageRef.current,
        { x: '25vw', opacity: 0, scale: 0.8, filter: 'blur(20px)' },
        { x: '25vw', opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'none' }
      )
      // Then it pans to the left
      .to(
        aboutImageRef.current,
        { x: '0vw', duration: 1.5, ease: 'none' }
      )
      // Then the text content pans center to right (No filter applied to prevent text anti-aliasing issues)
      .fromTo(
        aboutContentRef.current,
        { x: '-25vw', opacity: 0 },
        { x: '0vw', opacity: 1, duration: 1.5, ease: 'none', force3D: false },
        '<0.5' // Overlaps with the image panning left
      )

    }, aboutRef)

    return () => context.revert()
  }, [])

  return (
    <section
      ref={aboutRef}
      id="about"
      className="theme-section relative flex min-h-screen items-center overflow-hidden px-6 py-24 scroll-mt-16 sm:px-8 lg:px-10"
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
              loading="lazy"
              decoding="async"
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
