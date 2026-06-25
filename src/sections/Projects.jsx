import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '../constants'
import ProjectCard from '../components/ProjectCard'

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

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      /* ── Section heading: word-by-word reveal scrubbed to scroll ── */
      const headingEl = sectionRef.current.querySelector('.proj-heading')
      if (headingEl) {
        const words = splitWords(headingEl)
        gsap.fromTo(
          words,
          { y: '115%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            stagger: 0.065,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingEl,
              start: 'top 88%',
              end: 'top 50%',
              scrub: 0.9,
            },
          },
        )
      }

      /* ── Sub-label fade in ── */
      const labelEl = sectionRef.current.querySelector('.proj-label')
      if (labelEl) {
        gsap.fromTo(
          labelEl,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: labelEl,
              start: 'top 90%',
              end: 'top 65%',
              scrub: 0.8,
            },
          },
        )
      }

      /* ── Project cards: depth perspective stagger ── */
      const cards = sectionRef.current.querySelectorAll('[data-project-card]')

      gsap.fromTo(
        cards,
        {
          y: 72,
          opacity: 0,
          scale: 0.93,
          rotateX: 6,
          filter: 'blur(14px)',
          transformOrigin: 'center bottom',
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          stagger: {
            amount: 0.65,
            from: 'start',
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.proj-grid'),
            start: 'top 82%',
            end: 'top 22%',
            scrub: 1.1,
          },
        },
      )

      /* ── Subtle floating glow orb parallax ── */
      const orb = sectionRef.current.querySelector('.proj-orb')
      if (orb) {
        gsap.to(orb, {
          yPercent: -28,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="theme-section scroll-mt-16 px-6 py-24"
      style={{ perspective: '1200px' }}
    >
      {/* Parallax glow orb */}
      <div className="proj-orb section-glow-orb right-0 top-24 h-96 w-96 bg-[#DC143C]/12" />
      <div className="section-glow-orb -left-24 bottom-24 h-72 w-72 bg-[#DC143C]/8" />

      <div className="mx-auto max-w-6xl">
        {/* Sub-label */}
        <p className="proj-label font-ui mb-3 text-xs font-medium uppercase tracking-[0.38em] text-[#DC143C]">
          Selected Work
        </p>

        <h2 className="proj-heading theme-heading" style={{ overflow: 'hidden' }}>
          Some Things I've Built
          <span className="theme-heading__line" />
        </h2>

        <div className="proj-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
