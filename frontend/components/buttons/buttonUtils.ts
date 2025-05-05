export const getButtonSizeClasses = (size: "small" | "big" = "small") => {
  return size === "big"
    ? "px-10 py-4 text-lg"
    : "px-6 py-2 text-sm";
};