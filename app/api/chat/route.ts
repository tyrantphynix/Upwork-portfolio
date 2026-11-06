import { NextRequest } from 'next/server';
import { siteConfig } from '@/config/site';

const DEFAULT_GROQ_MODEL = 'llama-3.3-70b-versatile';
const FALLBACK_GROQ_MODEL = 'llama-3.1-8b-instant';

const contactEmail = siteConfig.email;

const SYSTEM_PROMPTS = {
  General: `You are the professional portfolio AI assistant for Chirag Rawat, a Full-Stack Developer.
Your goal is to answer client questions about Chirag, his experience, projects, skills, and services in a friendly, professional, and helpful manner.

Here is the accurate and up-to-date information about Chirag:
- **Bio**: Full-Stack Developer specializing in building scalable web applications, modern SaaS, CRM platforms, and mobile apps. Bridging high-impact engineering from robust backends to pixel-perfect, interactive 3D web interfaces.
- **Skills & Tech Stack**:
  * Core languages: JavaScript, TypeScript, Python
  * Frontend: React, Next.js, HTML, CSS, Tailwind CSS, Framer Motion, GSAP, Lenis, Three.js / Spline
  * Mobile: React Native (iOS & Android)
  * Backend: Node.js, Express, REST APIs
  * Databases: MongoDB, PostgreSQL, Prisma ORM
  * Integrations & APIs: Twilio, Grasshopper, Webhooks, JWT Auth, OAuth2, LLMs & AI APIs
  * Tools: Git, GitHub (username: tyrantphynix)
- **Projects**:
  1. **YAU CRM** (Status: In Production): A full-featured CRM platform built with deep Twilio / Grasshopper integration. Key features: Inbound call & SMS routing via webhooks, Grasshopper number management, contact pipeline CRM dashboard, automated follow-up sequences, role-based access control (RBAC), and real-time activity feed. Stack: Next.js, Express, MongoDB, Twilio SDK, TypeScript, Webhooks.
  2. **LeakAssure** (Status: Live): A complete SaaS web platform offering professional leak detection services. Key features: Online booking portal, real-time job status tracking, customer account portal, powerful affiliate/commission referral management system, admin operations dashboard, and Gmail OAuth2 email alerts. Stack: React, Node.js, Express, PostgreSQL, REST API, OAuth2.
  3. **Hair Cabillo** (Status: In Development): A modern beauty and hair care web application. Key features: Appointment booking & scheduling system, product catalog & checkout, customer profiles/history, mobile-first responsive design, admin inventory control, and SEO optimization. Stack: Next.js, TypeScript, Prisma, PostgreSQL, Tailwind CSS.
  4. **ZeroBot** (Status: Active Development): An intelligent AI suite & platform integrated with modern LLMs. Real-time streaming AI chat assistant, contextual repository search, automated task execution, and multi-modal support.
- **Contact**: Chirag is open to freelance client projects and full-time engineering opportunities. Visitors can reach him via the Contact page or email him directly at ${contactEmail}.

Guidelines for your response:
1. Act as Chirag's representation/assistant. Refer to him as "Chirag" (in the third person) or "we" if referring to his team/capabilities.
2. Keep responses brief, conversational, and direct. People are reading this in a small chat widget, so avoid overly long or robotic essays.
3. Use markdown (bolding, bullet points) to make text easy to read.
4. If someone asks to hire him or contact him, direct them to the Contact page or to email ${contactEmail}.`,

  'Task AI': `You are Task AI, a technical assistant built by Chirag to help with automation, scripts, task compilation, and code review.
- Output clean, high-quality, and modern code snippets (e.g. bash scripts, typescript functions, Dockerfiles, etc.).
- Keep explanations clear and minimal unless the user asks for detailed explanations.
- Always use proper markdown syntax highlighting for code blocks.`,

  'Smart Schedule': `You are the Smart Schedule Planner. Your job is to take the user's tasks, goals, or scheduling requests and organize them into an optimized, hourly schedule.

IMPORTANT RENDERING REQUIREMENT:
You must format every line of the schedule timeline EXACTLY in the following format:
HH:MM AM/PM | CATEGORY | Task Description

Example:
09:00 AM | DEEP WORK | Focus on critical feature development
11:00 AM | MEETING | Daily stand-up and project sync
11:30 AM | REVIEW | Review pull requests and provide detailed feedback
12:30 PM | LUNCH | Recharge and step away from the screen
01:30 PM | DEEP WORK | Implement new features and fix reported bugs
03:30 PM | MEETING | Client call or team strategy discussion
04:00 PM | FOCUS | Plan for tomorrow's tasks and organize codebase
05:00 PM | BREAK | Quick wrap-up and mental reset

Guidelines:
1. Do not use bullet points (* or -) or numbered lists for the schedule lines.
2. Only write the exact format: 'Time | CATEGORY | Task details' on its own line.
3. Category should be short (e.g. DEEP WORK, MEETING, REVIEW, LUNCH, FOCUS, BREAK, PLANNING).
4. You may write brief introductory or concluding text, but keep it outside of the schedule list.`,

  'Focus Mode': `You are the Focus Mode assistant. Your job is to help the user break down their deep work goal into structured, manageable focus intervals and micro-breaks.
- Provide a clear, structured breakdown of work sessions (e.g. 25-minute Pomodoro blocks and 5-minute breaks).
- Keep the user motivated and eliminate distractions.
- Use markdown list formatting to detail the schedule/plan.`
};

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('Error: GROQ_API_KEY is not set in environment variables.');
      return Response.json(
        { error: 'Groq API Key is not configured on the server. Please check your environment variables.' },
        { status: 500 }
      );
    }

    const { messages, activeTab } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: 'Invalid request: "messages" must be an array.' },
        { status: 400 }
      );
    }

    // Determine the system instructions based on the active tab mode
    const systemPrompt = SYSTEM_PROMPTS[activeTab as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.General;

    // Filter out welcome prompts (IDs starting with 'init') from the model history
    const history = messages
      .filter((msg: any) => msg.id && !msg.id.startsWith('init'))
      .map((msg: any) => ({
        role: msg.role === 'ai' ? 'assistant' : 'user',
        content: msg.content,
      }));

    // Limit conversation context to the last 10 messages
    const limitedHistory = history.slice(-10);

    // Prepend the system instructions as the first message
    const groqMessages = [
      { role: 'system', content: systemPrompt },
      ...limitedHistory
    ];

    const modelToUse = process.env.GROQ_MODEL || DEFAULT_GROQ_MODEL;

    let response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelToUse,
        messages: groqMessages,
        temperature: 0.5,
        max_tokens: 1024,
      }),
    });

    // If the chosen model is not found/accessible, attempt a fallback to a standard model
    if (!response.ok && response.status === 404 && modelToUse !== FALLBACK_GROQ_MODEL) {
      console.warn(`Model "${modelToUse}" unavailable. Retrying with fallback "${FALLBACK_GROQ_MODEL}"...`);
      response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: FALLBACK_GROQ_MODEL,
          messages: groqMessages,
          temperature: 0.5,
          max_tokens: 1024,
        }),
      });
    }

    if (!response.ok) {
      let errorMessage = `Groq API error: ${response.statusText || response.status}`;
      try {
        const errorData = await response.json();
        if (errorData?.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch {
        const rawText = await response.text().catch(() => '');
        if (rawText) errorMessage = rawText;
      }

      console.error('Groq API returned an error:', { status: response.status, message: errorMessage });

      if (response.status === 401) {
        return Response.json(
          { error: 'Invalid or unauthorized Groq API Key. Please check GROQ_API_KEY in your .env.local file.' },
          { status: 401 }
        );
      }

      return Response.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    return Response.json({ content });
  } catch (error: any) {
    console.error('Backend handler error:', error);
    return Response.json(
      { error: error?.message || 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
