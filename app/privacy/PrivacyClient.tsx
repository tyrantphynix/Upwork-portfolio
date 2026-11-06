'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiShield,
  FiLock,
  FiCheckCircle,
  FiMail,
  FiArrowUpRight,
  FiFileText,
  FiInfo,
} from 'react-icons/fi';
import ScrollReveal from '@/components/ScrollReveal';
import { siteConfig } from '@/config/site';

const sections = [
  {
    id: 'sec-01',
    num: '01',
    title: 'Introduction & Scope',
    content: (
      <>
        <p style={{ marginBottom: '14px' }}>
          Chirag Rawat (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your personal privacy and is committed to protecting your data through strict adherence to this Privacy Policy. This document outlines the types of information collected when you access our website (the &ldquo;Platform&rdquo;), engage with interactive services (such as AI Chat or Project Inquiries), and how we manage, protect, and process that information.
        </p>
        <p>
          By accessing or utilizing our Platform, you acknowledge the terms outlined in this Privacy Policy. If you do not agree with our policies, please refrain from using our services.
        </p>
      </>
    ),
  },
  {
    id: 'sec-02',
    num: '02',
    title: 'Information We Collect',
    content: (
      <>
        <p style={{ marginBottom: '16px' }}>
          We collect several categories of information to provide seamless freelance services, software products, and platform functionality:
        </p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>●</span>
            <span>
              <strong>Personal Contact Identifiers:</strong> Name, professional email address, telephone number, and company name submitted explicitly via our contact or project inquiry forms.
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>●</span>
            <span>
              <strong>Interactive Conversation Telemetry:</strong> Anonymized prompt text and interaction timestamps submitted via our AI Chat demonstration features.
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>●</span>
            <span>
              <strong>Technical Device Metadata:</strong> IP addresses, browser specifications, operating system versions, and referring URLs logged automatically for system diagnostics.
            </span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'sec-03',
    num: '03',
    title: 'Cookies & Analytical Tracking',
    content: (
      <>
        <p style={{ marginBottom: '14px' }}>
          Our website utilizes essential and performance-focused cookies to enhance session management, remember user preferences, and collect aggregated analytical metrics.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', margin: '20px 0' }} className="cookie-grid">
          <div style={{ background: 'var(--bg-3)', padding: '16px 20px', borderRadius: '14px', border: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>Essential Cookies</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Required for core site operation, secure navigation, and session continuity.</p>
          </div>
          <div style={{ background: 'var(--bg-3)', padding: '16px 20px', borderRadius: '14px', border: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>Performance &amp; Analytics</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Anonymous telemetry to monitor page speeds, traffic patterns, and user engagement.</p>
          </div>
        </div>
        <p>
          You may configure your web browser to reject or alert you regarding cookies. However, disabling essential cookies may impact certain interactive features of the Platform.
        </p>
      </>
    ),
  },
  {
    id: 'sec-04',
    num: '04',
    title: 'Data Protection & Security Architecture',
    content: (
      <>
        <p style={{ marginBottom: '14px' }}>
          We implement rigorous technical and organizational security measures to prevent unauthorized access, disclosure, modification, or destruction of your personal data:
        </p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, marginBottom: '16px' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
            <FiCheckCircle color="var(--accent)" size={16} />
            <span>256-bit SSL/TLS end-to-end transport encryption across all routes</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
            <FiCheckCircle color="var(--accent)" size={16} />
            <span>Strict zero-sale policy — your information is never sold to third parties</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
            <FiCheckCircle color="var(--accent)" size={16} />
            <span>Secure cloud infrastructure with automated threat monitoring</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'sec-05',
    num: '05',
    title: 'Your Privacy Rights (GDPR & CCPA)',
    content: (
      <>
        <p style={{ marginBottom: '14px' }}>
          Depending on your jurisdiction, you possess specific legal rights regarding your personal information:
        </p>
        <div style={{ background: 'rgba(143, 188, 143, 0.12)', border: '1px solid rgba(143, 188, 143, 0.30)', borderRadius: '16px', padding: '20px 24px' }}>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--text-primary)', margin: 0 }}>
            <strong>Your Rights:</strong> Right to access your stored data, right to request immediate correction or deletion, right to withdraw consent, and right to object to data processing. To exercise any of these rights, contact us directly at <a href={siteConfig.mailto} style={{ color: 'var(--accent-hover)', fontWeight: 600 }}>{siteConfig.email}</a>.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'sec-06',
    num: '06',
    title: 'Policy Updates & Contact',
    content: (
      <>
        <p style={{ marginBottom: '14px' }}>
          We reserve the right to revise this Privacy Policy periodically to reflect technological updates, legal requirements, or platform enhancements. Revisions take effect immediately upon publication.
        </p>
        <p>
          For questions, data access requests, or privacy concerns, reach out directly at <a href={siteConfig.mailto} style={{ color: 'var(--accent-hover)', fontWeight: 700 }}>{siteConfig.email}</a>.
        </p>
      </>
    ),
  },
];

export default function PrivacyClient() {
  const [activeId, setActiveId] = useState('sec-01');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveId(sec.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          ██  HERO HEADER
          ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--bg)',
          padding: '80px 0 56px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container">
          <ScrollReveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span className="section-label" style={{ margin: 0 }}>
                Legal &amp; Governance
              </span>
              <span className="chip-accent chip" style={{ fontSize: '0.72rem', padding: '3px 12px' }}>
                Data Protection
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                maxWidth: '750px',
                marginBottom: '20px',
                color: 'var(--text-primary)',
              }}
            >
              Privacy Policy &amp;
              <br />
              <span className="gradient-text">Data Rights.</span>
            </h1>

            {/* Version Metadata Chips */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
              }}
            >
              <span style={{ background: 'var(--bg-3)', padding: '6px 14px', borderRadius: '9999px', border: '1px solid var(--border)' }}>
                Effective: July 2026
              </span>
              <span style={{ background: 'var(--bg-3)', padding: '6px 14px', borderRadius: '9999px', border: '1px solid var(--border)' }}>
                Version 2.4
              </span>
              <span style={{ background: 'rgba(143, 188, 143, 0.15)', color: 'var(--text-primary)', padding: '6px 14px', borderRadius: '9999px', fontWeight: 600 }}>
                ● GDPR &amp; CCPA Compliant
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ██  2-COLUMN DOCUMENT LAYOUT (Sticky Sidebar + Cards)
          ══════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          <div className="legal-layout-grid">
            {/* Sticky Sidebar Navigation */}
            <aside className="legal-sticky-sidebar">
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '16px',
                  paddingLeft: '14px',
                }}
              >
                Table of Contents
              </div>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className={`legal-sidebar-link ${activeId === sec.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById(sec.id);
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.6 }}>
                      {sec.num}
                    </span>
                    <span>{sec.title}</span>
                  </a>
                ))}
              </nav>
            </aside>

            {/* Main Policy Cards Container */}
            <div className="legal-document-container">
              {sections.map((sec) => (
                <div key={sec.id} id={sec.id} className="legal-policy-card">
                  {/* Section Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      marginBottom: '20px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        background: '#1A1A1A',
                        padding: '5px 12px',
                        borderRadius: '9999px',
                      }}
                    >
                      ● {sec.num}
                    </span>
                    <h2
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.65rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        margin: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      {sec.title}
                    </h2>
                  </div>

                  <div
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: 1.8,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {sec.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
                Privacy Inquiries
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
                Questions Regarding
                <br />
                Your Data Privacy?
              </h2>

              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.70)',
                  marginBottom: '36px',
                }}
              >
                If you have questions about this policy or wish to request data erasure, reach out directly.
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
                  Contact Form <FiArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Responsive adjustments */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .cookie-grid {
            grid-template-columns: 1fr !important;
          }
          .legal-policy-card {
            padding: 24px 18px !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
    </>
  );
}
