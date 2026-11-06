import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Web Development, App Development, React, Next.js, Express, TypeScript & JavaScript services by Chirag.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
