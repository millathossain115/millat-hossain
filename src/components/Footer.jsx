export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#040404] py-8 text-center text-sm text-slate-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div>
          &copy; {new Date().getFullYear()} Millat Hossain. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#DC143C]">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#DC143C]">LinkedIn</a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#DC143C]">Twitter</a>
        </div>
      </div>
    </footer>
  )
}
