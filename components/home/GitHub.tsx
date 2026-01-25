'use client';

import React from 'react';

import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

const GitHubActivitySection: React.FC = () => {
  return (
    <section
      className="max-w-3xl mx-auto px-4 text-base-content font-geist py-6"
    >
      {/* Header */}
      <div className="mb-4 animate-fadeInUp">
        <h2 className="text-lg font-semibold tracking-tight mb-3">
          GitHub Activity
        </h2>
         <p className="text-sm text-base-content/70 mt-1">
            A snapshot of my open-source contributions.
          </p>
      </div>

      {/* Contribution Graph */}
      <div className="overflow-hidden animate-fadeIn">
        <img
          src="https://ghchart.rshah.org/mehedi-hasan1102"
          alt="GitHub contribution graph"
          className="w-full h-auto"
          loading="lazy"
        />
      </div>

      {/* Footer link */}
      <div className="pt-6 text-center">
        <Link
          href="https://github.com/mehedi-hasan1102"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium hover:text-primary"
        >
          View GitHub profile
          <FiArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default GitHubActivitySection;
