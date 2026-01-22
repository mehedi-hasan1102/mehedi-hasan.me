'use client';

import dynamic from "next/dynamic";


const SkillsAboutSection = dynamic(() => import("@/components/about/Skills-about"), { ssr: false });
const ResumeSection = dynamic(() => import("@/components/home/Resume"), { ssr: false });
const GitHubAboutSection = dynamic(() => import("@/components/about/GitHub-about"), { ssr: false });

export default function AboutPage() {
  return (
    <section className="font-geist text-base-content mx-auto pt-20 max-w-3xl min-h-screen">
      <div className="rounded-lg p-4 backdrop-blur-sm space-y-8">

        {/* Header */}
        <div className="m-4">
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
            About 
          </h1>
          <p className="text-base mt-2 mb-0 text-base-content/75">
 I’m a Full-Stack Web Developer building fast, scalable web apps with Next.js, React, Node.js, and MongoDB. I focus on clean architecture, performance, and great user experience. Connect with me on{" "}
<a
                href="https://www.linkedin.com/in/mehedi-hasan1102/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-primary underline underline-offset-6 transition-colors"
              >
                LinkedIn
              </a>.
</p>
        </div>

     

        {/* Divider */}
        {/* <div className="h-px bg-primary/30 my-4" /> */}

        {/* Sections */}
        <SkillsAboutSection />
        <ResumeSection />
        <GitHubAboutSection />

      </div>
    </section>
  );
}
