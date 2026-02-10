import { getPostsByCategory, getAllCategories } from "@/lib/mdx";
import { BlogList } from "@/components/BlogList";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateStaticParams() {
    const categories = getAllCategories();
    return categories.map((category) => ({
        slug: category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-"),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    // Simple un-slugify for display (this logic might need refinement if strict mapping is needed)
    // For now, we'll try to match it back to one of the existing categories or just capitalize it.
    // Actually, getting the posts and taking the category from the first one is safer if we want exact casing.

    // Reverse slugify attempt
    const categoryName = slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

    return {
        title: `${categoryName} - MyBlog`,
        description: `Read the latest articles about ${categoryName}.`,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // We need to match the slug back to the actual category string in the MDX files.
    // Since we don't have a database of categories, we can iterate all categories to find a match.
    const allCategories = getAllCategories();
    const categoryName = allCategories.find(c =>
        c.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === slug
    );

    if (!categoryName) {
        // If exact match fails, it might be that the slug generation logic differs.
        // For now, let's try to pass the slug directly if no match found (or 404).
        notFound();
    }

    const posts = getPostsByCategory(categoryName);

    return (
        <div className="container mx-auto min-h-screen px-4 py-16 md:px-6">
            <div className="mb-12 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                    {categoryName}
                </h1>
                <p className="max-w-2xl text-lg text-gray-400">
                    Latest articles and insights in {categoryName}.
                </p>
            </div>

            <BlogList initialPosts={posts} />
        </div>
    );
}
