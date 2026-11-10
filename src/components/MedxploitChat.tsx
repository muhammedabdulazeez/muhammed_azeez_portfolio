import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
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
  ChevronRight
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
    category: 'Hands-on Practice',
  },
  {
    title: 'GCP VPC Perimeter Defense',
    prompt: 'How do GCP VPC ingress firewall rules, target service accounts, and Google Cloud SCC work together to stop lateral movement?',
    category: 'Perimeter Defense',
  },
];

export function MedxploitChat() {
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

Pick a security topic below or ask me any concept you want to master. What are we investigating today?`,
      timestamp: 'ONLINE',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
        id: 'welcome-reset',
        role: 'model',
        content: `Session buffer wiped. **Medxploit** ready for new security inquiry. Type your question or select a prompt below.`,
        timestamp: 'RESET',
      },
    ]);
    setErrorMsg(null);
  };

  // Helper function to render markdown-like formatting (code blocks, bold, lists)
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeBuffer: string[] = [];
    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // Close code block
          const codeText = codeBuffer.join('\n');
          elements.push(
            <div key={`code-${idx}`} className="my-2.5 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 font-mono text-xs">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-cyan-400">
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
          // Open code block
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
          <h4 key={idx} className="text-sm font-bold text-cyan-300 mt-3 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h3 key={idx} className="text-base font-extrabold text-white mt-3.5 mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
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
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
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

  // Inline bold and code formatting helper
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
          <code key={i} className="bg-slate-950 px-1.5 py-0.5 rounded text-cyan-300 font-mono text-[11px] border border-slate-800">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <section id="medxploit" className="py-24 relative z-10 bg-slate-950/60 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/50 text-xs font-mono text-cyan-400 mb-3 shadow-md shadow-cyan-950/30">
            <Bot className="w-4 h-4 animate-pulse text-cyan-400" />
            <span className="font-bold tracking-wider">AI CYBERSECURITY MENTOR</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meet <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Medxploit</span>
          </h2>
          <p className="text-slate-400 mt-3 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            {t(
              'Your interactive AI cybersecurity instructor powered by Gemini 3.8. Ask questions about cloud defense, exploit labs, IAM zero-trust, or test your skills with dynamic CTF questions.',
              'Instruktur keamanan siber AI interaktif Anda ditenagai Gemini 3.8. Tanyakan tentang pertahanan cloud, lab eksploitasi, IAM zero-trust, atau uji kemampuan dengan simulasi CTF dinamis.'
            )}
          </p>
        </div>

        {/* Quick Topic Starter Chips */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('Instant Exploration Topics:', 'Topik Pembelajaran Cepat:')}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {STARTER_PROMPTS.map((starter, sIdx) => (
              <button
                key={sIdx}
                disabled={isLoading}
                onClick={() => handleSendMessage(starter.prompt)}
                className="group flex flex-col text-left p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900/90 shiny-border transition-all cursor-pointer disabled:opacity-50"
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] font-mono font-semibold text-cyan-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/80">
                    {starter.category}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {starter.title}
                </span>
                <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {starter.prompt}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Chat Interface Container */}
        <div className="shiny-border rounded-2xl overflow-hidden bg-slate-950/90 shadow-2xl backdrop-blur-2xl flex flex-col h-[620px] sm:h-[680px]">
          
          {/* Chat Header Bar */}
          <div className="px-4 sm:px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 flex items-center justify-center shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                    Medxploit Neural Core
                  </h3>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>GEMINI 3.8 FLASH</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  Multi-Turn Cyber Defense & Offensive Security Mentor
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
                title="Reset Conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Messages Scrollable Thread */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[92%] sm:max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-900 border border-cyan-500/50 text-cyan-400'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4 text-cyan-400" />
                  )}
                </div>

                {/* Message Body */}
                <div
                  className={`rounded-2xl p-4 text-xs sm:text-sm shadow-md ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-900/85 border border-slate-800/90 text-slate-200 rounded-tl-none shiny-border'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 text-[10px] font-mono text-slate-400 mb-1.5 pb-1 border-b border-slate-800/60">
                    <span className="font-semibold text-cyan-300">
                      {msg.role === 'user' ? 'Operator' : 'Medxploit AI'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Render Message Content with Code block and markdown support */}
                  <div className="space-y-1">
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    ) : (
                      renderFormattedContent(msg.content)
                    )}
                  </div>

                  {/* Copy message button for AI replies */}
                  {msg.role === 'model' && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Answer</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 max-w-[85%] mr-auto animate-in fade-in duration-200">
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="rounded-2xl rounded-tl-none p-4 bg-slate-900/85 border border-slate-800 shiny-border">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-300" />
                    <span>Medxploit analyzing security telemetry...</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping delay-100" />
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping delay-200" />
                  </div>
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 sm:p-4 bg-slate-900/90 border-t border-slate-800">
            {errorMsg && (
              <div className="mb-2.5 px-3 py-1.5 rounded-lg bg-red-950/80 border border-red-500/50 text-[11px] font-mono text-red-300 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span className="truncate">{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                disabled={isLoading}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isLoading
                    ? 'Medxploit neural reasoning in progress...'
                    : 'Ask about SSRF, IAM Least Privilege, Keycloak OIDC, CIS Benchmarks, or request a CTF challenge...'
                }
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-600 transition-colors disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={isLoading || !inputVal.trim()}
                className="px-4 sm:px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-40 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-cyan-500/25 transition-all cursor-pointer shrink-0"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2 px-1">
              <span>Enter to dispatch • Multi-turn conversational memory active</span>
              <span className="hidden sm:inline">Protected by Gemini 3.8 Security Matrix</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
