import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cursor from './components/Cursor';
import ThreeCanvas from './components/ThreeCanvas';
import Grain from './components/Grain';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Showcase from './components/Showcase';
import Contact from './components/Contact';
import { scrollState } from './lib/scrollState';

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 mix-blend-difference pointer-events-none">
      <span className="font-inter font-bold text-sm md:text-base text-white tracking-widest uppercase pointer-events-auto cursor-pointer" data-hover="HOME">
        Sayan Ghosh
      </span>
      <span className="font-inter text-sm text-white pointer-events-auto">2026</span>
    </nav>
  );
}

function App() {
  const mainRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      scrollState.progress = e.progress;
      scrollState.velocity = e.velocity;
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const sections = mainRef.current?.querySelectorAll('section');
    if (sections) {
      sections.forEach((section) => {
        const headings = section.querySelectorAll('h2, h1');
        headings.forEach((h) => {
          gsap.from(h, {
            scrollTrigger: {
              trigger: h,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 80,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          });
        });

        const paragraphs = section.querySelectorAll('p');
        paragraphs.forEach((p) => {
          gsap.from(p, {
            scrollTrigger: {
              trigger: p,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
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
  }, []);

  // Lock scroll until the preloader finishes
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Grain />
      <Cursor />
      <Navbar />
      <ThreeCanvas />
      <ScrollProgress />
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
