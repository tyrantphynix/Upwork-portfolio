import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Chirag — Full-Stack Developer building web, mobile & AI-integrated products.',
};

import AboutClient from './AboutClient';

export default function AboutPage() {
  return <AboutClient />;
}
