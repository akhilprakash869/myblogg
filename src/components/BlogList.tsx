"use client";

import { useState } from "react";
import { Post } from "@/lib/mdx";
import { BlogCard } from "@/components/BlogCard";
import { Search } from "lucide-react";

export function BlogList({ initialPosts }: { initialPosts: Post[] }) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = initialPosts.filter((post) =>
        post.meta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.meta.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="relative max-w-md mx-auto md:mx-0">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-[#333] bg-[#111] py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
            </div>

            {filteredPosts.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center text-gray-500">
                    No posts found matching your search.
                </div>
            )}
        </div>
    );
}
