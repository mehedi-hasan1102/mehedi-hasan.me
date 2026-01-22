'use client';

import React, { useState, useMemo, useCallback, useEffect } from "react";

import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import SearchToggle from "@/components/blogs/SearchToggle";
import { BlogMetaData } from "@/lib/blogs";
import Logo from "@/components/common/Logo";

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
      { icon: FaGithub, url: "https://github.com/mehedi-hasan1102", label: "GitHub" },
      { icon: FaLinkedin, url: "https://www.linkedin.com/in/mehedi-hasan1102", label: "LinkedIn" },
    ],
    []
  );

  const isActive = useCallback(
    (route: string) => pathname === route,
    [pathname]
  );

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* FULL width on mobile, max-w-3xl on desktop */}
      <div className="w-full mx-auto max-w-3xl font-geist">

        {/* Desktop Navbar */}
        <div className="flex items-center justify-between py-3 backdrop-blur-sm border-b border-base-content/10 px-4 md:px-6 ">

          <Logo />

          {/* Desktop nav */}
          <ul className="hidden md:flex flex-1 justify-center items-center gap-2 text-sm tracking-wide ">
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
                  className={`relative px-2 py-1 transition-colors duration-200
                    ${isActive(item.route) ? "text-primary" : "text-base-content/70 hover:text-primary"}
                  `}
                >
                  {item.name}
                  {isActive(item.route) && (
                    <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-0">
            {socialLinks.map(({ icon: Icon, label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-base-content/70 hover:text-primary transition"
              >
                <Icon size={18} />
              </a>
            ))}

            <div className="ml-2 pl-1 border-l border-base-content/10 flex items-center gap-0">
              <SearchToggle blogs={blogs} />
              <ThemeToggle />
            </div>
          </div>

         
         {/* Mobile Controls */}
<div className="flex items-center gap-0 md:hidden">
  <SearchToggle blogs={blogs} />

  <ThemeToggle />

  {!menuOpen && (
    <button
      onClick={() => setMenuOpen(true)}
      aria-label="Open menu"
      className="p-2 rounded-lg hover:bg-base-200/40 transition"
    >
      <FiMenu size={18} />
    </button>
  )}
</div>


        </div>

        {/* Mobile Drawer */}
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            <aside className="fixed top-0 left-0 z-30 h-full w-[85%] max-w-sm bg-base-200 border-r border-base-content/10 shadow-xl flex flex-col">
              <div className="flex items-center justify-between px-5 py-4 border-b border-base-content/10">
                <Logo />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-base-300/40 transition"
                >
                  <FiX size={18} />
                </button>
              </div>

              <nav className="flex-1 px-4 py-4 overflow-y-auto">
                <ul className="flex flex-col gap-1">
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
                        className="block rounded-lg px-4 py-3 text-sm font-medium text-base-content/80 hover:bg-primary/10 hover:text-primary transition"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex justify-center gap-0 px-5 py-4 border-t border-base-content/10">
                {socialLinks.map(({ icon: Icon, label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full text-base-content/70 hover:text-primary hover:bg-base-300/40 transition"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </aside>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
