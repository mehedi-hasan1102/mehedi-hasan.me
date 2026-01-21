'use client';

import React, { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import SimpleBar from "simplebar-react";
import aboutDataJson from "@/data/resume.json";

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
              className="inline-flex items-center gap-1 ml-1 text-base-content/70 hover:text-primary transition-colors"
            >
              <ArrowUpRight size={13} />
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
          <ArrowUpRight size={14} />
        </a>
      )}
    </li>
  )
);

ListItem.displayName = "ListItem";

/* ---------------- Component ---------------- */

const ResumeSections: React.FC = () => {
  const aboutData = useMemo(() => initializeAboutData(aboutDataJson), []);

  return (
    <section className="max-w-3xl mx-auto px-4 text-base-content font-geist">
      <div className="flex flex-col gap-6">

        {/* ================= Experience ================= */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Experience
          </h2>

          <SimpleBar className="max-h-[360px] pr-3">
            <ul className="space-y-6">
              {aboutData.experience.map((item) => (
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
          </SimpleBar>
        </div>

        {/* ================= Education ================= */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Education
          </h2>

          <SimpleBar className="max-h-[360px] pr-3">
            <ul className="space-y-6">
              {aboutData.education.map((edu) => (
                <ListItem
                  key={`${edu.institution}-${edu.degree}`}
                  title={edu.institution}
                  subtitle={edu.degree}
                  meta={edu.details}
                  link={edu.credentialLink}
                />
              ))}
            </ul>
          </SimpleBar>
        </div>

      </div>
    </section>
  );
};

export default ResumeSections;
