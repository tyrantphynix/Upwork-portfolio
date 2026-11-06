import type { Metadata } from 'next';
import AIChatClient from './AIChatClient';

export const metadata: Metadata = {
  title: 'AI Chat',
  description: "Chat with Chirag's portfolio AI assistant — ask about projects, services, and more.",
};

export default function AIChatPage() {
  return <AIChatClient />;
}
