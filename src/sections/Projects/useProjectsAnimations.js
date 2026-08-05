import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

export function getProjectsTravelDistance(track) {
  return Math.max(0, track.scrollWidth - window.innerWidth)
}

export default function useProjectsAnimations({
  sectionRef,
  trackRef,
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      gsap.set(trackRef.current, { clearProps: 'transform' })
      return undefined
    }

    let syncRail = () => {}

    const ctx = gsap.context(() => {
      gsap.set(trackRef.current, { x: 0 })

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

      syncRail = () => {
        const section = sectionRef.current
        const track = trackRef.current
        const travelDistance = getProjectsTravelDistance(track)

        if (!section || !track || travelDistance <= 0) {
          gsap.set(track, { x: 0 })
          return
        }

        const progress = gsap.utils.clamp(
          0,
          1,
          (window.scrollY - section.offsetTop) / travelDistance
        )

        gsap.set(track, { x: -travelDistance * progress })
      }

      window.addEventListener('scroll', syncRail, { passive: true })
      window.addEventListener('resize', syncRail)
      ScrollTrigger.addEventListener('refresh', syncRail)

      requestAnimationFrame(() => {
        syncRail()
        ScrollTrigger.refresh()
      })
    }, sectionRef)

    return () => {
      window.removeEventListener('scroll', syncRail)
      window.removeEventListener('resize', syncRail)
      ScrollTrigger.removeEventListener('refresh', syncRail)
      ctx.revert()
    }
  }, [sectionRef, trackRef])
}
