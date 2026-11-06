'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Check if user already saw the preloader in this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('chirag_portfolio_preloaded')) {
      setLoading(false);
      return;
    }

    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
    document.body.style.overflow = 'hidden';

    // Fast, crisp increment (~450ms total)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 5) + 4; // Increments of 4 to 8
        return prev + step > 100 ? 100 : prev + step;
      });
    }, 25);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      try {
        sessionStorage.setItem('chirag_portfolio_preloaded', 'true');
      } catch (e) {}

      const exitTimer = setTimeout(() => {
        setExiting(true);
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
          window.dispatchEvent(new Event('scroll'));
        }
        document.body.style.overflow = '';
      }, 200);

      const destroyTimer = setTimeout(() => {
        setLoading(false);
      }, 550);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(destroyTimer);
      };
    }
  }, [progress]);

  if (!loading) return null;

  return (
    <div
      id="custom-p-preloader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#050505',
        background: 'radial-gradient(circle at 50% 45%, rgba(162, 89, 255, 0.05) 0%, rgba(10, 207, 131, 0.03) 50%, transparent 100%), #050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: exiting ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      {/* Central Content Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          transform: exiting ? 'scale(0.97) translateY(-6px)' : 'none',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Custom Ribbon C Monogram */}
        <div style={{ position: 'relative', width: '90px', height: '90px' }}>
          <svg
            width="90"
            height="90"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Spinning decorative outer dashed ring */}
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="#FFFFFF"
              strokeWidth="0.75"
              strokeDasharray="4 8"
              opacity="0.15"
              style={{
                transformOrigin: 'center',
                animation: 'preloaderSpin 25s linear infinite',
              }}
            />

            {/* Continuous Ribbon "C" Path - Bound to Progress */}
            <path
              d="M66 32 C58 24, 46 24, 38 32 C30 40, 30 60, 38 68 C46 76, 58 76, 66 68"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={100}
              style={{
                strokeDasharray: 100,
                strokeDashoffset: 100 - progress,
                transition: 'stroke-dashoffset 0.15s ease-out',
              }}
            />
          </svg>
        </div>

        {/* Linear Loading Progress Bar */}
        <div
          style={{
            width: '260px',
            height: '6px',
            backgroundColor: '#1E1E1F',
            borderRadius: '9999px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: '#FFFFFF',
              borderRadius: '9999px',
              transition: 'width 0.15s ease-out',
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
            }}
          />
        </div>



        {/* Small Footer Text */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.05em',
            color: 'rgba(255, 255, 255, 0.35)',
            marginTop: '8px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#F97316',
              display: 'inline-block',
              boxShadow: '0 0 6px rgba(249, 115, 22, 0.8)',
            }}
          />
          <span>Designed &amp; Built by Chirag</span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes preloaderSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
