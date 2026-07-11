import { useState } from 'react'
import Button from '../../components/Button'

export default function ContactForm() {
  const [submitState, setSubmitState] = useState({
    status: 'idle',
    message: '',
  })

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
  )
}
