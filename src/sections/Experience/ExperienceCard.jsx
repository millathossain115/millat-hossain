export default function ExperienceCard({ exp }) {
  return (
    <div className="exp-item exp-work-item relative border-l-2 border-[#DC143C]/40 pl-6 lg:pl-12 -ml-6 transition-all duration-300 ease-out">
      <div className="exp-content transition-transform duration-300 ease-out translate-x-2 lg:pl-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <h3 className="font-display text-2xl font-bold uppercase tracking-[0.08em] text-[#DC143C] transition-colors duration-300 md:text-3xl">
            {exp.role}
          </h3>
          <span className="exp-duration shrink-0 text-sm font-mono uppercase tracking-[0.18em] text-slate-200 transition-colors duration-300">
            {exp.duration}
          </span>
        </div>
        <hr className="mt-5 border-0 border-t border-white/20 transition-colors duration-300" />

        <p className="py-5 text-sm font-mono uppercase tracking-[0.18em] text-[#ff385c] transition-colors duration-300 md:text-base">
          {exp.company}
        </p>
        <hr className="border-0 border-t border-white/20 transition-colors duration-300" />

        <div>
          {exp.contributions?.map((item, itemIndex) => (
            <div key={itemIndex}>
              <div className="flex items-start gap-5 py-5 text-left text-sm leading-7 text-slate-200 md:text-base">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ff385c] scale-125 shadow-[0_0_8px_#DC143C] transition-all duration-300" />
                <p className="transition-colors duration-300">{item}</p>
              </div>
              <hr className="border-0 border-t border-white/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
