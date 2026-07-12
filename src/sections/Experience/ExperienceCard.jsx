export default function ExperienceCard({ exp }) {
  return (
    <div className="exp-item exp-work-item group relative border-l-2 border-transparent pl-6 -ml-6 transition-all duration-300 ease-out hover:border-[#DC143C]/40">
      <div className="exp-content transition-transform duration-300 ease-out group-hover:translate-x-2">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <h3 className="font-display text-2xl font-bold uppercase tracking-[0.08em] text-slate-100 transition-colors duration-300 group-hover:text-[#DC143C] md:text-3xl">
            {exp.role}
          </h3>
          <span className="exp-duration shrink-0 text-sm font-mono uppercase tracking-[0.18em] text-slate-400 transition-colors duration-300 group-hover:text-slate-200">
            {exp.duration}
          </span>
        </div>
        <hr className="mt-5 border-0 border-t border-white/10 transition-colors duration-300 group-hover:border-white/20" />

        <p className="py-5 text-sm font-mono uppercase tracking-[0.18em] text-[#ff5a7a] transition-colors duration-300 group-hover:text-[#ff385c] md:text-base">
          {exp.company}
        </p>
        <hr className="border-0 border-t border-white/10 transition-colors duration-300 group-hover:border-white/20" />

        <div>
          {exp.contributions?.map((item, itemIndex) => (
            <div key={itemIndex}>
              <div className="flex items-start gap-5 py-5 text-left text-sm leading-7 text-slate-300 md:text-base">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#DC143C] transition-all duration-300 group-hover:scale-125 group-hover:bg-[#ff385c] group-hover:shadow-[0_0_8px_#DC143C]" />
                <p className="transition-colors duration-300 group-hover:text-slate-200">{item}</p>
              </div>
              <hr className="border-0 border-t border-white/10 transition-colors duration-300 group-hover:border-white/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
