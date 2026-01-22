'use client';

import React from "react";
import { FiGlobe, FiMail, FiFileText } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

import {
  FaDev,
  FaDiscord,
  FaHackerrank,
  FaMedium,
  FaDribbble,
  FaBehance,
  FaTelegramPlane,
  FaWhatsapp,
  FaPinterest,
  FaCodepen,
  FaFigma,
  FaYoutube,
  FaStackOverflow,
} from "react-icons/fa";
import { FaThreads, FaXTwitter, FaHashnode } from "react-icons/fa6";
import { SiBluesky, SiQuora, SiPeerlist } from "react-icons/si";

/* ---------------- Types ---------------- */

interface SocialLink {
  icon: React.ComponentType<{ size?: number }>;
  href: string;
  label: string;
}

interface SocialCategory {
  title: string;
  links: SocialLink[];
}

/* ---------------- Data ---------------- */

const socialCategories: SocialCategory[] = [
  {
    title: "Developer",
    links: [
      { icon: FaGithub, href: "https://github.com/mehedi-hasan1102", label: "GitHub" },
      { icon: FaDev, href: "https://dev.to/mehedihasan1102", label: "Dev.to" },
      { icon: FaHashnode, href: "https://hashnode.com/@mehedi-hasan1102", label: "Hashnode" },
      { icon: FaStackOverflow, href: "https://stackoverflow.com/users/31918992/mehedi-hasan", label: "Stack Overflow" },
      { icon: FaHackerrank, href: "https://www.hackerrank.com/profile/mehedi_hasan1102", label: "HackerRank" },
      { icon: FaCodepen, href: "https://codepen.io/mehedihasan1102", label: "CodePen" },
    ],
  },
  {
    title: "Professional",
    links: [
      { icon: FaLinkedin, href: "https://www.linkedin.com/in/mehedi-hasan1102/", label: "LinkedIn" },
      { icon: SiPeerlist, href: "https://peerlist.io/mehedihasan", label: "Peerlist" },
      { icon: FiGlobe, href: "https://mehedi-h.vercel.app", label: "Portfolio" },
      { icon: FiFileText, href: "/Resume_of_Mehedi_Hasan.pdf", label: "Resume" },
      { icon: FiMail, href: "mailto:mehedi.hasan11023@gmail.com", label: "Email" },
    ],
  },
  {
    title: "Designer",
    links: [
      { icon: FaBehance, href: "https://www.behance.net/mehedihasan1102", label: "Behance" },
      { icon: FaDribbble, href: "https://dribbble.com/mehedi-hasan1102", label: "Dribbble" },
      { icon: FaFigma, href: "https://www.figma.com/files/team/1546370570397248215/user/1546370568436002861", label: "Figma" },
      { icon: FaMedium, href: "https://medium.com/@mehedihasan1102", label: "Medium" },
      { icon: FaPinterest, href: "https://www.pinterest.com/mehedi11023/", label: "Pinterest" },
    ],
  },
  {
    title: "Social",
    links: [
      { icon: FaFacebook, href: "https://facebook.com/mehedi.hasan1102", label: "Facebook" },
      { icon: FaInstagram, href: "https://instagram.com/mehedi.hasan1102", label: "Instagram" },
      { icon: FaThreads, href: "https://www.threads.com/@mehedi.hasan1102", label: "Threads" },
      { icon: FaXTwitter, href: "https://x.com/mehedihasan1102", label: "Twitter / X" },
      { icon: SiBluesky, href: "https://bsky.app/profile/mehedihasan1102.bsky.social", label: "Bluesky" },
      { icon: SiQuora, href: "https://www.quora.com/profile/Mehedi-Hasan-19347-1", label: "Quora" },
      { icon: FaYoutube, href: "https://www.youtube.com/@MehediHasan11023", label: "YouTube" },
    ],
  },
  {
    title: "Messaging",
    links: [
      { icon: FaWhatsapp, href: "https://wa.me/8801747874773", label: "WhatsApp" },
      { icon: FaTelegramPlane, href: "https://t.me/+8801747874773", label: "Telegram" },
      { icon: FaDiscord, href: "https://discord.gg/QMmdb8nusc", label: "Discord" },
    ],
  },
];

/* ---------------- Component ---------------- */

const LinksPage: React.FC = () => {
  return (
    <section className="text-base-content font-geist max-w-3xl mx-auto pt-20">
      <div className="min-h-screen rounded-lg p-4 backdrop-blur-sm transition-shadow duration-300">
        {/* Header */}
<div className="m-4">
  <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
    Links
  </h1>

  <p className="text-base mt-2 mb-0 text-base-content/75">
    Want to connect or collaborate? I’m always open to meaningful conversations,
    projects, and opportunities. Reach out through any of the links below —
    you can also follow me on{" "}
    <a
      href="https://x.com/mehedihasan1102"
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium hover:text-primary underline underline-offset-6 transition-colors"
    >
      X
    </a>
    .
  </p>
</div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 mx-4 mt-12">
          {socialCategories.map((category) => (
            <div key={category.title}>
              <h3 className="mb-4 text-xs tracking-widest uppercase text-base-content/50">
                {category.title}
              </h3>

              <ul className="space-y-3">
                {category.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center gap-2 text-sm
                        text-base-content/80
                        underline-offset-6 decoration-dashed
                        hover:text-primary hover:underline
                        transition-colors duration-200
                      "
                    >
                      <span className="opacity-80">
                        <link.icon size={14} />
                      </span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LinksPage;
