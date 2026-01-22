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
      <header className="mb-8 text-start">
        <h2 className="text-3xl">Snippets</h2>
        <p className="mt-4 text-sm sm:text-base text-base-content/80 leading-relaxed">
          A collection of reusable code snippets, utilities, and small patterns I use in real projects.
        </p>
      </header>

      {/* Snippets List */}
      <div className="space-y-6">
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
