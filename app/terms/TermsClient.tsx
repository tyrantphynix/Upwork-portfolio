'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiFileText,
  FiCheckCircle,
  FiMail,
  FiArrowUpRight,
  FiCode,
  FiShield,
} from 'react-icons/fi';
import ScrollReveal from '@/components/ScrollReveal';
import { siteConfig } from '@/config/site';

const sections = [
  {
    id: 'sec-01',
    num: '01',
    title: 'Acceptance of Terms',
    content: (
      <>
        <p style={{ marginBottom: '14px' }}>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of Chirag Rawat&apos;s website, software products, and freelance development services (collectively, the &ldquo;Services&rdquo;).
        </p>
        <p>
          By accessing our Platform, executing a freelance project proposal, or utilizing our interactive features (such as AI Chat), you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must immediately discontinue use of the Services.
        </p>
      </>
    ),
  },
  {
    id: 'sec-02',
    num: '02',
    title: 'Freelance Scope & Deliverables',
    content: (
      <>
        <p style={{ marginBottom: '16px' }}>
          When engaging Chirag Rawat for full-stack software development, UI/UX design, or mobile application construction, specific project deliverables and milestones are governed by a mutually agreed Statement of Work (SOW):
        </p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>●</span>
            <span>
              <strong>Agile Iteration &amp; Demos:</strong> Project progress is delivered in milestone sprints with live staging links for continuous client feedback.
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>●</span>
            <span>
              <strong>Change Requests:</strong> Substantial scope revisions outside the agreed SOW will be documented via a formal Change Order with updated cost and timeline estimates.
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>●</span>
            <span>
              <strong>Production Handoff:</strong> Final source code, repository transfers, and deployment setup occur upon completion of final milestone sign-off.
            </span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'sec-03',
    num: '03',
    title: 'Intellectual Property & Code Ownership',
    content: (
      <>
        <p style={{ marginBottom: '14px' }}>
          We respect full client ownership rights for custom software built under commercial contracts:
        </p>
        <div style={{ background: 'var(--accent-soft)', border: '1px solid var(--border-strong)', borderRadius: '16px', padding: '20px 24px', marginBottom: '16px' }}>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--text-primary)', margin: 0 }}>
            <strong>100% Client Ownership:</strong> Upon full payment of project fees, all custom source code, design files, trademarks, and intellectual property developed exclusively for the client transfer entirely to the client.
          </p>
        </div>
        <p>
          Chirag Rawat retains ownership of pre-existing core starter modules, reusable open-source utilities, and development frameworks integrated into the deliverables under MIT or permissive commercial licenses.
        </p>
      </>
    ),
  },
  {
    id: 'sec-04',
    num: '04',
    title: 'Payment Schedule & Retainers',
    content: (
      <>
        <p style={{ marginBottom: '14px' }}>
          Freelance engagements follow a transparent milestone or retainer schedule detailed in the project agreement:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', margin: '16px 0' }} className="payment-grid">
          <div style={{ background: 'var(--bg-3)', padding: '16px 20px', borderRadius: '14px', border: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>Fixed Milestone Projects</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>50% initial deposit required prior to project kickoff, 50% upon final production sign-off.</p>
          </div>
          <div style={{ background: 'var(--bg-3)', padding: '16px 20px', borderRadius: '14px', border: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>Monthly Retainers</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Billed upfront on the 1st of each month for dedicated development hours and maintenance.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'sec-05',
    num: '05',
    title: 'Platform Code & Open Source Utilities',
    content: (
      <>
        <p style={{ marginBottom: '14px' }}>
          Open-source repositories published by Chirag Rawat on GitHub are licensed under their respective repository licenses (typically MIT or Apache 2.0).
        </p>
        <p>
          You are free to fork, modify, and distribute open-source utilities provided you maintain appropriate copyright attribution as specified in each repository license.
        </p>
      </>
    ),
  },
  {
    id: 'sec-06',
    num: '06',
    title: 'Warranties & Limitation of Liability',
    content: (
      <>
        <p style={{ marginBottom: '14px' }}>
          Our services and public tools are provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis. While we maintain a 30-day post-launch bug fix guarantee for commercial client deliverables, we make no express warranties regarding third-party API availability or uninterrupted server hosting.
        </p>
        <p>
          In no event shall Chirag Rawat be liable for indirect, incidental, or consequential damages arising from the use or inability to use our software products or platform.
        </p>
      </>
    ),
  },
  {
    id: 'sec-07',
    num: '07',
    title: 'Governing Law & Amendments',
    content: (
      <>
        <p style={{ marginBottom: '14px' }}>
          These Terms shall be governed by and construed in accordance with the laws of India. Any legal disputes arising under these Terms shall be settled through friendly negotiation or binding arbitration.
        </p>
        <p>
          We reserve the right to amend these Terms at any time. Continued use of our Platform following revisions constitutes acceptance of the updated Terms.
        </p>
      </>
    ),
  },
];

export default function TermsClient() {
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
                Terms &amp; Agreements
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
              Terms of Service &amp;
              <br />
              <span className="gradient-text">Code Usage.</span>
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
                ● 100% IP Transfer Guarantee
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

            {/* Main Terms Cards Container */}
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
                Contractual Inquiries
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
                Terms or Agreements?
              </h2>

              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.70)',
                  marginBottom: '36px',
                }}
              >
                Have questions regarding a custom statement of work, retainer terms, or licensing? Reach out directly.
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

      {/* Responsive adjustments */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .payment-grid {
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
