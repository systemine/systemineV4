"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "systemine-ambience";
const TARGET_VOLUME = 0.12;
const FADE_MS = 3000;

export default function AmbienceToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isOn, setIsOn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "on") {
      // We restore the visual preference, but browsers block audio
      // that starts without a user gesture — so playback only
      // resumes once the person interacts with the toggle (or the
      // page) again. This keeps us honest about "no autoplay."
      setIsOn(true);
    }
  }, []);

  function fadeTo(target: number) {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) clearInterval(fadeRef.current);

    const steps = 30;
    const stepTime = FADE_MS / steps;
    const start = audio.volume;
    const delta = (target - start) / steps;
    let step = 0;

    fadeRef.current = setInterval(() => {
      step += 1;
      const next = Math.max(0, Math.min(1, start + delta * step));
      audio.volume = next;
      if (step >= steps) {
        audio.volume = target;
        if (target === 0) audio.pause();
        if (fadeRef.current) clearInterval(fadeRef.current);
      }
    }, stepTime);
  }

  function toggle() {
    const next = !isOn;
    setIsOn(next);
    window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");

    const audio = audioRef.current;
    if (!audio) return;

    if (next) {
      audio.volume = 0;
      audio
        .play()
        .then(() => fadeTo(TARGET_VOLUME))
        .catch(() => {
          // Playback blocked; leave the toggle reflecting intent,
          // it will succeed on the next interaction.
        });
    } else {
      fadeTo(0);
    }
  }

  return (
    <div className="inline-flex items-center gap-2">
      <audio ref={audioRef} src="/audio/ambience.mp3" loop preload="none" />
      <button
        onClick={toggle}
        aria-pressed={isOn}
        className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft transition-colors duration-300 hover:border-wood hover:text-wood"
      >
        <span aria-hidden="true">🌿</span>
        <span className="font-medium">Ambience</span>
        <span className="text-ink-soft/70">{mounted && isOn ? "On" : "Off"}</span>
      </button>
    </div>
  );
}
