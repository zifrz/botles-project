import { ReactNode } from "react"

export const PrimaryButton = ({ children, onClick, size = "small" }: {
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small"
}) => {
    return <button onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 py-2" : "px-10 py-4  w-md"} cursor-pointer bg-amber-600 hover:bg-amber-700 hover:shadow-md  text-white rounded-full text-center flex justify-center items-center flex-col`}>
        {children}
    </button>
}