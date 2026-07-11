export default function ExperienceCard({ exp }) {
  return (
    <div className="exp-item exp-work-item group relative">
      <div className="exp-content">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <h3 className="font-display text-2xl font-bold uppercase tracking-[0.08em] text-slate-100 transition-colors duration-300 group-hover:text-white md:text-3xl">
            {exp.role}
          </h3>
          <span className="exp-duration shrink-0 text-sm font-mono uppercase tracking-[0.18em] text-slate-400 transition-colors duration-300 group-hover:text-slate-200">
            {exp.duration}
          </span>
        </div>
        <hr className="mt-5 border-0 border-t border-white/10 transition-colors duration-300 group-hover:border-white/16" />

        <p className="py-5 text-sm font-mono uppercase tracking-[0.18em] text-[#ff5a7a] transition-colors duration-300 group-hover:text-[#ff7892] md:text-base">
          {exp.company}
        </p>
        <hr className="border-0 border-t border-white/10 transition-colors duration-300 group-hover:border-white/16" />

        <div>
          {exp.contributions?.map((item, itemIndex) => (
            <div key={itemIndex}>
              <div className="group/point flex items-start gap-5 py-5 text-left text-sm leading-7 text-slate-300 transition-[color,transform] duration-300 hover:translate-x-2 hover:text-white md:text-base">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#DC143C] transition-[background-color,box-shadow,transform] duration-300 group-hover/point:scale-125 group-hover/point:bg-[#ff4d73] group-hover/point:shadow-[0_0_16px_rgba(220,20,60,0.55)]" />
                <p className="">{item}</p>
              </div>
              <hr className="border-0 border-t border-white/10 transition-colors duration-300 group-hover:border-white/16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
