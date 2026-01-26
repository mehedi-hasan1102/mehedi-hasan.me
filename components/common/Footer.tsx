'use client';

import { FaGithub, FaLinkedin } from "react-icons/fa";

import { FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Logo from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useVisitorLocation } from "@/hooks/useVisitorLocation";

/* ---------------- Types ---------------- */

interface SocialLink {
  icon: React.ComponentType<{ size?: number }>;
  href: string;
  label: string;
}

interface NavLink {
  label: string;
  href: string;
}

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact' ;

/* ---------------- Helpers ---------------- */

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/* ---------------- Component ---------------- */

const Footer = () => {
  const { lastVisitor, loading } = useVisitorLocation();

  const socialLinks: SocialLink[] = [
    { icon: FaGithub, href: "https://github.com/mehedi-hasan1102", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/mehedi-hasan1102/", label: "LinkedIn" },
    { icon: FaEnvelope, href: "mailto:mehedi.hasan11023@gmail.com", label: "Email" },
    { icon: FaXTwitter, href: "https://x.com/mehedihasan1102", label: "Twitter" },
  ];

  const mainPages: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const resourcesPages: NavLink[] = [
    { label: "Links", href: "/links" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Resources", href: "/resources" },
    { label: "Snippets", href: "/snippets" },
    { label: "Resume", href: "/Resume_of_Mehedi_Hasan.pdf" },
    { label: "Book a Meeting", href: CALENDLY_URL },
  ];

  return (
    <footer className="mx-auto max-w-3xl mt-12  backdrop-blur-xl px-4 pb-0 text-sm text-base-content border-t border-(--border)">
      
      {/* ---------------- MOBILE ---------------- */}
      <div className="space-y-10 md:hidden py-6">
        <div className="flex justify-between gap-10">
          {/* Main Pages */}
          <nav>
            <p className="mb-4 text-[11px] uppercase tracking-widest text-base-content/40">
              Main
            </p>
            <ul className="space-y-3">
              {mainPages.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-base-content/70 transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav>
            <p className="mb-4 text-[11px] uppercase tracking-widest text-base-content/40">
              Explore
            </p>
            <ul className="space-y-3">
              {resourcesPages.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-base-content/70 transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Brand */}
        <div className="border-t border-(--border) pt-6 space-y-4">
          <Logo showIcon={false} />

 <div className="flex gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-base-content/60 transition hover:text-primary"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>



<div className="mt-6 flex items-center gap-2">
            <button
              onClick={scrollToTop}
              className="text-xs text-base-content/50 transition hover:text-primary cursor-pointer"
            >
              ↑ Back to top
            </button>
            <ThemeToggle className="text-base-content/60 hover:text-primary hover:bg-base-300/40 rounded-lg" size={16} />
          </div>



          {lastVisitor && !loading ? (
            <p className="text-xs text-base-content/50">
              Last visit from {lastVisitor.city}, {lastVisitor.countryCode}
            </p>
          ) : loading ? (
            <p className="text-xs text-base-content/50">Loading...</p>
          ) : (
            <p className="text-xs text-base-content/50">No previous visitor</p>
          )}

          <p className="text-xs text-base-content/40">
            © {new Date().getFullYear()} Mehedi Hasan
          </p>
        </div>
      </div>

      

      {/* ---------------- DESKTOP ---------------- */}
      <div className="hidden md:grid grid-cols-3 gap-12 py-6">
        {/* Brand */}
        <div className="space-y-4">
          <Logo showIcon={false} />

          <div className="flex gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-base-content/60 transition hover:text-primary"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>

          {lastVisitor && !loading ? (
            <p className="text-xs text-base-content/50">
              Last visit from {lastVisitor.city}, {lastVisitor.countryCode}
            </p>
          ) : loading ? (
            <p className="text-xs text-base-content/50">Loading...</p>
          ) : (
            <p className="text-xs text-base-content/50">No previous visitor</p>
          )}

          

          <p className="text-xs text-base-content/40">
            © {new Date().getFullYear()} Mehedi Hasan
          </p>
        </div>

        {/* Main Pages */}
        <nav>
          <p className="mb-5 text-[11px] uppercase tracking-widest text-base-content/40">
            Main
          </p>
          <ul className="space-y-4">
            {mainPages.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-base-content/70 transition hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Resources */}
        <nav>
          <p className="mb-5 text-[11px] uppercase tracking-widest text-base-content/40">
            Explore
          </p>
          <ul className="space-y-4">
            {resourcesPages.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-base-content/70 transition hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-2">
            <button
              onClick={scrollToTop}
              className="text-xs text-base-content/50 transition hover:text-primary cursor-pointer"
            >
              ↑ Back to top
            </button>
            <ThemeToggle className="text-base-content/60 hover:text-primary hover:bg-base-300/40 rounded-lg" size={16} />
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
