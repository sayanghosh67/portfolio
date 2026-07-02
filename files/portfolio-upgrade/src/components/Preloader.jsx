import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const wrapRef = useRef(null);
  const barRef = useRef(null);
  const panelTop = useRef(null);
  const panelBottom = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(panelTop.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
        });
        gsap.to(panelBottom.current, {
          yPercent: 100,
          duration: 1,
          ease: 'power4.inOut',
          onComplete: () => {
            document.body.classList.add('is-loaded');
            onComplete?.();
          },
        });
      },
    });

    tl.to(counter, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.floor(counter.val)),
    }).to(
      barRef.current,
      { scaleX: 1, duration: 1.8, ease: 'power2.inOut' },
      '<'
    );

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div ref={wrapRef} className="fixed inset-0 z-[9998] pointer-events-none">
      <div
        ref={panelTop}
        className="absolute top-0 left-0 w-full h-1/2 bg-black flex items-end justify-center pb-4 border-b border-red-500/30"
      >
        <span className="font-anton text-red-500 text-sm tracking-[0.5em] uppercase">
          Sayan Ghosh
        </span>
      </div>
      <div
        ref={panelBottom}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-black flex flex-col items-center justify-start pt-6 gap-4"
      >
        <span className="font-anton text-white text-6xl md:text-8xl tabular-nums">
          {String(count).padStart(3, '0')}
        </span>
        <div className="w-48 md:w-64 h-[2px] bg-white/10 overflow-hidden">
          <div
            ref={barRef}
            className="h-full w-full bg-red-500 origin-left scale-x-0"
          />
        </div>
      </div>
    </div>
  );
}
