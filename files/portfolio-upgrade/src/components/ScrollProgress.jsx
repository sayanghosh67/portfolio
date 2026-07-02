import { useEffect, useRef } from 'react';
import { scrollState } from '../lib/scrollState';

export default function ScrollProgress() {
  const barRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    let raf;
    const update = () => {
      const pct = Math.min(scrollState.progress * 100, 100);
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct / 100})`;
      if (labelRef.current) labelRef.current.textContent = `${Math.round(pct)}%`;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-[9996] pointer-events-none">
        <div
          ref={barRef}
          className="h-full bg-red-500 origin-left scale-x-0 shadow-[0_0_10px_rgba(255,0,0,0.8)]"
        />
      </div>
      <div className="fixed bottom-6 left-6 z-[9996] pointer-events-none hidden md:flex items-center gap-2 mix-blend-difference">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span
          ref={labelRef}
          className="font-inter text-xs tracking-[0.3em] text-white tabular-nums"
        >
          00%
        </span>
      </div>
    </>
  );
}
