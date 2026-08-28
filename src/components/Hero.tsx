import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
    return (
        <section className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden bg-black px-6 py-28 text-center text-white">
            {/* Ambient Background Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#333333_1px,transparent_1px)] [background-size:28px_28px] opacity-35 pointer-events-none"></div>

            {/* Soft Black & White Spotlight Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] sm:h-[650px] sm:w-[650px] bg-white/[0.05] blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[250px] bg-gradient-to-b from-zinc-800/30 via-transparent to-transparent pointer-events-none"></div>

            <div className="relative z-10 max-w-5xl space-y-10">
                {/* Micro-badge with subtle border & glassmorphism */}
                <div className="inline-flex items-center gap-2.5 rounded-full border border-zinc-700/80 bg-zinc-900/90 px-5 py-2 text-xs sm:text-sm font-medium text-zinc-300 backdrop-blur-md shadow-lg">
                    <Sparkles className="h-4 w-4 text-white animate-pulse" />
                    <span className="tracking-widest uppercase text-xs font-semibold text-zinc-200">Thoughts, Stories & Ideas</span>
                </div>

                {/* Main Hero Title - Massive Single-Line Bold Characters */}
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-black tracking-tight leading-none whitespace-nowrap">
                    <span className="text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                        Simple{" "}
                    </span>
                    <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                        Thoughts.
                    </span>
                </h1>

                {/* Subtitle - Big Readable Font */}
                <p className="mx-auto max-w-3xl text-xl sm:text-2xl md:text-3xl text-zinc-300 font-normal italic leading-relaxed tracking-wide">
                    &ldquo;The monotony and solitude of a quiet life stimulates the creative mind.&rdquo; &ndash; Albert Einstein
                </p>

                {/* Action Buttons with Big Typography & High Contrast */}
                <div className="flex flex-col items-center justify-center gap-5 pt-4 sm:flex-row">
                    <Link
                        href="/blog"
                        className="group flex items-center justify-center gap-3 rounded-full bg-white px-10 py-4 sm:px-12 sm:py-5 text-base sm:text-lg font-bold text-black transition-all duration-300 hover:bg-zinc-200 hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(255,255,255,0.25)]"
                    >
                        <span>Read the Blog</span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </Link>
                    <Link
                        href="/about"
                        className="flex items-center justify-center rounded-full border-2 border-zinc-700 bg-zinc-950/70 px-10 py-4 sm:px-12 sm:py-5 text-base sm:text-lg font-bold text-zinc-200 transition-all duration-300 hover:border-white hover:text-white hover:bg-zinc-900 hover:scale-105 active:scale-95 backdrop-blur-md"
                    >
                        About Function
                    </Link>
                </div>
            </div>
        </section>
    );
}
