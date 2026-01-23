'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';

import { FiArrowUpRight, FiEye } from "react-icons/fi";

import { BorderBeam } from '@/components/ui/border-beam';

export interface Project {
  title: string;
  description: string;
  images: string[];
  techStack: string[];
  type: 'Frontend' | 'Backend' | 'Full Stack' | 'All';
  liveLink: string;
  frontendRepo?: string;
  backendRepo?: string;
  challenges?: string;
  futurePlans?: string;
}

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const memoProject = useMemo(() => project, [project]);

  return (
    <div className="relative border border-primary/30 rounded-lg p-4 overflow-hidden shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
      
      {/* Border Beam */}
      <BorderBeam size={32} duration={8} className="absolute top-0 left-0" />

      {/* Media */}
      <div className="overflow-hidden rounded-lg relative w-full aspect-[16/9] mb-3">
        <Image
          src={memoProject.images?.[0] ?? '/fallback-image.jpg'}
          alt={memoProject.title}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-lg transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
          placeholder="blur"
          blurDataURL="/fallback-image-blur.jpg"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        
        {/* Title */}
        <h3 className="font-medium text-base-content leading-snug text-base md:text-lg">
          {memoProject.title}
        </h3>

        {/* Meta (Type) */}
        <p className="text-xs text-base-content/50">
          {memoProject.type}
        </p>

        {/* Description */}
        <p className="text-sm text-base-content/80 leading-relaxed">
          {memoProject.description.length > 120
            ? `${memoProject.description.slice(0, 120)}...`
            : memoProject.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {memoProject.techStack.slice(0, 3).map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="text-xs text-base-content/60 rounded-full px-2 bg-base-300 py-0"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between text-sm">
          <a
            href={memoProject.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-base-content/80 hover:text-primary transition"
          >
            <FiArrowUpRight size={14} /> Live
          </a>

          <button
            onClick={() => onOpenModal(memoProject)}
            aria-label={`View details for ${memoProject.title}`}
            className="inline-flex items-center gap-1 text-base-content/80 hover:text-primary transition"
          >
            <FiEye size={14} /> Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
