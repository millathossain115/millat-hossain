'use client';

import { RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseContactAnimationsProps {
  sectionRef: RefObject<HTMLElement | null>;
}

export default function useContactAnimations({ sectionRef }: UseContactAnimationsProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      const card = sectionRef.current?.querySelector<HTMLElement>('.contact-profile-card');
      const content = sectionRef.current?.querySelector<HTMLElement>('.contact-form-shell');
      const formItems = sectionRef.current?.querySelectorAll<HTMLElement>('.contact-form-item');

      if (card) {
        gsap.fromTo(
          card,
          {
            x: isDesktop ? -70 : 0,
            y: isDesktop ? 0 : 28,
            opacity: 0,
            rotateY: isDesktop ? -8 : 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 52%',
              scrub: 0.5,
            },
          }
        );
      }

      if (content) {
        gsap.fromTo(
          content,
          {
            x: isDesktop ? 40 : 0,
            y: isDesktop ? 0 : 24,
            opacity: isDesktop ? 1 : 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: content,
              start: 'top 88%',
              end: 'top 55%',
              scrub: 0.5,
            },
          }
        );
      }

      if (formItems && formItems.length > 0) {
        gsap.fromTo(
          formItems,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.contact-form-grid',
              start: 'top 88%',
              end: 'top 60%',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [sectionRef]);
}
