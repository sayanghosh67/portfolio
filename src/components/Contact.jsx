import { useState } from 'react';
import { Mail, ArrowUpRight, CheckCircle, ArrowUp } from 'lucide-react';
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.target;
    const formData = new FormData(form);

    try {
      await fetch('https://formsubmit.co/ajax/iemsayanghosh@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-transparent py-32 px-8 md:px-20 z-10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p className="font-inter text-sm font-bold tracking-[0.3em] uppercase text-red-500 mb-6">
          — Get In Touch
        </p>

        {/* Huge heading */}
        <h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-anton uppercase text-white leading-[0.85]">
          LET&apos;S<br />
          <span className="text-red-500">WORK</span><br />
          TOGETHER
        </h2>

        <div className="mt-16 flex flex-col lg:flex-row items-start justify-between gap-16">
          {/* Contact info */}
          <div className="space-y-8 lg:w-1/2">
            <a
              href="mailto:iemsayanghosh@gmail.com"
              className="group flex flex-wrap items-center gap-2 text-base md:text-2xl font-inter font-bold text-white hover:text-red-500 transition-colors break-all md:break-normal"
            >
              <Mail size={24} />
              iemsayanghosh@gmail.com
              <ArrowUpRight
                size={18}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </a>
            <p className="text-neutral-500 font-inter text-lg">
              Based in India · Available Worldwide
            </p>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="font-inter text-sm text-green-400 font-medium">
                Available for opportunities
              </span>
            </div>

            {/* Social icons */}
            <div className="flex gap-6 mt-8">
              <a
                href="https://github.com/sayanghosh67/"
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 hover:scale-110 transition-all duration-300"
              >
                <FiGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/sayan-ghosh97/"
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 hover:scale-110 transition-all duration-300"
              >
                <FiLinkedin size={24} />
              </a>
              <a
                href="https://www.instagram.com/sayan_ghosh97/"
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 hover:scale-110 transition-all duration-300"
              >
                <FiInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2 w-full bg-transparent p-8 border border-neutral-800 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 bg-red-500 -translate-y-1/2 translate-x-1/2 rotate-12" />

            {/* Success overlay */}
            {status === 'sent' && (
              <div
                className="absolute inset-0 bg-black/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-8"
                style={{ animation: 'fadeIn 0.4s ease-out' }}
              >
                <div className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500 flex items-center justify-center mb-6">
                  <CheckCircle size={32} className="text-red-500" />
                </div>
                <h3 className="font-anton text-3xl md:text-4xl text-white uppercase mb-3">
                  Message Sent!
                </h3>
                <p className="font-inter text-neutral-400 text-sm md:text-base text-center max-w-sm leading-relaxed">
                  Your message has been delivered to{' '}
                  <span className="text-red-500 font-bold">Sayan Ghosh</span>. You will
                  receive a reply at your email soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 px-6 py-2.5 border border-neutral-700 text-neutral-400 font-inter text-xs uppercase tracking-widest hover:border-red-500 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col font-inter">
              <input type="hidden" name="_subject" value="New Contact from Portfolio Website" />
              <input type="hidden" name="_captcha" value="false" />
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Good Name"
                  className="w-full bg-black border-b-2 border-neutral-700 text-white p-3 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="username@domain"
                  className="w-full bg-black border-b-2 border-neutral-700 text-white p-3 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2 font-bold">
                  Message
                </label>
                <textarea
                  rows="4"
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  className="w-full bg-transparent border-b-2 border-neutral-700 text-white p-3 focus:outline-none focus:border-red-500 transition-colors resize-none"
                />
              </div>

              {/* Error message */}
              {status === 'error' && (
                <p className="text-red-400 text-sm font-inter">
                  Something went wrong. Please try again or email directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="self-end px-8 py-3 bg-red-500 text-white font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* ── Enhanced Footer ── */}
        <footer className="mt-24 pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
            {/* Logo */}
            <div>
              <h3 className="font-anton text-2xl text-white uppercase">
                Sayan<span className="text-red-500">.</span>
              </h3>
              <p className="font-inter text-sm text-neutral-500 mt-2">
                Software Developer &amp; CSE (AI) Student
              </p>
            </div>

            {/* Quick navigation */}
            <div className="flex flex-wrap gap-6">
              {['About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(link.toLowerCase())
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="font-inter text-xs text-neutral-500 hover:text-red-500 transition-colors uppercase tracking-widest"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group w-12 h-12 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:border-red-500 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp
                size={18}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
            <p className="text-neutral-600 font-inter text-sm">
              © {new Date().getFullYear()} Sayan Ghosh. All Rights Reserved.
            </p>
            <p className="text-neutral-700 font-inter text-xs tracking-widest uppercase">
              Designed &amp; Built with ❤️ by Sayan
            </p>
          </div>
        </footer>
      </div>

      {/* Decorative sticker */}
      <div
        className="absolute top-10 right-10 w-20 h-20 rounded-full border-4 border-dashed border-red-500/40 flex items-center justify-center animate-spin"
        style={{ animationDuration: '20s' }}
      >
        <span className="text-red-500 text-2xl">★</span>
      </div>
    </section>
  );
}
