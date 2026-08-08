import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import navLogo from '../assets/Image/Nav-Logo.svg'
import resumePdf from '../assets/Resume/resumeMillathossain.pdf'

const navItems = [
  { label: 'About', sectionId: 'about' },
  { label: 'Work', sectionId: 'experience' },
  { label: 'Contact', sectionId: 'contact' },
]

const NAV_AUTO_HIDE_DELAY = 1500
const NAV_TOP_HOVER_HEIGHT = 24

export default function Navbar({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('hero')
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [navHeight, setNavHeight] = useState(0)
  const navRef = useRef(null)

  useLayoutEffect(() => {
    const nav = navRef.current

    if (!nav) {
      return undefined
    }

    const syncNavHeight = () => {
      setNavHeight(nav.offsetHeight)
    }

    const resizeObserver = new ResizeObserver(syncNavHeight)
    resizeObserver.observe(nav)
    syncNavHeight()

    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    const sections = ['hero', ...navItems.map(({ sectionId }) => sectionId)]
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean)

    if (!sections.length) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: [0.2, 0.35, 0.5, 0.65],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY
    let lastLenisScrollY = null
    let touchStartY = null
    let showIntentUntil = 0
    let frameId = null
    let holdFrameId = null
    let hideTimeoutId = null
    let bindLenisFrameId = null
    let unbindLenisScroll = null

    const clearHideTimeout = () => {
      if (hideTimeoutId !== null) {
        window.clearTimeout(hideTimeoutId)
        hideTimeoutId = null
      }
    }

    const scheduleAutoHide = () => {
      clearHideTimeout()
      hideTimeoutId = window.setTimeout(() => {
        if (window.scrollY > 24) {
          showIntentUntil = 0
          setIsNavVisible(false)
        }
        hideTimeoutId = null
      }, NAV_AUTO_HIDE_DELAY)
    }

    const holdVisibleDuringIntent = () => {
      if (Date.now() >= showIntentUntil) {
        holdFrameId = null
        return
      }

      setIsNavVisible(true)
      holdFrameId = window.requestAnimationFrame(holdVisibleDuringIntent)
    }

    const showForAutoHideDuration = () => {
      showIntentUntil = Date.now() + NAV_AUTO_HIDE_DELAY
      setIsNavVisible(true)
      scheduleAutoHide()

      if (holdFrameId === null) {
        holdVisibleDuringIntent()
      }
    }

    const applyScrollDirection = (deltaY) => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 24) {
        clearHideTimeout()
        setIsNavVisible(true)
      } else if (deltaY > 1) {
        if (Date.now() < showIntentUntil) {
          return
        }

        clearHideTimeout()
        setIsNavVisible(false)
      } else if (deltaY < -1) {
        showForAutoHideDuration()
      }
    }

    const handlePointerMove = (event) => {
      if (
        event.pointerType === 'mouse' &&
        event.clientY <= NAV_TOP_HOVER_HEIGHT
      ) {
        showForAutoHideDuration()
      }
    }

    const handleScroll = () => {
      if (frameId !== null) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const delta = currentScrollY - lastScrollY

        applyScrollDirection(delta)

        lastScrollY = currentScrollY
        frameId = null
      })
    }

    const handleWheel = (event) => {
      applyScrollDirection(event.deltaY)
    }

    const handleTouchStart = (event) => {
      touchStartY = event.touches[0]?.clientY ?? null
    }

    const handleTouchMove = (event) => {
      if (touchStartY === null) {
        return
      }

      const currentTouchY = event.touches[0]?.clientY

      if (typeof currentTouchY !== 'number') {
        return
      }

      applyScrollDirection(touchStartY - currentTouchY)
      touchStartY = currentTouchY
    }

    const bindLenisScroll = () => {
      if (unbindLenisScroll || !window.lenis) {
        return
      }

      lastLenisScrollY = window.lenis.scroll
      unbindLenisScroll = window.lenis.on('scroll', (lenis) => {
        const currentLenisScrollY = lenis.scroll

        if (typeof currentLenisScrollY !== 'number') {
          return
        }

        if (typeof lastLenisScrollY === 'number') {
          applyScrollDirection(currentLenisScrollY - lastLenisScrollY)
        }

        lastLenisScrollY = currentLenisScrollY
      })
    }

    const waitForLenis = () => {
      bindLenisScroll()

      if (!unbindLenisScroll) {
        bindLenisFrameId = window.requestAnimationFrame(waitForLenis)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('scroll', handleScroll, {
      capture: true,
      passive: true,
    })
    window.addEventListener('wheel', handleWheel, {
      capture: true,
      passive: true,
    })
    document.addEventListener('wheel', handleWheel, {
      capture: true,
      passive: true,
    })
    window.addEventListener('touchstart', handleTouchStart, {
      capture: true,
      passive: true,
    })
    window.addEventListener('touchmove', handleTouchMove, {
      capture: true,
      passive: true,
    })
    document.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    })
    waitForLenis()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('scroll', handleScroll, { capture: true })
      window.removeEventListener('wheel', handleWheel, { capture: true })
      document.removeEventListener('wheel', handleWheel, { capture: true })
      window.removeEventListener('touchstart', handleTouchStart, {
        capture: true,
      })
      window.removeEventListener('touchmove', handleTouchMove, {
        capture: true,
      })
      document.removeEventListener('pointermove', handlePointerMove)

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }

      if (holdFrameId !== null) {
        window.cancelAnimationFrame(holdFrameId)
      }

      if (bindLenisFrameId !== null) {
        window.cancelAnimationFrame(bindLenisFrameId)
      }

      unbindLenisScroll?.()
      clearHideTimeout()
    }
  }, [])

  const handleNavClick = (event, targetId) => {
    event.preventDefault()

    setIsNavVisible(true)

    Promise.resolve(onNavigate?.(targetId)).then((didNavigate) => {
      if (didNavigate !== false) {
        setActiveSection(targetId)
      }

      setIsNavVisible(true)
    })
  }

  return (
    <>
      <div aria-hidden="true" style={{ height: `${navHeight}px` }} />
      <nav
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-[70] w-full bg-transparent px-4 py-5 text-white transition-transform duration-300 ease-out will-change-transform sm:px-6 md:px-12 ${
          isNavVisible
            ? 'translate-y-0'
            : 'pointer-events-none -translate-y-full'
        }`}
      >
        <div className="soft-reveal delay-5 flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:flex-wrap sm:gap-5">
          <a
            href="/"
            onClick={(event) => handleNavClick(event, 'hero')}
            className="transition-opacity duration-200 hover:opacity-80"
          >
            <img
              src={navLogo}
              alt="Millat Hossain home"
              className="h-8 w-auto sm:h-11 md:h-12"
            />
          </a>

          <div className="font-ui flex flex-wrap items-center justify-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.24em] sm:gap-5 sm:text-xs sm:tracking-[0.32em] md:gap-8 md:text-sm md:tracking-[0.42em]">
            {navItems.map(({ label, sectionId }) => {
              const isActive = activeSection === sectionId

              return (
                <a
                  key={sectionId}
                  href="/"
                  onClick={(event) => handleNavClick(event, sectionId)}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? 'text-[#DC143C]'
                      : 'text-[rgba(148,163,184,0.75)] hover:text-[#DC143C]'
                  }`}
                >
                  {label}
                </a>
              )
            })}

            <a
              href={resumePdf}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#DC143C] px-3 py-2 text-[0.65rem] uppercase tracking-[0.24em] text-[rgba(148,163,184,0.75)] transition-colors duration-200 hover:text-[#DC143C] sm:px-4 sm:text-xs sm:tracking-[0.32em] md:text-sm md:tracking-[0.42em]"
            >
              Resume
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
