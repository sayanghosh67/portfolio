import React from 'react';

const showcaseImages = [
  {
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    label: 'ABSTRACT ART',
    rotation: '-3deg',
    offset: '0',
  },
  {
    src: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=800',
    label: 'WEB DESIGN',
    rotation: '2deg',
    offset: '60px',
  },
  {
    src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
    label: 'MOBILE APP',
    rotation: '-1deg',
    offset: '20px',
  },
];

export default function Showcase() {
  return (
    <section className="relative w-full bg-black py-32 px-8 md:px-20 z-10 overflow-hidden">
      <div className="mb-16">
        <h2 className="text-7xl md:text-[8rem] font-anton uppercase text-white leading-none">
          SHOW<span className="text-red-500">CASE</span>
        </h2>
        <div className="w-32 h-2 bg-red-500 mt-6"></div>
      </div>

      {/* Overlapping poster images */}
      <div className="relative flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-center max-w-6xl mx-auto" style={{ minHeight: '500px' }}>
        {showcaseImages.map((item, i) => (
          <div
            key={i}
            className="group relative w-full md:w-[380px] flex-shrink-0 cursor-pointer transition-transform duration-500 hover:z-30 hover:scale-105"
            style={{
              transform: `rotate(${item.rotation})`,
              marginTop: item.offset,
              marginLeft: i > 0 ? '-40px' : '0',
              zIndex: 10 + i,
            }}
          >
            <div className="relative overflow-hidden shadow-2xl border-4 border-white/10 group-hover:border-red-500 transition-colors duration-300">
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                className="w-full h-[400px] md:h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              {/* Label overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <p className="font-anton text-3xl text-white uppercase">{item.label}</p>
              </div>
              {/* Red corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-t-red-500 border-l-[60px] border-l-transparent"></div>
            </div>
            {/* Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/20 backdrop-blur-md border border-white/10 rotate-1"></div>
          </div>
        ))}
      </div>

      {/* Floating decorative text */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 rotate-90 origin-right font-anton text-[6rem] md:text-[10rem] text-white/[0.03] leading-none uppercase select-none pointer-events-none">
        CREATIVE
      </div>
    </section>
  );
}
