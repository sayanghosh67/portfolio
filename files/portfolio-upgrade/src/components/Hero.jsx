import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { mouseState } from '../lib/scrollState';

// Splits a string into individually animatable <span> characters.
// Each letter is double-wrapped: outer span clips (mask), inner ".char"
// span is what GSAP actually animates — this is what gives the clean
// "sliding up from behind a slit" reveal instead of a plain fade.
function splitChars(text) {
  return text.split('').map((ch, i) => (
    <span key={i} className="inline-block overflow-hidden">
      <span className="char inline-block will-change-transform">
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    </span>
  ));
}

export default function Hero() {
  const titleRef = useRef(null);
  const layerFront = useRef(null);
  const layerBack = useRef(null);

  useGSAP(() => {
    const chars = titleRef.current.querySelectorAll('.char');
    gsap.from(chars, {
      yPercent: 120,
      rotateZ: 6,
      opacity: 0,
      duration: 1.1,
      stagger: 0.035,
      ease: 'power4.out',
      delay: 1.9, // sits right after the Preloader curtain lifts
    });

    gsap.from('.hero-text', {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power4.out',
      delay: 1.7,
    });
  }, []);

  // Pointer-driven parallax between two depth layers = the "4D" cue
  useEffect(() => {
    let raf;
    const tick = () => {
      if (layerFront.current) {
        layerFront.current.style.transform = `translate(${mouseState.x * 14}px, ${mouseState.y * 10}px)`;
      }
      if (layerBack.current) {
        layerBack.current.style.transform = `translate(${mouseState.x * -8}px, ${mouseState.y * -6}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const glitch = (e) => {
    gsap.timeline()
      .to(e.currentTarget, { skewX: 8, x: -4, duration: 0.06 })
      .to(e.currentTarget, { skewX: -6, x: 4, duration: 0.06 })
      .to(e.currentTarget, { skewX: 0, x: 0, duration: 0.08, ease: 'power3.out' });
  };

  return (
    <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden px-8 md:px-20 pointer-events-none">
      <div ref={layerBack} className="absolute top-10 left-10 md:top-20 md:left-20 hero-text">
        <p className="font-marker text-xl md:text-4xl text-red-500 -rotate-6 tracking-wider shadow-black drop-shadow-lg">
          Creative Developer
        </p>
      </div>

      <div ref={layerFront} className="z-10 mt-20 pointer-events-auto">
        <h2 className="hero-text text-xl md:text-3xl font-inter font-bold text-neutral-400 mb-2 uppercase border-l-4 border-red-500 pl-4">
          Sayan Ghosh
        </h2>

        <h1
          ref={titleRef}
          onMouseEnter={glitch}
          className="text-[18vw] leading-[0.75] font-anton text-white uppercase relative inline-block cursor-default"
          data-hover="LOOK CLOSER"
        >
          <span className="inline-block">{splitChars('PORT')}</span>
          <span className="text-red-500 relative z-[-1] inline-block">
            {splitChars('FO')}
          </span>
          <span className="inline-block">{splitChars('LIO')}</span>

          <div className="absolute top-[40%] left-0 w-[110%] h-[15%] bg-red-500/80 -translate-y-1/2 mix-blend-screen -rotate-2 transform-gpu blur-[2px]" />
          <div className="absolute -top-4 -right-10 w-24 h-12 bg-white/20 backdrop-blur-md rotate-12 border border-white/20" />
        </h1>
      </div>

      <div className="absolute -bottom-1 left-0 w-[120%] h-24 bg-white clip-paper object-cover z-20" />
    </section>
  );
}
