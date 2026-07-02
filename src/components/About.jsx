import { useEffect, useRef, useState } from 'react';

/* ── Count-up hook ── */
function useCountUp(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const STATS = [
  { value: 15, suffix: '+', label: 'Projects Built' },
  { value: 3,  suffix: '+', label: 'Years Coding'   },
  { value: 8,  suffix: '+', label: 'Technologies'   },
];

export default function About() {
  const sectionRef = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const counts = STATS.map(s => useCountUp(s.value, 1400, triggered));

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-transparent text-white py-32 px-8 md:px-20 z-10 flex flex-col md:flex-row items-center justify-between gap-16"
    >
      {/* Left — copy */}
      <div className="w-full md:w-1/2 space-y-8">
        <p className="font-inter text-sm font-bold tracking-[0.3em] uppercase text-red-500">— Who I Am</p>
        <h2 className="text-6xl md:text-8xl font-anton uppercase underline decoration-red-500 decoration-8 underline-offset-8 leading-none">
          About<br />Me
        </h2>
        <h3 className="text-xl font-inter font-bold text-neutral-300">
          Software Developer &amp; CSE (AI) Student
        </h3>
        <p className="text-base md:text-lg font-inter text-neutral-400 leading-relaxed max-w-lg">
          I'm a <strong>Computer Science Engineering (AI) student</strong> passionate about building modern, scalable software and extracting insights from data. My core strengths include <strong>Data Structures &amp; Algorithms (DSA) using Java</strong>, Object-Oriented Programming, and full-stack development.
        </p>
        <p className="text-base md:text-lg font-inter text-neutral-400 leading-relaxed max-w-lg">
          I focus on writing clean, maintainable code and solving real-world problems with robust, high-performance solutions. Currently open to full-time roles and freelance projects worldwide.
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-black/10">
          {STATS.map((stat, i) => (
            <div key={stat.label}>
              <p className="font-anton text-5xl text-red-500 leading-none">
                {counts[i]}{stat.suffix}
              </p>
              <p className="font-inter text-xs text-neutral-500 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <a
          href={`${import.meta.env.BASE_URL}resume.pdf`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-inter font-bold text-sm tracking-widest uppercase px-6 py-3 bg-black text-white hover:bg-red-500 transition-all duration-200"
        >
          Download CV ↓
        </a>
      </div>

      {/* Right — photo block */}
      <div className="w-full md:w-1/2 relative flex justify-center">
        <div className="absolute top-8 right-8 md:right-24 w-[280px] h-[380px] bg-red-500 rounded-tl-[80px]" />
        <div className="relative z-10 w-[280px] h-[380px] bg-neutral-900 overflow-hidden shadow-2xl rotate-2">
          <img
            src={`${import.meta.env.BASE_URL}sayan.jpg`}
            alt="Sayan Ghosh"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-7 bg-white/40 backdrop-blur-md border border-white/20 rotate-1" />
        </div>
        <p className="absolute -bottom-4 left-0 md:left-4 font-marker text-3xl text-red-500 -rotate-90 origin-bottom-left whitespace-nowrap select-none">
          I design &amp; build
        </p>
      </div>
    </section>
  );
}
