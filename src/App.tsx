import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { GalaxySky } from './components/GalaxySky';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { PlaylistsSection } from './components/PlaylistsSection';
import { MedxploitChat } from './components/MedxploitChat';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { LightboxModal } from './components/LightboxModal';
import { Project, Certificate } from './data/portfolioData';
import { Bot, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
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
      <div className="relative min-h-screen bg-[#02050e] text-slate-100 cyber-grid selection:bg-blue-600 selection:text-white">
        {/* Celestial Galaxy Cosmos Sky background with Sun, Moon, and Stars */}
        <GalaxySky />

        {/* Top Navbar */}
        <Navbar onOpenResume={() => setIsResumeOpen(true)} />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <HeroSection onOpenResume={() => setIsResumeOpen(true)} />
          <AboutSection onOpenResume={() => setIsResumeOpen(true)} />
          <SkillsSection />
          <ProjectsSection onSelectProject={setSelectedProject} />
          <CertificatesSection onSelectCertificate={handleSelectCertificate} />
          <PlaylistsSection />
          <MedxploitChat />
          <InteractiveTerminal onOpenResume={() => setIsResumeOpen(true)} />
          <ContactSection />
        </main>

        {/* Floating Quick Action: Medxploit Cyber Mentor */}
        <aside className="fixed bottom-5 right-5 z-40 pointer-events-auto">
          <a
            href="#medxploit"
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-cyan-500/50 hover:border-cyan-400 floating-nav-shadow transition-all shadow-xl shadow-cyan-950/40 hover:scale-105"
            title="Chat with Medxploit AI"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center p-0.5">
              <Bot className="w-3.5 h-3.5 text-slate-950" />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                Ask Medxploit
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
          </a>
        </aside>

        {/* Footer */}
        <Footer />

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
