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

      gsap.to(trackRef.current, {
        x: () => -getProjectsTravelDistance(trackRef.current),
        ease: 'none',
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: () => `+=${getProjectsTravelDistance(trackRef.current)}`,
          scrub: 0.75,
          pin: true,
          pinSpacing: false,
          pinType: 'transform',
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isNearViewport, pinRef, sectionRef, trackRef])
}
