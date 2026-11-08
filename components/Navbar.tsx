'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/ai-chat', label: 'AI Chat' },
  { href: '/contribute', label: 'Contribute' },
];

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  /* ── Initialize theme ────────────────────────── */
  useEffect(() => {
    const currentTheme = (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') || 'dark';
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('portfolio_theme', nextTheme);
    } catch (e) {}
  };

  /* ── GSAP entrance ───────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        x: -24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.2,
      });
      if (linksRef.current) {
        const items = linksRef.current.querySelectorAll('.nav-link-item');
        gsap.from(items, {
          y: -16,
          opacity: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.45,
        });
      }
    });
    return () => ctx.revert();
  }, []);

  /* ── Scroll glass effect ─────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Lock body scroll & mark mobile open state ── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('nav-mobile-open');
      document.body.classList.add('nav-mobile-open');
    } else {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('nav-mobile-open');
      document.body.classList.remove('nav-mobile-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('nav-mobile-open');
      document.body.classList.remove('nav-mobile-open');
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Responsive CSS Rules ── */}
      <style>{`
        .nav-desktop-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nav-hire-desktop { display: flex; }
        .nav-hamburger-btn { display: none; }

        /* Desktop: transparent full width at top, floats when scrolled */
        .nav-pill-wrapper {
          pointer-events: none;
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 100%;
          height: 64px;
          margin-top: 0px;
          border-radius: 0px;
          background-color: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border: 1px solid transparent;
          border-bottom: 1px solid transparent;
          box-shadow: none;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-pill-wrapper.is-scrolled {
          pointer-events: auto;
          width: min(1000px, calc(100% - 20px));
          max-width: 1000px;
          height: 54px;
          margin-top: 10px;
          border-radius: 9999px;
          background-color: var(--surface-2);
          backdrop-filter: blur(20px) saturate(200%);
          -webkit-backdrop-filter: blur(20px) saturate(200%);
          border: 1px solid var(--border-strong);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
        }

        @media (max-width: 900px) {
          .nav-desktop-links { display: none !important; }
          .nav-hire-desktop  { display: none !important; }
          .nav-hamburger-btn { display: flex !important; }

          /* Mobile: Always default floating rounded pill when closed */
          .nav-pill-wrapper {
            width: calc(100% - 24px) !important;
            max-width: 1000px !important;
            height: 54px !important;
            margin-top: 10px !important;
            border-radius: 9999px !important;
            background-color: var(--surface-2) !important;
            backdrop-filter: blur(20px) saturate(200%) !important;
            -webkit-backdrop-filter: blur(20px) saturate(200%) !important;
            border: 1px solid var(--border-strong) !important;
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3) !important;
          }

          /* Mobile: When open, it seamlessly integrates into the full-screen drawer */
          .nav-pill-wrapper.is-mobile-open {
            width: 100% !important;
            max-width: 100% !important;
            margin-top: 0px !important;
            height: 64px !important;
            border-radius: 0px !important;
            background-color: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            border: 1px solid transparent !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      {/* ── Main navbar ──────────────────────────────── */}
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          className={`nav-pill-wrapper ${scrolled ? 'is-scrolled' : ''} ${mobileOpen ? 'is-mobile-open' : ''}`}
        >
          <div
            className="container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              width: '100%',
              padding: scrolled || mobileOpen ? '0 16px' : '0 20px',
              transition: 'padding 0.3s ease',
            }}
          >
            {/* Logo */}
            <Link
              ref={logoRef}
              href="/"
              id="nav-logo"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
                flexShrink: 0,
                textDecoration: 'none',
                pointerEvents: 'auto',
              }}
            >
              chirag<span style={{ color: 'var(--accent)' }}>.</span>
            </Link>

            {/* Desktop links + Controls wrapper (aligned right) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginLeft: 'auto', pointerEvents: 'none' }}>
              {/* ── Desktop nav links (CSS-controlled visibility) ── */}
              <div ref={linksRef} className="nav-desktop-links" style={{ pointerEvents: 'none' }}>
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      className="nav-link-item"
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                        backgroundColor: isActive ? 'var(--accent-soft)' : 'transparent',
                        transition: 'background-color 0.18s ease, color 0.18s ease',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'auto',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--border)';
                          (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                          (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Right-most controls: Theme Toggle + Contact button + hamburger */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, pointerEvents: 'none' }}>
                {/* Theme Toggle Button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={toggleTheme}
                  id="nav-theme-toggle"
                  style={{
                    background: 'none',
                    border: '1px solid var(--border-strong)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    padding: '7px 9px',
                    color: 'var(--text-primary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border-color 0.18s ease, background-color 0.18s ease',
                    pointerEvents: 'auto',
                  }}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                  title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? <FiSun size={16} color="#F59E0B" /> : <FiMoon size={16} color="#6B5EE4" />}
                </motion.button>

                {/* Contact — hidden on mobile via CSS */}
                <Link
                  href="/contact"
                  id="nav-contact-btn"
                  className="btn btn-dark nav-hire-desktop"
                  style={{ padding: '8px 18px', fontSize: '0.82rem', pointerEvents: 'auto' }}
                >
                  Contact ↗
                </Link>

                {/* Hamburger / Close toggle on Mobile */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileOpen(!mobileOpen)}
                  id="nav-hamburger"
                  className="nav-hamburger-btn"
                  style={{
                    background: 'none',
                    border: '1.5px solid var(--border)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    padding: '7px 9px',
                    color: 'var(--text-primary)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border-color 0.18s ease, background-color 0.18s ease',
                    pointerEvents: 'auto',
                  }}
                  aria-label="Toggle navigation menu"
                >
                  {mobileOpen ? <FiX size={17} /> : <FiMenu size={17} />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Full-Screen Smooth Drawer (Framer Motion) ─────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              backgroundColor: 'var(--bg)',
              backdropFilter: 'blur(24px) saturate(200%)',
              WebkitBackdropFilter: 'blur(24px) saturate(200%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '80px 24px 36px',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Links with staggered reveal motion */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '4px' }}>
              {links.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.04, duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      id={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        fontSize: 'clamp(1.3rem, 5.5vw, 1.75rem)',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                        backgroundColor: isActive ? 'var(--accent-soft)' : 'transparent',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: '48px',
                        transition: 'all 0.18s ease',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA button with smooth motion */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                id="mobile-nav-contact-btn"
                className="btn btn-dark"
                style={{
                  marginTop: '28px',
                  justifyContent: 'center',
                  padding: '14px 24px',
                  fontSize: '0.95rem',
                  minHeight: '48px',
                  width: '100%',
                }}
              >
                Contact ↗
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
