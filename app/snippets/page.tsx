'use client';

import React, { useState } from "react";
import snippetsData from "../../data/snippets.json";

type Snippet = {
  title: string;
  description: string;
  language: string;
  code: string;
};

const SnippetsPage: React.FC = () => {
  const [snippets] = useState<Snippet[]>(snippetsData);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
      <section className="text-base-content font-geist max-w-3xl mx-auto pt-20 p-4">
      <div className="min-h-screen rounded-lg py-4 backdrop-blur-sm transition-shadow">

      <div className="m-4">
        <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
          Snippets
        </h1>

        <p className="text-base mt-2 mb-0 text-base-content/75">
          A collection of reusable code snippets and small utilities that you can use
          in your projects.
        </p>
      </div>

      <div className="space-y-6 mt-12 mx-4">
        {snippets.map((snippet, index) => (
          <article
            key={index}
            className="rounded-lg border border-primary/20 bg-base-100 overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4 p-4">
              <div>
                <h3 className="text-lg font-medium">{snippet.title}</h3>
                <p className="mt-1 text-sm text-base-content/70">
                  {snippet.description}
                </p>
              </div>

              <span className="text-xs px-2 py-1 rounded bg-base-200 text-base-content/70 whitespace-nowrap">
                {snippet.language}
              </span>
            </div>

            <div className="relative">
              <pre className="bg-base-200 p-4 overflow-x-auto text-sm leading-relaxed">
                <code>{snippet.code}</code>
              </pre>

              <button
                onClick={() => handleCopy(snippet.code, index)}
                className="absolute top-3 right-3 inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded text-primary-content opacity-80 hover:opacity-100 transition"
              >
                {copiedIndex === index ? "✓ Copied" : "⧉ Copy"}
              </button>
            </div>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
};

export default SnippetsPage;
