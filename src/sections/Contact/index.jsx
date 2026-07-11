import { useRef } from 'react'
import useNearViewport from '../../hooks/useNearViewport'
import ContactForm from './ContactForm'
import ContactProfileCard from './ContactProfileCard'
import useContactAnimations from './useContactAnimations'

export default function Contact() {
  const sectionRef = useRef(null)
  const isNearViewport = useNearViewport(sectionRef)

  useContactAnimations({ sectionRef, isNearViewport })

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="theme-section scroll-mt-16 flex min-h-screen items-center justify-center"
    >
      <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 pt-6 pb-0 sm:px-6 sm:pt-8 sm:pb-0 lg:grid-cols-[0.74fr_1.26fr] lg:items-center">
        <ContactProfileCard />
        <ContactForm />
      </div>
    </section>
  )
}
