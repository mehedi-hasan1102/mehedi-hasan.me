'use client';

import { Github, Linkedin } from "lucide-react";
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
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/* ---------------- Component ---------------- */

const Footer = () => {
  const socialLinks: SocialLink[] = [
    { icon: Github, href: "https://github.com/mehedi-hasan1102", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mehedi-hasan1102/", label: "LinkedIn" },
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
    { label: "Book a Meeting", href: CALENDLY_URL },
  ];

  return (
    <footer className="mx-auto max-w-3xl backdrop-blur-xl mt-1 rounded-t-xl px-0 pt-0 pb-6 text-sm text-base-content">
      
      {/* ---------------- MOBILE ---------------- */}
      <div className="space-y-12 md:hidden px-4">
        <div className="flex justify-between">
          {/* Main Pages */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-base-content/40">
              Main Pages
            </p>
            <div className="flex flex-col gap-3 text-base-content/70">
              {mainPages.map((link) => (
                <Link key={link.label} href={link.href} className="hover:text-primary transition">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-base-content/40">
              Explore
            </p>
            <div className="flex flex-col gap-3 text-base-content/70">
              {resourcesPages.map((link) => (
                <Link key={link.label} href={link.href} className="hover:text-primary transition">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Brand */}
        <div className="border-t border-base-content/10 pt-6">
          <Logo />

          <div className="mt-4 flex gap-4 text-base-content/70">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="hover:text-primary transition"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>

          {/* Back to Top (Mobile) */}
          <button
            onClick={scrollToTop}
            className="mt-6 inline-flex items-center gap-2
                       rounded-md bg-base-200 px-4 py-2 text-xs
                       text-base-content/80 shadow-sm
                       transition hover:bg-base-300 hover:text-primary"
            aria-label="Back to top"
          >
            ↑ Back to Top
          </button>

          <p className="mt-4 text-xs text-base-content/40">
            © {new Date().getFullYear()} Mehedi Hasan
          </p>
        </div>
      </div>

      {/* ---------------- DESKTOP ---------------- */}
      <div className="hidden md:grid grid-cols-3 gap-12 px-4">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Logo />

          <div className="flex gap-4 text-base-content/70">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="hover:text-primary transition hover:rotate-12"
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
        <div className="flex flex-col gap-3 text-base-content/70">
          <p className="mb-4 text-xs uppercase tracking-widest text-base-content/40">
            Main Pages
          </p>
          {mainPages.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-primary transition underline-offset-6 decoration-dashed hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-3 text-base-content/70">
          <p className="mb-4 text-xs uppercase tracking-widest text-base-content/40">
            Explore
          </p>
          {resourcesPages.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-primary transition underline-offset-6 decoration-dashed hover:underline"
            >
              {link.label}
            </Link>
          ))}

          {/* Back to Top (Desktop) */}
          <button
            onClick={scrollToTop}
            className="mt-4 w-fit text-xs text-base-content/60
                       hover:text-primary transition flex items-center gap-1"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
