"use client";

import Link from "next/link";
import { Download, Mail } from "lucide-react";

const HeroActions = () => {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-4">
      {/* Resume */}
      <Link
        href="/Resume_of_Mehedi_Hasan.pdf"
        target="_blank"
        className="inline-flex items-center gap-2 text-sm font-medium text-base-content/80 hover:text-primary transition-colors"
      >
        <Download size={16} />
        Resume
      </Link>

      {/* Hire Me */}
      <Link
        href="/#hire-me"
        className="inline-flex items-center gap-2 text-sm font-medium text-base-content/80 hover:text-primary transition-colors"
      >
        <Mail size={16} />
        Hire Me
      </Link>
    </div>
  );
};

export default HeroActions;
