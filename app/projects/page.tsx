'use client';

import React, { useMemo, useState, useCallback } from "react";

import { FiEye } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

import projectsData from "../../data/projects.json";
import ProjectModal from "@/components/projects/ProjectModal";
import Image from "next/image";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  images: string[];
  techStack: string[];
  type: "Frontend" | "Backend" | "Full Stack" | "All";
  liveLink: string;
  frontendRepo?: string;
  backendRepo?: string;
  challenges?: string;
  futurePlans?: string;
}

type FilterType = "All" | "Frontend" | "Backend" | "Full Stack";

const AllProjectsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<FilterType>("All");

  const projects = useMemo(() => projectsData as Project[], []);

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedProject(null);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(
      (project) => filter === "All" || project.type === filter
    );
  }, [filter, projects]);

  return (
    <>
      <section className="font-geist text-base-content mx-auto pt-20 max-w-3xl">
        <div className="rounded-lg p-4 backdrop-blur-sm">

          {/* Header */}
          <div className="m-4">
            
            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
              Projects 
            </h1>
           <p className="text-base mt-2 mb-0 text-base-content/75">
  I’ve worked on both commercial and personal projects, including course-related work. You can explore them all here. While you’re visiting, feel free to check out my{" "}
  <Link href="/blog" className=" underline underline-offset-4 hover:text-primary">
    blog
  </Link>
  , where I write about technology, learning, and memes.
</p>
  </div>

          {/* Filters */}
          <div className="flex justify-center gap-4 my-4 flex-wrap ">
            {(["All", "Frontend", "Backend", "Full Stack"] as FilterType[]).map(
              (type) => (
               
                <button
  key={type}
  onClick={() => setFilter(type)}
  className={`text-sm transition-all duration-200 cursor-pointer
    ${
      filter === type
        ? "text-primary underline underline-offset-6 decoration-2"
        : "text-base-content/70 hover:text-primary"
    }`}
>
  {type}
</button>

              )
            )}
          </div>

          <div className="h-px bg-base-content/10 mb-4" /> 

          {/* Projects */}
          <div className="space-y-2">
            {filteredProjects.map((project, index) => (
              <article
                key={project.title}
                className="group rounded-md px-4 py-4 sm:py-6
                           transition-colors "
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image */}
                  <div className="relative hidden sm:block w-[250px] aspect-[16/9] overflow-hidden rounded-lg">
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      sizes="250px"
                      priority={index === 0}
                      className="object-cover transition-transform duration-300 "
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-base font-medium">
                        {project.title}
                      </h3>

                      <p className="mt-1 text-sm text-base-content/70 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.techStack.map((tech, i) => (
                          <span
                            key={`${tech}-${i}`}
                            className="px-2 py-[2px] text-xs rounded-full
                                       border border-primary/30 bg-base-100"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4 mt-4 text-sm">
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1
                                   hover:text-primary underline-offset-6
                                    hover:underline"
                      >
                        <FiArrowUpRight size={14} /> Live
                      </a>

                      {project.frontendRepo && (
                        <a
                          href={project.frontendRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1
                                     hover:text-primary underline-offset-6
                                     hover:underline"
                        >
                          <FaGithub size={14} /> Frontend
                        </a>
                      )}

                      {project.backendRepo && (
                        <a
                          href={project.backendRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1
                                     hover:text-primary underline-offset-6
                                     hover:underline"
                        >
                          <FaGithub size={14} /> Backend
                        </a>
                      )}

                      <button
                        onClick={() => openModal(project)}
                        className="inline-flex items-center gap-1
                                   hover:text-primary underline-offset-6
                                   hover:underline"
                      >
                        <FiEye size={14} /> Details
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Footer note */}
          <div className="m-4 mt-6">
            <p className="text-sm text-base-content/60">
              More work available on{" "}
              <Link
                href="https://github.com/mehedi-hasan1102"
                target="_blank"
                className="font-medium  hover:text-primary text-base-content/60
                           underline underline-offset-6 "
              >
                GitHub
              </Link>.
            </p>
          </div>
        </div>
      </section>

      <ProjectModal
        showModal={showModal}
        selectedProject={selectedProject}
        closeModal={closeModal}
      />
    </>
  );
};

export default AllProjectsPage;
