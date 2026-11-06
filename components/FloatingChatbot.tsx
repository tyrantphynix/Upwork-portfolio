'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  FiSend, FiZap, FiX, FiEdit, FiMaximize2, FiMinimize2,
  FiMessageSquare, FiUser, FiCopy, FiCheck,
} from 'react-icons/fi';

/* ── Types ───────────────────────────────────────────────────────── */
interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

/* ── Shared localStorage key (same as /ai-chat full page) ────────── */
const HISTORY_KEY = 'portfolio_chat_history';

/* ── Markdown Parser (mirrors AIChatClient) ──────────────────────── */
function parseInlineStyles(text: string): React.ReactNode[] {
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  const parts = text.split(regex);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={idx} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`'))
      return (
        <code key={idx} style={{
          background: 'var(--bg-3)', padding: '2px 6px', borderRadius: '4px',
          fontFamily: 'var(--font-mono)', fontSize: '0.85em', border: '1px solid var(--border)',
        }}>{part.slice(1, -1)}</code>
      );
    return part;
  });
}

function parseMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.split('\n');
          const code = lines.slice(1, -1).join('\n');
          return (
            <pre key={index} style={{
              background: 'var(--bg-3)', padding: '12px 16px', borderRadius: '8px',
              border: '1px solid var(--border)', overflowX: 'auto',
              fontFamily: 'var(--font-mono)', fontSize: '0.82rem', margin: '8px 0', whiteSpace: 'pre',
            }}><code>{code}</code></pre>
          );
        }
        const lines = part.split('\n');
        const rendered: React.ReactNode[] = [];
        let list: React.ReactNode[] = [];
        const flushList = (key: string) => {
          if (list.length > 0) {
            rendered.push(
              <ul key={`ul-${key}`} style={{ margin: '6px 0', paddingLeft: '20px', listStyleType: 'disc' }}>
                {list}
              </ul>
            );
            list = [];
          }
        };
        lines.forEach((line, li) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            list.push(<li key={`li-${li}`} style={{ margin: '3px 0', lineHeight: 1.5 }}>{parseInlineStyles(line.replace(/^\s*[\*\-]\s+/, ''))}</li>);
          } else {
            flushList(String(li));
            if (trimmed) rendered.push(<p key={`p-${li}`} style={{ margin: '6px 0', lineHeight: 1.6 }}>{parseInlineStyles(line)}</p>);
            else rendered.push(<div key={`sp-${li}`} style={{ height: '6px' }} />);
          }
        });
        flushList('end');
        return <div key={index}>{rendered}</div>;
      })}
    </div>
  );
}

/* ── Relative time ───────────────────────────────────────────────── */
function formatRelativeTime(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 10) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m} min ago`;
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/* ── Suggested prompts (matching /ai-chat) ───────────────────────── */
const SUGGESTED_PROMPTS = [
  'What projects has Chirag built?',
  'What services do you offer?',
  'Tell me about YAU CRM.',
  'What tech stack do you use?',
  'How can I hire Chirag?',
];

/* ── Initial message ─────────────────────────────────────────────── */
const INITIAL_MESSAGE: Message = {
  id: 'init',
  role: 'ai',
  content: "👋 Hi! I'm Chirag's portfolio AI assistant. I can tell you about his projects, services, tech stack, and how to get in touch. What would you like to know?",
  timestamp: new Date(),
};

/* ══════════════════════════════════════════════════════════════════ */
export default function FloatingChatbot() {
  const pathname = usePathname();

  /* ── Core state ─────────────────────────────────────────────────── */
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hoveredMsgId, setHoveredMsgId] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  /* ── Drag state ─────────────────────────────────────────────────── */
  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialOffsetRef = useRef({ x: 0, y: 0 });

  /* ── Refs ───────────────────────────────────────────────────────── */
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  /* ── Scroll helpers ─────────────────────────────────────────────── */
  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth', force = true) => {
    const c = messagesContainerRef.current;
    if (!c) return;
    const isAtBottom = c.scrollHeight - c.scrollTop - c.clientHeight < 120;
    if (force || isAtBottom) {
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
            behavior,
          });
        }
      }, 40);
    }
  }, []);

  useEffect(() => {
    scrollToBottom('smooth', true);
  }, [messages, loading, scrollToBottom]);

  const handleScroll = () => {
    setIsScrolling(true);
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 1000);
  };

  /* ── Open / close side-effects ──────────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => {
        textareaRef.current?.focus();
        scrollToBottom('auto', true);
      }, 100);
    } else {
      setOffset({ x: 0, y: 0 });
      setIsMaximized(false);
    }
  }, [isOpen, scrollToBottom]);

  /* ── Shared localStorage (same key as /ai-chat) ─────────────────── */
  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
        }
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 1 || (messages.length === 1 && !messages[0].id.startsWith('init'))) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
    } else if (messages.length === 1 && messages[0].id.startsWith('init')) {
      localStorage.removeItem(HISTORY_KEY);
    }
  }, [messages]);

  /* ── Listen for storage changes from /ai-chat tab ───────────────── */
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== HISTORY_KEY) return;
      if (!e.newValue) { setMessages([INITIAL_MESSAGE]); return; }
      try {
        const parsed = JSON.parse(e.newValue);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
        }
      } catch { /* ignore */ }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  /* ── Drag handlers ──────────────────────────────────────────────── */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized || typeof window !== 'undefined' && window.innerWidth < 640) return;
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialOffsetRef.current = offset;
    e.preventDefault();
  }, [isMaximized, offset]);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => setOffset({
      x: initialOffsetRef.current.x + (e.clientX - dragStartRef.current.x),
      y: initialOffsetRef.current.y + (e.clientY - dragStartRef.current.y),
    });
    const onUp = () => setIsDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [isDragging]);

  /* ── Textarea auto-resize ───────────────────────────────────────── */
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [input]);

  /* ── Send message ───────────────────────────────────────────────── */
  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: trimmed, timestamp: new Date() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);
    scrollToBottom('smooth', true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated, activeTab: 'General' }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const aiMsg: Message = { id: `ai-${Date.now()}`, role: 'ai', content: data.content, timestamp: new Date() };
      setMessages(prev => {
        const next = [...prev, aiMsg];
        if (!isOpen) setHasUnread(true);
        return next;
      });
    } catch {
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`, role: 'ai',
        content: '⚠️ Sorry, I encountered an error. Please try again later.',
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  /* ── Reset chat ─────────────────────────────────────────────────── */
  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput('');
    localStorage.removeItem(HISTORY_KEY);
  };

  /* ── Maximize toggle ────────────────────────────────────────────── */
  const toggleMaximize = () => {
    setIsMaximized(v => !v);
    setOffset({ x: 0, y: 0 });
  };

  /* ── Copy ───────────────────────────────────────────────────────── */
  const copyMessage = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch { /* ignore */ }
  };

  const hasUserMessages = messages.some(m => m.role === 'user');

  /* ── Panel dimensions by state ──────────────────────────────────── */
  const panelStyle: React.CSSProperties = isMaximized
    ? {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(1)`,
        width: 'min(820px, 90vw)',
        height: 'min(640px, 88vh)',
        bottom: 'auto',
        right: 'auto',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }
    : {
        position: 'fixed',
        bottom: '96px',
        right: '24px',
        width: 'min(420px, calc(100vw - 32px))',
        height: 'min(560px, calc(85vh - 120px))',
        top: 'auto',
        left: 'auto',
        transform: `translate(${offset.x}px, ${offset.y}px) scale(1)`,
        transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      };

  // Close / hide chatbot when mobile navigation menu is opened
  useEffect(() => {
    const handleNavChange = () => {
      if (
        document.documentElement.classList.contains('nav-mobile-open') ||
        document.body.classList.contains('nav-mobile-open')
      ) {
        setIsOpen(false);
      }
    };

    const observer = new MutationObserver(handleNavChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  /* Hide widget entirely when visiting dedicated /ai-chat page */
  if (pathname === '/ai-chat') {
    return null;
  }

  /* ══════════════════════════════════════════════════════════════════ */
  return (
    <>
      {/* ── Trigger Button ──────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(o => !o)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="floating-chatbot-trigger"
        aria-label="Toggle AI Assistant"
        style={{
          position: 'fixed', bottom: '24px', right: '24px',
          width: '56px', height: '56px', borderRadius: '50%',
          backgroundColor: '#111111', color: '#FFF', border: 'none',
          boxShadow: isHovered ? '0 12px 35px rgba(0,0,0,0.3)' : '0 8px 28px rgba(0,0,0,0.22)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 9998,
          transition: 'all 0.3s cubic-bezier(0.25,1,0.5,1)',
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? 'scale(0) translateY(12px)' : isHovered ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
          pointerEvents: isOpen ? 'none' : 'auto',
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FiMessageSquare size={22} />
          {/* Gold sparkle */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B"
            style={{ position: 'absolute', top: '11px', right: '11px', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))' }}>
            <path d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10-0-5.523-4.477-10-10-10 5.523-0 10-4.477 10-10z" />
          </svg>
          {/* Unread badge */}
          {hasUnread && (
            <span style={{
              position: 'absolute', top: '9px', right: '9px',
              width: '10px', height: '10px', borderRadius: '50%',
              backgroundColor: '#EF4444', border: '2px solid #111',
            }} />
          )}
        </div>
      </button>

      {/* ── Dim backdrop (maximized only on desktop) ────────────────── */}
      {isOpen && isMaximized && (
        <div
          onClick={() => setIsMaximized(false)}
          className="fc-desktop-backdrop"
        />
      )}

      {/* ── Chat Panel ──────────────────────────────────────────────── */}
      <div
        className={`floating-chatbot-panel ${isMaximized ? 'is-maximized' : 'is-compressed'}`}
        style={{
          ...panelStyle,
          backgroundColor: 'var(--bg)',
          borderRadius: '18px',
          boxShadow: isMaximized
            ? '0 24px 80px rgba(0,0,0,0.22)'
            : '0 16px 50px rgba(0,0,0,0.16)',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9999,
          overflow: 'hidden',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          ...(isOpen ? {} : { transform: 'translateY(28px) scale(0.95)', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }),
        }}
      >
        {/* ── Header ───────────────────────────────────────────────── */}
        <div
          onMouseDown={handleMouseDown}
          style={{
            padding: '14px 18px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg)',
            cursor: isMaximized ? 'default' : (isDragging ? 'grabbing' : 'grab'),
            userSelect: 'none',
            flexShrink: 0,
          }}
        >
          {/* Left: FiZap avatar + title (exact /ai-chat style) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              backgroundColor: '#111111', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, boxShadow: 'var(--shadow-sm)',
            }}>
              <FiZap size={16} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                Ai Assistance
              </p>
              <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                Groq · Gemini Fallback
              </p>
            </div>
          </div>

          {/* Right: 3 control buttons */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {[
              {
                icon: <FiEdit size={14} />,
                title: 'New chat',
                action: resetChat,
              },
              {
                icon: isMaximized ? <FiMinimize2 size={14} /> : <FiMaximize2 size={14} />,
                title: isMaximized ? 'Minimize' : 'Maximize',
                action: toggleMaximize,
              },
              {
                icon: <FiX size={15} />,
                title: 'Close',
                action: () => setIsOpen(false),
              },
            ].map(({ icon, title, action }) => (
              <button
                key={title}
                onClick={action}
                title={title}
                style={{
                  background: 'none', border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  width: '30px', height: '30px',
                  borderRadius: '6px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-2)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* ── Messages ─────────────────────────────────────────────── */}
        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          data-lenis-prevent
          className={`fc-scroll ${isScrolling ? 'is-scrolling' : ''}`}
          style={{
            flex: 1,
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            touchAction: 'pan-y',
            padding: '24px 20px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
          }}
        >
          {messages.map(msg => {
            const isAi = msg.role === 'ai';
            const isHov = hoveredMsgId === msg.id;

            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: isAi ? 'flex-start' : 'flex-end',
                  gap: '16px',
                  alignItems: 'flex-start',
                  animation: 'fc-fadeIn 0.3s ease both',
                }}
                onMouseEnter={() => setHoveredMsgId(msg.id)}
                onMouseLeave={() => setHoveredMsgId(null)}
              >
                {/* AI Avatar — black FiZap circle (exact /ai-chat match) */}
                {isAi && (
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    backgroundColor: '#111111', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, boxShadow: 'var(--shadow-sm)',
                  }}>
                    <FiZap size={16} />
                  </div>
                )}

                {/* Bubble */}
                <div style={{ maxWidth: '75%', position: 'relative' }}>
                  <div style={{
                    backgroundColor: isAi ? 'transparent' : 'var(--bg-3)',
                    color: 'var(--text-primary)',
                    borderRadius: isAi ? '0' : '20px',
                    padding: isAi ? '0' : '12px 18px',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                  }}>
                    {parseMarkdown(msg.content)}
                  </div>

                  {/* Copy button — AI bubbles */}
                  {isAi && (
                    <button
                      onClick={() => copyMessage(msg.id, msg.content)}
                      title="Copy message"
                      style={{
                        position: 'absolute', top: '0', right: '-26px',
                        background: 'none', border: 'none',
                        cursor: 'pointer', color: 'var(--text-muted)',
                        padding: '2px', borderRadius: '4px',
                        display: 'flex', alignItems: 'center',
                        opacity: isHov ? 1 : 0,
                        transition: 'opacity 0.2s',
                        pointerEvents: isHov ? 'auto' : 'none',
                      }}
                    >
                      {copiedId === msg.id
                        ? <FiCheck size={13} color="#22C55E" />
                        : <FiCopy size={13} />}
                    </button>
                  )}

                  {/* Message timestamp */}
                  <p
                    suppressHydrationWarning
                    style={{
                      margin: '4px 0 0',
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                      textAlign: isAi ? 'left' : 'right',
                    }}
                  >
                    {formatRelativeTime(msg.timestamp)}
                  </p>
                </div>

                {/* User Avatar */}
                {!isAi && (
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    backgroundColor: 'var(--bg-3)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <FiUser size={16} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing indicator */}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                backgroundColor: '#111111', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <FiZap size={16} />
              </div>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '12px 0' }}>
                {[0, 0.2, 0.4].map((delay, i) => (
                  <span key={i} style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    backgroundColor: 'var(--text-muted)', display: 'inline-block',
                    animation: `fc-dot 1.2s infinite ${delay}s`,
                  }} />
                ))}
              </div>
            </div>
          )}

          <div style={{ height: '1px' }} />
        </div>

        {/* ── Suggested prompts ────────────────────────────────────── */}
        {!hasUserMessages && !loading && (
          <div style={{
            padding: '4px 20px 10px',
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
          }}>
            {(isMaximized ? SUGGESTED_PROMPTS : SUGGESTED_PROMPTS.slice(0, 3)).map(prompt => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-3)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.74rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  lineHeight: '1.3',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-2)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-strong)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-3)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* ── Input ────────────────────────────────────────────────── */}
        <div style={{
          padding: '10px 20px 14px',
          backgroundColor: 'var(--bg)',
          flexShrink: 0,
        }}>
          <form
            onSubmit={e => { e.preventDefault(); sendMessage(input); }}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              border: '1px solid var(--border)',
              borderRadius: '24px',
              backgroundColor: 'var(--surface)',
              padding: '4px 8px 4px 20px',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocusCapture={e => {
              e.currentTarget.style.borderColor = 'var(--border-strong)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onBlurCapture={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <textarea
              ref={textareaRef}
              id="floating-chat-input"
              name="floating-chat-message"
              autoComplete="off"
              aria-label="Message Chirag AI"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              placeholder="Message Chirag AI..."
              rows={1}
              style={{
                flex: 1, border: 'none', background: 'transparent', outline: 'none',
                padding: '10px 0', fontSize: '0.92rem',
                fontFamily: 'var(--font-body)', color: 'var(--text-primary)',
                resize: 'none', maxHeight: '160px', lineHeight: '1.5', overflowY: 'auto',
              }}
            />
            <button
              type="submit"
              className="fc-send-btn"
              disabled={!input.trim() || loading}
              style={{
                background: input.trim() ? '#111111' : 'transparent',
                border: 'none',
                color: input.trim() ? '#fff' : 'var(--text-muted)',
                cursor: input.trim() ? 'pointer' : 'default',
                width: '34px', height: '34px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                alignSelf: 'flex-end', marginBottom: '2px', flexShrink: 0,
              }}
            >
              <FiSend size={15} style={{ marginLeft: input.trim() ? '-1px' : '0', marginTop: input.trim() ? '1px' : '0' }} />
            </button>
          </form>
          <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Shift+Enter for new line · Drag header to move
          </p>
        </div>
      </div>

      {/* ── Global styles ────────────────────────────────────────────── */}
      <style jsx global>{`
        @keyframes fc-fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fc-dot {
          0%, 80%, 100% { opacity: 0.3; transform: scale(1); }
          40% { opacity: 1; transform: scale(1.3); }
        }
        .fc-scroll {
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
          transition: scrollbar-color 0.3s;
        }
        .fc-scroll.is-scrolling {
          scrollbar-color: rgba(0,0,0,0.15) transparent;
        }
        .fc-scroll::-webkit-scrollbar { width: 6px; }
        .fc-scroll::-webkit-scrollbar-track { background: transparent; }
        .fc-scroll::-webkit-scrollbar-button { display: none; }
        .fc-scroll::-webkit-scrollbar-thumb {
          background: transparent; border-radius: 99px; transition: background 0.3s;
        }
        .fc-scroll.is-scrolling::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); }
        .fc-scroll.is-scrolling::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.3); }
        .fc-send-btn {
          transition: all 0.25s cubic-bezier(0.4,0,0.2,1) !important;
        }
        .fc-send-btn:hover:not(:disabled) {
          transform: scale(1.08);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .fc-send-btn:active:not(:disabled) { transform: scale(0.92); }
        .fc-send-btn svg { transition: transform 0.2s ease; }
        .fc-send-btn:hover:not(:disabled) svg { transform: translateY(-1px) translateX(1px) rotate(-8deg); }

        /* ── Desktop Dim Backdrop (hidden on mobile) ── */
        .fc-desktop-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.35);
          z-index: 9998;
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          transition: opacity 0.3s;
        }

        /* ── Hide completely when mobile navbar menu is open ── */
        html.nav-mobile-open .floating-chatbot-trigger,
        html.nav-mobile-open .floating-chatbot-panel,
        body.nav-mobile-open .floating-chatbot-trigger,
        body.nav-mobile-open .floating-chatbot-panel {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
          visibility: hidden !important;
          transform: scale(0) !important;
        }

        @media (max-width: 640px) {
          .fc-desktop-backdrop {
            display: none !important;
          }

          /* Normal compressed floating mode on mobile */
          .floating-chatbot-panel.is-compressed {
            width: calc(100vw - 20px) !important;
            max-width: calc(100vw - 20px) !important;
            height: min(520px, calc(100dvh - 80px)) !important;
            bottom: 12px !important;
            right: 10px !important;
            left: 10px !important;
            top: auto !important;
            transform: none !important;
            border-radius: 18px !important;
          }

          /* True 100% full screen maximized mode on mobile */
          .floating-chatbot-panel.is-maximized {
            width: 100vw !important;
            max-width: 100vw !important;
            height: 100dvh !important;
            max-height: 100dvh !important;
            inset: 0 !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            transform: none !important;
            border-radius: 0px !important;
            border: none !important;
          }

          .floating-chatbot-trigger {
            bottom: 16px !important;
            right: 16px !important;
            width: 50px !important;
            height: 50px !important;
          }
        }
      `}</style>
    </>
  );
}
