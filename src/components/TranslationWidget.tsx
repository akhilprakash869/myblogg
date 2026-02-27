"use client";

import { useEffect, useRef } from "react";
import { Languages } from "lucide-react";

export function TranslationWidget() {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        // Add the Google Translate initialization script manually
        const initScript = document.createElement("script");
        initScript.innerHTML = `
            function googleTranslateElementInit() {
                new window.google.translate.TranslateElement(
                    { pageLanguage: 'en', includedLanguages: 'ml', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
                    'google_translate_element'
                );
            }
        `;
        document.body.appendChild(initScript);

        // Add the Google Translate library
        const script = document.createElement("script");
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup scripts when component unmounts
            if (initScript.parentNode) {
                initScript.parentNode.removeChild(initScript);
            }
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 py-1.5 pl-3 pr-2 text-sm text-gray-300 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white">
            <Languages className="h-4 w-4" />
            <div id="google_translate_element" className="translate-widget-container h-6 overflow-hidden [&_.goog-te-combo]:bg-transparent [&_.goog-te-combo]:border-none [&_.goog-te-combo]:text-sm [&_.goog-te-combo]:text-white [&_.goog-te-combo]:outline-none [&_.goog-te-combo]:cursor-pointer [&_.goog-logo-link]:hidden [&_.goog-te-gadget]:text-[0px] [&_.goog-te-gadget_span]:hidden min-w-[120px]" />
        </div>
    );
}
