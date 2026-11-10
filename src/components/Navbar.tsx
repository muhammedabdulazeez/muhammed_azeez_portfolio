import { useState, useEffect } from 'react';
import { 
  Shield, 
  FileText, 
  Globe, 
  Menu, 
  X, 
  Sparkles, 
  Home, 
  User, 
  Wrench, 
  FolderGit2, 
  Award, 
  Radio, 
  Terminal, 
  Mail,
  Bot
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenResume: () => void;
}

export function Navbar({ onOpenResume }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      // ScrollSpy: Detect which section is currently in view
      const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'media-stream', 'medxploit', 'terminal', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', id: 'home', label: t('Home', 'Beranda'), icon: Home },
    { href: '#about', id: 'about', label: t('About', 'Tentang'), icon: User },
    { href: '#skills', id: 'skills', label: t('Skills', 'Keahlian'), icon: Wrench },
    { href: '#projects', id: 'projects', label: t('Projects', 'Proyek'), icon: FolderGit2 },
    { href: '#certificates', id: 'certificates', label: t('Certs', 'Sertifikat'), icon: Award },
    { href: '#media-stream', id: 'media-stream', label: t('Stream', 'Musik'), icon: Radio },
    { href: '#medxploit', id: 'medxploit', label: 'Medxploit AI', icon: Bot },
    { href: '#terminal', id: 'terminal', label: t('Terminal', 'Konsol'), icon: Terminal },
    { href: '#contact', id: 'contact', label: t('Contact', 'Kontak'), icon: Mail },
  ];

  return (
    <div className="fixed top-3 sm:top-5 inset-x-0 z-50 max-w-5xl mx-auto px-3 sm:px-4 pointer-events-none">
      {/* Floating Island Dock */}
      <header
        className={`pointer-events-auto rounded-full bg-slate-950/80 backdrop-blur-2xl border border-cyan-500/30 floating-nav-shadow px-3.5 sm:px-5 py-2 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/95 border-cyan-400/50 shadow-cyan-950/40 shadow-xl'
            : 'bg-slate-950/80 shadow-lg'
        }`}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Wordmark with glowing icon */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 text-sm sm:text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 flex items-center justify-center shadow-md shadow-cyan-500/30 group-hover:shadow-cyan-400/60 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex items-center font-mono">
              <span className="text-white font-semibold">muhammed</span>
              <span className="text-cyan-400 font-bold">.sec</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1.5 animate-pulse" title="Available for hire" />
            </div>
          </a>

          {/* Desktop Floating Navigation Dock */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium bg-slate-900/60 p-1 rounded-full border border-slate-800/80">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-sm shadow-cyan-500/30 scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls: Language Pill + CV Button + Contact */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {/* Language Switcher Pill */}
            <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-full p-0.5 text-[11px] font-mono">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => setLang('id')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  lang === 'id'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Bahasa Indonesia"
              >
                ID
              </button>
            </div>

            {/* CV Modal Action */}
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/60 rounded-full transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t('CV', 'CV')}</span>
            </button>

            {/* Direct Connect Action */}
            <a
              href="#contact"
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 rounded-full shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all whitespace-nowrap"
            >
              {t('Hire Me', 'Rekrut')}
            </a>
          </div>

          {/* Mobile Right Controls: Language switch & Menu toggle */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
              className="p-1 text-[11px] font-mono font-bold text-slate-300 bg-slate-900 border border-slate-800 rounded-full px-2.5 flex items-center gap-1"
              aria-label="Toggle language"
            >
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>{lang.toUpperCase()}</span>
            </button>

            <button
              onClick={onOpenResume}
              className="p-1.5 text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 rounded-full px-2.5 flex items-center gap-1"
              title="Open Resume"
            >
              <FileText className="w-3 h-3 text-cyan-400" />
              <span className="hidden xs:inline">CV</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-full transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-cyan-400" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Dropdown Pill */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden mt-2 bg-slate-950/95 backdrop-blur-2xl border border-cyan-500/40 rounded-3xl p-4 shadow-2xl floating-nav-shadow animate-in slide-in-from-top-2 duration-200">
          <nav className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-sm'
                      : 'text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="pt-3 mt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t('View Full Resume / CV', 'Lihat Resume / CV Lengkap')}</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-md"
            >
              {t('Get in Touch', 'Hubungi Saya')}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
