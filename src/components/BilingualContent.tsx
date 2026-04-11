"use client";

import { useState, createContext, useContext } from "react";
import { Languages } from "lucide-react";

const LangContext = createContext<"en"|"ml">("en");

export function BilingualWrapper({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<"en" | "ml">("en");
    return (
        <LangContext.Provider value={lang}>
            <div className="mb-6 flex justify-end notranslate" translate="no">
                <button
                    onClick={() => setLang(lang === "en" ? "ml" : "en")}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-200 transition-colors hover:bg-white/10"
                >
                    <Languages className="h-4 w-4" />
                    <span>{lang === "en" ? "Read in Malayalam" : "Read in English"}</span>
                </button>
            </div>
            {children}
        </LangContext.Provider>
    );
}

export function EnglishContent({ children }: { children: React.ReactNode }) {
    const lang = useContext(LangContext);
    return lang === "en" ? <div className="bilingual-en">{children}</div> : null;
}

export function MalayalamContent({ children }: { children: React.ReactNode }) {
    const lang = useContext(LangContext);
    return lang === "ml" ? <div className="bilingual-ml">{children}</div> : null;
}
