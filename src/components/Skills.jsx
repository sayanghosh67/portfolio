import { useEffect, useRef, useState } from 'react';
import {
  FaJava,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaFileExcel,
  FaDatabase,
  FaChartLine,
  FaPalette,
  FaFire,
} from 'react-icons/fa';

/* ── Data ── */
const CATEGORIES = ['Programming', 'Web', 'Tools', 'Data'];

const SKILL_CARDS = {
  Programming: {
    label: 'Programming',
    skills: [
      { name: 'Java (DSA, OOP)', Icon: FaJava, color: 'text-red-500', level: 92 },
      { name: 'Python', Icon: FaPython, color: 'text-blue-400', level: 82 },
      { name: 'C Programming', iconText: 'C', color: 'text-purple-400', level: 75 },
    ],
  },
  Web: {
    label: 'Web Development',
    skills: [
      { name: 'HTML / CSS / JS', Icon: FaJsSquare, color: 'text-yellow-400', level: 90 },
      { name: 'React / Tailwind', Icon: FaReact, color: 'text-cyan-400', level: 88 },
      { name: 'Node.js', Icon: FaNodeJs, color: 'text-green-500', level: 78 },
    ],
  },
  Tools: {
    label: 'Tools & Technologies',
    skills: [
      { name: 'Git / GitHub', Icon: FaGithub, color: 'text-white', level: 88 },
      { name: 'Three.js / GSAP', iconText: '3D', color: 'text-white', level: 82 },
      { name: 'Firebase', Icon: FaFire, color: 'text-yellow-500', level: 76 },
    ],
  },
  Data: {
    label: 'Data & Analytics',
    skills: [
      { name: 'Power BI', Icon: FaDatabase, color: 'text-yellow-500', level: 80 },
      { name: 'Excel', Icon: FaFileExcel, color: 'text-green-600', level: 86 },
      { name: 'R Programming', Icon: FaChartLine, color: 'text-blue-500', level: 72 },
    ],
  },
};

/* ── Orbiting Tech Galaxy (pure CSS 3D) ── */
const ORBIT_ICONS = [
  { Icon: FaJava, col: '#f89820' },
  { Icon: FaPython, col: '#3776ab' },
  { Icon: FaReact, col: '#61dafb' },
  { Icon: FaJsSquare, col: '#f7df1e' },
  { Icon: FaNodeJs, col: '#68a063' },
  { Icon: FaGithub, col: '#ffffff' },
  { Icon: FaFire, col: '#ffca28' },
  { Icon: FaChartLine, col: '#42a5f5' },
];

function SkillOrbit() {
  return (
    <div className="relative w-52 h-52 mx-auto mt-8 hidden md:block select-none">
      {/* Orbit rings */}
      <div className="absolute inset-0 rounded-full border border-white/20" />
      <div className="absolute inset-5 rounded-full border border-dashed border-white/10" />
      <div className="absolute inset-10 rounded-full border border-white/5" />

      {/* Rotating container */}
      <div
        className="absolute inset-0"
        style={{ animation: 'orbit-spin 28s linear infinite' }}
      >
        {ORBIT_ICONS.map((item, i) => {
          const angle = (i / ORBIT_ICONS.length) * 360;
          const rad = (angle * Math.PI) / 180;
          const x = 50 + 43 * Math.cos(rad);
          const y = 50 + 43 * Math.sin(rad);
          return (
            <div
              key={i}
              className="absolute w-9 h-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/80 border border-white/25 flex items-center justify-center shadow-lg"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animation: 'orbit-counter-spin 28s linear infinite',
              }}
            >
              <item.Icon size={16} style={{ color: item.col }} />
            </div>
          );
        })}
      </div>

      {/* Center hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/70 border-2 border-red-500/50 flex items-center justify-center backdrop-blur-sm shadow-[0_0_20px_rgba(239,68,68,0.3)]">
        <span className="font-inter text-white text-xs font-bold tracking-wider">{'</>'}</span>
      </div>
    </div>
  );
}

/* ── Component ── */
export default function Skills() {
  const [activeTab, setActiveTab] = useState(null);
  const sectionRef = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-transparent text-white flex flex-col md:flex-row min-h-[70vh] z-10"
    >
      {/* Left — category menu + orbit */}
      <div className="w-full md:w-1/3 p-12 md:p-20 flex flex-col justify-center">
        <h2 className="text-6xl md:text-8xl font-anton uppercase mb-10 text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
          Skills
        </h2>
        <ul className="space-y-6 font-inter font-bold text-2xl">
          {CATEGORIES.map((cat) => (
            <li
              key={cat}
              onMouseEnter={() => setActiveTab(cat)}
              onMouseLeave={() => setActiveTab(null)}
              className={`uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === cat ? 'pl-4 text-black' : 'hover:pl-4 hover:text-black'
              }`}
            >
              {SKILL_CARDS[cat].label}
            </li>
          ))}
        </ul>

        {/* Orbiting Tech Galaxy */}
        <SkillOrbit />
      </div>

      {/* Right — skill cards with progress bars */}
      <div className="w-full md:w-2/3 p-12 md:p-20 flex flex-col justify-center bg-black/10">
        <h2 className="text-6xl md:text-8xl font-anton uppercase mb-10 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] text-white">
          Expertise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl font-inter">
          {CATEGORIES.map((cat) => {
            const card = SKILL_CARDS[cat];
            const isActive = activeTab === cat;

            return (
              <div
                key={cat}
                className={`bg-black/90 p-6 rounded-xl transition-all duration-300 cursor-default ${
                  isActive
                    ? 'border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] scale-105 z-10'
                    : 'border border-white/10 shadow-[6px_6px_0_rgba(239,68,68,1)]'
                }`}
              >
                <h3 className="text-red-500 font-bold mb-5 uppercase tracking-widest text-sm">
                  {card.label}
                </h3>
                <ul className="text-neutral-300 text-base space-y-4">
                  {card.skills.map((skill) => (
                    <li key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {skill.Icon ? (
                            <skill.Icon className={skill.color} size={18} />
                          ) : (
                            <span className={`font-bold text-sm ${skill.color}`}>
                              {skill.iconText}
                            </span>
                          )}
                          <span className="text-sm">{skill.name}</span>
                        </div>
                        <span className="text-xs text-neutral-500 font-bold tabular-nums">
                          {skill.level}%
                        </span>
                      </div>
                      {/* Animated progress bar */}
                      <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full transition-all ease-out"
                          style={{
                            width: triggered ? `${skill.level}%` : '0%',
                            transitionDuration: '1.5s',
                            transitionDelay: triggered ? '0.2s' : '0s',
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tape overlays */}
      <div className="absolute top-0 right-10 w-32 h-10 bg-white/40 backdrop-blur-md border border-white -translate-y-1/2 -rotate-12 z-20" />
    </section>
  );
}
