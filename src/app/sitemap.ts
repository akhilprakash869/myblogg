import { getAllPosts } from "@/lib/mdx";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();
    const baseUrl = "https://akhilprakash.live"; // Replace with your actual domain

    const blogPosts = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.meta.date,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    // Dynamic Category Pages
    const categories = Array.from(new Set(posts.map((post) => post.meta.category).filter(Boolean)));
    const categoryPages = categories.map((category) => ({
        url: `${baseUrl}/category/${category!.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        ...categoryPages,
        ...blogPosts,
    ];
}
