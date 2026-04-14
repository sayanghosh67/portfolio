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

        <div className="mt-16 flex flex-col lg:flex-row items-start justify-between gap-16">
          {/* Contact info */}
          <div className="space-y-8 lg:w-1/2">
            <a href="mailto:iemsayanghosh@gmail.com" className="group flex flex-wrap items-center gap-2 text-base md:text-2xl font-inter font-bold text-white hover:text-red-500 transition-colors break-all md:break-normal">
              <Mail size={24} />
              iemsayanghosh@gmail.com
              <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <p className="text-neutral-500 font-inter text-lg">Based in India · Available Worldwide</p>
            
            {/* Social icons */}
            <div className="flex gap-6 mt-8">
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

          {/* Contact Form */}
          <div className="lg:w-1/2 w-full bg-neutral-900/50 p-8 border border-neutral-800 backdrop-blur-sm relative">
            <div className="absolute top-0 right-0 w-8 h-8 bg-red-500 -translate-y-1/2 translate-x-1/2 rotate-12"></div>
            <form action="https://formsubmit.co/iemsayanghosh@gmail.com" method="POST" className="space-y-6 flex flex-col font-inter">
              <input type="hidden" name="_subject" value="New Contact from Portfolio Website" />
              <input type="hidden" name="_captcha" value="false" />
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">Your Name</label>
                <input type="text" name="name" required placeholder="John Doe" className="w-full bg-black border-b-2 border-neutral-700 text-white p-3 focus:outline-none focus:border-red-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">Email Address</label>
                <input type="email" name="email" required placeholder="john@example.com" className="w-full bg-black border-b-2 border-neutral-700 text-white p-3 focus:outline-none focus:border-red-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">Message</label>
                <textarea rows="4" name="message" required placeholder="Tell me about your project..." className="w-full bg-black border-b-2 border-neutral-700 text-white p-3 focus:outline-none focus:border-red-500 transition-colors resize-none"></textarea>
              </div>
              <button type="submit" className="self-end px-8 py-3 bg-red-500 text-white font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 mt-4">
                Send Message
              </button>
            </form>
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
