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

export function getEducationExitDistance(contentSection) {
  return Math.max(window.innerHeight * 4.6, contentSection.offsetHeight * 3.6)
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

    let experienceOverlay = null

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
          { scaleY: 0 },
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

      const experienceSection = document.getElementById('experience')
      const educationContent = contentSectionRef.current.querySelector(
        '[data-education-content]'
      )

      if (isDesktop && experienceSection && educationContent && educationList) {
        const exitDistance = getEducationExitDistance(contentSectionRef.current)

        experienceOverlay = experienceSection.cloneNode(true)
        experienceOverlay.removeAttribute('id')
        experienceOverlay.setAttribute('aria-hidden', 'true')
        experienceOverlay.dataset.experienceOverlay = 'true'
        Object.assign(experienceOverlay.style, {
          position: 'fixed',
          inset: '0',
          zIndex: '55',
          width: '100%',
          height: '100svh',
          minHeight: '100svh',
          pointerEvents: 'none',
          overflow: 'hidden',
          visibility: 'hidden',
          opacity: '0',
          transform: 'translate3d(0, 100vh, 0)',
          willChange: 'transform, opacity',
        })
        document.body.appendChild(experienceOverlay)

        const overlayHeading =
          experienceOverlay.querySelector('.exp-heading-title')
        const overlayItems = experienceOverlay.querySelectorAll('.exp-item')

        const exitTl = gsap.timeline({
          scrollTrigger: {
            trigger: contentSectionRef.current,
            start: 'top top',
            end: () => `+=${exitDistance}`,
            scrub: 0.35,
            pin: contentSectionRef.current,
            pinSpacing: false,
            pinType: 'transform',
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: (progress) => (progress < 0.82 ? progress : 1),
              duration: { min: 0.22, max: 0.52 },
              delay: 0.04,
              ease: 'power2.inOut',
            },
            onEnterBack: () => {
              gsap.set(experienceOverlay, { autoAlpha: 1 })
            },
            onLeaveBack: () => {
              gsap.set(experienceOverlay, { autoAlpha: 0 })
            },
          },
        })

        if (lineEl) {
          gsap.set(lineEl, { scaleY: 0, autoAlpha: 1 })
          exitTl.to(
            lineEl,
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
            gsap.set(dot, { scale: 0, opacity: 0 })
            exitTl.to(
              dot,
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
            gsap.set(content, { y: 36, opacity: 0 })
            exitTl.to(
              content,
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
            gsap.set(duration, { x: -36, opacity: 0 })
            exitTl.to(
              duration,
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

        if (headingEl) {
          exitTl.to(
            headingEl,
            {
              autoAlpha: 0.28,
              y: -24,
              filter: 'blur(5px)',
              duration: 0.62,
              ease: 'none',
            },
            3.0
          )
        }

        if (lineEl) {
          exitTl.to(
            lineEl,
            {
              autoAlpha: 0,
              scaleY: 0,
              transformOrigin: 'bottom center',
              duration: 0.72,
              ease: 'none',
            },
            3.05
          )
        }

        exitTl
          .to(
            educationContent,
            {
              autoAlpha: 0.28,
              scale: 0.975,
              filter: 'blur(12px)',
              duration: 0.92,
              ease: 'none',
            },
            3.05
          )
          .to(
            educationContent,
            {
              y: -32,
              duration: 0.54,
              ease: 'none',
            },
            3.42
          )
          .set(experienceOverlay, { autoAlpha: 1 }, 3.05)
          .fromTo(
            experienceOverlay,
            {
              y: () => window.innerHeight,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.95,
              ease: 'none',
            },
            3.05
          )

        if (overlayHeading) {
          exitTl.fromTo(
            overlayHeading,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: 'power2.out',
            },
            3.1
          )
        }

        if (overlayItems && overlayItems.length > 0) {
          exitTl.fromTo(
            overlayItems,
            { y: 120, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.12,
              duration: 0.8,
              ease: 'power2.out',
            },
            3.15
          )
        }

        ScrollTrigger.create({
          trigger: experienceSection,
          start: 'top top',
          onEnter: () => gsap.set(experienceOverlay, { autoAlpha: 0 }),
          onLeaveBack: () => gsap.set(experienceOverlay, { autoAlpha: 1 }),
        })
      }
    }, containerRef)

    return () => {
      ctx.revert()
      experienceOverlay?.remove()
    }
  }, [containerRef, zoomTextRef, redFillRef, contentSectionRef, isNearViewport])
}
