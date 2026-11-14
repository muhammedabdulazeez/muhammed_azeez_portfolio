import { useState } from 'react';
import { ArrowRight, FileText, ExternalLink, RotateCw, Github, Linkedin, Shield } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <section id="home" className="pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Direct Intro */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <p className="text-xs font-mono uppercase tracking-wider text-red-500 font-semibold mb-3">
              {PERSONAL_INFO.availability}
            </p>

            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-[1.12] max-w-2xl">
              {PERSONAL_INFO.headline}
            </h1>

            <p className="text-base sm:text-lg font-medium text-neutral-200 mb-3">
              {PERSONAL_INFO.name} · <span className="text-neutral-400">{PERSONAL_INFO.role}</span>
            </p>

            <p className="text-sm sm:text-base text-neutral-400 mb-7 max-w-xl leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>

            {/* Primary Actions */}
            <div className="flex flex-wrap items-center gap-3 mb-7 w-full sm:w-auto">
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg w-full sm:w-auto"
              >
                <span>Hire Me / Contact</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#projects"
                className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg w-full sm:w-auto"
              >
                <span>View Projects</span>
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg w-full sm:w-auto cursor-pointer"
              >
                <FileText className="w-4 h-4 text-red-500" />
                <span>Resume / CV</span>
              </button>
            </div>

            {/* Verified External Links */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
              <a
                href={PERSONAL_INFO.githubProjects}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-neutral-200 hover:text-red-500"
              >
                <Github className="w-3.5 h-3.5 text-red-500" />
                <span>GitHub Projects</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <span aria-hidden="true" className="text-neutral-700">/</span>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-neutral-200 hover:text-red-500"
              >
                <Linkedin className="w-3.5 h-3.5 text-red-500" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <span aria-hidden="true" className="text-neutral-700">/</span>

              <a
                href={PERSONAL_INFO.credly}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-neutral-200 hover:text-red-500"
              >
                <Shield className="w-3.5 h-3.5 text-red-500" />
                <span>Credly</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Stationary Hanging Lanyard ID Badge (Click to Flip Front/Back) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            {/* Lanyard Strap & Clamp */}
            <div className="flex flex-col items-center pointer-events-none select-none z-20 -mb-3">
              <div className="w-8 h-16 bg-neutral-900 border-x border-neutral-700 flex items-center justify-center overflow-hidden">
                <div className="rotate-90 text-[8px] font-mono font-semibold tracking-widest text-neutral-400 uppercase whitespace-nowrap">
                  MEDXPLOIT
                </div>
              </div>
              <div className="w-10 h-3 bg-neutral-800 border border-neutral-600 rounded-sm" />
              <div className="w-5 h-7 rounded-full border-2 border-neutral-300 -mt-1 z-10" />
            </div>

            {/* Flip Card Container */}
            <div
              className="relative w-full max-w-[320px] sm:max-w-[340px] select-none"
              style={{ perspective: 1200 }}
            >
              <div
                onClick={handleCardClick}
                className="relative w-full cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
                title="Click badge to view back side"
              >
                {/* FRONT FACE */}
                <div
                  className="rounded-2xl bg-[#101010] border-2 border-red-600/80 p-3 flex flex-col justify-between"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <div className="w-full flex items-center justify-center -mt-0.5 mb-2">
                    <div className="w-12 h-2.5 rounded-full bg-[#070707] border border-neutral-800" />
                  </div>

                  <div className="rounded-xl bg-[#070707] border border-neutral-800 p-3 flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-[10px] font-mono">
                      <span className="bg-red-600 text-white px-2 py-0.5 rounded font-semibold uppercase">
                        Security Analyst
                      </span>
                      <span className="text-neutral-400">Aptech Certified</span>
                    </div>

                    <div className="relative aspect-[3/3.6] rounded-lg overflow-hidden bg-black border border-neutral-800 my-3">
                      <img
                        src={PERSONAL_INFO.portraitImage}
                        alt="Muhammed Abdulazeez"
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white text-neutral-950 rounded-md p-2">
                        <div className="text-xs font-bold font-display truncate">
                          MUHAMMED O. ABDULAZEEZ
                        </div>
                        <div className="text-[10px] font-mono text-neutral-600">
                          Cloud Security · Ethical Hacking
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span className="text-white font-semibold">ID: 022379</span>
                      <span className="text-red-500 flex items-center gap-1">
                        <RotateCw className="w-3 h-3" />
                        <span>Flip Badge</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* BACK FACE */}
                <div
                  className="rounded-2xl bg-[#101010] border-2 border-white/80 p-3 absolute inset-0 flex flex-col justify-between"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="w-full flex items-center justify-center -mt-0.5 mb-2">
                    <div className="w-12 h-2.5 rounded-full bg-[#070707] border border-neutral-800" />
                  </div>

                  <div className="rounded-xl bg-[#070707] border border-neutral-800 p-3 flex flex-col justify-between h-full">
                    <div className="w-full h-6 bg-neutral-900 rounded border border-neutral-800 mb-2" />

                    <div className="relative aspect-[3/3.6] rounded-lg overflow-hidden bg-black border border-neutral-800 my-1">
                      <img
                        src={PERSONAL_INFO.workstationImage}
                        alt="Muhammed Abdulazeez at workstation"
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-neutral-950/95 rounded-md p-2 border border-neutral-800 text-[10px] font-mono text-neutral-300">
                        <div>Tools: Burp Suite · Kali · Docker</div>
                        <div className="text-red-500">Status: Open to Work</div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span>Reverse</span>
                      <span className="text-white flex items-center gap-1">
                        <RotateCw className="w-3 h-3" />
                        <span>Show Front</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCardClick}
              className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-neutral-300 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 text-red-500" />
              <span>{isFlipped ? 'Show Front' : 'Flip Badge'}</span>
            </button>
          </div>
        </div>

        {/* Concise Key Facts Row */}
        <div className="mt-12 pt-8 border-t border-neutral-900 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#101010] border border-neutral-800 rounded-xl p-4 text-left"
            >
              <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
