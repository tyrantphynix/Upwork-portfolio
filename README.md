# Chirag Rawat — Personal Portfolio & Freelancer Platform

A modern, high-end personal portfolio web application built with **Next.js 16**, **TypeScript**, **GSAP**, **Lenis**, and **Tailwind CSS v4**.

---

## 🎨 Theme & Design System

- **Color Palette**: Indigo Cosmos Editorial Theme (`#0D0D1A` deep space dark mode default, `#6B5EE4` electric indigo accent, `#38BDF8` cyan pulse, and integrated Light Mode toggle).
- **Aesthetic**: Luxury magazine editorial layout with smooth rounded cards, cosmic indigo glow accents, and interactive components.

---

## 🔤 Typography & Font Families

The application uses a curated luxury font stack loaded dynamically via `next/font/google`:

| Font Family | Variable | Type | Usage |
| :--- | :--- | :--- | :--- |
| **Cormorant Garamond** | `--font-cormorant` | Serif | Luxury display headings, main hero text (`FREELANCE`), section titles |
| **DM Sans** | `--font-dm-sans` | Sans-Serif | Clean, modern body text, subheadings, paragraphs, UI text |
| **Syne** | `--font-syne` | Display Sans | Bold architectural heading alternative |
| **JetBrains Mono** | `--font-jetbrains-mono` | Monospace | Section badges, chips, code symbols, technical metrics |

---

## 📜 Animation & Scrolling Architecture

| Library | Version | Role & Implementation |
| :--- | :--- | :--- |
| **Lenis Smooth Scroll** | `^1.3.25` | Activated in `components/SmoothScroll.tsx`. Provides 1.2s cubic-bezier inertia momentum scrolling synchronized with GSAP's ticker loop (`lenis.raf(time * 1000)`). |
| **GSAP & ScrollTrigger** | `^3.15.0` | Powers scroll-triggered entrance reveals (`components/ScrollReveal.tsx`), stagger animations, and navbar scroll state triggers. |
| **@gsap/react** | `^2.1.2` | GSAP React context wrapper for clean memory cleanup (`ctx.revert()`). |
| **Framer Motion** | `^12.42.2` | Component gesture & motion transitions. |
| **React Type Animation** | `^3.2.0` | Typing animation effects. |

### 🛠 Scroll & Preloader Synchronization:
- **`scrollRestoration = 'manual'`**: Prevents browser auto-scrolling to cached scroll offsets on reload.
- **Top Reset (`scrollTo(0,0)`)**: Forces initial page landing to `(0,0)` so navbar and hero text remain in their exact default positions.
- **Body Overflow Unlock**: Locks `document.body.style.overflow = 'hidden'` during preloader, then smoothly unlocks scrolling upon preloader exit fade.

---

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🛠 Tech Stack Overview

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS custom properties (`globals.css`) + Tailwind CSS v4
- **Animations**: GSAP & ScrollTrigger, Framer Motion
- **Smooth Scroll**: Lenis Smooth Scroll
- **Fonts**: Next.js Google Fonts (`next/font`)
