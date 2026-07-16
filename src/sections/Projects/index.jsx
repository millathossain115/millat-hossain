import { useLayoutEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '../../constants'
import useNearViewport from '../../hooks/useNearViewport'
import ProjectRail from './ProjectRail'
import useProjectsAnimations, {
  getProjectsTravelDistance,
} from './useProjectsAnimations'

export default function Projects() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const pinSpacerRef = useRef(null)
  const isNearViewport = useNearViewport(sectionRef)

  useLayoutEffect(() => {
    const track = trackRef.current
    const pinSpacer = pinSpacerRef.current

    if (!track || !pinSpacer) {
      return undefined
    }

    let refreshFrameId = null

    const updateSpacer = () => {
      const nextHeight = `${getProjectsTravelDistance(track)}px`

      if (pinSpacer.style.height === nextHeight) {
        return
      }

      pinSpacer.style.height = nextHeight

      if (refreshFrameId !== null) {
        window.cancelAnimationFrame(refreshFrameId)
      }

      refreshFrameId = window.requestAnimationFrame(() => {
        refreshFrameId = null
        ScrollTrigger.refresh()
      })
    }

    const resizeObserver = new ResizeObserver(updateSpacer)
    resizeObserver.observe(track)
    window.addEventListener('resize', updateSpacer)
    updateSpacer()

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateSpacer)

      if (refreshFrameId !== null) {
        window.cancelAnimationFrame(refreshFrameId)
      }
    }
  }, [])

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

      <div
        ref={pinSpacerRef}
        aria-hidden="true"
        className="pointer-events-none w-full"
      />
    </section>
  )
}
