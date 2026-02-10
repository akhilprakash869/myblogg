import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-black px-4 py-24 text-center text-white">
            {/* Abstract Background Element (optional) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] bg-white opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl space-y-8">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl leading-tight">
                    <span className="border-2 border-white text-white px-2 mr-1 rounded-sm">S</span>imple{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                        <span className="border-2 border-white text-white px-2 mr-1 rounded-sm inline-block">T</span>houghts.
                    </span>
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-gray-400 md:text-xl">
                    A minimal space for developers, designers, and thinkers to share knowledge and explore the digital frontier. Updated regularly.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        href="/blog"
                        className="group flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-gray-200"
                    >
                        Read the Blog
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href="/about"
                        className="rounded-full border border-gray-700 px-8 py-3 text-sm font-semibold text-gray-300 transition-all hover:border-white hover:text-white"
                    >
                        About Function
                    </Link>
                </div>
            </div>
        </section>
    );
}
