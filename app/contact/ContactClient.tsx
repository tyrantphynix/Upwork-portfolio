'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiSend,
  FiCheckCircle,
  FiCopy,
  FiCheck,
  FiLoader,
  FiClock,
  FiGlobe,
  FiShield,
  FiArrowUpRight,
  FiHelpCircle,
} from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import ScrollReveal from '@/components/ScrollReveal';
import Script from 'next/script';
import { siteConfig } from '@/config/site';

const contactChannels = [
  {
    icon: FiMail,
    label: 'Direct Email',
    value: siteConfig.email,
    href: siteConfig.mailto,
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: siteConfig.socials.github.displayValue,
    href: siteConfig.socials.github.url,
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: siteConfig.socials.linkedin.displayValue,
    href: siteConfig.socials.linkedin.url,
  },
  {
    icon: FaXTwitter,
    label: 'Twitter / X',
    value: siteConfig.socials.twitter.displayValue,
    href: siteConfig.socials.twitter.url,
  },
];

const mobileSocialChannels = [
  {
    icon: FiGithub,
    label: 'GitHub',
    href: siteConfig.socials.github.url,
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    href: siteConfig.socials.linkedin.url,
  },
  {
    icon: FaXTwitter,
    label: 'Twitter / X',
    href: siteConfig.socials.twitter.url,
  },
  {
    icon: FiMail,
    label: 'Direct Email',
    href: siteConfig.mailto,
  },
];

const usdBudgetOptions = [
  { value: '$2k - $5k', label: '$2k – $5k' },
  { value: '$5k - $10k', label: '$5k – $10k' },
  { value: '$10k+', label: '$10k+' },
  { value: 'Custom', label: 'Custom Amount' },
];

const inrBudgetOptions = [
  { value: '₹50k - ₹1.5L', label: '₹50k – ₹1.5 Lakhs' },
  { value: '₹1.5L - ₹4L', label: '₹1.5 Lakhs – ₹4 Lakhs' },
  { value: '₹4L+', label: '₹4 Lakhs+' },
  { value: 'Custom', label: 'Custom Amount' },
];

const faqs = [
  {
    icon: FiClock,
    q: 'What is your typical project turnaround time?',
    a: 'Full-stack web applications and SaaS MVPs are typically completed within 3 to 6 weeks. Focused UI/UX redesigns or feature integrations range from 1 to 3 weeks depending on complexity.',
  },
  {
    icon: FiShield,
    q: 'How do project billing and code ownership work?',
    a: 'Engagements run on a 50/50 milestone schedule (50% upfront deposit, 50% upon production sign-off). Upon final payment, 100% of source code, IP rights, and repositories transfer to your team.',
  },
  {
    icon: FiGlobe,
    q: 'What happens after I submit a project inquiry?',
    a: 'I review all submitted requirements personally and respond within 24 hours with initial project scope estimates and a direct call booking link.',
  },
];

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [selectedBudget, setSelectedBudget] = useState('$5k - $10k');
  const [customPrice, setCustomPrice] = useState('');
  const [pricePreference, setPricePreference] = useState<'quote' | 'budget'>('quote');
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const turnstileRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const scrollToFormTop = () => {
    if (typeof window === 'undefined') return;
    setTimeout(() => {
      if (formCardRef.current) {
        const isMobile = window.innerWidth <= 992;
        const navOffset = isMobile ? -70 : -90;
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(formCardRef.current, {
            offset: navOffset,
            duration: 0.8,
            immediate: false,
          });
        } else {
          const rect = formCardRef.current.getBoundingClientRect();
          const targetY = window.pageYOffset + rect.top + navOffset;
          window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
        }
      }
    }, 60);
  };

  useEffect(() => {
    if (submitted) {
      scrollToFormTop();
    }
  }, [submitted]);

  useEffect(() => {
    (window as any).onloadTurnstileCallback = () => {
      const turnstile = (window as any).turnstile;
      if (turnstile && turnstileRef.current) {
        try {
          turnstile.render(turnstileRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
            theme: 'dark',
          });
        } catch (e) {
          // Avoid double rendering
        }
      }
    };

    const turnstile = (window as any).turnstile;
    if (turnstile && turnstileRef.current) {
      try {
        turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
          theme: 'dark',
        });
      } catch (e) {
        // Avoid double rendering
      }
    }
  }, []);

  const formatPriceValue = (val: string, curr: 'USD' | 'INR') => {
    const raw = val.replace(/\D/g, '');
    if (!raw) return '';
    const num = parseInt(raw, 10);
    return num.toLocaleString(curr === 'USD' ? 'en-US' : 'en-IN');
  };

  const handleCurrencyChange = (newCurr: 'USD' | 'INR') => {
    setCurrency(newCurr);
    if (customPrice) {
      setCustomPrice(formatPriceValue(customPrice, newCurr));
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPriceValue(e.target.value, currency);
    setCustomPrice(formatted);
  };

  const [copyState, setCopyState] = useState<'idle' | 'checking' | 'verified'>('idle');

  const handleCopyEmail = () => {
    if (copyState !== 'idle') return;
    navigator.clipboard.writeText(siteConfig.email);
    setCopyState('checking');
    setTimeout(() => {
      setCopyState('verified');
      setTimeout(() => setCopyState('idle'), 2200);
    }, 400);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    // Get Turnstile token
    const token = (window as any).turnstile?.getResponse();

    // Construct the budget string based on user inputs
    const budgetVal = customPrice ? `${currency === 'USD' ? '$' : '₹'}${customPrice}` : selectedBudget;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          pricePreference,
          budget: budgetVal,
          token,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
        strategy="lazyOnload"
      />

      {/* ══════════════════════════════════════════════════════════════
          ██  HERO HEADER (Border line removed)
          ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--bg)',
          padding: '80px 0 56px',
        }}
      >
        <div className="container">
          <ScrollReveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span className="section-label" style={{ margin: 0 }}>
                Get In Touch
              </span>
              <span className="chip-accent chip" style={{ fontSize: '0.72rem', padding: '3px 12px' }}>
                ● Available for Q3/Q4 Projects
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                maxWidth: '820px',
                marginBottom: '20px',
                color: 'var(--text-primary)',
              }}
            >
              Initiate a Project, Inquiry
              <br />
              or <span className="gradient-text">Partnership.</span>
            </h1>

            <p
              style={{
                maxWidth: '580px',
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
              }}
            >
              Have a full-stack platform, SaaS web app, or mobile product in mind? Drop a message below — I respond to all inquiries within 24 hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ██  2-COLUMN PORTAL (Left Channels + Right Form)
          ══════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          <div className="contact-layout-grid">
            {/* ── Left Column: Direct Communication & Availability ── */}
            <ScrollReveal direction="left" className="contact-channels-col">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* One-Click Copy Email Card */}
                <div
                  style={{
                    background: 'var(--surface)',
                    border: '1.5px solid var(--border)',
                    borderRadius: '20px',
                    padding: '20px 24px',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
                    DIRECT CONTACT
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                      {siteConfig.email}
                    </div>

                    {/* Cloudflare Turnstile Style Checkbox Motion Button */}
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy Email Address"
                      title={copyState === 'verified' ? "Copied!" : "Copy email address"}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        border: `1.5px solid ${
                          copyState === 'verified'
                            ? 'var(--accent)'
                            : copyState === 'checking'
                            ? 'var(--accent-hover)'
                            : 'var(--border-strong)'
                        }`,
                        background: copyState === 'verified' ? 'var(--accent-soft)' : 'var(--bg-3)',
                        cursor: 'pointer',
                        flexShrink: 0,
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {copyState === 'checking' ? (
                        <FiLoader
                          size={16}
                          color="var(--accent)"
                          style={{
                            animation: 'spin 0.8s linear infinite',
                          }}
                        />
                      ) : copyState === 'verified' ? (
                        <FiCheck
                          size={18}
                          color="var(--accent)"
                          style={{
                            transform: 'scale(1)',
                            transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          }}
                        />
                      ) : (
                        <FiCopy size={16} color="var(--text-primary)" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Channels List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {contactChannels.map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        borderRadius: '18px',
                        border: '1.5px solid var(--border)',
                        background: 'var(--surface)',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'all 0.25s ease',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                        (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                        (e.currentTarget as HTMLElement).style.transform = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '12px',
                            background: 'var(--accent-soft)',
                            border: '1px solid var(--accent-mid)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={18} color="var(--accent)" />
                        </div>

                        <div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '2px' }}>
                            {label}
                          </div>
                          <div style={{ fontSize: '0.90rem', fontWeight: 600, color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                            {value}
                          </div>
                        </div>
                      </div>

                      <FiArrowUpRight size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                    </a>
                  ))}
                </div>

                {/* Availability Status Badge Card */}
                <div
                  style={{
                    padding: '24px',
                    borderRadius: '20px',
                    background: '#1A1A1A',
                    color: '#FFFFFF',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.10)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span className="contact-status-live-dot" />
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', letterSpacing: '0.08em' }}>
                      CURRENT STATUS
                    </span>
                  </div>

                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                    Taking New Projects
                  </h4>

                  <p style={{ fontSize: '0.88rem', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.90)', margin: 0 }}>
                    Operating in IST (UTC +5:30) · Partnering with founders &amp; teams globally across North America, Europe, and Asia-Pacific.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* ── Right Column: Interactive Inquiry Form ── */}
            <ScrollReveal direction="right" className="contact-form-col">
              <div className="contact-form-card" ref={formCardRef}>
                {submitted && (
                  <div
                    style={{
                      padding: '48px 24px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'rgba(143, 188, 143, 0.15)',
                        border: '2px solid var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                      }}
                    >
                      <FiCheckCircle size={32} color="var(--accent)" />
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '12px',
                      }}
                    >
                      Message Delivered!
                    </h3>

                    <p
                      style={{
                        fontSize: '0.95rem',
                        lineHeight: 1.7,
                        color: 'var(--text-secondary)',
                        maxWidth: '440px',
                        margin: '0 auto 32px',
                      }}
                    >
                      Thank you for reaching out. I have received your project details and will respond to <strong>{form.email}</strong> within 24 hours.
                    </p>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: '', email: '', message: '' });
                        if (typeof window !== 'undefined' && (window as any).turnstile) {
                          try {
                            (window as any).turnstile.reset();
                          } catch (e) {
                            console.error(e);
                          }
                        }
                        scrollToFormTop();
                      }}
                      className="btn btn-dark"
                      style={{ borderRadius: '9999px', padding: '10px 24px' }}
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: submitted ? 'none' : 'flex',
                    flexDirection: 'column',
                    gap: '18px',
                  }}
                >
                    <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
                      <h2
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.75rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          margin: 0,
                        }}
                      >
                        Project Inquiry Form
                      </h2>
                    </div>

                    {/* 1. Name & Email Inputs */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }} className="form-row-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          style={{
                            display: 'block',
                            fontSize: '0.8rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            marginBottom: '6px',
                          }}
                        >
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          autoComplete="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Alex Morgan"
                          style={{
                            width: '100%',
                            padding: '13px 16px',
                            borderRadius: '12px',
                            border: '1.5px solid var(--border)',
                            background: 'var(--bg-3)',
                            fontFamily: 'var(--font-dm-sans)',
                            fontSize: '0.9rem',
                            color: 'var(--text-primary)',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          style={{
                            display: 'block',
                            fontSize: '0.8rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            marginBottom: '6px',
                          }}
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          autoComplete="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="name@company.com"
                          style={{
                            width: '100%',
                            padding: '13px 16px',
                            borderRadius: '12px',
                            border: '1.5px solid var(--border)',
                            background: 'var(--bg-3)',
                            fontFamily: 'var(--font-dm-sans)',
                            fontSize: '0.9rem',
                            color: 'var(--text-primary)',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    {/* Pricing Preference Selection */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <span
                        id="pricing-preference-label"
                        style={{
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          margin: 0,
                        }}
                      >
                        Pricing Preference
                      </span>
                      <div
                        role="group"
                        aria-labelledby="pricing-preference-label"
                        style={{ display: 'inline-flex', background: 'var(--bg-3)', borderRadius: '9999px', padding: '3px', border: '1px solid var(--border)' }}
                      >
                        <button
                          type="button"
                          onClick={() => setPricePreference('quote')}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '9999px',
                            border: 'none',
                            fontSize: '0.74rem',
                            fontWeight: pricePreference === 'quote' ? 700 : 500,
                            fontFamily: 'var(--font-dm-sans)',
                            cursor: 'pointer',
                            background: pricePreference === 'quote' ? 'var(--accent)' : 'transparent',
                            color: pricePreference === 'quote' ? '#FFFFFF' : 'var(--text-secondary)',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          You Estimate / Suggest Price
                        </button>
                        <button
                          type="button"
                          onClick={() => setPricePreference('budget')}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '9999px',
                            border: 'none',
                            fontSize: '0.74rem',
                            fontWeight: pricePreference === 'budget' ? 700 : 500,
                            fontFamily: 'var(--font-dm-sans)',
                            cursor: 'pointer',
                            background: pricePreference === 'budget' ? 'var(--accent)' : 'transparent',
                            color: pricePreference === 'budget' ? '#FFFFFF' : 'var(--text-secondary)',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          I Have a Specific Budget
                        </button>
                      </div>
                    </div>

                    {/* 2. Direct Budget / Price Input & Currency Switcher */}
                    <div
                      style={{
                        maxHeight: pricePreference === 'budget' ? '140px' : '0px',
                        opacity: pricePreference === 'budget' ? 1 : 0,
                        transform: pricePreference === 'budget' ? 'translateY(0)' : 'translateY(-8px)',
                        marginTop: pricePreference === 'budget' ? '0px' : '-18px',
                        overflow: 'hidden',
                        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        pointerEvents: pricePreference === 'budget' ? 'auto' : 'none',
                      }}
                    >
                      <div style={{ paddingTop: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '8px' }}>
                          <label
                            htmlFor="contact-price"
                            style={{
                              display: 'block',
                              fontSize: '0.8rem',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 700,
                              color: 'var(--text-primary)',
                              margin: 0,
                            }}
                          >
                            Estimated Project Budget / Price *
                          </label>

                          {/* Currency Toggle Switcher */}
                          <div style={{ display: 'inline-flex', background: 'var(--bg-3)', borderRadius: '9999px', padding: '3px', border: '1px solid var(--border)' }}>
                            <button
                              type="button"
                              onClick={() => handleCurrencyChange('USD')}
                              style={{
                                padding: '4px 14px',
                                borderRadius: '9999px',
                                border: 'none',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                fontFamily: 'var(--font-mono)',
                                cursor: 'pointer',
                                background: currency === 'USD' ? 'var(--accent)' : 'transparent',
                                color: currency === 'USD' ? '#FFFFFF' : 'var(--text-secondary)',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              USD ($)
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCurrencyChange('INR')}
                              style={{
                                padding: '4px 14px',
                                borderRadius: '9999px',
                                border: 'none',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                fontFamily: 'var(--font-mono)',
                                cursor: 'pointer',
                                background: currency === 'INR' ? 'var(--accent)' : 'transparent',
                                color: currency === 'INR' ? '#FFFFFF' : 'var(--text-secondary)',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              INR (₹)
                            </button>
                          </div>
                        </div>

                        {/* Direct Price Input Field */}
                        <div style={{ position: 'relative' }}>
                          <span
                            style={{
                              position: 'absolute',
                              left: '16px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              fontSize: '1rem',
                              fontWeight: 700,
                              color: 'var(--text-primary)',
                              fontFamily: 'var(--font-mono)',
                            }}
                          >
                            {currency === 'USD' ? '$' : '₹'}
                          </span>
                          <input
                            type="text"
                            id="contact-price"
                            name="price"
                            autoComplete="off"
                            required={pricePreference === 'budget'}
                            value={customPrice}
                            onChange={handlePriceChange}
                            placeholder={currency === 'USD' ? 'e.g. 5,000' : 'e.g. 1,50,000'}
                            style={{
                              width: '100%',
                              padding: '13px 16px 13px 36px',
                              borderRadius: '12px',
                              border: '1.5px solid var(--border)',
                              background: 'var(--bg-3)',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.92rem',
                              color: 'var(--text-primary)',
                              outline: 'none',
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 3. Project Details & Objectives Textarea */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        style={{
                          display: 'block',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          marginBottom: '6px',
                        }}
                      >
                        Project Details &amp; Objectives *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        autoComplete="off"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about your product vision, tech stack requirements, target audience, or desired launch deadline..."
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          borderRadius: '12px',
                          border: '1.5px solid var(--border)',
                          background: 'var(--bg-3)',
                          fontFamily: 'var(--font-dm-sans)',
                          fontSize: '0.9rem',
                          color: 'var(--text-primary)',
                          outline: 'none',
                          resize: 'vertical',
                        }}
                      />
                    </div>

                    {/* Bot Protection Widget Container & Submit Action */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginTop: '-12px' }}>
                      <div ref={turnstileRef} style={{ minHeight: '44px', display: 'flex', justifyContent: 'center' }} />
                      
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        (Verification helps block automated spam)
                      </div>

                      {/* Submit Error Message */}
                      {submitError && (
                        <div style={{
                          color: '#E11D48',
                          fontSize: '0.82rem',
                          fontFamily: 'var(--font-mono)',
                          textAlign: 'center',
                          marginTop: '6px',
                        }}>
                          {submitError}
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="btn btn-dark"
                        disabled={submitting}
                        style={{
                          padding: '14px 32px',
                          fontSize: '0.92rem',
                          borderRadius: '9999px',
                          justifyContent: 'center',
                          width: '100%',
                          opacity: submitting ? 0.7 : 1,
                          cursor: submitting ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {submitting ? (
                          <FiLoader
                            size={16}
                            color="#FFFFFF"
                            style={{
                              animation: 'spin 0.8s linear infinite',
                            }}
                          />
                        ) : (
                          <FiSend size={16} color="#FFFFFF" />
                        )}
                        {submitting ? 'Submitting Inquiry...' : 'Submit Project Inquiry'}
                      </button>
                    </div>
                  </form>
              </div>

              {/* Mobile-Only Unified Connect & Channels Card */}
              <div className="contact-mobile-connect-card">
                {/* 1. Direct Contact Email Header & Copy */}
                <div className="contact-mobile-direct-box">
                  <div>
                    <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
                      DIRECT CONTACT
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                      {siteConfig.email}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy Email Address"
                    title={copyState === 'verified' ? "Copied!" : "Copy email address"}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      border: `1.5px solid ${
                        copyState === 'verified'
                          ? 'var(--accent)'
                          : copyState === 'checking'
                          ? 'var(--accent-mid)'
                          : 'var(--border)'
                      }`,
                      background: copyState === 'verified' ? 'var(--accent-soft)' : 'var(--surface)',
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {copyState === 'checking' ? (
                      <FiLoader
                        size={16}
                        color="var(--accent)"
                        style={{
                          animation: 'spin 0.8s linear infinite',
                        }}
                      />
                    ) : copyState === 'verified' ? (
                      <FiCheck
                        size={18}
                        color="var(--accent)"
                        style={{
                          transform: 'scale(1)',
                          transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}
                      />
                    ) : (
                      <FiCopy size={16} color="var(--text-primary)" />
                    )}
                  </button>
                </div>

                {/* Divider with Center Label */}
                <div className="contact-mobile-divider">
                  <span>QUICK CHANNELS</span>
                </div>

                {/* 2. 4 Rounded Square Icon Buttons */}
                <div className="contact-mobile-channels-row">
                  {mobileSocialChannels.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="contact-mobile-icon-btn"
                    >
                      <Icon size={20} color="var(--text-primary)" />
                    </a>
                  ))}
                </div>

                {/* 3. Availability Status Footer */}
                <div className="contact-mobile-status-bar">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="contact-status-live-dot" />
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.01em' }}>
                      Taking New Projects
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.90)', letterSpacing: '0.02em', fontWeight: 500 }}>
                    IST (UTC +5:30) · Worldwide Remote
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ██  CLIENT FAQ & EXPECTATIONS SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--bg-2)',
          padding: '100px 0',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
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
                Engagement Expectations
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
                Frequently Asked
                <br />
                <span className="gradient-text">Questions</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger direction="up">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '28px',
              }}
              className="faq-grid"
            >
              {faqs.map(({ icon: Icon, q, a }) => (
                <div key={q} className="faq-card-item">
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: 'var(--accent-soft)',
                      border: '1.5px solid var(--accent-mid)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <Icon size={22} color="var(--accent)" />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '12px',
                      lineHeight: 1.3,
                    }}
                  >
                    {q}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                      color: 'var(--text-secondary)',
                      margin: 0,
                    }}
                  >
                    {a}
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
                Direct Booking
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
                Prefer a Direct Call
                <br />
                or Technical Demo?
              </h2>

              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.70)',
                  marginBottom: '36px',
                }}
              >
                Skip the message form and email me directly to schedule a 1-on-1 technical discovery call.
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
                  href="/projects"
                  className="btn btn-outline-light"
                  style={{
                    padding: '12px 28px',
                  }}
                >
                  Explore Works <FiArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 992px) {
          .faq-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .form-row-2,
          .faq-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-form-card {
            padding: 24px 16px !important;
            border-radius: 20px !important;
          }
        }
      `}</style>
    </>
  );
}
