'use client';

import Link from 'next/link';
import {
  FiGithub,
  FiUsers,
  FiHeart,
  FiStar,
  FiArrowRight,
  FiArrowUpRight,
  FiShare2,
  FiCode,
  FiGlobe,
  FiZap,
  FiShield,
  FiMail,
} from 'react-icons/fi';
import ScrollReveal from '@/components/ScrollReveal';
import { siteConfig } from '@/config/site';

const pillars = [
  {
    icon: FiGithub,
    title: 'Star & Fork Repositories',
    tag: 'Open Source',
    desc: 'Found a project or utility useful? Star the repository on GitHub. It increases visibility across the community and fuels continuous development.',
    cta: 'Visit GitHub Repos',
    href: siteConfig.socials.github.url,
    external: true,
  },
  {
    icon: FiShare2,
    title: 'Refer a Client / Partner',
    tag: 'Referral Bonus',
    desc: 'Know a founder or team in need of a full-stack developer? Introduce them to me. I offer a 10% referral partner bonus for every signed project.',
    cta: 'Refer a Project',
    href: '/contact',
    external: false,
  },
  {
    icon: FiUsers,
    title: 'Co-Build & Collaborate',
    tag: 'Joint Ventures',
    desc: 'Have a compelling product idea, open-source initiative, or SaaS model? I am always open to co-building high-value digital products.',
    cta: 'Discuss Collaboration',
    href: '/contact',
    external: false,
  },
  {
    icon: FiCode,
    title: 'Open Source Code PRs',
    tag: 'Code & Docs',
    desc: 'Contribute directly to open repositories. Submit pull requests, fix edge bugs, report issues, or polish technical documentation.',
    cta: 'Browse Codebases',
    href: siteConfig.socials.github.url,
    external: true,
  },
  {
    icon: FiStar,
    title: 'Share a Verified Review',
    tag: 'Testimonials',
    desc: 'Worked with me on a project? A verified review or testimonial goes a long way in building trust and credibility with future clients.',
    cta: 'Submit Feedback',
    href: '/contact',
    external: false,
  },
  {
    icon: FiHeart,
    title: 'Sponsor Open Tools',
    tag: 'Sponsorship',
    desc: 'Support ongoing open-source utilities and public tools. Sponsorship directly funds infrastructure, domain tools, and developer research.',
    cta: 'Sponsor Innovation',
    href: '/contact',
    external: false,
  },
];

const visionValues = [
  {
    icon: FiGlobe,
    title: 'Transparent Codebases',
    desc: 'Building in public with open architecture, clean documentation, and public repository updates.',
  },
  {
    icon: FiShield,
    title: 'Production-Grade Quality',
    desc: 'Crafting type-safe, maintainable, and battle-tested software over rushed minimum viable products.',
  },
  {
    icon: FiZap,
    title: 'Mutual Ecosystem Growth',
    desc: 'Rewarding client referral partners, crediting open-source contributors, and growing together.',
  },
];

export default function ContributeClient() {
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
          position: 'relative',
        }}
      >
        <div className="container">
          <ScrollReveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span className="section-label" style={{ margin: 0 }}>
                Community &amp; Ecosystem
              </span>
              <span
                className="chip-accent chip"
                style={{ fontSize: '0.72rem', padding: '3px 12px' }}
              >
                Open Source &amp; Partnerships
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
              Co-Create, Refer &amp; Fuel
              <br />
              <span className="gradient-text">Open Innovation.</span>
            </h1>

            <p
              style={{
                maxWidth: '580px',
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                marginBottom: '16px',
              }}
            >
              You don&apos;t have to write code to make an impact. Every repository star, client referral, feedback review, and joint venture strengthens the developer ecosystem.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ██  6 CONTRIBUTION PILLARS GRID
          ══════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          <ScrollReveal stagger direction="up">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '28px',
              }}
              className="contribute-pillars-grid"
            >
              {pillars.map(({ icon: Icon, title, tag, desc, cta, href, external }) => (
                <div key={title} className="contribute-card">
                  {/* Icon & Tag */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '24px',
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        background: 'rgba(143, 188, 143, 0.15)',
                        border: '1.5px solid rgba(143, 188, 143, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={24} color="#1A1A1A" />
                    </div>

                    <span
                      style={{
                        padding: '5px 14px',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        background: '#1A1A1A',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                      }}
                    >
                      ● {tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      marginBottom: '12px',
                      color: 'var(--text-primary)',
                      lineHeight: 1.25,
                    }}
                  >
                    {title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.92rem',
                      lineHeight: 1.7,
                      color: 'var(--text-secondary)',
                      marginBottom: '32px',
                      flexGrow: 1,
                    }}
                  >
                    {desc}
                  </p>

                  {/* Action Link */}
                  <Link
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="btn btn-dark"
                    style={{
                      alignSelf: 'flex-start',
                      fontSize: '0.84rem',
                      padding: '10px 20px',
                      borderRadius: '9999px',
                    }}
                  >
                    {cta} {external ? <FiArrowUpRight size={15} color="var(--accent)" /> : <FiArrowRight size={15} color="var(--accent)" />}
                  </Link>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ██  ECOSYSTEM VISION (Light Tinted Editorial `var(--bg-2)`)
          ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--bg-2)',
          padding: '100px 0',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
        }}
      >
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '16px',
                }}
              >
                Shared Philosophy
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                Building in Public,
                <br />
                <span className="gradient-text">Elevating Together</span>
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
              className="vision-grid"
            >
              {visionValues.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="vision-card-light">
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '16px',
                      background: 'rgba(143, 188, 143, 0.15)',
                      border: '1.5px solid rgba(143, 188, 143, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <Icon size={24} color="#1A1A1A" />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '10px',
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                      color: 'var(--text-secondary)',
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
                Ready to Partner or
                <br />
                Collaborate?
              </h2>

              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.70)',
                  marginBottom: '36px',
                }}
              >
                Have a project referral, open-source idea, or joint venture in mind? Reach out and let&apos;s build together.
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
          .contribute-pillars-grid,
          .vision-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .contribute-pillars-grid,
          .vision-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
