import localFont from "next/font/local";

export const geistSans = localFont({
  src: [
    {
      path: "../public/fonts/Geist[wght].woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/fonts/Geist-Italic[wght].woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
  preload: false,
});
