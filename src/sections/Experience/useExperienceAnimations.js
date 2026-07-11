import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function getWordInners(el) {
  return Array.from(el.querySelectorAll('.gsap-word-inner'))
}

export default function useExperienceAnimations({
  sectionRef,
  contentRef,
  isNearViewport,
}) {
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

        if (dot) {
          tl.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, ease: 'back.out(2)', duration: 0.4 },
            0
          )
        }

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

        if (duration) {
          tl.fromTo(
            duration,
            { x: 36, y: 12, opacity: 0 },
            { x: 0, y: 0, opacity: 1, ease: 'power2.out', duration: 0.55 },
            0.18
          )
        }
      })

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
  }, [contentRef, isNearViewport, sectionRef])
}
