"use client";

import { ReactNode } from "react"

export const LinkButton = ({ children, onClick }: { children: ReactNode, onClick: () => void }) => {
    return <button className="flex justify-center px-2 py-2 cursor-pointer hover:bg-stone-200 font-light text-sm rounded" onClick={onClick}>
        {children}
    </button>
}