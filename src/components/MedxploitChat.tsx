import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Copy, 
  Check, 
  ShieldAlert, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Flame, 
  Lock, 
  ExternalLink,
  ChevronRight,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

const STARTER_PROMPTS = [
  {
    title: 'SSRF Attack Vector',
    prompt: 'Explain Server-Side Request Forgery (SSRF), how attackers exploit cloud metadata (169.254.169.254), and how to remediate it with IMDSv2.',
    category: 'Offensive AppSec',
  },
  {
    title: 'AWS IAM Least Privilege',
    prompt: 'How do you design a true least-privilege IAM policy in AWS, and how do permission boundaries prevent privilege escalation?',
    category: 'Cloud Security',
  },
  {
    title: 'Keycloak OIDC & MFA',
    prompt: 'Break down the OAuth 2.0 / OIDC Authorization Code Flow with PKCE in Keycloak 24, and explain how TOTP MFA protects session tokens.',
    category: 'Zero-Trust IAM',
  },
  {
    title: 'Web Cache Deception',
    prompt: 'What is Web Cache Deception, how does path delimiter normalization discrepancy lead to account takeover, and how do CDNs defend against it?',
    category: 'Advanced WebSec',
  },
  {
    title: 'Interactive CTF Challenge',
    prompt: 'Give me a simulated CTF web application scenario. Describe a vulnerable login and profile system and challenge me to find the flaw.',
    category: 'Hands-on CTF',
  },
  {
    title: 'GCP VPC Perimeter Defense',
    prompt: 'How do GCP VPC ingress firewall rules, target service accounts, and Google Cloud SCC work together to stop lateral movement?',
    category: 'Perimeter Defense',
  },
];

interface MedxploitDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MedxploitDrawer({ isOpen, onClose }: MedxploitDrawerProps) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content: `Greetings, Operator. I am **Medxploit**, your dedicated AI cybersecurity mentor and ethical hacking tutor.

I specialize in:
- **Cloud Perimeter Defense**: AWS IAM least privilege, GCP VPC firewalls, and continuous CSPM.
- **Offensive Web AppSec**: OWASP Top 10, SSRF, XSS, Web Cache Deception, and Burp Suite analysis.
- **Zero-Trust Identity**: Keycloak 24, OAuth 2.0 / OIDC Authorization Code with PKCE, and TOTP MFA.
- **Audit & Compliance**: CIS benchmarks and NDPC / NDPR 2019 regulatory governance.

Pick an instant topic above or ask me any question about cybersecurity, offensive pentesting, or Muhammed's verified skills!`,
      timestamp: 'ONLINE',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isLoading) return;

    setErrorMsg(null);
    setInputVal('');

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build conversation history payload
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: historyPayload,
          message: query,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();
      const modelReply: ChatMessage = {
        id: `mod-${Date.now()}`,
        role: 'model',
        content: data.reply || 'No response returned from the security matrix.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelReply]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMsg(
        err?.message || 'Unable to establish link with Medxploit neural core. Please verify API configuration.'
      );
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'model',
          content: `⚠️ **Security Connection Interrupted**: ${err?.message || 'Failed to reach backend server. Please verify your internet uplink or API credentials.'}`,
          timestamp: 'ERROR',
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleKeyDownInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        role: 'model',
        content: 'Console buffer purged. Ready for fresh cybersecurity instruction or technical analysis.',
        timestamp: 'RESET',
      },
    ]);
    setErrorMsg(null);
  };

  // Markdown renderer helper
  const renderMessageContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];

    lines.forEach((line, idx) => {
      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          const codeText = codeBuffer.join('\n');
          elements.push(
            <div key={`code-${idx}`} className="my-2.5 rounded-xl overflow-hidden bg-[#050807] border border-emerald-950 font-mono text-xs">
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#0b100d] border-b border-emerald-950 text-[11px] text-emerald-400">
                <span>TERMINAL PAYLOAD / CODE</span>
                <button
                  type="button"
                  onClick={() => handleCopy(`code-${idx}`, codeText)}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedId === `code-${idx}` ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 text-slate-200 overflow-x-auto whitespace-pre-wrap">{codeText}</pre>
            </div>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeBuffer = [];
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // Headers
      if (line.startsWith('### ')) {
        elements.push(
          <h4 key={idx} className="text-sm font-bold text-emerald-300 mt-3 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h3 key={idx} className="text-base font-extrabold text-white mt-3.5 mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{line.replace('## ', '')}</span>
          </h3>
        );
        return;
      }

      // Bullet points
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const bulletText = line.substring(2);
        elements.push(
          <div key={idx} className="flex items-start gap-2 my-1 text-xs sm:text-sm text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
            <div>{renderInlineFormatting(bulletText)}</div>
          </div>
        );
        return;
      }

      // Blank line
      if (line.trim() === '') {
        elements.push(<div key={idx} className="h-2" />);
        return;
      }

      // Regular paragraph
      elements.push(
        <p key={idx} className="my-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {renderInlineFormatting(line)}
        </p>
      );
    });

    return elements;
  };

  const renderInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="text-white font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="bg-[#050807] px-1.5 py-0.5 rounded text-emerald-300 font-mono text-[11px] border border-emerald-950">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Sliding Side Panel Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-2xl h-full bg-[#070b09] border-l border-emerald-950/90 shadow-2xl z-10 flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="px-5 py-4 border-b border-emerald-950 bg-[#09100c] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-lime-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-950/60">
                  <div className="w-full h-full bg-[#070b09] rounded-[10px] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-emerald-400 animate-pulse" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white font-mono flex items-center gap-1.5">
                      <span>MEDXPLOIT</span>
                      <span className="text-emerald-400">AI</span>
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>ONLINE</span>
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400">
                    Gemini 3.8 Flash Neural Core · Cyber Mentor
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-2 text-slate-400 hover:text-white bg-[#0e1612] hover:bg-emerald-950/70 border border-emerald-950 rounded-lg transition-colors cursor-pointer"
                  title="Purge session memory"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white bg-[#0e1612] hover:bg-red-950/60 border border-emerald-950 rounded-lg transition-colors cursor-pointer"
                  title="Close panel (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Starter Chips Header */}
            <div className="px-5 py-3 border-b border-emerald-950/80 bg-[#070b09] shrink-0">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mb-2">
                <Flame className="w-3.5 h-3.5 text-lime-400" />
                <span>{t('Instant Exploration Topics:', 'Topik Pembelajaran Cepat:')}</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
                {STARTER_PROMPTS.map((starter, sIdx) => (
                  <button
                    key={sIdx}
                    disabled={isLoading}
                    onClick={() => handleSendMessage(starter.prompt)}
                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e1612] hover:bg-[#14231b] border border-emerald-950 hover:border-emerald-500/50 text-xs font-mono text-slate-300 hover:text-emerald-300 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <span className="text-[10px] text-emerald-400 font-bold">[{starter.category}]</span>
                    <span>{starter.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#050807]/90 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs sm:text-sm ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-lg bg-emerald-950/90 border border-emerald-800/80 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-md ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-slate-950 font-medium rounded-tr-none'
                        : 'bg-[#0b120e] text-slate-200 border border-emerald-950 rounded-tl-none font-sans'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 pb-1 mb-1.5 border-b border-emerald-950/40 text-[10px] font-mono">
                      <span className={msg.role === 'user' ? 'text-slate-950 font-bold' : 'text-emerald-400 font-bold'}>
                        {msg.role === 'user' ? 'OPERATOR' : 'MEDXPLOIT CORE'}
                      </span>
                      <span className={msg.role === 'user' ? 'text-slate-900' : 'text-slate-400'}>
                        {msg.timestamp}
                      </span>
                    </div>

                    <div className="leading-relaxed">
                      {msg.role === 'user' ? msg.content : renderMessageContent(msg.content)}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 text-xs sm:text-sm justify-start">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/90 border border-emerald-800/80 flex items-center justify-center text-emerald-400 shrink-0">
                    <Bot className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-[#0b120e] text-slate-300 border border-emerald-950 rounded-2xl rounded-tl-none px-4 py-3 font-mono flex items-center gap-2 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Analyzing threat vectors with Gemini neural core...</span>
                  </div>
                </div>
              )}

              <div ref={scrollRef} />
            </div>

            {/* Input Bar Footer */}
            <div className="p-4 border-t border-emerald-950 bg-[#09100c] shrink-0">
              <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    disabled={isLoading}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDownInput}
                    placeholder="Ask about SSRF, IAM, PortSwigger labs, CTFs..."
                    className="w-full bg-[#050807] border border-emerald-950 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 font-mono transition-all pr-10"
                  />
                  {inputVal && (
                    <button
                      type="button"
                      onClick={() => setInputVal('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!inputVal.trim() || isLoading}
                  className="px-4 py-3 bg-gradient-to-r from-emerald-500 via-teal-400 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-slate-950 font-bold rounded-xl shadow-md shadow-emerald-950/50 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs font-mono">SEND</span>
                </button>
              </form>

              <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Press Enter to send · Powered by Google Gemini</span>
                <span className="text-emerald-400/90 font-semibold">Strict Ethical Guidelines Enforced</span>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Default export for backward compatibility
export const MedxploitChat = MedxploitDrawer;
