"use client";

import { useRef } from "react";
import { EXPERIENCES } from "../../constants";
import "./Experience.css";
import ExperienceCard from "./ExperienceCard";
import useExperienceAnimations from "./useExperienceAnimations";

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useExperienceAnimations({
    sectionRef,
    headingRef,
    listRef,
    cardRefs,
  });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="theme-section theme-section--plain exp-section relative z-40 bg-[#020202] scroll-mt-16 px-6 py-24 md:min-h-screen md:flex md:items-center">
      <div className="exp-shell mx-auto grid w-full gap-12 lg:grid-cols-[minmax(15rem,30vw)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:gap-16">
        <div
          ref={headingRef}
          className="exp-heading-zone min-w-0 lg:sticky lg:top-24">
          <p className="font-ui mb-3 text-xs font-medium uppercase tracking-[0.38em] text-[#DC143C]">
            Career History
          </p>
          <h2 className="exp-heading exp-heading-title">
            <span className="block text-white">Work</span>
            <span className="block bg-[linear-gradient(180deg,#ff6a70_0%,#dc143c_55%,#ff2f47_100%)] bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </div>

        <div
          ref={listRef}
          className="exp-list relative mx-auto w-full space-y-16 lg:mx-0 lg:pl-11 xl:pl-12">
          {EXPERIENCES.map((exp, index) => (
            <ExperienceCard
              key={index}
              ref={(node) => {
                if (node) {
                  cardRefs.current[index] = node;
                }
              }}
              exp={exp}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
