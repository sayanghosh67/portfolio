import React, { useRef, useState } from 'react';
import gsap from 'gsap';

const projects = [
  {
    title: 'NeXora Gadgets',
    category: 'E-COMMERCE / BRANDING',
    description: 'A high-end e-commerce experience featuring cinematic scroll animations, bidirectional product entrance/exit effects, and a modern design philosophy.',
    tech: ['React', 'Tailwind', 'GSAP', 'Framer'],
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    live: 'https://sayanghosh67.github.io/NeXora-Gadgets/',
    github: 'https://github.com/sayanghosh67/NeXora-Gadgets',
  },
  {
    title: '3D Portfolio Website',
    category: 'FRONTEND DEVELOPMENT',
    description: 'Developed to establish a strong professional identity. Solved performance bottlenecks in complex 3D rendering by optimizing Three.js configurations, resulting in a highly interactive, 60fps web experience.',
    tech: ['React', 'Tailwind', 'GSAP', 'Three.js'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    live: '#',
    github: 'https://github.com/sayanghosh67/',
  },
  {
    title: 'Aervion — Weather Dashboard',
    category: 'API PROJECT',
    description: 'Built to provide immediate meteorological insights. Implemented asynchronous data fetching from OpenWeatherMap API, handling dynamic UI updates and location tracking efficiently.',
    tech: ['JavaScript', 'REST API', 'CSS3', 'HTML5'],
    image: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&q=80&w=800',
    live: 'https://sayanghosh67.github.io/AERVION/',
    github: 'https://github.com/sayanghosh67/AERVION',
  },
  {
    title: 'AI Mind Map Generator',
    category: 'AI / MOBILE APP',
    description: 'Created to enhance productivity for students by converting handwritten notes into structured data. Used OCR and Groq Vision AI to process notes and auto-generate interactive mind maps.',
    tech: ['Flutter', 'Groq AI', 'OCR', 'Firebase'],
    image: `${import.meta.env.BASE_URL}mindmap-project.png`,
    live: '#',
    github: 'https://github.com/sayanghosh67/ai-mind-map',
  },
];


function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.04,
      boxShadow: '0 0 50px rgba(255,0,0,0.55)',
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      boxShadow: '0 0 0px rgba(255,0,0,0)',
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden cursor-pointer"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        marginTop: isEven ? '0' : '80px',
        marginLeft: isEven ? '0' : 'auto',
        marginRight: isEven ? 'auto' : '0',
      }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/20 transition-all duration-500"></div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500 transition-all duration-300"></div>
      </div>

      {/* Text content */}
      <div className="pt-6 pb-4">
        <p className="text-xs md:text-sm font-inter font-bold tracking-[0.3em] text-red-500 mb-2">{project.category}</p>
        <h3 className="text-2xl md:text-4xl font-anton uppercase text-white group-hover:text-red-500 transition-colors duration-300">{project.title}</h3>
        
        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mt-3 mb-3">
          {project.tech.map((t, i) => (
            <span key={i} className="text-xs font-inter font-bold bg-neutral-900 border border-neutral-700 text-neutral-300 px-2 py-1 uppercase tracking-wider">
              {t}
            </span>
          ))}
        </div>

        <p className="text-sm md:text-base font-inter text-neutral-400 mt-2 max-w-sm line-clamp-3 group-hover:line-clamp-none transition-all duration-300">{project.description}</p>

        {/* Action buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 text-xs font-bold font-inter bg-red-500 text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-center"
          >
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 text-xs font-bold font-inter border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 uppercase tracking-widest text-center"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Tape corner */}
      <div className="absolute -top-2 -right-2 w-16 h-8 bg-white/15 backdrop-blur-sm rotate-12 border border-white/10 pointer-events-none"></div>
    </div>
  );
}

const shadexflow = {
  title: 'ShadeXFlow — Smart Window',
  category: 'IoT / HARDWARE',
  description: 'Engineered a real-world automation system. Integrated rain detection and servo motor controls via ESP32, managed synchronously through a real-time WebSocket dashboard over a local network.',
  tech: ['ESP32', 'Node.js', 'WebSocket', 'C++', 'IoT'],
  image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
  live: 'https://project-hrhh2.vercel.app',
  github: 'https://github.com/sayanghosh67/shadexflow',
};

export default function Projects() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="projects" className="relative w-full bg-black py-32 px-8 md:px-20 z-10 overflow-hidden">
      {/* Torn paper top */}
      <div className="absolute top-0 left-0 w-[120%] h-20 bg-red-500 clip-paper rotate-180 -translate-y-1 pointer-events-none"></div>

      <div className="mb-20">
        <p className="font-marker text-2xl text-red-500 mb-4 -rotate-3">// my work</p>
        <h2 className="text-5xl md:text-[10rem] font-anton uppercase text-white leading-none">
          PRO<span className="text-red-500">JECTS</span>
        </h2>
      </div>

      {/* Collage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>

      {/* ShadeXFlow — revealed when VIEW MORE clicked */}
      <div
        style={{
          maxHeight: showMore ? '900px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.7s cubic-bezier(0.4,0,0.2,1)',
        }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-16">
          <ProjectCard project={shadexflow} index={0} />
        </div>
      </div>

      {/* VIEW MORE sticker — the actual toggle button */}
      <button
        onClick={() => setShowMore((v) => !v)}
        className="absolute bottom-20 right-10 md:right-20 w-28 h-28 rounded-full bg-red-500 flex items-center justify-center shadow-[0_0_30px_rgba(255,0,0,0.5)] hover:scale-110 hover:rotate-0 transition-all duration-300 cursor-pointer z-50"
        style={{ rotate: showMore ? '0deg' : '12deg' }}
        aria-label="Toggle ShadeXFlow project"
      >
        <span className="font-marker text-white text-sm text-center leading-tight select-none">
          {showMore ? 'SHOW\nLESS\n↑' : 'VIEW\nMORE\n→'}
        </span>
      </button>
    </section>
  );
}
