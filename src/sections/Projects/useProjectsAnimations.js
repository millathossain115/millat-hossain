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
  pinRef,
  trackRef,
}) {
  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const track = trackRef.current

    if (!section || !pin || !track) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      gsap.set(track, { clearProps: 'transform' })
      return undefined
    }

    let refreshFrameId = null

    const desktopMedia = gsap.matchMedia()
    const ctx = gsap.context(() => {

      const headingEl = section.querySelector('.proj-heading')
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

      const labelEl = section.querySelector('.proj-label')
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

      desktopMedia.add('(min-width: 640px)', () => {
        gsap.set(track, { x: 0 })

        gsap.to(track, {
          x: () => -getProjectsTravelDistance(track),
          ease: 'none',
          scrollTrigger: {
            id: 'projects-horizontal',
            trigger: section,
            start: 'top top',
            end: () => `+=${getProjectsTravelDistance(track)}`,
            pin,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: -2,
          },
        })
      })

      refreshFrameId = window.requestAnimationFrame(() => {
        refreshFrameId = null
        ScrollTrigger.refresh()
      })
    }, sectionRef)

    return () => {
      if (refreshFrameId !== null) {
        window.cancelAnimationFrame(refreshFrameId)
      }

      desktopMedia.revert()
      ctx.revert()
    }
  }, [pinRef, sectionRef, trackRef])
}
