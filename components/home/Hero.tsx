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
    "url('https://i.ibb.co/pjK7xwK3/mehedi-hasan-signeture.png') center / contain no-repeat",
};

/* ------------------ Component ------------------ */

const HeroSection: React.FC = () => {
  return (
    <section className="font-geist w-full max-w-3xl mx-auto py-6">
      <div className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-6 rounded-xl p-5 backdrop-blur-sm">

        {/* Left */}
        <div className="flex justify-center">
          <div className="w-40 md:w-48">
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src="/assets/images/profile.png"
                alt="Mehedi Hasan"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* <div className="flex justify-center mt-3 h-14">
              <div
                className="w-4/5 bg-primary"
                style={signatureMaskStyle}
              />
            </div> */}
          </div>
        </div>

        {/* Right */}
        <div className="text-left">
          {/* Intro */}
          <p className="text-sm tracking-wide text-base-content/60 mb-2">
            <Typewriter
              words={["Hi, I’m Mehedi Hasan"]}
              loop={1}
              cursor
              cursorStyle="_"
              typeSpeed={90}
              deleteSpeed={50}
              delaySpeed={800}
            />
          </p>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
            Full-Stack{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Web Developer
            </span>
          </h1>

          {/* Value line */}
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-base-content/70 max-w-md">
            I build scalable, high-performance web applications using modern
            JavaScript technologies with a strong focus on clean architecture
            and user experience.
          </p>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a
              href="/Resume_of_Mehedi_Hasan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium
                         text-base-content/80 hover:text-primary
                         transition-colors duration-300"
            >
              <Download size={16} />
              Resume
            </a>

            <ScrollLink
              to="hire-me"
              smooth
              duration={500}
              className="inline-flex items-center gap-2 text-sm font-medium
                         text-base-content/80 hover:text-primary
                         cursor-pointer transition-colors duration-300"
            >
              <Mail size={16} />
              Hire Me
            </ScrollLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(HeroSection);
