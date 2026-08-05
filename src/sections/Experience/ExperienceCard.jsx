import { forwardRef } from 'react'

const ExperienceCard = forwardRef(function ExperienceCard({ exp }, ref) {
  return (
    <div ref={ref} className="exp-item exp-work-item relative">
      <div className="exp-content">
        <div className="exp-card-row flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <h3 className="font-display text-2xl font-bold uppercase tracking-[0.08em] text-[#DC143C] md:text-3xl">
            {exp.role}
          </h3>
          <span className="exp-duration shrink-0 text-sm font-mono uppercase tracking-[0.18em] text-slate-200">
            {exp.duration}
          </span>
        </div>
        <hr className="exp-card-rule mt-5 border-0 border-t border-white/20" />

        <p className="exp-card-row py-5 text-sm font-mono uppercase tracking-[0.18em] text-[#ff385c] md:text-base">
          {exp.company}
        </p>
        <hr className="exp-card-rule border-0 border-t border-white/20" />

        <div>
          {exp.contributions?.map((item, itemIndex) => {
            const isLastItem = itemIndex === exp.contributions.length - 1

            return (
              <div key={itemIndex}>
                <div className="exp-card-row flex items-start gap-5 py-5 text-left text-sm leading-7 text-slate-200 md:text-base">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ff385c]" />
                  <p>{item}</p>
                </div>
                {!isLastItem && (
                  <hr className="exp-card-rule border-0 border-t border-white/20" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
})

export default ExperienceCard
