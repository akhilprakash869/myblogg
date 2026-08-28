import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/lib/mdx";
import { Search } from "@/components/Search";
import { User } from "lucide-react";
import { MobileMenu } from "@/components/MobileMenu";

export function Navbar() {
    const allPosts = getAllPosts();

    return (
        <nav className="notranslate sticky top-0 z-50 w-full bg-black/95 backdrop-blur-xl" translate="no">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8 gap-4">
                <div className="flex items-center gap-6 min-w-0 flex-1">
                    {/* Brand Logo with Modern Display Font */}
                    <Link href="/" className="flex items-center gap-2.5 font-display text-2xl md:text-3xl font-black tracking-tight text-white hover:opacity-90 transition-opacity whitespace-nowrap shrink-0">
                        <span>MyBlog</span>
                        <span className="h-2.5 w-2.5 rounded-full bg-white animate-pulse"></span>
                    </Link>

                    {/* Desktop Navigation - Larger Bold Single-Line Links */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                        <Link href="/category/life-story" className="font-display text-lg font-bold text-zinc-300 transition-colors hover:text-white tracking-wide whitespace-nowrap">
                            Life Story
                        </Link>
                        <Link href="/category/lifestyle" className="font-display text-lg font-bold text-zinc-300 transition-colors hover:text-white tracking-wide whitespace-nowrap">
                            Lifestyle
                        </Link>
                        <Link href="/category/online-security" className="font-display text-lg font-bold text-zinc-300 transition-colors hover:text-white tracking-wide whitespace-nowrap">
                            Online Security
                        </Link>
                        <Link href="/category/politics" className="font-display text-lg font-bold text-zinc-300 transition-colors hover:text-white tracking-wide whitespace-nowrap">
                            Politics
                        </Link>
                        <Link href="/category/research-lab" className="font-display text-lg font-bold text-zinc-300 transition-colors hover:text-white tracking-wide whitespace-nowrap">
                            Research Lab
                        </Link>
                        <Link href="/category/technology" className="font-display text-lg font-bold text-zinc-300 transition-colors hover:text-white tracking-wide whitespace-nowrap">
                            Technology
                        </Link>
                        <Link href="/category/books-newsletters" className="font-display text-lg font-bold text-zinc-300 transition-colors hover:text-white tracking-wide whitespace-nowrap">
                            Books & Newsletters
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                    <Search posts={allPosts} />

                    <Link
                        href="/login"
                        className="hidden md:flex items-center gap-2.5 font-display text-lg font-bold text-zinc-100 border border-zinc-700/80 bg-zinc-900/90 px-6 py-2.5 rounded-full transition-all duration-200 hover:bg-white hover:text-black hover:border-white shadow-sm whitespace-nowrap"
                    >
                        <User className="h-5 w-5" />
                        <span className="whitespace-nowrap">Sign In</span>
                    </Link>

                    <MobileMenu />
                </div>
            </div>
        </nav>
    );
}

