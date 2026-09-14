"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/Button";

// Scrub only covers the action footage — frames 301-331 are the video's own
// fade-to-logo/black ending, which we skip since it's not needed on the page
const FRAME_COUNT = 300;
const FRAME_PATH = (i: number) =>
  `/frames/frame_${String(i).padStart(4, "0")}.webp`;

const SCROLL_RUNWAY_VH_DESKTOP = 500;
const SCROLL_RUNWAY_VH_MOBILE = 320;

type Btn = { label: string; href: string; variant: "solid" | "outline" };
type Scene = {
  range: [number, number];
  kicker?: string;
  title: string;
  body?: string;
  buttons: Btn[];
};

// Continuous scenes — one is always active as you scroll, crossfading
// smoothly into the next. No gaps between ranges.
const SCENES: Scene[] = [
  {
    range: [0, 0.22],
    kicker: "UK Tactical Media & Production Studio",
    title: "Before the action, there is the story.",
    body: "Krysalis develops, produces and supports media for the tactical world — from original films and brand content to post-production, event coverage and specialist support for screen productions.",
    buttons: [
      { label: "View Our Work", href: "/work", variant: "solid" },
      { label: "Start a Project", href: "/contact", variant: "outline" },
    ],
  },
  {
    range: [0.22, 0.45],
    title: "Every operation has a story worth telling.",
    buttons: [
      { label: "Watch Our Reel", href: "/work", variant: "solid" },
    ],
  },
  {
    range: [0.45, 0.68],
    title: "See the work behind the lens.",
    buttons: [{ label: "Meet The Team", href: "/about", variant: "solid" }],
  },
  {
    range: [0.68, 1.0],
    title: "Ready when you are.",
    buttons: [{ label: "Contact Us", href: "/contact", variant: "solid" }],
  },
];



export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentIdxRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const lastSceneRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [sceneIndex, setSceneIndex] = useState<number>(0);
  const [nearStart, setNearStart] = useState(true);
  const [runwayVh, setRunwayVh] = useState(SCROLL_RUNWAY_VH_DESKTOP);

  useEffect(() => {
    function applyRunway() {
      setRunwayVh(
        window.innerWidth < 768
          ? SCROLL_RUNWAY_VH_MOBILE
          : SCROLL_RUNWAY_VH_DESKTOP
      );
    }
    applyRunway();
    window.addEventListener("resize", applyRunway);
    return () => window.removeEventListener("resize", applyRunway);
  }, []);

  // Preload all frames
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        if (cancelled) return;
        loadedCount++;
        setLoadProgress(loadedCount / FRAME_COUNT);
        if (loadedCount === 1) drawFrame(0);
        if (loadedCount === FRAME_COUNT) setLoaded(true);
      };
      imgs[i - 1] = img;
    }
    imagesRef.current = imgs;

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function drawFrame(idx: number) {
    const canvas = canvasRef.current;
    const img = imagesRef.current[idx];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;

    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
    }

    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    const dx = (canvas.width - dw) / 2;
    const dy = (canvas.height - dh) / 2;

    ctx.fillStyle = "#0a0a09";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, dx, dy, dw, dh);
    currentIdxRef.current = idx;
  }

  // Returns -1 (nothing shown) once scroll passes the last scene's end —
  // used so text clears out before the closing logo card appears on screen.
  function sceneForProgress(p: number) {
    for (let i = 0; i < SCENES.length; i++) {
      if (p >= SCENES[i].range[0] && p < SCENES[i].range[1]) return i;
    }
    return -1;
  }

  // Scroll-driven rAF loop with eased (lerped) progress for smoothness
  useEffect(() => {
    function loop() {
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const total = container.offsetHeight - window.innerHeight;
        const rawProgress =
          total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;

        smoothProgressRef.current +=
          (rawProgress - smoothProgressRef.current) * 0.07;

        if (Math.abs(rawProgress - smoothProgressRef.current) < 0.0008) {
          smoothProgressRef.current = rawProgress;
        }

        const target = Math.round(
          smoothProgressRef.current * (FRAME_COUNT - 1)
        );
        if (target !== currentIdxRef.current) {
          drawFrame(target);
        }

        const sceneNow = sceneForProgress(smoothProgressRef.current);
        if (sceneNow !== lastSceneRef.current) {
          lastSceneRef.current = sceneNow;
          setSceneIndex(sceneNow);
        }

        const isNearStart = smoothProgressRef.current < 0.04;
        setNearStart((prev) => (prev !== isNearStart ? isNearStart : prev));
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    function handleResize() {
      drawFrame(currentIdxRef.current);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scene = sceneIndex >= 0 ? SCENES[sceneIndex] : null;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${runwayVh}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--color-bg)]">
        <canvas ref={canvasRef} className="block h-full w-full" />

        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg)] z-20">
            <div className="w-40 h-px bg-[var(--color-border)] overflow-hidden">
              <div
                className="h-full bg-[var(--color-earth-light)] transition-all duration-200"
                style={{ width: `${loadProgress * 100}%` }}
              />
            </div>
          </div>
        )}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(10,10,9,0.55) 0%, rgba(10,10,9,0.75) 55%, rgba(10,10,9,0.85) 100%)",
          }}
        />

        {/* logo now lives in the global Nav */}

        {/* single crossfading content slot — hero title morphs into each scroll moment */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <AnimatePresence mode="wait">
            {scene && (
              <motion.div
                key={sceneIndex}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col items-center"
              >
                {scene.kicker && (
                  <p className="font-[family-name:var(--font-body)] text-xs tracking-[0.25em] uppercase text-[var(--color-earth-light)] mb-5">
                    {scene.kicker}
                  </p>
                )}
                <h1 className="relative font-[family-name:var(--font-display)] font-normal text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] max-w-3xl mb-5">
                  {scene.title}
                  <span
                    aria-hidden="true"
                    className="glitch-clone"
                    style={{ color: "#ff5b5b", transform: "translateX(-3px)" }}
                  >
                    {scene.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="glitch-clone"
                    style={{
                      color: "#5bd0ff",
                      transform: "translateX(3px)",
                      animationDelay: "0.02s",
                    }}
                  >
                    {scene.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="glitch-sweep absolute inset-x-0 top-1/2 h-[2px] bg-[var(--color-earth-light)]"
                  />
                </h1>
                {scene.body && (
                  <p className="font-[family-name:var(--font-body)] font-light tracking-wide text-[var(--color-text-dim)] max-w-md text-sm md:text-base mb-9">
                    {scene.body}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pointer-events-auto mt-2 w-full sm:w-auto items-center">
                  {scene.buttons.map((b) => (
                    <Button key={b.label} {...b} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-dim)] transition-opacity duration-500"
          style={{ opacity: nearStart ? 1 : 0 }}
        >
          <span className="animate-pulse">Scroll</span>
        </div>
      </div>
    </div>
  );
}
