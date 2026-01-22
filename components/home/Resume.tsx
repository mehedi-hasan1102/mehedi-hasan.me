'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { FiArrowUpRight, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import aboutDataJson from '@/data/resume.json';

/* ---------------- Types ---------------- */

interface ExperienceItem {
  title: string;
  time?: string;
  organization?: string;
  description?: string;
  profileLink?: string | null;
}

interface EducationItem {
  institution: string;
  degree: string;
  details?: string;
  credentialLink?: string | null;
}

interface AboutData {
  education: EducationItem[];
  experience: ExperienceItem[];
}

/* ---------------- Helpers ---------------- */

const initializeAboutData = (data: typeof aboutDataJson): AboutData => {
  const extractYear = (value?: string | null) =>
    parseInt(value?.match(/\d{4}/)?.[0] || '0', 10);

  return {
    education: [...data.education].sort(
      (a, b) => extractYear(b.details) - extractYear(a.details)
    ),
    experience: [...data.experience].sort(
      (a, b) => extractYear(b.time) - extractYear(a.time)
    ),
  };
};

/* ---------------- Shared Resume Item ---------------- */

const ResumeItem = ({
  title,
  subtitle,
  meta,
  description,
  link,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  description?: string;
  link?: string | null;
}) => {
  if (link) {
    return (
      <li className="space-y-1">
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block px-2 py-1"
        >
          {/* Title */}
          <p className="text-[15px] font-medium leading-snug tracking-tight text-base-content">
            {title}
          </p>

          {/* Subtitle + Arrow (underline only on hover if link exists) */}
          {subtitle && (
            <div className="mt-0.5 inline-flex items-center gap-1 text-sm text-base-content/70 group-hover:underline underline-offset-4">
              <span>{subtitle}</span>
              <FiArrowUpRight size={13} className="opacity-60" />
            </div>
          )}

          {/* Meta */}
          {meta && (
            <p className="mt-1 text-xs text-base-content/45">
              {meta}
            </p>
          )}

          {/* Description */}
          {description && (
            <p className="mt-2 text-sm text-base-content/60 leading-relaxed">
              {description}
            </p>
          )}
        </Link>
      </li>
    );
  }

  return (
    <li className="space-y-1">
      <div className="block px-2 py-1">
        {/* Title */}
        <p className="text-[15px] font-medium leading-snug tracking-tight text-base-content">
          {title}
        </p>

        {/* Subtitle + Arrow (underline only on hover if link exists) */}
        {subtitle && (
          <div className="mt-0.5 text-sm text-base-content/70">
            <span>{subtitle}</span>
          </div>
        )}

        {/* Meta */}
        {meta && (
          <p className="mt-1 text-xs text-base-content/45">
            {meta}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className="mt-2 text-sm text-base-content/60 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </li>
  );
};

/* ---------------- Component ---------------- */

export default function ResumeSections() {
  const aboutData = useMemo(() => initializeAboutData(aboutDataJson), []);
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);

  const visibleExperience = showAllExperience
    ? aboutData.experience
    : aboutData.experience.slice(0, 3);

  const visibleEducation = showAllEducation
    ? aboutData.education
    : aboutData.education.slice(0, 3);

  return (
    <section className="max-w-3xl mx-auto px-4 py-6 font-geist text-base-content">
      <div className="flex flex-col gap-12">

        {/* ================= Experience ================= */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">
            Experience
          </h2>

          <ul className="space-y-6">
            {visibleExperience.map((item) => (
              <ResumeItem
                key={`${item.title}-${item.organization}`}
                title={item.title}
                subtitle={item.organization}
                meta={item.time}
                description={item.description}
                link={item.profileLink}
              />
            ))}
          </ul>

          {aboutData.experience.length > 3 && (
            <button
              className="mt-6 cursor-pointer mx-auto flex items-center gap-2 text-sm hover:text-primary transition-colors"
              onClick={() => setShowAllExperience((p) => !p)}
            >
              {showAllExperience ? 'See less' : 'See more'}
              {showAllExperience ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
            </button>
          )}
        </div>

        {/* ================= Education ================= */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">
            Education
          </h2>

          <ul className="space-y-6">
            {visibleEducation.map((edu) => (
              <ResumeItem
                key={`${edu.institution}-${edu.degree}`}
                title={edu.institution}
                subtitle={edu.degree}
                meta={edu.details}
                link={edu.credentialLink}
              />
            ))}
          </ul>

          {aboutData.education.length > 3 && (
            <button
              className="mt-6 cursor-pointer mx-auto flex items-center gap-2 text-sm hover:text-primary transition-colors"
              onClick={() => setShowAllEducation((p) => !p)}
            >
              {showAllEducation ? 'See less' : 'See more'}
              {showAllEducation ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
            </button>
          )}
        </div>

      </div>
    </section>
  );
}
