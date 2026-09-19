'use client';

import { useSyncExternalStore } from 'react';

const formatBdTime = () =>
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date());

function subscribeBdTime(callback: () => void) {
  const timer = window.setInterval(callback, 30000);
  return () => window.clearInterval(timer);
}

export default function Footer() {
  const bdTime = useSyncExternalStore(
    subscribeBdTime,
    formatBdTime,
    () => null // Server-side snapshot to avoid SSR hydration mismatch
  );

  return (
    <footer className="border-t border-white/8 bg-[#040404] pt-4 pb-24 sm:py-4 text-center text-xs text-slate-400 sm:text-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-4 md:flex-row">
        <p className="shrink-0 font-mono">
          &copy; {new Date().getFullYear()} Millat Hossain. All rights reserved.
        </p>

        <p className="shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slate-500 sm:text-xs">
          BD Local {bdTime ?? '—'}
        </p>
      </div>
    </footer>
  );
}
