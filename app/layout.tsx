import type { Metadata } from 'next';
import { Syne, DM_Sans, JetBrains_Mono, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import Preloader from '@/components/Preloader';
import SmoothScroll from '@/components/SmoothScroll';
import FloatingChatbot from '@/components/FloatingChatbot';
import { siteConfig } from '@/config/site';

/* ── Luxury Font Stack ─────────────────────────────────────────── */

/* Display serif — elegant, high-fashion feel for hero & section headings */
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

/* Heading sans — bold, architectural headings */
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['700', '800'],
});

/* Body — clean, modern, premium sans-serif */
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

/* Mono — for labels, badges, code */
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Chirag Rawat — Full-Stack Developer',
    template: '%s | Chirag Rawat',
  },
  description:
    'Full-Stack Developer specializing in Web, Mobile, and AI-integrated applications. Building high-performance SaaS, CRM platforms & modern web experiences.',
  keywords: ['Full-Stack Developer', 'React', 'Next.js', 'React Native', 'TypeScript', 'Node.js', 'AI Integration', 'Chirag Rawat'],
  authors: [{ name: 'Chirag Rawat', url: siteConfig.mailto }],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Chirag Rawat — Full-Stack Developer',
    description: 'Building scalable web, mobile & AI applications.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${cormorantGaramond.variable} ${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('portfolio_theme');
                  if (saved === 'light' || saved === 'dark') {
                    document.documentElement.setAttribute('data-theme', saved);
                  } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <Preloader />
        <SmoothScroll>
          <CursorGlow />
          <Navbar />
          <main style={{ paddingTop: 'var(--nav-height)' }}>{children}</main>
          <Footer />
          <FloatingChatbot />
        </SmoothScroll>
      </body>
    </html>
  );
}
