"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Toaster } from "sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="bg-white dark:bg-black">{children}</div>
      </ThemeProvider>
        <Toaster richColors position="bottom-left" />
    </SessionProvider>
  );
};
