import React from 'react';
import { Layers, Monitor, Terminal, Database } from 'lucide-react';

export default function Skills() {
  return (
    <section id="skills" className="relative w-full bg-red-500 text-white flex flex-col md:flex-row min-h-[70vh] border-y-8 border-black z-10">
      <div className="w-full md:w-1/3 p-12 md:p-20 flex flex-col justify-center">
        <h2 className="text-6xl md:text-8xl font-anton uppercase mb-10 text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">Skills</h2>
        <ul className="space-y-6 font-inter font-bold text-2xl">
          <li className="uppercase tracking-widest hover:pl-4 transition-all cursor-pointer hover:text-black">Frontend Dev</li>
          <li className="uppercase tracking-widest hover:pl-4 transition-all cursor-pointer hover:text-black">Backend Dev</li>
          <li className="uppercase tracking-widest hover:pl-4 transition-all cursor-pointer hover:text-black">UI/UX Design</li>
          <li className="uppercase tracking-widest hover:pl-4 transition-all cursor-pointer hover:text-black">3D Graphics</li>
        </ul>
      </div>
      <div className="w-full md:w-2/3 p-12 md:p-20 flex flex-col justify-center bg-black/10">
        <h2 className="text-6xl md:text-8xl font-anton uppercase mb-10 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">Tools</h2>
        <div className="flex flex-wrap gap-6">
          <div className="w-24 h-24 bg-black rounded-3xl flex items-center justify-center text-white text-3xl font-bold font-inter shadow-[6px_6px_0_rgba(255,255,255,1)] hover:-translate-y-2 transition-transform cursor-pointer">
            <Monitor size={48} strokeWidth={1.5} />
          </div>
          <div className="w-24 h-24 bg-black rounded-3xl flex items-center justify-center text-white text-3xl font-bold font-inter shadow-[6px_6px_0_rgba(255,255,255,1)] hover:-translate-y-2 transition-transform cursor-pointer">
            <Terminal size={48} strokeWidth={1.5} />
          </div>
          <div className="w-24 h-24 bg-black rounded-3xl flex items-center justify-center text-white text-3xl font-bold font-inter shadow-[6px_6px_0_rgba(255,255,255,1)] hover:-translate-y-2 transition-transform cursor-pointer">
            <Layers size={48} strokeWidth={1.5} />
          </div>
          <div className="w-24 h-24 bg-black rounded-3xl flex items-center justify-center text-white text-3xl font-bold font-inter shadow-[6px_6px_0_rgba(255,255,255,1)] hover:-translate-y-2 transition-transform cursor-pointer">
            <Database size={48} strokeWidth={1.5} />
          </div>
        </div>
      </div>
      {/* Tape overlays */}
      <div className="absolute top-0 right-10 w-32 h-10 bg-white/40 backdrop-blur-md border border-white -translate-y-1/2 -rotate-12 z-20"></div>
    </section>
  );
}
