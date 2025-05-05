// frontend/components/buttons/PrimaryButton.tsx
import { ReactNode } from "react";
import { getButtonSizeClasses } from "./buttonUtils";

export const PrimaryButton = ({
  children,
  onClick,
  size = "small",
  fullWidth = false,
  disable = false
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "big" | "small";
  fullWidth?: boolean;
  disable?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center bg-amber-600 text-white hover:bg-amber-700 rounded-full hover:shadow-lg transition-shadow ${getButtonSizeClasses(size)} ${
        fullWidth ? "w-full" : ""
      } ${disable ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {children}
    </button>
  );
};