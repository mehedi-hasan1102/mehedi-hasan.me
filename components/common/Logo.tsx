'use client';

import Link from "next/link";
import clsx from "clsx";
import { Birthstone } from "next/font/google";
import { IoCodeSlashOutline } from "react-icons/io5";


const birthstone = Birthstone({
  weight: "400",
  subsets: ["latin"],
});

interface LogoProps {
  href?: string;
  className?: string;
  showIcon?: boolean;
}

export default function Logo({
  href = "/",
  className,
  showIcon = true,
}: LogoProps) {
  return (
    <Link href={href} className={clsx("inline-flex items-center", className)}>
      <div
        className="flex items-center gap-2 cursor-pointer select-none group"
      >
        {showIcon && (
          <IoCodeSlashOutline size={24} className="text-(--primary) group-hover:scale-110 transition-transform duration-200"  />
        )}

        <span
          className={`${birthstone.className} text-xl sm:text-2xl font-semibold leading-none text-(--text)`}
        >
          Mehedi
          <span className="text-(--text)/60 ml-1">Hasan</span>
        </span>
      </div>
    </Link>
  );
}
