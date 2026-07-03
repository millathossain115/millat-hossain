import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '../constants'
import ProjectCard from '../components/ProjectCard'
import useNearViewport from '../hooks/useNearViewport'

gsap.registerPlugin(ScrollTrigger)

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

export default function Projects() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const isNearViewport = useNearViewport(sectionRef)

  useEffect(() => {
    if (!isNearViewport) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
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
              scrub: true,
            },
          }
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
              scrub: true,
            },
          }
        )
      }

      /* ── Vertical scroll drives the project rail from right to left ── */
      const getTravelDistance = () =>
        Math.max(0, trackRef.current.scrollWidth - window.innerWidth)

      gsap.to(trackRef.current, {
        x: () => -getTravelDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: () => `+=${getTravelDistance()}`,
          scrub: 0.75,
          pin: true,
          pinType: 'transform',
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isNearViewport])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="theme-section scroll-mt-16"
    >
      {/* Parallax glow orb */}
      <div className="proj-orb section-glow-orb right-0 top-24 h-96 w-96 bg-[#DC143C]/12" />
      <div className="section-glow-orb -left-24 bottom-24 h-72 w-72 bg-[#DC143C]/8" />

      <div
        ref={pinRef}
        className="flex min-h-[100svh] w-full flex-col justify-center overflow-hidden py-16 sm:py-20"
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          {/* Sub-label */}
          <p className="proj-label font-ui mb-3 text-xs font-medium uppercase tracking-[0.38em] text-[#DC143C]">
            Selected Work
          </p>

          <h2
            className="proj-heading theme-heading flex-wrap sm:flex-nowrap"
            style={{ overflow: 'hidden' }}
          >
            Some Things I've Built
            <span className="theme-heading__line hidden sm:block" />
          </h2>
        </div>

        <div className="w-full overflow-x-hidden motion-reduce:overflow-x-auto">
          <div
            ref={trackRef}
            className="proj-track flex w-max gap-5 pr-6 will-change-transform sm:gap-6"
            style={{
              paddingLeft: 'max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))',
            }}
          >
            {PROJECTS.map((project) => (
              <div
                key={project.title}
                className="w-[84vw] max-w-[24.5rem] shrink-0"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
