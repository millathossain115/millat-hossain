import { useRef } from 'react'
import { FaBookOpen, FaCertificate, FaGraduationCap } from 'react-icons/fa'
import { EDUCATION } from '../../constants'
import EducationCard from './EducationCard'
import useEducationAnimations from './useEducationAnimations'
import './Education.css'

const educationIcons = [FaGraduationCap, FaCertificate, FaBookOpen]

export default function Education() {
  const sectionRef = useRef(null)
  const cinemaViewportRef = useRef(null)
  const zoomTextRef = useRef(null)
  const redCurtainRef = useRef(null)
  const recordScreenRef = useRef(null)
  const recordHeadingRef = useRef(null)
  const cardListRef = useRef(null)

  useEducationAnimations({
    sectionRef,
    cinemaViewportRef,
    zoomTextRef,
    redCurtainRef,
    recordScreenRef,
    recordHeadingRef,
    cardListRef,
  })

  return (
    <section
      ref={sectionRef}
      id="education"
      className="theme-section theme-section--plain education-section edu-cinema-stage relative scroll-mt-16 overflow-x-clip bg-black"
    >
      <div
        ref={cinemaViewportRef}
        className="edu-cinema-viewport relative h-[100svh] w-full overflow-hidden bg-black"
      >
        <div
          ref={recordScreenRef}
          className="edu-record-screen absolute inset-0 bg-black px-6 py-20 sm:py-24 lg:flex lg:items-center lg:py-0"
        >
          <div className="edu-record-shell mx-auto grid w-full gap-12 lg:grid-cols-[minmax(15rem,30vw)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:gap-16">
            <div
              ref={recordHeadingRef}
              className="edu-record-heading-zone min-w-0"
            >
              <p className="edu-record-label font-ui mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-[#DC143C]">
                Academic Record
              </p>

              <h2 className="edu-record-title font-display font-bold uppercase text-[#DC143C]">
                Education
              </h2>
            </div>

            <div
              ref={cardListRef}
              className="edu-list edu-card-rotator edu-record-list relative mx-auto w-full lg:mx-0"
            >
              {EDUCATION.map((edu, index) => {
                const EducationIcon = educationIcons[index] ?? FaBookOpen

                return (
                  <div key={index} className="edu-card-panel">
                    <EducationCard edu={edu} Icon={EducationIcon} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div
          ref={zoomTextRef}
          aria-hidden="true"
          className="edu-zoom-title-layer pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        >
          <div className="edu-zoom-title text-[#DC143C] font-display text-[15vw] sm:text-[12vw] font-bold tracking-[0.1em] text-center uppercase whitespace-nowrap">
            EDUCATION
          </div>
        </div>

        <div
          ref={redCurtainRef}
          aria-hidden="true"
          className="edu-red-curtain pointer-events-none absolute inset-0 z-30 bg-[#DC143C] opacity-0"
        />
      </div>
    </section>
  )
}
