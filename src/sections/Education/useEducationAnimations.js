import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useNearViewport from '../../hooks/useNearViewport'
import { addExperienceIntroToTimeline } from '../Experience/experienceTransition'

gsap.registerPlugin(ScrollTrigger)

export default function useEducationAnimations({
  sectionRef,
  cinemaViewportRef,
  zoomTextRef,
  redCurtainRef,
  recordScreenRef,
  recordHeadingRef,
  cardListRef,
}) {
  const isNearViewport = useNearViewport(sectionRef)

  useEffect(() => {
    if (!isNearViewport) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      const cardPanels = sectionRef.current.querySelectorAll('.edu-card-panel')

      gsap.set([zoomTextRef.current, redCurtainRef.current], {
        autoAlpha: 0,
      })
      gsap.set(
        [
          recordScreenRef.current,
          recordHeadingRef.current,
          cardListRef.current,
        ],
        {
          autoAlpha: 1,
          y: 0,
          '--edu-line-scale': 1,
          '--edu-line-opacity': 1,
          clearProps: 'transform',
        }
      )
      gsap.set(cardPanels, {
        opacity: 1,
        y: 0,
        clearProps: 'transform',
      })
      return undefined
    }

    let removeExperienceIntro

    const ctx = gsap.context(() => {
      const cardPanels = gsap.utils.toArray(
        '.edu-card-panel',
        sectionRef.current
      )
      const zoomTitle =
        zoomTextRef.current.querySelector('.edu-zoom-title') ??
        zoomTextRef.current

      const getZoomScale = () => {
        const bounds = zoomTitle.getBoundingClientRect()
        const textWidth = Math.max(bounds.width, 1)
        const textHeight = Math.max(bounds.height, 1)
        const baseScale =
          Math.max(
            window.innerWidth / textWidth,
            window.innerHeight / textHeight
          ) * 72
        const isMobile = window.matchMedia('(max-width: 767px)').matches

        return gsap.utils.clamp(
          isMobile ? 60 : 120,
          isMobile ? 100 : 170,
          baseScale
        )
      }
      const getExperienceIntroScrollUnits = () =>
        window.matchMedia('(min-width: 1024px)').matches ? 1.55 : 0

      gsap.set(recordScreenRef.current, { autoAlpha: 1 })
      gsap.set(zoomTextRef.current, {
        autoAlpha: 1,
        scale: 1,
        yPercent: 0,
        transformOrigin: 'center center',
      })
      gsap.set(redCurtainRef.current, { autoAlpha: 0, yPercent: 0 })
      gsap.set(recordHeadingRef.current, { autoAlpha: 0, y: 0 })
      gsap.set(cardListRef.current, {
        autoAlpha: 0,
        '--edu-line-scale': 1,
        '--edu-line-opacity': 1,
      })
      gsap.set(cardPanels, { autoAlpha: 0, y: 42 })

      const cinemaTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: cinemaViewportRef.current,
          pinSpacing: true,
          pinReparent: true,
          anticipatePin: 1,
          start: 'top top',
          end: () =>
            `+=${window.innerHeight * (3.55 + Math.max(cardPanels.length, 1) * 0.8 + getExperienceIntroScrollUnits())}`,
          scrub: 1,
          invalidateOnRefresh: true,
          refreshPriority: -1,
        },
      })

      cinemaTl
        .to(zoomTextRef.current, {
          scale: getZoomScale,
          ease: 'power2.in',
          duration: 1.05,
        })
        .to(
          redCurtainRef.current,
          {
            autoAlpha: 1,
            duration: 0.12,
            ease: 'none',
          },
          '-=0.1'
        )
        .to(redCurtainRef.current, {
          autoAlpha: 1,
          duration: 0.24,
          ease: 'none',
        })
        .set(zoomTextRef.current, {
          autoAlpha: 0,
        })
        .to(redCurtainRef.current, {
          yPercent: -100,
          duration: 0.72,
          ease: 'none',
        })
        .to(
          [recordHeadingRef.current, cardListRef.current],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
            ease: 'none',
          },
          '>-0.08'
        )
        .to(recordHeadingRef.current, {
          autoAlpha: 1,
          duration: 0.12,
          ease: 'none',
        })

      cardPanels.forEach((cardPanel) => {
        cinemaTl
          .to(cardPanel, {
            autoAlpha: 1,
            y: 0,
            duration: 0.34,
            ease: 'none',
          })
          .to(cardPanel, {
            autoAlpha: 1,
            duration: 0.18,
            ease: 'none',
          })
          .to(cardPanel, {
            autoAlpha: 0,
            y: -28,
            duration: 0.28,
            ease: 'none',
          })
      })

      cinemaTl
        .to(recordHeadingRef.current, {
          autoAlpha: 1,
          duration: 0.6,
          ease: 'none',
        })
        .to(
          recordHeadingRef.current,
          {
            autoAlpha: 0,
            y: 0,
            duration: 0.18,
            ease: 'none',
          },
          'eduOutro'
        )
        .to(
          cardListRef.current,
          {
            '--edu-line-scale': 0,
            duration: 0.2,
            ease: 'none',
          },
          'eduOutro'
        )
        .to(cardListRef.current, {
          autoAlpha: 0,
          duration: 0.08,
          ease: 'none',
        })
        .to(recordScreenRef.current, {
          autoAlpha: 1,
          duration: 0.04,
          ease: 'none',
        })

      removeExperienceIntro = addExperienceIntroToTimeline({
        timeline: cinemaTl,
        educationSection: sectionRef.current,
        experienceSection: document.getElementById('experience'),
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())
    }, sectionRef)

    return () => {
      ctx.revert()
      removeExperienceIntro?.()
    }
  }, [
    cardListRef,
    cinemaViewportRef,
    isNearViewport,
    recordHeadingRef,
    recordScreenRef,
    redCurtainRef,
    sectionRef,
    zoomTextRef,
  ])
}
