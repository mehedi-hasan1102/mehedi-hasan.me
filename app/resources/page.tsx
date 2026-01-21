"use client";

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
    <section className="max-w-3xl mx-auto min-h-screen px-6 py-10 pt-20">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Resources</h1>
        <p className="text-base text-base-content/70 mt-2">
          A curated list of tools, libraries and learning materials that I
          frequently use.
        </p>
      </header>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((category) => (
          <section
            key={category.category}
            className=" rounded-xl  p-4 "
          >
            <h2 className="text-lg font-medium mb-4">
              {category.category}
            </h2>

            <ul className="space-y-3">
              {category.items.map((item) => (
                <li
                  key={item.title}
                  className="group rounded-lg  p-4 hover:bg-base-200 transition"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-base-content hover:text-primary underline underline-offset-4"
                  >
                    {item.title}
                  </a>

                  {item.description && (
                    <p className="text-sm text-base-content/70 mt-2">
                      {item.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
};

export default ResourcesPage;
