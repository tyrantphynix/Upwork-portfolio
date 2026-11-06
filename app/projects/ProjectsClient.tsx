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
  FiPhoneCall,
  FiGlobe,
  FiSmartphone,
  FiCpu,
  FiMail,
  FiGrid,
  FiLayers,
  FiCloud,
  FiMonitor,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import ScrollReveal from '@/components/ScrollReveal';
import { siteConfig } from '@/config/site';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Full-Stack', 'SaaS Platform', 'Web Application', 'AI Tools'];

const projects = [
  {
    id: 'yau-crm',
    num: '01',
    name: 'YAU CRM',
    category: 'Full-Stack',
    tag: 'Full-Stack + Twilio',
    images: [
      '/images/yau_crm_1.png',
      '/images/yau_crm_2.png',
      '/images/project_yaucrm.png'
    ],
    metric: 'Twilio VoIP · Webhooks · 50k+ Calls/mo',
    description:
      'A full-featured Customer Relationship Management platform built with deep Twilio / Grasshopper integration. Supports inbound call routing via webhooks, automated SMS pipelines, contact management, and deal tracking — replacing legacy communication silos with a single unified workspace.',
    features: [
      'Twilio webhook integration for inbound call & SMS routing',
      'Grasshopper phone number management & call forwarding',
      'Contact & pipeline CRM dashboard with automated follow-ups',
      'Role-based access control (RBAC) & real-time activity feeds',
    ],
    stack: ['Next.js', 'Express', 'MongoDB', 'Twilio SDK', 'TypeScript', 'Webhooks'],
    status: 'In Production',
  },
  {
    id: 'leakassure',
    num: '02',
    name: 'LeakAssure',
    category: 'SaaS Platform',
    tag: 'SaaS Platform',
    images: [
      '/images/leakassure_1.png',
      '/images/project_leakassure.png',
      '/images/service_webdev.png'
    ],
    metric: 'Affiliate Engine · Real-time Tracking · OAuth2',
    description:
      'A complete SaaS web application platform offering professional leak detection services. Built as an end-to-end product experience — customers can schedule service bookings, track real-time technician job status, and earn commissions through a referral partner management portal.',
    features: [
      'Online service booking with real-time technician status tracking',
      'Affiliate & commission management system with payout dashboards',
      'Customer account portal & admin operations reporting',
      'Automated email notifications via OAuth2 Gmail integration',
    ],
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'REST API', 'OAuth2'],
    status: 'Live',
  },
  {
    id: 'hair-cabillo',
    num: '03',
    name: 'Hair Cabillo',
    category: 'Web Application',
    tag: 'Web Application',
    images: [
      '/images/haircabillo_1.png',
      '/images/project_haircabillo.png',
      '/images/service_mobile.png'
    ],
    metric: 'Booking Engine · E-Commerce Checkout · Mobile-First',
    description:
      'A modern web platform for premium hair care & beauty services. Features an online appointment scheduling engine, full product catalog showcase, customer profile management, and conversion-optimized checkout flow built with a mobile-first responsive architecture.',
    features: [
      'Appointment booking & automated scheduling system',
      'Product catalog & e-commerce checkout integration',
      'Customer profile history & inventory admin dashboard',
      'SEO-optimized pages designed for local business discovery',
    ],
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    status: 'In Development',
  },
  {
    id: 'ai-suite',
    num: '04',
    name: 'ZeroBot',
    category: 'AI Tools',
    tag: 'AI Tools',
    images: [
      '/images/aichat_1.png',
      '/images/project_aichat.png',
      '/images/service_backend.png'
    ],
    metric: 'LLM Integrations · Streaming API · Code Sandbox',
    description:
      'ZeroBot is an intelligent AI platform integrated with modern LLMs. Enables natural language interactions, real-time response streaming, code execution analysis, and custom contextual knowledge indexing for developers and teams.',
    features: [
      'Real-time streaming AI chat assistant with markdown formatting',
      'Contextual repository search & automated task execution',
      'Custom prompt management & multi-modal support',
      'High-performance client caching & responsive UI',
    ],
    stack: ['Next.js', 'TypeScript', 'OpenAI API', 'GSAP', 'Tailwind CSS'],
    status: 'Active Development',
  },
];

const categoryIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  All: FiGrid,
  'Full-Stack': FiLayers,
  'SaaS Platform': FiCloud,
  'Web Application': FiMonitor,
  'AI Tools': FiCpu,
};

const projectStats = [
  {
    value: '4',
    label: 'PRODUCTION CASE STUDIES',
    desc: 'End-to-End SaaS & Full-Stack Systems',
  },
  {
    value: '100%',
    label: 'PRODUCTION-READY',
    desc: 'Shipped & Scalable Clean Code',
  },
  {
    value: '12+',
    label: 'INTEGRATED CAPABILITIES',
    desc: 'Twilio, Webhooks & Cloud Architecture',
  },
];

interface ProjectCarouselProps {
  images: string[];
  name: string;
  metric: string;
}

function ProjectCarousel({ images, name, metric }: ProjectCarouselProps) {
  const N = images.length;
  // Create circular array: [Last, ...Original, First]
  const slides = [images[N - 1], ...images, images[0]];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitionDuration, setTransitionDuration] = useState('0.6s');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTransitionDuration('0.6s');
      setCurrentIndex((prev) => prev + 1);
    }, 12000);

    return () => clearInterval(timer);
  }, [N, isPaused]);

  // Handle transition end to snap back instantly without animation
  const handleTransitionEnd = () => {
    if (currentIndex >= N + 1) {
      setTransitionDuration('0s');
      setCurrentIndex(1);
    } else if (currentIndex <= 0) {
      setTransitionDuration('0s');
      setCurrentIndex(N);
    }
  };

  // Restore transition duration in a separate effect after snapping resets it to 0s
  useEffect(() => {
    if (transitionDuration === '0s') {
      const frame = requestAnimationFrame(() => {
        setTransitionDuration('0.6s');
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [transitionDuration]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTransitionDuration('0.6s');
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTransitionDuration('0.6s');
    setCurrentIndex((prev) => prev + 1);
  };

  // Map currentIndex to dot selection (0 to N-1)
  const activeDotIndex = (currentIndex - 1 + N) % N;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Horizontal Slider Track */}
      <div
        onTransitionEnd={handleTransitionEnd}
        style={{
          display: 'flex',
          width: `${slides.length * 100}%`,
          height: '100%',
          transform: `translateX(-${(currentIndex * 100) / slides.length}%)`,
          transition: transitionDuration ? `transform ${transitionDuration} cubic-bezier(0.25, 1, 0.5, 1)` : 'none',
        }}
      >
        {slides.map((img, idx) => (
          <div
            key={`${img}-${idx}`}
            style={{
              position: 'relative',
              width: `${100 / slides.length}%`,
              height: '100%',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            <Image
              src={img}
              alt={`${name} mockup slide ${idx}`}
              fill
              sizes="(max-width: 992px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              priority={idx === 1}
            />
          </div>
        ))}
      </div>

      {/* Manual Slide Navigation Arrows (visible on hover) */}
      <button
        onClick={handlePrev}
        style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: `translateY(-50%) scale(${isPaused ? 1 : 0.85})`,
          zIndex: 5,
          background: 'rgba(0, 0, 0, 0.45)',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '50%',
          width: '34px',
          height: '34px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(6px)',
          transition: 'all 0.25s ease-in-out',
          opacity: isPaused ? 1 : 0,
          pointerEvents: isPaused ? 'auto' : 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
        aria-label="Previous slide"
      >
        <FiChevronLeft size={20} />
      </button>

      <button
        onClick={handleNext}
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: `translateY(-50%) scale(${isPaused ? 1 : 0.85})`,
          zIndex: 5,
          background: 'rgba(0, 0, 0, 0.45)',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '50%',
          width: '34px',
          height: '34px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(6px)',
          transition: 'all 0.25s ease-in-out',
          opacity: isPaused ? 1 : 0,
          pointerEvents: isPaused ? 'auto' : 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
        aria-label="Next slide"
      >
        <FiChevronRight size={20} />
      </button>

      {/* Unified Bottom Row (Metric Pill on Left, Auto-slide Dots on Right) */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          right: '16px',
          zIndex: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Metric Pill */}
        <div className="project-metric-pill" style={{ margin: 0, backdropFilter: 'blur(8px)' }}>
          <span style={{ color: 'var(--accent-hover)', fontWeight: 700 }}>●</span>
          {metric}
        </div>

        {/* Slide Indicators */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            background: 'rgba(0, 0, 0, 0.35)',
            padding: '6px 10px',
            borderRadius: '9999px',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            flexShrink: 0,
          }}
        >
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setTransitionDuration('0.6s');
                setCurrentIndex(idx + 1);
              }}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: idx === activeDotIndex ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsClient() {
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    // Recalculate GSAP ScrollTrigger trigger positions after layout shifts caused by filtering
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const getCategoryCount = (category: string) => {
    if (category === 'All') return projects.length;
    return projects.filter((p) => p.category === category).length;
  };

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
            {/* 2-Column Split Grid */}
            <div className="hero-split-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '48px', alignItems: 'center', marginBottom: '36px' }}>

              {/* Left Column: Copy */}
              <div>
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  CURATED CASE STUDIES
                </div>

                <h1
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    marginBottom: '12px',
                    color: 'var(--text-primary)',
                  }}
                >
                  Proof of Capability &amp;<br />
                  <span className="gradient-text">Shipped Products.</span>
                </h1>

                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.75,
                    color: 'var(--text-secondary)',
                    margin: 0,
                  }}
                >
                  Explore featured projects built from scratch — from real-time CRM platforms and SaaS engines to modern web and AI applications.
                </p>
              </div>

              {/* Right Column: Luxury Stat Cards Stack */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {projectStats.map(({ value, label, desc }, i) => (
                  <div key={label} className="about-stat-card-v" style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="about-stat-card-v__accent" />
                    <div className="about-stat-card-v__body" style={{ padding: '14px 18px' }}>
                      <div
                        style={{
                          fontSize: '1.6rem',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          lineHeight: 1.1,
                          marginBottom: '2px',
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
                          marginBottom: '3px',
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.4,
                        }}
                      >
                        {desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Pill-styled Category Filters */}
            <div className="scroll-x-touch" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              {categories.map((cat) => {
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
          ██  PROJECTS SHOWCASE LIST
          ══════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ backgroundColor: 'var(--bg-2)' }}>
        <div className="container">
          <div key={activeCategory} style={{ display: 'flex', flexDirection: 'column', gap: '96px' }}>
            {filteredProjects.map((p, i) => {
              const isEven = i % 2 === 0;
              return (
                <ScrollReveal key={p.id} direction="up" delay={0.1}>
                  <div
                    id={p.id}
                    className="project-row-grid"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                      gap: '56px',
                      alignItems: 'center',
                    }}
                  >
                    {/* Visual Mockup Container */}
                    <div
                      className="project-mockup-card"
                      style={{ order: isEven ? 1 : 2 }}
                    >
                      <div className="project-mockup-image-wrap">
                        <ProjectCarousel
                          images={p.images}
                          name={p.name}
                          metric={p.metric}
                        />
                      </div>
                    </div>

                    {/* Project Info Column */}
                    <div style={{ order: isEven ? 2 : 1 }}>
                      {/* Number & Category Tags */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '16px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: 'var(--text-muted)',
                          }}
                        >
                          {p.num}
                        </span>
                        <span className="chip">{p.tag}</span>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--text-secondary)',
                            background: 'var(--bg-3)',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            border: '1px solid var(--border)',
                          }}
                        >
                          ● {p.status}
                        </span>
                      </div>

                      {/* Project Name */}
                      <h2
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                          fontWeight: 700,
                          lineHeight: 1.1,
                          marginBottom: '16px',
                          color: 'var(--text-primary)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {p.name}
                      </h2>

                      {/* Description */}
                      <p
                        style={{
                          marginBottom: '24px',
                          lineHeight: 1.75,
                          fontSize: '0.95rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {p.description}
                      </p>

                      {/* Key Features List */}
                      <div style={{ marginBottom: '28px' }}>
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--text-muted)',
                            marginBottom: '14px',
                          }}
                        >
                          Key Technical Highlights
                        </div>
                        <ul
                          style={{
                            listStyle: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                          }}
                        >
                          {p.features.map((f) => (
                            <li
                              key={f}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '10px',
                                fontSize: '0.88rem',
                                color: 'var(--text-primary)',
                                lineHeight: 1.5,
                              }}
                            >
                              <FiCheckCircle
                                size={16}
                                color="var(--accent-hover)"
                                style={{ marginTop: '2px', flexShrink: 0 }}
                              />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack Chips */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '8px',
                          marginBottom: '32px',
                        }}
                      >
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            style={{
                              padding: '4px 12px',
                              borderRadius: '9999px',
                              fontSize: '0.75rem',
                              fontFamily: 'var(--font-mono)',
                              background: 'var(--bg-3)',
                              border: '1px solid var(--border)',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* CTA Buttons */}
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Link
                          href="/contact"
                          className="btn btn-dark"
                          id={`project-${p.id}-contact-cta`}
                        >
                          Discuss Project <FiArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
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
                Have a Custom Product or
                <br />
                SaaS Project in Mind?
              </h2>

              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.70)',
                  marginBottom: '36px',
                }}
              >
                Whether you need a full-stack platform, custom CRM, or modern web application — I deliver production-ready code built to scale.
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
          .project-row-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .project-mockup-card {
            order: -1 !important;
          }
        }
        @media (max-width: 640px) {
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
