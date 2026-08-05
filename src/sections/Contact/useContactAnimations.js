import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const getViewportProgress = (element, startRatio, endRatio) => {
  if (!element) return 0

  const start = window.innerHeight * startRatio
  const end = window.innerHeight * endRatio

  return gsap.utils.clamp(
    0,
    1,
    (start - element.getBoundingClientRect().top) / (start - end),
  )
}

export default function useContactAnimations({ sectionRef }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    let syncContact = () => {}

    const ctx = gsap.context(() => {
      const card = sectionRef.current.querySelector('.contact-profile-card')
      const content = sectionRef.current.querySelector('.contact-form-shell')
      const formItems = sectionRef.current.querySelectorAll('.contact-form-item')

      gsap.set(card, { x: -80, opacity: 0, rotateY: -10 })
      gsap.set(content, { x: 40 })
      gsap.set(formItems, { y: 28, opacity: 0 })

      syncContact = () => {
        const cardProgress = getViewportProgress(card, 0.85, 0.45)
        const contentProgress = getViewportProgress(content, 0.85, 0.42)
        const itemsProgress = getViewportProgress(
          sectionRef.current.querySelector('.contact-form-grid'),
          0.88,
          0.52,
        )

        gsap.set(card, {
          x: -80 * (1 - cardProgress),
          opacity: cardProgress,
          rotateY: -10 * (1 - cardProgress),
        })
        gsap.set(content, {
          x: 40 * (1 - contentProgress),
        })
        formItems.forEach((item, index) => {
          const delay =
            formItems.length <= 1 ? 0 : (index / (formItems.length - 1)) * 0.35
          const progress = gsap.utils.clamp(
            0,
            1,
            (itemsProgress - delay) / 0.65,
          )

          gsap.set(item, {
            y: 28 * (1 - progress),
            opacity: progress,
          })
        })
      }

      window.addEventListener('scroll', syncContact, { passive: true })
      window.addEventListener('resize', syncContact)
      ScrollTrigger.addEventListener('refresh', syncContact)
      requestAnimationFrame(syncContact)
    }, sectionRef)

    return () => {
      window.removeEventListener('scroll', syncContact)
      window.removeEventListener('resize', syncContact)
      ScrollTrigger.removeEventListener('refresh', syncContact)
      ctx.revert()
    }
  }, [sectionRef])
}
