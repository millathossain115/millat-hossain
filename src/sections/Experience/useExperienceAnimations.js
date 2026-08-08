import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useNearViewport from '../../hooks/useNearViewport'

gsap.registerPlugin(ScrollTrigger)

const OUTRO_DISTANCE_RATIO = 0.3

export default function useExperienceAnimations({
  sectionRef,
  headingRef,
  listRef,
  cardRefs,
}) {
  const isNearViewport = useNearViewport(sectionRef, '400px 0px')

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const getCards = () =>
      cardRefs.current.length
        ? cardRefs.current.filter(Boolean)
        : gsap.utils.toArray('.exp-work-item', sectionRef.current)

    const ctx = gsap.context(() => {
      const shell = section.querySelector('.exp-shell')
      const getShellIntroY = () =>
        window.matchMedia('(max-width: 767px)').matches ? -220 : -360
      const cards = getCards()
      const rows = gsap.utils.toArray(
        '.exp-card-row, .exp-card-rule',
        sectionRef.current
      )
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches

      if (prefersReducedMotion || isDesktop) {
        gsap.set(shell, {
          autoAlpha: 1,
          y: 0,
          clearProps: 'transform',
        })
        gsap.set(headingRef.current, {
          autoAlpha: 1,
          y: 0,
          clearProps: 'transform',
        })
        gsap.set(listRef.current, {
          autoAlpha: 1,
          '--exp-line-scale': 1,
          '--exp-line-opacity': 1,
        })
        gsap.set([...cards, ...rows], {
          autoAlpha: 1,
          y: 0,
          clearProps: 'transform',
        })

        return
      }

      gsap.set(shell, { autoAlpha: 1, y: 0 })
      gsap.set(headingRef.current, {
        autoAlpha: 0,
        scale: 0.72,
        y: getShellIntroY() * 0.18,
        transformOrigin: 'center center',
      })
      gsap.set(listRef.current, {
        autoAlpha: 1,
        '--exp-line-scale': 0,
        '--exp-line-opacity': 1,
      })
      gsap.set(cards, { autoAlpha: 0, x: 72, y: 0 })
      gsap.set(rows, { autoAlpha: 0, x: 24, y: 0 })
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [cardRefs, headingRef, listRef, sectionRef])

  useEffect(() => {
    if (!isNearViewport) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches

    if (prefersReducedMotion || isDesktop) {
      return undefined
    }

    const getCards = () =>
      cardRefs.current.length
        ? cardRefs.current.filter(Boolean)
        : gsap.utils.toArray('.exp-work-item', sectionRef.current)

    const ctx = gsap.context(() => {
      const cards = getCards()
      const rows = cards.flatMap((card) =>
        gsap.utils.toArray('.exp-card-row, .exp-card-rule', card)
      )
      const getShellIntroY = () =>
        window.matchMedia('(max-width: 767px)').matches ? -220 : -360
      const getProgress = () => {
        const sectionTop = sectionRef.current.getBoundingClientRect().top
        const start = window.innerHeight * 0.86
        const end = window.innerHeight * 0.38

        return gsap.utils.clamp(0, 1, (start - sectionTop) / (start - end))
      }
      const syncMobileEntry = () => {
        const section = sectionRef.current
        const outroStart = section.offsetTop + window.innerHeight * 0.06

        if (window.scrollY >= outroStart) {
          return
        }

        const progress = getProgress()
        const headingProgress = gsap.utils.clamp(0, 1, progress / 0.55)
        const lineProgress = gsap.utils.clamp(0, 1, (progress - 0.1) / 0.7)
        const cardProgress = gsap.utils.clamp(0, 1, (progress - 0.2) / 0.8)
        const rowProgress = gsap.utils.clamp(0, 1, (progress - 0.35) / 0.65)

        gsap.set(headingRef.current, {
          autoAlpha: headingProgress,
          scale: 0.72 + 0.28 * headingProgress,
          y: getShellIntroY() * 0.18 * (1 - headingProgress),
        })
        gsap.set(listRef.current, {
          '--exp-line-scale': lineProgress,
        })
        gsap.set(cards, {
          autoAlpha: cardProgress,
          x: 72 * (1 - cardProgress),
        })
        gsap.set(rows, {
          autoAlpha: rowProgress,
          x: 24 * (1 - rowProgress),
        })
      }

      syncMobileEntry()
      window.addEventListener('scroll', syncMobileEntry, { passive: true })
      window.addEventListener('resize', syncMobileEntry)
      ScrollTrigger.addEventListener('refresh', syncMobileEntry)

      return () => {
        window.removeEventListener('scroll', syncMobileEntry)
        window.removeEventListener('resize', syncMobileEntry)
        ScrollTrigger.removeEventListener('refresh', syncMobileEntry)
      }
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [cardRefs, headingRef, isNearViewport, listRef, sectionRef])

  useEffect(() => {
    if (!isNearViewport) {
      return undefined
    }

    const section = sectionRef.current
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion || !section) {
      return undefined
    }

    const getCards = () =>
      cardRefs.current.length
        ? cardRefs.current.filter(Boolean)
        : gsap.utils.toArray('.exp-work-item', sectionRef.current)

    const ctx = gsap.context(() => {
      const shell = section.querySelector('.exp-shell')
      const projects = document.getElementById('projects')

      if (!shell || !projects) {
        return undefined
      }

      let resizeFrame = 0

      const canPinOutro = () => shell.scrollHeight <= window.innerHeight + 1

      const syncOutroLayoutMode = () => {
        section.classList.toggle('exp-section--natural-outro', !canPinOutro())
      }

      const clearShellPin = () => {
        gsap.set(shell, {
          clearProps: 'position,top,bottom,left,right,width,zIndex',
        })
      }

      const pinShellToViewport = () => {
        const sectionRect = section.getBoundingClientRect()
        const styles = window.getComputedStyle(section)
        const paddingLeft = Number.parseFloat(styles.paddingLeft) || 0
        const paddingRight = Number.parseFloat(styles.paddingRight) || 0

        gsap.set(shell, {
          position: 'fixed',
          top: 0,
          bottom: 'auto',
          left: sectionRect.left + paddingLeft,
          right: 'auto',
          width: Math.max(sectionRect.width - paddingLeft - paddingRight, 0),
          zIndex: 1,
        })
      }

      const dockShellAfterOutro = () => {
        gsap.set(shell, {
          position: 'absolute',
          top: 'auto',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 1,
        })
      }

      const syncOutro = () => {
        const cards = getCards()
        syncOutroLayoutMode()

        if (!canPinOutro()) {
          clearShellPin()
          gsap.set(headingRef.current, { autoAlpha: 1, y: 0 })
          gsap.set(cards, { autoAlpha: 1, y: 0 })
          gsap.set(listRef.current, {
            '--exp-line-scale': 1,
            '--exp-overlay-line-scale': 1,
          })
          return
        }

        const projectsTop = projects.getBoundingClientRect().top
        const sectionTop = section.getBoundingClientRect().top
        const start = window.innerHeight * (1 + OUTRO_DISTANCE_RATIO)
        const end = window.innerHeight
        const progress = gsap.utils.clamp(
          0,
          1,
          (start - projectsTop) / Math.max(start - end, 1)
        )
        const shouldPin = sectionTop <= 0 && projectsTop >= end

        if (shouldPin) {
          pinShellToViewport()
        } else if (projectsTop < end) {
          dockShellAfterOutro()
        } else {
          clearShellPin()
        }

        gsap.set(headingRef.current, {
          autoAlpha: 1 - progress,
          y: 0,
        })
        gsap.set(cards, {
          autoAlpha: 1 - progress,
          y: 0,
        })
        gsap.set(listRef.current, {
          '--exp-line-scale': 1 - progress,
          '--exp-overlay-line-scale': 1 - progress,
        })
      }

      const syncOutroMode = () => {
        const wasNatural = section.classList.contains(
          'exp-section--natural-outro'
        )

        syncOutroLayoutMode()

        const isNatural = section.classList.contains(
          'exp-section--natural-outro'
        )

        if (isNatural === wasNatural) {
          return
        }

        syncOutro()
        ScrollTrigger.refresh()
      }

      const scheduleOutroModeSync = () => {
        window.cancelAnimationFrame(resizeFrame)
        resizeFrame = window.requestAnimationFrame(syncOutroMode)
      }

      syncOutro()
      gsap.ticker.add(syncOutro)
      window.addEventListener('scroll', syncOutro, { passive: true })
      window.addEventListener('resize', scheduleOutroModeSync)
      ScrollTrigger.addEventListener('refresh', syncOutro)

      return () => {
        window.cancelAnimationFrame(resizeFrame)
        gsap.ticker.remove(syncOutro)
        window.removeEventListener('scroll', syncOutro)
        window.removeEventListener('resize', scheduleOutroModeSync)
        ScrollTrigger.removeEventListener('refresh', syncOutro)
        clearShellPin()
        section.classList.remove('exp-section--natural-outro')
      }
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [cardRefs, headingRef, isNearViewport, listRef, sectionRef])
}
