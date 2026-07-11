import { useRef, useState } from 'react'
import { FaBookOpen, FaCertificate, FaGraduationCap } from 'react-icons/fa'
import { EDUCATION } from '../../constants'
import useNearViewport from '../../hooks/useNearViewport'
import EducationCard from './EducationCard'
import useEducationAnimations from './useEducationAnimations'

const defaultPointer = { x: 0, y: 0, active: false }
const educationIcons = [FaGraduationCap, FaCertificate, FaBookOpen]

export default function Education() {
  const [pointer, setPointer] = useState(defaultPointer)
  const containerRef = useRef(null)
  const zoomTextRef = useRef(null)
  const redFillRef = useRef(null)
  const contentSectionRef = useRef(null)
  const isNearViewport = useNearViewport(containerRef)

  useEducationAnimations({
    containerRef,
    zoomTextRef,
    redFillRef,
    contentSectionRef,
    isNearViewport,
  })

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top

    setPointer({ x, y, active: true })
  }

  const handlePointerLeave = () => {
    setPointer(defaultPointer)
  }

  return (
    <div ref={containerRef} id="education" className="relative w-full">
      <div className="relative h-[250vh] w-full">
        <div className="sticky top-0 z-0 flex h-screen w-full items-center justify-center overflow-hidden bg-black">
          <div
            ref={zoomTextRef}
            aria-hidden="true"
            className="text-[#DC143C] font-display text-[15vw] sm:text-[12vw] font-bold tracking-[0.1em] text-center uppercase whitespace-nowrap"
          >
            EDUCATION
          </div>
          <div
            ref={redFillRef}
            className="absolute inset-0 bg-[#DC143C] opacity-0 pointer-events-none"
          />
        </div>

        <div className="h-[150vh] w-full" />
      </div>

      <div
        ref={contentSectionRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        data-education-overlay
        className="theme-section theme-section--seamless relative z-10 flex min-h-screen w-full items-center scroll-mt-16 px-6 pb-16 pt-16 sm:pb-20 sm:pt-20"
      >
        <div className="section-glow-orb !absolute -left-20 top-1/3 h-64 w-64 bg-[#DC143C]/10 pointer-events-none blur-3xl rounded-full" />
        <div
          className="pointer-events-none !absolute z-10 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DC143C]/20 opacity-0 blur-[56px] transition-opacity duration-300"
          style={{
            opacity: pointer.active ? 1 : 0,
            left: pointer.x,
            top: pointer.y,
            boxShadow: '0 0 54px rgba(220, 20, 60, 0.24)',
          }}
        />
        <div
          data-education-content
          className="relative z-20 mx-auto w-full max-w-5xl"
        >
          <h2 className="edu-heading theme-heading" style={{ color: 'white' }}>
            Education
            <span className="theme-heading__line" />
          </h2>

          <div className="edu-list relative space-y-4 sm:space-y-5">
            <div className="gsap-timeline-line" />

            {EDUCATION.map((edu, index) => {
              const EducationIcon = educationIcons[index] ?? FaBookOpen

              return (
                <EducationCard key={index} edu={edu} Icon={EducationIcon} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
