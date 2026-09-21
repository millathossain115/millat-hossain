import { RefObject } from 'react';
import ProjectCard from '../../components/ProjectCard';
import { Project } from '@/constants';

interface ProjectRailProps {
  projects: Project[];
  trackRef: RefObject<HTMLDivElement | null>;
}

export default function ProjectRail({ projects, trackRef }: ProjectRailProps) {
  return (
    <div className="projects-rail w-full overflow-visible py-12 -my-12">
      <div
        ref={trackRef}
        className="proj-track flex w-max gap-5 pr-6 will-change-transform sm:gap-6 py-6"
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
