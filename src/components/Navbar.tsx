import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/lib/mdx";
import { Search } from "@/components/Search";
import { Menu, User } from "lucide-react";

export function Navbar() {
    const categories = getAllCategories();
    // Prioritize certain categories for the top bar if space is limited, or show all in a clean way.
    // Given the requirement "Appear clearly in the main navigation menu", we'll list them.
    // But 7 is a lot. Let's list the most "distinct" ones and put others in a "Topics" dropdown if needed.
    // For now, let's try to fit them in a horizontally scrollable container on mobile, and a clean list on desktop.

    // We need posts for the global search
    const allPosts = getAllPosts();

    return (
        <nav className="notranslate sticky top-0 z-50 w-full border-b border-[#333] bg-[#000]/80 backdrop-blur-md" translate="no">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter mr-4">
                        <span>MyBlog</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        <Link href="/category/life-story" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Life Story</Link>
                        <Link href="/category/lifestyle" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Lifestyle</Link>
                        <Link href="/category/online-security" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Online Security</Link>
                        <Link href="/category/politics" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Politics</Link>
                        <Link href="/category/technology" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Technology</Link>
                        <Link href="/category/research-lab" className="text-sm font-medium text-gray-300 transition-colors hover:text-white">Research Lab</Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Search posts={allPosts} />

                    <Link
                        href="/login"
                        className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                    >
                        <User className="h-4 w-4" />
                        <span>Sign In</span>
                    </Link>

                    {/* Mobile Menu Button - Placeholder for now, could implement a real mobile drawer */}
                    <button className="lg:hidden text-gray-300 hover:text-white">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
            {/* Mobile Horizontal Scroll for Categories */}
            <div className="lg:hidden border-t border-[#333] overflow-x-auto">
                <div className="flex items-center gap-6 px-4 py-3 min-w-max">
                    <Link href="/category/life-story" className="text-sm font-medium text-gray-300 whitespace-nowrap">Life Story</Link>
                    <Link href="/category/lifestyle" className="text-sm font-medium text-gray-300 whitespace-nowrap">Lifestyle</Link>
                    <Link href="/category/online-security" className="text-sm font-medium text-gray-300 whitespace-nowrap">Online Security</Link>
                    <Link href="/category/politics" className="text-sm font-medium text-gray-300 whitespace-nowrap">Politics</Link>
                    <Link href="/category/technology" className="text-sm font-medium text-gray-300 whitespace-nowrap">Technology</Link>
                    <Link href="/category/research-lab" className="text-sm font-medium text-gray-300 whitespace-nowrap">Research Lab</Link>
                </div>
            </div>
        </nav>
    );
}

