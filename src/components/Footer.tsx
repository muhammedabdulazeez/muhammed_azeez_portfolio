import { Shield, ArrowUp, Github, Linkedin, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800 bg-[#02050B] py-12 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <div className="flex items-center gap-2 text-lg font-bold text-white font-mono">
              <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-cyan-400">
                <Shield className="w-4 h-4" />
              </div>
              <span>muhammed</span>
              <span className="text-cyan-400">.sec</span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              {t(
                'Cloud Security Analyst & Ethical Hacker. Architecting resilient Zero-Trust perimeters.',
                'Analis Keamanan Cloud & Peretas Etis. Merancang perimeter Zero-Trust yang tangguh.'
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-medium">
            <a href="#home" className="hover:text-cyan-400 transition-colors">{t('Home', 'Beranda')}</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">{t('About', 'Tentang')}</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">{t('Skills', 'Keahlian')}</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">{t('Projects', 'Portofolio')}</a>
            <a href="#certificates" className="hover:text-cyan-400 transition-colors">{t('Certificates', 'Sertifikat')}</a>
            <a href="#terminal" className="hover:text-cyan-400 transition-colors">{t('Terminal', 'Konsol')}</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">{t('Contact', 'Kontak')}</a>
          </div>

          {/* Social Profiles & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.credly}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-900 border border-slate-800 rounded-lg transition-colors"
              title="Credly"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.tryhackme}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-900 border border-slate-800 rounded-lg transition-colors"
              title="TryHackMe"
            >
              <Shield className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-900 border border-slate-800 rounded-lg transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 text-slate-300 hover:text-white bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 rounded-lg transition-all ml-2"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div>
            Inspired by AlfariDev aesthetics · Built with precision & cybersecurity rigor
          </div>
        </div>

      </div>
    </footer>
  );
}
