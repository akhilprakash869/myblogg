"use client";

import { cn } from "@/lib/utils";

interface VideoProps {
    src: string;
    title?: string;
    className?: string;
    caption?: string;
    type?: "youtube" | "vimeo" | "local";
}

export function Video({ src, title, className, caption, type = "local" }: VideoProps) {

    // Helper to get embed URL for YouTube/Vimeo
    const getEmbedUrl = (url: string, type: "youtube" | "vimeo") => {
        if (type === "youtube") {
            // Convert standard watch URL to embed
            if (url.includes("watch?v=")) {
                return url.replace("watch?v=", "embed/");
            }
            if (url.includes("youtu.be/")) {
                return url.replace("youtu.be/", "www.youtube.com/embed/");
            }
        }
        if (type === "vimeo") {
            // Basic vimeo ID extraction assumption
            const id = url.split("/").pop();
            return `https://player.vimeo.com/video/${id}`;
        }
        return url;
    }

    return (
        <figure className={cn("my-8", className)}>
            <div className="relative overflow-hidden rounded-xl border border-[#333] bg-[#111] aspect-video">
                {type === "local" ? (
                    <video
                        controls
                        className="h-full w-full object-cover"
                        preload="metadata"
                    >
                        <source src={src} />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <iframe
                        src={getEmbedUrl(src, type)}
                        title={title || "Embedded video"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 h-full w-full"
                    />
                )}
            </div>
            {caption && (
                <figcaption className="mt-3 text-center text-sm text-gray-400 italic">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
