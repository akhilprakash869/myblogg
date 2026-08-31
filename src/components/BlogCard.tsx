import Link from "next/link";
import { format } from "date-fns";
import { Post } from "@/lib/mdx";

export function BlogCard({ post }: { post: Post }) {
    const cardImage = post.meta.featuredImage || post.meta.image;
    const formattedDate = post.meta.date 
        ? format(new Date(post.meta.date.includes('T') ? post.meta.date : `${post.meta.date}T00:00:00`), "MMMM d, yyyy")
        : "";

    return (
        <Link href={`/blog/${post.slug}`} className="group block">
            <article className="flex h-full flex-col space-y-4 rounded-xl border border-[#222] bg-[#111] p-6 transition-colors hover:border-[#444] hover:bg-[#161616]">
                {cardImage && (
                    <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg border border-[#333] bg-black/50 grayscale transition-all duration-500 hover:grayscale-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={cardImage}
                            alt={post.meta.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                    </div>
                )}
                <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        {formattedDate && (
                            <>
                                <time dateTime={post.meta.date}>
                                    {formattedDate}
                                </time>
                                <span>•</span>
                            </>
                        )}
                        <span>{post.meta.readTime || "5 min read"}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white transition-colors group-hover:text-blue-400">
                        {post.meta.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-gray-400">
                        {post.meta.excerpt}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {post.meta.tags?.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-[#222] px-2.5 py-1 text-xs font-medium text-gray-300 group-hover:bg-[#333]"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </article>
        </Link>
    );
}
