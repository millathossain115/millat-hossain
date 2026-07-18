import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function getExperienceEntranceDistance(contentSection) {
  return Math.max(window.innerHeight * 4.6, contentSection.offsetHeight * 3.6)
}

export function createExperienceEntranceAnimation({
  educationSection,
  experienceSection,
  addEducationReveal,
}) {
  const educationContent = educationSection.querySelector(
    '[data-education-content]'
  )
  const headingEl = educationSection.querySelector('.edu-heading')
  const educationList = educationSection.querySelector('.edu-list')
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches

  if (!isDesktop || !experienceSection || !educationContent || !educationList) {
    return undefined
  }

  const exitDistance = getExperienceEntranceDistance(educationSection)
  const experienceOverlay = experienceSection.cloneNode(true)

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

  const overlayHeading = experienceOverlay.querySelector('.exp-heading-title')
  const overlayItems = experienceOverlay.querySelectorAll('.exp-item')

  const exitTl = gsap.timeline({
    scrollTrigger: {
      trigger: educationSection,
      start: 'top top',
      end: () => `+=${exitDistance}`,
      scrub: 0.35,
      pin: educationSection,
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

  addEducationReveal?.({ timeline: exitTl, handoffAt: 3.05 })

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

  if (overlayItems.length > 0) {
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

  return () => experienceOverlay.remove()
}
