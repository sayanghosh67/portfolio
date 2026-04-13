import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cursor from './components/Cursor';
import ThreeCanvas from './components/ThreeCanvas';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Showcase from './components/Showcase';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

// ── Loading Screen ─────────────────────────────────────────────
function Loader({ onDone }) {
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => onDone(),
    });
    tl.from(textRef.current, { opacity: 0, y: 30, duration: 0.5, ease: 'power2.out' })
      .to(textRef.current, { opacity: 0, y: -30, duration: 0.4, ease: 'power2.in', delay: 0.6 })
      .to(loaderRef.current, { yPercent: -100, duration: 0.7, ease: 'power4.inOut' });
  }, [onDone]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-black flex items-center justify-center z-[9999] overflow-hidden"
    >
      <div ref={textRef} className="text-center">
        <h1 className="font-anton text-5xl md:text-8xl text-white tracking-widest uppercase">
          Sayan <span className="text-red-500">Ghosh</span>
        </h1>
        <p className="font-inter text-neutral-500 text-sm mt-4 tracking-[0.4em] uppercase">
          Loading Portfolio...
        </p>
      </div>
    </div>
  );
}

// ── Scroll Progress Bar ────────────────────────────────────────
function ScrollProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / total) * 100;
      if (barRef.current) barRef.current.style.width = `${progress}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-[3px] bg-neutral-900 z-[9998] w-full">
      <div ref={barRef} className="h-full bg-red-500 transition-none" style={{ width: '0%' }} />
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────
function Navbar() {
  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 mix-blend-difference pointer-events-none">
      <span
        className="font-inter font-bold text-sm md:text-base text-white tracking-widest uppercase pointer-events-auto cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Sayan Ghosh
      </span>
      <div className="hidden md:flex items-center gap-8 pointer-events-auto">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="font-inter text-xs text-white tracking-[0.2em] uppercase hover:text-red-500 transition-colors duration-200 cursor-pointer"
          >
            {link.label}
          </button>
        ))}
      </div>
      <span className="font-inter text-sm text-white pointer-events-auto">2026</span>
    </nav>
  );
}

// ── App ────────────────────────────────────────────────────────
function App() {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef(null);

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Scroll-triggered animations
    const sections = mainRef.current?.querySelectorAll('section');
    if (sections) {
      sections.forEach((section) => {
        section.querySelectorAll('h2, h1, h3').forEach((h) => {
          gsap.from(h, {
            scrollTrigger: { trigger: h, start: 'top 85%', toggleActions: 'play none none none' },
            y: 80,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          });
        });
        section.querySelectorAll('p').forEach((p) => {
          gsap.from(p, {
            scrollTrigger: { trigger: p, start: 'top 90%', toggleActions: 'play none none none' },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          });
        });
      });
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [loading]);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <ScrollProgressBar />
      <Cursor />
      <Navbar />
      <ThreeCanvas />

      <main ref={mainRef} className="relative z-10 w-full min-h-screen cursor-none">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Showcase />
        <Contact />
      </main>
    </>
  );
}

export default App;
