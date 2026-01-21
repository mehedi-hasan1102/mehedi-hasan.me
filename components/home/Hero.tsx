'use client';

import React, { memo } from "react";
import { Download, Mail } from "lucide-react";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";
import { Typewriter } from "react-simple-typewriter";

/* ------------------ Static Styles ------------------ */

const signatureMaskStyle = {
  mask: "url('https://i.ibb.co/pjK7xwK3/mehedi-hasan-signeture.png') center / contain no-repeat",
  WebkitMask:
    "url('https://i.ibb.co/pjK7xwK3/mehedi-hasan-signeture.png') center / contain no-repeat"
};

/* ------------------ Component ------------------ */

const HeroSection: React.FC = () => {
  return (
    <section className="font-geist w-full max-w-3xl mx-auto flex items-center justify-center pt-20">
      <div className="backdrop-blur-sm relative overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center w-full rounded-lg p-4 gap-0 transition-shadow duration-300">

        {/* Left Section */}
        <div className="flex justify-center">
          <div
            className="w-36 sm:w-44 md:w-48 overflow-hidden
                       transition-transform duration-200 ease-out
                      "
          >
            <div className="relative w-full aspect-square">
              <Image
                src="/assets/images/profile.png"
                alt="Mehedi Hasan"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>

            <div className="flex justify-center items-center h-12 sm:h-16">
              <div
                className="w-4/5 max-w-xs h-full bg-primary"
                style={signatureMaskStyle}
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="text-balance p-2">
          <span className="text-xl text-base-content font-geist flex flex-wrap items-center">
            <Typewriter
              words={["Hi, I'm Mehedi Hasan"]}
              loop={1}
              cursor
              cursorStyle="_"
              typeSpeed={90}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>

          <h1 className="text-3xl leading-tight mt-4 break-words">
            A{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Full-Stack
            </span>{" "}
            Web Developer
          </h1>

          <p className="mt-4 text-sm sm:text-base font-geist text-base-content/60 break-words">
            I build full-stack web apps using{" "}
            <span className="bg-primary/20 text-primary font-medium px-1 rounded">
              Next.js & React
            </span>
            ,{" "}
            <span className="bg-primary/20 text-primary font-medium px-1 rounded">
              TypeScript
            </span>
            , and{" "}
            <span className="bg-primary/20 text-primary font-medium px-1 rounded">
              Node.js
            </span>
            , focusing on clean architecture, smooth UX, and high-performance solutions.
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <a
              href="/Resume_of_Mehedi_Hasan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1
                         hover:text-primary underline-offset-6 decoration-dashed hover:underline
                         rounded-lg font-geist text-sm transition-all duration-300"
            >
              <Download size={14} />
              View Resume
            </a>

            <ScrollLink
              to="hire-me"
              smooth
              duration={500}
              className="underline-offset-6 decoration-dashed hover:underline rounded-lg
                         group inline-flex items-center gap-1 hover:text-primary
                         font-geist text-sm cursor-pointer transition-all duration-300"
            >
              Hire Me
              <Mail size={14} />
            </ScrollLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(HeroSection);
