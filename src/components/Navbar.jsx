import { useEffect, useState } from 'react'
import navLogo from '../assets/Image/Nav-Logo.svg'

const navItems = [
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Work', href: '#projects', sectionId: 'projects' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
]

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
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY
    let frameId = null

    const handleScroll = () => {
      if (frameId !== null) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const delta = currentScrollY - lastScrollY

        if (currentScrollY <= 24) {
          setIsNavVisible(true)
        } else if (delta > 1) {
          setIsNavVisible(false)
        } else if (delta < -1) {
          setIsNavVisible(true)
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
    }
  }, [])

  const handleNavClick = (event, href) => {
    const targetId = href.replace('#', '')
    const target = document.getElementById(targetId)

    if (!target) {
      return
    }

    event.preventDefault()
    window.lenis?.scrollTo(target, {
      offset: -24,
      duration: 1.4,
    })
    window.history.replaceState(null, '', href)
  }

  return (
    <nav
      className={`sticky top-0 z-[70] w-full bg-transparent px-4 py-5 text-white transition-transform duration-300 ease-out will-change-transform sm:px-6 md:px-12 ${
        isNavVisible ? 'translate-y-0' : 'pointer-events-none -translate-y-full'
      }`}
    >
      <div className="soft-reveal delay-5 flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:flex-wrap sm:gap-5">
        <a
          href="#hero"
          onClick={(event) => handleNavClick(event, '#hero')}
          className="transition-opacity duration-200 hover:opacity-80"
        >
          <img
            src={navLogo}
            alt="Navigation logo"
            className="h-8 w-auto sm:h-11 md:h-12"
          />
        </a>

        <div className="font-ui flex flex-wrap items-center justify-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.24em] sm:gap-5 sm:text-xs sm:tracking-[0.32em] md:gap-8 md:text-sm md:tracking-[0.42em]">
          {navItems.map(({ label, href, sectionId }) => {
            const isActive = activeSection === sectionId

            return (
              <a
                key={sectionId}
                href={href}
                onClick={(event) => handleNavClick(event, href)}
                className={`transition-colors duration-200 ${
                  isActive ? 'text-[#DC143C]' : 'text-[rgba(148,163,184,0.75)] hover:text-[#DC143C]'
                }`}
              >
                {label}
              </a>
            )
          })}

          <a
            href="/resume.pdf"
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
