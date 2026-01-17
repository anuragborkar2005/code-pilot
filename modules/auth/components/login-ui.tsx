"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signIn } from "@/lib/auth-client";
import { AtomIcon, GithubIcon } from "lucide-react";
import { useState } from "react";

export const LoginUI = () => {
    const [isLoading, setLoading] = useState(false);

    const handleGithubLogin = async () => {
        setLoading(true);
        try {
            await signIn.social({
                provider: "github",
            });
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : "Auth Error";
            console.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black flex w-full min-h-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex flex-col md:flex-row w-full  gap-6 rounded-xl shadow-lg overflow-hidden">
                {/* Left Section */}
                <div className="flex flex-col justify-center flex-1  p-6 md:p-10 gap-6">
                    <div className="flex items-center gap-3 mb-8">
                        <AtomIcon size={64} className="text-blue-500" />
                        <span className="font-extrabold text-5xl text-blue-500">
                            Code Pilot
                        </span>
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
                            Automated reviews that feel human —
                            <br /> but scale infinitely.
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Supercharge your team to ship faster with the most
                            advanced AI code reviews.
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col justify-center flex-1 p-8 md:p-12 gap-10">
                    <div className="space-y-3">
                        <h2 className="text-5xl md:text-5xl text-white font-bold">
                            Welcome Back!
                        </h2>
                        <p className="text-slate-400">
                            Login using the following provider
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <Button
                            onClick={handleGithubLogin}
                            disabled={isLoading}
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-3 transition-all duration-200"
                        >
                            {isLoading ? (
                                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
                            ) : (
                                <GithubIcon size={28} />
                            )}
                            {isLoading
                                ? "Signing in..."
                                : "Sign in with GitHub"}
                        </Button>

                        <div className="text-center text-white">
                            <p>
                                New to{" "}
                                <span className="font-bold text-blue-500">
                                    Code Pilot
                                </span>
                                ?{" "}
                                <span className="text-blue-500 font-medium cursor-pointer hover:underline">
                                    Sign Up
                                </span>
                            </p>
                            <p className="mt-2">
                                <span className="text-blue-500 font-medium cursor-pointer hover:underline">
                                    Self-hosted service
                                </span>
                            </p>
                        </div>
                    </div>

                    <Separator className="bg-gray-700" />
                </div>
            </div>
        </div>
    );
};
