'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { siteConfig } from '@/config/site';


const footerLinks = {
  Navigation: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/services', label: 'Services' },
    { href: '/ai-chat', label: 'AI Chat' },
    { href: '/contribute', label: 'Contribute' },
    { href: '/contact', label: 'Contact' },
  ],
  Projects: [
    { href: '/projects#yau-crm', label: 'YAU CRM' },
    { href: '/projects#leakassure', label: 'LeakAssure' },
    { href: '/projects#hair-cabillo', label: 'Hair Cabillo' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

const socials = [
  { href: siteConfig.socials.github.url, icon: FiGithub, label: 'GitHub' },
  { href: siteConfig.socials.linkedin.url, icon: FiLinkedin, label: 'LinkedIn' },
  { href: siteConfig.socials.twitter.url, icon: FaXTwitter, label: 'Twitter / X' },
  { href: siteConfig.mailto, icon: FiMail, label: 'Email' },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <>
      <footer
        className={`site-footer ${pathname === '/ai-chat' ? 'hide-on-mobile-chat' : ''}`}
        style={{
          backgroundColor: 'var(--bg-2)',
          borderTop: '1px solid var(--border)',
          padding: '64px 0 32px',
        }}
      >
      <div className="container">
        <div className="footer-grid">
          {/* Brand column */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
                display: 'inline-block',
                marginBottom: '16px',
              }}
            >
              chirag<span style={{ color: 'var(--accent)' }}>.</span>
            </Link>
            <p style={{ fontSize: '0.875rem', maxWidth: '280px', marginBottom: '24px' }}>
              Full-Stack Developer specializing in Web, Mobile &amp; AI-integrated applications. Building products that scale.
            </p>
            <a
              href={siteConfig.mailto}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.875rem',
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <FiMail size={14} />
              <span className="footer-link-animate">{siteConfig.email}</span>
            </a>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    fontSize: '16px',
                    transition: 'all var(--duration-base)',
                    backgroundColor: 'var(--surface)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                    (e.currentTarget as HTMLElement).style.transform = 'none';
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, items]) => (
            <div key={section}>
              <h4
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '16px',
                }}
              >
                {section}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {items.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="footer-link-animate"
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        transition: 'color var(--duration-fast)',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="divider" style={{ marginBottom: '24px' }} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © 2026 Chirag Rawat. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: 'var(--accent-hover)', marginRight: '2px' }}>●</span>
            All systems operational <span style={{ color: 'var(--border)', margin: '0 6px' }}>|</span> India
          </p>
        </div>
      </div>
    </footer>
    <style>{`
      @media (max-width: 900px) {
        .site-footer.hide-on-mobile-chat {
          display: none !important;
        }
      }
    `}</style>
  </>
  );
}
