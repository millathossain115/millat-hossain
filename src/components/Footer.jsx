export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#040404] py-8 text-center text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center not-last-of-type:gap-4 px-4 md:flex-row">
        <div>
          &copy; {new Date().getFullYear()} Millat Hossain. All rights reserved.

        </div>
      </div>
    </footer>
  )
}
