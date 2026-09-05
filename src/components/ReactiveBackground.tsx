"use client";

import { useEffect, useRef, useState } from "react";

export default function ReactiveBackground({
  src,
  frames,
  activeIndex,
  opacity = 0.4,
  grayscale = true,
  speed = 4,
}: {
  src: string;
  /** curated timestamps (seconds) — one per step/beat, chosen for visual quality */
  frames: number[];
  /** which frame index should be showing right now — drives playback */
  activeIndex: number;
  opacity?: number;
  grayscale?: boolean;
  /** playback speed used to close the gap between frames. 1 = original,
   * real-time speed (no fast-forward) — use this for backgrounds that
   * auto-advance on their own, where a sped-up jump reads as unnatural.
   * Higher values (the default) fast-forward through the gap, which suits
   * backgrounds tied to a deliberate user action (e.g. clicking Next). */
  speed?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // null = "not yet initialized", distinct from 0 so the very first frame
  // doesn't get skipped or mixed up with "no change happened".
  const prevIndexRef = useRef<number | null>(null);
  // Tracks the in-flight "timeupdate" handler (if any) so a new transition
  // can remove the previous one before attaching its own. Without this, two
  // rapid activeIndex changes (e.g. double-clicking Next) each attach their
  // own listener; whichever target the video reaches FIRST wins and pauses
  // playback, permanently stranding the second listener on a stopped video.
  const activeListenerRef = useRef<(() => void) | null>(null);
  // If the browser blocks an automatic play() call (happens on some
  // browsers even for muted video, especially the very first attempt with
  // zero prior page interaction), this ensures playback resumes as soon as
  // the user interacts with the page ANYWHERE — not just by clicking the
  // video itself — instead of silently staying stuck forever.
  const resumePendingRef = useRef(false);
  const [transitioning, setTransitioning] = useState(false);

  function attemptPlay(video: HTMLVideoElement) {
    video.play().catch(() => {
      if (resumePendingRef.current) return;
      resumePendingRef.current = true;
      const resume = () => {
        resumePendingRef.current = false;
        video.play().catch(() => {});
      };
      document.addEventListener("pointerdown", resume, { once: true });
      document.addEventListener("keydown", resume, { once: true });
      document.addEventListener("touchstart", resume, { once: true });
    });
  }

  // Set the opening frame as soon as the video has metadata — with a
  // one-time listener so this can never be silently missed if metadata
  // loads slightly after this effect runs.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function setInitial() {
      if (!video) return;
      video.currentTime = frames[0] ?? 0;
      prevIndexRef.current = 0;
    }

    if (video.readyState >= 1) {
      setInitial();
    } else {
      video.addEventListener("loadedmetadata", setInitial, { once: true });
      return () => video.removeEventListener("loadedmetadata", setInitial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // Whenever activeIndex changes, fast-forward to that frame's timestamp
  // (not real-time — a big gap between frames would otherwise take
  // several real seconds to resolve, which read as laggy) then hold there.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const target = frames[activeIndex];
    if (target === undefined) return;

    // First render, or nothing actually changed — nothing to do.
    if (prevIndexRef.current === activeIndex) return;

    const goingForward =
      prevIndexRef.current === null || activeIndex > prevIndexRef.current;

    // Update immediately so a slow/late video load can never leave this
    // permanently stuck comparing against a stale previous value.
    prevIndexRef.current = activeIndex;

    function run() {
      if (!video) return;

      // A previous transition may still be in flight (user advanced again
      // before it finished) — drop its listener so only the newest target
      // can ever resolve the transition.
      if (activeListenerRef.current) {
        video.removeEventListener("timeupdate", activeListenerRef.current);
        activeListenerRef.current = null;
      }

      if (!goingForward) {
        video.currentTime = target;
        setTransitioning(false);
        return;
      }

      setTransitioning(true);
      video.playbackRate = speed; // close the gap at the requested speed — 1 = real-time, no fast-forward

      function onTimeUpdate() {
        if (!video) return;
        const remaining = target - video.currentTime;
        if (remaining <= 0) {
          video.pause();
          video.currentTime = target;
          video.playbackRate = 1;
          video.removeEventListener("timeupdate", onTimeUpdate);
          if (activeListenerRef.current === onTimeUpdate) {
            activeListenerRef.current = null;
          }
          setTransitioning(false);
        } else if (speed > 1.6 && remaining < 0.6 && video.playbackRate > 1.6) {
          // ease down as we approach the target instead of a hard stop
          // (only relevant when actually fast-forwarding)
          video.playbackRate = 1.6;
        }
      }
      activeListenerRef.current = onTimeUpdate;
      video.addEventListener("timeupdate", onTimeUpdate);
      attemptPlay(video);
    }

    if (video.readyState >= 1) {
      run();
    } else {
      video.addEventListener("loadedmetadata", run, { once: true });
    }
  }, [activeIndex, frames, speed]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          grayscale ? "grayscale" : ""
        }`}
        style={{ opacity: transitioning ? opacity * 0.8 : opacity }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,9,0.75) 0%, rgba(10,10,9,0.4) 30%, rgba(10,10,9,0.55) 70%, rgba(10,10,9,0.9) 100%)",
        }}
      />
    </div>
  );
}
