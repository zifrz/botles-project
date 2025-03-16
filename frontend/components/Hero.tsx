"use client"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "./buttons/PrimaryButton"
import { SecondaryButton } from "./buttons/SecondaryButton"

export const Hero = () => {
    const router = useRouter();
    return <div>
        <div className="flex justify-center">
            <div className="text-5xl font-bold font-semibold text-center pt-8 max-w-xl">
                Automate as fast as you can type
            </div>
        </div>
        <div className="flex justify-center pt-2">
            <div className="text-xl font-bold font-normal text-center pt-8 max-w-2xl">
                AI gives you automation superpowers, and Botles puts them to work. Pairing AI and Botles helps you turn ideas into workflows and bots that work for you.
            </div>
        </div>

        <div className="flex justify-center pt-4">
            <div className="flex">
                <PrimaryButton onClick={() => {
                    router.push("/signup")
                }} size="big">Get Started free</PrimaryButton>
                {/* <div className="pl-4">
                    <SecondaryButton  onClick={() => {}} size="big">Contact Sales</SecondaryButton>
                </div> */}
            </div>
        </div>
    </div>
}