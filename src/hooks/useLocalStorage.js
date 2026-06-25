import { useState, useEffect } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const jsonValue = localStorage.getItem(key)
      if (jsonValue != null) return JSON.parse(jsonValue)
    } catch (e) {
      console.error(e)
    }

    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error(e)
    }
  }, [key, value])

  return [value, setValue]
}
