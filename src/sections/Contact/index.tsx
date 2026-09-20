'use client';

import { useRef } from 'react';
import ContactForm from './ContactForm';
import ContactProfileCard from './ContactProfileCard';
import useContactAnimations from './useContactAnimations';
import './Contact.css';

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useContactAnimations({ sectionRef });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="theme-section scroll-mt-16 flex min-h-screen items-center justify-center px-5 py-16 sm:px-6 sm:py-24"
    >
      <div className="relative mx-auto grid w-full max-w-2xl gap-10 md:gap-12 lg:max-w-6xl lg:grid-cols-[0.74fr_1.26fr] lg:items-center">
        <ContactProfileCard />
        <ContactForm />
      </div>
    </section>
  );
}
