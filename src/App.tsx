import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ParticleNetwork } from './components/ParticleNetwork';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { LightboxModal } from './components/LightboxModal';
import { Project, Certificate } from './data/portfolioData';

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
      <div className="relative min-h-screen bg-[#030712] text-slate-100 cyber-grid selection:bg-blue-600 selection:text-white">
        {/* Interactive 3D particle constellation network (Alfari-inspired) */}
        <ParticleNetwork />

        {/* Top Navbar */}
        <Navbar onOpenResume={() => setIsResumeOpen(true)} />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <HeroSection onOpenResume={() => setIsResumeOpen(true)} />
          <AboutSection onOpenResume={() => setIsResumeOpen(true)} />
          <SkillsSection />
          <ProjectsSection onSelectProject={setSelectedProject} />
          <CertificatesSection onSelectCertificate={handleSelectCertificate} />
          <InteractiveTerminal onOpenResume={() => setIsResumeOpen(true)} />
          <ContactSection />
        </main>

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
