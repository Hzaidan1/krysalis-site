"use client";

import { useEffect, useRef, useState } from "react";

export default function ProjectVideoPlayer({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Starts true (assume it'll work) and only flips to true-with-overlay if
  // the browser actually blocks the unmuted autoplay attempt. Clicking into
  // this page IS a real user gesture, so most browsers allow this — but not
  // guaranteed on every browser/version, so this fallback matters.
  const [needsPlayClick, setNeedsPlayClick] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => setNeedsPlayClick(true));
  }, [src]);

  function handleManualPlay() {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().then(() => setNeedsPlayClick(false)).catch(() => {});
  }

  return (
    <div className="relative h-[70vh] bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)] overflow-hidden">
      <video
        key={src}
        ref={videoRef}
        src={src}
        playsInline
        controls
        className="w-full h-full object-contain"
      />
      {needsPlayClick && (
        <button
          onClick={handleManualPlay}
          className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg)]/60 backdrop-blur-sm group"
        >
          <span className="font-[family-name:var(--font-tactical-mono)] text-sm tracking-[0.28em] uppercase border border-[var(--color-earth-light)]/60 text-[var(--color-earth-light)] px-6 py-3 bg-[var(--color-bg)]/70 group-hover:bg-[var(--color-bg)]/90 transition-colors">
            &#9654; Play {title}
          </span>
        </button>
      )}
    </div>
  );
}
