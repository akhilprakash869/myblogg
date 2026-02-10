import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Video } from "@/components/Video";
import { Podcast } from "@/components/Podcast";

export const MDXComponents = {
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1
            className={cn(
                "mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-white",
                className
            )}
            {...props}
        />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            className={cn(
                "mt-10 scroll-m-20 border-b border-[#333] pb-1 text-3xl font-semibold tracking-tight text-white first:mt-0",
                className
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            className={cn(
                "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-white",
                className
            )}
            {...props}
        />
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p
            className={cn("leading-7 text-gray-300 [&:not(:first-child)]:mt-6", className)}
            {...props}
        />
    ),
    a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
            className={cn("font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white", className)}
            {...props}
        />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2 text-gray-300", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2 text-gray-300", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className={cn(
                "mt-6 border-l-2 border-white pl-6 italic text-gray-400",
                className
            )}
            {...props}
        />
    ),
    img: ({
        className,
        alt,
        src,
        ...props
    }: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <figure className="my-8">
            <div className="relative overflow-hidden rounded-xl border border-[#333] bg-[#111]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className={cn("w-full object-cover transition-opacity duration-300", className)}
                    alt={alt}
                    src={src}
                    loading="lazy"
                    {...props}
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>
            {alt && (
                <figcaption className="mt-3 text-center text-sm text-gray-400 italic">
                    {alt}
                </figcaption>
            )}
        </figure>
    ),
    hr: ({ ...props }) => <hr className="my-4 border-[#333] md:my-8" {...props} />,

    // Custom Components
    Image: (props: any) => <Image {...props} />,
    Link: (props: any) => <Link {...props} />,
    Video: (props: any) => <Video {...props} />,
    Podcast: (props: any) => <Podcast {...props} />,
};
