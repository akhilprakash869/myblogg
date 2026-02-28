import { getAllPosts } from "@/lib/mdx";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();
    const baseUrl = "https://akhilprakash.live";

    // Strict YYYY-MM-DD format, safely stripped of time/timezone
    const today = new Date().toISOString().split("T")[0];

    // Map Blog Posts
    const blogPosts = posts.map((post) => {
        let dateString = today;
        try {
            if (post.meta.date) {
                const parsedDate = new Date(post.meta.date);
                if (!isNaN(parsedDate.getTime())) {
                    dateString = parsedDate.toISOString().split("T")[0];
                }
            }
        } catch (e) {
            // Safe fallback
        }

        return {
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: dateString,
        };
    });

    // Map Dynamic Category Pages
    const categories = Array.from(new Set(posts.map((post) => post.meta.category).filter(Boolean)));
    const categoryPages = categories.map((category) => ({
        url: `${baseUrl}/category/${category!.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`,
        lastModified: today,
    }));

    return [
        {
            url: baseUrl,
            lastModified: today,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: today,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: today,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: today,
        },
        ...categoryPages,
        ...blogPosts,
    ];
}
