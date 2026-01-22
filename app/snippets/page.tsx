'use client';

import React, { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

type Snippet = {
  title: string;
  description: string;
  language: string;
  code: string;
};

const snippets: Snippet[] = [
  {
    title: "Debounce Function (JavaScript)",
    description: "Prevents a function from being called too frequently.",
    language: "JavaScript",
    code: `function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`,
  },
  {
    title: "Copy to Clipboard (Browser)",
    description: "Simple utility to copy text programmatically.",
    language: "JavaScript",
    code: `async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}`,
  },
  {
    title: "Tailwind Center Utility",
    description: "Quick flex utility for perfect centering.",
    language: "CSS",
    code: `.center {
  display: flex;
  align-items: center;
  justify-content: center;
}`,
  },
];

const SnippetsPage: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="text-base-content font-geist max-w-3xl mx-auto pt-20 min-h-screen p-4 backdrop-blur-sm">
      
      {/* Header */}
      <div className="m-4">
  <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
    Snippets
  </h1>

  <p className="text-base mt-2 mb-0 text-base-content/75">
    A collection of reusable code snippets and small utilities that you can use
    in your projects. These are shared publicly to help other developers and to
    showcase common patterns I use in my work. Feel free to explore, copy, and
    contribute.
  </p>
</div>


      {/* Snippets List */}
      <div className="space-y-6 mt-12 mx-4">
        {snippets.map((snippet, index) => (
          <article
            key={index}
            className="rounded-lg border border-base-300 bg-base-100 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-4">
              <div>
                <h3 className="text-lg font-medium">
                  {snippet.title}
                </h3>
                <p className="mt-1 text-sm text-base-content/70">
                  {snippet.description}
                </p>
              </div>

              <span className="text-xs px-2 py-1 rounded bg-base-200 text-base-content/70 whitespace-nowrap">
                {snippet.language}
              </span>
            </div>

            {/* Code Block */}
            <div className="relative">
              <pre className="bg-base-200 p-4 overflow-x-auto text-sm leading-relaxed">
                <code>{snippet.code}</code>
              </pre>

              <button
                onClick={() => handleCopy(snippet.code, index)}
                className="
                  absolute top-3 right-3
                  inline-flex items-center gap-1
                  text-xs font-medium
                  px-2 py-1 rounded
                  bg-primary text-primary-content
                  opacity-80 hover:opacity-100
                  transition
                "
              >
                {copiedIndex === index ? (
                  <>
                    <FiCheck size={14} /> Copied
                  </>
                ) : (
                  <>
                    <FiCopy size={14} /> Copy
                  </>
                )}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SnippetsPage;
