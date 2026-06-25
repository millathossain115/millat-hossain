export default function ProjectCard({ project }) {
  return (
    <div
      data-project-card
      className="theme-card group flex h-full flex-col justify-between rounded-[1.5rem] p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_32px_64px_rgba(0,0,0,0.5),0_0_32px_rgba(220,20,60,0.1)]"
    >
      <div>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-semibold uppercase tracking-[0.04em] text-slate-100 transition-colors duration-300 group-hover:text-[#DC143C]">
            {project?.title || 'Project Title'}
          </h3>
          {project?.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-slate-500 transition-all duration-300 hover:scale-110 hover:text-[#DC143C]"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          )}
        </div>

        {/* Subtle divider that animates in on hover */}
        <div className="mb-4 h-px w-0 bg-gradient-to-r from-[#DC143C]/40 to-transparent transition-all duration-500 group-hover:w-full" />

        <p className="mb-6 text-sm leading-relaxed text-slate-400">
          {project?.description || 'Project description goes here.'}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        {project?.tags?.map((tag) => (
          <span
            key={tag}
            className="theme-chip rounded-full px-3 py-1 text-xs font-mono transition-all duration-300 group-hover:border-[#DC143C]/30"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
