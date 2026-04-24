import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    gsap.from('.hero-text', {
      y: 120,
      opacity: 0,
      duration: 1.2,
      stagger: 0.18,
      ease: 'power4.out',
      delay: 0.4,
      immediateRender: false,
    });
    gsap.from('.hero-sub', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 1,
      immediateRender: false,
    });
  }, []);

  return (
    <section id="hero" className="relative w-full h-screen flex flex-col justify-center overflow-hidden px-8 md:px-20 pointer-events-none">
      {/* Handwritten label */}
      <div className="absolute top-10 left-10 md:top-24 md:left-20 z-20">
        <p className="font-marker text-xl md:text-3xl text-red-500 -rotate-6 tracking-wider drop-shadow-lg">
          Software Developer • CSE (AI)
        </p>
      </div>

      {/* Main content */}
      <div className="z-10 mt-16 pointer-events-auto">
        <h2 className="hero-text text-base md:text-2xl font-inter font-bold text-neutral-400 mb-3 uppercase border-l-4 border-red-500 pl-4 tracking-widest">
          Sayan Ghosh
        </h2>
        <h1 className="hero-text text-[15vw] md:text-[17vw] leading-[0.75] font-anton text-white uppercase relative inline-block">
          PORT<span className="text-red-500">FO</span>LIO
          {/* Red glitch stripe */}
          <div className="absolute top-[42%] left-0 w-[108%] h-[13%] bg-red-500/75 -translate-y-1/2 mix-blend-screen -rotate-2 transform-gpu blur-[2px] pointer-events-none"></div>
          {/* Tape */}
          <div className="absolute -top-4 -right-10 w-24 h-12 bg-white/20 backdrop-blur-md rotate-12 border border-white/20 pointer-events-none"></div>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub mt-6 text-base md:text-lg font-inter text-neutral-300 max-w-xl leading-relaxed">
          I am a <strong>Computer Science Engineering (AI) student</strong> with a strong foundation in <span className="text-red-500 font-bold">Data Structures & Algorithms (DSA)</span> using Java.
          <br />I build robust software, data-driven solutions, and scalable web applications focused on performance and real-world impact.
        </p>

        {/* CTA Buttons */}
        <div className="hero-sub mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-block px-7 py-3 bg-red-500 text-white font-bold font-inter text-sm uppercase tracking-widest hover:bg-transparent hover:text-red-500 border-2 border-red-500 transition-all duration-300"
          >
            View Projects
          </button>
          <a
            href="https://sayanghosh67.github.io/portfolio/resume.pdf"
            target="_blank"
            rel="noreferrer"
            download="Sayan_Ghosh_Resume.pdf"
            className="inline-block px-7 py-3 border-2 border-white text-white font-bold font-inter text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            Download Resume
          </a>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-block px-7 py-3 border-2 border-red-500/50 text-red-500 font-bold font-inter text-sm uppercase tracking-widest hover:border-red-500 hover:bg-red-500/10 transition-all duration-300"
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* Torn paper at bottom */}
      <div className="absolute -bottom-1 left-0 w-[120%] h-24 bg-white clip-paper z-20 pointer-events-none"></div>
    </section>
  );
}
