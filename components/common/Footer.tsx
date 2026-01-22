'use client';

import { FaGithub, FaLinkedin } from "react-icons/fa";

import { FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Logo from "@/components/common/Logo";

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

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL!;

/* ---------------- Helpers ---------------- */

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/* ---------------- Component ---------------- */

const Footer = () => {
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
    { label: "Book a Meeting", href: CALENDLY_URL },
  ];

  return (
    <footer className="mx-auto max-w-3xl mt-12  backdrop-blur-xl px-4 pb-0 text-sm text-base-content border-t border-base-content/10">
      
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
        <div className="border-t border-base-content/10 pt-6 space-y-4">
          <Logo />

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

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-md bg-base-200 px-4 py-2
                       text-xs text-base-content/80 transition hover:bg-base-300 "
          >
            ↑ Back to top
          </button>

          <p className="text-xs text-base-content/40">
            © {new Date().getFullYear()} Mehedi Hasan
          </p>
        </div>
      </div>

      {/* ---------------- DESKTOP ---------------- */}
      <div className="hidden md:grid grid-cols-3 gap-12 py-6">
        {/* Brand */}
        <div className="space-y-4">
          <Logo />

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

          <button
            onClick={scrollToTop}
            className="mt-6 text-xs text-base-content/50 transition hover:text-primary cursor-pointer"
          >
            ↑ Back to top
          </button>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
