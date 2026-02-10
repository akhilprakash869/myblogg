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

    const categoryDescriptions: Record<string, string> = {
        "life-story": "Here, I share the unpolished truth of my journey. From the quiet struggles to the moments of clarity, these are personal reflections on growth, resilience, and the lessons life teaches us when we're paying attention. No exaggeration, no victimhood—just honest storytelling about what it means to be human.",
        "lifestyle": "Where modern science meets traditional wisdom. Explore daily habits, health, mindset, and intentional living—from Indian & Kerala practices to longevity protocols. No medical advice, just practical discipline.",
        "online-security": "In an increasingly connected world, your digital safety is paramount. This section is dedicated to raising awareness about online scams, privacy best practices, and cyber hygiene. We explore ethical ways to protect your personal information and navigate the digital landscape securely. No hacking instructions, just defensive strategies to keep you safe.",
        "politics": "A neutral, analytical space to understand the systems that govern us. Here, we break down political concepts, policies, and governance structures without partisan bias or propaganda. The goal is to foster political awareness and rapid understanding of complex issues through fact-based analysis.",
        "technology": "From coding to open-source tools, this is a practical guide for developers and enthusiasts. Whether you're a beginner looking to write your first line of code or an intermediate developer exploring new frameworks, these articles provide hands-on insights and tutorials to help you build and create.",
        "research-lab": "Welcome to my open notebook. This section contains independent research notes, experiments, and observations from my personal learning journey. It's a space for curiosity and transparency, where I document what I'm exploring. Disclaimer: Content is for educational and learning purposes only.",
    };

    const description = categoryDescriptions[slug.toLowerCase()] || `Latest articles and insights in ${categoryName}.`;

    return (
        <div className="container mx-auto min-h-screen px-4 py-16 md:px-6">
            <div className="mb-12 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                    {categoryName}
                </h1>
                <p className="max-w-2xl text-lg text-gray-400">
                    {description}
                </p>
            </div>

            <BlogList initialPosts={posts} />
        </div>
    );
}
