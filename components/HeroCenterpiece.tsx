'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiShield, FiCpu, FiCompass } from 'react-icons/fi';

interface HeroCenterpieceProps {
  splineUrl?: string;
  videoUrl?: string;
  imageUrl?: string;
  showChips?: boolean;
}

export default function HeroCenterpiece({
  splineUrl,
  videoUrl,
  imageUrl = '/images/developer_avatar_transparent.png',
  showChips = false,
}: HeroCenterpieceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasGyro, setHasGyro] = useState(false);

  // Raw normalized mouse coordinates: -1 (left/top) to +1 (right/bottom)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for organic, physical dampening (like a camera gimbal)
  const springConfig = { damping: 22, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotation transforms
  const rotateY = useTransform(smoothX, [-1, 1], [-16, 16]); // Head turns left/right
  const rotateX = useTransform(smoothY, [-1, 1], [14, -14]); // Head tilts up/down

  // Internal layer shifts for true depth gaze parallax
  const gazeX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const gazeY = useTransform(smoothY, [-1, 1], [-14, 14]);
  const deepAuraX = useTransform(smoothX, [-1, 1], [30, -30]);
  const deepAuraY = useTransform(smoothY, [-1, 1], [25, -25]);

  // Floating badges 3D translation
  const chip1X = useTransform(smoothX, [-1, 1], [-26, 26]);
  const chip1Y = useTransform(smoothY, [-1, 1], [-20, 20]);
  const chip2X = useTransform(smoothX, [-1, 1], [24, -24]);
  const chip2Y = useTransform(smoothY, [-1, 1], [18, -18]);
  const chip3X = useTransform(smoothX, [-1, 1], [-14, 14]);
  const chip3Y = useTransform(smoothY, [-1, 1], [22, -22]);

  // Mouse move listener across window for broad tracking (IMAX wide-view feel)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from center relative to viewport bounds for wide peripheral tracking
      const normX = Math.max(-1.2, Math.min(1.2, (e.clientX - centerX) / (window.innerWidth * 0.45)));
      const normY = Math.max(-1.2, Math.min(1.2, (e.clientY - centerY) / (window.innerHeight * 0.45)));

      mouseX.set(normX);
      mouseY.set(normY);
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        setHasGyro(true);
        // Gamma: tilt left-to-right [-90 to 90], Beta: front-to-back [-180 to 180]
        const normX = Math.max(-1, Math.min(1, e.gamma / 30));
        const normY = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
        mouseX.set(normX);
        mouseY.set(normY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [mouseX, mouseY]);

  // ── Expansive, Unboxed 3D Spline Mascot ──
  // If splineUrl is passed, render the robot freely across the hero stage with zero box/borders
  if (splineUrl) {
    return (
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '540px',
          height: 'clamp(440px, 50vh, 560px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible',
          userSelect: 'none',
        }}
      >
        {/* Soft Ambient Depth Glow behind the Robot Mascot */}
        <div
          style={{
            position: 'absolute',
            width: '130%',
            height: '110%',
            top: '0%',
            left: '-15%',
            background: 'radial-gradient(ellipse at center, rgba(107, 94, 228, 0.24) 0%, rgba(243, 126, 126, 0.12) 42%, transparent 72%)',
            filter: 'blur(45px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Free-Floating 3D Spline Canvas (Borderless, Natural Lighting) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        >
          <iframe
            src={splineUrl}
            title="Interactive 3D Robot Centerpiece"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: 'transparent',
              pointerEvents: 'auto',
            }}
            allow="accelerometer; gyroscope"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="imax-stage"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '480px',
        height: 'clamp(360px, 46vh, 460px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
        userSelect: 'none',
      }}
    >
      {/* ── 1. Distant Horizon Glow & Perspective Ellipse (Wide IMAX Stage) ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '8%',
          width: '120%',
          height: '240px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(107, 94, 228, 0.22) 0%, rgba(56, 189, 248, 0.12) 40%, transparent 75%)',
          filter: 'blur(36px)',
          transform: 'rotateX(75deg)',
          pointerEvents: 'none',
          zIndex: 0,
          x: deepAuraX,
          y: deepAuraY,
        }}
      />

      {/* Decorative Perspective Grid Disc */}
      <div
        style={{
          position: 'absolute',
          bottom: '4%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          border: '1px dashed rgba(255, 255, 255, 0.12)',
          transform: 'rotateX(75deg)',
          pointerEvents: 'none',
          zIndex: 1,
          animation: 'stageSpin 60s linear infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '9%',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          border: '1px solid rgba(107, 94, 228, 0.25)',
          transform: 'rotateX(75deg)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── 2. The 3D Reactive Gimbal / Character Rig ── */}
      <motion.div
        style={{
          position: 'relative',
          width: splineUrl ? 'clamp(300px, 30vw, 420px)' : 'clamp(250px, 24vw, 310px)',
          height: splineUrl ? 'clamp(380px, 46vh, 480px)' : 'clamp(320px, 40vh, 400px)',
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
          zIndex: 2,
        }}
      >
        {/* Holographic Framing Pedestal & Outer Aura */}
        <div
          style={{
            position: 'absolute',
            inset: '-12px',
            borderRadius: '36px',
            background: 'linear-gradient(145deg, rgba(107, 94, 228, 0.25) 0%, rgba(56, 189, 248, 0.15) 50%, rgba(255, 107, 107, 0.10) 100%)',
            filter: 'blur(22px)',
            opacity: isHovered ? 0.9 : 0.65,
            transition: 'opacity 0.4s ease',
            transform: 'translateZ(-20px)',
            pointerEvents: 'none',
          }}
        />

        {/* The Main 3D Card / Frame */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '28px',
            overflow: 'hidden',
            background: 'linear-gradient(170deg, rgba(26, 26, 56, 0.75) 0%, rgba(13, 13, 26, 0.92) 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.14)',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(107, 94, 228, 0.18)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            transform: 'translateZ(10px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Subtle Top Specular Sheen (simulates real lens glass) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />

          {/* High-Tech HUD Scanner Ring Header */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '18px',
              right: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 4,
              pointerEvents: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#10B981',
                  boxShadow: '0 0 8px #10B981',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                LIVE 3D RIG // CHIRAG
              </span>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                letterSpacing: '0.08em',
                color: 'var(--accent-2)',
                background: 'rgba(56, 189, 248, 0.12)',
                padding: '2px 7px',
                borderRadius: '6px',
                border: '1px solid rgba(56, 189, 248, 0.28)',
              }}
            >
              FOV 68° · IMAX
            </span>
          </div>

          {/* ── Visual Avatar / 3D Asset ── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {videoUrl ? (
              <video
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: 'scale(1.08)',
                }}
              />
            ) : splineUrl ? (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  background: 'transparent',
                }}
              >
                {/* Ambient Glow behind Spline Robot */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 50% 60%, rgba(107, 94, 228, 0.28) 0%, rgba(243, 126, 126, 0.12) 50%, transparent 75%)',
                    filter: 'blur(20px)',
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                />
                <iframe
                  src={splineUrl}
                  title="Interactive 3D Robot Mascot"
                  loading="lazy"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    pointerEvents: 'auto',
                    zIndex: 1,
                    transform: 'scale(1.02)',
                  }}
                  allow="accelerometer; gyroscope"
                />
              </div>
            ) : (
              /* High-fidelity Gaze Tracking Character Viewport */
              <motion.div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  x: gazeX,
                  y: gazeY,
                  scale: 1.05,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
              >
                {/* Dark Luxury Ambient Radial Aura Behind Avatar */}
                <div
                  style={{
                    position: 'absolute',
                    top: '28%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '220px',
                    height: '220px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(107, 94, 228, 0.45) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 75%)',
                    filter: 'blur(24px)',
                    pointerEvents: 'none',
                  }}
                />

                <Image
                  src={imageUrl}
                  alt="Chirag Rawat — Interactive 3D Avatar"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 360px"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center bottom',
                    filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.6))',
                  }}
                />

                {/* Subtle Cinematic Vignette Inside Frame */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 50% 25%, transparent 50%, rgba(13, 13, 26, 0.6) 100%)',
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>
            )}
          </div>

          {/* Lower Cinematic Glass Label */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              padding: '12px 14px',
              borderRadius: '16px',
              background: 'rgba(20, 20, 40, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 4,
              boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.01em',
                }}
              >
                Chirag Rawat
              </div>
              <div
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--accent-2)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                }}
              >
                Senior Full-Stack &amp; AI
              </div>
            </div>

            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'var(--accent-soft)',
                border: '1px solid var(--accent-mid)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-light)',
              }}
            >
              <FiCompass size={16} />
            </div>
          </div>
        </div>

        {/* ── 3. Multi-Plane Floating Micro-Chips (Dynamic Z-Parallax, Optional) ── */}
        {showChips && (
          <>
            {/* Chip A: Top-Left Security Badge */}
            <motion.div
              style={{
                position: 'absolute',
                top: '8%',
                left: '-14px',
                x: chip1X,
                y: chip1Y,
                transform: 'translateZ(55px)',
                zIndex: 6,
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '9px',
                  padding: '8px 14px',
                  borderRadius: '14px',
                  background: 'rgba(20, 20, 40, 0.88)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5), 0 0 16px rgba(56, 189, 248, 0.15)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '8px',
                    background: 'rgba(56, 189, 248, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-2)',
                  }}
                >
                  <FiShield size={14} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.55rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Zero Vulnerabilities
                  </div>
                  <div
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      lineHeight: 1.1,
                    }}
                  >
                    Audited &amp; Scaled
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Chip B: Bottom-Right AI Workflow Badge */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '14%',
                right: '-16px',
                x: chip2X,
                y: chip2Y,
                transform: 'translateZ(65px)',
                zIndex: 6,
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '9px',
                  padding: '8px 14px',
                  borderRadius: '14px',
                  background: 'rgba(20, 20, 40, 0.88)',
                  border: '1px solid rgba(107, 94, 228, 0.45)',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(107, 94, 228, 0.22)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '8px',
                    background: 'var(--accent-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-light)',
                  }}
                >
                  <FiCpu size={14} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.55rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Production LLMs
                  </div>
                  <div
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      lineHeight: 1.1,
                    }}
                  >
                    AI Agent Systems
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Chip C: Floating Available Status Tag */}
            <motion.div
              style={{
                position: 'absolute',
                top: '-16px',
                right: '20px',
                x: chip3X,
                y: chip3Y,
                transform: 'translateZ(40px)',
                zIndex: 6,
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 11px',
                  borderRadius: '9999px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  boxShadow: '0 8px 18px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#10B981',
                    boxShadow: '0 0 8px #10B981',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.64rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    color: '#34D399',
                    letterSpacing: '0.04em',
                  }}
                >
                  AVAILABLE Q4
                </span>
              </div>
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Global Animation for Stage Spin */}
      <style jsx global>{`
        @keyframes stageSpin {
          0% { transform: rotateX(75deg) rotate(0deg); }
          100% { transform: rotateX(75deg) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
