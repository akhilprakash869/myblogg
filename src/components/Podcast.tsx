"use client";

import { cn } from "@/lib/utils";
import { Mic } from "lucide-react";

interface PodcastProps {
    src: string;
    caption?: string;
    className?: string;
    title?: string;
}

export function Podcast({ src, caption, className, title }: PodcastProps) {
    return (
        <figure className={cn("my-8", className)}>
            <div className="overflow-hidden rounded-xl border border-[#333] bg-[#111]">
                <div className="flex items-center gap-4 border-b border-[#333] bg-[#161616] p-4">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white text-black">
                        <Mic className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">{title || caption || "Audio Episode"}</p>
                        <p className="truncate text-xs text-gray-400">Podcast</p>
                    </div>
                </div>
                <div className="p-4">
                    <audio
                        controls
                        className="w-full"
                        preload="metadata"
                    >
                        <source src={src} />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
            {caption && (
                <figcaption className="mt-3 text-center text-sm text-gray-400 italic">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
