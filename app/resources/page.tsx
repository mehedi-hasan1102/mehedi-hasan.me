'use client';

import React from "react";
import resourcesJson from "@/data/resources.json";

type ResourceItem = {
  title: string;
  href: string;
  description?: string;
};

type ResourceCategory = {
  category: string;
  items: ResourceItem[];
};

const ResourcesPage: React.FC = () => {
  const data: ResourceCategory[] = resourcesJson.resources;

  return (
    <section className="text-base-content font-geist max-w-3xl mx-auto pt-20 p-4">
      <div className="min-h-screen rounded-lg py-4 backdrop-blur-sm transition-shadow">
      {/* Header */}
      <div className="m-4">
  <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
    Resources
  </h1>

  <p className="text-base mt-2 mb-0 text-base-content/75">
    A curated list of tools, libraries, and learning materials that I frequently use.
    This page is designed to help you discover useful resources for web development,
    programming, and software engineering.
  </p>
</div>


      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mx-4">
        {data.map((category) => (
          <section
            key={category.category}
            className="rounded-xl "
          >
            <h3 className="text-lg font-medium mb-4">
              {category.category}
            </h3>

            <ul className="space-y-6  ">
              {category.items.map((item) => (
                <li
                  key={item.title}
                  className="group rounded-lg py-2 transition-colors"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      font-medium
                      text-base-content
                      group-hover:text-primary
                      group-hover:underline
                      underline-offset-4
                      transition-colors
                    "
                  >
                    {item.title} ↗
                  </a>

                  {item.description && (
                    <p className="mt-2 text-sm text-base-content/45 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      </div>
    </section>
  );
};

export default ResourcesPage;
