"use client";
import { useRouter } from "next/navigation"
import { LinkButton } from "./buttons/LinkButton"
import { PrimaryButton } from "./buttons/PrimaryButton";

export const Appbar = () => {
    const router = useRouter();
    return <div className="flex border-b border-gray-300 justify-between p-4">
        <div className="flex flex-col justify-center text-2xl font-extrabold">
            Botles
        </div>
        <div className="flex">
            <div className="pr-4">
                <LinkButton onClick={() => {
                    router.push("/login")
                }}>Login</LinkButton>
            </div>
            <PrimaryButton onClick={() => {
                router.push("/signup")
            }}>
                Signup
            </PrimaryButton>            
        </div>
    </div>
}