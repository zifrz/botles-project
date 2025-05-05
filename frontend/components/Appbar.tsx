"use client";
import { useRouter } from "next/navigation"
import { LinkButton } from "./buttons/LinkButton"
import { PrimaryButton } from "./buttons/PrimaryButton";
import { useEffect, useState } from "react";

export const Appbar = ({
    isLoggedIn,
    setIsLoggedIn
  }: {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
  }) => {
    const router = useRouter();
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     // Check if token exists in localStorage when component mounts
    //     const token = localStorage.getItem("token");
    //     setIsLoggedIn(!!token);
    // }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/");
    };

    return (
        <div className="flex border-b border-gray-300 justify-between p-4">
            <div 
                className="flex flex-col justify-center text-2xl font-extrabold cursor-pointer"
                onClick={() => router.push("/")}
            >
                Botles
            </div>
            <div className="flex">
                {isLoggedIn ? (
                    <>
                        <div className="pr-4">
                            <LinkButton onClick={() => router.push("/dashboard")}>
                                Dashboard
                            </LinkButton>
                        </div>
                        <PrimaryButton onClick={handleLogout}>
                            Logout
                        </PrimaryButton>
                    </>
                ) : (
                    <>
                        <div className="pr-4">
                            <LinkButton onClick={() => router.push("/login")}>
                                Login
                            </LinkButton>
                        </div>
                        <PrimaryButton onClick={() => router.push("/signup")}>
                            Signup
                        </PrimaryButton>
                    </>
                )}
            </div>
        </div>
    );
};