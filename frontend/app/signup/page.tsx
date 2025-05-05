"use client";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignup = async () => {
        try {
            setLoading(true);
            setError("");
            await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                username: email,
                password,
                name
            });
            router.push("/login");
        } catch (err: any) {
            setError("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[calc(100vh-96px)] flex items-center justify-center px-4 bg-white">
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left: Marketing content */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                        Join millions worldwide who automate their work using{" "}
                        <span className="text-amber-600">Botles</span>.
                    </h1>
                    <div className="space-y-4 text-gray-700 text-sm">
                        <CheckFeature label="Easy setup, no coding required" />
                        <CheckFeature label="Free forever for core features" />
                        <CheckFeature label="14-day trial of premium features & apps" />
                    </div>
                </div>

                {/* Right: Signup form */}
                <div className="border border-gray-200 rounded-xl p-6 shadow-sm w-full">
                    <div className="space-y-5">
                        <div>
                            <Input
                                label="Name"
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <Input
                                label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <Input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Your secure password"
                                label="Password"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}

                        <div className="pt-2">
                            <PrimaryButton
                                onClick={handleSignup}
                                size="big"
                                fullWidth
                                disable={loading}
                            >
                                {loading ? "Creating account..." : "Get started free"}
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}