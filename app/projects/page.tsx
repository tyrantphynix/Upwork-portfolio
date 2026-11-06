import type { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Portfolio projects: YAU CRM, LeakAssure, Hair Cabillo & ZeroBot — built by Chirag.',
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
