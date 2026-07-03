import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import {
  FaAward,
  FaBookOpen,
  FaCertificate,
  FaGraduationCap,
} from 'react-icons/fa'
import { FiCalendar, FiMapPin } from 'react-icons/fi'
import { EDUCATION } from '../constants'
import useNearViewport from '../hooks/useNearViewport'

gsap.registerPlugin(ScrollTrigger)
const defaultPointer = { x: 0, y: 0, active: false }
const educationIcons = [FaGraduationCap, FaCertificate, FaBookOpen]

/** Splits element text into per-word <span> pairs for stagger reveal */
function splitWords(el) {
  const words = el.innerText.trim().split(/\s+/)
  el.innerHTML = words
    .map(
      (w) =>
        `<span class="gsap-word"><span class="gsap-word-inner">${w}</span></span>`
    )
    .join(' ')
  return Array.from(el.querySelectorAll('.gsap-word-inner'))
}

export default function Education() {
  const [pointer, setPointer] = useState(defaultPointer)
  const containerRef = useRef(null)
  const zoomTextRef = useRef(null)
  const redFillRef = useRef(null)
  const contentSectionRef = useRef(null)
  const isNearViewport = useNearViewport(containerRef)

  useEffect(() => {
    if (!isNearViewport) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // 1. Cinematic Zoom-Through Animation
      const zoomTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%', // Corresponds to the scroll distance given by the spacer
          scrub: 1,
        },
      })

      // Scale the text massively so the letter strokes cover the screen
      zoomTl
        .to(zoomTextRef.current, {
          scale: 150,
          ease: 'power2.in',
          duration: 1,
        })
        // Ensure the entire screen is perfectly red at the end of the scale
        .to(
          redFillRef.current,
          {
            opacity: 1,
            duration: 0.15,
          },
          '-=0.15'
        )

      // 2. Thematic Content Section Fade In
      // Fades in slightly before it reaches the top, sliding over the red background smoothly
      gsap.fromTo(
        contentSectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: contentSectionRef.current,
            start: 'top 75%',
            end: 'top 15%',
            scrub: 1,
          },
        }
      )

      // 3. Original Content Item Animations
      /* ── Section heading word-reveal ── */
      const headingEl = contentSectionRef.current.querySelector('.edu-heading')
      if (headingEl) {
        const words = splitWords(headingEl)
        gsap.fromTo(
          words,
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingEl,
              start: 'top 88%',
              end: 'top 55%',
              scrub: 0.9,
            },
          }
        )
      }

      /* ── Timeline line draw ── */
      const lineEl = contentSectionRef.current.querySelector(
        '.gsap-timeline-line'
      )
      if (lineEl) {
        gsap.fromTo(
          lineEl,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: contentSectionRef.current.querySelector('.edu-list'),
              start: 'top 78%',
              end: 'bottom 82%',
              scrub: 1,
            },
          }
        )
      }

      /* ── Each education item — enters from RIGHT for differentiation ── */
      const items = contentSectionRef.current.querySelectorAll('.edu-item')
      items.forEach((item) => {
        const dot = item.querySelector('.edu-dot')
        const content = item.querySelector('.edu-content')
        const duration = item.querySelector('.edu-duration')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 92%',
            end: 'top 65%',
            scrub: 1,
          },
        })

        /* Dot punches in */
        if (dot)
          tl.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, ease: 'back.out(2.2)', duration: 0.4 },
            0
          )
        /* Content slides from RIGHT */
        if (content)
          tl.fromTo(
            content,
            { x: 48, opacity: 0 },
            { x: 0, opacity: 1, ease: 'power3.out', duration: 0.7 },
            0.05
          )
        /* Duration slides from left */
        if (duration)
          tl.fromTo(
            duration,
            { x: -28, opacity: 0 },
            { x: 0, opacity: 1, ease: 'power2.out', duration: 0.5 },
            0.18
          )
      })

      const experienceSection = document.getElementById('experience')
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches
      const educationContent = contentSectionRef.current.querySelector(
        '[data-education-content]'
      )

      if (isDesktop && experienceSection && educationContent) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: contentSectionRef.current,
              start: 'top top',
              end: () => `+=${contentSectionRef.current.offsetHeight}`,
              scrub: true,
              pin: contentSectionRef.current,
              pinSpacing: false,
              pinType: 'transform',
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(
            educationContent,
            {
              opacity: 0.38,
              scale: 0.985,
              filter: 'blur(9px)',
              duration: 0.82,
              ease: 'none',
            },
            0.18
          )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isNearViewport])

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top

    setPointer({ x, y, active: true })
  }

  const handlePointerLeave = () => {
    setPointer(defaultPointer)
  }

  return (
    <div ref={containerRef} id="education" className="relative w-full">
      {/* 1. Keep the red zoom scene contained so it clears before the seamless content begins */}
      <div className="relative h-[250vh] w-full">
        <div className="sticky top-0 z-0 flex h-screen w-full items-center justify-center overflow-hidden bg-black">
          <div
            ref={zoomTextRef}
            aria-hidden="true"
            className="text-[#DC143C] font-display text-[15vw] sm:text-[12vw] font-bold tracking-[0.1em] text-center uppercase whitespace-nowrap"
          >
            EDUCATION
          </div>
          {/* Safety solid red fill to ensure the screen is fully enveloped at the end of the scale */}
          <div
            ref={redFillRef}
            className="absolute inset-0 bg-[#DC143C] opacity-0 pointer-events-none"
          />
        </div>

        {/* Allows 150vh of scrolling while the sticky zoom animation plays */}
        <div className="h-[150vh] w-full" />
      </div>

      {/* 2. Content returns to the shared app background */}
      <div
        ref={contentSectionRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        data-education-overlay
        className="theme-section theme-section--seamless relative z-10 flex min-h-screen w-full items-center scroll-mt-16 px-6 pb-16 pt-16 sm:pb-20 sm:pt-20"
      >
        {/* Floating glow orb */}
        <div className="section-glow-orb !absolute -left-20 top-1/3 h-64 w-64 bg-[#DC143C]/10 pointer-events-none blur-3xl rounded-full" />
        <div
          className="pointer-events-none !absolute z-10 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DC143C]/20 opacity-0 blur-[56px] transition-opacity duration-300"
          style={{
            opacity: pointer.active ? 1 : 0,
            left: pointer.x,
            top: pointer.y,
            boxShadow: '0 0 54px rgba(220, 20, 60, 0.24)',
          }}
        />
        <div
          data-education-content
          className="relative z-20 mx-auto w-full max-w-5xl"
        >
          <h2
            className="edu-heading theme-heading"
            style={{ color: '#DC143C' }}
          >
            Education
            <span className="theme-heading__line" />
          </h2>

          <div className="edu-list relative space-y-4 sm:space-y-5">
            {/* Animated timeline line */}
            <div className="gsap-timeline-line" />

            {EDUCATION.map((edu, index) => {
              const EducationIcon = educationIcons[index] ?? FaBookOpen

              return (
                <div
                  key={index}
                  className="edu-item group relative pl-7 sm:pl-10"
                >
                  {/* Animated dot */}
                  <div className="edu-dot absolute -left-[6px] top-6 z-10 h-3 w-3 rounded-full border-2 border-[#ff234d] bg-[#090909] shadow-[0_0_16px_rgba(220,20,60,0.65)]" />

                  <div className="edu-content relative overflow-hidden rounded-xl border border-white/[0.09] bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_18px_48px_rgba(0,0,0,0.2)] transition-[border-color,background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[#DC143C]/35 hover:bg-white/[0.035] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_22px_56px_rgba(0,0,0,0.26),0_0_28px_rgba(220,20,60,0.06)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DC143C]/45 to-transparent opacity-70" />
                    <div className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full bg-[#DC143C]/[0.06] blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative p-4 sm:p-5">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
                        <div className="flex min-w-0 items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#DC143C]/30 bg-[#DC143C]/[0.08] text-sm text-[#DC143C]"
                          >
                            <EducationIcon />
                          </span>
                          <div className="min-w-0">
                            <h3 className="font-display text-base font-semibold uppercase leading-tight tracking-[0.035em] text-slate-100 transition-colors duration-300 group-hover:text-white sm:text-lg">
                              {edu.degree}
                            </h3>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.055em] text-[#DC143C] transition-colors duration-300 group-hover:text-[#ff5776] sm:text-sm">
                              {edu.institution}
                            </p>
                          </div>
                        </div>

                        <span className="edu-duration flex shrink-0 items-center gap-2 pl-10 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-slate-300 md:pl-0 md:pt-1">
                          <FiCalendar
                            aria-hidden="true"
                            className="text-sm text-[#DC143C]"
                          />
                          {edu.duration}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:pl-10">
                        {edu.location && (
                          <p className="flex items-center gap-2 text-slate-400">
                            <FiMapPin
                              aria-hidden="true"
                              className="shrink-0 text-sm text-[#DC143C]"
                            />
                            <span>{edu.location}</span>
                          </p>
                        )}
                        {edu.group && (
                          <p className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-slate-400">
                            Group:{' '}
                            <span className="font-medium text-[#DC143C]">
                              {edu.group}
                            </span>
                          </p>
                        )}
                        {edu.CGPA && (
                          <p className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-slate-400">
                            CGPA:{' '}
                            <span className="font-semibold text-[#DC143C]">
                              {edu.CGPA}
                            </span>
                          </p>
                        )}
                      </div>

                      {edu.achivement && (
                        <p className="mt-3 flex items-start gap-2 border-t border-white/[0.07] pt-3 text-xs italic leading-5 text-slate-400 transition-colors duration-300 group-hover:text-slate-300 sm:ml-10">
                          <FaAward
                            aria-hidden="true"
                            className="mt-0.5 shrink-0 text-sm text-[#DC143C]"
                          />
                          <span>{edu.achivement}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
