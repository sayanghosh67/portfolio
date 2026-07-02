import { useEffect, useRef, useState } from 'react';

const TIMELINE = [
  {
    year: '2023 — Present',
    title: 'B.Tech CSE (Artificial Intelligence)',
    org: 'University Education',
    description:
      'Pursuing Computer Science Engineering with AI specialization. Building a strong foundation in Data Structures, Algorithms, Machine Learning, and Software Engineering.',
    tags: ['Java', 'Python', 'DSA', 'AI/ML'],
    icon: '🎓',
  },
  {
    year: '2024',
    title: 'Full-Stack Web Development',
    org: 'Self-Driven Learning',
    description:
      'Mastered modern web technologies and built production-grade applications using React, Three.js, GSAP animations, and Node.js backend systems.',
    tags: ['React', 'Node.js', 'Three.js', 'GSAP'],
    icon: '💻',
  },
  {
    year: '2024',
    title: 'IoT & Embedded Systems',
    org: 'ShadeXFlow — Smart Window',
    description:
      'Engineered a real-world IoT automation system with ESP32 microcontroller, servo motor controls, rain detection sensors, and WebSocket real-time dashboard.',
    tags: ['ESP32', 'C++', 'WebSocket', 'IoT'],
    icon: '⚡',
  },
  {
    year: '2025',
    title: 'AI & Mobile App Development',
    org: 'AI Mind Map Generator',
    description:
      'Developed a cross-platform Flutter app leveraging Groq Vision AI and OCR to convert handwritten notes into structured, interactive mind maps.',
    tags: ['Flutter', 'Groq AI', 'OCR', 'Firebase'],
    icon: '🤖',
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState(new Set());

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.timeline-card');
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full bg-transparent py-32 px-8 md:px-20 z-10 overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-20">
        <p className="font-inter text-sm font-bold tracking-[0.3em] uppercase text-red-500 mb-4">
          — My Journey
        </p>
        <h2 className="text-6xl md:text-8xl font-anton uppercase text-white leading-none">
          EXPE<span className="text-red-500">RIENCE</span>
        </h2>
        <div className="w-24 h-1 bg-red-500 mt-6" />
      </div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-neutral-800 md:-translate-x-px">
          <div
            className="absolute top-0 left-0 w-full bg-red-500 transition-all duration-1000 ease-out"
            style={{ height: `${(visibleCards.size / TIMELINE.length) * 100}%` }}
          />
        </div>

        {TIMELINE.map((item, i) => {
          const isLeft = i % 2 === 0;
          const isVisible = visibleCards.has(String(i));

          return (
            <div
              key={i}
              data-index={i}
              className={`timeline-card relative flex items-start mb-16 md:mb-24 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Dot on timeline */}
              <div
                className={`absolute left-6 md:left-1/2 w-4 h-4 rounded-full border-2 border-red-500 bg-black z-10 -translate-x-1/2 mt-2 transition-all duration-500 ${
                  isVisible ? 'scale-100 bg-red-500' : 'scale-75'
                }`}
              />

              {/* Card */}
              <div
                className={`ml-16 md:ml-0 md:w-[calc(50%-40px)] ${
                  isLeft ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'
                }`}
              >
                <div className="bg-neutral-900/80 border border-neutral-800 p-6 md:p-8 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300 group">
                  {/* Year badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-inter text-xs font-bold tracking-widest uppercase text-red-500 bg-red-500/10 px-3 py-1">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="font-anton text-xl md:text-2xl text-white uppercase mb-1 group-hover:text-red-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-inter text-sm text-neutral-500 font-medium mb-3">
                    {item.org}
                  </p>
                  <p className="font-inter text-sm text-neutral-400 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-inter text-xs font-bold uppercase tracking-wider text-neutral-500 bg-neutral-800 px-2.5 py-1 border border-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative background text */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 rotate-90 origin-right font-anton text-[8rem] md:text-[12rem] text-white/[0.02] leading-none uppercase select-none pointer-events-none">
        JOURNEY
      </div>
    </section>
  );
}
