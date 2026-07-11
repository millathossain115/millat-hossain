import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { EXPERIENCES } from '../constants'
import useNearViewport from '../hooks/useNearViewport'

gsap.registerPlugin(ScrollTrigger)
const defaultPointer = { x: 0, y: 0, active: false }

/** Gets React-owned word spans for stagger reveal */
function getWordInners(el) {
  return Array.from(el.querySelectorAll('.gsap-word-inner'))
}

export default function Experience() {
  const [pointer, setPointer] = useState(defaultPointer)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
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
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches
      const hasEducationHandoff = Boolean(
        document.querySelector('[data-experience-overlay]')
      )

      if (isDesktop && hasEducationHandoff) {
        gsap.set(sectionRef.current.querySelector('.exp-heading'), {
          autoAlpha: 1,
          x: 0,
          y: 0,
          filter: 'blur(0px)',
        })
        gsap.set(sectionRef.current.querySelectorAll('.gsap-word-inner'), {
          x: 0,
          y: 0,
          opacity: 1,
        })
        gsap.set(contentRef.current, { autoAlpha: 1, y: 0 })
        gsap.set(sectionRef.current.querySelectorAll('.exp-dot'), {
          scale: 1,
          opacity: 1,
        })
        gsap.set(sectionRef.current.querySelectorAll('.exp-content'), {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
        })
        gsap.set(sectionRef.current.querySelectorAll('.exp-duration'), {
          x: 0,
          opacity: 1,
        })
        return
      }

      /* ── Section heading word-reveal ── */
      const headingEl = sectionRef.current.querySelector('.exp-heading')
      if (headingEl) {
        const words = getWordInners(headingEl)
        gsap.fromTo(
          headingEl,
          { autoAlpha: 0, x: -34, y: 38, filter: 'blur(14px)' },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            filter: 'blur(0px)',
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingEl,
              start: 'top 90%',
              end: 'top 58%',
              scrub: 0.9,
            },
          }
        )
        gsap.fromTo(
          words,
          { x: -18, y: '115%', opacity: 0 },
          {
            x: 0,
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
          }
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
          }
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
            0
          )
        }

        /* Content slides from left with blur */
        if (content) {
          tl.fromTo(
            content,
            { x: -44, y: 38, opacity: 0, filter: 'blur(12px)' },
            {
              x: 0,
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              ease: 'power3.out',
              duration: 0.85,
            },
            0.05
          )
        }

        /* Duration slides from right */
        if (duration) {
          tl.fromTo(
            duration,
            { x: 36, y: 12, opacity: 0 },
            { x: 0, y: 0, opacity: 1, ease: 'power2.out', duration: 0.55 },
            0.18
          )
        }
      })

      /* Reveal only after the black Experience screen has taken over */
      if (contentRef.current) {
        if (isDesktop) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: () => `+=${window.innerHeight * 0.65}`,
                scrub: true,
                pin: sectionRef.current,
                pinSpacing: true,
                pinType: 'transform',
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(
              contentRef.current,
              { autoAlpha: 0, y: 56 },
              { autoAlpha: 1, y: 0, duration: 1, ease: 'none' }
            )
        } else {
          gsap.fromTo(
            contentRef.current,
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 86%',
                end: 'top 34%',
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          )
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isNearViewport])

  const handlePointerMove = (event) => {
    setPointer({ x: event.clientX, y: event.clientY, active: true })
  }

  const handlePointerLeave = () => {
    setPointer(defaultPointer)
  }

  return (
    <section
      ref={sectionRef}
      id="experience"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-experience-screen
      className="theme-section theme-section--plain relative z-40 bg-[#020202] scroll-mt-16 px-6 py-24 md:min-h-screen md:flex md:items-center"
    >
      {/* Floating glow orb */}
      <div className="section-glow-orb !absolute -right-20 top-1/3 h-72 w-72 bg-[#DC143C]/10" />
      <div
        className="pointer-events-none !fixed left-0 top-0 z-30 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DC143C]/20 opacity-0 blur-[56px] transition-opacity duration-300"
        style={{
          opacity: pointer.active ? 1 : 0,
          transform: `translate(${pointer.x}px, ${pointer.y}px) translate(-50%, -50%)`,
          boxShadow: '0 0 54px rgba(220, 20, 60, 0.24)',
        }}
      />

      <div
        ref={contentRef}
        data-experience-content
        className="mx-auto grid w-full gap-16 lg:grid-cols-[1fr_3fr] lg:items-center lg:justify-start lg:gap-16 xl:gap-20"
      >
        <div className="min-w-0 lg:sticky lg:top-24">
          <h2 className="exp-heading exp-heading-title">
            <span className="gsap-word">
              <span className="gsap-word-inner">
                <span className="exp-heading-title__hover">Work</span>
              </span>
            </span>
            <span className="gsap-word">
              <span className="gsap-word-inner">
                <span className="exp-heading-title__hover">Experience</span>
              </span>
            </span>
          </h2>
        </div>

        <div className="exp-list relative mx-auto w-full space-y-16 lg:mx-0 lg:pl-32">
          {EXPERIENCES.map((exp, index) => (
            <div key={index} className="exp-item exp-work-item group relative">
              <div className="exp-content">
                <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-[0.08em] text-slate-100 transition-colors duration-300 group-hover:text-white md:text-3xl">
                    {exp.role}
                  </h3>
                  <span className="exp-duration shrink-0 text-sm font-mono uppercase tracking-[0.18em] text-slate-400 transition-colors duration-300 group-hover:text-slate-200">
                    {exp.duration}
                  </span>
                </div>
                <hr className="mt-5 border-0 border-t border-white/10 transition-colors duration-300 group-hover:border-white/16" />

                <p className="py-5 text-sm font-mono uppercase tracking-[0.18em] text-[#ff5a7a] transition-colors duration-300 group-hover:text-[#ff7892] md:text-base">
                  {exp.company}
                </p>
                <hr className="border-0 border-t border-white/10 transition-colors duration-300 group-hover:border-white/16" />

                <div>
                  {exp.contributions?.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <div className="group/point flex items-start gap-5 py-5 text-left text-sm leading-7 text-slate-300 transition-[color,transform] duration-300 hover:translate-x-2 hover:text-white md:text-base">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#DC143C] transition-[background-color,box-shadow,transform] duration-300 group-hover/point:scale-125 group-hover/point:bg-[#ff4d73] group-hover/point:shadow-[0_0_16px_rgba(220,20,60,0.55)]" />
                        <p className="">{item}</p>
                      </div>
                      <hr className="border-0 border-t border-white/10 transition-colors duration-300 group-hover:border-white/16" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
