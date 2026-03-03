"use client";

import { useState, useEffect, useRef } from "react";
import { Languages } from "lucide-react";

export function AccessibilityToolbar() {
    const [isMalayalam, setIsMalayalam] = useState(false);
    const initialized = useRef(false);

    // Initialize Google Translate Element silently and patch DOM to prevent React crashes
    useEffect(() => {
        // Sync state from cookie on mount
        if (document.cookie.includes('googtrans=/en/ml') || document.cookie.includes('googtrans=/auto/ml')) {
            setIsMalayalam(true);
        }

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
            // Revert to English (Original)
            // The iframe approach is unreliable across browsers and Next.js routing.
            // The most bulletproof way is to clear the googtrans cookie and reload.

            // Clear cookie on exact domain
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
            // Clear cookie on base domain (if applicable)
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${window.location.hostname}; path=/;`;

            const selectMenu = document.querySelector('.goog-te-combo') as HTMLSelectElement;
            if (selectMenu) {
                selectMenu.value = 'en'; // Try setting to English explicitly first
                selectMenu.dispatchEvent(new Event('change'));
            }

            setIsMalayalam(false);

            // Force reload to completely wipe the Google Translate DOM modifications
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
                    className={`flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors ${isMalayalam ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30" : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                >
                    <Languages className="h-4 w-4" />
                    <span>{isMalayalam ? "Read in English" : "Malayalam"}</span>
                </button>
            </div>
        </div>
    );
}
