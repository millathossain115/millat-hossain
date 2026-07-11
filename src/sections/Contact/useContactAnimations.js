import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useContactAnimations({ sectionRef, isNearViewport }) {
  useEffect(() => {
    if (!isNearViewport) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const card = sectionRef.current.querySelector('.contact-profile-card')
      const content = sectionRef.current.querySelector('.contact-form-shell')
      const formItems = sectionRef.current.querySelectorAll('.contact-form-item')

      if (card) {
        gsap.fromTo(
          card,
          { x: -80, opacity: 0, rotateY: -10 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 45%',
              scrub: true,
            },
          },
        )
      }

      if (content) {
        gsap.fromTo(
          content,
          { x: 40 },
          {
            x: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: content,
              start: 'top 85%',
              end: 'top 42%',
              scrub: true,
            },
          },
        )
      }

      if (formItems.length) {
        gsap.fromTo(
          formItems,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current.querySelector('.contact-form-grid'),
              start: 'top 88%',
              end: 'top 52%',
              scrub: true,
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isNearViewport, sectionRef])
}
