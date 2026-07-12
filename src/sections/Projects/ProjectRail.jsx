import ProjectCard from '../../components/ProjectCard'

export default function ProjectRail({ projects, trackRef }) {
  return (
    <div className="w-full overflow-x-hidden motion-reduce:overflow-x-auto">
      <div
        ref={trackRef}
        className="proj-track flex w-max gap-5 pr-6 will-change-transform sm:gap-6"
        style={{
          paddingLeft: 'max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))',
        }}
      >
        {projects.map((project) => (
          <div key={project.title} className="w-[84vw] max-w-[30.5rem] shrink-0">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  )
}
