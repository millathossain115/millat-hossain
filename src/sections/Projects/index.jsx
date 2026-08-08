import { useRef } from 'react'
import { PROJECTS } from '../../constants'
import ProjectRail from './ProjectRail'
import useProjectsAnimations from './useProjectsAnimations'
import './Projects.css'

export default function Projects() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)

  useProjectsAnimations({ sectionRef, pinRef, trackRef })

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="theme-section projects-section scroll-mt-16"
    >
      {/* Parallax glow orb */}
      <div className="proj-orb section-glow-orb right-0 top-24 h-96 w-96 bg-[#DC143C]/12" />
      <div className="section-glow-orb -left-24 bottom-24 h-72 w-72 bg-[#DC143C]/8" />

      <div
        ref={pinRef}
        className="proj-pin flex min-h-[100svh] w-full flex-col justify-center overflow-hidden py-10 sm:py-12 lg:py-14"
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          {/* Sub-label */}
          <p className="proj-label font-ui mb-3 text-xs font-medium uppercase tracking-[0.38em] text-[#DC143C]">
            Selected Work
          </p>

          <h2
            className="proj-heading theme-heading flex-wrap sm:flex-nowrap !mb-6 sm:!mb-8 lg:!mb-10"
            style={{ overflow: 'hidden' }}
          >
            Some Things I've Built
            <span className="theme-heading__line hidden sm:block" />
          </h2>
        </div>

        <ProjectRail projects={PROJECTS} trackRef={trackRef} />
      </div>
    </section>
  )
}
