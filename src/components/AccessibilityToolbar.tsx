"use client";

import { useState, useEffect, useRef } from "react";
import { Languages } from "lucide-react";

export function AccessibilityToolbar() {
    const [isMalayalam, setIsMalayalam] = useState(false);
    const initialized = useRef(false);

    // Initialize Google Translate Element silently and patch DOM to prevent React crashes
    useEffect(() => {
        // FORCE DEFAULT ENGLISH on mount:
        // Delete any existing Google Translate cookies to prevent automatic translation from prior sessions
        const domains = [window.location.hostname, `.${window.location.hostname}`];
        domains.forEach(domain => {
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=/;`;
            document.cookie = `googtrans=/auto/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=/;`;
            document.cookie = `googtrans=/en/ml; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=/;`;
            document.cookie = `googtrans=/auto/ml; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=/;`;
        });
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        if (initialized.current) return;
        initialized.current = true;

        // Patch DOM to prevent React NotFoundError crashes caused by Google Translate injecting <font> tags
        if (typeof Node === 'function' && Node.prototype) {
            const originalRemoveChild = Node.prototype.removeChild;
            Node.prototype.removeChild = function <T extends Node>(child: T): T {
                if (child.parentNode !== this) {
                    return child;
                }
                return originalRemoveChild.apply(this, [child]) as T;
            };

            const originalInsertBefore = Node.prototype.insertBefore;
            Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
                if (referenceNode && referenceNode.parentNode !== this) {
                    return newNode;
                }
                return originalInsertBefore.apply(this, [newNode, referenceNode]) as T;
            };
        }

        const initScript = document.createElement("script");
        initScript.innerHTML = `
            function googleTranslateElementInit() {
                new window.google.translate.TranslateElement(
                    { pageLanguage: 'en', includedLanguages: 'ml', autoDisplay: false },
                    'google_translate_element'
                );
            }
        `;
        document.body.appendChild(initScript);

        const script = document.createElement("script");
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const toggleLanguage = () => {
        if (!isMalayalam) {
            // Translate to Malayalam
            const selectMenu = document.querySelector('.goog-te-combo') as HTMLSelectElement;
            if (selectMenu) {
                selectMenu.value = 'ml';
                selectMenu.dispatchEvent(new Event('change'));
                setIsMalayalam(true);
            }
        } else {
            // Revert to English
            // The iframe and select API approach is unreliable across browsers and Next.js routing.
            // The most bulletproof way to kill the translation and its sticky cache is an aggressive cookie wipe and reload.

            setIsMalayalam(false);

            const domains = [window.location.hostname, `.${window.location.hostname}`];
            const paths = ['/', '/blog', window.location.pathname];

            domains.forEach(domain => {
                paths.forEach(path => {
                    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=${path};`;
                    document.cookie = `googtrans=/en/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=${path};`;
                    document.cookie = `googtrans=/auto/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=${path};`;
                    document.cookie = `googtrans=/en/ml; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=${path};`;
                    document.cookie = `googtrans=/auto/ml; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=${path};`;
                });
            });
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            // Force reload to completely wipe the Google Translate DOM modifications inside React
            window.location.reload();
        }
    };

    return (
        <div className="notranslate flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-3 shadow-lg backdrop-blur-md sm:justify-start" translate="no">
            <div id="google_translate_element" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }} />

            {/* Custom Translation Toggle */}
            <div className="flex items-center">
                <button
                    onClick={toggleLanguage}
                    className={`flex h-10 items-center gap-3 rounded-full border px-5 text-sm font-semibold shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 ${isMalayalam
                        ? "border-blue-500/50 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                        : "border-white/10 bg-white/5 text-gray-200 hover:bg-white/10 hover:text-white"
                        }`}
                    aria-label={isMalayalam ? "Read in English" : "Translate to Malayalam"}
                >
                    <Languages className="h-5 w-5" />
                    <span>{isMalayalam ? "Read in English" : "Translate to Malayalam"}</span>
                </button>
            </div>
        </div>
    );
}
