"use client";

import Link from "next/link";
import { FiDownload, FiMail } from "react-icons/fi";


const HeroActions = () => {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-4">
      {/* Resume */}
      <a
        href="/Resume_of_Mehedi_Hasan.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-base-content/80 hover:text-primary transition-colors"
      >
        <FiDownload size={16} />
        Resume
      </a>




      {/* Hire Me */}
      <Link
        href="/#hire-me"
        className="inline-flex items-center gap-2 text-sm font-medium text-base-content/80 hover:text-primary transition-colors"
      >
        <FiMail size={16} />
        Hire Me
      </Link>
    </div>
  );
};

export default HeroActions;
