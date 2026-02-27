"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Languages, Volume2, VolumeX } from "lucide-react";

export function AccessibilityToolbar() {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isMalayalam, setIsMalayalam] = useState(false);
    const [supported, setSupported] = useState(true);
    const initialized = useRef(false);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    // Initialize Speech Synthesis and Google Translate
    useEffect(() => {
        if (typeof window !== "undefined" && !("speechSynthesis" in window)) {
            setSupported(false);
        } else {
            // Pre-load voices
            window.speechSynthesis.getVoices();
        }

        if (initialized.current) return;
        initialized.current = true;

        // Initialize Google Translate Element silently
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

        return () => {
            if (typeof window !== "undefined" && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Monitor TTS State & Anti-Cutoff Hack for Chrome
    useEffect(() => {
        if (!supported) return;

        // Keep state in sync with actual speech synthesis engine
        const statusCheck = setInterval(() => {
            if (!window.speechSynthesis.speaking && isSpeaking && !isPaused) {
                setIsSpeaking(false);
                setIsPaused(false);
            }
        }, 1000);

        // Chrome bug workaround: TTS stops after ~15s. We briefly pause & resume every 14s.
        const chromeAntiCutoff = setInterval(() => {
            if (window.speechSynthesis.speaking && isSpeaking && !isPaused) {
                window.speechSynthesis.pause();
                window.speechSynthesis.resume();
            }
        }, 14000);

        return () => {
            clearInterval(statusCheck);
            clearInterval(chromeAntiCutoff);
        };
    }, [isSpeaking, isPaused, supported]);

    // Track volume changes actively on the current utterance and future ones
    useEffect(() => {
        if (utteranceRef.current) {
            utteranceRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const handlePlay = () => {
        if (!supported) return;

        if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
            setIsSpeaking(true);
        } else {
            window.speechSynthesis.cancel();

            // Extract pure text from the blog content container
            const contentElement = document.getElementById('blog-content');
            let textToRead = contentElement ? contentElement.innerText : "Sorry, could not find the article content.";

            const utterance = new SpeechSynthesisUtterance(textToRead);
            utteranceRef.current = utterance;

            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => v.lang.includes('ml')) ||
                voices.find(v => v.lang.includes('en-IN')) ||
                voices.find(v => v.lang.includes('en'));

            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }

            utterance.volume = isMuted ? 0 : volume;

            utterance.onend = () => {
                setIsSpeaking(false);
                setIsPaused(false);
                utteranceRef.current = null;
            };

            utterance.onerror = (e) => {
                console.error("TTS Error:", e);
                setIsSpeaking(false);
                setIsPaused(false);
                utteranceRef.current = null;
            };

            window.speechSynthesis.speak(utterance);

            setIsSpeaking(true);
            setIsPaused(false);
        }
    };

    const handlePause = () => {
        if (!supported) return;
        window.speechSynthesis.pause();
        setIsPaused(true);
        setIsSpeaking(true);
    };

    const handleStop = () => {
        if (!supported) return;
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
        utteranceRef.current = null;
    };

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
            // The Google widget iframe natively has a "Restore Original" button
            // If we can't click it, the reliable way is clearing the 'googtrans' cookie and reloading the iframe/page
            const iframe = document.getElementById(':1.container') as HTMLIFrameElement;
            if (iframe) {
                const restoreBtn = iframe.contentWindow?.document.getElementById(':1.restore') as HTMLButtonElement;
                if (restoreBtn) {
                    restoreBtn.click();
                    setIsMalayalam(false);
                    return;
                }
            }

            // Fallback: Clear cookies and fully reset the widget state
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + location.hostname + "; path=/;";

            // Dispatch a reload event or reload the page to cleanly wipe the DOM if needed.
            // For a SPA, doing a hard refresh is jarring. Let's try simulating the 'Auto' change instead.
            const selectMenu = document.querySelector('.goog-te-combo') as HTMLSelectElement;
            if (selectMenu) {
                // Usually selectMenu value '' means default/original
                selectMenu.value = '';
                selectMenu.dispatchEvent(new Event('change'));
            }
            setIsMalayalam(false);

            // If it still fails, force a smooth reload
            setTimeout(() => {
                window.location.reload();
            }, 300);
        }
    };

    return (
        <div className="notranslate flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-3 shadow-lg backdrop-blur-md sm:justify-start" translate="no">

            <div id="google_translate_element" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }} />

            {/* TTS Controls */}
            {supported && (
                <div className="flex items-center gap-2 border-r border-white/10 pr-4">
                    {!isSpeaking || isPaused ? (
                        <button
                            onClick={handlePlay}
                            className="flex h-9 items-center gap-2 rounded-full bg-white/5 px-4 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <Play className="h-4 w-4" fill="currentColor" />
                            {isPaused ? "Resume" : "Listen"}
                        </button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePause}
                                className="flex h-9 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-medium text-white transition-colors hover:bg-white/20"
                            >
                                <Pause className="h-4 w-4" fill="currentColor" />
                                Pause
                            </button>
                        </div>
                    )}

                    {isSpeaking && (
                        <button
                            onClick={handleStop}
                            className="flex h-9 w-9 items-center justify-center rounded-full text-red-400 transition-colors hover:bg-red-500/10"
                        >
                            <Square className="h-3.5 w-3.5" fill="currentColor" />
                        </button>
                    )}

                    {/* Volume Slider */}
                    <div className="ml-2 hidden items-center gap-2 sm:flex">
                        <button onClick={() => setIsMuted(!isMuted)} className="text-gray-400 hover:text-white">
                            {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => {
                                setVolume(parseFloat(e.target.value));
                                if (isMuted && parseFloat(e.target.value) > 0) setIsMuted(false);
                            }}
                            className="w-20 accent-white"
                        />
                    </div>
                </div>
            )}

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
