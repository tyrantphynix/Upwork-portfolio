import type { Metadata } from 'next';
import ContributeClient from './ContributeClient';

export const metadata: Metadata = {
  title: 'Contribute',
  description: 'Ways to contribute — collaborate, refer, open source, or sponsor projects by Chirag.',
};

export default function ContributePage() {
  return <ContributeClient />;
}
