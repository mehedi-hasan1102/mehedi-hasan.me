"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ClientThemeProvider = ({ children }: Props) => {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
};
