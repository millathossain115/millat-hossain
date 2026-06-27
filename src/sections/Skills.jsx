import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { techIcons } from '../assets/tech-icons'

gsap.registerPlugin(ScrollTrigger)

const technologies = [
  'JavaScript',
  'C',
  'PHP',
  'HTML',
  'CSS',
  'Tailwind CSS',
  'React.js',
  'Redux',
  'RTK Query',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Express.js',
  'Mongoose (ODM)',
  'Prisma (ORM)',
  'Laravel',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
  'Figma',
  'Lucidchart',
  'Postman',
  'GitHub',
]

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

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      /* ── Heading word-reveal ── */
      const headingEl = sectionRef.current.querySelector('.skills-heading')
      if (headingEl) {
        const words = splitWords(headingEl)
        gsap.fromTo(
          words,
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingEl,
              start: 'top 88%',
              end: 'top 52%',
              scrub: 0.9,
            },
          },
        )
      }

      /* ── Divider line expands ── */
      const divider = sectionRef.current.querySelector('.skills-divider')
      if (divider) {
        gsap.fromTo(
          divider,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: divider,
              start: 'top 88%',
              end: 'top 62%',
              scrub: 0.8,
            },
          },
        )
      }

      /* ── Sub-paragraph fade ── */
      const subPara = sectionRef.current.querySelector('.skills-sub')
      if (subPara) {
        gsap.fromTo(
          subPara,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: subPara,
              start: 'top 90%',
              end: 'top 64%',
              scrub: 0.8,
            },
          },
        )
      }

      /* ── Chip wave stagger — Apple-style from bottom ── */
      const chips = sectionRef.current.querySelectorAll('[data-skill-chip]')
      gsap.fromTo(
        chips,
        {
          y: 52,
          opacity: 0,
          scale: 0.88,
          filter: 'blur(10px)',
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          stagger: {
            amount: 0.55,
            from: 'start',
            ease: 'power1.inOut',
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.skills-chips'),
            start: 'top 90%',
            end: 'top 52%',
            scrub: 0.7,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="theme-section scroll-mt-16 px-6 py-24 md:flex md:min-h-screen md:items-center"
    >
      {/* Background orbs */}
      <div className="section-glow-orb absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 bg-[#DC143C]/8" />

      <div className="mx-auto flex w-full max-w-6xl flex-col justify-center">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="skills-heading font-display mt-5 text-4xl font-semibold uppercase leading-[0.95] tracking-[0.08em] text-white sm:text-5xl md:text-6xl md:tracking-[0.1em]"
            style={{ overflow: 'hidden' }}
          >
            Tech I Build With
          </h2>

          <div
            className="skills-divider mx-auto mt-6 h-px w-40 origin-center bg-gradient-to-r from-transparent via-[#DC143C] to-transparent"
          />

          <p className="skills-sub mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            A practical stack for modern full-stack product development, from
            polished interfaces to reliable backend services.
          </p>
        </div>

        <div className="skills-chips mt-14 flex flex-wrap items-center justify-center gap-4">
          {technologies.map((tech) => {
            const { icon: Icon, className } = techIcons[tech]

            return (
              <div
                key={tech}
                data-skill-chip
                className="group relative overflow-hidden rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#DC143C]/45 hover:bg-[#DC143C]/[0.07] hover:shadow-[0_14px_28px_rgba(220,20,60,0.14)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(220,20,60,0.16),rgba(220,20,60,0.04),transparent_72%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10 flex items-center gap-3">
                  <div>
                    <Icon className={`h-[18px] w-[18px] ${className}`} />
                  </div>
                  <h3 className="font-ui text-xs font-light text-white normal-case sm:text-base">
                    {tech}
                  </h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
