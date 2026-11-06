'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheckCircle,
  FiGlobe,
  FiSmartphone,
  FiLayers,
  FiCode,
  FiZap,
  FiMail,
  FiGrid,
} from 'react-icons/fi';
import ScrollReveal from '@/components/ScrollReveal';
import { siteConfig } from '@/config/site';

gsap.registerPlugin(ScrollTrigger);

const serviceCategories = ['All Services', 'Web & SaaS', 'Mobile Apps', 'WordPress & CMS', 'Backend & APIs', 'UI/UX Design'];

const servicesList = [
  {
    id: 'web-saas',
    name: 'Full-Stack Web & SaaS Development',
    category: 'Web & SaaS',
    image: '/images/service_webdev.png',
    badge: 'Core Expertise',
    desc: 'End-to-end web applications engineered with Next.js 16 and React 19 — from conversion-focused platforms to complex multi-tenant SaaS dashboards.',
    deliverables: [
      'Single Page Apps (SPA) & Server-Side Rendered (SSR) systems',
      'Custom admin dashboards, analytics, & customer portals',
      'Scalable database schemas (PostgreSQL, MongoDB, Prisma ORM)',
      'SEO & performance optimization with 95+ Lighthouse scores',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    id: 'mobile-apps',
    name: 'Cross-Platform Mobile Applications',
    category: 'Mobile Apps',
    image: '/images/service_mobile.png',
    badge: 'iOS & Android',
    desc: 'Native-performing cross-platform mobile apps built with React Native. Delivering single-codebase velocity with true native user experience.',
    deliverables: [
      'Single codebase deployment for both iOS & Android',
      'Offline-first data syncing & local device caching',
      'Push notification pipelines & biometric authentication',
      'App Store & Google Play Store release management',
    ],
    stack: ['React Native', 'TypeScript', 'Redux / Context API', 'REST APIs', 'AsyncStorage'],
  },
  {
    id: 'wordpress-cms',
    name: 'Custom WordPress & CMS Development',
    category: 'WordPress & CMS',
    image: '/images/service_wordpress_v2.png',
    badge: 'Speed & E-Commerce',
    desc: 'Custom WordPress themes, Elementor/Gutenberg page builders, WooCommerce online stores, and 100/100 PageSpeed optimization tailored to your brand.',
    deliverables: [
      'Custom PHP & Gutenberg block theme development from scratch',
      'WooCommerce payment gateway, product grid & checkout pipelines',
      'Core Web Vitals & 100% PageSpeed performance optimization',
      'Security hardening, SEO schema setup, & automated backups',
    ],
    stack: ['WordPress', 'WooCommerce', 'PHP', 'Gutenberg', 'MySQL', 'Elementor'],
  },
  {
    id: 'ui-ux-frontend',
    name: 'UI/UX Design & High-End Frontend',
    category: 'UI/UX Design',
    image: '/images/service_uiux.png',
    badge: 'High-Fashion Aesthetics',
    desc: 'Transforming complex product ideas into intuitive, high-value interfaces with fluid micro-interactions, responsive grids, and brand authority.',
    deliverables: [
      'Interactive wireframing & component design system creation',
      'Fluid GSAP animation sequences & scroll-triggered reveal FX',
      'Responsive mobile-first layouts across all screen resolutions',
      'Accessibility (a11y) compliance & typography fine-tuning',
    ],
    stack: ['Figma', 'GSAP', 'Tailwind CSS v4', 'Framer Motion', 'CSS Variables'],
  },
  {
    id: 'backend-apis',
    name: 'Backend Services & API Architecture',
    category: 'Backend & APIs',
    image: '/images/service_backend.png',
    badge: 'Scalable Infrastructure',
    desc: 'Production-ready backend services powered by Express.js and Node.js — supporting RESTful APIs, Twilio VoIP/SMS webhooks, and secure authentication pipelines.',
    deliverables: [
      'RESTful API architecture & middleware pipeline design',
      'Twilio / Grasshopper webhook integration for voice & SMS routing',
      'JWT & OAuth2 authentication with role-based access control (RBAC)',
      'Database ORM integrations & real-time webhook event processing',
    ],
    stack: ['Node.js', 'Express', 'Twilio Webhooks', 'MongoDB', 'PostgreSQL', 'OAuth2'],
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    desc: 'Deep-dive into your vision, target users, technical requirements, and core business objectives.',
  },
  {
    step: '02',
    title: 'Architecture & System Design',
    desc: 'Designing type-safe database schemas, API contracts, component architecture, and UI wireframes.',
  },
  {
    step: '03',
    title: 'Agile Execution & Demos',
    desc: 'Iterative development sprints with continuous staging deployments, progress demos, and feedback loops.',
  },
  {
    step: '04',
    title: 'Launch & Optimization',
    desc: 'Rigorous production testing, deployment to Vercel/cloud, performance tuning, and post-launch handoff.',
  },
];

const categoryIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  'All Services': FiGrid,
  'Web & SaaS': FiGlobe,
  'Mobile Apps': FiSmartphone,
  'WordPress & CMS': FiLayers,
  'Backend & APIs': FiCode,
  'UI/UX Design': FiZap,
};

export default function ServicesClient() {
  const [activeCategory, setActiveCategory] = useState('All Services');

  useEffect(() => {
    // Recalculate GSAP ScrollTrigger trigger positions after layout shifts caused by filtering
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const getCategoryCount = (category: string) => {
    if (category === 'All Services') return servicesList.length;
    return servicesList.filter((s) => s.category === category).length;
  };

  const filteredServices =
    activeCategory === 'All Services'
      ? servicesList
      : servicesList.filter((s) => s.category === activeCategory);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          ██  HERO HEADER
          ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--bg)',
          padding: '64px 0 52px',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
          background: 'radial-gradient(circle at 90% 10%, rgba(59, 130, 246, 0.04) 0%, transparent 50%), var(--bg)',
        }}
      >
        <div className="container">
          <ScrollReveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span className="section-label" style={{ margin: 0 }}>
                Expertise &amp; Capabilities
              </span>
              <span
                className="chip-accent chip"
                style={{ fontSize: '0.72rem', padding: '3px 12px' }}
              >
                Full-Stack &amp; Product Engineering
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                maxWidth: '800px',
                marginBottom: '20px',
                color: 'var(--text-primary)',
              }}
            >
              Bespoke Digital Services &amp;<br />
              <span className="gradient-text">Full-Stack Craft.</span>
            </h1>

            <p
              style={{
                maxWidth: '640px',
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                marginBottom: '32px',
              }}
            >
              From initial product architecture to final production deployment — I partner with clients to build fast, scalable, and visually captivating software.
            </p>

            {/* Pill-styled Category Filters */}
            <div className="scroll-x-touch" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              {serviceCategories.map((cat) => {
                const isActive = activeCategory === cat;
                const IconComponent = categoryIcons[cat] || FiGrid;

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: isActive ? '#1A1A1A' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                      border: isActive ? '1.5px solid #1A1A1A' : '1.5px solid var(--border)',
                      padding: '8px 18px',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                      transition: 'all 0.2s ease',
                      gap: '8px',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    <IconComponent size={14} />
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ██  VISUAL SERVICES GRID
          ══════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ backgroundColor: 'var(--bg-2)' }}>
        <div className="container">
          <ScrollReveal key={activeCategory} stagger direction="up">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '32px',
              }}
              className="services-showcase-grid"
            >
              {filteredServices.map((service) => (
                <div key={service.id} className="service-visual-card">
                  {/* Thumbnail Image Header */}
                  <div className="service-image-header">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      sizes="(max-width: 992px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'rgba(255, 255, 255, 0.90)',
                        backdropFilter: 'blur(12px)',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {service.badge}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        marginBottom: '12px',
                        color: 'var(--text-primary)',
                        lineHeight: 1.2,
                      }}
                    >
                      {service.name}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.92rem',
                        lineHeight: 1.7,
                        color: 'var(--text-secondary)',
                        marginBottom: '24px',
                      }}
                    >
                      {service.desc}
                    </p>

                    {/* Deliverables List */}
                    <div style={{ marginBottom: '28px', marginTop: 'auto' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--text-muted)',
                          marginBottom: '12px',
                        }}
                      >
                        Key Deliverables
                      </div>
                      <ul
                        style={{
                          listStyle: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                        }}
                      >
                        {service.deliverables.map((item) => (
                          <li
                            key={item}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '10px',
                              fontSize: '0.85rem',
                              color: 'var(--text-primary)',
                              lineHeight: 1.5,
                            }}
                          >
                            <FiCheckCircle
                              size={15}
                              color="var(--accent-hover)"
                              style={{ marginTop: '2px', flexShrink: 0 }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables Tech Pills */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        marginBottom: '24px',
                      }}
                    >
                      {service.stack.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            fontSize: '0.72rem',
                            fontFamily: 'var(--font-mono)',
                            background: 'var(--bg-3)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Link
                      href="/contact"
                      className="btn btn-outline"
                      style={{ alignSelf: 'flex-start', fontSize: '0.82rem' }}
                    >
                      Inquire Service <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ██  PROCESS SECTION (Dark Editorial `#1A1A1A`)
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
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 56px' }}>
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
                Workflow Strategy
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
                My 4-Step Engineering Process
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger direction="up">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '20px',
              }}
              className="process-grid"
            >
              {processSteps.map(({ step, title, desc }) => (
                <div key={step} className="process-step-card">
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: 'var(--accent-light)',
                      lineHeight: 1,
                      marginBottom: '16px',
                    }}
                  >
                    {step}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      marginBottom: '10px',
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      lineHeight: 1.65,
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
          ██  DARK EDITORIAL CTA
          ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--bg-dark)',
          padding: '80px 0 100px',
          color: '#FFFFFF',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
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
                Let&apos;s Build Together
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
                Ready to Build Something
                <br />
                Exceptional Together?
              </h2>

              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.70)',
                  marginBottom: '36px',
                }}
              >
                Looking for a full-stack developer to architect your Web app, SaaS platform, or mobile app? Let&apos;s talk.
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
        @media (max-width: 992px) {
          .hero-split-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 860px) {
          .services-showcase-grid {
            grid-template-columns: 1fr !important;
          }
          .process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
          .scroll-x-touch {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            padding-bottom: 8px !important;
          }
        }
      `}</style>
    </>
  );
}
