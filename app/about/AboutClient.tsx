'use client';


import Link from 'next/link';
import {
  FiGlobe,
  FiSmartphone,
  FiZap,
  FiArrowRight,
  FiArrowUpRight,
  FiCheckCircle,
  FiCode,
  FiLayers,
  FiDatabase,
  FiCpu,
  FiShield,
  FiUsers,
  FiMail,
  FiTrendingUp,
} from 'react-icons/fi';
import {
  SiReact,
  SiNextdotjs,
  SiExpress,
  SiTypescript,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiTailwindcss,
  SiSupabase,
  SiWordpress,
} from 'react-icons/si';
import ScrollReveal from '@/components/ScrollReveal';
import { siteConfig } from '@/config/site';

const highlightCards = [
  {
    value: '5+',
    label: 'YEARS BUILDING',
    desc: 'Full-Stack & Web Architecture',
  },
  {
    value: 'SaaS & CRM',
    label: 'SPECIALIST',
    desc: 'Production-Grade Systems',
  },
  {
    value: 'Next.js & AI',
    label: 'CORE ECOSYSTEM',
    desc: 'Intelligent Applications',
  },
  {
    value: '100%',
    label: 'DIRECT COMMITMENT',
    desc: 'Quality, Speed & Scale',
  },
];

const principles = [
  {
    icon: FiCpu,
    title: 'Production-Grade Architecture',
    desc: 'Building type-safe, maintainable TypeScript and Next.js applications engineered to scale effortlessly under real-world load.',
  },
  {
    icon: FiUsers,
    title: 'Client-Centric Collaboration',
    desc: 'Clear communication, rapid prototyping, and transparent progress updates throughout every single development sprint.',
  },
  {
    icon: FiLayers,
    title: 'Full-Stack Execution',
    desc: 'Seamless end-to-end delivery — from REST APIs, webhooks, and database schemas to conversion-optimized user interfaces.',
  },
];

const techCategories = [
  {
    title: 'Frontend Mastery',
    icon: FiGlobe,
    items: [
      { name: 'Next.js 16', desc: 'App Router & Server Components', icon: SiNextdotjs },
      { name: 'React 19', desc: 'Component Architecture & State', icon: SiReact },
      { name: 'TypeScript', desc: 'Type-safe Codebases at Scale', icon: SiTypescript },
      { name: 'Tailwind CSS v4', desc: 'Utility & Custom Design Systems', icon: SiTailwindcss },
    ],
  },
  {
    title: 'Backend & Integrations',
    icon: FiCode,
    items: [
      { name: 'Node.js & Express', desc: 'RESTful APIs & Middleware', icon: SiExpress },
      { name: 'Twilio & Webhooks', desc: 'Voice, SMS & Call Routing', icon: FiZap },
      { name: 'WordPress', desc: 'Headless CMS, Themes & Custom Backends', icon: SiWordpress },
      { name: 'JavaScript ES2025+', desc: 'Async & Core APIs', icon: SiJavascript },
      { name: 'Mobile Apps', desc: 'React Native Cross-Platform', icon: FiSmartphone },
    ],
  },
  {
    title: 'Databases & Infrastructure',
    icon: FiDatabase,
    items: [
      { name: 'PostgreSQL', desc: 'Relational Database Design', icon: SiPostgresql },
      { name: 'Supabase', desc: 'Database, Auth & Realtime Subscriptions', icon: SiSupabase },
      { name: 'MongoDB', desc: 'Document Data Store', icon: SiMongodb },
      { name: 'Prisma ORM', desc: 'Database Client & Migrations', icon: SiPrisma },
    ],
  },
];

const extraTools = [
  'Twilio / Grasshopper',
  'Webhook Pipelines',
  'OAuth2 / JWT Auth',
  'RESTful Architecture',
  'GSAP Animations',
  'Git / GitHub Actions',
  'Vercel Deployment',
];

const timeline = [
  {
    year: '2021',
    title: 'Foundations & Early Engineering',
    desc: 'Began building full-stack applications, mastering JavaScript fundamentals, async systems, and modern web architecture.',
    icon: FiCode,
  },
  {
    year: '2023',
    title: 'Full-Stack Mastery',
    desc: 'Built production web apps using React, Node.js, Express, and database integrations.',
    icon: FiLayers,
  },
  {
    year: '2024',
    title: 'Shipped LeakAssure SaaS',
    desc: 'Engineered and launched a complete SaaS platform featuring real-time tracking and affiliate commission portals.',
    icon: FiCpu,
  },
  {
    year: '2025',
    title: 'YAU CRM + Twilio Webhooks',
    desc: 'Architected a full CRM system integrated with Twilio and Grasshopper for automated voice/SMS communications.',
    icon: FiZap,
  },
  {
    year: '2026',
    title: 'Expanding Product Horizons 🚀',
    desc: 'Developing Hair Cabillo and engineering custom AI-integrated product platforms.',
    icon: FiTrendingUp,
  },
];

export default function AboutClient() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          ██  HERO BIO SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--bg)',
          minHeight: 'calc(100vh - var(--nav-height))',
          display: 'flex',
          alignItems: 'center',
          padding: '24px 0 32px',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <ScrollReveal>
            <div className="about-hero-grid">
              {/* Left Column: Story Bio */}
              <div>
                {/* Live Status Pill & Section Label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <div className="section-label" style={{ marginBottom: 0 }}>About Me</div>
                  <div className="about-status-pill">
                    <span className="about-status-dot-pulse" />
                    <span>Available for New Projects</span>
                  </div>
                </div>

                <h1
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.1rem, 4vw, 3.4rem)',
                    fontWeight: 700,
                    lineHeight: 1.08,
                    letterSpacing: '-0.02em',
                    marginBottom: '18px',
                    color: 'var(--text-primary)',
                  }}
                >
                  Engineering Products with
                  <br />
                  <span className="gradient-text">Purpose &amp; Craft.</span>
                </h1>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginBottom: '22px',
                    maxWidth: '580px',
                  }}
                >
                  <p
                    style={{
                      fontSize: 'clamp(0.92rem, 1.25vw, 1.02rem)',
                      lineHeight: 1.65,
                      color: 'var(--text-secondary)',
                      margin: 0,
                    }}
                  >
                    I&apos;m <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Chirag</strong> — a Full-Stack Engineer and Web Architect bridging high-impact visual aesthetics with robust, production-grade software.
                  </p>
                  <p
                    style={{
                      fontSize: 'clamp(0.88rem, 1.15vw, 0.95rem)',
                      lineHeight: 1.65,
                      color: 'var(--text-secondary)',
                      margin: 0,
                    }}
                  >
                    From engineering scalable <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>SaaS platforms</span> and automated <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Twilio CRM pipelines</span> to deploying intelligent <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>AI applications</span>, I turn ambitious concepts into enduring digital products.
                  </p>
                </div>

                {/* Mission Pillars */}
                <div className="about-mission-pillars">
                  <div className="mission-pillar">
                    <span className="mission-pillar-icon">🚀</span>
                    <span className="mission-pillar-text">Deploy Value</span>
                  </div>
                  <div className="mission-pillar-divider" />
                  <div className="mission-pillar">
                    <span className="mission-pillar-icon">⚡</span>
                    <span className="mission-pillar-text">Build Fast</span>
                  </div>
                  <div className="mission-pillar-divider" />
                  <div className="mission-pillar">
                    <span className="mission-pillar-icon">✦</span>
                    <span className="mission-pillar-text">Scale Cleanly</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="about-cta-row">
                  <Link href="/contact" className="btn btn-dark about-cta-primary" id="about-hire-btn">
                    Hire Me <FiArrowRight size={16} />
                  </Link>
                  <Link href="/projects" className="btn btn-outline about-cta-secondary" id="about-projects-btn">
                    View Projects <FiArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Vertical Highlight Stat Cards */}
              <div className="about-stats-col">
                {highlightCards.map(({ value, label, desc }, i) => (
                  <div key={label} className="about-stat-card-v" style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="about-stat-card-v__accent" />
                    <div className="about-stat-card-v__body">
                      <div
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1.45rem, 2.2vw, 1.9rem)',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          lineHeight: 1.1,
                          letterSpacing: '-0.03em',
                          marginBottom: '4px',
                        }}
                      >
                        {value}
                      </div>
                      <div
                        style={{
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          color: 'var(--accent-hover)',
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          marginBottom: '5px',
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.45,
                        }}
                      >
                        {desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ██  CORE PRINCIPLES (Dark Editorial Section)
          ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--bg-dark)',
          padding: '100px 0',
          color: '#FFFFFF',
          position: 'relative',
        }}
      >
        <div className="container">
          <ScrollReveal>
            <div style={{ marginBottom: '56px', textAlign: 'center', maxWidth: '600px', margin: '0 auto 56px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-light)',
                  marginBottom: '16px',
                }}
              >
                Engineering Philosophy
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                My Core Principles
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger direction="up">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
              }}
              className="principles-grid"
            >
              {principles.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="principle-card">
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: 'rgba(143, 188, 143, 0.15)',
                      border: '1px solid rgba(143, 188, 143, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <Icon size={22} color="var(--accent-light)" />
                  </div>
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      marginBottom: '10px',
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      lineHeight: 1.7,
                      color: 'rgba(255, 255, 255, 0.65)',
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ██  CATEGORIZED TECH STACK
          ══════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ backgroundColor: 'var(--bg-2)' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ marginBottom: '56px' }}>
              <div className="section-label">Tech Stack</div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                  letterSpacing: '-0.02em',
                  marginBottom: '12px',
                }}
              >
                Technologies &amp; Tools
              </h2>
              <p style={{ maxWidth: '500px', fontSize: '1rem' }}>
                Full-stack languages, frameworks, databases, and integrations used to deliver software.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger direction="up">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '32px',
              }}
              className="tech-category-grid"
            >
              {techCategories.map(({ title, icon: CatIcon, items }) => (
                <div
                  key={title}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '24px',
                    padding: '32px',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '24px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <CatIcon size={20} color="var(--accent-hover)" />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{title}</h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {items.map(({ name, desc, icon: ItemIcon }) => (
                      <div key={name} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                        <div
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '10px',
                            background: 'var(--bg-3)',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        >
                          <ItemIcon size={18} color="var(--text-primary)" />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {name}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Extra tools chips */}
          <ScrollReveal delay={0.2}>
            <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginBottom: '14px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Specialized Integrations &amp; Infrastructure
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {extraTools.map((tool) => (
                  <span
                    key={tool}
                    className="chip"
                    style={{
                      padding: '6px 14px',
                      fontSize: '0.8rem',
                      backgroundColor: 'var(--bg-3)',
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ██  JOURNEY TIMELINE
          ══════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="timeline-section-header">
              <div className="section-label" style={{ display: 'inline-block', marginBottom: '8px' }}>Trajectory</div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                  letterSpacing: '-0.02em',
                  margin: '0 auto',
                  maxWidth: '700px',
                }}
              >
                Development Milestone Journey
              </h2>
            </div>
          </ScrollReveal>

          <div className="timeline-container">
            {timeline.map((item, i) => {
              const isEven = i % 2 === 0;
              const IconComponent = item.icon;
              return (
                <ScrollReveal key={item.year} className="timeline-item" delay={i * 0.08}>
                  {/* Vertical Line Segment */}
                  {i < timeline.length - 1 && (
                    <div className="timeline-line-segment" />
                  )}

                  {/* Year Badge */}
                  <div className="timeline-badge-container">
                    <div className="timeline-badge">
                      {item.year}
                    </div>
                  </div>

                  {/* Left Column (only has card if even index) */}
                  <div className="timeline-col-left">
                    {isEven && (
                      <div className="timeline-card">
                        <div className="timeline-card-header">
                          <div className="timeline-card-title-group">
                            <div className="timeline-icon-wrapper">
                              <IconComponent style={{ width: '18px', height: '18px' }} />
                            </div>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                              {item.title}
                            </h3>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.65 }}>
                          {item.desc}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column (only has card if odd index) */}
                  <div className="timeline-col-right">
                    {!isEven && (
                      <div className="timeline-card">
                        <div className="timeline-card-header">
                          <div className="timeline-card-title-group">
                            <div className="timeline-icon-wrapper">
                              <IconComponent style={{ width: '18px', height: '18px' }} />
                            </div>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                              {item.title}
                            </h3>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.65 }}>
                          {item.desc}
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ██  DARK EDITORIAL CTA
          ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--bg-dark)',
          padding: '100px 0',
          color: '#FFFFFF',
        }}
      >
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-light)',
                  marginBottom: '16px',
                }}
              >
                Let&apos;s Connect
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: '#FFFFFF',
                  marginBottom: '20px',
                  letterSpacing: '-0.02em',
                }}
              >
                Ready to Bring Your
                <br />
                Vision to Life?
              </h2>

              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.70)',
                  marginBottom: '36px',
                }}
              >
                Looking for a full-stack developer to partner on your next product, SaaS platform, or CRM? Let&apos;s talk.
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '14px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <a
                  href={siteConfig.mailto}
                  className="btn"
                  style={{
                    background: 'var(--accent)',
                    color: '#FFFFFF',
                    padding: '12px 28px',
                    borderRadius: '9999px',
                    fontWeight: 600,
                  }}
                >
                  <FiMail size={16} />
                  {siteConfig.email}
                </a>

                <Link
                  href="/contact"
                  className="btn btn-outline-light"
                  style={{
                    padding: '12px 28px',
                  }}
                >
                  Book a Call <FiArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Page Responsive Styles ───────────────────────────────── */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          .principles-grid,
          .tech-category-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 768px) {
          .about-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .principles-grid,
          .tech-category-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .about-cta-row {
            flex-direction: row !important;
            flex-wrap: wrap !important;
          }
        }
        @media (max-width: 480px) {
          .about-cta-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .about-cta-row .btn {
            justify-content: center !important;
            width: 100% !important;
          }
        }
      `}</style>
    </>
  );
}
