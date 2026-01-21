'use client';

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Menu, X, Github, Linkedin } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import SearchToggle from "@/components/blogs/SearchToggle";
import { BlogMetaData } from "@/lib/blogs";
import Logo from "@/components/common/Logo";

// Type Definitions
interface SocialLink {
  icon: React.ComponentType<{ size?: number }>;
  url: string;
  label: string;
}

const Navbar: React.FC<{ blogs: BlogMetaData[] }> = ({ blogs }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const socialLinks: SocialLink[] = useMemo(
    () => [
      { icon: Github, url: "https://github.com/mehedi-hasan1102", label: "GitHub" },
      { icon: Linkedin, url: "https://www.linkedin.com/in/mehedi-hasan1102", label: "LinkedIn" },
    ],
    []
  );

  const isActive = useCallback((route: string) => pathname === route, [pathname]);

  // Disable body scroll on mobile open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Reduce motion if user prefers reduced motion
  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return (
 <header className="fixed top-0 left-0 right-0 z-50">
  <div className="w-full max-w-3xl mx-auto font-geist">

    {/* Desktop Navbar */}
    <div
      className="backdrop-blur-sm flex items-center justify-between text-base-content px-4 py-3 border-b border-primary/30 duration-300 transition-all"
      style={
        reduceMotion
          ? {}
          : { transform: "translateY(0)", opacity: 1 }
      }
    >
      <Logo />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-x-3 text-xs sm:text-sm tracking-wide flex-1 justify-center flex-wrap">
        {[
          { name: "Home", route: "/" },
          { name: "About", route: "/about" },
          { name: "Projects", route: "/projects" },
          { name: "Blog", route: "/blog" },
          { name: "Contact", route: "/contact" },
        ].map((item) => (
          <li key={item.route}>
            <Link
              href={item.route}
              className={`cursor-pointer rounded-lg transition hover:text-primary ${
                isActive(item.route)
                  ? "underline underline-offset-6 decoration-wavy decoration-2 decoration-primary"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Social + Toggles */}
      <div className="hidden md:flex items-center gap-0 ml-0">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-primary transition-transform duration-200 hover:scale-105"
            >
              <Icon size={18} />
            </a>
          );
        })}
        <div className="ml-2 pl-2 border-l border-primary/30">
          <SearchToggle blogs={blogs} /> <ThemeToggle />
        </div>
      </div>

      {/* Mobile Icons */}
      <div className="flex items-center gap-2 md:hidden">
        <SearchToggle blogs={blogs} />
        <ThemeToggle />
        {!menuOpen && (
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-full hover:bg-base-200/30 transition duration-200"
          >
            <Menu size={18} />
          </button>
        )}
      </div>
    </div>

    {/* MOBILE DRAWER */}
    {menuOpen && (
      <>
        <div
          className="fixed inset-0 z-20 md:hidden bg-dark/20 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        <div
          className="fixed top-0 left-0 h-full w-full max-w-[75%] bg-base-200 text-base-content z-30 shadow-2xl flex flex-col justify-between px-6 py-4 rounded-r-lg border-r border-t border-b border-primary/30 transition-transform duration-300 ease-out"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-primary/30">
            <Logo />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="p-1 rounded-lg bg-base-200 text-red-500 shadow-md hover:bg-primary/20 hover:text-red-500 transition-all duration-200"
            >
              <X size={18} />
            </button>
          </div>

          <ul className="flex-1 flex flex-col gap-2 mt-4">
            {[
              { name: "Home", route: "/" },
              { name: "About", route: "/about" },
              { name: "Projects", route: "/projects" },
              { name: "Blog", route: "/blog" },
              { name: "Contact", route: "/contact" },
            ].map((item) => (
              <li key={item.route}>
                <Link
                  href={item.route}
                  onClick={() => setMenuOpen(false)}
                  className="block w-full px-4 py-3 rounded-lg text-base font-medium hover:bg-primary/10 hover:text-primary transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-5 py-4 border-t border-primary/30 flex items-center gap-3 justify-center">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:text-primary hover:bg-base-300/30 transition"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </>
    )}
  </div>
</header>

  );
};

export default Navbar;
