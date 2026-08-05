import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DESKTOP_QUERY = '(min-width: 1024px)'

export function addExperienceIntroToTimeline({
  timeline,
  experienceSection,
}) {
  const isDesktop = window.matchMedia(DESKTOP_QUERY).matches

  if (!isDesktop || !timeline || !experienceSection) {
    return undefined
  }

  const overlay = experienceSection.cloneNode(true)
  overlay.removeAttribute('id')
  overlay.setAttribute('aria-hidden', 'true')
  overlay.classList.add('exp-transition-overlay')
  overlay.dataset.experienceOverlay = 'true'

  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '55',
    width: '100%',
    height: '100svh',
    minHeight: '100svh',
    overflow: 'hidden',
    pointerEvents: 'none',
    visibility: 'hidden',
    opacity: '0',
  })

  document.body.appendChild(overlay)

  const shell = overlay.querySelector('.exp-shell')
  const headingZone = overlay.querySelector('.exp-heading-zone')
  const headingTitle = overlay.querySelector('.exp-heading-title')
  const list = overlay.querySelector('.exp-list')
  const cards = gsap.utils.toArray('.exp-work-item', overlay)
  const rows = cards.flatMap((card) =>
    gsap.utils.toArray('.exp-card-row, .exp-card-rule', card)
  )
  const realShell = experienceSection.querySelector('.exp-shell')
  const realHeadingZone = experienceSection.querySelector('.exp-heading-zone')
  const realList = experienceSection.querySelector('.exp-list')
  const realCards = gsap.utils.toArray('.exp-work-item', experienceSection)
  const realRows = realCards.flatMap((card) =>
    gsap.utils.toArray('.exp-card-row, .exp-card-rule', card)
  )

  if (!shell || !headingZone || !headingTitle || !list || cards.length === 0) {
    overlay.remove()
    return undefined
  }

  gsap.set(overlay, { autoAlpha: 0, y: 0 })
  gsap.set(shell, { autoAlpha: 1, y: 0, clearProps: 'transform' })
  gsap.set(headingZone, {
    autoAlpha: 0,
    scale: 1,
    x: -48,
    y: 0,
    transformOrigin: 'center center',
  })
  gsap.set(list, {
    autoAlpha: 1,
    '--exp-line-scale': 0,
    '--exp-line-opacity': 0,
    '--exp-overlay-line-scale': 0,
    '--exp-overlay-line-opacity': 0,
  })
  gsap.set(cards, { autoAlpha: 0, x: 72, y: 0 })
  gsap.set(rows, { autoAlpha: 0, x: 24, y: 0 })

  const handoffTrigger = ScrollTrigger.create({
    trigger: experienceSection,
    start: 'top top',
    refreshPriority: 2,
    onEnter: () => gsap.set(overlay, { autoAlpha: 0 }),
    onLeaveBack: () => requestAnimationFrame(syncOverlayHandoff),
  })
  const syncOverlayHandoff = () => {
    if (experienceSection.getBoundingClientRect().top <= 1) {
      gsap.set(overlay, { autoAlpha: 0 })
      return
    }

    const introStart = timeline.labels.experienceIntro
    const introEnd = introStart + 1.84
    const currentTime = timeline.time()
    const firstCardOpacity = Number.parseFloat(
      window.getComputedStyle(cards[0]).opacity
    )
    const headingOpacity = Number.parseFloat(
      window.getComputedStyle(headingZone).opacity
    )
    const hasVisibleOverlayContent =
      firstCardOpacity >= 0.02 || headingOpacity >= 0.02

    if (
      currentTime >= introStart - 0.02 &&
      currentTime <= introEnd + 0.08
    ) {
      gsap.set(overlay, { autoAlpha: hasVisibleOverlayContent ? 1 : 0 })
      return
    }

    gsap.set(overlay, {
      autoAlpha: currentTime > introEnd && hasVisibleOverlayContent ? 1 : 0,
    })
  }

  window.addEventListener('scroll', syncOverlayHandoff, { passive: true })
  ScrollTrigger.addEventListener('refresh', syncOverlayHandoff)

  timeline
    .addLabel('experienceIntro')
    .set(overlay, { autoAlpha: 0 }, 'experienceIntro-=0.02')
    .set(overlay, { autoAlpha: 1 }, 'experienceIntro')
    .set(
      headingZone,
      {
        autoAlpha: 0,
        scale: 1,
        x: -48,
        y: 0,
      },
      'experienceIntro'
    )
    .to(
      headingZone,
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.36,
        ease: 'none',
      },
      'experienceIntro'
    )
    .to(
      list,
      {
        '--exp-overlay-line-opacity': 1,
        '--exp-overlay-line-scale': 1,
        '--exp-line-opacity': 1,
        '--exp-line-scale': 1,
        duration: 0.48,
        ease: 'none',
      },
      'experienceIntro+=1.04'
    )
    .to(
      cards,
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.52,
        stagger: 0.08,
        ease: 'none',
      },
      'experienceIntro+=1.14'
    )
    .to(
      rows,
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.38,
        stagger: 0.03,
        ease: 'none',
      },
      'experienceIntro+=1.3'
    )
    .set(
      [
        experienceSection,
        realShell,
        realHeadingZone,
        realList,
        ...realCards,
        ...realRows,
      ].filter(Boolean),
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        clearProps: 'transform',
      },
      'experienceIntro+=1.84'
    )
    .set(
      realList,
      {
        '--exp-line-scale': 1,
        '--exp-line-opacity': 1,
      },
      'experienceIntro+=1.84'
    )

  return () => {
    handoffTrigger.kill()
    window.removeEventListener('scroll', syncOverlayHandoff)
    ScrollTrigger.removeEventListener('refresh', syncOverlayHandoff)
    overlay.remove()
  }
}
