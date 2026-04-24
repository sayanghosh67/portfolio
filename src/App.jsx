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
  const photoRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const lineRef = useRef(null);
  const taglineRef = useRef(null);
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      // Initial states
      gsap.set(photoRef.current, { scale: 1.2, opacity: 0 });
      gsap.set(firstNameRef.current, { y: 60, opacity: 0 });
      gsap.set(lastNameRef.current, { y: 60, opacity: 0 });
      gsap.set(lineRef.current, { scaleX: 0 });
      gsap.set(taglineRef.current, { opacity: 0, y: 15 });
      gsap.set(progressRef.current, { opacity: 0 });
      gsap.set(progressBarRef.current, { scaleX: 0 });

      const tl = gsap.timeline({ onComplete: () => onDone() });

      tl
        // Photo fades in with slow zoom
        .to(photoRef.current, {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
        })
        // First name slides up
        .to(firstNameRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.7')
        // Red line draws across
        .to(lineRef.current, {
          scaleX: 1,
          duration: 0.6,
          ease: 'power2.inOut',
        }, '-=0.4')
        // Last name slides up
        .to(lastNameRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.4')
        // Tagline fades in
        .to(taglineRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.3')
        // Progress bar
        .to(progressRef.current, {
          opacity: 1,
          duration: 0.2,
        }, '-=0.3')
        .to(progressBarRef.current, {
          scaleX: 1,
          duration: 1,
          ease: 'power1.inOut',
        })
        // Hold for a beat
        .to({}, { duration: 0.15 })
        // Fade to black then slide up
        .to(overlayRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut',
        })
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
        });
    });

    return () => cancelAnimationFrame(frameId);
  }, [onDone]);

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[9999] overflow-hidden bg-black">
      {/* Background photo — large, moody, full-screen */}
      <div
        ref={photoRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0 }}
      >
        <img
          src={`${import.meta.env.BASE_URL}sayan.jpg`}
          alt="Sayan Ghosh"
          className="w-full h-full object-cover object-top"
          style={{ filter: 'brightness(0.25) contrast(1.15) saturate(0.6)' }}
        />
        {/* Dark + red tint overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.95) 100%), linear-gradient(135deg, rgba(239,68,68,0.07) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        {/* First name */}
        <h1
          ref={firstNameRef}
          className="font-anton text-[16vw] md:text-[12vw] lg:text-[10vw] text-white uppercase leading-[0.85] tracking-[0.05em]"
          style={{ opacity: 0 }}
        >
          SAYAN
        </h1>

        {/* Red divider line */}
        <div
          ref={lineRef}
          className="w-24 md:w-40 h-[3px] bg-red-500 my-3 md:my-4 origin-center"
          style={{ transform: 'scaleX(0)' }}
        />

        {/* Last name */}
        <h1
          ref={lastNameRef}
          className="font-anton text-[16vw] md:text-[12vw] lg:text-[10vw] text-red-500 uppercase leading-[0.85] tracking-[0.2em]"
          style={{ opacity: 0 }}
        >
          GHOSH
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-inter text-neutral-400 text-[10px] md:text-xs mt-8 md:mt-10 tracking-[0.6em] uppercase"
          style={{ opacity: 0 }}
        >
          Software Developer &bull; CSE (AI)
        </p>

        {/* Progress bar */}
        <div
          ref={progressRef}
          className="mt-5 w-24 md:w-40 h-[1px] bg-neutral-800 overflow-hidden"
          style={{ opacity: 0 }}
        >
          <div
            ref={progressBarRef}
            className="h-full bg-red-500 origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>

      {/* Fade-out overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black z-20 pointer-events-none"
        style={{ opacity: 0 }}
      />
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
            immediateRender: false,
          });
        });
        section.querySelectorAll('p').forEach((p) => {
          gsap.from(p, {
            scrollTrigger: { trigger: p, start: 'top 90%', toggleActions: 'play none none none' },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            immediateRender: false,
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
