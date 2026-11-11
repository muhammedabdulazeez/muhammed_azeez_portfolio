import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ProfessionalBackground } from './components/ProfessionalBackground';
import { ScrollProgressObserver } from './components/ScrollProgressObserver';
import { RevealOnScroll } from './components/RevealOnScroll';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MedxploitDrawer } from './components/MedxploitChat';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { LightboxModal } from './components/LightboxModal';
import { Project, Certificate } from './data/portfolioData';
import { Bot, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  const handleSelectCertificate = (cert: Certificate) => {
    setLightboxImage({
      src: cert.image,
      alt: `${cert.title} — ${cert.issuer}`,
    });
  };

  const handleOpenImageLightbox = (imageSrc: string, altText: string) => {
    setLightboxImage({
      src: imageSrc,
      alt: altText,
    });
  };

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-[#070a08] text-slate-100 cyber-grid selection:bg-emerald-500 selection:text-slate-950 font-sans">
        {/* Scroll Progress Neon Trace Line */}
        <ScrollProgressObserver />

        {/* Clean, high-contrast cybersecurity ambient telemetry background */}
        <ProfessionalBackground />

        {/* Top Floating Island Navbar */}
        <Navbar 
          onOpenResume={() => setIsResumeOpen(true)} 
          onOpenAi={() => setIsAiOpen(true)}
        />

        {/* Main Content Stream with Intersection Observer Scroll Reveals */}
        <main className="relative z-10">
          <HeroSection 
            onOpenResume={() => setIsResumeOpen(true)} 
            onOpenAi={() => setIsAiOpen(true)}
          />

          <RevealOnScroll threshold={0.12} delayMs={50}>
            <AboutSection onOpenResume={() => setIsResumeOpen(true)} />
          </RevealOnScroll>

          <RevealOnScroll threshold={0.12} delayMs={50}>
            <SkillsSection />
          </RevealOnScroll>

          <RevealOnScroll threshold={0.12} delayMs={50}>
            <ProjectsSection onSelectProject={setSelectedProject} />
          </RevealOnScroll>

          <RevealOnScroll threshold={0.12} delayMs={50}>
            <CertificatesSection onSelectCertificate={handleSelectCertificate} />
          </RevealOnScroll>

          <RevealOnScroll threshold={0.12} delayMs={50}>
            <InteractiveTerminal 
              onOpenResume={() => setIsResumeOpen(true)} 
              onOpenAi={() => setIsAiOpen(true)}
            />
          </RevealOnScroll>

          <RevealOnScroll threshold={0.12} delayMs={50}>
            <ContactSection />
          </RevealOnScroll>
        </main>

        {/* Floating Quick Launcher: Opens Medxploit AI Side Panel */}
        <aside className="fixed bottom-5 right-5 z-40 pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsAiOpen(true)}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0a110d]/95 hover:bg-[#0f1a14] border border-emerald-500/60 hover:border-emerald-400 floating-nav-shadow transition-all shadow-xl shadow-emerald-950/60 hover:scale-105 cursor-pointer"
            title="Open Medxploit AI Cybersecurity Mentor Side Panel"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-lime-400 flex items-center justify-center p-0.5 shadow-md shadow-emerald-500/30">
              <Bot className="w-4 h-4 text-slate-950 animate-pulse" />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                Medxploit AI
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
          </button>
        </aside>

        {/* Footer */}
        <Footer />

        {/* Slide-over Medxploit AI Side Panel Drawer */}
        <MedxploitDrawer
          isOpen={isAiOpen}
          onClose={() => setIsAiOpen(false)}
        />

        {/* Modals & Overlays */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenImageLightbox={handleOpenImageLightbox}
        />

        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />

        <LightboxModal
          imageSrc={lightboxImage?.src || null}
          altText={lightboxImage?.alt || ''}
          onClose={() => setLightboxImage(null)}
        />
      </div>
    </LanguageProvider>
  );
}
