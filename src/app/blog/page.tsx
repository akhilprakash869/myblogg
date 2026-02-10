import { getAllPosts } from "@/lib/mdx";
import { BlogList } from "@/components/BlogList";

export const metadata = {
    title: "Blog - Thoughts & Stories",
    description: "Read our latest articles on web development, design, and technology.",
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <div className="container mx-auto min-h-screen px-4 py-16 md:px-6">
            <div className="mb-12 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                    The Blog
                </h1>
                <p className="max-w-2xl text-lg text-gray-400">
                    Insights, tutorials, and stories from the world of software development.
                </p>
            </div>

            <BlogList initialPosts={posts} />
        </div>
    );
}
