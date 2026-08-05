import { FaAward } from 'react-icons/fa'
import { FiCalendar, FiMapPin } from 'react-icons/fi'

export default function EducationCard({ edu, Icon }) {
  return (
    <div className="edu-item group relative pl-7 sm:pl-10">
      <div className="edu-dot absolute -left-[6px] top-6 z-10 h-3 w-3 rounded-full border-2 border-[#ff234d] bg-[#090909] shadow-[0_0_16px_rgba(220,20,60,0.65)]" />

      <div className="edu-content relative overflow-hidden rounded-xl border border-white/[0.09] bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_18px_48px_rgba(0,0,0,0.2)] transition-[border-color,background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[#DC143C]/35 hover:bg-black hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_22px_56px_rgba(0,0,0,0.26),0_0_28px_rgba(220,20,60,0.06)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DC143C]/45 to-transparent opacity-70" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full bg-[#DC143C]/[0.06] blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative p-4 sm:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
            <div className="flex min-w-0 items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#DC143C]/30 bg-[#DC143C]/[0.08] text-sm text-[#DC143C]"
              >
                <Icon />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-base font-semibold uppercase leading-tight tracking-[0.035em] text-slate-100 transition-colors duration-300 group-hover:text-white sm:text-lg">
                  {edu.degree}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.055em] text-[#DC143C] transition-colors duration-300 group-hover:text-[#ff5776] sm:text-sm">
                  {edu.institution}
                </p>
              </div>
            </div>

            <span className="edu-duration flex shrink-0 items-center gap-2 pl-10 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-slate-300 md:pl-0 md:pt-1">
              <FiCalendar
                aria-hidden="true"
                className="text-sm text-[#DC143C]"
              />
              {edu.duration}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:pl-10">
            {edu.location && (
              <p className="flex items-center gap-2 text-slate-400">
                <FiMapPin
                  aria-hidden="true"
                  className="shrink-0 text-sm text-[#DC143C]"
                />
                <span>{edu.location}</span>
              </p>
            )}
            {edu.group && (
              <p className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-slate-400">
                Group:{' '}
                <span className="font-medium text-[#DC143C]">{edu.group}</span>
              </p>
            )}
            {edu.CGPA && (
              <p className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-slate-400">
                CGPA:{' '}
                <span className="font-semibold text-[#DC143C]">{edu.CGPA}</span>
              </p>
            )}
          </div>

          {edu.achivement && (
            <p className="mt-3 flex items-start gap-2 border-t border-white/[0.07] pt-3 text-xs italic leading-5 text-slate-400 transition-colors duration-300 group-hover:text-slate-300 sm:ml-10">
              <FaAward
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-sm text-[#DC143C]"
              />
              <span>{edu.achivement}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
