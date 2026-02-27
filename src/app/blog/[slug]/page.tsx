import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/mdx-components";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";
import { notFound } from "next/navigation";
import remarkUnwrapImages from "remark-unwrap-images";
import { TTSButton } from "@/components/TTSButton";
import { TranslationWidget } from "@/components/TranslationWidget";

export async function generateStaticParams() {
    const posts = getPostSlugs();
    return posts.map((post) => ({
        slug: post.replace(/\.mdx$/, ""),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const post = getPostBySlug(slug);
        return {
            title: `${post.meta.title} - MyBlog`,
            description: post.meta.excerpt,
            keywords: post.meta.keywords,
            openGraph: {
                title: post.meta.title,
                description: post.meta.excerpt,
                type: "article",
                publishedTime: post.meta.date,
                authors: [post.meta.author || "MyBlog"],
                images: post.meta.featuredImage ? [{ url: post.meta.featuredImage }] : [],
            },
            twitter: {
                card: "summary_large_image",
                title: post.meta.title,
                description: post.meta.excerpt,
                images: post.meta.featuredImage ? [post.meta.featuredImage] : [],
            },
        };
    } catch (error) {
        return {
            title: "Post Not Found",
        };
    }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let post;
    try {
        post = getPostBySlug(slug);
    } catch (error) {
        notFound();
    }

    return (
        <article className="container mx-auto min-h-screen max-w-3xl px-4 py-16 md:px-6">
            <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
            </Link>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": post.meta.category === "Book Session" ? "Review" : (post.meta.category === "Life Stories" || post.meta.category === "Lifestyle") ? "Article" : "BlogPosting",
                        headline: post.meta.title,
                        datePublished: post.meta.date,
                        dateModified: post.meta.date,
                        description: post.meta.excerpt,
                        image: post.meta.featuredImage ? [post.meta.featuredImage] : [],
                        author: {
                            "@type": "Person",
                            name: post.meta.author || "Akhil Prakash",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "MyBlog",
                            logo: {
                                "@type": "ImageObject",
                                url: "https://akhilprakash-myblog.vercel.app/logo.png" // Placeholder or actual logo if available
                            }
                        },
                        mainEntityOfPage: {
                            "@type": "WebPage",
                            "@id": `https://akhilprakash-myblog.vercel.app/blog/${slug}`
                        },
                        ...(post.meta.category === "Book Session" && {
                            itemReviewed: {
                                "@type": "Book",
                                name: post.meta.title.replace("Review: ", ""), // Assessing title format
                                author: {
                                    "@type": "Person",
                                    name: "Unknown" // Ideally should be in frontmatter
                                }
                            },
                            reviewRating: {
                                "@type": "Rating",
                                ratingValue: "5", // Default or needs frontmatter
                                bestRating: "5"
                            }
                        })
                    }),
                }}
            />
            <header className="mb-10 space-y-6 text-center">
                <div className="flex flex-col items-center gap-4">
                    {post.meta.category && (
                        <Link
                            href={`/category/${post.meta.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                            className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/20"
                        >
                            {post.meta.category}
                        </Link>
                    )}
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                        <time dateTime={post.meta.date}>
                            {format(new Date(post.meta.date), "MMMM d, yyyy")}
                        </time>
                        <span>•</span>
                        <span>{post.meta.readTime || "5 min read"}</span>
                    </div>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    {post.meta.title}
                </h1>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-300">
                    {post.meta.author && (
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-gray-400">
                                <User className="h-4 w-4" />
                            </div>
                            <span>{post.meta.author}</span>
                        </div>
                    )}
                </div>

                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <TTSButton textToRead={post.content.replace(/[#*`_\[\]]/g, '')} />
                    <TranslationWidget />
                </div>
                {post.meta.featuredImage && (
                    <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-[#333] bg-[#111]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={post.meta.featuredImage}
                            alt={post.meta.title}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                    </div>
                )}
            </header>

            {/* Blog Content */}
            <div className="prose prose-invert prose-lg mx-auto max-w-none">
                <MDXRemote
                    source={post.content}
                    components={MDXComponents}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkUnwrapImages],
                        },
                    }}
                />
            </div>

            {/* Tags */}
            <div className="mt-12 flex flex-wrap justify-center gap-2 border-t border-[#333] pt-8">
                {post.meta.tags?.map((tag: string) => (
                    <span
                        key={tag}
                        className="rounded-full bg-[#111] border border-[#333] px-3 py-1 text-sm text-gray-400"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Newsletter Section */}
            <div className="mt-16 rounded-2xl border border-[#333] bg-[#111] p-8 text-center">
                <h3 className="mb-2 text-xl font-bold text-white">Subscribe to the newsletter</h3>
                <p className="mb-6 text-gray-400">Get the latest posts delivered right to your inbox.</p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="rounded-full border border-[#333] bg-black px-4 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none"
                    />
                    <button className="rounded-full bg-white px-6 py-2 font-medium text-black transition-colors hover:bg-gray-200">
                        Subscribe
                    </button>
                </div>
            </div>

        </article>
    );
}
