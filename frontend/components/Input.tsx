"use client";

export const Input = ({ label, placeholder, onChange, type = "text" }: {
    label: string;
    placeholder: string;
    onChange: (e: any) => void;
    type?: "text" | "password"
}) => {
    return <div>
        <div className="text-sm pb-1 pt-2">
            * <label>{label}</label>
        </div>
        <input className="border rounded px-4 py-2 w-full border-gray-300 focus:border-gray-500 focus:outline focus:outline-gray-500" type={type} placeholder={placeholder} onChange={onChange} />
    </div>
}