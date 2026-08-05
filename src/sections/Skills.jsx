import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { techIcons } from '../assets/tech-icons'

gsap.registerPlugin(ScrollTrigger)

const getViewportProgress = (element, startRatio, endRatio) => {
  if (!element) return 0

  const start = window.innerHeight * startRatio
  const end = window.innerHeight * endRatio

  return gsap.utils.clamp(0, 1, (start - element.getBoundingClientRect().top) / (start - end))
}

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

    let syncSkills = () => {}

    const ctx = gsap.context(() => {
      /* ── Heading word-reveal ── */
      const headingEl = sectionRef.current.querySelector('.skills-heading')
      const words = headingEl ? splitWords(headingEl) : []
      const divider = sectionRef.current.querySelector('.skills-divider')
      const subPara = sectionRef.current.querySelector('.skills-sub')
      const chipsContainer = sectionRef.current.querySelector('.skills-chips')
      const chips = gsap.utils.toArray('[data-skill-chip]', sectionRef.current)

      gsap.set(words, { y: '110%', opacity: 0 })
      gsap.set(divider, { scaleX: 0, opacity: 0 })
      gsap.set(subPara, { opacity: 0, y: 24 })
      gsap.set(chips, { y: 52, opacity: 0, scale: 0.88 })

      syncSkills = () => {
        const headingProgress = getViewportProgress(headingEl, 0.88, 0.52)
        const dividerProgress = getViewportProgress(divider, 0.88, 0.62)
        const subProgress = getViewportProgress(subPara, 0.9, 0.64)
        const chipBaseProgress = getViewportProgress(chipsContainer, 0.9, 0.52)

        gsap.set(words, {
          y: `${(1 - headingProgress) * 110}%`,
          opacity: headingProgress,
        })
        gsap.set(divider, {
          scaleX: dividerProgress,
          opacity: dividerProgress,
        })
        gsap.set(subPara, {
          y: 24 * (1 - subProgress),
          opacity: subProgress,
        })
        chips.forEach((chip, index) => {
          const delay = chips.length <= 1 ? 0 : (index / (chips.length - 1)) * 0.45
          const progress = gsap.utils.clamp(0, 1, (chipBaseProgress - delay) / 0.55)

          gsap.set(chip, {
            y: 52 * (1 - progress),
            opacity: progress,
            scale: 0.88 + 0.12 * progress,
          })
        })
      }

      window.addEventListener('scroll', syncSkills, { passive: true })
      window.addEventListener('resize', syncSkills)
      ScrollTrigger.addEventListener('refresh', syncSkills)
      requestAnimationFrame(syncSkills)
    }, sectionRef)

    return () => {
      window.removeEventListener('scroll', syncSkills)
      window.removeEventListener('resize', syncSkills)
      ScrollTrigger.removeEventListener('refresh', syncSkills)
      ctx.revert()
    }
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
                className="group relative overflow-hidden rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#DC143C]/45 hover:bg-[#DC143C]/[0.07] hover:shadow-[0_14px_28px_rgba(220,20,60,0.14)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(220,20,60,0.16),rgba(220,20,60,0.04),transparent_72%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10 flex items-center gap-3">
                  <div>
                    <Icon
                      aria-hidden="true"
                      focusable="false"
                      className={`h-[18px] w-[18px] ${className}`}
                    />
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
