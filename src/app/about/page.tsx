import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
    title: "About - MyBlog",
    description: "Learn more about the author and the purpose of this blog.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto min-h-screen px-4 py-16 md:px-6">
            <div className="mx-auto max-w-3xl space-y-8">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    About
                </h1>
                <div className="space-y-6 text-lg text-gray-300">
                    <p>
                        Welcome to <strong>MyBlog</strong>. This is a minimal, distraction-free space designed for sharing thoughts on technology, design, and the future of the web.
                    </p>
                    <p>
                        I believe that the best way to learn is to share what you know. This blog serves as a digital garden where I cultivate ideas, document my learning journey, and connect with like-minded individuals.
                    </p>
                    <h2 className="text-2xl font-semibold text-white">The Goal</h2>
                    <p>
                        To provide high-quality, in-depth content that is easy to read and free from clutter. No ads, no pop-ups, just pure content.
                    </p>
                </div>

                <div className="pt-8">
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-200"
                    >
                        Get in Touch
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
