import { Mail, MapPin } from "lucide-react";

export const metadata = {
    title: "Contact - MyBlog",
    description: "Get in touch with us.",
};

export default function ContactPage() {
    return (
        <div className="container mx-auto min-h-screen px-4 py-16 md:px-6">
            <div className="mx-auto max-w-3xl">
                <h1 className="mb-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    Contact
                </h1>
                <p className="mb-12 text-lg text-gray-400">
                    Have a question, suggestion, or just want to say hello? I'd love to hear from you.
                </p>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="rounded-lg bg-[#111] p-3 text-white border border-[#333]">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Email</h3>
                                <p className="text-sm text-gray-400">nathantheresa22@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="rounded-lg bg-[#111] p-3 text-white border border-[#333]">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Location</h3>
                                <p className="text-sm text-gray-400">Kerala, Kochin</p>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                                <input id="name" className="w-full rounded-md border border-[#333] bg-[#111] px-3 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                                <input id="email" type="email" className="w-full rounded-md border border-[#333] bg-[#111] px-3 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none" placeholder="nathantheresa22@gmail.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                            <textarea id="message" className="min-h-[150px] w-full rounded-md border border-[#333] bg-[#111] px-3 py-2 text-white placeholder-gray-500 focus:border-white focus:outline-none" placeholder="Your message..." />
                        </div>
                        <button type="submit" className="w-full rounded-md bg-white px-4 py-2 font-medium text-black transition-colors hover:bg-gray-200">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
