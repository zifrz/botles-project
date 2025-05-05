"use client";
import { ReactNode } from "react";

export const LinkButton = ({
  children,
  onClick
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center px-4 py-2 text-sm text-stone-700 hover:bg-stone-200 rounded-md transition-colors"
    >
      {children}
    </button>
  );
};
