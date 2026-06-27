import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { EDUCATION } from '../constants'

gsap.registerPlugin(ScrollTrigger)
const defaultPointer = { x: 0, y: 0, active: false }

/** Splits element text into per-word <span> pairs for stagger reveal */
function splitWords(el) {
  const words = el.innerText.trim().split(/\s+/)
  el.innerHTML = words
    .map(
      (w) =>
        `<span class="gsap-word"><span class="gsap-word-inner">${w}</span></span>`,
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

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
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
      zoomTl.to(zoomTextRef.current, {
        scale: 150,
        ease: 'power2.in',
        duration: 1,
      })
      // Ensure the entire screen is perfectly red at the end of the scale
      .to(redFillRef.current, {
        opacity: 1,
        duration: 0.15,
      }, '-=0.15')

      // 2. Thematic Content Section Fade In
      // Fades in slightly before it reaches the top, sliding over the red background smoothly
      gsap.fromTo(contentSectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: contentSectionRef.current,
            start: 'top 75%',
            end: 'top 15%',
            scrub: 1,
          }
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
          },
        )
      }

      /* ── Timeline line draw ── */
      const lineEl = contentSectionRef.current.querySelector('.gsap-timeline-line')
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
              end: 'bottom 22%',
              scrub: 1,
            },
          },
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
            end: 'top 60%',
            scrub: 1,
          },
        })

        /* Dot punches in */
        if (dot) tl.fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, ease: 'back.out(2.2)', duration: 0.4 }, 0)
        /* Content slides from RIGHT */
        if (content) tl.fromTo(content, { x: 48, opacity: 0 }, { x: 0, opacity: 1, ease: 'power3.out', duration: 0.7 }, 0.05)
        /* Duration slides from left */
        if (duration) tl.fromTo(duration, { x: -28, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out', duration: 0.5 }, 0.18)
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

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
          <h1
            ref={zoomTextRef}
            className="text-[#DC143C] font-display text-[15vw] sm:text-[12vw] font-bold tracking-[0.1em] text-center uppercase whitespace-nowrap"
          >
            EDUCATION
          </h1>
          {/* Safety solid red fill to ensure the screen is fully enveloped at the end of the scale */}
          <div ref={redFillRef} className="absolute inset-0 bg-[#DC143C] opacity-0 pointer-events-none" />
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
        className="theme-section theme-section--seamless relative z-10 min-h-screen w-full scroll-mt-16 px-6 py-24"
      >
        {/* Floating glow orb */}
        <div className="section-glow-orb absolute -left-20 top-1/3 h-64 w-64 bg-[#DC143C]/10 pointer-events-none blur-3xl rounded-full" />
        <div
          className="pointer-events-none absolute z-10 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DC143C]/20 opacity-0 blur-[56px] transition-opacity duration-300"
          style={{
            opacity: pointer.active ? 1 : 0,
            left: pointer.x,
            top: pointer.y,
            boxShadow: '0 0 54px rgba(220, 20, 60, 0.24)',
          }}
        />

        <div className="mx-auto max-w-4xl relative z-20">
          <h2 className="edu-heading theme-heading">
            Education
            <span className="theme-heading__line" />
          </h2>

          <div className="edu-list relative space-y-12">
            {/* Animated timeline line */}
            <div className="gsap-timeline-line" />

            {EDUCATION.map((edu, index) => (
              <div
                key={index}
                className="edu-item group relative border-l border-white/10 pl-8 transition-colors duration-300 hover:border-[#DC143C]/55"
              >
                {/* Animated dot */}
                <div className="edu-dot absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-[#DC143C] bg-[#090909] shadow-[0_0_12px_rgba(220,20,60,0.45)]" />

                <div className="edu-content">
                  <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold uppercase tracking-[0.04em] text-slate-100 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
                        {edu.degree}
                      </h3>
                      <p className="font-medium text-[#DC143C] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#ff4d73]">
                        {edu.institution}
                      </p>
                      {edu.location && (
                        <p className="mt-0.5 text-sm text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-slate-300">
                          {edu.location}
                        </p>
                      )}
                    </div>
                    <span className="edu-duration mt-2 shrink-0 text-sm font-mono uppercase tracking-[0.18em] text-slate-500 transition-colors duration-300 group-hover:text-slate-300 md:mt-0">
                      {edu.duration}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1.5 text-[0.95rem] leading-relaxed text-slate-300">
                    {edu.group && (
                      <p className="transition-colors duration-300 group-hover:text-slate-100">
                        <span className="mr-2 font-medium text-slate-500 transition-colors duration-300 group-hover:text-[#DC143C]">Group:</span> 
                        {edu.group}
                      </p>
                    )}
                    {edu.CGPA && (
                      <p className="transition-colors duration-300 group-hover:text-slate-100">
                        <span className="mr-2 font-medium text-slate-500 transition-colors duration-300 group-hover:text-[#DC143C]">CGPA:</span> 
                        <span className="font-semibold text-slate-200 transition-colors duration-300 group-hover:text-white">{edu.CGPA}</span>
                      </p>
                    )}
                    {edu.achivement && (
                      <p className="mt-1 leading-snug text-slate-400 italic transition-colors duration-300 group-hover:text-slate-200">
                        {edu.achivement}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
