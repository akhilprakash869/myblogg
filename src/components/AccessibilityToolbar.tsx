"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Volume2, Languages, VolumeX } from "lucide-react";

export function AccessibilityToolbar() {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isMalayalam, setIsMalayalam] = useState(false);
    const [supported, setSupported] = useState(true);
    const [voicesLoaded, setVoicesLoaded] = useState(false);
    const initialized = useRef(false);

    // Initialize Speech Synthesis and Google Translate
    useEffect(() => {
        if (typeof window !== "undefined" && !("speechSynthesis" in window)) {
            setSupported(false);
        } else {
            // Chrome loads voices asynchronously
            const loadVoices = () => {
                if (window.speechSynthesis.getVoices().length > 0) {
                    setVoicesLoaded(true);
                }
            };
            loadVoices();
            if (window.speechSynthesis.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = loadVoices;
            }
        }

        if (initialized.current) return;
        initialized.current = true;

        // Initialize Google Translate Element silently but ensure it renders
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

    // Monitor TTS State
    useEffect(() => {
        if (!supported) return;
        const checkStatus = setInterval(() => {
            // Keep state in sync with actual speech synthesis engine
            if (!window.speechSynthesis.speaking && isSpeaking && !isPaused) {
                setIsSpeaking(false);
                setIsPaused(false);
            }
        }, 1000);
        return () => clearInterval(checkStatus);
    }, [isSpeaking, isPaused, supported]);

    // Volume Control effect handling
    useEffect(() => {
        if (!supported || (!isSpeaking && !isPaused)) return;

        // Unfortunately, changing volume mid-speech isn't universally supported in all browsers API
        // But we apply it to any *new* speech utterances.
    }, [volume, isMuted, supported, isSpeaking, isPaused]);

    const handlePlay = () => {
        if (!supported) return;

        if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
        } else {
            window.speechSynthesis.cancel(); // Clear any existing queue

            // Extract pure text from the blog content container
            const contentElement = document.getElementById('blog-content');
            let textToRead = contentElement ? contentElement.innerText : "Sorry, could not find the article content.";

            // Web Speech API has a bug in Chrome where long texts stop playing after ~15 seconds.
            // Fix: Chunk the text by sentences or punctuation and queue them.
            const sentences = textToRead.match(/[^.!?]+[.!?]+/g) || [textToRead];

            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => v.lang.includes('ml')) ||
                voices.find(v => v.lang.includes('en-IN')) ||
                voices.find(v => v.lang.includes('en'));

            const actualVolume = isMuted ? 0 : volume;

            sentences.forEach((sentence, index) => {
                const utterance = new SpeechSynthesisUtterance(sentence.trim());
                utterance.volume = actualVolume;
                if (preferredVoice) {
                    utterance.voice = preferredVoice;
                }

                // Only attach end event to the very last chunk to reset state
                if (index === sentences.length - 1) {
                    utterance.onend = () => {
                        setIsSpeaking(false);
                        setIsPaused(false);
                    };
                }

                utterance.onerror = (e) => {
                    console.error("TTS Error:", e);
                    setIsSpeaking(false);
                    setIsPaused(false);
                };

                window.speechSynthesis.speak(utterance);
            });

            setIsSpeaking(true);
            setIsPaused(false);
        }
    };

    const handlePause = () => {
        if (!supported) return;
        window.speechSynthesis.pause();
        setIsPaused(true);
    };

    const handleStop = () => {
        if (!supported) return;
        window.speechSynthesis.cancel(); // Empties the queue
        setIsSpeaking(false);
        setIsPaused(false);
    };

    const toggleLanguage = () => {
        // Find the native Google Translate select element
        // Since we are not keeping the container as display: none anymore, it will exist.
        const selectMenu = document.querySelector('.goog-te-combo') as HTMLSelectElement;

        if (!selectMenu) {
            console.error("Google Translate script has not finished loading or rendering.");
            return;
        }

        const targetLang = isMalayalam ? 'en' : 'ml';
        selectMenu.value = targetLang;
        selectMenu.dispatchEvent(new Event('change')); // Trigger translate native event
        setIsMalayalam(!isMalayalam);
    };

    return (
        <div className="flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-3 shadow-lg backdrop-blur-md sm:justify-start">

            {/* Google Translate element needs to be technically rendered for the script to generate .goog-te-combo, so we use clip masking instead of hidden/display:none */}
            <div id="google_translate_element" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }} />

            {/* TTS Controls */}
            {supported && (
                <div className="flex items-center gap-2 border-r border-white/10 pr-4">
                    {!isSpeaking || isPaused ? (
                        <button
                            onClick={handlePlay}
                            className="flex h-9 items-center gap-2 rounded-full bg-white/5 px-4 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                            aria-label="Play Audio"
                        >
                            <Play className="h-4 w-4" fill="currentColor" />
                            {isPaused ? "Resume" : "Listen"}
                        </button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePause}
                                className="flex h-9 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-medium text-white transition-colors hover:bg-white/20"
                                aria-label="Pause Audio"
                            >
                                <Pause className="h-4 w-4" fill="currentColor" />
                                Pause
                            </button>
                            <button
                                onClick={handleStop}
                                className="flex h-9 w-9 items-center justify-center rounded-full text-red-400 transition-colors hover:bg-red-500/10"
                                aria-label="Stop playback"
                            >
                                <Square className="h-3.5 w-3.5" fill="currentColor" />
                            </button>
                        </div>
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
                    <span>{isMalayalam ? "Read in English" : "മലയാളം (Malayalam)"}</span>
                </button>
            </div>
        </div>
    );
}
