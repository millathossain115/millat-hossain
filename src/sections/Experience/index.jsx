import { useRef } from 'react'
import { EXPERIENCES } from '../../constants'
import ExperienceCard from './ExperienceCard'
import useExperienceAnimations from './useExperienceAnimations'
import './Experience.css'

export default function Experience() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const listRef = useRef(null)
  const cardRefs = useRef([])

  useExperienceAnimations({
    sectionRef,
    headingRef,
    listRef,
    cardRefs,
  })

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="theme-section theme-section--plain exp-section relative z-40 bg-[#020202] scroll-mt-16 px-6 py-24 md:min-h-screen md:flex md:items-center"
    >
      <div className="exp-shell mx-auto grid w-full gap-12 lg:grid-cols-[minmax(15rem,30vw)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:gap-16">
        <div
          ref={headingRef}
          className="exp-heading-zone min-w-0 lg:sticky lg:top-24"
        >
          <h2 className="exp-heading exp-heading-title">
            <span>Work</span>
            <span>Experience</span>
          </h2>
        </div>

        <div
          ref={listRef}
          className="exp-list relative mx-auto w-full space-y-16 lg:mx-0 lg:pl-11 xl:pl-12"
        >
          {EXPERIENCES.map((exp, index) => (
            <ExperienceCard
              key={index}
              ref={(node) => {
                if (node) {
                  cardRefs.current[index] = node
                }
              }}
              exp={exp}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
