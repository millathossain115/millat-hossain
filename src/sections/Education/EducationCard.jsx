import { FiAward, FiCalendar, FiMapPin } from 'react-icons/fi'

export default function EducationCard({ edu, Icon }) {
  return (
    <article className="edu-item relative border-b border-white/20 pb-8 last:border-b-0 last:pb-0">
      <div className="edu-content">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <span className="mb-4 flex items-center font-mono text-xs uppercase tracking-[0.24em] text-[#DC143C]">
              <Icon aria-hidden="true" className="text-sm" />
            </span>

            <h3 className="font-display text-2xl font-bold uppercase tracking-[0.08em] text-[#DC143C] md:text-3xl">
              {edu.degree}
            </h3>
          </div>

          <span className="edu-duration flex shrink-0 items-center gap-2 font-mono text-sm uppercase tracking-[0.18em] text-slate-200 md:pt-3">
            <FiCalendar aria-hidden="true" className="text-sm text-[#DC143C]" />
            {edu.duration}
          </span>
        </div>

        <hr className="edu-card-rule mt-5 border-0 border-t border-white/20" />

        <p className="py-5 text-sm font-mono uppercase tracking-[0.18em] text-[#ff385c] md:text-base">
          {edu.institution}
        </p>

        <hr className="edu-card-rule border-0 border-t border-white/20" />

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-5 text-xs uppercase tracking-[0.12em] text-slate-400">
          {edu.location && (
            <p className="flex items-center gap-2">
              <FiMapPin
                aria-hidden="true"
                className="shrink-0 text-sm text-[#DC143C]"
              />
              <span>{edu.location}</span>
            </p>
          )}
          {edu.group && (
            <span className="edu-meta">
              Group <strong>{edu.group}</strong>
            </span>
          )}
          {edu.CGPA && (
            <span className="edu-meta">
              CGPA <strong>{edu.CGPA}</strong>
            </span>
          )}
        </div>

        {edu.achivement && (
          <>
            <hr className="edu-card-rule border-0 border-t border-white/20" />

            <p className="flex items-start gap-3 py-5 text-sm leading-7 text-slate-300 md:text-base">
              <FiAward
                aria-hidden="true"
                className="mt-1 shrink-0 text-sm text-[#DC143C]"
              />
              <span>{edu.achivement}</span>
            </p>
          </>
        )}
      </div>
    </article>
  )
}
