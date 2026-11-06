'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { FiSend, FiZap, FiRefreshCw, FiMessageSquare, FiSliders, FiCalendar, FiTarget, FiEdit, FiUser, FiChevronsRight, FiChevronsLeft } from 'react-icons/fi';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

// Parses bold **text** and inline `code`
const parseInlineStyles = (text: string): React.ReactNode[] => {
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={idx}
          style={{
            background: 'var(--bg-3)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85em',
            border: '1px solid var(--border)',
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
};

const parseMarkdown = (text: string): React.ReactNode => {
  // Split by code blocks first
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.split('\n');
          const firstLine = lines[0] || '```';
          const lang = firstLine.slice(3).trim();
          const code = lines.slice(1, -1).join('\n');
          return (
            <pre
              key={index}
              style={{
                background: 'var(--bg-3)',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                overflowX: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                margin: '8px 0',
                whiteSpace: 'pre',
              }}
            >
              <code>{code}</code>
            </pre>
          );
        }

        // Process normal text lines
        const lines = part.split('\n');
        const renderedLines: React.ReactNode[] = [];
        let currentList: React.ReactNode[] = [];

        const flushList = (key: string) => {
          if (currentList.length > 0) {
            renderedLines.push(
              <ul key={`ul-${key}`} style={{ margin: '8px 0', paddingLeft: '20px', listStyleType: 'disc' }}>
                {currentList}
              </ul>
            );
            currentList = [];
          }
        };

        lines.forEach((line, lineIdx) => {
          const trimmed = line.trim();

          if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            const itemContent = line.replace(/^\s*[\*\-]\s+/, '');
            currentList.push(
              <li key={`li-${lineIdx}`} style={{ margin: '4px 0', lineHeight: 1.5 }}>
                {parseInlineStyles(itemContent)}
              </li>
            );
          } else {
            flushList(String(lineIdx));
            if (trimmed) {
              renderedLines.push(
                <p key={`p-${lineIdx}`} style={{ margin: '6px 0', lineHeight: 1.6 }}>
                  {parseInlineStyles(line)}
                </p>
              );
            } else {
              renderedLines.push(<div key={`spacer-${lineIdx}`} style={{ height: '8px' }} />);
            }
          }
        });

        flushList('end');
        return <div key={index}>{renderedLines}</div>;
      })}
    </div>
  );
};

const suggestedPrompts = [
  'What projects has Chirag built?',
  'What services do you offer?',
  'Tell me about YAU CRM.',
  'What tech stack do you use?',
  'How can I hire Chirag?',
  'Tell me about LeakAssure.',
];

const initialMessage: Message = {
  id: 'init',
  role: 'ai',
  content:
    "👋 Hi! I'm Chirag's portfolio AI assistant. I can tell you about his projects, services, tech stack, and how to get in touch. What would you like to know?",
  timestamp: new Date(),
};



export default function AIChatClient() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [activeTab, setActiveTab] = useState<'General' | 'Task AI' | 'Smart Schedule' | 'Focus Mode'>('General');
  const [inputsByTab, setInputsByTab] = useState<Record<string, string>>({
    General: '',
    'Task AI': '',
    'Smart Schedule': '',
    'Focus Mode': '',
  });

  const [activeRequests, setActiveRequests] = useState(0);
  const loading = activeRequests > 0;
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const checkTabsScroll = useCallback(() => {
    const el = tabsContainerRef.current;
    if (!el) return;
    const hasLeft = el.scrollLeft > 6;
    const hasRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 6;
    setCanScrollLeft(hasLeft);
    setCanScrollRight(hasRight);
  }, []);

  useEffect(() => {
    // Initial check and after DOM renders
    const timer = setTimeout(checkTabsScroll, 200);
    window.addEventListener('resize', checkTabsScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkTabsScroll);
    };
  }, [checkTabsScroll]);

  const handleScroll = () => {
    setIsScrolling(true);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const input = inputsByTab[activeTab] || '';

  const setInput = (value: string | ((prev: string) => string)) => {
    setInputsByTab((prev) => {
      const currentInput = prev[activeTab] || '';
      const newInput = typeof value === 'function' ? value(currentInput) : value;
      return {
        ...prev,
        [activeTab]: newInput,
      };
    });
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth', force = false) => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;

    if (force || isAtBottom) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior,
      });
    }
  };

  useEffect(() => {
    scrollToBottom('smooth', true);
  }, [messages, loading]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    scrollToBottom('auto', false);
  }, [input]);

  // Load chat history from localStorage on mount (client-side only)
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const loadedMessages = parsed.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          }));
          setMessages(loadedMessages);
        }
      } catch (e) {
        console.error('Failed to parse saved chat history:', e);
      }
    }
  }, []);

  // Save chat history to localStorage whenever messages change, or clear if empty reset
  useEffect(() => {
    if (messages.length > 1 || (messages.length === 1 && !messages[0].id.startsWith('init'))) {
      localStorage.setItem('portfolio_chat_history', JSON.stringify(messages));
    } else if (messages.length === 1 && messages[0].id.startsWith('init')) {
      localStorage.removeItem('portfolio_chat_history');
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput('');
    setActiveRequests((prev) => prev + 1);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
          activeTab,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const aiMsg: Message = {
        id: Date.now().toString(),
        role: 'ai',
        content: data.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error: any) {
      console.error('Failed to get AI response:', error);
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: 'ai',
        content: `⚠️ Sorry, I encountered an error: ${error?.message || 'Failed to fetch response'}. Please try again later.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setActiveRequests((prev) => Math.max(0, prev - 1));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const resetChat = () => {
    let tabInitMessage = initialMessage;
    if (activeTab === 'Task AI') {
      tabInitMessage = {
        id: 'init-task',
        role: 'ai',
        content: "🔧 **Task AI Mode Active.** I can help automate files, review diffs, compile tasks, or write scripts. Try asking: 'Write a bash script to automate Git commits' or 'Show me a boilerplate Dockerfile'.",
        timestamp: new Date(),
      };
    } else if (activeTab === 'Smart Schedule') {
      tabInitMessage = {
        id: 'init-schedule',
        role: 'ai',
        content: "📅 **Smart Schedule Planner.** Tell me what tasks you need to get done today, and I will build an optimized hourly plan for you! Try asking: 'Plan my 8-hour day: coding, meetings, review'.",
        timestamp: new Date(),
      };
    } else if (activeTab === 'Focus Mode') {
      tabInitMessage = {
        id: 'init-focus',
        role: 'ai',
        content: "🎯 **Focus Mode Active.** Let's break down your deep work. Tell me what you want to achieve today, and I'll set up focus intervals and micro-breaks for you.",
        timestamp: new Date(),
      };
    }
    setMessages([tabInitMessage]);
    setInput('');
  };

  const handleTabChange = (tabId: 'General' | 'Task AI' | 'Smart Schedule' | 'Focus Mode', e?: React.MouseEvent) => {
    setActiveTab(tabId);

    if (e?.currentTarget) {
      (e.currentTarget as HTMLElement).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setTimeout(checkTabsScroll, 350);
    }

    // Check if the chat history is clean (i.e., only has the welcome message, no user inputs)
    const hasUserMessages = messages.some(msg => msg.role === 'user');
    if (!hasUserMessages) {
      let tabInitMessage = initialMessage;
      if (tabId === 'Task AI') {
        tabInitMessage = {
          id: 'init-task',
          role: 'ai',
          content: "🔧 **Task AI Mode Active.** I can help automate files, review diffs, compile tasks, or write scripts. Try asking: 'Write a bash script to automate Git commits' or 'Show me a boilerplate Dockerfile'.",
          timestamp: new Date(),
        };
      } else if (tabId === 'Smart Schedule') {
        tabInitMessage = {
          id: 'init-schedule',
          role: 'ai',
          content: "📅 **Smart Schedule Planner.** Tell me what tasks you need to get done today, and I will build an optimized hourly plan for you! Try asking: 'Plan my 8-hour day: coding, meetings, review'.",
          timestamp: new Date(),
        };
      } else if (tabId === 'Focus Mode') {
        tabInitMessage = {
          id: 'init-focus',
          role: 'ai',
          content: "🎯 **Focus Mode Active.** Let's break down your deep work. Tell me what you want to achieve today, and I'll set up focus intervals and micro-breaks for you.",
          timestamp: new Date(),
        };
      }
      setMessages([tabInitMessage]);
    }
  };

  const scheduleRegex = /^(\d{1,2}:\d{2}\s*(?:AM|PM))\s*\|\s*([^|]+)\s*\|\s*(.+)$/i;

  const renderMessageContent = (content: string) => {
    const lines = content.split('\n');
    const hasSchedule = lines.some(line => scheduleRegex.test(line.trim()));

    if (!hasSchedule) {
      return parseMarkdown(content);
    }

    const elements: React.ReactNode[] = [];
    let currentParagraph = '';
    let scheduleItems: Array<{ time: string; category: string; text: string }> = [];

    const flushSchedule = (keyPrefix: string) => {
      if (scheduleItems.length > 0) {
        const colors = [
          { border: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.05)', text: '#7C3AED' }, // Violet
          { border: '#3B82F6', bg: 'rgba(59, 130, 246, 0.05)', text: '#2563EB' }, // Blue
          { border: '#06B6D4', bg: 'rgba(6, 182, 212, 0.05)', text: '#0891B2' }, // Cyan
          { border: '#10B981', bg: 'rgba(16, 185, 129, 0.05)', text: '#059669' }, // Green
          { border: '#6366F1', bg: 'rgba(99, 102, 241, 0.05)', text: '#4F46E5' }, // Indigo
          { border: '#F59E0B', bg: 'rgba(245, 158, 11, 0.05)', text: '#D97706' }, // Amber
        ];

        elements.push(
          <div key={`schedule-${keyPrefix}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '14px 0' }}>
            {scheduleItems.map((item, index) => {
              const theme = colors[index % colors.length];
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    backgroundColor: theme.bg,
                    borderLeft: `4px solid ${theme.border}`,
                    fontSize: '0.85rem',
                    lineHeight: '1.4',
                  }}
                >
                  <span style={{ fontWeight: 700, color: theme.text, width: '75px', flexShrink: 0 }}>
                    {item.time}
                  </span>
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      letterSpacing: '0.05em',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      border: `1px solid ${theme.border}`,
                      color: theme.text,
                      textTransform: 'uppercase',
                      marginRight: '8px',
                      flexShrink: 0,
                    }}
                  >
                    {item.category}
                  </span>
                  <span style={{ color: 'var(--text-primary)' }}>
                    {parseInlineStyles(item.text)}
                  </span>
                </div>
              );
            })}
          </div>
        );
        scheduleItems = [];
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      const match = trimmed.match(scheduleRegex);
      if (match) {
        if (currentParagraph) {
          elements.push(
            <div key={`p-${idx}`} style={{ margin: 0 }}>
              {parseMarkdown(currentParagraph)}
            </div>
          );
          currentParagraph = '';
        }
        scheduleItems.push({
          time: match[1],
          category: match[2],
          text: match[3],
        });
      } else {
        flushSchedule(String(idx));
        currentParagraph += line + '\n';
      }
    });

    if (currentParagraph) {
      elements.push(
        <div key="p-final" style={{ margin: 0 }}>
          {parseMarkdown(currentParagraph)}
        </div>
      );
    }
    flushSchedule('final');

    return <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>{elements}</div>;
  };

  return (
    <div
      className="ai-chat-container"
      style={{
        height: 'calc(100dvh - var(--nav-height))',
        maxWidth: '850px',
        margin: '0 auto',
        padding: '20px 20px 12px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        overflow: 'hidden',
      }}
    >
      {/* Horizontal Tabs header */}
      <div
        className="ai-chat-header-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '12px',
          gap: '8px',
          width: '100%',
        }}
      >
        {/* Clean, swipeable mode tabs */}
        <div
          ref={tabsContainerRef}
          className="scroll-x-touch ai-chat-tabs"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            padding: '2px 0',
            flexShrink: 1,
            minWidth: 0,
          }}
        >
          {[
            { id: 'General', label: 'General', icon: <FiMessageSquare size={15} /> },
            { id: 'Task AI', label: 'Task AI', icon: <FiSliders size={15} /> },
            { id: 'Smart Schedule', label: 'Smart Schedule', icon: <FiCalendar size={15} /> },
            { id: 'Focus Mode', label: 'Focus Mode', icon: <FiTarget size={15} /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={(e) => handleTabChange(tab.id as any, e)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: isActive ? '#111111' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: 500,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(0, 0, 0, 0.05)';
                    (e.currentTarget as HTMLElement).style.color = '#111111';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                  }
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={resetChat}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '9999px',
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            fontSize: '0.82rem',
            fontWeight: 500,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'var(--bg-2)';
            (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
          }}
        >
          <FiEdit size={13} />
          <span>New chat</span>
        </button>
      </div>

      {/* Message List Area */}
      <div
        ref={messagesContainerRef}
        className={`creative-scrollbar ${isScrolling ? 'is-scrolling' : ''}`}
        onScroll={handleScroll}
        data-lenis-prevent
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          overflowY: 'auto',
          paddingBottom: '16px',
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              gap: '16px',
              alignItems: 'flex-start',
              animation: 'fadeSlideIn 0.3s ease both',
            }}
          >
            {/* AI Avatar */}
            {msg.role === 'ai' && (
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#111111',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '1rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <FiZap size={16} />
              </div>
            )}

            {/* Bubble content */}
            <div
              className="ai-msg-bubble"
              style={{
                maxWidth: '75%',
                backgroundColor: msg.role === 'user' ? 'var(--bg-3)' : 'transparent',
                color: 'var(--text-primary)',
                borderRadius: msg.role === 'user' ? '20px' : '0px',
                padding: msg.role === 'user' ? '12px 18px' : '0px',
                fontSize: '0.92rem',
                lineHeight: 1.6,
              }}
            >
              {msg.role === 'ai' ? renderMessageContent(msg.content) : msg.content}
            </div>

            {/* User Avatar */}
            {msg.role === 'user' && (
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-3)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FiUser size={16} />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: '16px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#111111',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <FiZap size={16} />
            </div>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '12px 0' }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--text-muted)',
                    display: 'inline-block',
                    animation: `typingDot 1.2s infinite ${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Bottom Input Section */}
      <div
        style={{
          width: '100%',
          backgroundColor: 'var(--bg)',
          padding: '12px 0 16px 0',
          zIndex: 10,
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            width: '100%',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            backgroundColor: 'var(--surface)',
            padding: '4px 8px 4px 20px',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            pointerEvents: 'auto',
          }}
          onFocusCapture={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-strong)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          }}
          onBlurCapture={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <textarea
            ref={textareaRef}
            id="chat-input-message"
            name="chat-message"
            autoComplete="off"
            aria-label="Message Chirag AI"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => scrollToBottom('smooth', false)}
            placeholder={`Message Chirag AI...`}
            rows={1}
            data-lenis-prevent
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              outline: 'none',
              padding: '12px 0',
              fontSize: '0.92rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--text-primary)',
              resize: 'none',
              maxHeight: '200px',
              lineHeight: '1.5',
              overflowY: 'auto',
            }}
          />
          <button
            type="submit"
            className="send-btn"
            aria-label="Send message"
            disabled={!input.trim()}
            style={{
              background: input.trim() ? '#111111' : 'transparent',
              border: 'none',
              color: input.trim() ? '#ffffff' : 'var(--text-muted)',
              cursor: input.trim() ? 'pointer' : 'default',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              marginBottom: '4px',
              flexShrink: 0,
            }}
          >
            <FiSend size={16} style={{ marginLeft: input.trim() ? '-1px' : '0', marginTop: input.trim() ? '1px' : '0' }} />
          </button>
        </form>
        <div
          style={{
            textAlign: 'center',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            marginTop: '8px',
            pointerEvents: 'auto',
          }}
        >
          Chirag AI can make mistakes. Shift+Enter for new line.
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingDot {
          0%, 80%, 100% { opacity: 0.3; transform: scale(1); }
          40% { opacity: 1; transform: scale(1.3); }
        }
        .creative-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
          transition: scrollbar-color 0.3s ease;
        }
        .creative-scrollbar.is-scrolling {
          scrollbar-color: rgba(0, 0, 0, 0.15) transparent;
        }
        .creative-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .creative-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .creative-scrollbar::-webkit-scrollbar-button {
          display: none;
        }
        .creative-scrollbar::-webkit-scrollbar-thumb {
          background: transparent;
          border-radius: 99px;
          transition: background 0.3s ease;
        }
        .creative-scrollbar.is-scrolling::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
        }
        .creative-scrollbar.is-scrolling::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.35);
        }
        .send-btn {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .send-btn:hover:not(:disabled) {
          transform: scale(1.08);
          box-shadow: 0 4px 12px rgba(22, 163, 74, 0.2);
        }
        .send-btn:hover:not(:disabled) svg {
          transform: translateY(-1px) translateX(1px) rotate(-8deg);
        }
        .send-btn:active:not(:disabled) {
          transform: scale(0.92);
        }
        .send-btn svg {
          transition: transform 0.2s ease;
        }

        @media (max-width: 640px) {
          .ai-chat-container {
            padding: 14px 12px 10px 12px !important;
            gap: 12px !important;
          }
          .ai-msg-bubble {
            max-width: 88% !important;
            font-size: 0.88rem !important;
          }
          .ai-chat-header-row {
            padding-bottom: 8px !important;
            gap: 6px !important;
          }
          .ai-chat-tabs button {
            padding: 6px 12px !important;
            font-size: 0.78rem !important;
          }
        }
      `}</style>
    </div>
  );
}
