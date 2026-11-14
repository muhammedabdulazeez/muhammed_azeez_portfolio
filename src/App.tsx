import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { SkillsSection } from './components/SkillsSection';
import { AboutSection } from './components/AboutSection';
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
    <div className="min-h-screen bg-[#070707] text-neutral-100 static-grid selection:bg-red-600 selection:text-white">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <main>
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />

        <ProjectsSection onSelectProject={setSelectedProject} />

        <CertificatesSection onSelectCertificate={handleSelectCertificate} />

        <SkillsSection />

        <AboutSection onOpenResume={() => setIsResumeOpen(true)} />

        <ContactSection />
      </main>

      <Footer />

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
  );
}
