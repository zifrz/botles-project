"use client";
import { useRouter } from "next/navigation"
import { LinkButton } from "./buttons/LinkButton"
import { PrimaryButton } from "./buttons/PrimaryButton";

export const Appbar = ({
    isLoggedIn,
    setIsLoggedIn
}: {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}) => {
    const router = useRouter();

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