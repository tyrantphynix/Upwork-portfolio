import type { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Data Protection & Privacy — how Chirag Rawat handles your data.',
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
