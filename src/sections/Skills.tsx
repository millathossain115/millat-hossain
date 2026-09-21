"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { techIcons } from "../assets/tech-icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const getViewportProgress = (
  element: Element | null,
  startRatio: number,
  endRatio: number,
): number => {
  if (!element) return 0;

  const start = window.innerHeight * startRatio;
  const end = window.innerHeight * endRatio;

  return gsap.utils.clamp(
    0,
    1,
    (start - element.getBoundingClientRect().top) / (start - end),
  );
};

const technologies: string[] = [
  "JavaScript",
  "C",
  "PHP",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "React.js",
  "Redux",
  "RTK Query",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Express.js",
  "Mongoose (ODM)",
  "Prisma (ORM)",
  "Laravel",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Figma",
  "Lucidchart",
  "Postman",
  "GitHub",
];

function splitWords(el: HTMLElement): Element[] {
  const words = el.innerText.trim().split(/\s+/);
  el.innerHTML = words
    .map(
      (w) =>
        `<span class="gsap-word"><span class="gsap-word-inner">${w}</span></span>`,
    )
    .join(" ");
  return Array.from(el.querySelectorAll(".gsap-word-inner"));
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const headingEl =
        sectionRef.current?.querySelector<HTMLElement>(".skills-heading");
      const words = headingEl ? splitWords(headingEl) : [];
      const divider =
        sectionRef.current?.querySelector<HTMLElement>(".skills-divider");
      const subPara =
        sectionRef.current?.querySelector<HTMLElement>(".skills-sub");
      const chips = gsap.utils.toArray<HTMLElement>(
        "[data-skill-chip]",
        sectionRef.current,
      );

      if (words.length > 0) {
        gsap.fromTo(
          words,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingEl,
              start: "top 88%",
              end: "top 58%",
              scrub: 0.5,
            },
          },
        );
      }

      if (divider) {
        gsap.fromTo(
          divider,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: divider,
              start: "top 88%",
              end: "top 65%",
              scrub: 0.5,
            },
          },
        );
      }

      if (subPara) {
        gsap.fromTo(
          subPara,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subPara,
              start: "top 90%",
              end: "top 65%",
              scrub: 0.5,
            },
          },
        );
      }

      if (chips.length > 0) {
        gsap.fromTo(
          chips,
          { y: 36, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.03,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".skills-chips",
              start: "top 90%",
              end: "top 55%",
              scrub: 0.5,
            },
          },
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="theme-section scroll-mt-16 px-6 py-24 md:flex md:min-h-screen md:items-center">
      <div className="section-glow-orb absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 bg-[#DC143C]/8" />

      <div className="mx-auto flex w-full max-w-6xl flex-col justify-center">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-ui mb-3 text-xs font-medium uppercase tracking-[0.38em] text-[#DC143C]">
            Technical Stack
          </p>

          <h2
            className="skills-heading font-display text-4xl font-semibold uppercase leading-[0.95] tracking-[0.08em] text-white sm:text-5xl md:text-6xl md:tracking-[0.1em]"
            style={{ overflow: "hidden" }}>
            Tech I Build With
          </h2>

          <div className="skills-divider mx-auto mt-6 h-px w-40 origin-center bg-gradient-to-r from-transparent via-[#DC143C] to-transparent" />

          <p className="skills-sub mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            A practical stack for modern full-stack product development, from
            polished interfaces to reliable backend services.
          </p>
        </div>

        <div className="skills-chips mt-14 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          {technologies.map((tech) => {
            const config = techIcons[tech];
            if (!config) return null;
            const { icon: Icon, className } = config;

            return (
              <div
                key={tech}
                data-skill-chip
                className="group relative cursor-default overflow-hidden rounded-full border border-white/[0.12] bg-[linear-gradient(135deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.02)_100%)] px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.37),inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#DC143C]/60 hover:bg-[linear-gradient(135deg,rgba(220,20,60,0.18)_0%,rgba(255,255,255,0.05)_100%)] hover:shadow-[0_16px_36px_rgba(220,20,60,0.22),inset_0_1px_2px_rgba(255,255,255,0.35)]"
              >
                {/* Liquid light reflection sheen */}
                <div className="pointer-events-none absolute -left-full top-0 h-full w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] transition-all duration-700 ease-out group-hover:left-full" />
                
                {/* Ambient glow accent */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(220,20,60,0.22),_transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10 flex items-center gap-3">
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    <Icon
                      aria-hidden="true"
                      focusable="false"
                      className={`h-[18px] w-[18px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] ${className}`}
                    />
                  </div>
                  <span className="font-ui text-xs font-medium tracking-wide text-slate-200 transition-colors duration-200 group-hover:text-white sm:text-sm">
                    {tech}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
