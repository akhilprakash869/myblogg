"use client";

import { useState, useEffect } from "react";
import { Play, Square, Pause } from "lucide-react";

export function TTSButton({ textToRead }: { textToRead: string }) {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [supported, setSupported] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined" && !("speechSynthesis" in window)) {
            setSupported(false);
        }

        // Cleanup on unmount
        return () => {
            if (typeof window !== "undefined" && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Handle when speech synthesis naturally ends
    useEffect(() => {
        if (!supported) return;

        const checkStatus = setInterval(() => {
            if (!window.speechSynthesis.speaking && isSpeaking && !isPaused) {
                setIsSpeaking(false);
                setIsPaused(false);
            }
        }, 1000);

        return () => clearInterval(checkStatus);
    }, [isSpeaking, isPaused, supported]);

    const handlePlay = () => {
        if (!supported) return;

        if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
        } else {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(textToRead);
            utterance.lang = "en-US";
            utterance.rate = 1; // Normal speed

            utterance.onend = () => {
                setIsSpeaking(false);
                setIsPaused(false);
            };

            utterance.onerror = () => {
                setIsSpeaking(false);
                setIsPaused(false);
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
    };

    const handleStop = () => {
        if (!supported) return;
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    };

    if (!supported) return null;

    return (
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 p-1 backdrop-blur-md">
            {!isSpeaking || isPaused ? (
                <button
                    onClick={handlePlay}
                    className="flex h-8 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                    <Play className="h-4 w-4" fill="currentColor" />
                    {isPaused ? "Resume" : "Listen"}
                </button>
            ) : (
                <button
                    onClick={handlePause}
                    className="flex h-8 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                    <Pause className="h-4 w-4" fill="currentColor" />
                    Pause
                </button>
            )}

            {isSpeaking && (
                <button
                    onClick={handleStop}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                    aria-label="Stop playback"
                >
                    <Square className="h-3 w-3" fill="currentColor" />
                </button>
            )}
        </div>
    );
}
