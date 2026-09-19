'use client';

import { MutableRefObject, RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useNearViewport from '../../hooks/useNearViewport';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const OUTRO_DISTANCE_RATIO = 0.3;

interface UseExperienceAnimationsProps {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
  listRef: RefObject<HTMLDivElement | null>;
  cardRefs: MutableRefObject<(HTMLDivElement | null)[]>;
}

export default function useExperienceAnimations({
  sectionRef,
  headingRef,
  listRef,
  cardRefs,
}: UseExperienceAnimationsProps) {
  const isNearViewport = useNearViewport(sectionRef, '400px 0px');

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const getCards = () =>
      cardRefs.current.length
        ? cardRefs.current.filter((c): c is HTMLDivElement => c !== null)
        : gsap.utils.toArray<HTMLElement>('.exp-work-item', sectionRef.current!);

    const ctx = gsap.context(() => {
      const shell = section.querySelector<HTMLElement>('.exp-shell');
      const getShellIntroY = () =>
        window.matchMedia('(max-width: 767px)').matches ? -220 : -360;
      const cards = getCards();
      const rows = gsap.utils.toArray<HTMLElement>(
        '.exp-card-row, .exp-card-rule',
        sectionRef.current!
      );
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

      if (prefersReducedMotion || isDesktop) {
        gsap.set(shell, {
          autoAlpha: 1,
          y: 0,
          clearProps: 'transform',
        });
        gsap.set(headingRef.current, {
          autoAlpha: 1,
          y: 0,
          clearProps: 'transform',
        });
        gsap.set(listRef.current, {
          autoAlpha: 1,
          '--exp-line-scale': 1,
          '--exp-line-opacity': 1,
        });
        gsap.set(cards, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          clearProps: 'transform',
        });
        gsap.set(rows, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          clearProps: 'transform',
        });
        return;
      }

      gsap.set(shell, {
        autoAlpha: 1,
        y: 0,
        clearProps: 'transform',
      });
      gsap.set(headingRef.current, {
        autoAlpha: 0,
        y: 28,
      });
      gsap.set(listRef.current, {
        autoAlpha: 1,
        '--exp-line-scale': 0,
        '--exp-line-opacity': 1,
      });
      gsap.set(cards, { autoAlpha: 0, y: 24, x: 0 });
      gsap.set(rows, { autoAlpha: 1, x: 0, y: 0 });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [cardRefs, headingRef, listRef, sectionRef]);

  useEffect(() => {
    if (!isNearViewport || !sectionRef.current) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

    if (prefersReducedMotion || isDesktop) {
      return undefined;
    }

    const getCards = () =>
      cardRefs.current.length
        ? cardRefs.current.filter((c): c is HTMLDivElement => c !== null)
        : gsap.utils.toArray<HTMLElement>('.exp-work-item', sectionRef.current!);

    const ctx = gsap.context(() => {
      const cards = getCards();

      // Heading reveals smoothly when entering viewport
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 88%',
              end: 'top 65%',
              scrub: 0.5,
            },
          }
        );
      }

      // Vertical line draws down naturally with scroll
      if (listRef.current) {
        gsap.fromTo(
          listRef.current,
          { '--exp-line-scale': 0 },
          {
            '--exp-line-scale': 1,
            ease: 'none',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 85%',
              end: 'bottom 85%',
              scrub: 0.5,
            },
          }
        );
      }

      // Each experience card fades up gently as scrolled into view
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 70%',
              scrub: 0.5,
            },
          }
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [cardRefs, headingRef, isNearViewport, listRef, sectionRef]);

  useEffect(() => {
    if (!isNearViewport) {
      return undefined;
    }

    const section = sectionRef.current;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

    if (prefersReducedMotion || !section || !isDesktop) {
      return undefined;
    }

    const getCards = () =>
      cardRefs.current.length
        ? cardRefs.current.filter((c): c is HTMLDivElement => c !== null)
        : gsap.utils.toArray<HTMLElement>('.exp-work-item', sectionRef.current!);

    const ctx = gsap.context(() => {
      const shell = section.querySelector<HTMLElement>('.exp-shell');
      const projects = document.getElementById('projects');

      if (!shell || !projects) {
        return undefined;
      }

      let resizeFrame = 0;

      const canPinOutro = () => shell.scrollHeight <= window.innerHeight + 1;

      const syncOutroLayoutMode = () => {
        section.classList.toggle('exp-section--natural-outro', !canPinOutro());
      };

      const clearShellPin = () => {
        gsap.set(shell, {
          clearProps: 'position,top,bottom,left,right,width,zIndex',
        });
      };

      const pinShellToViewport = () => {
        const sectionRect = section.getBoundingClientRect();
        const styles = window.getComputedStyle(section);
        const paddingLeft = Number.parseFloat(styles.paddingLeft) || 0;
        const paddingRight = Number.parseFloat(styles.paddingRight) || 0;

        gsap.set(shell, {
          position: 'fixed',
          top: 0,
          bottom: 'auto',
          left: sectionRect.left + paddingLeft,
          right: 'auto',
          width: Math.max(sectionRect.width - paddingLeft - paddingRight, 0),
          zIndex: 1,
        });
      };

      const dockShellAfterOutro = () => {
        gsap.set(shell, {
          position: 'absolute',
          top: 'auto',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 1,
        });
      };

      const syncOutro = () => {
        const cards = getCards();
        syncOutroLayoutMode();

        if (!canPinOutro()) {
          clearShellPin();
          gsap.set(headingRef.current, { autoAlpha: 1, y: 0 });
          gsap.set(cards, { autoAlpha: 1, y: 0 });
          gsap.set(listRef.current, {
            '--exp-line-scale': 1,
            '--exp-overlay-line-scale': 1,
          });
          return;
        }

        const projectsTop = projects.getBoundingClientRect().top;
        const sectionTop = section.getBoundingClientRect().top;
        const start = window.innerHeight * (1 + OUTRO_DISTANCE_RATIO);
        const end = window.innerHeight;
        const progress = gsap.utils.clamp(
          0,
          1,
          (start - projectsTop) / Math.max(start - end, 1)
        );
        const shouldPin = sectionTop <= 0 && projectsTop >= end;

        if (shouldPin) {
          pinShellToViewport();
        } else if (projectsTop < end) {
          dockShellAfterOutro();
        } else {
          clearShellPin();
        }

        gsap.set(headingRef.current, {
          autoAlpha: 1 - progress,
          y: 0,
        });
        gsap.set(cards, {
          autoAlpha: 1 - progress,
          y: 0,
        });
        gsap.set(listRef.current, {
          '--exp-line-scale': 1 - progress,
          '--exp-overlay-line-scale': 1 - progress,
        });
      };

      const syncOutroMode = () => {
        const wasNatural = section.classList.contains(
          'exp-section--natural-outro'
        );

        syncOutroLayoutMode();

        const isNatural = section.classList.contains(
          'exp-section--natural-outro'
        );

        if (isNatural === wasNatural) {
          return;
        }

        syncOutro();
        ScrollTrigger.refresh();
      };

      const scheduleOutroModeSync = () => {
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(syncOutroMode);
      };

      syncOutro();
      gsap.ticker.add(syncOutro);
      window.addEventListener('resize', scheduleOutroModeSync);
      ScrollTrigger.addEventListener('refresh', syncOutro);

      return () => {
        window.cancelAnimationFrame(resizeFrame);
        gsap.ticker.remove(syncOutro);
        window.removeEventListener('resize', scheduleOutroModeSync);
        ScrollTrigger.removeEventListener('refresh', syncOutro);
        clearShellPin();
        section.classList.remove('exp-section--natural-outro');
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [cardRefs, headingRef, isNearViewport, listRef, sectionRef]);
}
