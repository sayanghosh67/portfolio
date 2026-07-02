import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

  /* ── active section tracker ── */
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* ── scroll glass effect ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── lock body when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 transition-all duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : ''
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={e => handleNavClick(e, '#')}
          className="font-anton text-xl text-white tracking-widest uppercase hover:text-red-500 transition-colors"
        >
          Sayan<span className="text-red-500">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                className={`font-inter text-sm font-medium tracking-widest uppercase transition-colors duration-200 ${
                  active === link.href.slice(1)
                    ? 'text-red-500'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              target="_blank"
              rel="noreferrer"
              className="font-inter text-sm font-bold tracking-widest uppercase px-5 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              Résumé ↗
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-10 transition-all duration-400 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={e => handleNavClick(e, link.href)}
            className="font-anton text-5xl text-white uppercase hover:text-red-500 transition-colors"
          >
            {link.label}
          </a>
        ))}
        <a
          href={`${import.meta.env.BASE_URL}resume.pdf`}
          target="_blank"
          rel="noreferrer"
          className="font-inter text-base font-bold tracking-widest uppercase px-8 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
        >
          Download Résumé
        </a>
      </div>
    </>
  );
}
