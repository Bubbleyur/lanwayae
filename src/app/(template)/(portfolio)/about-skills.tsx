"use client";
import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { skillsContent } from "@/constants/portfolio/skills";
import { PlusSeparator } from "@/components/ui/plus-separator";

const BASE_TIMING = 5; // Sedikit lebih cepat untuk rotasi grid

export default function SkillsAtlas() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>("webdev");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [mode, setMode] = useState<"auto" | "viewing" | "paused">("auto");
  const [progress, setProgress] = useState(0);

  // timers & refs (Logika asli dipertahankan)
  const rotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const restoreTimerRef = useRef<NodeJS.Timeout | null>(null);
  const savedProgressRef = useRef<number>(0);

  const currentSkill = hoveredSkill || selectedSkill;
  const currentContent = currentSkill ? skillsContent[currentSkill] : null;
  const skillKeys = useMemo(() => Object.keys(skillsContent), []);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isInViewport, setIsInViewport] = useState(true);

  // --- Logic Timer & Observer (Sama seperti file asli untuk menjaga fungsi) ---
  const cleanupTimers = useCallback(() => {
    if (rotateTimerRef.current) clearTimeout(rotateTimerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
  }, []);

  const ignoreHoverRef = useRef(false);
  const pausedFromRef = useRef<"auto" | "viewing" | null>(null);
  const modeRef = useRef<typeof mode>(mode);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isVisible = entry.isIntersecting;
        setIsInViewport(isVisible);

        if (!isVisible && modeRef.current !== "paused") {
          pausedFromRef.current = modeRef.current;
          setMode("paused");
        } else if (isVisible && pausedFromRef.current) {
          const restore = pausedFromRef.current;
          pausedFromRef.current = null;
          restoreTimerRef.current = setTimeout(() => {
            if (modeRef.current === "paused") setMode(restore);
          }, 100) as unknown as NodeJS.Timeout;
        }
      },
      { threshold: 0.2 }
    );
    io.observe(wrapperRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    cleanupTimers();
    const interval = 100;

    if (mode === "auto") {
      let currentProgress = savedProgressRef.current ?? 0;
      const duration = BASE_TIMING * 1000;
      const increment = (interval / duration) * 100;

      const rotateOnce = () => {
        cleanupTimers();
        setSelectedSkill((current) => {
          const idx = current ? skillKeys.indexOf(current) : 0;
          return skillKeys[(idx + 1) % skillKeys.length];
        });
        savedProgressRef.current = 0;
        setProgress(0);
      };

      progressTimerRef.current = setInterval(() => {
        currentProgress += increment;
        if (currentProgress >= 100) {
          rotateOnce();
        } else {
          setProgress(currentProgress);
          savedProgressRef.current = currentProgress;
        }
      }, interval);

      rotateTimerRef.current = setTimeout(rotateOnce, duration - (savedProgressRef.current / 100) * duration);
    }
    
    return cleanupTimers;
  }, [mode, selectedSkill, cleanupTimers, skillKeys]);

  const handleSectorEnter = (key: string) => {
    if (ignoreHoverRef.current) return;
    setHoveredSkill(key);
    if (mode !== "paused") {
      pausedFromRef.current = mode;
      setMode("paused");
    }
  };

  const handleSectorLeave = () => {
    setHoveredSkill(null);
    if (mode === "paused" && pausedFromRef.current) {
      setMode(pausedFromRef.current);
      pausedFromRef.current = null;
    }
  };

  const handleSectorClick = (key: string) => {
    setSelectedSkill(key);
    setHoveredSkill(null);
    cleanupTimers();
    savedProgressRef.current = 0;
    setProgress(0);
    setMode("viewing"); // Stop auto rotation
  };

  // --- Render ---

  return (
    <main ref={wrapperRef} className="w-full">
      <section className="w-full border-separator/10 border-t">
        <div className="inner relative flex h-full flex-col border-separator/10 border-x pt-5 lg:h-[500px] lg:flex-row">
          <h1 className="absolute top-0 left-0 font-mono text-xs text-sys-accent border border-sys-accent/30 bg-sys-accent/10 px-2 py-1">
            <span className="text-sys-accent">./PORTFOLIO/SKILLS.MD</span>
          </h1>
          
          {/* LEFT SIDE: ATLAS GRID */}
          <div className="w-full lg:w-2/3 h-full min-h-[400px] lg:h-full grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-4 p-4 border border-separator/10 bg-muted/20 dark:bg-black/40 relative overflow-hidden backdrop-blur-sm">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-20" 
                  style={{ 
                    backgroundImage: `linear-gradient(to right, oklch(0 0 0 / 10%) 1px, transparent 1px), linear-gradient(to bottom, oklch(0 0 0 / 10%) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }} 
            />

            {skillKeys.map((key) => {
              const data = skillsContent[key];
              const isActive = currentSkill === key;
              const isSelected = selectedSkill === key;

              return (
                <motion.div
                  key={key}
                  layoutId={`card-${key}`}
                  className={cn(
                    "relative group cursor-pointer border overflow-hidden flex flex-col justify-center items-center p-6 transition-all duration-500",
                    data.gridClass, // Mengambil class col-span/row-span dari skills.tsx
                    isActive 
                      ? "border-green-500/80 bg-green-500/10 dark:bg-green-500/5 shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)] z-10" 
                      : "border-separator/5 bg-muted/40 dark:border-white/5 dark:bg-white/5 hover:border-separator/20 hover:bg-muted/60 dark:hover:border-white/20 dark:hover:bg-white/10"
                  )}
                  onMouseEnter={() => handleSectorEnter(key)}
                  onMouseLeave={handleSectorLeave}
                  onClick={() => handleSectorClick(key)}
                >
                  {/* Decoration Lines */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-current opacity-30 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-current opacity-30 group-hover:opacity-100 transition-opacity" />

                  <h3 className={cn(
                    "font-mono text-xl md:text-2xl font-bold tracking-wider transition-colors duration-300",
                    isActive ? "text-green-400" : "text-muted-foreground"
                  )}>
                    {data.title}
                  </h3>
                  
                  {isActive && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-xs font-mono text-green-500/70"
                    >
                      [ ACTIVE SECTOR ]
                    </motion.span>
                  )}

                  {/* Scanline Effect if active */}
                  {isActive && (
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-green-500/5 to-transparent bg-[length:100%_200%] animate-scan" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT SIDE: INFO PANEL */}
          <div className="w-full lg:w-1/3 flex flex-col h-full">
            <div className="flex-1 border border-green-500/20 bg-muted/50 dark:bg-black/80 p-8 flex flex-col relative overflow-hidden backdrop-blur-xl">
              {/* Header label */}
              <div className="flex justify-between items-center mb-10">
                  <span className="text-xs font-mono tracking-[0.2em] text-green-600 dark:text-green-500/80 uppercase">
                      Skills
                  </span>
                  <div className="flex gap-1">
                      <div className={cn("w-2 h-2 rounded-full transition-colors", currentSkill ? "bg-green-600 dark:bg-green-500 animate-pulse" : "bg-green-500/20")} />
                  </div>
              </div>

              {/* Main Content Area */}
              <AnimatePresence mode="wait">
                {currentContent ? (
                  <motion.div
                    key={currentSkill}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6 h-full"
                  >
                    <div>
                      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2 font-montreal">
                        {currentContent.title}
                      </h2>
                      <p className="text-sm font-mono text-green-500/60 uppercase tracking-widest">
                          {currentContent.subtitle}
                      </p>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-green-500/50 to-transparent" />

                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                      {currentContent.element}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="flex flex-col items-center justify-center h-full text-muted-foreground/50 gap-4"
                  >
                      <div className="w-16 h-16 rounded-full border border-dashed border-current animate-spin-slow" />
                      <p className="font-mono text-sm tracking-widest">HOVER A SECTOR</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom: Progress Bar */}
              <div className="mt-auto pt-8">
                  <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-mono text-green-600/50 dark:text-green-500/50">
                          {mode === "auto" ? "AUTO_SCAN" : "MANUAL_OVERRIDE"}
                      </span>
                      <span className="text-lg font-mono font-bold text-green-600 dark:text-green-500">
                          {Math.round(progress)}%
                      </span>
                  </div>
                  <div className="h-1 w-full bg-green-900/20 rounded-full overflow-hidden">
                      <motion.div 
                          className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                          style={{ width: `${progress}%` }}
                          layoutId="progress-bar"
                      />
                  </div>
              </div>
            </div>
          </div>

        </div>
        <div className="border-separator/10 border-t">
          <div className="inner relative m-auto border-separator/10 border-x p-4">
            <span className="relative flex items-center justify-between font-montreal-mono text-xs opacity-90 transition-opacity duration-300 dark:opacity-75">
              don't forget to hydrate yourself :)
            </span>
            <PlusSeparator position={["top-left", "top-right"]} />
          </div>
        </div>
      
      </section>
      {/* CSS untuk efek scanline halus */}
      <style jsx global>{`
        @keyframes scan {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </main>
  );
}