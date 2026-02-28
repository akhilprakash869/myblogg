import { getAllPosts } from "@/lib/mdx";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();
    const baseUrl = "https://akhilprakash.live";

    // Format strictly to YYYY-MM-DD string to satisfy Search Console (no timezones)
    const today = new Date().toISOString().split("T")[0];

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
            // Fallback securely to today if format fails
        }

        return {
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: dateString,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        };
    });

    // Dynamic Category Pages
    const categories = Array.from(new Set(posts.map((post) => post.meta.category).filter(Boolean)));
    const categoryPages = categories.map((category) => ({
        url: `${baseUrl}/category/${category!.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`,
        lastModified: today,
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: today,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: today,
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        ...categoryPages,
        ...blogPosts,
    ];
}
