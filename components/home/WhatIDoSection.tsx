'use client';

import React from "react";
import {
  SiNextdotjs,
  SiMongodb,
  SiTailwindcss,
  SiFirebase,
  SiGithub,
  SiExpress,
} from "react-icons/si";

const whatIDo = [
  {
    text: "Build modern, responsive user interfaces with React and Next.js",
    icon: SiNextdotjs,
  },
  {
    text: "Develop scalable REST APIs using Node.js and Express",
    icon: SiExpress,
  },
  {
    text: "Design MongoDB schemas and implement efficient CRUD operations",
    icon: SiMongodb,
  },
  {
    text: "Implement authentication and role-based access control (JWT, Firebase)",
    icon: SiFirebase,
  },
  {
    text: "Optimize performance, accessibility, and user experience",
    icon: SiTailwindcss,
  },
  {
    text: "Collaborate using Git, GitHub, and modern version control workflows",
    icon: SiGithub,
  },
];

const WhatIDoSection: React.FC = () => {
  return (
    <section
      id="what-i-do"
      className="max-w-3xl mx-auto px-4 text-base-content font-geist py-6"
    >
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold tracking-tight">
          What I Do
        </h2>
      </div>

      {/* List */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        {whatIDo.map((item, index) => {
          const Icon = item.icon;

          return (
            <li key={index} className="flex gap-3 items-start">
              <Icon
                size={18}
                className="mt-0.5 text-base-content/70"
              />
              <p className="text-sm leading-relaxed text-base-content/80">
                {item.text}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default WhatIDoSection;
