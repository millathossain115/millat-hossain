'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Education from '@/sections/Education';
import Experience from '@/sections/Experience';
import Projects from '@/sections/Projects';
import Skills from '@/sections/Skills';
import Contact from '@/sections/Contact';
import Footer from '@/components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const NAV_SCROLL_OFFSET = -24;
const SECTION_TRANSITION_ENTER_MS = 220;
const SECTION_TRANSITION_EXIT_MS = 260;
const DESKTOP_QUERY = '(min-width: 1024px)';
const SECTION_IDS_AFTER_EDUCATION = new Set([
  'experience',
  'projects',
  'skills',
  'contact',
]);

const wait = (duration: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });

const waitFrame = () =>
  new Promise((resolve) => {
    window.requestAnimationFrame(resolve);
  });

const clampScrollY = (value: number) => {
  const maxScrollY = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );

  return gsap.utils.clamp(0, maxScrollY, value);
};

const getSectionScrollTrigger = (target: HTMLElement) =>
  ScrollTrigger.getAll().find((trigger) => trigger.trigger === target);

const getReadableScrollY = (targetId: string, target: HTMLElement) => {
  const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;

  if (targetId === 'hero') {
    return 0;
  }

  if (targetId === 'about') {
    const aboutTrigger = getSectionScrollTrigger(target);

    return clampScrollY(
      isDesktop
        ? ((aboutTrigger?.end as number) ?? target.offsetTop + window.innerHeight * 1.25)
        : target.offsetTop - window.innerHeight * 0.28
    );
  }

  if (targetId === 'experience') {
    return clampScrollY(
      isDesktop
        ? target.offsetTop + NAV_SCROLL_OFFSET
        : target.offsetTop - window.innerHeight * 0.38
    );
  }

  return clampScrollY(target.offsetTop + NAV_SCROLL_OFFSET);
};

const prewarmReadableLayout = async (targetId: string) => {
  if (!SECTION_IDS_AFTER_EDUCATION.has(targetId)) {
    return;
  }

  const education = document.getElementById('education');

  if (!education) {
    return;
  }

  window.scrollTo({
    top: clampScrollY(education.offsetTop - window.innerHeight * 0.35),
    behavior: 'auto',
  });
  window.dispatchEvent(new Event('scroll'));
  await wait(120);
  await waitFrame();
  await waitFrame();
};

export default function Home() {
  const [isWelcomeExpanding, setIsWelcomeExpanding] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [isSectionTransitionMounted, setIsSectionTransitionMounted] =
    useState(false);
  const [isSectionTransitionActive, setIsSectionTransitionActive] =
    useState(false);
  const sectionTransitionInFlightRef = useRef(false);
  const handleRevealStart = useCallback(() => setIsWelcomeExpanding(true), []);
  const handleLoaderComplete = useCallback(() => setIsLoaderVisible(false), []);

  useEffect(() => {
    if (isLoaderVisible) {
      document.body.classList.add('is-loading');
      return () => {
        document.body.classList.remove('is-loading');
      };
    }

    document.body.classList.remove('is-loading');

    const lenis = new Lenis({
      duration: 1.0,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.0,
      wheelMultiplier: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, [isLoaderVisible]);

  const syncScrollSystems = useCallback(async () => {
    ScrollTrigger.refresh();
    ScrollTrigger.update();
    window.dispatchEvent(new Event('scroll'));
    await waitFrame();
    await waitFrame();
    ScrollTrigger.update();
    window.dispatchEvent(new Event('scroll'));
  }, []);

  const jumpToReadableSection = useCallback(
    async (targetId: string) => {
      const target = document.getElementById(targetId);

      if (!target || sectionTransitionInFlightRef.current) {
        return false;
      }

      sectionTransitionInFlightRef.current = true;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      const jump = async () => {
        ScrollTrigger.refresh();
        const lenis = (window as unknown as { lenis?: Lenis }).lenis;

        lenis?.stop();

        try {
          await prewarmReadableLayout(targetId);
          ScrollTrigger.refresh();

          const targetScrollY = getReadableScrollY(targetId, target);

          window.scrollTo({ top: targetScrollY, behavior: 'auto' });
        } finally {
          lenis?.start();
        }

        window.history.replaceState(
          null,
          '',
          `${window.location.pathname}${window.location.search}`
        );

        await syncScrollSystems();
      };

      try {
        if (prefersReducedMotion) {
          await jump();
          return true;
        }

        setIsSectionTransitionMounted(true);
        await waitFrame();
        setIsSectionTransitionActive(true);
        await wait(SECTION_TRANSITION_ENTER_MS);
        await jump();
        setIsSectionTransitionActive(false);
        await wait(SECTION_TRANSITION_EXIT_MS);
        setIsSectionTransitionMounted(false);
        return true;
      } finally {
        setIsSectionTransitionActive(false);
        setIsSectionTransitionMounted(false);
        sectionTransitionInFlightRef.current = false;
      }
    },
    [syncScrollSystems]
  );

  const appStateClass = isLoaderVisible
    ? isWelcomeExpanding
      ? 'app-reveal app-reveal--under-loader'
      : 'app-pre-reveal'
    : 'app-reveal app-reveal--under-loader';

  return (
    <div className="app-shell font-ui min-h-screen text-slate-100">
      {isLoaderVisible && (
        <Loader
          onRevealStart={handleRevealStart}
          onComplete={handleLoaderComplete}
        />
      )}

      <div className={appStateClass}>
        <Navbar onNavigate={jumpToReadableSection} />
        <main className="flex-grow">
          <Hero
            isIntroReady={isWelcomeExpanding || !isLoaderVisible}
            onNavigate={jumpToReadableSection}
          />
          <About />
          <Education />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>

      {isSectionTransitionMounted && (
        <div
          aria-hidden="true"
          className={`app-section-transition ${
            isSectionTransitionActive ? 'is-active' : ''
          }`}
        />
      )}
    </div>
  );
}
