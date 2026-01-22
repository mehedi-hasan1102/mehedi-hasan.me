'use client';

import React, { useMemo, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import aboutDataJson from "@/data/resume.json";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";


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
    parseInt(value?.match(/\d{4}/)?.[0] || "0", 10);

  return {
    education: [...data.education].sort(
      (a, b) => extractYear(b.details) - extractYear(a.details)
    ),
    experience: [...data.experience].sort(
      (a, b) => extractYear(b.time) - extractYear(a.time)
    ),
  };
};

/* ---------------- List Item ---------------- */

const ListItem = React.memo(
  ({
    title,
    subtitle,
    meta,
    description,
    link,
    linkLabel,
  }: {
    title: string;
    subtitle?: string;
    meta?: string;
    description?: string;
    link?: string | null;
    linkLabel?: string;
  }) => (
    <li className="space-y-1">
      <p className="font-medium text-base-content leading-snug">
        {title}
      </p>

      {subtitle && (
  <p className="text-sm text-base-content/80">
    {subtitle}
    {link && (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open link"
        className="inline-flex items-center gap-1 ml-1 text-base-content/70 hover:text-primary transition-colors"
      >
        <FiArrowUpRight size={13} />
      </a>
    )}
  </p>
)}

      {meta && (
        <p className="text-xs text-base-content/50">
          {meta}
        </p>
      )}

      {description && (
        <p className="text-sm text-base-content/60 leading-relaxed pt-1">
          {description}
        </p>
      )}

      {link && linkLabel && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline underline-offset-4 pt-1"
        >
          {linkLabel}
          <FiArrowUpRight size={14} />
        </a>
      )}
    </li>
  )
);

ListItem.displayName = "ListItem";

/* ---------------- Component ---------------- */

const ResumeSections: React.FC = () => {
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
    <section className="max-w-3xl mx-auto px-4 text-base-content font-geist py-6">
      <div className="flex flex-col gap-12">

        {/* ================= Experience ================= */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Experience
          </h2>

          <ul className="space-y-6">
            {visibleExperience.map((item) => (
              <ListItem
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
              className="mt-6 mx-auto flex items-center gap-2 text-sm hover:text-primary "
              onClick={() => setShowAllExperience((prev) => !prev)}
            >
              {showAllExperience ? "See less" : "See more"}
              {showAllExperience ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
            </button>
          )}
        </div>

        {/* ================= Education ================= */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Education
          </h2>

          <ul className="space-y-6">
            {visibleEducation.map((edu) => (
              <ListItem
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
  className="mt-6 mx-auto flex items-center gap-2 text-sm hover:text-primary "
  onClick={() => setShowAllEducation((prev) => !prev)}
>
  {showAllEducation ? "See less" : "See more"}
  {showAllEducation ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
</button>
          )}
        </div>

      </div>
    </section>
  );
};

export default ResumeSections;
