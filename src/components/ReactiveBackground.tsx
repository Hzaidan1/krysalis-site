"use client";

import { useEffect, useRef, useState } from "react";

export default function ReactiveBackground({
  src,
  frames,
  activeIndex = 0,
  opacity = 0.4,
  grayscale = true,
  speed = 4,
}: {
  src: string;
  /** curated timestamps (seconds). In curated mode (speed > 1) these are
   * jump-to-and-hold points. In continuous mode (speed <= 1) only the
   * first and last values matter — they're the loop's start/end bounds. */
  frames: number[];
  /** which frame index should be showing right now. Only used in curated
   * mode — ignored entirely in continuous mode, which loops on its own. */
  activeIndex?: number;
  opacity?: number;
  grayscale?: boolean;
  /** 1 (or less) = continuous mode: plays start\u2192end in a real, uninterrupted
   * loop with no holds or pauses \u2014 use this for backgrounds that just need
   * to feel alive with no external trigger. Greater than 1 = curated mode:
   * fast-forwards to whichever frame `activeIndex` points at, then holds
   * there until `activeIndex` changes again \u2014 use this when playback should
   * be tied to a deliberate action (e.g. clicking Next on a form). */
  speed?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const continuous = speed <= 1;

  // --- shared: recover from a blocked autoplay attempt ---
  // Some browsers block an automatic play() call even for muted video,
  // especially the very first attempt with zero prior page interaction.
  // This resumes playback the moment the user interacts with the page
  // ANYWHERE, instead of silently staying stuck forever.
  const resumePendingRef = useRef(false);
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

  // ---------------- Continuous mode ----------------
  // Plays from frames[0] to the last frame value on a real, uninterrupted
  // loop \u2014 no holds, no pauses, no fast-forwarding.
  useEffect(() => {
    if (!continuous) return;
    const video = videoRef.current;
    if (!video) return;

    const start = frames[0] ?? 0;
    const end = frames[frames.length - 1] ?? start;

    function begin() {
      if (!video) return;
      video.currentTime = start;
      video.playbackRate = 1;
      attemptPlay(video);
    }

    function onTimeUpdate() {
      if (!video) return;
      if (video.currentTime >= end) {
        // loop back without ever pausing
        video.currentTime = start;
      }
    }

    if (video.readyState >= 1) {
      begin();
    } else {
      video.addEventListener("loadedmetadata", begin, { once: true });
    }
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      video.removeEventListener("loadedmetadata", begin);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continuous, src]);

  // ---------------- Curated mode ----------------
  // null = "not yet initialized", distinct from 0 so the very first frame
  // doesn't get skipped or mixed up with "no change happened".
  const prevIndexRef = useRef<number | null>(null);
  // Tracks the in-flight "timeupdate" handler (if any) so a new transition
  // can remove the previous one before attaching its own. Without this, two
  // rapid activeIndex changes (e.g. double-clicking Next) each attach their
  // own listener; whichever target the video reaches FIRST wins and pauses
  // playback, permanently stranding the second listener on a stopped video.
  const activeListenerRef = useRef<(() => void) | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  // Set the opening frame as soon as the video has metadata.
  useEffect(() => {
    if (continuous) return;
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
  }, [continuous, src]);

  // Whenever activeIndex changes, fast-forward to that frame's timestamp
  // then hold there, until the next change.
  useEffect(() => {
    if (continuous) return;
    const video = videoRef.current;
    if (!video) return;

    const target = frames[activeIndex];
    if (target === undefined) return;

    if (prevIndexRef.current === activeIndex) return;

    const goingForward =
      prevIndexRef.current === null || activeIndex > prevIndexRef.current;

    prevIndexRef.current = activeIndex;

    function run() {
      if (!video) return;

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
      video.playbackRate = speed;

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
  }, [continuous, activeIndex, frames, speed]);

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
