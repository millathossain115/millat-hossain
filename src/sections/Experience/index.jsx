import { EXPERIENCES } from '../../constants'
import ExperienceCard from './ExperienceCard'
import './Experience.css'

export default function Experience() {
  return (
    <section
      id="experience"
      data-experience-screen
      className="theme-section theme-section--plain relative z-40 bg-[#020202] scroll-mt-16 px-6 py-24 md:min-h-screen md:flex md:items-center"
    >
      {/* Floating glow orb */}
      <div className="section-glow-orb !absolute -right-20 top-1/3 h-72 w-72 bg-[#DC143C]/10" />

      <div
        data-experience-content
        className="mx-auto grid w-full gap-16 lg:grid-cols-[1fr_3fr] lg:items-center lg:justify-start lg:gap-16 xl:gap-20"
      >
        <div className="min-w-0 lg:sticky lg:top-24">
          <h2 className="exp-heading exp-heading-title">
            <span className="gsap-word">
              <span className="gsap-word-inner">
                <span>Work</span>
              </span>
            </span>
            <span className="gsap-word">
              <span className="gsap-word-inner">
                <span>Experience</span>
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
