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

  const handleClick = () => {
    setIsPulling(true);
    setTimeout(() => setIsPulling(false), 400);
    onToggle();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      id="nav-lamp-toggle"
      role="button"
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      title={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      style={{
        position: 'relative',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '0 4px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
        pointerEvents: 'auto',
      }}
    >
      <motion.div
        animate={
          isPulling
            ? { y: [0, 5, -2, 0], rotate: [0, -4, 3, 0] }
            : { y: 0, rotate: 0 }
        }
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* ── Lamp SVG Illustration ── */}
        <svg
          width="36"
          height="48"
          viewBox="0 0 36 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Glow Cone Filter */}
            <filter id="lampGlow" x="-50%" y="-20%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Light Cone Radial Gradient */}
            <radialGradient
              id="lightBeam"
              cx="50%"
              cy="0%"
              r="100%"
              fx="50%"
              fy="0%"
            >
              <stop offset="0%" stopColor="#FFC87A" stopOpacity="0.65" />
              <stop offset="45%" stopColor="#FFAA40" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFAA40" stopOpacity="0" />
            </radialGradient>

            {/* Dark Standby Glow Gradient */}
            <radialGradient
              id="darkBeam"
              cx="50%"
              cy="0%"
              r="100%"
              fx="50%"
              fy="0%"
            >
              <stop offset="0%" stopColor="#6B5EE4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6B5EE4" stopOpacity="0" />
            </radialGradient>

            {/* Shade Metallic Gradient */}
            <linearGradient id="shadeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isLight ? '#3A3A54' : '#1A1A32'} />
              <stop offset="50%" stopColor={isLight ? '#222238' : '#101024'} />
              <stop offset="100%" stopColor={isLight ? '#121220' : '#080812'} />
            </linearGradient>

            {/* Accent Ring Gradient */}
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isLight ? '#F59E0B' : '#6B5EE4'} />
              <stop offset="50%" stopColor={isLight ? '#FCD34D' : '#9D94F0'} />
              <stop offset="100%" stopColor={isLight ? '#F59E0B' : '#38BDF8'} />
            </linearGradient>
          </defs>

          {/* 1. Ceiling Mount Bracket */}
          <rect
            x="13"
            y="0"
            width="10"
            height="2.5"
            rx="1.25"
            fill={isLight ? '#475569' : '#2D2D45'}
            stroke={isLight ? '#64748B' : '#4F4DD0'}
            strokeWidth="0.6"
          />

          {/* 2. Suspension Cord */}
          <line
            x1="18"
            y1="2.5"
            x2="18"
            y2="14"
            stroke={isLight ? '#64748B' : '#4F4DD0'}
            strokeWidth="1.2"
            strokeDasharray="2 1"
          />

          {/* 3. Socket / Shade Cap */}
          <rect
            x="15"
            y="13"
            width="6"
            height="3"
            rx="1"
            fill={isLight ? '#F59E0B' : '#6B5EE4'}
          />

          {/* 4. Luxury Architectural Lamp Shade */}
          <path
            d="M 12 16 L 24 16 L 29 27 C 29 28 28 29 27 29 L 9 29 C 8 29 7 28 7 27 Z"
            fill="url(#shadeGrad)"
            stroke={isLight ? 'rgba(245, 158, 11, 0.45)' : 'rgba(107, 94, 228, 0.45)'}
            strokeWidth="0.8"
          />

          {/* 5. Metallic Accent Trim Ring at bottom rim */}
          <path
            d="M 7 28.5 L 29 28.5"
            stroke="url(#ringGrad)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* 6. Glowing Light Cone (Visible when Light is ON) */}
          {isLight ? (
            <polygon
              points="9,29 27,29 35,46 1,46"
              fill="url(#lightBeam)"
              style={{ pointerEvents: 'none' }}
            />
          ) : (
            <polygon
              points="10,29 26,29 32,44 4,44"
              fill="url(#darkBeam)"
              style={{ pointerEvents: 'none' }}
            />
          )}

          {/* 7. Inner Bulb / Core Glow */}
          <circle
            cx="18"
            cy="29"
            r="3"
            fill={isLight ? '#FFF3C4' : '#6B5EE4'}
            filter="url(#lampGlow)"
          />

          {/* 8. Hanging Pull-Chain with Crystal Bead */}
          <line
            x1="22"
            y1="29"
            x2="22"
            y2="41"
            stroke={isLight ? '#F59E0B' : '#9D94F0'}
            strokeWidth="0.8"
            strokeDasharray="1.5 1.5"
          />
          <circle
            cx="22"
            cy="42.5"
            r="2"
            fill={isLight ? '#F59E0B' : '#38BDF8'}
            stroke={isLight ? '#FFFBEB' : '#FFFFFF'}
            strokeWidth="0.6"
            filter="url(#lampGlow)"
          />
        </svg>

        {/* Ambient Halo behind the lamp */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            width: '28px',
            height: '24px',
            borderRadius: '50%',
            background: isLight
              ? 'radial-gradient(circle, rgba(255, 200, 122, 0.35) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(107, 94, 228, 0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
      </motion.div>
    </motion.button>
  );
}

