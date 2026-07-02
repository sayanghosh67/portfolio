import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // Hide on touch devices
    if ('ontouchstart' in window) {
      outer.style.display = 'none';
      inner.style.display = 'none';
      return;
    }

    gsap.set(outer, { xPercent: -50, yPercent: -50 });
    gsap.set(inner, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e) => {
      // Outer ring — slower, trailing, glass feel
      gsap.to(outer, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: 'power3.out',
      });
      // Inner dot — snappy, immediate
      gsap.to(inner, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power3.out',
      });
    };

    // Grow on interactive elements
    const handleOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, .cursor-grow')) {
        gsap.to(outer, {
          scale: 2.2,
          borderColor: 'rgba(239, 68, 68, 0.8)',
          duration: 0.35,
          ease: 'power2.out',
        });
        gsap.to(inner, { scale: 0, duration: 0.25 });
      }
    };
    const handleOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, .cursor-grow')) {
        gsap.to(outer, {
          scale: 1,
          borderColor: 'rgba(239, 68, 68, 0.5)',
          duration: 0.35,
          ease: 'power2.out',
        });
        gsap.to(inner, { scale: 1, duration: 0.25 });
      }
    };

    // Click pulse
    const handleDown = () => {
      gsap.to(outer, { scale: 0.8, duration: 0.15 });
    };
    const handleUp = () => {
      gsap.to(outer, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mouseup', handleUp);
    };
  }, []);

  return (
    <>
      {/* Outer glass ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          border: '1.5px solid rgba(239, 68, 68, 0.5)',
          backdropFilter: 'blur(1px)',
          willChange: 'transform',
        }}
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-red-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
