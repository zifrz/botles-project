import { ReactNode } from "react";
import { getButtonSizeClasses } from "./buttonUtils";

export const SecondaryButton = ({
  children,
  onClick,
  size = "small"
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "big" | "small";
}) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center border border-black text-black rounded-full hover:shadow-md transition-shadow ${getButtonSizeClasses(size)}`}
    >
      {children}
    </button>
  );
};
