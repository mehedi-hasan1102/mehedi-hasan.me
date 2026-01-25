'use client';

import React, { useState, useMemo, useCallback, useEffect } from "react";

import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
      { icon: FaXTwitter, url: "https://x.com/mehedihasan1102", label: "Twitter" },
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
    
<div className="flex items-center justify-between py-3 backdrop-blur-[2px] bg-base-100/40 border-b border-(--border) px-4 md:px-6">

          <Logo />

          {/* Desktop nav */}
          {/* <ul className="hidden md:flex flex-1 justify-center items-center gap-1 text-sm tracking-wide ">
            {[
              { name: "Home", route: "/" },
              // { name: "About", route: "/about" },
              { name: "Projects", route: "/projects" },
              { name: "Blog", route: "/blog" },
              { name: "Snippets", route: "/snippets" },
               { name: "Resources", route: "/resources" },
              // { name: "Contact", route: "/contact" },
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
          </ul> */}

{/* underline only active link  */}
<ul className="hidden md:flex flex-1 justify-center items-center gap-1 text-sm tracking-tight">
  {[
    { name: "Home", route: "/" },
    { name: "Projects", route: "/projects" },
    { name: "Blog", route: "/blog" },
    { name: "Snippets", route: "/snippets" },
    { name: "Resources", route: "/resources" },
  ].map((item) => (
    <li key={item.route}>
      <Link
        href={item.route}
        className={`relative inline-flex items-center px-3 py-1.5 transition-colors duration-200
          ${isActive(item.route) ? "text-(--text) font-medium" : "text-(--muted) hover:text-(--muted)/50"}
        `}
      >
        {item.name}
        {isActive(item.route) && (
          <span className="absolute left-0 right-0 -bottom-[11px] h-0.5 bg-(--accent) rounded-full" />
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
                aria-label={label}  
                className="p-2 rounded-lg text-base-content/70 hover:text-primary transition"
              >
                <Icon size={18} />
              </a>
            ))}

            <div className="ml-2 pl-1 border-l border-(--border) flex items-center gap-0">
              <SearchToggle blogs={blogs} />
            </div>
          </div>

         
         {/* Mobile Controls */}
<div className="flex items-center gap-0 md:hidden">
  <SearchToggle blogs={blogs} />

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
<>
  {/* Overlay */}
  <div
    className={`fixed inset-0 z-20 md:hidden transition-opacity duration-300 ${
      menuOpen ? "opacity-100 pointer-events-auto backdrop-blur-[2px] bg-base-100/20" : "opacity-0 pointer-events-none"
    }`}
    onClick={() => setMenuOpen(false)}
  />

  {/* Drawer */}
  <aside
    className={`fixed top-0 left-0 z-30 h-full w-[75%] max-w-sm bg-base-200 border-r border-(--border) shadow-xl flex flex-col rounded-r-xl transition-transform duration-300 ${
      menuOpen ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    <div className="flex items-center justify-between px-5 py-3 border-b border-(--border)">
      <Logo />
      <button
  onClick={() => setMenuOpen(false)}
  className="p-2 rounded-lg hover:text-primary transition"
  aria-label="Close menu"
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
           { name: "Snippets", route: "/snippets" },
  { name: "Resources", route: "/resources" },
          { name: "Contact", route: "/contact" },







        ].map((item) => {
          const active = isActive(item.route);

          return (
            <li key={item.route}>
              <Link
                href={item.route}
                onClick={() => setMenuOpen(false)}
                className={`relative inline-flex flex-col items-center px-4 py-3 text-sm font-medium transition
                  ${
                    active
                      ? "text-primary"
                      : "text-base-content/80 hover:text-primary"
                  }
                `}
              >
                <span className="relative">
                  {item.name}
                  {active && (
                    <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-(--accent) rounded-full" />
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>

    <div className="flex justify-center gap-0 px-5 py-3 border-t border-(--border)">
      {socialLinks.map(({ icon: Icon, label, url }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="p-2 rounded-full text-base-content/70 hover:text-primary hover:bg-base-300/40 transition"
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  </aside>
</>

      </div>
    </header>
  );
};

export default Navbar;
