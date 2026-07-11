import { useEffect, useState } from 'react'

const formatBdTime = () =>
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date())

export default function Footer() {
  const [bdTime, setBdTime] = useState(formatBdTime)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBdTime(formatBdTime())
    }, 30000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <footer className="border-t border-white/8 bg-[#040404] py-4 text-center text-xs text-slate-400 sm:text-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-4 md:flex-row">
        <p className="shrink-0 font-mono">   
          &copy; {new Date().getFullYear()} Millat Hossain. All rights reserved.
        </p>

        <p className="shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slate-500 sm:text-xs">
          BD Local {bdTime}
        </p>
      </div>
    </footer>
  )
}
