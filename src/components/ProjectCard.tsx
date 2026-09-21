import Image from 'next/image';
import { Project } from '@/constants';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const visibleTags = project?.tags?.slice(0, 3) || [];
  const remainingTags = Math.max((project?.tags?.length || 0) - 3, 0);
  const isConcept = project?.status === 'concept';
  const primaryLink = isConcept ? null : project?.live || project?.github;

  return (
    <article
      data-project-card
      className="proj-glass-card proj-card-shell group relative isolate flex flex-col h-auto sm:aspect-square w-[84vw] max-w-[30.5rem] shrink-0 overflow-hidden rounded-[1.5rem] p-0 cursor-default"
    >
      {/* Liquid light reflection sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-full top-0 z-30 h-full w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] transition-all duration-700 ease-out group-hover:left-full"
      />

      {/* Ambient crimson glow accent from skills card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,_rgba(220,20,60,0.22),_transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Top Banner & Visual Area */}
      <div className="relative min-h-[11rem] sm:h-[47%] overflow-hidden">
        {project?.image ? (
          typeof project.image === 'string' ? (
            <img
              src={project.image}
              alt={`${project.title} project banner`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover brightness-[0.72] transition duration-700 ease-out group-hover:scale-[1.045] group-hover:brightness-[0.82] group-hover:saturate-[1.08]"
            />
          ) : (
            <Image
              src={project.image}
              alt={`${project.title} project banner`}
              placeholder="blur"
              className="h-full w-full object-cover brightness-[0.72] transition duration-700 ease-out group-hover:scale-[1.045] group-hover:brightness-[0.82] group-hover:saturate-[1.08]"
            />
          )
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden"
          >
            <span className="font-display absolute -bottom-5 right-3 text-[7.5rem] font-semibold leading-none tracking-[-0.08em] text-white/[0.035] transition-all duration-700 group-hover:-translate-x-2 group-hover:text-[#DC143C]/[0.09]">
              {project?.monogram || 'PX'}
            </span>
            <div className="absolute left-6 top-1/2 h-px w-14 bg-[#DC143C]/70 transition-all duration-500 group-hover:w-24" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/20" />

        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 p-5 sm:p-6 lg:p-7">
          <span className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white/70 sm:text-[0.68rem] lg:text-[0.72rem]">
            {project?.category || 'Selected Project'}
          </span>
          {(isConcept || project?.live) && (
            <span className="flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/80 sm:text-[0.62rem] lg:text-[0.68rem]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#DC143C] shadow-[0_0_10px_rgba(220,20,60,0.95)]" />
              {isConcept ? 'Concept Study' : project.liveLabel || 'Live'}
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6 lg:p-7">
          <p className="mb-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#ff496d] sm:text-[0.68rem] lg:text-[0.72rem]">
            {project?.focus || 'Product Engineering'}
          </p>
          <h3 className="font-display max-w-[22rem] text-[1.4rem] font-semibold uppercase leading-[1.02] tracking-[0.035em] text-white transition-colors duration-300 group-hover:text-[#DC143C] sm:text-[1.55rem] lg:text-[1.75rem]">
            {project?.title || 'Project Title'}
          </h3>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-20 flex flex-1 flex-col p-5 sm:h-[53%] sm:p-6 lg:p-7">
        <p className="line-clamp-3 text-[0.8rem] leading-[1.65] text-slate-300 transition-colors duration-300 group-hover:text-slate-100 sm:text-[0.85rem] lg:text-[0.92rem]">
          {project?.description || 'Project description goes here.'}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/[0.05] px-2.5 py-1 font-mono text-[0.58rem] text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-colors duration-300 group-hover:bg-[#DC143C]/15 group-hover:text-white sm:text-[0.62rem] lg:text-[0.68rem]"
            >
              {tag}
            </span>
          ))}
          {remainingTags > 0 && (
            <span className="font-mono text-[0.58rem] text-slate-400 sm:text-[0.62rem] lg:text-[0.68rem]">
              +{remainingTags}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between pt-3.5 sm:pt-4 lg:pt-5">
          {primaryLink ? (
            <a
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} ${project.live ? project.liveLabel || 'live site' : 'on GitHub'}`}
              className="group/link flex items-center gap-2 font-ui text-[0.65rem] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:text-[#ff496d] sm:text-[0.7rem] lg:text-[0.78rem]"
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
            <span className="font-ui text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[#ff6f8b] sm:text-[0.7rem] lg:text-[0.78rem]">
              Concept Study
            </span>
          )}

          {!isConcept && project?.github && project?.live && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} source code on GitHub`}
              className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-slate-400 transition-colors duration-300 hover:text-white sm:text-[0.65rem] lg:text-[0.7rem]"
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
  );
}
