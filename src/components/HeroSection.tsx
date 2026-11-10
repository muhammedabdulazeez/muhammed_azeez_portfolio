import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  ArrowRight, 
  Award, 
  ExternalLink, 
  Terminal, 
  RotateCw, 
  Move, 
  Sparkles,
  QrCode,
  Radio,
  Linkedin,
  Cpu
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const { t } = useLanguage();
  const [isPhotoFlipped, setIsPhotoFlipped] = useState(false);

  const togglePhotoFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPhotoFlipped((prev) => !prev);
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
              <span>{t('Available for Cloud Security & Red Team Roles', 'Siap untuk Posisi Keamanan Cloud & Red Team')}</span>
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
            <p className="text-base sm:text-lg text-slate-300 mb-6 max-w-2xl leading-relaxed">
              {t(
                PERSONAL_INFO.bio,
                'Analis Keamanan Cloud dan Spesialis Keamanan Ofensif berorientasi hasil dengan keahlian terbukti dalam Zero-Trust IAM, rekayasa perimeter multi-cloud (AWS & Google Cloud), serta pengujian penetrasi aplikasi web. Berpengalaman menemukan kerentanan kritis, merancang arsitektur pertahanan berlapis, dan memastikan kepatuhan regulasi GRC.'
              )}
            </p>

            {/* Social Connection Pills */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-xs text-slate-300 hover:text-white transition-all font-mono"
              >
                <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PERSONAL_INFO.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-xs text-slate-300 hover:text-white transition-all font-mono"
              >
                <span className="font-bold text-xs">𝕏</span>
                <span>@Medxploit</span>
              </a>

              <a
                href={PERSONAL_INFO.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-xs text-slate-300 hover:text-white transition-all font-mono"
              >
                <span className="font-bold text-xs text-emerald-400">M</span>
                <span>Medium Blog</span>
              </a>

              <a
                href={PERSONAL_INFO.tryhackme}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-xs text-slate-300 hover:text-white transition-all font-mono"
              >
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>TryHackMe</span>
              </a>

              <a
                href="#media-stream"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 text-xs text-emerald-300 transition-all font-mono"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>Focus Beats / Stream</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
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
                className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-slate-300 hover:text-white bg-transparent hover:bg-slate-800/40 border border-slate-800 rounded-xl transition-all w-full sm:w-auto cursor-pointer"
              >
                <span>{t('View CV', 'Lihat CV')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Terminal Command Quick Hint */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/60 border border-slate-800/80 rounded-lg px-3.5 py-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-500">$</span>
              <span>nmap -sV -sC -p- target.cloud // interactive shell below</span>
            </div>
          </div>

          {/* Right Column: Unified Single ID Badge with In-Place Flipping Photo */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Lanyard Strap at the top */}
            <div className="flex flex-col items-center pointer-events-none select-none z-20 -mb-2">
              <div className="w-4 h-12 bg-gradient-to-b from-blue-900/90 to-blue-600 border-x border-blue-400/50 shadow-md" />
              <div className="w-12 h-4 bg-gradient-to-b from-slate-400 to-slate-600 rounded-md border border-slate-300 shadow-lg flex items-center justify-center">
                <div className="w-4 h-1 bg-slate-800 rounded-full" />
              </div>
            </div>

            {/* Draggable Motion Badge Container (ONE single card in ONE place) */}
            <motion.div
              drag
              dragConstraints={{ left: -50, right: 50, top: -35, bottom: 35 }}
              dragElastic={0.15}
              whileDrag={{ scale: 1.02, cursor: 'grabbing', zIndex: 50 }}
              className="relative w-full max-w-[340px] sm:max-w-[370px] cursor-grab select-none"
            >
              {/* Outer Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur-xl opacity-35 pointer-events-none" />

              {/* Single Solid ID Card Shell */}
              <div className="shiny-border rounded-2xl overflow-hidden bg-slate-900/95 shadow-2xl backdrop-blur-xl p-3.5 relative">
                
                {/* Badge Header: Clearance and Security Id */}
                <div className="bg-slate-950/90 rounded-xl p-2.5 mb-3 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-cyan-400 font-bold text-xs">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
                        CYBER DEFENSE BADGE
                      </div>
                      <div className="text-[9px] font-mono text-slate-400">
                        AUTH-ID: 022379-SEC
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[9px] font-mono bg-red-950/80 text-red-400 px-2 py-0.5 rounded border border-red-800/80 font-bold">
                      CLEARANCE: L5
                    </span>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* IN-PLACE FLIPPING PHOTO CONTAINER (Flips in 1 single spot) */}
                {/* ========================================================= */}
                <div 
                  onClick={togglePhotoFlip}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group"
                  style={{ perspective: 1000 }}
                  title="Click or tap to flip photo"
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700 ease-out"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isPhotoFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* PHOTO FACE 1 (FRONT): Portrait */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    >
                      <img
                        src={PERSONAL_INFO.portraitImage}
                        alt="Muhammed Abdulazeez - Security Analyst"
                        className="w-full h-full object-cover object-center filter saturate-105 contrast-105"
                        referrerPolicy="no-referrer"
                      />

                      {/* Holographic Watermark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85 pointer-events-none" />

                      {/* Smartcard Gold Chip Graphic */}
                      <div className="absolute top-3 left-3 w-9 h-7 rounded bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500 p-0.5 shadow-md border border-amber-300/60 opacity-90">
                        <div className="w-full h-full border border-amber-800/40 rounded flex flex-col justify-around p-0.5">
                          <div className="h-0.5 bg-amber-800/40" />
                          <div className="h-0.5 bg-amber-800/40" />
                        </div>
                      </div>

                      {/* Biometric Active Status */}
                      <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/50 text-[10px] font-mono text-emerald-400 flex items-center gap-1 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>PORTRAIT</span>
                      </div>

                      {/* Tap to Flip Overlay Hint */}
                      <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-cyan-500/40 text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                        <RotateCw className="w-3 h-3 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
                        <span>FLIP</span>
                      </div>
                    </div>

                    {/* PHOTO FACE 2 (BACK): Workstation Terminal Photo */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-xl overflow-hidden bg-slate-950 border border-cyan-500/60"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <img
                        src={PERSONAL_INFO.workstationImage}
                        alt="Muhammed Abdulazeez at Terminal Workstation"
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />

                      {/* Scrim Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent opacity-85 pointer-events-none" />

                      {/* Workstation Active Status */}
                      <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-md px-2 py-0.5 rounded border border-cyan-500/50 text-[10px] font-mono text-cyan-300 flex items-center gap-1 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span>WORKSTATION</span>
                      </div>

                      {/* Overlaid Workstation Specs */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-slate-950/90 backdrop-blur-md border border-slate-700/80 rounded-lg p-2 shadow-lg text-[9px] font-mono space-y-0.5">
                        <div className="flex items-center justify-between text-cyan-300 font-bold">
                          <span>LIVE OPS TERMINAL</span>
                          <span className="text-emerald-400">ACTIVE</span>
                        </div>
                        <div className="text-slate-300 truncate">
                          • Rig: Offensive Pentest Lab Rig
                        </div>
                        <div className="text-slate-300 truncate">
                          • Stack: Burp Suite Pro · Kali · Keycloak
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operator Identification Block */}
                <div className="mt-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-xl p-2.5 shadow-sm">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white tracking-wide">
                      MUHAMMED O. ABDULAZEEZ
                    </span>
                    <QrCode className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-[10px] font-mono text-cyan-300 font-medium">
                    CLOUD SECURITY ANALYST · RED TEAM
                  </div>
                  <div className="text-[9px] font-mono text-slate-400 mt-1 flex items-center justify-between">
                    <span>APTECH ETHICAL HACKER</span>
                    <span>AWS & GCP CERTIFIED</span>
                  </div>
                </div>

                {/* Flip Photo Toggle Button */}
                <button
                  type="button"
                  onClick={togglePhotoFlip}
                  className="w-full mt-2 py-1.5 px-3 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{t('Click photo to flip view', 'Klik foto untuk balik tampilan')}</span>
                  </span>
                  <span className="text-[9px] font-mono bg-blue-950 text-cyan-300 px-2 py-0.5 rounded border border-blue-800">
                    {isPhotoFlipped ? 'WORKSTATION' : 'PORTRAIT'}
                  </span>
                </button>

              </div>
            </motion.div>

            {/* Interaction Helper Tag */}
            <div className="mt-3 flex items-center gap-2 text-xs font-mono text-slate-400">
              <Move className="w-3 h-3 text-cyan-400 animate-bounce" />
              <span>{t('Draggable ID badge · Tap photo to flip', 'Lencana dapat digeser · Ketuk foto untuk membalik')}</span>
            </div>

          </div>

        </div>

        {/* Bottom Quick Stats Banner */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 shiny-border rounded-2xl p-4 backdrop-blur-md hover:-translate-y-1 transition-all"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text font-mono">
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
