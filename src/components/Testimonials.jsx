const TESTIMONIALS = [
  {
    quote:
      'Sayan delivers exceptional work that consistently exceeds expectations. His attention to detail in both code quality and visual design is truly remarkable.',
    author: 'Project Collaborator',
    role: 'Web Development',
  },
  {
    quote:
      'Outstanding problem-solving skills combined with a keen eye for aesthetics. A rare full-stack talent who bridges design and engineering seamlessly.',
    author: 'Team Lead',
    role: 'Software Engineering',
  },
  {
    quote:
      'His ability to blend 3D graphics, smooth animations, and clean architecture into cohesive experiences is genuinely impressive and ahead of the curve.',
    author: 'Design Mentor',
    role: 'UI/UX Design',
  },
  {
    quote:
      'Consistently writes clean, maintainable code with excellent documentation. One of the most dedicated and reliable developers I\'ve worked with.',
    author: 'Peer Developer',
    role: 'Code Quality',
  },
  {
    quote:
      'Sayan brings both creative vision and technical depth to every project. His portfolio work demonstrates a level of polish rarely seen at this stage.',
    author: 'Industry Mentor',
    role: 'Career Development',
  },
];

export default function Testimonials() {
  return (
    <section className="relative w-full bg-transparent py-24 z-10 overflow-hidden border-y border-neutral-800">
      {/* Section label */}
      <div className="text-center mb-14 px-8">
        <p className="font-inter text-sm font-bold tracking-[0.3em] uppercase text-red-500 mb-3">
          — What People Say
        </p>
        <h2 className="text-4xl md:text-6xl font-anton uppercase text-white">
          TESTI<span className="text-red-500">MONIALS</span>
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden group">
        <div
          className="flex gap-6 animate-marquee hover:[animation-play-state:paused]"
          style={{ width: 'max-content' }}
        >
          {/* Render testimonials twice for seamless loop */}
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[360px] md:w-[400px] bg-neutral-900/60 border border-neutral-800 p-8 backdrop-blur-sm hover:border-red-500/40 transition-colors duration-300"
            >
              {/* Quote mark */}
              <div className="text-red-500 text-5xl font-anton leading-none mb-4 select-none">
                &ldquo;
              </div>

              <p className="font-inter text-sm text-neutral-300 leading-relaxed mb-6">
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="font-anton text-red-500 text-sm">
                    {t.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-inter text-sm font-bold text-white">{t.author}</p>
                  <p className="font-inter text-xs text-neutral-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edge fade gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-black to-transparent z-10" />
      </div>
    </section>
  );
}
