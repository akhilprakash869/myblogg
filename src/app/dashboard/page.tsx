import { getDrafts, getCategoryStats, getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import { format } from "date-fns";
import { Edit, FileText, Activity } from "lucide-react";

export const metadata = {
    title: "Writer Dashboard - MyBlog",
};

export default function DashboardPage() {
    const drafts = getDrafts();
    const categoryStats = getCategoryStats();

    // Simple streak calculation (consecutive days with posts? or just days since last post?)
    // "Streak" usually implies consecutive days. Let's do "Days since last post" for now as a reverse-streak / freshness indicator.
    // Or, if we want a positive metric: "Recent Activity" 
    const allPosts = getAllPosts();
    const lastPostDate = allPosts.length > 0 ? new Date(allPosts[0].meta.date) : null;
    const daysSinceLastPost = lastPostDate
        ? Math.floor((new Date().getTime() - lastPostDate.getTime()) / (1000 * 60 * 60 * 24))
        : 999;

    return (
        <div className="container mx-auto min-h-screen px-4 py-16 md:px-6">
            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                    Writer Dashboard
                </h1>
                <p className="mt-4 text-lg text-gray-400">
                    Track your writing habits, manage drafts, and keep content fresh.
                </p>
            </div>

            {/* Overview Stats */}
            <div className="grid gap-6 md:grid-cols-3 mb-16">
                <div className="rounded-xl border border-[#333] bg-[#111] p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-900/20 text-blue-500">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Total Posts</p>
                            <p className="text-2xl font-bold text-white">{allPosts.length}</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border border-[#333] bg-[#111] p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-900/20 text-yellow-500">
                            <Edit className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Active Drafts</p>
                            <p className="text-2xl font-bold text-white">{drafts.length}</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border border-[#333] bg-[#111] p-6">
                    <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${daysSinceLastPost < 7 ? "bg-green-900/20 text-green-500" : "bg-red-900/20 text-red-500"}`}>
                            <Activity className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Days Since Last Post</p>
                            <p className="text-2xl font-bold text-white">{daysSinceLastPost} days</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">

                {/* Drafts Section */}
                <section>
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                        <Edit className="h-5 w-5 text-gray-400" />
                        Your Drafts
                    </h2>
                    {drafts.length > 0 ? (
                        <div className="space-y-4">
                            {drafts.map((draft) => (
                                <Link
                                    key={draft.slug}
                                    href={`/blog/${draft.slug}`}
                                    className="block group rounded-xl border border-[#333] bg-[#111] p-6 transition-colors hover:border-gray-500"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
                                                {draft.meta.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                                                {draft.meta.excerpt}
                                            </p>
                                        </div>
                                        <span className="shrink-0 rounded-full bg-yellow-900/30 px-2.5 py-0.5 text-xs font-medium text-yellow-500 border border-yellow-700/50">
                                            Draft
                                        </span>
                                    </div>
                                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                                        <span>Last modified: {draft.meta.date}</span>
                                        {draft.meta.category && <span>• {draft.meta.category}</span>}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-dashed border-[#333] p-12 text-center text-gray-500">
                            No active drafts. Start writing something new!
                        </div>
                    )}
                </section>

                {/* Category Health Section */}
                <section>
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-gray-400" />
                        Category Health
                    </h2>
                    <div className="space-y-4">
                        {categoryStats.map((stat) => (
                            <div
                                key={stat.category}
                                className="rounded-xl border border-[#333] bg-[#111] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                                <div>
                                    <h3 className="text-lg font-medium text-white flex items-center gap-2">
                                        {stat.category}
                                        {stat.isFresh && (
                                            <span className="rounded-full bg-green-900/30 px-2 py-0.5 text-xs font-medium text-green-500 border border-green-700/50">
                                                Active
                                            </span>
                                        )}
                                        {stat.isStale && (
                                            <span className="rounded-full bg-red-900/30 px-2 py-0.5 text-xs font-medium text-red-500 border border-red-700/50">
                                                Needs Update
                                            </span>
                                        )}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {stat.postCount} posts
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Last Updated</p>
                                    <p className={`text-sm font-medium ${stat.isStale ? "text-red-400" : "text-gray-300"}`}>
                                        {stat.daysSinceLastUpdate} days ago
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {stat.lastUpdated}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
