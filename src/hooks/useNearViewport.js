import { useEffect, useState } from 'react'

export default function useNearViewport(ref, rootMargin = '700px 0px') {
  const [isNearViewport, setIsNearViewport] = useState(
    () => typeof window !== 'undefined' && !('IntersectionObserver' in window),
  )

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return undefined
    }

    if (!('IntersectionObserver' in window)) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [ref, rootMargin])

  return isNearViewport
}
