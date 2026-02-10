"use client";

import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { Post } from "@/lib/mdx";

type SearchProps = {
    posts: Post[];
};

export function Search({ posts }: SearchProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const filteredPosts = posts.filter((post) => {
        const searchContent = `${post.meta.title} ${post.meta.excerpt} ${post.meta.category || ""} ${post.meta.tags?.join(" ")}`.toLowerCase();
        return searchContent.includes(query.toLowerCase());
    });

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="group flex items-center gap-2 rounded-full border border-gray-700 bg-black px-3 py-1.5 text-sm text-gray-400 transition-colors hover:border-gray-500 hover:text-white"
            >
                <SearchIcon className="h-4 w-4" />
                <span className="hidden sm:inline-block">Search...</span>
                <kbd className="hidden rounded border border-gray-700 bg-[#111] px-1.5 py-0.5 text-[10px] font-medium text-gray-400 sm:inline-block">
                    ⌘K
                </kbd>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-4 pt-[15vh] backdrop-blur-sm">
                    <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-[#333] bg-[#000] shadow-2xl">
                        <div className="flex items-center border-b border-[#333] px-4 py-3">
                            <SearchIcon className="mr-3 h-5 w-5 text-gray-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search articles, topics, podcasts..."
                                className="flex-1 bg-transparent text-lg text-white placeholder-gray-500 focus:outline-none"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                onClick={() => setIsOpen(false)}
                                className="ml-3 rounded-md p-1 text-gray-400 hover:bg-[#222] hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {filteredPosts.length > 0 ? (
                                <div className="space-y-1">
                                    {filteredPosts.map((post) => (
                                        <Link
                                            key={post.slug}
                                            href={`/blog/${post.slug}`}
                                            onClick={() => setIsOpen(false)}
                                            className="block rounded-lg p-3 transition-colors hover:bg-[#111]"
                                        >
                                            <div className="mb-1 text-sm font-medium text-white">
                                                {post.meta.title}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                {post.meta.category && (
                                                    <span className="rounded-full bg-[#222] px-2 py-0.5 text-gray-300">
                                                        {post.meta.category}
                                                    </span>
                                                )}
                                                <span>{post.meta.date}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : query ? (
                                <div className="p-8 text-center text-gray-500">
                                    No results found for "{query}"
                                </div>
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    Type to search...
                                </div>
                            )}
                        </div>
                        <div className="border-t border-[#333] px-4 py-2 text-xs text-gray-500">
                            Press <kbd className="font-sans">ESC</kbd> to close
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
