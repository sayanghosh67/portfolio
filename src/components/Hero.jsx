import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ROLES = [
  'Creative Developer',
  'UI/UX Designer',
  '3D Enthusiast',
  'Full-Stack Builder',
];

/* ── Magnetic button: nudges toward the cursor within its bounds ── */
function MagneticLink({ href, onClick, className, children }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.3, y: y * 0.4, duration: 0.4, ease: 'power3.out' });
  };

  const handleLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </a>
  );
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const sectionRef = useRef(null);
  const panelRef = useRef(null);

  /* ── Typewriter ── */
  useEffect(() => {
    const full = ROLES[roleIdx];
    let timeout;

    if (!deleting && displayed.length < full.length) {
      timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx(i => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  /* ── GSAP entry animation ── */
  useGSAP(() => {
    gsap.from('.hero-line', {
      y: 120,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power4.out',
      delay: 0.3,
    });
    gsap.from('.hero-sub', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.9,
      ease: 'power3.out',
    });
    gsap.from('.hero-cta', {
      y: 20,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      delay: 1.1,
      ease: 'power2.out',
    });
    gsap.from('.hero-ring', {
      scale: 0,
      opacity: 0,
      duration: 1.4,
      stagger: 0.1,
      delay: 0.2,
      ease: 'power3.out',
    });
  }, []);

  /* ── Subtle parallax tilt on the whole content block (desktop only) ── */
  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    if (!section || !panel || window.innerWidth < 768) return;

    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(panel, {
        rotateY: x * 4,
        rotateX: -y * 4,
        duration: 0.6,
        ease: 'power2.out',
      });
    };
    const handleLeave = () => {
      gsap.to(panel, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power2.out' });
    };

    section.addEventListener('mousemove', handleMove);
    section.addEventListener('mouseleave', handleLeave);
    return () => {
      section.removeEventListener('mousemove', handleMove);
      section.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden px-8 md:px-20 pt-24 pb-16"
      style={{ perspective: '1400px' }}
    >
      {/* Decorative tech rings — corner accents */}
      <span className="hero-ring hidden md:block absolute top-28 right-12 w-40 h-40 rounded-full border border-red-500/25 pointer-events-none" />
      <span className="hero-ring hidden md:block absolute top-24 right-8 w-56 h-56 rounded-full border border-white/10 pointer-events-none" />
      <span className="hero-ring hidden lg:block absolute bottom-24 right-32 w-24 h-24 rounded-full border border-dashed border-red-500/20 pointer-events-none" />

      {/* Glass content panel — wraps the whole hero text block */}
      <div
        ref={panelRef}
        className="relative will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Typewriter role badge */}
        <div className="hero-sub mb-6 flex items-center gap-3">
          <span className="block w-8 h-px bg-red-500" />
          <span className="font-inter text-base md:text-lg text-red-500 font-medium tracking-widest uppercase">
            {displayed}
            <span className="animate-pulse">|</span>
          </span>
        </div>

        {/* Giant name */}
        <div className="overflow-hidden">
          <h2 className="hero-line font-inter font-black text-xl md:text-2xl text-neutral-400 uppercase tracking-[0.3em] border-l-4 border-red-500 pl-4 mb-4">
            Sayan Ghosh
          </h2>
        </div>
        <div className="overflow-hidden">
          <h1
            className="hero-line text-[17vw] leading-[0.82] font-anton text-white uppercase"
            style={{ textShadow: '0 8px 60px rgba(255,0,0,0.25)' }}
          >
            PORT<span className="text-red-500">FO</span>LIO
          </h1>
        </div>

        {/* Sub-copy */}
        <p className="hero-sub mt-8 max-w-md font-inter text-base md:text-lg text-neutral-400 leading-relaxed">
          I build fast, beautiful digital experiences — from design-system thinking to 3D-rendered interfaces.
        </p>

        {/* CTAs — magnetic */}
        <div className="flex flex-wrap gap-4 mt-10">
          <MagneticLink
            href="#projects"
            onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="hero-cta font-inter font-bold tracking-widest uppercase text-sm px-7 py-3.5 bg-red-500 text-white hover:bg-white hover:text-black transition-colors duration-200 inline-block shadow-[0_0_0_rgba(255,0,0,0)] hover:shadow-[0_0_35px_rgba(255,0,0,0.45)]"
          >
            See My Work
          </MagneticLink>
          <MagneticLink
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="hero-cta font-inter font-bold tracking-widest uppercase text-sm px-7 py-3.5 border border-white/30 text-white hover:border-red-500 hover:text-red-500 transition-colors duration-200 inline-block backdrop-blur-sm bg-white/[0.02]"
          >
            Get In Touch
          </MagneticLink>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-inter text-xs tracking-widest uppercase text-white">Scroll</span>
        <span className="relative block w-px h-10 bg-white/30 overflow-hidden">
          <span
            className="absolute top-0 left-0 w-full h-1/2 bg-red-500"
            style={{ animation: 'scrollLine 1.8s ease-in-out infinite' }}
          />
        </span>
      </div>

      {/* Torn paper to About (white) */}
      <div className="absolute -bottom-1 left-0 w-[120%] h-20 bg-white clip-paper z-20 pointer-events-none" />
    </section>
  );
}
