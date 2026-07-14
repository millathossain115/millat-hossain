import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import navLogo from '../assets/Image/Nav-Logo.svg'
import resumePdf from '../assets/Resume/resumeMillathossain.pdf'

const navItems = [
  { label: 'About', sectionId: 'about' },
  { label: 'Work', sectionId: 'experience' },
  { label: 'Contact', sectionId: 'contact' },
]

const NAV_AUTO_HIDE_DELAY = 1500
const NAV_SCROLL_OFFSET = -24

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about')
  const [isNavVisible, setIsNavVisible] = useState(true)

  useEffect(() => {
    const sections = navItems
      .map(({ sectionId }) => document.getElementById(sectionId))
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
    let frameId = null
    let hideTimeoutId = null

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
          setIsNavVisible(false)
        }
        hideTimeoutId = null
      }, NAV_AUTO_HIDE_DELAY)
    }

    const handleScroll = () => {
      if (frameId !== null) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const delta = currentScrollY - lastScrollY

        if (currentScrollY <= 24) {
          clearHideTimeout()
          setIsNavVisible(true)
        } else if (delta > 1) {
          clearHideTimeout()
          setIsNavVisible(false)
        } else if (delta < -1) {
          setIsNavVisible(true)
          scheduleAutoHide()
        }

        lastScrollY = currentScrollY
        frameId = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }

      clearHideTimeout()
    }
  }, [])

  const handleNavClick = (event, targetId) => {
    event.preventDefault()

    const target = document.getElementById(targetId)

    if (!target) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    ScrollTrigger.refresh()

    if (window.lenis && !prefersReducedMotion) {
      window.lenis.scrollTo(target, {
        offset: NAV_SCROLL_OFFSET,
        duration: 1.4,
        onComplete: () => setActiveSection(targetId),
      })
    } else {
      window.scrollTo({
        top:
          window.scrollY +
          target.getBoundingClientRect().top +
          NAV_SCROLL_OFFSET,
        behavior: 'auto',
      })
      setActiveSection(targetId)
    }

    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${window.location.search}`
    )
  }

  return (
    <nav
      className={`sticky top-0 z-[70] w-full bg-transparent px-4 py-5 text-white transition-transform duration-300 ease-out will-change-transform sm:px-6 md:px-12 ${
        isNavVisible ? 'translate-y-0' : 'pointer-events-none -translate-y-full'
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
  )
}
