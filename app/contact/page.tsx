import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Chirag — chirag.rawat1000@gmail.com — for projects, freelance work, or collaborations.',
};

export default function ContactPage() {
  return <ContactClient />;
}
