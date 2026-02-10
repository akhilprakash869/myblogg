import { Hero } from "@/components/Hero";
import { BlogCard } from "@/components/BlogCard";
import { getAllPosts, getPostsByCategory } from "@/lib/mdx";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 3);



  const bookPosts = getPostsByCategory("Books & Newsletters").slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Life Stories Section */}
      <section className="container mx-auto px-4 py-16 md:px-6 border-b border-[#222]">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Life Stories</h2>
            <p className="text-gray-400 max-w-xl">
              Biographical narratives of thinkers, creators, and their impact on the world.
            </p>
          </div>
          <Link
            href="/category/life-story"
            className="text-sm font-medium text-gray-400 hover:text-white"
          >
            View archive
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {getPostsByCategory("Life Story").length > 0 ? (
            getPostsByCategory("Life Story").slice(0, 2).map((post) => (
              <div key={post.slug} className="group cursor-pointer">
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-semibold text-white group-hover:text-gray-300 transition-colors mb-2">
                    {post.meta.title}
                  </h3>
                  <p className="text-gray-400 line-clamp-3 leading-relaxed">
                    {post.meta.excerpt}
                  </p>
                  <div className="mt-4 text-xs text-gray-500 uppercase tracking-widest">
                    Read Life Story
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-2 border border-dashed border-[#333] rounded-lg p-8 text-center text-gray-500">
              <p className="italic">"A life in context."</p>
              <p className="mt-2 text-sm">Life Story archives coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Book Session Section */}
      <section className="container mx-auto px-4 py-16 md:px-6 border-b border-[#222] bg-[#0a0a0a]">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Book Session</h2>
            <p className="text-gray-400">Structured reading notes and analysis.</p>
          </div>
          <Link
            href="/category/books-newsletters"
            className="text-sm font-medium text-gray-400 hover:text-white"
          >
            View all notes
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {bookPosts.length > 0 ? (
            bookPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))
          ) : (
            <p className="text-gray-500">No reading notes yet.</p>
          )}
        </div>
      </section>

      {/* Latest Writings Section */}
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white">Latest Writings</h2>
          <Link
            href="/blog"
            className="group flex items-center gap-1 text-sm font-medium text-gray-400 transition-colors hover:text-white"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
