import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from 'react-icons/fa'
import profileImg from '../assets/Image/about-profile.webp'
import Button from '../components/Button'
import useNearViewport from '../hooks/useNearViewport'

gsap.registerPlugin(ScrollTrigger)

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/millathossain115',
    icon: FaGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/millathossain115/',
    icon: FaLinkedinIn,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/millathossain115',
    icon: FaFacebookF,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/8801948257217',
    icon: FaWhatsapp,
  },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const isNearViewport = useNearViewport(sectionRef)
  const [submitState, setSubmitState] = useState({
    status: 'idle',
    message: '',
  })

  useEffect(() => {
    if (!isNearViewport) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const card = sectionRef.current.querySelector('.contact-profile-card')
      const content = sectionRef.current.querySelector('.contact-form-shell')
      const formItems = sectionRef.current.querySelectorAll('.contact-form-item')

      if (card) {
        gsap.fromTo(
          card,
          { x: -80, opacity: 0, rotateY: -10 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 45%',
              scrub: true,
            },
          },
        )
      }

      if (content) {
        gsap.fromTo(
          content,
          { x: 40 },
          {
            x: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: content,
              start: 'top 85%',
              end: 'top 42%',
              scrub: true,
            },
          },
        )
      }

      if (formItems.length) {
        gsap.fromTo(
          formItems,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current.querySelector('.contact-form-grid'),
              start: 'top 88%',
              end: 'top 52%',
              scrub: true,
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isNearViewport])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    setSubmitState({ status: 'sending', message: 'Sending your message...' })

    const formData = new FormData(form)
    const name = formData.get('name')?.toString().trim() ?? ''
    const email = formData.get('email')?.toString().trim() ?? ''
    const message = formData.get('message')?.toString().trim() ?? ''

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/millathossain115@gmail.com',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: `Portfolio inquiry from ${name || 'a visitor'}`,
            _replyto: email,
            _captcha: 'false',
          }),
        },
      )

      const data = await response.json().catch(() => ({}))

      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Unable to send your message right now.')
      }

      form.reset()
      setSubmitState({
        status: 'success',
        message: 'Message sent successfully. I will get back to you soon.',
      })
    } catch (error) {
      setSubmitState({
        status: 'error',
        message:
          error.message ||
          'Something went wrong while sending your message. Please try again.',
      })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="theme-section scroll-mt-16 px-0 py-0"
    >
      <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-center">
        <aside className="contact-profile-card relative mx-auto w-full max-w-[20rem] overflow-hidden rounded-[1.75rem] border border-[#DC143C]/45 bg-[linear-gradient(180deg,rgba(40,11,11,0.92),rgba(26,10,10,0.9))] p-5 shadow-[0_26px_80px_rgba(0,0,0,0.45)] sm:p-6">
          <div className="absolute -left-12 -top-14 h-40 w-40 rounded-full border-4 border-dashed border-[#ff4d73]/60" />
          <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full border-4 border-dashed border-[#ff4d73]/60" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(220,20,60,0.08),transparent_32%,rgba(255,255,255,0.02)_100%)]" />

          <div className="relative flex h-full flex-col">
            <div className="group relative mx-auto mb-5 w-full max-w-[14rem] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0b0b0b]">
              <img
                src={profileImg}
                alt="Millat Hossain"
                width="960"
                height="1280"
                loading="lazy"
                decoding="async"
                className="relative aspect-[4/5.2] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04] group-hover:-translate-y-1"
              />
            </div>

            <div className="mb-6">
              <p className="mx-auto max-w-[13rem] text-center font-display text-[1.55rem] font-semibold leading-none text-[#DC143C] sm:max-w-[14rem] sm:text-[1.8rem]">
                Millat Hossain
              </p>
            </div>

            <p className="mx-auto max-w-[13rem] text-base text-center font-medium leading-[1.2] text-slate-200/88 sm:max-w-[14rem] sm:text-[1.45rem] sm:leading-[1.06]">
              A software engineer focused on building clean, high-impact digital
              experiences.
            </p>

            <div className="mt-auto flex flex-wrap justify-center gap-3 pt-8">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ff4d73]/40 bg-black/10 text-lg text-[#ff4d73] transition-all duration-300 hover:-translate-y-1 hover:border-[#ff819c] hover:text-white hover:shadow-[0_12px_30px_rgba(220,20,60,0.24)]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </aside>

        <div className="contact-form-shell flex flex-col justify-center py-4 lg:pl-4">
          <div className="mb-8 space-y-4">
            <h2 className="contact-title font-display text-[2.7rem] font-semibold uppercase leading-[0.9] text-white sm:text-[3.7rem] lg:text-[4.8rem]">
              <span className="block overflow-hidden">
                <span className="contact-title-line block">Let's</span>
              </span>
              <span className="block overflow-hidden">
                <span className="contact-title-line block bg-[linear-gradient(180deg,#ff6a70_0%,#dc143c_55%,#ff2f47_100%)] bg-clip-text text-transparent">
                  Connect
                </span>
              </span>
            </h2>

            <p className="max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Share your idea, collaboration plan, or a quick hello and I&apos;ll
              respond through email.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form-grid grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="contact-form-item grid gap-3">
                <span className="text-sm font-medium text-slate-300">Name</span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="min-h-13 rounded-[1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(40,40,40,0.92),rgba(32,32,32,0.95))] px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-[#DC143C]/75 focus:shadow-[0_0_0_1px_rgba(220,20,60,0.18),0_0_28px_rgba(220,20,60,0.12)]"
                />
              </label>

              <label className="contact-form-item grid gap-3">
                <span className="text-sm font-medium text-slate-300">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="min-h-13 rounded-[1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(40,40,40,0.92),rgba(32,32,32,0.95))] px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-[#DC143C]/75 focus:shadow-[0_0_0_1px_rgba(220,20,60,0.18),0_0_28px_rgba(220,20,60,0.12)]"
                />
              </label>
            </div>

            <label className="contact-form-item grid gap-3">
              <span className="text-sm font-medium text-slate-300">Message</span>
              <textarea
                name="message"
                rows="6"
                required
                placeholder="Tell me about your project or idea"
                className="min-h-36 resize-none rounded-[1.15rem] border border-white/8 bg-[linear-gradient(180deg,rgba(40,40,40,0.92),rgba(30,30,30,0.96))] px-4 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-[#DC143C]/75 focus:shadow-[0_0_0_1px_rgba(220,20,60,0.18),0_0_28px_rgba(220,20,60,0.12)]"
              />
            </label>

            <div className="contact-form-item pt-2">
              <Button
                type="submit"
                disabled={submitState.status === 'sending'}
                className="min-h-13 w-full rounded-[1rem] text-sm font-semibold"
              >
                {submitState.status === 'sending' ? 'Sending...' : 'Send Message'}
              </Button>
              <p
                className={`mt-3 text-sm ${
                  submitState.status === 'success'
                    ? 'text-emerald-400'
                    : submitState.status === 'error'
                      ? 'text-[#ff7a94]'
                      : 'text-slate-500'
                }`}
              >
                {submitState.message ||
                  'Your message will be delivered to millathossain115@gmail.com.'}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
