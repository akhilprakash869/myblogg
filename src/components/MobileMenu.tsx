"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { usePathname } from "next/navigation";

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
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
        <div className="lg:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white transition-colors flex items-center justify-center p-1"
                aria-label="Toggle mobile menu"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <div
                className={`fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-[#000]/95 backdrop-blur-xl border-t border-[#333] transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"
                    }`}
            >
                <div className="flex-1 overflow-y-auto px-6 py-8">
                    <nav className="flex flex-col gap-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`text-2xl font-bold tracking-tight transition-colors ${pathname === link.href ? "text-white" : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-12 pt-8 border-t border-[#333]">
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white text-black py-4 text-base font-bold transition-transform active:scale-95"
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
