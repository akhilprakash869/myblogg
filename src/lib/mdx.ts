import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "content/posts");


export type Post = {
    slug: string;
    meta: {
        title: string;
        date: string;
        excerpt: string;
        category?: string;
        tags: string[];
        draft?: boolean;
        readTime?: string;
        author?: string;
        featuredImage?: string;
        keywords?: string[];
        [key: string]: any;
    };
    content: string;
};

export const getPostSlugs = () => {
    return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path) && !path.startsWith("_"));
};

export const getPostBySlug = (slug: string): Post => {
    const realSlug = slug.replace(/\.mdx?$/, "");
    const filePath = path.join(POSTS_PATH, `${realSlug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
        slug: realSlug,
        meta: data as Post["meta"],
        content,
    };
};

export const getAllPosts = (includeDrafts = false): Post[] => {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        // Filter out drafts unless specified
        .filter((post) => includeDrafts || !post.meta.draft)
        // Sort posts by date in descending order
        .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
    return posts;
};

export const getDrafts = (): Post[] => {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        .filter((post) => post.meta.draft)
        .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
    return posts;
};

export const getPostsByCategory = (category: string): Post[] => {
    const allPosts = getAllPosts();
    return allPosts.filter((post) =>
        post.meta.category?.toLowerCase() === category.toLowerCase()
    );
};

export const getAllCategories = (): string[] => {
    const posts = getAllPosts();
    const categories = new Set(posts.map((post) => post.meta.category).filter(Boolean));
    return Array.from(categories) as string[];
};

export const getCategoryStats = () => {
    const posts = getAllPosts();
    const categories = getAllCategories();

    return categories.map(category => {
        const categoryPosts = posts.filter(p => p.meta.category === category);
        const latestPost = categoryPosts[0]; // Already sorted by date

        // Calculate days since last update
        const lastUpdatedDate = new Date(latestPost?.meta.date || 0);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - lastUpdatedDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
            category,
            postCount: categoryPosts.length,
            lastUpdated: latestPost?.meta.date || "N/A",
            daysSinceLastUpdate: diffDays,
            isStale: diffDays > 30, // Example threshold
            isFresh: diffDays <= 7 // Example threshold
        };
    }).sort((a, b) => a.daysSinceLastUpdate - b.daysSinceLastUpdate); // Sort by freshness
};

