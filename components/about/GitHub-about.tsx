'use client';

import React from 'react';

const GitHubAboutSection: React.FC = () => {
  return (
    <section className="font-geist text-base-content max-w-3xl mx-auto pt-1">
      <div className="rounded-lg   p-6 space-y-6">

        {/* Header */}
        <div className="text-start">
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            GitHub Activity
          </h2>
          <p className="text-sm text-base-content/70 mt-1">
            A snapshot of my open-source contributions.
          </p>
        </div>

        {/* Calendar Image */}
        <div className="rounded-lg overflow-hidden  ">
          <img
            src="https://ghchart.rshah.org/mehedi-hasan1102"
            alt="Mehedi Hasan's GitHub Contribution Graph"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        {/* Footer */}
        <div className="text-start">
          <p className="text-sm text-base-content/80 leading-relaxed">
            My coding journey, day by day, in open-source. Check out my{" "}
            <a
              href="https://github.com/mehedi-hasan1102"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-primary underline underline-offset-4 transition-colors"
            >
              GitHub
            </a>
            .
          </p>
        </div>

      </div>
    </section>
  );
};

export default GitHubAboutSection;
