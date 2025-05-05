import { ReactNode } from "react";
import { getButtonSizeClasses } from "./buttonUtils";

export const DarkButton = ({
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
      className={`inline-flex items-center justify-center bg-purple-800 text-white hover:bg-purple-900 rounded-md hover:shadow-lg transition-shadow ${getButtonSizeClasses(size)}`}
    >
      {children}
    </button>
  );
};
