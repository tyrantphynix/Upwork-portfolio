import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import Preloader from '@/components/Preloader';
import SmoothScroll from '@/components/SmoothScroll';
import FloatingChatbot from '@/components/FloatingChatbot';
import { siteConfig } from '@/config/site';

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
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
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
