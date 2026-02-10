import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-[#333] bg-[#000] py-12 text-gray-400">
            <div className="container mx-auto grid gap-8 px-4 md:px-6 md:grid-cols-3">
                <div>
                    <h3 className="mb-4 text-lg font-bold text-white">MyBlog</h3>
                    <p className="text-sm leading-relaxed">
                        Sharing thoughts on technology, design, and the future of the web.
                    </p>
                </div>
                <div>
                    <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                        <li><a href="/blog" className="hover:text-white transition-colors">Blogs</a></li>
                        <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                        <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">Socials</h3>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors"><Github className="h-5 w-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-[#222] pt-8 text-center text-xs">
                &copy; {new Date().getFullYear()} MyBlog. All rights reserved.
            </div>
        </footer>
    );
}
