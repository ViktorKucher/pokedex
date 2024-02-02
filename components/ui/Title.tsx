"use client";
import { ReactNode } from "react";

export const Title = ({ children }: { children: ReactNode }) => {
  return (
    <span className="text text-center text-black dark:text-white uppercase text-2xl break-words">
      {children}
    </span>
  );
};
