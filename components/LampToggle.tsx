'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LampToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export default function LampToggle({ theme, onToggle }: LampToggleProps) {
  const isLight = theme === 'light';
  const [isPulling, setIsPulling] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPulling(true);
    setTimeout(() => setIsPulling(false), 500);
    onToggle();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsPulling(true);
      setTimeout(() => setIsPulling(false), 500);
      onToggle();
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      <motion.button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        id="nav-lamp-toggle"
        role="button"
        aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
        title={`Switch to ${isLight ? 'dark' : 'light'} theme (Click to pull)`}
        whileHover={{ scale: 1.04 }}
        style={{
          position: 'absolute',
          top: '-8px',
          width: '56px',
          height: '112px',
          background: 'transparent',
          border: 'none',
          padding: 0,
          margin: 0,
          cursor: 'pointer',
          outline: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'auto',
          overflow: 'visible',
          zIndex: 10,
        }}
      >
        <motion.div
          animate={
            isPulling
              ? {
                  y: [0, 8, -3, 1, 0],
                  rotate: [0, -3.5, 2.5, -1, 0],
                }
              : { y: 0, rotate: 0 }
          }
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transformOrigin: 'top center',
          }}
        >
          {/* ── Volumetric Light Cone Glow (Renders behind the lamp when ON) ── */}
          {isLight ? (
            <div
              style={{
                position: 'absolute',
                top: '46px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '140px',
                height: '130px',
                background: `radial-gradient(ellipse 50% 50% at 50% 0%, rgba(255, 200, 122, 0.42) 0%, rgba(255, 170, 64, 0.16) 45%, transparent 75%)`,
                filter: 'blur(8px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                top: '46px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '90px',
                background: `radial-gradient(ellipse 50% 50% at 50% 0%, rgba(107, 94, 228, 0.22) 0%, transparent 70%)`,
                filter: 'blur(6px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
          )}

          {/* ── Detailed Hanging Pendant Lamp SVG (SS2 Style) ── */}
          <svg
            width="56"
            height="112"
            viewBox="0 0 56 112"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible', zIndex: 1 }}
          >
            <defs>
              {/* Diffuser Lens Glow Filter */}
              <filter id="bulbGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Cylindrical Shade Gradient */}
              <linearGradient id="pendantShadeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isLight ? '#38384E' : '#1C1C32'} />
                <stop offset="35%" stopColor={isLight ? '#4E4E6A' : '#2A2A46'} />
                <stop offset="70%" stopColor={isLight ? '#2E2E42' : '#141424'} />
                <stop offset="100%" stopColor={isLight ? '#1E1E2C' : '#0B0B14'} />
              </linearGradient>

              {/* Accent Trim Gradient */}
              <linearGradient id="pendantRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isLight ? '#F59E0B' : '#6B5EE4'} />
                <stop offset="50%" stopColor={isLight ? '#FCD34D' : '#9D94F0'} />
                <stop offset="100%" stopColor={isLight ? '#F59E0B' : '#38BDF8'} />
              </linearGradient>

              {/* Suspension Chain Bead Gradient */}
              <radialGradient id="chainBeadGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor={isLight ? '#94A3B8' : '#606084'} />
                <stop offset="60%" stopColor={isLight ? '#64748B' : '#383856'} />
                <stop offset="100%" stopColor={isLight ? '#334155' : '#1A1A2C'} />
              </radialGradient>

              {/* Pull Chain Gold/Cyan Bead Gradient */}
              <radialGradient id="pullBeadGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor={isLight ? '#FFFBEB' : '#E0F2FE'} />
                <stop offset="45%" stopColor={isLight ? '#F59E0B' : '#38BDF8'} />
                <stop offset="100%" stopColor={isLight ? '#B45309' : '#1E40AF'} />
              </radialGradient>
            </defs>

            {/* 1. Ceiling Mount Bracket */}
            <rect
              x="22"
              y="0"
              width="12"
              height="3"
              rx="1.5"
              fill={isLight ? '#475569' : '#2D2D46'}
            />

            {/* 2. Suspension Chain (Multiple Metallic Spherical Links as in SS2) */}
            <circle cx="28" cy="6" r="2.2" fill="url(#chainBeadGrad)" />
            <circle cx="28" cy="11.5" r="2.2" fill="url(#chainBeadGrad)" />
            <circle cx="28" cy="17" r="2.2" fill="url(#chainBeadGrad)" />

            {/* 3. Shade Top Socket Cap */}
            <rect
              x="24"
              y="18.5"
              width="8"
              height="3"
              rx="1"
              fill={isLight ? '#334155' : '#1A1A30'}
              stroke={isLight ? '#64748B' : '#6B5EE4'}
              strokeWidth="0.6"
            />

            {/* 4. Architectural Pendant Cylindrical Shade (SS2 style) */}
            {/* Top rounded cap */}
            <path
              d="M 12 28 C 12 23, 44 23, 44 28 L 44 45 C 44 48, 12 48, 12 45 Z"
              fill="url(#pendantShadeGrad)"
              stroke={isLight ? 'rgba(255,255,255,0.18)' : 'rgba(107, 94, 228, 0.4)'}
              strokeWidth="0.8"
            />

            {/* Subtle highlight sheen line on the left side of the cylinder */}
            <line
              x1="16"
              y1="25"
              x2="16"
              y2="46"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* 5. Bottom Rim Metallic Bezel Ring */}
            <ellipse
              cx="28"
              cy="46"
              rx="16"
              ry="3"
              fill={isLight ? '#222238' : '#101020'}
              stroke="url(#pendantRimGrad)"
              strokeWidth="1.4"
            />

            {/* 6. Glowing Diffuser Lens (Illuminates when Light is ON) */}
            <ellipse
              cx="28"
              cy="46"
              rx="12.5"
              ry="2.2"
              fill={isLight ? '#FFFBEB' : '#322E60'}
              filter={isLight ? 'url(#bulbGlow)' : undefined}
            />

            {/* 7. Beaded Pull Chain hanging down from center into the page (SS2 style) */}
            <line
              x1="28"
              y1="48"
              x2="28"
              y2="88"
              stroke={isLight ? '#94A3B8' : '#606084'}
              strokeWidth="1"
              strokeDasharray="2.2 1.8"
            />

            {/* Pull Chain Beads at the end */}
            <circle cx="28" cy="89" r="2.2" fill="url(#chainBeadGrad)" />
            <circle cx="28" cy="95" r="2.8" fill="url(#pullBeadGrad)" filter="url(#bulbGlow)" />
            <circle cx="28" cy="101" r="2.2" fill="url(#chainBeadGrad)" />
          </svg>
        </motion.div>
      </motion.button>
    </div>
  );
}
