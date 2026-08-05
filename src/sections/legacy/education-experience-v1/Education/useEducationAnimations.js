import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createExperienceEntranceAnimation } from '../Experience/experienceTransition'

gsap.registerPlugin(ScrollTrigger)

function splitWords(el) {
  const words = el.innerText.trim().split(/\s+/)
  el.innerHTML = words
    .map(
      (word) =>
        `<span class="gsap-word"><span class="gsap-word-inner">${word}</span></span>`
    )
    .join(' ')
  return Array.from(el.querySelectorAll('.gsap-word-inner'))
}

export default function useEducationAnimations({
  containerRef,
  zoomTextRef,
  redFillRef,
  contentSectionRef,
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

    let removeExperienceOverlay

    const ctx = gsap.context(() => {
      const zoomTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
        },
      })

      zoomTl
        .to(zoomTextRef.current, {
          scale: 150,
          ease: 'power2.in',
          duration: 1,
        })
        .to(
          redFillRef.current,
          {
            opacity: 1,
            duration: 0.15,
          },
          '-=0.15'
        )

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

      const headingEl = contentSectionRef.current.querySelector('.edu-heading')
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches

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

      const lineEl = contentSectionRef.current.querySelector(
        '.gsap-timeline-line'
      )
      const educationList = contentSectionRef.current.querySelector('.edu-list')
      if (lineEl && !isDesktop) {
        gsap.fromTo(
          lineEl,
          { scaleY: 0, autoAlpha: 1 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: educationList,
              start: 'top 88%',
              end: 'bottom 34%',
              scrub: 1.2,
            },
          }
        )
      }

      const items = contentSectionRef.current.querySelectorAll('.edu-item')
      if (!isDesktop) {
        items.forEach((item) => {
          const dot = item.querySelector('.edu-dot')
          const content = item.querySelector('.edu-content')
          const duration = item.querySelector('.edu-duration')

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 92%',
              end: 'top 36%',
              scrub: 1.15,
            },
          })

          if (dot) {
            tl.fromTo(
              dot,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, ease: 'none', duration: 0.28 },
              0.08
            )
          }

          if (content) {
            tl.fromTo(
              content,
              { y: 28, opacity: 0 },
              { y: 0, opacity: 1, ease: 'none', duration: 0.82 },
              0.18
            )
          }

          if (duration) {
            tl.fromTo(
              duration,
              { x: -28, opacity: 0 },
              { x: 0, opacity: 1, ease: 'none', duration: 0.42 },
              0.44
            )
          }
        })
      }

      const addDesktopEducationReveal = ({ timeline }) => {
        if (lineEl) {
          timeline.fromTo(
            lineEl,
            { scaleY: 0, autoAlpha: 1 },
            {
              scaleY: 1,
              duration: 2.55,
              ease: 'none',
            },
            0.12
          )
        }

        items.forEach((item, index) => {
          const dot = item.querySelector('.edu-dot')
          const content = item.querySelector('.edu-content')
          const duration = item.querySelector('.edu-duration')
          const startAt = 0.28 + index * 0.68

          if (dot) {
            timeline.fromTo(
              dot,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.22,
                ease: 'none',
              },
              startAt
            )
          }

          if (content) {
            timeline.fromTo(
              content,
              { y: 36, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.72,
                ease: 'none',
              },
              startAt + 0.14
            )
          }

          if (duration) {
            timeline.fromTo(
              duration,
              { x: -36, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.42,
                ease: 'none',
              },
              startAt + 0.42
            )
          }
        })
      }

      ScrollTrigger.create({
        trigger: contentSectionRef.current,
        start: 'top bottom',
        once: true,
        onEnter: () => {
          removeExperienceOverlay = createExperienceEntranceAnimation({
            educationSection: contentSectionRef.current,
            experienceSection: document.getElementById('experience'),
            addEducationReveal: addDesktopEducationReveal,
          })
          ScrollTrigger.refresh()
        },
      })
    }, containerRef)

    return () => {
      ctx.revert()
      removeExperienceOverlay?.()
    }
  }, [containerRef, zoomTextRef, redFillRef, contentSectionRef, isNearViewport])
}
