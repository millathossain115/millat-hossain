import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EXPERIENCES } from '../constants'

gsap.registerPlugin(ScrollTrigger)

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

export default function Experience() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      /* ── Section heading word-reveal ── */
      const headingEl = sectionRef.current.querySelector('.exp-heading')
      if (headingEl) {
        const words = splitWords(headingEl)
        gsap.fromTo(
          words,
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            stagger: 0.07,
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
      const lineEl = sectionRef.current.querySelector('.gsap-timeline-line')
      if (lineEl) {
        gsap.fromTo(
          lineEl,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current.querySelector('.exp-list'),
              start: 'top 78%',
              end: 'bottom 22%',
              scrub: 1,
            },
          },
        )
      }

      /* ── Each timeline item ── */
      const items = sectionRef.current.querySelectorAll('.exp-item')
      items.forEach((item) => {
        const dot = item.querySelector('.exp-dot')
        const content = item.querySelector('.exp-content')
        const duration = item.querySelector('.exp-duration')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 84%',
            end: 'top 44%',
            scrub: 1,
          },
        })

        /* Dot punches in */
        if (dot) {
          tl.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, ease: 'back.out(2)', duration: 0.4 },
            0,
          )
        }

        /* Content slides from left with blur */
        if (content) {
          tl.fromTo(
            content,
            { x: -48, opacity: 0, filter: 'blur(12px)' },
            { x: 0, opacity: 1, filter: 'blur(0px)', ease: 'power3.out', duration: 0.7 },
            0.05,
          )
        }

        /* Duration slides from right */
        if (duration) {
          tl.fromTo(
            duration,
            { x: 32, opacity: 0 },
            { x: 0, opacity: 1, ease: 'power2.out', duration: 0.5 },
            0.18,
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="theme-section scroll-mt-16 px-6 py-24">
      {/* Floating glow orb */}
      <div className="section-glow-orb absolute -right-20 top-1/3 h-72 w-72 bg-[#DC143C]/10" />

      <div className="mx-auto max-w-4xl">
        <h2 className="exp-heading theme-heading">
          Work Experience
          <span className="theme-heading__line" />
        </h2>

        <div className="exp-list relative space-y-12">
          {/* The animated timeline line */}
          <div className="gsap-timeline-line" />

          {EXPERIENCES.map((exp, index) => (
            <div
              key={index}
              className="exp-item relative border-l border-white/10 pl-8 transition-colors duration-300 hover:border-[#DC143C]/55"
            >
              {/* Animated dot */}
              <div className="exp-dot absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-[#DC143C] bg-[#090909] shadow-[0_0_12px_rgba(220,20,60,0.45)]" />

              <div className="exp-content">
                <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase tracking-[0.04em] text-slate-100">
                      {exp.role}{' '}
                      <span className="text-[#DC143C]">@ {exp.company}</span>
                    </h3>
                  </div>
                  <span className="exp-duration text-sm font-mono uppercase tracking-[0.18em] text-slate-500">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-base leading-relaxed text-slate-300">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
