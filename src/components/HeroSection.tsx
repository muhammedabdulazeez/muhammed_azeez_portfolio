import { useState } from 'react';
import { Shield, ArrowRight, Award, Lock, ExternalLink, Terminal, Cpu, Sparkles, RefreshCw } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const { t } = useLanguage();
  const [isAiMode, setIsAiMode] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  const toggleAvatar = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setIsAiMode((prev) => !prev);
      setIsGlitching(false);
    }, 180);
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-600/15 via-cyan-500/15 to-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Intro & Headline */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 mb-6 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-emerald-400 font-medium">ONLINE</span>
              <span className="text-slate-600">|</span>
              <span>{t('Available for Cloud Security & Red Team Engagements', 'Siap untuk Posisi Keamanan Cloud & Red Team')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              {t("Hi, I'm", 'Halo, Saya')}{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            {/* Sub-headline / Title */}
            <p className="text-xl sm:text-2xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-cyan-400 shrink-0" />
              <span>{t(PERSONAL_INFO.role, 'Analis Keamanan Cloud & Spesialis Keamanan Ofensif')}</span>
            </p>

            {/* Narrative Professional Bio */}
            <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
              {t(
                PERSONAL_INFO.bio,
                'Analis Keamanan Cloud dan Spesialis Keamanan Ofensif berorientasi hasil dengan keahlian terbukti dalam Zero-Trust IAM, rekayasa perimeter multi-cloud (AWS & Google Cloud), serta pengujian penetrasi aplikasi web. Berpengalaman menemukan kerentanan kritis, merancang arsitektur pertahanan berlapis, dan memastikan kepatuhan regulasi GRC.'
              )}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
              >
                <span>{t('Explore Projects', 'Lihat Proyek')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#certificates"
                className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500/50 rounded-xl transition-all w-full sm:w-auto"
              >
                <Award className="w-4 h-4 text-cyan-400" />
                <span>{t('Verified Certificates', 'Sertifikat Terverifikasi')}</span>
              </a>

              <button
                onClick={onOpenResume}
                className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-slate-300 hover:text-white bg-transparent hover:bg-slate-800/40 border border-slate-800 rounded-xl transition-all w-full sm:w-auto"
              >
                <span>{t('View CV', 'Lihat CV')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Terminal Command Hint */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/60 border border-slate-800/80 rounded-lg px-3.5 py-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-500">$</span>
              <span>nmap -sV -sC -p- target.cloud // interactive shell below</span>
            </div>
          </div>

          {/* Right Column: Flashy Interactive Hacker AI Avatar Card */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Outer cyber glow aura */}
              <div className={`absolute -inset-2 rounded-3xl blur-2xl transition-all duration-700 pointer-events-none ${
                isAiMode 
                  ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 opacity-70 animate-pulse' 
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 opacity-40'
              }`} />

              {/* Main portrait glass container */}
              <div 
                onClick={toggleAvatar}
                onMouseEnter={() => {}}
                className="relative rounded-2xl overflow-hidden bg-slate-900/95 border border-slate-700/80 hover:border-cyan-400/70 shadow-2xl backdrop-blur-xl p-3 cursor-pointer group select-none transition-all duration-300"
                title="Tap or click to toggle Hacker AI Avatar mode"
              >
                
                {/* Header card indicator bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-3 bg-slate-950/80 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {isAiMode ? 'hacker_ai_avatar.cyber' : 'muhammed_portrait.sec'}
                  </span>
                  <div className={`flex items-center gap-1 text-[11px] font-mono font-semibold ${isAiMode ? 'text-purple-400 animate-pulse' : 'text-cyan-400'}`}>
                    <Cpu className="w-3 h-3" />
                    <span>{isAiMode ? 'NEURAL_AI' : 'BIOMETRIC'}</span>
                  </div>
                </div>

                {/* Portrait Frame with interactive image switch */}
                <div className={`relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 transition-all duration-300 ${isGlitching ? 'brightness-150 contrast-125' : ''}`}>
                  
                  {/* Photo Image (Real or AI) */}
                  <img
                    src={isAiMode ? PERSONAL_INFO.hackerAiImage : PERSONAL_INFO.portraitImage}
                    alt={isAiMode ? "Muhammed Abdulazeez - Hacker AI Persona" : "Muhammed Abdulazeez - Cloud Security Analyst"}
                    className={`w-full h-full object-cover object-center filter saturate-105 contrast-105 transition-all duration-500 group-hover:scale-105 ${
                      isGlitching ? 'scale-110 filter blur-[1px]' : ''
                    }`}
                    referrerPolicy="no-referrer"
                  />

                  {/* Cyber Matrix scanline effect in AI Mode */}
                  {isAiMode && (
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-purple-600/15 pointer-events-none mix-blend-overlay" />
                  )}

                  {/* Gradient bottom scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85" />

                  {/* Holographic interactive touch trigger tag on top */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-md border ${
                      isAiMode
                        ? 'bg-purple-950/90 text-purple-300 border-purple-500/60'
                        : 'bg-slate-950/90 text-cyan-300 border-cyan-500/50'
                    }`}>
                      <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
                      <span>{isAiMode ? 'HACKER AI MATRIX [ACTIVE]' : 'REALITY PROFILE'}</span>
                    </div>

                    <div className="bg-slate-950/90 px-2 py-1 rounded-md text-[10px] font-mono text-cyan-400 border border-slate-800 flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>TOUCH TO SWITCH</span>
                    </div>
                  </div>

                  {/* Overlaid credentials banner */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-lg">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-white">
                        {isAiMode ? 'Cyber Threat Intelligence AI' : 'Muhammed O. Abdulazeez'}
                      </span>
                      <span className="text-cyan-400 font-mono text-[11px]">
                        {isAiMode ? 'SYS_UID: 0xDEADBEEF' : 'ID: 022379'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span>{isAiMode ? 'Adversary Simulation' : 'Ethical Hacker (Aptech)'}</span>
                      <span>·</span>
                      <span>{isAiMode ? 'Red Team Operator' : 'GCP & AWS Security'}</span>
                    </div>
                  </div>
                </div>

                {/* Floating interactive tap button */}
                <div className="mt-3 flex items-center justify-center">
                  <div className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border border-cyan-500/50 flex items-center justify-center gap-2 text-xs font-mono text-cyan-300 group-hover:text-white group-hover:border-cyan-400 transition-all shadow-md shadow-cyan-950/40">
                    <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span className="font-semibold">
                      {isAiMode 
                        ? t('Tap to Return to Real Photo', 'Sentuh untuk Kembali ke Foto Asli') 
                        : t('⚡ Touch / Tap for Hacker AI Persona', '⚡ Sentuh untuk Beralih ke Hacker AI')}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Bottom Quick Stats Banner */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 backdrop-blur-sm hover:border-slate-700 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text font-mono">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// Add tiny Zap icon helper
function Zap({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
