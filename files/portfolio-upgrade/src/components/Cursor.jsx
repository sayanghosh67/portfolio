import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);
  const [label, setLabel] = useState('');
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const quickX = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
    const quickY = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });

    const moveCursor = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      quickX(e.clientX);
      quickY(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);

    // Magnetic snap + scale for anything with [data-hover]
    const attachMagnetic = () => {
      const targets = document.querySelectorAll('[data-hover]');
      const enter = (e) => {
        const el = e.currentTarget;
        setLabel(el.dataset.hover || '');
        gsap.to(cursor, {
          scale: el.dataset.hoverScale || 3.5,
          duration: 0.4,
          ease: 'power3.out',
        });
      };
      const leave = () => {
        setLabel('');
        gsap.to(cursor, { scale: 1, duration: 0.4, ease: 'power3.out' });
      };
      targets.forEach((el) => {
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
      });
      return () => {
        targets.forEach((el) => {
          el.removeEventListener('mouseenter', enter);
          el.removeEventListener('mouseleave', leave);
        });
      };
    };

    // Re-scan whenever the DOM settles (new sections mounting, images loading)
    let cleanupMagnetic = attachMagnetic();
    const observer = new MutationObserver(() => {
      cleanupMagnetic();
      cleanupMagnetic = attachMagnetic();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cleanupMagnetic();
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-red-500 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center hidden md:flex"
    >
      <div className="absolute w-1.5 h-1.5 bg-red-500 rounded-full" />
      {label && (
        <span
          ref={labelRef}
          className="absolute font-inter font-bold text-[6px] uppercase tracking-widest text-white whitespace-nowrap"
        >
          {label}
        </span>
      )}
    </div>
  );
}
