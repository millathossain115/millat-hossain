import { useCallback, useEffect, useState } from 'react'
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
  const [isWelcomeExpanding, setIsWelcomeExpanding] = useState(false)
  const [isLoaderVisible, setIsLoaderVisible] = useState(true)
  const handleRevealStart = useCallback(() => setIsWelcomeExpanding(true), [])
  const handleLoaderComplete = useCallback(() => setIsLoaderVisible(false), [])

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (isLoaderVisible) {
      return undefined
    }

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
  }, [isLoaderVisible])

  const appStateClass = isLoaderVisible
    ? isWelcomeExpanding
      ? 'app-reveal app-reveal--under-loader'
      : 'app-pre-reveal'
    : 'app-reveal app-reveal--under-loader'

  return (
    <div className="app-shell font-ui min-h-screen text-slate-100">
      {isLoaderVisible && (
        <Loader
          onRevealStart={handleRevealStart}
          onComplete={handleLoaderComplete}
        />
      )}

      <div className={appStateClass}>
        <Navbar />
        <main className="flex-grow">
          <Hero isIntroReady={isWelcomeExpanding || !isLoaderVisible} />
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
