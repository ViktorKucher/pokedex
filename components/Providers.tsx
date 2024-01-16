"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      {children}
      <Toaster
        richColors
        expand={false}
        position="bottom-left"
      />
    </SessionProvider>
  );
};
