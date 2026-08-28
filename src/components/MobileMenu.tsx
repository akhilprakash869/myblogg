"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { usePathname } from "next/navigation";

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const links = [
        { href: "/category/life-story", label: "Life Story" },
        { href: "/category/lifestyle", label: "Lifestyle" },
        { href: "/category/online-security", label: "Online Security" },
        { href: "/category/politics", label: "Politics" },
        { href: "/category/research-lab", label: "Research Lab" },
        { href: "/category/technology", label: "Technology" },
        { href: "/category/books-newsletters", label: "Books & Newsletters" },
    ];

    return (
        <div className="xl:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-zinc-300 hover:text-white transition-colors flex items-center justify-center p-2 rounded-lg border border-zinc-800 bg-zinc-900/80"
                aria-label="Toggle mobile menu"
            >
                {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>

            <div
                className={`absolute left-0 right-0 top-full h-[calc(100vh-5rem)] z-40 flex flex-col bg-black/95 backdrop-blur-2xl border-t border-zinc-800 transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"
                    }`}
            >
                <div className="flex-1 overflow-y-auto px-8 py-10 pb-32">
                    <nav className="flex flex-col gap-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`font-display text-3xl font-black tracking-tight transition-colors ${pathname === link.href ? "text-white underline underline-offset-8" : "text-zinc-400 hover:text-white"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-12 pt-8 border-t border-zinc-800">
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="font-display flex w-full items-center justify-center gap-2.5 rounded-full bg-white text-black py-4 text-lg font-bold transition-transform active:scale-95 shadow-lg"
                        >
                            <User className="h-5 w-5" />
                            <span>Sign In</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
