import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';

export default function Contact() {
  return (
    <section id="contact" className="relative w-full bg-black py-32 px-8 md:px-20 z-10 overflow-hidden border-t-4 border-red-500">
      {/* Huge heading */}
      <div className="max-w-6xl mx-auto">
        <p className="font-marker text-2xl text-red-500 mb-6 -rotate-2">// get in touch</p>
        <h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-anton uppercase text-white leading-[0.85]">
          LET'S<br />
          <span className="text-red-500">WORK</span><br />
          TOGETHER
        </h2>

        <div className="mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          {/* Contact info */}
          <div className="space-y-4">
            <a href="mailto:iemsayanghosh@gmail.com" className="group flex items-center gap-3 text-xl md:text-2xl font-inter font-bold text-white hover:text-red-500 transition-colors">
              <Mail size={24} />
              iemsayanghosh@gmail.com
              <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <p className="text-neutral-500 font-inter text-lg">Based in India · Available Worldwide</p>
          </div>

          {/* Social icons */}
          <div className="flex gap-6">
            <a href="https://github.com/sayanghosh67/" target="_blank" rel="noreferrer" className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 hover:scale-110 transition-all duration-300">
              <FiGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/sayan-ghosh97/" target="_blank" rel="noreferrer" className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 hover:scale-110 transition-all duration-300">
              <FiLinkedin size={24} />
            </a>
            <a href="https://www.instagram.com/sayan_ghosh97/" target="_blank" rel="noreferrer" className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 hover:scale-110 transition-all duration-300">
              <FiInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Footer bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 font-inter text-sm">© 2026 Sayan Ghosh. All Rights Reserved.</p>
          <p className="text-neutral-600 font-inter text-sm">Designed with passion</p>
        </div>
      </div>

      {/* Decorative sticker */}
      <div className="absolute top-10 right-10 w-20 h-20 rounded-full border-4 border-dashed border-red-500/40 flex items-center justify-center animate-spin" style={{ animationDuration: '20s' }}>
        <span className="text-red-500 text-2xl">★</span>
      </div>
    </section>
  );
}
