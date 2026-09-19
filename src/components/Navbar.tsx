'use client';

import { useEffect, useLayoutEffect, useRef, useState, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import navLogo from '../assets/Image/Nav-Logo.svg';
import './Navbar.css';

interface NavItem {
  label: string;
  sectionId: string;
}

const navItems: NavItem[] = [
  { label: 'About', sectionId: 'about' },
  { label: 'Work', sectionId: 'experience' },
  { label: 'Contact', sectionId: 'contact' },
];

const NAV_AUTO_HIDE_DELAY = 1500;
const NAV_TOP_HOVER_HEIGHT = 24;

interface NavbarProps {
  onNavigate?: (targetId: string) => Promise<boolean | void> | boolean | void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const [isDesktopNavSurfaceVisible, setIsDesktopNavSurfaceVisible] =
    useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [navHeight, setNavHeight] = useState<number>(0);
  const navRef = useRef<HTMLElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);
  const isMobileMenuOpenRef = useRef<boolean>(false);

  useLayoutEffect(() => {
    const nav = navRef.current;

    if (!nav) {
      return undefined;
    }

    const syncNavHeight = () => {
      setNavHeight(nav.offsetHeight);
    };

    const resizeObserver = new ResizeObserver(syncNavHeight);
    resizeObserver.observe(nav);
    syncNavHeight();

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const desktopMedia = window.matchMedia('(min-width: 640px)');

    const closeAtDesktopBreakpoint = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        return;
      }

      isMobileMenuOpenRef.current = false;
      setIsMobileMenuOpen(false);
    };

    desktopMedia.addEventListener('change', closeAtDesktopBreakpoint);

    return () => {
      desktopMedia.removeEventListener('change', closeAtDesktopBreakpoint);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const focusFrameId = window.requestAnimationFrame(() => {
      firstMobileLinkRef.current?.focus();
    });

    const handlePointerDown = (event: PointerEvent) => {
      if (mobileNavRef.current?.contains(event.target as Node)) {
        return;
      }

      isMobileMenuOpenRef.current = false;
      setIsMobileMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      isMobileMenuOpenRef.current = false;
      setIsMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrameId);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const sections = ['hero', ...navItems.map(({ sectionId }) => sectionId)]
      .map((sectionId) => document.getElementById(sectionId))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: [0.2, 0.35, 0.5, 0.65],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastLenisScrollY: number | null = null;
    let touchStartY: number | null = null;
    let showIntentUntil = 0;
    let frameId: number | null = null;
    let holdFrameId: number | null = null;
    let hideTimeoutId: number | null = null;
    let bindLenisFrameId: number | null = null;
    let unbindLenisScroll: (() => void) | null = null;

    const clearHideTimeout = () => {
      if (hideTimeoutId !== null) {
        window.clearTimeout(hideTimeoutId);
        hideTimeoutId = null;
      }
    };

    const scheduleAutoHide = () => {
      clearHideTimeout();
      hideTimeoutId = window.setTimeout(() => {
        if (!isMobileMenuOpenRef.current && window.scrollY > 24) {
          showIntentUntil = 0;
          setIsNavVisible(false);
          setIsDesktopNavSurfaceVisible(false);
        }
        hideTimeoutId = null;
      }, NAV_AUTO_HIDE_DELAY);
    };

    const holdVisibleDuringIntent = () => {
      if (Date.now() >= showIntentUntil) {
        holdFrameId = null;
        return;
      }

      setIsNavVisible(true);
      holdFrameId = window.requestAnimationFrame(holdVisibleDuringIntent);
    };

    const showForAutoHideDuration = () => {
      showIntentUntil = Date.now() + NAV_AUTO_HIDE_DELAY;
      setIsNavVisible(true);
      setIsDesktopNavSurfaceVisible(window.scrollY > 24);
      scheduleAutoHide();

      if (holdFrameId === null) {
        holdVisibleDuringIntent();
      }
    };

    const applyScrollDirection = (deltaY: number) => {
      const currentScrollY = window.scrollY;

      if (isMobileMenuOpenRef.current) {
        clearHideTimeout();
        setIsNavVisible(true);
        setIsDesktopNavSurfaceVisible(currentScrollY > 24);
        return;
      }

      if (currentScrollY <= 24) {
        clearHideTimeout();
        setIsNavVisible(true);
        setIsDesktopNavSurfaceVisible(false);
      } else if (deltaY > 1) {
        if (Date.now() < showIntentUntil) {
          return;
        }

        clearHideTimeout();
        setIsNavVisible(false);
        setIsDesktopNavSurfaceVisible(false);
      } else if (deltaY < -1) {
        showForAutoHideDuration();
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (
        event.pointerType === 'mouse' &&
        event.clientY <= NAV_TOP_HOVER_HEIGHT
      ) {
        showForAutoHideDuration();
      }
    };

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        const currentScrollY = window.scrollY;
        const deltaY = currentScrollY - lastScrollY;

        applyScrollDirection(deltaY);
        lastScrollY = currentScrollY;
      });
    };

    const handleWheel = (event: WheelEvent) => {
      applyScrollDirection(event.deltaY);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentTouchY = event.touches[0]?.clientY;

      if (touchStartY === null || currentTouchY === undefined) {
        return;
      }

      const deltaY = touchStartY - currentTouchY;
      applyScrollDirection(deltaY);
      touchStartY = currentTouchY;
    };

    const bindLenisScroll = () => {
      const lenis = (window as unknown as { lenis?: { on: (e: string, fn: (arg: { scroll: number }) => void) => void; off: (e: string, fn: (arg: { scroll: number }) => void) => void } }).lenis;

      if (!lenis || unbindLenisScroll) {
        return;
      }

      const handleLenisScroll = ({ scroll }: { scroll: number }) => {
        const currentLenisScrollY = scroll;

        if (lastLenisScrollY !== null) {
          const deltaY = currentLenisScrollY - lastLenisScrollY;
          applyScrollDirection(deltaY);
        }

        lastLenisScrollY = currentLenisScrollY;
      };

      lenis.on('scroll', handleLenisScroll);
      unbindLenisScroll = () => {
        lenis.off('scroll', handleLenisScroll);
      };
    };

    const waitForLenis = () => {
      bindLenisScroll();

      if (!unbindLenisScroll) {
        bindLenisFrameId = window.requestAnimationFrame(waitForLenis);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, {
      capture: true,
      passive: true,
    });
    window.addEventListener('wheel', handleWheel, {
      capture: true,
      passive: true,
    });
    document.addEventListener('wheel', handleWheel, {
      capture: true,
      passive: true,
    });
    window.addEventListener('touchstart', handleTouchStart, {
      capture: true,
      passive: true,
    });
    window.addEventListener('touchmove', handleTouchMove, {
      capture: true,
      passive: true,
    });
    document.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    waitForLenis();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll, { capture: true });
      window.removeEventListener('wheel', handleWheel, { capture: true });
      document.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart, {
        capture: true,
      });
      window.removeEventListener('touchmove', handleTouchMove, {
        capture: true,
      });
      document.removeEventListener('pointermove', handlePointerMove);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      if (holdFrameId !== null) {
        window.cancelAnimationFrame(holdFrameId);
      }

      if (bindLenisFrameId !== null) {
        window.cancelAnimationFrame(bindLenisFrameId);
      }

      unbindLenisScroll?.();
      clearHideTimeout();
    };
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLElement>, targetId: string) => {
    event.preventDefault();

    isMobileMenuOpenRef.current = false;
    setIsMobileMenuOpen(false);
    setIsNavVisible(true);
    setIsDesktopNavSurfaceVisible(targetId !== 'hero' || window.scrollY > 24);

    Promise.resolve(onNavigate?.(targetId)).then((didNavigate) => {
      if (didNavigate !== false) {
        setActiveSection(targetId);
      }

      setIsNavVisible(true);
      setIsDesktopNavSurfaceVisible(targetId !== 'hero' && window.scrollY > 24);
    });
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((isOpen) => {
      const nextIsOpen = !isOpen;

      isMobileMenuOpenRef.current = nextIsOpen;

      if (nextIsOpen) {
        setIsNavVisible(true);
      }

      return nextIsOpen;
    });
  };

  const handleResumeClick = () => {
    isMobileMenuOpenRef.current = false;
    setIsMobileMenuOpen(false);
  };

  const resumePdfPath = '/resumeMillathossain.pdf';

  return (
    <>
      <div aria-hidden="true" style={{ height: `${navHeight}px` }} />
      <nav
        ref={navRef}
        className={`site-nav fixed inset-x-0 top-0 z-[70] w-full bg-transparent px-3 py-2 text-white transition-transform duration-300 ease-out will-change-transform sm:px-6 sm:py-3 md:px-12 ${
          isDesktopNavSurfaceVisible ? 'site-nav--surface' : ''
        } ${
          isNavVisible
            ? 'translate-y-0'
            : 'pointer-events-none -translate-y-full'
        }`}
      >
        {/* Mobile top mini-brand header */}
        <div className="mobile-top-brand soft-reveal delay-5 flex items-center justify-between sm:hidden">
          <Link
            href="/"
            onClick={(event) => handleNavClick(event, 'hero')}
            className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#070709]/80 px-3 py-1.5 backdrop-blur-md transition-opacity duration-200 active:scale-95"
            aria-label="Millat Hossain home"
          >
            <Image src={navLogo} alt="" className="h-5 w-auto" priority />
            <span className="font-display text-xs font-semibold uppercase tracking-wider text-white">
              Millat Hossain
            </span>
          </Link>

          <a
            href={resumePdfPath}
            target="_blank"
            rel="noreferrer"
            onClick={handleResumeClick}
            className="flex items-center gap-1.5 rounded-full border border-[#DC143C]/40 bg-[#DC143C]/10 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-slate-200 transition-colors active:scale-95 hover:border-[#DC143C]"
          >
            <span>Resume</span>
            <span className="text-[0.6rem] text-[#ff496d]">PDF</span>
          </a>
        </div>

        <div className="soft-reveal delay-5 hidden w-full items-center justify-between sm:flex sm:flex-row sm:flex-wrap sm:gap-5">
          <Link
            href="/"
            onClick={(event) => handleNavClick(event, 'hero')}
            className="transition-opacity duration-200 hover:opacity-80"
          >
            <Image
              src={navLogo}
              alt="Millat Hossain home"
              className="h-9 w-auto md:h-10"
              priority
            />
          </Link>

          <div className="font-ui flex flex-wrap items-center justify-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.24em] sm:gap-5 sm:text-xs sm:tracking-[0.32em] md:gap-8 md:text-sm md:tracking-[0.42em]">
            {navItems.map(({ label, sectionId }) => {
              const isActive = activeSection === sectionId;

              return (
                <Link
                  key={sectionId}
                  href="/"
                  onClick={(event) => handleNavClick(event, sectionId)}
                  className={`transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#DC143C]'
                      : 'text-[rgba(148,163,184,0.75)] hover:text-[#DC143C]'
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            <a
              href={resumePdfPath}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#DC143C] px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.24em] text-[rgba(148,163,184,0.75)] transition-colors duration-200 hover:text-[#DC143C] sm:px-4 sm:text-xs sm:tracking-[0.32em] md:text-sm md:tracking-[0.42em]"
            >
              Resume
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Floating Bottom Pill Dock */}
      <aside
        ref={mobileNavRef}
        aria-label="Mobile Navigation Dock"
        className="mobile-bottom-dock fixed inset-x-0 bottom-6 z-[95] flex justify-center px-4 sm:hidden pointer-events-none"
      >
        <div className="mobile-dock-pill pointer-events-auto flex items-center gap-1 rounded-full border border-white/12 bg-[#09090b]/85 p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.75),0_0_28px_rgba(220,20,60,0.14)] backdrop-blur-2xl">
          <button
            type="button"
            onClick={(event) => handleNavClick(event, 'hero')}
            className={`mobile-dock-btn flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-all duration-300 active:scale-95 ${
              activeSection === 'hero'
                ? 'bg-[#DC143C] text-white shadow-[0_0_16px_rgba(220,20,60,0.45)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Home</span>
          </button>

          {navItems.map(({ label, sectionId }) => {
            const isActive = activeSection === sectionId;

            return (
              <button
                key={sectionId}
                type="button"
                onClick={(event) => handleNavClick(event, sectionId)}
                className={`mobile-dock-btn flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-all duration-300 active:scale-95 ${
                  isActive
                    ? 'bg-[#DC143C] text-white shadow-[0_0_16px_rgba(220,20,60,0.45)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
