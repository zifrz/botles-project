"use client";

export const Input = ({
  label,
  placeholder,
  onChange,
  type = "text"
}: {
  label: string;
  placeholder: string;
  onChange: (e: any) => void;
  type?: "text" | "password" | "email";
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-800 pb-1 pt-2">
      {label} <span className="text-red-500 mr-1">*</span>
      </label>
      <input
        className="border rounded px-4 py-2 w-full border-gray-300 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 transition"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};