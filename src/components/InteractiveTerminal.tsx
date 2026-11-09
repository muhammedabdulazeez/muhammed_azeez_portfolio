import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Copy, Check, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PERSONAL_INFO } from '../data/portfolioData';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'system' | 'scan';
  text: string;
  color?: string;
}

interface InteractiveTerminalProps {
  onOpenResume: () => void;
}

export function InteractiveTerminal({ onOpenResume }: InteractiveTerminalProps) {
  const { t } = useLanguage();
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'system',
      text: '[+] MUHAMMED ABDULAZEEZ SEC-CONSOLE v3.4 [PROD-READY]',
      color: 'text-cyan-400 font-bold',
    },
    {
      id: 'init-2',
      type: 'system',
      text: '[i] Zero-Trust IAM & Cloud Security Engine online. Type "help" or tap quick commands below.',
      color: 'text-slate-400',
    },
  ]);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll on new content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, isTyping]);

  // Typewriter streaming engine
  const streamLines = async (newLines: TerminalLine[]) => {
    setIsTyping(true);
    for (const line of newLines) {
      // Simulate typewriter line streaming
      await new Promise((resolve) => setTimeout(resolve, line.type === 'scan' ? 140 : 60));
      setLines((prev) => [...prev, line]);
    }
    setIsTyping(false);
  };

  const executeCommand = async (rawCmd: string) => {
    if (isTyping) return;
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Echo command into terminal
    const cmdEntry: TerminalLine = {
      id: `cmd-${Date.now()}`,
      type: 'command',
      text: rawCmd,
    };
    setLines((prev) => [...prev, cmdEntry]);

    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    if (cmd === 'help') {
      await streamLines([
        { id: `h1-${Date.now()}`, type: 'output', text: 'AVAILABLE OPERATIONS:', color: 'text-cyan-400 font-bold' },
        { id: `h2-${Date.now()}`, type: 'output', text: '  whoami    - Display professional bio & background', color: 'text-yellow-300' },
        { id: `h3-${Date.now()}`, type: 'output', text: '  skills    - Enumerate cloud & offensive toolstack', color: 'text-yellow-300' },
        { id: `h4-${Date.now()}`, type: 'output', text: '  projects  - Inspect deployed architectures & case studies', color: 'text-yellow-300' },
        { id: `h5-${Date.now()}`, type: 'output', text: '  certs     - List verified credentials (AWS, GCP, Aptech)', color: 'text-yellow-300' },
        { id: `h6-${Date.now()}`, type: 'output', text: '  scan      - Execute automated perimeter vulnerability probe', color: 'text-emerald-400 font-semibold' },
        { id: `h7-${Date.now()}`, type: 'output', text: '  cv        - Launch full resume / curriculum vitae viewer', color: 'text-cyan-300' },
        { id: `h8-${Date.now()}`, type: 'output', text: '  contact   - Display communication channels & email', color: 'text-slate-300' },
        { id: `h9-${Date.now()}`, type: 'output', text: '  clear     - Wipe current console buffer', color: 'text-slate-400' },
      ]);
      return;
    }

    if (cmd === 'whoami') {
      await streamLines([
        { id: `w1-${Date.now()}`, type: 'output', text: `NAME: ${PERSONAL_INFO.fullName}`, color: 'text-white font-bold' },
        { id: `w2-${Date.now()}`, type: 'output', text: `ROLE: ${PERSONAL_INFO.role}`, color: 'text-cyan-400 font-semibold' },
        { id: `w3-${Date.now()}`, type: 'output', text: `STATUS: ${PERSONAL_INFO.availability}`, color: 'text-emerald-400' },
        { id: `w4-${Date.now()}`, type: 'output', text: `LOCATION: ${PERSONAL_INFO.location}`, color: 'text-slate-300' },
        { id: `w5-${Date.now()}`, type: 'output', text: `MISSION: "Bridging offensive vulnerability research with resilient cloud perimeter defense."`, color: 'text-slate-400 italic' },
      ]);
      return;
    }

    if (cmd === 'skills') {
      await streamLines([
        { id: `s1-${Date.now()}`, type: 'output', text: '[+] CLOUD SECURITY: AWS IAM, GCP VPC Firewalls, Security Command Center (SCC), Policy Analyzer', color: 'text-cyan-300' },
        { id: `s2-${Date.now()}`, type: 'output', text: '[+] OFFENSIVE APPSEC: Burp Suite Pro, SSRF, XSS, Web Cache Deception, WebSockets, Kali Linux', color: 'text-cyan-300' },
        { id: `s3-${Date.now()}`, type: 'output', text: '[+] ZERO-TRUST & IAM: Keycloak 24, OAuth 2.0 / OIDC, TOTP MFA, Least-Privilege RBAC', color: 'text-cyan-300' },
        { id: `s4-${Date.now()}`, type: 'output', text: '[+] GRC & AUDITING: NDPC / NDPR 2019 Framework, CIS Benchmarks, Audit Trails', color: 'text-cyan-300' },
      ]);
      return;
    }

    if (cmd === 'projects') {
      await streamLines([
        { id: `p1-${Date.now()}`, type: 'output', text: 'VERIFIED SECURITY DEPLOYMENTS:', color: 'text-cyan-400 font-bold' },
        { id: `p2-${Date.now()}`, type: 'output', text: '1. AuthShield 360: Keycloak 24 OIDC with TOTP MFA & Flask RBAC Portal', color: 'text-white' },
        { id: `p3-${Date.now()}`, type: 'output', text: '2. GCP Least-Privilege IAM: Custom "Audit Team Reviewer" Role & Policy Verification', color: 'text-white' },
        { id: `p4-${Date.now()}`, type: 'output', text: '3. GCP VPC Perimeter Defense: Ingress Rules, Target Tags & Cloud Logging Telemetry', color: 'text-white' },
        { id: `p5-${Date.now()}`, type: 'output', text: '4. Continuous CSPM: Google SCC Threat Detection & CIS Benchmark Hardening', color: 'text-white' },
        { id: `p6-${Date.now()}`, type: 'output', text: '5. Web Hack Diaries: 55 Auth & 23 SSRF Labs Solved (Burp Suite Pro)', color: 'text-white' },
      ]);
      return;
    }

    if (cmd === 'certs') {
      await streamLines([
        { id: `c1-${Date.now()}`, type: 'output', text: 'VERIFIED ACCREDITATIONS & CREDENTIALS:', color: 'text-cyan-400 font-bold' },
        { id: `c2-${Date.now()}`, type: 'output', text: '  [✓] Smart Professional Ethical Hacking (Credit) - Aptech Computer Education', color: 'text-emerald-400' },
        { id: `c3-${Date.now()}`, type: 'output', text: '  [✓] Google Cloud Cybersecurity Certificate (Credly Verified)', color: 'text-emerald-400' },
        { id: `c4-${Date.now()}`, type: 'output', text: '  [✓] AWS Cloud Practitioner Essentials - Amazon Web Services', color: 'text-emerald-400' },
        { id: `c5-${Date.now()}`, type: 'output', text: '  [✓] AWS Identity & Access Management (IAM) + IAM Troubleshooting', color: 'text-emerald-400' },
        { id: `c6-${Date.now()}`, type: 'output', text: '  [✓] GRC (Governance, Risk & Compliance) 34h - Elevify (NDPC compliant)', color: 'text-emerald-400' },
        { id: `c7-${Date.now()}`, type: 'output', text: '  [✓] TryHackMe: Love at First Breach CTF & Hacker Holidays', color: 'text-emerald-400' },
      ]);
      return;
    }

    if (cmd === 'scan') {
      await streamLines([
        { id: `sc1-${Date.now()}`, type: 'scan', text: '[i] Initiating automated perimeter telemetry scan...', color: 'text-cyan-400 font-semibold' },
        { id: `sc2-${Date.now()}`, type: 'scan', text: '[*] Target: cloud-perimeter.internal [34.168.236.53/32]', color: 'text-slate-400' },
        { id: `sc3-${Date.now()}`, type: 'scan', text: '[*] Probing TCP ports 1-65535 with SYN stealth analysis...', color: 'text-slate-400' },
        { id: `sc4-${Date.now()}`, type: 'scan', text: '[+] Port 443/tcp OPEN: HTTPS (TLS 1.3 Strict-Transport-Security enforced)', color: 'text-emerald-400' },
        { id: `sc5-${Date.now()}`, type: 'scan', text: '[+] Port 8080/tcp OPEN: Keycloak 24 IdP (OIDC realm active & TOTP enforced)', color: 'text-emerald-400' },
        { id: `sc6-${Date.now()}`, type: 'scan', text: '[+] Port 22/tcp FILTERED: Dropped by GCP VPC Ingress Firewall policy', color: 'text-blue-400' },
        { id: `sc7-${Date.now()}`, type: 'scan', text: '[+] Port 3389/tcp FILTERED: RDP disabled per CIS 1.2.1 compliance benchmark', color: 'text-blue-400' },
        { id: `sc8-${Date.now()}`, type: 'scan', text: '[✓] AUDIT COMPLETE: 0 Unauthenticated attack paths found. Perimeter Hardened.', color: 'text-cyan-300 font-bold' },
      ]);
      return;
    }

    if (cmd === 'cv' || cmd === 'resume') {
      onOpenResume();
      await streamLines([
        { id: `cv-${Date.now()}`, type: 'output', text: '[+] Launching Curriculum Vitae document viewer modal...', color: 'text-emerald-400' },
      ]);
      return;
    }

    if (cmd === 'contact') {
      await streamLines([
        { id: `ct1-${Date.now()}`, type: 'output', text: `DIRECT EMAIL: ${PERSONAL_INFO.email}`, color: 'text-cyan-400 font-bold' },
        { id: `ct2-${Date.now()}`, type: 'output', text: `TRYHACKME: ${PERSONAL_INFO.tryhackme}`, color: 'text-slate-300' },
        { id: `ct3-${Date.now()}`, type: 'output', text: `CREDLY WALLET: ${PERSONAL_INFO.credly}`, color: 'text-slate-300' },
        { id: `ct4-${Date.now()}`, type: 'output', text: `LINKEDIN: ${PERSONAL_INFO.linkedin}`, color: 'text-slate-300' },
      ]);
      return;
    }

    if (cmd === 'download' || cmd === 'zip') {
      const link = document.createElement('a');
      link.href = '/portfolio-muhammed-abdulazeez.zip';
      link.download = 'portfolio-muhammed-abdulazeez.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      await streamLines([
        { id: `dl1-${Date.now()}`, type: 'output', text: '[+] Archiving repository assets & source files...', color: 'text-cyan-400' },
        { id: `dl2-${Date.now()}`, type: 'output', text: '[✓] Triggered browser download: portfolio-muhammed-abdulazeez.zip (3.14 MB)', color: 'text-emerald-400 font-semibold' },
        { id: `dl3-${Date.now()}`, type: 'output', text: '[i] Next: Unzip locally and run "vercel" in terminal to deploy.', color: 'text-slate-400' },
      ]);
      return;
    }

    // Default: unrecognized
    await streamLines([
      {
        id: `err-${Date.now()}`,
        type: 'output',
        text: `zsh: command not found: "${rawCmd}". Type "help" or select a quick command below.`,
        color: 'text-red-400',
      },
    ]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = inputVal;
      setInputVal('');
      executeCommand(val);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickCommands = ['whoami', 'scan', 'skills', 'projects', 'certs', 'download', 'cv', 'help', 'clear'];

  return (
    <section id="terminal" className="py-20 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-xs font-mono text-cyan-400 mb-3">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>{t('INTERACTIVE OPS TERMINAL', 'KONSOL OPERASI INTERAKTIF')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t('Live Security Console', 'Konsol Keamanan Langsung')}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            {t(
              'Dynamic typewriter terminal emulator. Tap a quick command or type in the prompt to interact.',
              'Emulator terminal dengan efek typewriter interaktif. Ketuk tombol pintas atau ketik langsung di shell.'
            )}
          </p>
        </div>

        {/* Quick Command Pills for Mobile / Desktop */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-4">
          <span className="text-[11px] font-mono text-slate-500 mr-1 flex items-center gap-1">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>{t('Quick Run:', 'Pintas:')}</span>
          </span>
          {quickCommands.map((qCmd) => (
            <button
              key={qCmd}
              disabled={isTyping}
              onClick={() => executeCommand(qCmd)}
              className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-cyan-300 hover:text-white border border-slate-800 hover:border-cyan-500/50 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              ${qCmd}
            </button>
          ))}
        </div>

        {/* Terminal Window Frame */}
        <div className="rounded-2xl overflow-hidden bg-slate-950/95 border border-slate-800 shadow-2xl backdrop-blur-xl font-mono text-xs sm:text-sm">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-900/90 border-b border-slate-800">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80" />
              <span className="text-[11px] sm:text-xs text-slate-400 ml-1.5 sm:ml-2 truncate max-w-[150px] sm:max-w-none">
                muhammed@sec-ops:~
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isTyping && (
                <div className="flex items-center gap-1.5 text-[11px] text-cyan-400 animate-pulse mr-2">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span className="hidden sm:inline">EXECUTING...</span>
                </div>
              )}
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-400 bg-slate-950 px-2 py-1 rounded border border-slate-800 transition-colors"
                title="Copy contact email"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

          {/* Terminal Screen / Output Buffer */}
          <div className="p-3 sm:p-5 md:p-6 space-y-2.5 min-h-[220px] max-h-[340px] sm:max-h-[380px] overflow-y-auto overflow-x-hidden">
            {lines.map((line) => (
              <div key={line.id} className="leading-relaxed break-words">
                {line.type === 'command' ? (
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-cyan-400 font-semibold shrink-0">muhammed:~$</span>
                    <span className="text-white font-semibold">{line.text}</span>
                  </div>
                ) : (
                  <div className={line.color || 'text-slate-300'}>
                    {line.text}
                  </div>
                )}
              </div>
            ))}

            {/* Blinking typewriter caret during execution */}
            {isTyping && (
              <div className="flex items-center gap-1 text-cyan-400">
                <span className="w-2 h-4 bg-cyan-400 animate-pulse inline-block" />
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Interactive Input Bar */}
          <div className="flex items-center gap-2 p-2.5 sm:p-3.5 bg-slate-900/60 border-t border-slate-800/80">
            <span className="text-cyan-400 font-semibold shrink-0 text-xs sm:text-sm">
              <span className="hidden sm:inline">muhammed@sec-ops:~$</span>
              <span className="sm:hidden">sec:~$</span>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              disabled={isTyping}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isTyping ? "Streaming output..." : "Type 'scan', 'whoami', 'skills', 'help'..."}
              className="w-full bg-transparent text-white focus:outline-none placeholder:text-slate-600 text-xs sm:text-sm disabled:opacity-50"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              disabled={isTyping || !inputVal.trim()}
              onClick={() => {
                if (!inputVal.trim()) return;
                const val = inputVal;
                setInputVal('');
                executeCommand(val);
              }}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-cyan-400 disabled:opacity-40 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors shrink-0"
              title="Execute"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
