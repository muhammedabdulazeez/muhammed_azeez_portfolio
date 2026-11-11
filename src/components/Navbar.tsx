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
  Terminal, 
  Mail,
  Bot
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenAi: () => void;
}

export function Navbar({ onOpenResume, onOpenAi }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to accurately track the active section in view
    const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'terminal', 'contact'];
    let observer: IntersectionObserver | null = null;

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          threshold: 0.25,
          rootMargin: '-10% 0px -40% 0px',
        }
      );

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer?.observe(el);
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  const navLinks = [
    { href: '#home', id: 'home', label: t('Home', 'Beranda'), icon: Home },
    { href: '#about', id: 'about', label: t('About', 'Tentang'), icon: User },
    { href: '#skills', id: 'skills', label: t('Skills', 'Keahlian'), icon: Wrench },
    { href: '#projects', id: 'projects', label: t('Projects', 'Proyek'), icon: FolderGit2 },
    { href: '#certificates', id: 'certificates', label: t('Certs', 'Sertifikat'), icon: Award },
    { href: '#terminal', id: 'terminal', label: t('Terminal', 'Konsol'), icon: Terminal },
    { href: '#contact', id: 'contact', label: t('Contact', 'Kontak'), icon: Mail },
  ];

  return (
    <div className="fixed top-3 sm:top-5 inset-x-0 z-40 max-w-5xl mx-auto px-3 sm:px-4 pointer-events-none">
      {/* Floating Island Dock */}
      <header
        className={`pointer-events-auto rounded-full bg-[#0a110d]/90 backdrop-blur-2xl border border-emerald-500/30 floating-nav-shadow px-3.5 sm:px-5 py-2 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080d0a]/95 border-emerald-400/50 shadow-emerald-950/40 shadow-xl'
            : 'bg-[#0a110d]/90 shadow-lg'
        }`}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Wordmark with glowing icon */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 text-sm sm:text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-lime-400 p-0.5 flex items-center justify-center shadow-md shadow-emerald-500/30 group-hover:shadow-emerald-400/60 transition-all">
              <div className="w-full h-full bg-[#0a110d] rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex items-center font-mono">
              <span className="text-white font-semibold">muhammed</span>
              <span className="text-emerald-400 font-bold">.sec</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1.5 animate-pulse" title="Available for hire" />
            </div>
          </a>

          {/* Desktop Floating Navigation Dock */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium bg-[#101913]/70 p-1 rounded-full border border-emerald-950/80">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white font-semibold shadow-sm shadow-emerald-500/30 scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-emerald-950/50'
                  }`}
                >
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls: AI Mentor Button + Language Pill + CV Button + Hire Me */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {/* Medxploit AI Drawer Trigger Button */}
            <button
              onClick={onOpenAi}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold text-emerald-300 bg-[#0c1611] hover:bg-[#12221a] border border-emerald-500/50 hover:border-emerald-400 rounded-full transition-all shadow-sm shadow-emerald-950/40 cursor-pointer"
              title="Open Medxploit AI Mentor Panel"
            >
              <Bot className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>AI Mentor</span>
            </button>

            {/* Language Switcher Pill */}
            <div className="flex items-center bg-[#101913] border border-emerald-950 rounded-full p-0.5 text-[11px] font-mono">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold shadow-sm'
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
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold shadow-sm'
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
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-[#101913] hover:bg-[#15231a] border border-emerald-900/60 hover:border-emerald-500/60 rounded-full transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('CV', 'CV')}</span>
            </button>

            {/* Direct Connect Action */}
            <a
              href="#contact"
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 font-mono font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-400 hover:from-emerald-300 hover:to-lime-300 rounded-full shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all whitespace-nowrap"
            >
              {t('Hire Me', 'Rekrut')}
            </a>
          </div>

          {/* Mobile Right Controls: AI button + Language switch & Menu toggle */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={onOpenAi}
              className="p-1.5 text-xs font-mono font-bold text-emerald-300 bg-[#0c1611] border border-emerald-500/50 rounded-full px-2.5 flex items-center gap-1"
              title="Open AI Mentor Panel"
            >
              <Bot className="w-3 h-3 text-emerald-400" />
              <span>AI</span>
            </button>

            <button
              onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
              className="p-1 text-[11px] font-mono font-bold text-slate-300 bg-[#101913] border border-emerald-950 rounded-full px-2.5 flex items-center gap-1"
              aria-label="Toggle language"
            >
              <Globe className="w-3 h-3 text-emerald-400" />
              <span>{lang.toUpperCase()}</span>
            </button>

            <button
              onClick={onOpenResume}
              className="p-1.5 text-xs font-semibold text-slate-300 bg-[#101913] border border-emerald-950 rounded-full px-2.5 flex items-center gap-1"
              title="Open Resume"
            >
              <FileText className="w-3 h-3 text-emerald-400" />
              <span className="hidden xs:inline">CV</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-300 hover:text-white bg-[#101913] border border-emerald-950 rounded-full transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-emerald-400" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Dropdown Pill */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden mt-2 bg-[#0a110d]/95 backdrop-blur-2xl border border-emerald-500/40 rounded-3xl p-4 shadow-2xl floating-nav-shadow animate-in slide-in-from-top-2 duration-200">
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
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold shadow-sm'
                      : 'text-slate-200 hover:bg-emerald-950/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="pt-3 mt-2 border-t border-emerald-950 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAi();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-emerald-300 bg-[#0c1611] hover:bg-[#12221a] border border-emerald-500/50 rounded-xl"
            >
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('Open Medxploit AI Mentor Side Panel', 'Buka Panel AI Medxploit')}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-[#101913] hover:bg-[#15231a] border border-emerald-950 rounded-xl"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('View Full Resume / CV', 'Lihat Resume / CV Lengkap')}</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2 text-xs font-semibold text-slate-950 font-bold bg-gradient-to-r from-emerald-400 to-lime-400 rounded-xl shadow-md"
            >
              {t('Get in Touch', 'Hubungi Saya')}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
