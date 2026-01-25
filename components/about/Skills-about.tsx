'use client';

import React, { useMemo } from "react";
import skillsData from "@/data/skills-list.json";

type SkillCategory = {
  category: string;
  skills: string[];
};

const SkillsAboutSection: React.FC = () => {
  const skillItems: SkillCategory[] = useMemo(() => {
    if (Array.isArray(skillsData)) {
      return skillsData.filter(
        (item) =>
          item &&
          typeof item.category === "string" &&
          Array.isArray(item.skills)
      );
    }
    return [];
  }, []);

  return (
    <section
      className="px-4 py-0 md:py-16 font-geist flex flex-col items-center overflow-hidden relative text-base-content max-w-3xl mx-auto pt-6 space-y-8"
    >
      {/* Section Title */}
      <div className="relative mb-6 sm:mb-20 group w-full flex justify-center">
        <div
          className="
            relative z-10
            border-[1px] border-(--border)
            px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4
            bg-base-100
            shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]
            sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)]
            md:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)]
            dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.02)]
            sm:dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.02)]
            md:dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.02)]
          "
        >
          <h2
            className="
              text-sm sm:text-base md:text-lg
              font-dark
              tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.25em]
              uppercase
              text-base-content
            "
          >
            Expertise Stack
          </h2>
        </div>

        {/* Decorative SVG lines */}
        <div
          className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 w-[90%] max-w-[500px] h-16 md:h-20 pointer-events-none"
          aria-hidden="true"
        >
          <svg className="w-full h-full" viewBox="0 0 500 80" fill="none">
            <path
              d="M250 0 V80"
              className="stroke-primary/80"
              strokeWidth="1"
            />
            <path
              d="M250 0 V40 H80 V80"
              className="stroke-base-content/60"
              strokeWidth="1"
            />
            <path
              d="M250 0 V40 H420 V80"
              className="stroke-base-content/60"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 md:gap-16 w-full relative">
        {skillItems.map(({ category, skills }, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${idx === 0 ? "sm:items-end" : "sm:items-start"} items-center`}
          >
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-base-content/40 mb-3 sm:mb-4 font-bold">
              {category}
            </span>

            <div
              className={`flex flex-wrap gap-2 sm:gap-3 ${idx === 0 ? "sm:justify-end" : "sm:justify-start"} justify-center`}
            >
              {skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="relative group overflow-hidden px-2 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[11px] bg-base-100 font-semibold tracking-wide backdrop-blur-md border border-(--border) text-base-content/80 rounded-lg cursor-default transition-colors duration-300 hover:border-(--border) hover:text-primary"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -z-10" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsAboutSection;
