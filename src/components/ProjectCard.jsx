export default function ProjectCard({ project }) {
  const visibleTags = project?.tags?.slice(0, 3) || []
  const remainingTags = Math.max((project?.tags?.length || 0) - 3, 0)
  const primaryLink = project?.live || project?.github

  return (
    <article
      data-project-card
      className="theme-card group relative isolate aspect-square w-full overflow-hidden rounded-[1.35rem] p-0 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#DC143C]/30 hover:shadow-[0_28px_70px_rgba(0,0,0,0.55),0_0_38px_rgba(220,20,60,0.12)]"
    >
      <div className="relative h-[47%] overflow-hidden border-b border-white/[0.08] bg-[#09090b]">
        {project?.image ? (
          <img
            src={project.image}
            alt={`${project.title} project banner`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover brightness-[0.68] transition duration-700 ease-out group-hover:scale-[1.045] group-hover:brightness-[0.78] group-hover:saturate-[1.08]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_78%_24%,rgba(220,20,60,0.24),transparent_34%),linear-gradient(145deg,#151116_0%,#08090b_62%,#16070b_100%)]"
          >
            <span className="font-display absolute -bottom-5 right-3 text-[7.5rem] font-semibold leading-none tracking-[-0.08em] text-white/[0.035] transition-all duration-700 group-hover:-translate-x-2 group-hover:text-[#DC143C]/[0.09]">
              {project?.monogram || 'PX'}
            </span>
            <div className="absolute left-6 top-1/2 h-px w-14 bg-[#DC143C]/70 transition-all duration-500 group-hover:w-24" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/70" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-5">
          <span className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white/65">
            {project?.category || 'Selected Project'}
          </span>
          {project?.live && (
            <span className="flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/75">
              <span className="h-1.5 w-1.5 rounded-full bg-[#DC143C] shadow-[0_0_10px_rgba(220,20,60,0.9)]" />
              {project.liveLabel || 'Live'}
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="mb-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#ff496d]">
            {project?.focus || 'Product Engineering'}
          </p>
          <h3 className="font-display max-w-[18rem] text-[1.35rem] font-semibold uppercase leading-[1.02] tracking-[0.035em] text-white transition-colors duration-300 group-hover:text-[#DC143C] sm:text-[1.45rem]">
            {project?.title || 'Project Title'}
          </h3>
        </div>
      </div>

      <div className="flex h-[53%] flex-col p-5">
        <p className="line-clamp-3 text-[0.78rem] leading-[1.65] text-slate-400 transition-colors duration-300 group-hover:text-slate-300 sm:text-[0.82rem]">
          {project?.description || 'Project description goes here.'}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.09] bg-white/[0.025] px-2.5 py-1 font-mono text-[0.58rem] text-slate-400 transition-colors duration-300 group-hover:border-[#DC143C]/25 group-hover:text-slate-300"
            >
              {tag}
            </span>
          ))}
          {remainingTags > 0 && (
            <span className="font-mono text-[0.58rem] text-slate-600">
              +{remainingTags}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-white/[0.07] pt-3.5">
          {primaryLink ? (
            <a
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} ${project.live ? project.liveLabel || 'live site' : 'on GitHub'}`}
              className="group/link flex items-center gap-2 font-ui text-[0.65rem] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:text-[#ff496d]"
            >
              {project?.live ? project.liveLabel || 'View live' : 'View source'}
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17 17 7M8 7h9v9"
                />
              </svg>
            </a>
          ) : (
            <span />
          )}

          {project?.github && project?.live && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} source code on GitHub`}
              className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-slate-500 transition-colors duration-300 hover:text-white"
            >
              Source
              <svg
                aria-hidden="true"
                className="h-[1.05rem] w-[1.05rem]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
