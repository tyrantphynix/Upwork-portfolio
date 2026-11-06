import type { Metadata } from 'next';
import TermsClient from './TermsClient';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Legal information — terms governing the use of Chirag Rawat portfolio & services.',
};

export default function TermsPage() {
  return <TermsClient />;
}
