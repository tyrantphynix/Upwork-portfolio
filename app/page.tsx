'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TypeAnimation } from 'react-type-animation';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiStar,
  FiLayers,
  FiCode,
  FiSmartphone,
  FiGlobe,
  FiShield,
  FiUsers,
  FiZap,
  FiCpu,
  FiMail,
  FiLayout,
  FiCheckCircle,
  FiMessageSquare,
  FiEye,
  FiBriefcase,
} from 'react-icons/fi';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCenterpiece from '@/components/HeroCenterpiece';
import { siteConfig } from '@/config/site';

gsap.registerPlugin(ScrollTrigger);

/* ── Data ─────────────────────────────────────────── */
const services = [
  {
    image: '/images/service_webdev.png',
    label: 'Web Development',
    desc: 'Fast, scalable web apps with modern frameworks',
  },
  {
    image: '/images/service_mobile.png',
    label: 'Mobile Apps',
    desc: 'Cross-platform mobile apps for iOS & Android',
  },
  {
    image: '/images/service_uiux.png',
    label: 'UI/UX Design',
    desc: 'Beautiful interfaces with great user experience',
  },
  {
    image: '/images/service_backend.png',
    label: 'Backend & APIs',
    desc: 'Robust server-side solutions & RESTful APIs',
  },
  {
    image: '/images/service_wordpress_v2.png',
    label: 'WordPress & CMS',
    desc: 'Custom themes, WooCommerce & speed optimization',
  },
];

/* ── Toggle to revert to original image cards if set to false ─────── */
const USE_MODERN_CARDS = true;

function ModernServiceCard({
  label,
  desc,
  type,
}: {
  label: string;
  desc: string;
  type: 'web' | 'mobile' | 'uiux' | 'backend' | 'wordpress';
}) {
  return (
    <div className="service-card-modern" id={`service-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="service-card-header">
        <h3>{label}</h3>
        <p>{desc}</p>
      </div>

      <div className="service-card-graphic">
        {type === 'web' && (
          <div
            className="graphic-inner-window"
            style={{
              width: '95%',
              height: '165px',
              background: '#FFFFFF',
              borderRadius: '12px 12px 0 0',
              border: '1px solid rgba(0,0,0,0.08)',
              borderBottom: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              padding: '10px',
              transition: 'transform 0.4s ease',
            }}
          >
            {/* Browser Header Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FF5F56' }} />
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FFBD2E' }} />
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#27C93F' }} />
              <div
                style={{
                  marginLeft: '6px',
                  height: '16px',
                  flex: 1,
                  background: '#F1F5F9',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '6px',
                  fontSize: '0.52rem',
                  color: '#64748B',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                https://app.dev
              </div>
            </div>

            {/* Center Code Editor Mockup */}
            <div
              style={{
                flex: 1,
                background: '#0F172A',
                borderRadius: '8px',
                padding: '10px 10px',
                fontSize: '0.55rem',
                fontFamily: 'var(--font-mono)',
                color: '#94A3B8',
                lineHeight: 1.6,
                position: 'relative',
              }}
            >
              <div><span style={{ color: '#38BDF8' }}>import</span> <span style={{ color: '#F472B6' }}>React</span></div>
              <div>&lt;<span style={{ color: '#4ADE80' }}>WebApp</span> title=<span style={{ color: '#FDE047' }}>&quot;Next.js&quot;</span> /&gt;</div>
              <div style={{ color: '#64748B', fontSize: '0.5rem', marginTop: '2px' }}>// Fast &amp; Scalable</div>

              {/* Floating Status Badge - SAFELY INSIDE TOP-RIGHT */}
              <div
                className="graphic-float-badge"
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  padding: '2px 7px',
                  borderRadius: '999px',
                  background: 'rgba(74, 222, 128, 0.15)',
                  color: '#4ADE80',
                  border: '1px solid rgba(74, 222, 128, 0.3)',
                  fontSize: '0.48rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#4ADE80' }} />
                <span>Deployed</span>
              </div>
            </div>
          </div>
        )}

        {type === 'mobile' && (
          <div
            className="graphic-inner-window"
            style={{
              width: '88%',
              height: '165px',
              background: '#FFFFFF',
              borderRadius: '16px 16px 0 0',
              border: '2px solid #CBD5E1',
              borderBottom: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              padding: '8px 8px 0 8px',
              transition: 'transform 0.4s ease',
              overflow: 'hidden',
            }}
          >
            {/* Dynamic Notch */}
            <div style={{ width: '36px', height: '4px', background: '#0F172A', borderRadius: '2px', marginBottom: '6px' }} />

            {/* Screen Header */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 4px' }}>
              <span style={{ fontSize: '0.52rem', fontWeight: 700, color: '#0F172A' }}>09:41</span>
              <div
                className="graphic-float-badge"
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px var(--accent-glow)',
                }}
              >
                <FiCheckCircle size={11} />
              </div>
            </div>

            {/* Mobile Screen App Card */}
            <div
              style={{
                width: '100%',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiSmartphone size={12} color="var(--accent)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.55rem', fontWeight: 700, color: '#0F172A' }}>iOS &amp; Android</div>
                  <div style={{ fontSize: '0.48rem', color: '#64748B' }}>Cross-platform</div>
                </div>
              </div>

              {/* Mini Progress Bar */}
              <div style={{ width: '100%', height: '4px', background: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '75%', height: '100%', background: 'var(--accent)' }} />
              </div>
            </div>
          </div>
        )}

        {type === 'uiux' && (
          <div
            className="graphic-inner-window"
            style={{
              width: '95%',
              height: '165px',
              background: '#FFFFFF',
              borderRadius: '12px 12px 0 0',
              border: '1px solid rgba(0,0,0,0.08)',
              borderBottom: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              padding: '10px',
              transition: 'transform 0.4s ease',
              overflow: 'hidden',
            }}
          >
            {/* Header with Swatches & Layer Badge - FULLY VISIBLE INSIDE */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', gap: '3px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#1A1A1A' }} />
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)' }} />
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-light)' }} />
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#F4C430' }} />
              </div>

              <div
                className="graphic-float-badge"
                style={{
                  padding: '2px 6px',
                  borderRadius: '6px',
                  background: 'var(--accent)',
                  color: '#FFFFFF',
                  fontSize: '0.5rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <FiLayers size={10} />
                <span>Figma</span>
              </div>
            </div>

            {/* Component Canvas Preview */}
            <div
              style={{
                flex: 1,
                background: '#F8FAFC',
                borderRadius: '8px',
                border: '1.5px dashed #0EA5E9',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#C8E6C9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiUsers size={11} color="#2E7D32" />
                </div>
                <div>
                  <div style={{ fontSize: '0.55rem', fontWeight: 700, color: '#0F172A' }}>Design System</div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#F4C430' }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Figma Cursor Badge - SAFELY INSIDE BOTTOM-RIGHT */}
              <div
                style={{
                  alignSelf: 'flex-end',
                  background: '#0EA5E9',
                  color: '#FFF',
                  padding: '2px 6px',
                  borderRadius: '4px 8px 8px 8px',
                  fontSize: '0.48rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                <span>🎨 UX Design</span>
              </div>
            </div>
          </div>
        )}

        {type === 'backend' && (
          <div
            className="graphic-inner-window"
            style={{
              width: '95%',
              height: '165px',
              background: '#090D16',
              borderRadius: '12px 12px 0 0',
              border: '1px solid rgba(255,255,255,0.1)',
              borderBottom: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              padding: '10px',
              fontFamily: 'var(--font-mono)',
              transition: 'transform 0.4s ease',
              overflow: 'hidden',
            }}
          >
            {/* Console Header with 200 OK Badge - FULLY INSIDE */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.48rem', padding: '2px 5px', borderRadius: '3px', background: '#3B82F6', color: '#FFF', fontWeight: 700 }}>GET</span>
              <span
                className="graphic-float-badge"
                style={{
                  fontSize: '0.48rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: 'rgba(74, 222, 128, 0.15)',
                  color: '#4ADE80',
                  border: '1px solid rgba(74, 222, 128, 0.3)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <FiZap size={9} />
                <span>200 OK ● 12ms</span>
              </span>
            </div>

            {/* JSON Terminal Body */}
            <div style={{ flex: 1, fontSize: '0.52rem', color: '#94A3B8', lineHeight: 1.5, background: '#111827', padding: '6px 8px', borderRadius: '6px' }}>
              <div>{'{'}</div>
              <div style={{ paddingLeft: '8px' }}><span style={{ color: '#F472B6' }}>&quot;api&quot;</span>: <span style={{ color: '#4ADE80' }}>&quot;RESTful&quot;</span>,</div>
              <div style={{ paddingLeft: '8px' }}><span style={{ color: '#F472B6' }}>&quot;server&quot;</span>: <span style={{ color: '#FDE047' }}>&quot;Node.js&quot;</span></div>
              <div>{'}'}</div>
            </div>
          </div>
        )}

        {type === 'wordpress' && (
          <div
            className="graphic-inner-window"
            style={{
              width: '95%',
              height: '165px',
              background: '#FFFFFF',
              borderRadius: '12px 12px 0 0',
              border: '1px solid rgba(0,0,0,0.08)',
              borderBottom: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              padding: '10px',
              transition: 'transform 0.4s ease',
              overflow: 'hidden',
            }}
          >
            {/* Admin Topbar with Official WP Logo */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', background: '#1D2327', padding: '4px 8px', borderRadius: '6px', color: '#FFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {/* Official WP Circle Logo */}
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: '#21759B',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '0.6rem',
                    fontFamily: 'var(--font-serif)',
                  }}
                >
                  W
                </div>
                <span style={{ fontSize: '0.52rem', color: '#F0F6FC', fontWeight: 700 }}>WordPress Admin</span>
              </div>

              <div
                className="graphic-float-badge"
                style={{
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: '#2E7D32',
                  color: '#FFFFFF',
                  fontSize: '0.45rem',
                  fontWeight: 700,
                }}
              >
                ⚡ 100% Speed
              </div>
            </div>

            {/* WP Admin Layout Split: Left Nav Sidebar + Gutenberg Main Builder */}
            <div style={{ flex: 1, display: 'flex', gap: '6px', overflow: 'hidden' }}>
              {/* WP Admin Sidebar */}
              <div
                style={{
                  width: '54px',
                  background: '#1D2327',
                  borderRadius: '6px',
                  padding: '6px 4px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ fontSize: '0.45rem', color: '#00A0D2', fontWeight: 700 }}>● Dashboard</div>
                <div style={{ fontSize: '0.45rem', color: '#C3C4C7' }}>● Posts</div>
                <div style={{ fontSize: '0.45rem', color: '#C3C4C7' }}>● Plugins</div>
                <div style={{ fontSize: '0.45rem', color: '#96588A', fontWeight: 600 }}>● Woo</div>
              </div>

              {/* Gutenberg Block Canvas */}
              <div
                style={{
                  flex: 1,
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#C8E6C9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FiLayout size={9} color="#2E7D32" />
                  </div>
                  <div style={{ fontSize: '0.48rem', fontWeight: 700, color: '#0F172A' }}>Custom Theme</div>
                </div>

                <div style={{ display: 'flex', gap: '3px' }}>
                  <div style={{ flex: 1, height: '14px', background: '#E2E8F0', borderRadius: '3px' }} />
                  <div style={{ flex: 1, height: '14px', background: '#C8E6C9', borderRadius: '3px' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


const whyChooseMe = [
  {
    icon: FiMessageSquare,
    title: 'Conversational AI Products',
    desc: 'Chat interfaces powered by Gemini & GPT. Task management, smart scheduling, and AI assistants that actually help users get things done.',
  },
  {
    icon: FiShield,
    title: 'Security-First Engineering',
    desc: 'Most MERN apps are vulnerable. I build (or patch) your application with a security-first mindset, closing logic gaps before hackers find them.',
  },
  {
    icon: FiCpu,
    title: 'AI Automation & Agents',
    desc: 'Custom AI agents that talk to your data. From priority engines to smart schedulers; conversational UIs that replace dashboards.',
  },
  {
    icon: FiLayers,
    title: 'Full-Stack Product Delivery',
    desc: 'End-to-end product builds from MVP to scale. TypeScript, Python, Next.js, Electron shipped with CI/CD and monitoring.',
  },
];

const testimonials = [
  {
    quote:
      'Chirag delivered our CRM platform ahead of schedule with exceptional quality. His full-stack expertise and attention to detail made the entire process smooth and professional.',
    name: 'Sophia Nelson',
    role: 'Client Partner',
    avatar: '/images/testimonial_person.png',
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Progressive loading & Reduced motion accessibility states
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion (OS accessibility / low power mode)
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.from(headlineRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      })
        .from(
          ctaRef.current,
          { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        );

      // Parallax depth for background ambient orbs on scroll
      gsap.to('.orb-green', {
        y: 120,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to('.orb-cream', {
        y: -90,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          ██  HERO SECTION (Fullscreen 3D Robot Background Canvas)
          ══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="imax-centered-hero"
        id="hero"
        style={{
          position: 'relative',
          marginTop: 'calc(-1 * var(--nav-height))',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'var(--bg)',
        }}
      >
        {/* ── Progressive Loading Instant Ambient Backdrop (Zero Text Ghosting) ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
            opacity: splineLoaded && !prefersReducedMotion ? 0 : 1,
            transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg)',
            backgroundImage: `
              radial-gradient(circle at 50% 65%, rgba(107, 94, 228, 0.35) 0%, rgba(243, 126, 126, 0.18) 32%, transparent 65%),
              radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.08) 0%, transparent 50%)
            `,
          }}
        />

        {/* ── Fullscreen Interactive 3D Spline Robot Canvas ── */}
        {!prefersReducedMotion && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
              pointerEvents: 'auto',
              overflow: 'hidden',
            }}
          >
            <iframe
              src="https://my.spline.design/robotfollowcursorforlandingpage-W46xmVWmgF3Jk3tRP40IX7Wh/"
              title="Interactive 3D Robot Hero Canvas"
              style={{
                width: '100%',
                height: 'calc(100% + 120px)',
                marginTop: '-60px',
                border: 'none',
                background: 'transparent',
                pointerEvents: 'auto',
              }}
              allow="accelerometer; gyroscope"
            />
          </div>
        )}

        {/* ── Floating HUD Interface Layers (Directly on top of 3D Canvas) ── */}
        <div
          className="imax-container"
          style={{
            position: 'relative',
            zIndex: 3,
            width: '100%',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 'calc(100vh - 40px)',
            paddingTop: 'calc(var(--nav-height) + 16px)',
            paddingBottom: '24px',
          }}
        >
          {/* ── 1. Centered Top Header Zone ────────────────────────── */}
          <div className="imax-hero-header" style={{ pointerEvents: 'none' }}>
            {/* Micro Status Chip */}
            <div style={{ marginBottom: '14px', pointerEvents: 'none' }}>
              <span
                className="chip"
                style={{
                  padding: '6px 16px',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  borderRadius: '9999px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.40)',
                  color: '#34D399',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  pointerEvents: 'none',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#10B981',
                    display: 'inline-block',
                    boxShadow: '0 0 8px #10B981',
                    pointerEvents: 'none',
                  }}
                />
                AVAILABLE FOR Q4 PROJECTS // WORLDWIDE REMOTE
              </span>
            </div>

            {/* Display Headline */}
            <h1
              ref={headlineRef}
              className="hero-display-text"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(2.4rem, 4.4vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                marginBottom: '14px',
                color: 'var(--text-primary)',
                textShadow: '0 4px 24px rgba(0,0,0,0.7)',
                pointerEvents: 'none',
              }}
            >
              <span style={{ pointerEvents: 'none' }}>I </span>
              <TypeAnimation
                sequence={[
                  'Build Products That Scale.',
                  2000,
                  'Ship AI Systems.',
                  2000,
                  'Write Scalable Code.',
                  2000,
                  'Create SaaS Experiences.',
                  2000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                preRenderFirstString={true}
                className="gradient-text"
                style={{
                  background: 'linear-gradient(135deg, #6B5EE4 0%, #38BDF8 60%, #FF6B6B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  pointerEvents: 'none',
                }}
              />
            </h1>
          </div>

          {/* ── 2. Floating Flank HUD Panels (Left & Right Wings) ───── */}
          <div className="imax-stage-arena" style={{ pointerEvents: 'none' }}>
            {/* Left Flank: System Telemetry Pills */}
            <div className="imax-telemetry-col left-flank" style={{ pointerEvents: 'none' }}>
              {/* HUD Micro-Pill 1: Security */}
              <div className="hud-micro-pill" tabIndex={0}>
                <div className="hud-micro-pill-header">
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '8px',
                      background: 'rgba(56, 189, 248, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-2)',
                      flexShrink: 0,
                    }}
                  >
                    <FiShield size={13} />
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.58rem',
                        color: 'var(--accent-2)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginRight: '6px',
                      }}
                    >
                      SECURE
                    </span>
                    <strong style={{ fontSize: '0.80rem', color: 'var(--text-primary)' }}>
                      Audit 100%
                    </strong>
                  </div>
                </div>
                <div className="hud-micro-details">
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                    Zero logic vulnerabilities. Hardened auth &amp; data isolation.
                  </p>
                </div>
              </div>

              {/* HUD Micro-Pill 2: AI Agents */}
              <div className="hud-micro-pill" tabIndex={0}>
                <div className="hud-micro-pill-header">
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '8px',
                      background: 'var(--accent-soft)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-light)',
                      flexShrink: 0,
                    }}
                  >
                    <FiCpu size={13} />
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.58rem',
                        color: 'var(--accent-light)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginRight: '6px',
                      }}
                    >
                      AI AGENTS
                    </span>
                    <strong style={{ fontSize: '0.80rem', color: 'var(--text-primary)' }}>
                      Active
                    </strong>
                  </div>
                </div>
                <div className="hud-micro-details">
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                    Automated reasoning, tool loops &amp; streaming LLM pipelines.
                  </p>
                </div>
              </div>
            </div>

            {/* Center Stage: Transparent Breathing Space for 3D Robot */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: 'clamp(280px, 32vw, 480px)',
                minHeight: '280px',
                pointerEvents: 'none',
              }}
            >
              {/* Clear center allowing the 3D Spline robot to be fully visible and interacted with */}
            </div>

            {/* Right Flank: Social Proof & Metrics */}
            <div className="imax-telemetry-col right-flank" style={{ pointerEvents: 'none' }}>
              {/* HUD Micro-Pill 3: Client Rating */}
              <div className="hud-micro-pill" tabIndex={0}>
                <div className="hud-micro-pill-header">
                  <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                    <FiStar size={13} fill="#F4C430" stroke="#F4C430" />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.80rem', color: 'var(--text-primary)' }}>
                      5.0 Rating
                    </strong>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.58rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.06em',
                        marginLeft: '6px',
                      }}
                    >
                      // VERIFIED
                    </span>
                  </div>
                </div>
                <div className="hud-micro-details">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {['1', '2', '3', '4', '5'].map((idx, index) => (
                        <div
                          key={idx}
                          style={{
                            position: 'relative',
                            width: '20px',
                            height: '20px',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            border: '1.5px solid var(--bg)',
                            marginLeft: index > 0 ? '-6px' : '0',
                            zIndex: 10 - index,
                          }}
                        >
                          <Image
                            src={`/images/client_avatar_${idx}.png`}
                            alt={`Client ${idx}`}
                            fill
                            sizes="20px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.70rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.35 }}>
                    Trusted by venture-backed founders worldwide.
                  </p>
                </div>
              </div>

              {/* HUD Micro-Pill 4: Shipped & Experience */}
              <div className="hud-micro-pill" tabIndex={0}>
                <div className="hud-micro-pill-header">
                  <strong style={{ fontSize: '0.80rem', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                    12+ Apps
                  </strong>
                  <span style={{ color: 'var(--border-strong)', fontSize: '0.75rem' }}>•</span>
                  <strong style={{ fontSize: '0.80rem', color: 'var(--accent-warm)', fontFamily: 'var(--font-mono)' }}>
                    5+ Yrs
                  </strong>
                </div>
                <div className="hud-micro-details">
                  <p style={{ fontSize: '0.70rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.35 }}>
                    High-concurrency systems deployed into production environments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. Centered Action Bar (Bottom CTAs) ────────────────── */}
          <div ref={ctaRef} className="imax-hero-ctas" style={{ pointerEvents: 'none' }}>
            <a
              href="#services"
              className="btn btn-dark"
              id="hero-cta-explore"
              style={{
                padding: '12px 26px',
                fontSize: '0.88rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                pointerEvents: 'auto',
              }}
            >
              <FiEye size={15} /> Explore Work ↓
            </a>
            <Link
              href="/contact"
              className="btn btn-outline"
              id="hero-cta-contact"
              style={{
                padding: '12px 26px',
                fontSize: '0.88rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                pointerEvents: 'auto',
              }}
            >
              <FiBriefcase size={15} /> Direct Inquiry ↗
            </Link>
            <Link
              href="/ai-chat"
              className="btn btn-outline"
              id="hero-cta-ai"
              style={{
                padding: '12px 22px',
                fontSize: '0.88rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderColor: 'var(--accent)',
                color: 'var(--accent-light)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                pointerEvents: 'auto',
              }}
            >
              <FiMessageSquare size={15} /> Talk to Chirag AI ⚡
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ██  POPULAR SERVICES
          ══════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ backgroundColor: 'var(--bg-2)' }}>
        <div className="container">
          <ScrollReveal>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '48px',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div>
                <div className="section-label">What I Do</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', letterSpacing: '-0.03em' }}>
                  Popular Services
                </h2>
              </div>
              <Link
                href="/services"
                className="btn btn-outline"
                id="view-all-services"
                style={{ fontSize: '0.82rem' }}
              >
                All Services <FiArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger direction="up">
            <div className="services-grid">
              {services.map(({ image, label, desc }, idx) => {
                const types: ('web' | 'mobile' | 'uiux' | 'backend' | 'wordpress')[] = [
                  'web',
                  'mobile',
                  'uiux',
                  'backend',
                  'wordpress',
                ];
                const cardType = types[idx % types.length];

                if (USE_MODERN_CARDS) {
                  return (
                    <ModernServiceCard
                      key={label}
                      label={label}
                      desc={desc}
                      type={cardType}
                    />
                  );
                }

                return (
                  <div
                    key={label}
                    className="service-card"
                    id={`service-${label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '4 / 3',
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src={image}
                        alt={label}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="service-card-overlay">
                      <h3
                        style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          marginBottom: '4px',
                          color: '#FFFFFF',
                        }}
                      >
                        {label}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.78rem',
                          color: 'rgba(255,255,255,0.8)',
                          lineHeight: 1.4,
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ██  FIND OUTSTANDING WORKMANSHIP (Dark Section)
          ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--bg-dark)',
          padding: '100px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <ScrollReveal>
            <div className="workmanship-grid">
              <div style={{ maxWidth: '520px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-light)',
                    marginBottom: '16px',
                  }}
                >
                  My Vision
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.15,
                    marginBottom: '24px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Find Outstanding
                  <br />
                  Workmanship.
                </h2>
                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    color: 'rgba(255, 255, 255, 0.65)',
                    marginBottom: '32px',
                    maxWidth: '440px',
                  }}
                >
                  I believe every project deserves meticulous attention to detail. From architecture design
                  to the final pixel, I ensure every solution is crafted with precision, scalability, and
                  the end user in mind.
                </p>
                <Link
                  href="/projects"
                  className="btn"
                  style={{
                    background: 'var(--accent)',
                    color: '#FFFFFF',
                    padding: '12px 28px',
                    borderRadius: '9999px',
                  }}
                >
                  See My Work <FiArrowUpRight size={16} />
                </Link>
              </div>

              <div
                className="workmanship-image"
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  aspectRatio: '4 / 3',
                  maxWidth: '480px',
                  width: '100%',
                }}
              >
                <Image
                  src="/images/workmanship_image.png"
                  alt="Outstanding workmanship — developer at work"
                  fill
                  sizes="(max-width: 992px) 100vw, 480px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ██  WHY CHOOSE ME?
          ══════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div className="section-label" style={{ justifyContent: 'center' }}>
                Benefits
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  letterSpacing: '-0.03em',
                  marginBottom: '12px',
                }}
              >
                Why Choose Me?
              </h2>
              <p style={{ maxWidth: '500px', margin: '0 auto' }}>
                Combining technical expertise with a passion for building products that truly matter.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger direction="up">
            <div className="why-grid">
              {whyChooseMe.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="why-card" id={`why-${title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: 'var(--accent-soft)',
                      border: '1px solid rgba(143, 188, 143, 0.20)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '18px',
                    }}
                  >
                    <Icon size={22} color="var(--accent-hover)" />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '8px', fontWeight: 600 }}>{title}</h3>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.65 }}>{desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ██  AI VISION & SHIPPING (Light Section)
          ══════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ backgroundColor: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <ScrollReveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.25fr',
                gap: '64px',
                alignItems: 'start',
              }}
              className="ai-vision-grid"
            >
              {/* Left Column: Quote & CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                  }}
                >
                  ABOUT
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    lineHeight: 1.08,
                    letterSpacing: '-0.03em',
                  }}
                >
                  “AI is not the future.
                  <br />
                  <span style={{
                    background: 'linear-gradient(135deg, var(--accent-hover) 0%, var(--accent) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    I&apos;m shipping it
                    <br />
                    today.
                  </span>”
                </h2>
                <div style={{ marginTop: '12px' }}>
                  <Link
                    href="/about"
                    className="btn btn-dark"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 28px',
                      borderRadius: '9999px',
                      fontWeight: 600,
                    }}
                  >
                    Learn More <FiArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Paragraphs with Accent Divider */}
              <div
                className="ai-vision-content"
                style={{
                  borderLeft: '2.5px solid var(--accent)',
                  paddingLeft: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  marginTop: '10px',
                }}
              >
                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    color: 'var(--text-secondary)',
                  }}
                >
                  I am <strong>Chirag</strong>. I operate at the intersection of AI product engineering, robust systems architecture, and modern full-stack development.
                </p>
                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    color: 'var(--text-secondary)',
                  }}
                >
                  As a <span style={{ color: 'var(--accent)', fontWeight: 700 }}>builder</span>, I ship conversational AI products—chat interfaces, task managers, and scheduling copilots. As a <span style={{ color: '#E57373', fontWeight: 700 }}>researcher</span>, I break systems to make them stronger.
                </p>
                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    color: 'var(--text-secondary)',
                  }}
                >
                  The custom AI assistant you see on this site? I built it with <strong>Gemini 2.5 Flash</strong>. That&apos;s not a demo—it&apos;s the product.
                </p>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(1.15rem, 3vw, 1.4rem)',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    marginTop: '16px',
                    lineHeight: 1.3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-primary)' }} />
                    Build AI.
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-hover)' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-hover)' }} />
                    Ship Fast.
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#E57373' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E57373' }} />
                    Secure Everything.
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ██  TESTIMONIALS
          ══════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          <ScrollReveal>
            <div
              className="testimonial-section"
              style={{
                display: 'grid',
                padding: '0',
              }}
            >
              <div className="testimonial-inner">
                {/* Left: heading + image */}
                <div className="testimonial-left">
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      fontWeight: 800,
                      lineHeight: 1.15,
                      marginBottom: '32px',
                      color: '#FFFFFF',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    What My
                    <br />
                    Clients Say
                  </div>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      maxWidth: '280px',
                      aspectRatio: '1',
                      borderRadius: '20px',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={testimonials[0].avatar}
                      alt={testimonials[0].name}
                      fill
                      sizes="280px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>

                {/* Right: quote */}
                <div className="testimonial-right">
                  <div
                    style={{
                      fontSize: '3rem',
                      lineHeight: 1,
                      color: 'var(--accent-light)',
                      marginBottom: '16px',
                      fontFamily: 'var(--font-serif)',
                    }}
                  >
                    &ldquo;
                  </div>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                      lineHeight: 1.8,
                      color: 'rgba(255, 255, 255, 0.80)',
                      marginBottom: '32px',
                    }}
                  >
                    {testimonials[0].quote}
                  </p>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: '#FFFFFF',
                        fontSize: '1rem',
                        marginBottom: '4px',
                      }}
                    >
                      — {testimonials[0].name}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.50)' }}>
                      {testimonials[0].role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ██  EXPERIENCED FREELANCER CTA
          ══════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ backgroundColor: 'var(--bg)', paddingBottom: '96px' }}>
        <div className="container">
          <ScrollReveal>
            <div className="cta-grid">
              {/* Left: image */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  aspectRatio: '4 / 3',
                  maxWidth: '480px',
                  width: '100%',
                }}
              >
                <Image
                  src="/images/cta_freelancer.png"
                  alt="Experienced freelance developer"
                  fill
                  sizes="(max-width: 992px) 100vw, 480px"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Right: text */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    marginBottom: '20px',
                    letterSpacing: '-0.03em',
                  }}
                >
                  Experienced
                  <br />
                  Freelancer
                </h2>
                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    color: 'var(--text-secondary)',
                    marginBottom: '28px',
                    maxWidth: '400px',
                  }}
                >
                  Ready to bring your ideas to life? Let&apos;s collaborate on your next project
                  and build something remarkable together.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <a
                    href={siteConfig.mailto}
                    className="btn btn-dark"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <FiMail size={16} />
                    {siteConfig.email}
                  </a>
                  <Link href="/contact" className="btn btn-outline">
                    Book a Call <FiArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Page-specific styles ──────────────────────────────────── */}
      <style jsx global>{`
        /* ── Services Grid ─────────────────────── */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        /* ── Workmanship Grid ──────────────────── */
        .workmanship-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        /* ── Why Grid ──────────────────────────── */
        .why-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        /* ── Testimonial Inner ─────────────────── */
        .testimonial-inner {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 0;
        }

        .testimonial-left {
          padding: 56px 40px;
          display: flex;
          flex-direction: column;
        }

        .testimonial-right {
          padding: 56px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* ── CTA Grid ──────────────────────────── */
        .cta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
        }

        @media (max-width: 1200px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 992px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .workmanship-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .workmanship-image {
            max-width: 100% !important;
          }
          .why-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .testimonial-inner {
            grid-template-columns: 1fr;
          }
          .testimonial-right {
            border-left: none;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }
          .cta-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .ai-vision-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .ai-vision-content {
            border-left: none !important;
            border-top: 2.5px solid var(--accent) !important;
            padding-left: 0 !important;
            padding-top: 24px !important;
          }
        }

        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          .why-grid {
            grid-template-columns: 1fr;
          }
          .testimonial-left,
          .testimonial-right {
            padding: 28px 20px;
          }
          .hero-display-text {
            font-size: clamp(2rem, 8vw, 2.8rem) !important;
          }
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }
      `}</style>
    </>
  );
}
