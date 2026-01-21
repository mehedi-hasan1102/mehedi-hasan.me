'use client';

import React, { useState } from "react";
import projectsData from "@/data/projects.json";
import ProjectCard, { Project } from "@/components/projects/ProjectCard";
import ProjectModal from "@/components/projects/ProjectModal";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const ProjectsHomePage: React.FC = () => {
  const projects: Project[] = projectsData as Project[];
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const displayedProjects = projects.slice(0, 6);

  return (
    <>
      <section className="max-w-3xl mx-auto px-4 text-base-content font-geist">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-lg font-semibold tracking-tight">
            Projects
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
          {displayedProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onOpenModal={openModal}
            />
          ))}
        </div>

        {/* Footer link */}
        <div className="py-6 text-center">
          <Link
            href="/projects"
            className="
              inline-flex items-center gap-1
              text-sm font-medium
              hover:text-primary
            "
          >
            See all projects
            <ChevronDown size={14} />
          </Link>
        </div>
      </section>

      {/* Modal */}
      <ProjectModal
        showModal={showModal}
        selectedProject={selectedProject}
        closeModal={closeModal}
      />
    </>
  );
};

export default ProjectsHomePage;
