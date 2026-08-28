import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/lib/mdx";
import { Search } from "@/components/Search";
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
                            Books
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                    <Search posts={allPosts} />
                    <MobileMenu />
                </div>
            </div>
        </nav>
    );
}

