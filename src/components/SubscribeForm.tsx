"use client";

import { useState } from "react";

export function SubscribeForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");

        // Simulate an API call
        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 1000);
    };

    if (status === "success") {
        return (
            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-center text-green-400">
                <p className="font-medium">Thanks for subscribing!</p>
                <p className="mt-1 text-sm text-green-500/70">Check your inbox for a confirmation email.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="rounded-full border border-[#333] bg-black px-4 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none"
                disabled={status === "loading"}
            />
            <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-full bg-white px-6 py-2 font-medium text-black transition-colors hover:bg-gray-200 disabled:opacity-50"
            >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
        </form>
    );
}
