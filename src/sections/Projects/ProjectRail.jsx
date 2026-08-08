import ProjectCard from '../../components/ProjectCard'

export default function ProjectRail({ projects, trackRef }) {
  return (
    <div className="projects-rail w-full overflow-x-hidden motion-reduce:overflow-x-auto">
      <div
        ref={trackRef}
        className="proj-track flex w-max gap-5 pr-6 will-change-transform sm:gap-6"
      >
        {projects.map((project) => (
          <div
            key={project.title}
            className="proj-card-shell w-[84vw] max-w-[30.5rem] shrink-0"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  )
}
