import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  ArrowRight, 
  FileText, 
  ExternalLink, 
  RotateCw, 
  Briefcase,
  CheckCircle2,
  Lock,
  Mail,
  Linkedin,
  Github,
  Terminal,
  QrCode,
  Bot,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenAi?: () => void;
}

export function HeroSection({ onOpenResume, onOpenAi }: HeroSectionProps) {
  const { t } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  // Stagger parent container so elements cascade in one by one
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  // Child variant for individual sequential reveal
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const statsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="home" className="relative min-h-[90vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Subtle depth illumination */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Direct, Clean Problem-Solving Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            
            {/* 1. Open to Work Status Tag */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/60 text-xs font-mono text-emerald-300 mb-5 shadow-sm shadow-emerald-950/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold">AVAILABLE FOR WORK</span>
              <span className="text-emerald-700">|</span>
              <span className="text-slate-300">Full-Time · Junior Analyst · Internships</span>
            </motion.div>

            {/* 2. Direct Problem-Solving Headline */}
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[1.15]">
              I secure cloud architectures and web applications{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-400 bg-clip-text text-transparent">
                before attackers find them.
              </span>
            </motion.h1>

            {/* 3. Role & Identity Tag */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 text-base sm:text-lg font-bold text-slate-200 mb-4">
              <span className="text-slate-400 font-normal">I'm</span>
              <span className="text-white underline decoration-emerald-500 decoration-2 underline-offset-4">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-slate-500 hidden sm:inline">·</span>
              <span className="text-emerald-400 text-sm sm:text-base font-mono font-semibold">
                Cloud Security Analyst & Offensive Pentester
              </span>
            </motion.div>

            {/* 4. Direct, Punchy Problem-Solving Bio */}
            <motion.p variants={itemVariants} className="text-sm sm:text-base text-slate-300 mb-6 max-w-2xl leading-relaxed">
              {t(
                PERSONAL_INFO.bio,
                'Saya membantu organisasi mendeteksi dan memperbaiki kerentanan keamanan sebelum dieksploitasi oleh pelaku ancaman. Menguasai IAM least-privilege AWS/GCP, Keycloak Zero-Trust MFA, dan pentesting web dengan Burp Suite. Siap berkontribusi langsung untuk peran Full-Time, Junior Analyst, atau Magang (Remote / Onsite).'
              )}
            </motion.p>

            {/* 5. Direct Core Focus Badges */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-2 w-full max-w-2xl mb-7 font-mono text-xs text-slate-300"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1611] border border-emerald-950 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>AWS & GCP IAM Least Privilege</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1611] border border-emerald-950 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Keycloak 24 Zero-Trust MFA</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1611] border border-emerald-950 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Burp Suite Pro Web AppSec</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1611] border border-emerald-950 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>120+ Students Mentored</span>
              </div>
            </motion.div>

            {/* 6. Prominent Action Buttons with Visible "Hire me / Contact" */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 mb-7 w-full sm:w-auto"
            >
              {/* Primary Visible Hire Me / Contact CTA */}
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 font-mono font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-400 hover:from-emerald-300 hover:to-lime-300 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all w-full sm:w-auto cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>{t('Hire Me / Contact', 'Rekrut Saya / Kontak')}</span>
              </a>

              {/* View Verified Projects */}
              <a
                href="#projects"
                className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-200 bg-[#101913] hover:bg-[#15231a] border border-emerald-900/70 hover:border-emerald-500/60 rounded-xl transition-all w-full sm:w-auto cursor-pointer"
              >
                <span>{t('View Case Studies', 'Lihat Studi Kasus')}</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </a>

              {/* Inspect CV */}
              <button
                type="button"
                onClick={onOpenResume}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-slate-200 bg-[#0c140f] hover:bg-[#121f18] border border-emerald-950 hover:border-emerald-800 rounded-xl transition-all w-full sm:w-auto cursor-pointer font-mono"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>{t('CV', 'CV')}</span>
              </button>

              {onOpenAi && (
                <button
                  type="button"
                  onClick={onOpenAi}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-emerald-300 bg-[#0a140f] hover:bg-[#0f1f17] border border-emerald-500/40 hover:border-emerald-400 rounded-xl transition-all w-full sm:w-auto cursor-pointer shadow-sm shadow-emerald-950/40 font-mono"
                  title="Open Medxploit AI Cybersecurity Assistant"
                >
                  <Bot className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>AI Mentor</span>
                </button>
              )}
            </motion.div>

            {/* 7. Working Social Links (GitHub, LinkedIn, Credly, TryHackMe) */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1611] hover:bg-[#121f18] border border-emerald-950 hover:border-emerald-500/50 text-xs text-slate-300 hover:text-white transition-all font-mono"
                title="GitHub: muhammedabdulazeez"
              >
                <Github className="w-3.5 h-3.5 text-emerald-400" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1611] hover:bg-[#121f18] border border-emerald-950 hover:border-emerald-500/50 text-xs text-slate-300 hover:text-white transition-all font-mono"
                title="LinkedIn: timi-azeez36"
              >
                <Linkedin className="w-3.5 h-3.5 text-emerald-400" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={PERSONAL_INFO.credly}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1611] hover:bg-[#121f18] border border-emerald-950 hover:border-emerald-500/50 text-xs text-slate-300 hover:text-white transition-all font-mono"
                title="Credly Verified Credentials"
              >
                <Shield className="w-3.5 h-3.5 text-teal-400" />
                <span>Credly</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={PERSONAL_INFO.tryhackme}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1611] hover:bg-[#121f18] border border-emerald-950 hover:border-emerald-500/50 text-xs text-slate-300 hover:text-white transition-all font-mono"
                title="TryHackMe Profile"
              >
                <Terminal className="w-3.5 h-3.5 text-lime-400" />
                <span>TryHackMe</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </motion.div>

          </motion.div>

          {/* Right Column: Stationary Hanging Lanyard ID Badge (Flips in place, border + card together) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            
            {/* Lanyard Fabric Rope & Clamp Ring (Firmly attached to top of frame) */}
            <div className="flex flex-col items-center pointer-events-none select-none z-30 -mb-3">
              {/* Fabric ribbon strap */}
              <div className="w-8 h-20 bg-gradient-to-b from-slate-900 via-neutral-900 to-black border-x border-neutral-700/80 shadow-xl flex items-center justify-center relative overflow-hidden">
                <div className="rotate-90 text-[8px] font-mono font-bold tracking-widest text-neutral-400 uppercase whitespace-nowrap">
                  MEDXPLOIT · SEC
                </div>
              </div>

              {/* Clamp Buckle */}
              <div className="w-10 h-3.5 bg-neutral-900 border border-neutral-600 rounded-sm shadow-md flex items-center justify-center">
                <div className="w-5 h-1 bg-neutral-700 rounded-full" />
              </div>

              {/* Silver Metallic Ring Hook (Threads directly through card punch slot) */}
              <div className="w-6 h-8 rounded-full border-[2.5px] border-slate-300 shadow-md -mt-1.5 z-10" />
            </div>

            {/* Stationary Card Wrapper with 3D Flip (Stays in one place, No dragging) */}
            <div
              className="relative w-full max-w-[340px] sm:max-w-[370px] select-none"
              style={{ perspective: 1200 }}
            >
              {/* Outer Ambient Glow */}
              <div className="absolute -inset-1.5 bg-emerald-500/25 rounded-[28px] blur-xl pointer-events-none" />

              {/* 3D Flip Card: The entire card (border + slot + photo) flips together in place */}
              <div
                onClick={handleCardClick}
                className="relative w-full transition-transform duration-700 ease-out cursor-pointer group"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
                title="Click card to flip 360°"
              >

                {/* FRONT FACE */}
                <div
                  className="rounded-[26px] bg-[#0d1611] border-2 border-emerald-500/60 shadow-2xl p-3 sm:p-3.5 relative flex flex-col justify-between"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {/* Card Punch Hole Slot */}
                  <div className="w-full flex items-center justify-center -mt-1 mb-2">
                    <div className="w-12 h-3 rounded-full bg-[#050807] border border-emerald-950 shadow-inner" />
                  </div>

                  {/* Inner Badge Card Shell */}
                  <div className="relative rounded-2xl overflow-hidden bg-[#080e0a] border border-emerald-950 p-3 sm:p-4 flex flex-col justify-between min-h-[440px]">
                    
                    {/* Header: Tag + School/Org accreditation */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-emerald-950">
                      <div className="inline-flex items-center gap-1.5 bg-emerald-600 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold text-slate-950 uppercase tracking-wider">
                        <span>SECURITY ANALYST</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                        <Shield className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-bold">APTECH CERTIFIED</span>
                      </div>
                    </div>

                    {/* Bold Typography Banner */}
                    <div className="my-2">
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-none font-mono">
                        CYBER DEFENDER
                      </h3>
                      <div className="text-[10px] font-mono text-emerald-400/80 tracking-wider">
                        OFFENSIVE APPSEC · ZERO-TRUST IAM
                      </div>
                    </div>

                    {/* Central Portrait Photo */}
                    <div className="relative aspect-[3/3.8] rounded-xl overflow-hidden bg-[#050807] border border-emerald-900/60 my-1 group">
                      <img
                        src={PERSONAL_INFO.portraitImage}
                        alt="Muhammed Abdulazeez - Security Analyst"
                        className="w-full h-full object-cover object-center filter saturate-105 contrast-105"
                        referrerPolicy="no-referrer"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#050807]/90 via-transparent to-transparent pointer-events-none" />

                      {/* Name Tag Badge across photo */}
                      <div className="absolute bottom-3 left-3 right-3 bg-white/95 text-slate-950 rounded-lg p-2 shadow-xl border border-slate-200">
                        <div className="text-[11px] font-bold font-mono tracking-wide text-slate-950 truncate">
                          MUHAMMED O. ABDULAZEEZ
                        </div>
                        <div className="text-[9px] font-mono text-slate-600 flex items-center justify-between">
                          <span>READY TO WORK</span>
                          <span className="text-emerald-700 font-bold">🟢 AVAILABLE</span>
                        </div>
                      </div>

                      {/* Biometric chip */}
                      <div className="absolute top-2.5 left-2.5 bg-[#050807]/90 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/40 text-[9px] font-mono text-emerald-300">
                        AUTH: 022379-SEC
                      </div>
                    </div>

                    {/* Bottom Footer Info */}
                    <div className="pt-2 border-t border-emerald-950 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span className="text-white font-bold tracking-wider">PORTFOLIO</span>
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <RotateCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                        <span>Click to Flip</span>
                      </span>
                    </div>

                  </div>
                </div>

                {/* BACK FACE */}
                <div
                  className="rounded-[26px] bg-[#0d1611] border-2 border-emerald-400/80 shadow-2xl p-3 sm:p-3.5 absolute inset-0 flex flex-col justify-between"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  {/* Card Punch Hole Slot */}
                  <div className="w-full flex items-center justify-center -mt-1 mb-2">
                    <div className="w-12 h-3 rounded-full bg-[#050807] border border-emerald-950 shadow-inner" />
                  </div>

                  {/* Inner Card Back Shell */}
                  <div className="relative rounded-2xl overflow-hidden bg-[#080e0a] border border-emerald-950 p-3 sm:p-4 flex flex-col justify-between min-h-[440px]">
                    
                    {/* Magnetic Stripe on Back */}
                    <div className="w-full h-7 bg-[#050807] rounded-lg border border-emerald-950 flex items-center px-2">
                      <div className="w-full h-2 bg-gradient-to-r from-emerald-950 via-emerald-800 to-emerald-950 rounded" />
                    </div>

                    {/* Back Header */}
                    <div className="flex items-center justify-between my-1">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        SEC-OPS WORKSTATION // 01
                      </span>
                      <span className="text-[9px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                        VERIFIED
                      </span>
                    </div>

                    {/* Workstation Laptop Photo */}
                    <div className="relative aspect-[3/3.8] rounded-xl overflow-hidden bg-[#050807] border border-emerald-900/60 my-1">
                      <img
                        src={PERSONAL_INFO.workstationImage}
                        alt="Muhammed Abdulazeez at Terminal Workstation"
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#050807]/95 via-transparent to-transparent pointer-events-none" />

                      {/* Workstation Telemetry Overlay */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#050807]/95 backdrop-blur-md rounded-lg p-2 border border-emerald-950 text-[9px] font-mono space-y-0.5">
                        <div className="text-emerald-300 font-bold flex justify-between">
                          <span>ACTIVE LAB RIG</span>
                          <span className="text-emerald-400">OPERATIONAL</span>
                        </div>
                        <div className="text-slate-300 truncate">
                          • Rig: Burp Suite Pro · Kali Linux · Docker
                        </div>
                        <div className="text-slate-400 truncate">
                          • Open to: Full-Time / Junior / Intern
                        </div>
                      </div>
                    </div>

                    {/* Back Footer */}
                    <div className="pt-2 border-t border-emerald-950 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span className="text-slate-300">REVERSE SIDE</span>
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <RotateCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                        <span>Flip Back</span>
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Flip Button Helper */}
            <div className="mt-3.5 flex items-center gap-2">
              <button
                type="button"
                onClick={handleCardClick}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0d1611] hover:bg-[#13221a] border border-emerald-500/40 hover:border-emerald-400 text-xs font-mono text-emerald-300 hover:text-emerald-200 transition-all cursor-pointer shadow-md shadow-emerald-950/40"
              >
                <RotateCw className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-180 transition-transform duration-500" />
                <span>{isFlipped ? t('Show Front Badge', 'Tampilkan Depan') : t('Flip 3D Badge', 'Balik Kartu 3D')}</span>
              </button>
            </div>

          </motion.div>

        </div>

        {/* Quick Employer Overview Metric Cards */}
        <motion.div 
          variants={statsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 pt-8 border-t border-emerald-950/80 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center"
        >
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={statItemVariants}
              className="bg-[#0a120e]/70 border border-emerald-950 rounded-2xl p-4 backdrop-blur-md hover:border-emerald-500/40 transition-all group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-300 bg-clip-text font-mono group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
