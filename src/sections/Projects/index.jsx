import { useRef } from 'react'
import { PROJECTS } from '../../constants'
import useNearViewport from '../../hooks/useNearViewport'
import ProjectRail from './ProjectRail'
import useProjectsAnimations from './useProjectsAnimations'

export default function Projects() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const isNearViewport = useNearViewport(sectionRef)

  useProjectsAnimations({ sectionRef, pinRef, trackRef, isNearViewport })

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="theme-section scroll-mt-16"
    >
      {/* Parallax glow orb */}
      <div className="proj-orb section-glow-orb right-0 top-24 h-96 w-96 bg-[#DC143C]/12" />
      <div className="section-glow-orb -left-24 bottom-24 h-72 w-72 bg-[#DC143C]/8" />

      <div
        ref={pinRef}
        className="flex min-h-[100svh] w-full flex-col justify-start lg:justify-center overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20 lg:py-16"
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
