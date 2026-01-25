// ================================================
// GLOBAL IMPORTS (SAFE)
// ================================================
import "./globals.css";
import "simplebar/dist/simplebar.min.css";
import { ReactNode } from "react";

// ================================================
// SERVER COMPONENT IMPORTS
// ================================================
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/NavBar";
import { getSortedBlogsData } from "@/lib/blogs";
import FloatingContactCTA from "@/components/common/FloatingContactCTA";
import { geistSans } from "./fonts";
import { ClientThemeProvider } from "@/components/common/ClientThemeProvider";
// ================================================
// METADATA (SEO / SOCIAL SHARING)
// ================================================
export const metadata = {
  title: "Mehedi Hasan | Developer, Storyteller & Technical Writer",
  description:
    "Mehedi Hasan is a Developer, Storyteller, and Technical Writer. Explore modern web projects built with Next.js, React, TypeScript, Node.js, along with detailed case studies and technical articles.",
  metadataBase: new URL("https://mehedi-hasan.me"),
  keywords: [
    "developer storyteller",
    "technical storyteller",
    "technical writer",
    "developer writer",
    "software engineer writer",
    "technical content writer",
    "developer portfolio",
    "Next.js developer portfolio",
    "React developer portfolio",
    "TypeScript developer portfolio",
    "Node.js developer portfolio",
    "full-stack developer portfolio",
    "web developer portfolio",
    "software engineer portfolio",
    "case study portfolio",
    "technical case studies",
    "technical blog",
    "web development blog",
    "software engineering blog",
    "frontend developer portfolio",
    "backend developer portfolio",
    "MERN stack developer",
    "Next.js projects",
    "React projects",
    "TypeScript projects",
    "Node.js projects",
    "modern web applications",
    "UI/UX web development",
    "performance optimization",
    "scalable web applications",
    "REST API development",
    "GraphQL developer",
    "server-side rendering",
    "static site generation",
    "web architecture",
    "software design patterns",
    "clean code practices",
    "code storytelling",
    "technical writing portfolio",
    "developer writing samples",
    "tech articles",
    "programming tutorials",
    "learning web development",
    "software development case studies"
  ],
  authors: [{ name: "Mehedi Hasan", url: "https://mehedi-hasan.me" }],
  creator: "Mehedi Hasan",
  publisher: "Mehedi Hasan",
  openGraph: {
    title: "Mehedi Hasan | Developer, Storyteller & Technical Writer",
    description:
      "Discover Mehedi Hasan’s portfolio of Next.js and React projects, case studies, and technical writing. Learn through stories and code.",
    url: "https://mehedi-hasan.me",
    siteName: "Mehedi Hasan Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mehedi Hasan Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehedi Hasan | Developer, Storyteller & Technical Writer",
    description:
      "Explore Mehedi Hasan’s portfolio: Next.js projects, case studies, and technical writing.",
    images: ["/og-image.png"],
    creator: "@mehedihasan",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// ================================================
// ROOT LAYOUT (SERVER COMPONENT)
// ================================================
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const allBlogsData = await getSortedBlogsData();

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>






        

        {/* Structured data (SEO-safe) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mehedi Hasan",
              url: "https://www.mehedi-hasan.me",
              sameAs: [
                "https://www.linkedin.com/in/mehedi-hasan1102",
                "https://github.com/mehedi-hasan1102",
              ],
              jobTitle: "Full-Stack Developer",
            }),
          }}
        />

        <link rel="canonical" href="https://mehedi-hasan.me" />
      </head>



     <body suppressHydrationWarning className={`${geistSans.variable} antialiased`}>
  <ClientThemeProvider>
    {/* SERVER NAVBAR */}
    <Navbar blogs={allBlogsData} />

    {/* PAGE CONTENT */}
    <main className="px-2 lg:px-0">{children}</main>

    {/* FLOATING CHAT */}
    <FloatingContactCTA />

    <Footer />
  </ClientThemeProvider>
</body>



    </html>
  );
}