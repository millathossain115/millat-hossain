import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Education from './sections/Education'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [progress, setProgress] = useState(0)
  const [isLoaderComplete, setIsLoaderComplete] = useState(false)
  const [isWelcomeExpanding, setIsWelcomeExpanding] = useState(false)
  const [isLoaderVisible, setIsLoaderVisible] = useState(true)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(intervalId)
          return 100
        }

        const increment = current < 65 ? 4 : current < 88 ? 2 : 1
        return Math.min(current + increment, 100)
      })
    }, 45)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (progress < 100) {
      return undefined
    }

    const completeTimeoutId = window.setTimeout(() => {
      setIsLoaderComplete(true)
    }, 140)

    const expandTimeoutId = window.setTimeout(() => {
      setIsWelcomeExpanding(true)
    }, 1080)

    const hideTimeoutId = window.setTimeout(() => {
      setIsLoaderVisible(false)
    }, 2480)

    return () => {
      window.clearTimeout(completeTimeoutId)
      window.clearTimeout(expandTimeoutId)
      window.clearTimeout(hideTimeoutId)
    }
  }, [progress])

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.1,
      wheelMultiplier: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    })

    window.lenis = lenis

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const update = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  const appStateClass = isLoaderVisible
    ? isWelcomeExpanding
      ? 'app-reveal app-reveal--under-loader'
      : 'opacity-0 scale-[1.015] blur-[8px]'
    : 'app-reveal'

  return (
    <div className="font-ui min-h-screen bg-[#020202] text-slate-100 selection:bg-[#DC143C]/25 selection:text-white">
      {isLoaderVisible && (
        <Loader
          progress={progress}
          isComplete={isLoaderComplete}
          isWelcomeExpanding={isWelcomeExpanding}
        />
      )}

      <div className={appStateClass}>
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <Education />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
