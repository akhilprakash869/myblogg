import Link from "next/link";
import { format } from "date-fns";
import { Post } from "@/lib/mdx";

export function BlogCard({ post }: { post: Post }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block">
            <article className="flex h-full flex-col space-y-4 rounded-xl border border-[#222] bg-[#111] p-6 transition-colors hover:border-[#444] hover:bg-[#161616]">
                {/* Conditional rendering for text-first approach if needed, but for now keeping images as they are part of the 'card' aesthetic. 
                    However, we can make them more subtle or enforce aspect ratio. 
                    User asked for "Text-first layout (NO personal photo gallery)" for Life Story.
                    The BlogCard is used for everything. Let's ensure it handles missing images gracefully or maybe add a variant.
                    For now, I'll just ensure the object-cover is good and maybe reduce opacity/brightness if needed? 
                    Actually, the user said "Minimal visuals". 
                    Let's just keep the existing card but maybe make the title the primary element visually. 
                    I'll add a hover effect to the image to make it less static.
                */}
                {post.meta.featuredImage && (
                    <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg border border-[#333] bg-black/50 grayscale transition-all duration-500 hover:grayscale-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={post.meta.featuredImage}
                            alt={post.meta.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                    </div>
                )}
                <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <time dateTime={post.meta.date}>
                            {format(new Date(post.meta.date), "MMMM d, yyyy")}
                        </time>
                        <span>•</span>
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
