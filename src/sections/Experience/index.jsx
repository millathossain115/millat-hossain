import { useRef, useState } from 'react'
import { EXPERIENCES } from '../../constants'
import useNearViewport from '../../hooks/useNearViewport'
import ExperienceCard from './ExperienceCard'
import useExperienceAnimations from './useExperienceAnimations'

const defaultPointer = { x: 0, y: 0, active: false }

export default function Experience() {
  const [pointer, setPointer] = useState(defaultPointer)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const isNearViewport = useNearViewport(sectionRef)

  useExperienceAnimations({ sectionRef, contentRef, isNearViewport })

  const handlePointerMove = (event) => {
    setPointer({ x: event.clientX, y: event.clientY, active: true })
  }

  const handlePointerLeave = () => {
    setPointer(defaultPointer)
  }

  return (
    <section
      ref={sectionRef}
      id="experience"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-experience-screen
      className="theme-section theme-section--plain relative z-40 bg-[#020202] scroll-mt-16 px-6 py-24 md:min-h-screen md:flex md:items-center"
    >
      {/* Floating glow orb */}
      <div className="section-glow-orb !absolute -right-20 top-1/3 h-72 w-72 bg-[#DC143C]/10" />
      <div
        className="pointer-events-none !fixed left-0 top-0 z-30 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DC143C]/20 opacity-0 blur-[56px] transition-opacity duration-300"
        style={{
          opacity: pointer.active ? 1 : 0,
          transform: `translate(${pointer.x}px, ${pointer.y}px) translate(-50%, -50%)`,
          boxShadow: '0 0 54px rgba(220, 20, 60, 0.24)',
        }}
      />

      <div
        ref={contentRef}
        data-experience-content
        className="mx-auto grid w-full gap-16 lg:grid-cols-[1fr_3fr] lg:items-center lg:justify-start lg:gap-16 xl:gap-20"
      >
        <div className="min-w-0 lg:sticky lg:top-24">
          <h2 className="exp-heading exp-heading-title">
            <span className="gsap-word">
              <span className="gsap-word-inner">
                <span className="exp-heading-title__hover">Work</span>
              </span>
            </span>
            <span className="gsap-word">
              <span className="gsap-word-inner">
                <span className="exp-heading-title__hover">Experience</span>
              </span>
            </span>
          </h2>
        </div>

        <div className="exp-list relative mx-auto w-full space-y-16 lg:mx-0 lg:pl-32">
          {EXPERIENCES.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  )
}
