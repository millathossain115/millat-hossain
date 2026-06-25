import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../components/Button'

gsap.registerPlugin(ScrollTrigger)

/** Splits element text into individual characters for stagger reveal */
function splitChars(el) {
  const text = el.innerText.trim()
  el.innerHTML = text
    .split('')
    .map((ch) =>
      ch === ' '
        ? '<span style="display:inline-block;width:0.28em"> </span>'
        : `<span class="gsap-char">${ch}</span>`,
    )
    .join('')
  return Array.from(el.querySelectorAll('.gsap-char'))
}

/** Splits element text into per-word <span> pairs for stagger reveal */
function splitWords(el) {
  const words = el.innerText.trim().split(/\s+/)
  el.innerHTML = words
    .map(
      (w) =>
        `<span class="gsap-word"><span class="gsap-word-inner">${w}</span></span>`,
    )
    .join(' ')
  return Array.from(el.querySelectorAll('.gsap-word-inner'))
}

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      /* ── Label fade in ── */
      const label = sectionRef.current.querySelector('.contact-label')
      if (label) {
        gsap.fromTo(
          label,
          { opacity: 0, y: 18, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            scrollTrigger: {
              trigger: label,
              start: 'top 90%',
              end: 'top 68%',
              scrub: 0.7,
            },
          },
        )
      }

      /* ── Heading: character-by-character stagger reveal ── */
      const headingEl = sectionRef.current.querySelector('.contact-heading')
      if (headingEl) {
        const chars = splitChars(headingEl)
        gsap.fromTo(
          chars,
          { y: '80%', opacity: 0, rotateX: 28, transformOrigin: 'center bottom' },
          {
            y: '0%',
            opacity: 1,
            rotateX: 0,
            stagger: 0.025,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingEl,
              start: 'top 86%',
              end: 'top 48%',
              scrub: 1,
            },
          },
        )
      }

      /* ── Paragraph: word-by-word reveal ── */
      const paraEl = sectionRef.current.querySelector('.contact-para')
      if (paraEl) {
        const words = splitWords(paraEl)
        gsap.fromTo(
          words,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: paraEl,
              start: 'top 88%',
              end: 'top 52%',
              scrub: 0.9,
            },
          },
        )
      }

      /* ── CTA Button: scale in with glow ── */
      const btnWrapper = sectionRef.current.querySelector('.contact-cta')
      if (btnWrapper) {
        gsap.fromTo(
          btnWrapper,
          { scale: 0.82, opacity: 0, filter: 'blur(12px)' },
          {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: btnWrapper,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 0.8,
            },
          },
        )
      }

      /* ── Glow orb parallax ── */
      const orb = sectionRef.current.querySelector('.contact-orb')
      if (orb) {
        gsap.to(orb, {
          yPercent: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="theme-section scroll-mt-16 px-6 py-32"
    >
      {/* Animated glow rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="contact-orb absolute h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(220,20,60,0.14)_0%,rgba(220,20,60,0)_70%)] contact-glow-ring" />
        <div className="absolute h-[20rem] w-[20rem] rounded-full border border-[#DC143C]/10 contact-glow-ring-2" />
        <div className="absolute h-[14rem] w-[14rem] rounded-full border border-[#DC143C]/08 contact-glow-ring" />
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <div
          className="contact-label mb-4 font-mono text-sm uppercase tracking-[0.3em] text-[#DC143C]"
        >
          04. What's Next?
        </div>

        <h2
          className="contact-heading font-display mb-6 text-4xl font-semibold uppercase text-white md:text-5xl"
          style={{ perspective: '600px' }}
        >
          Get In Touch
        </h2>

        <p className="contact-para mb-10 text-lg leading-relaxed text-slate-400">
          My inbox is always open. Whether you have a question, want to discuss a
          project, or just want to say hi, I'll do my best to get back to you!
        </p>

        <div className="contact-cta inline-block">
          <a href="mailto:millathossain115@gmail.com">
            <Button className="px-8 py-4 text-base uppercase tracking-[0.22em]">
              Say Hello
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
