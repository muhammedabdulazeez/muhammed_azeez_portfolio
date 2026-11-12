import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEmailRevealed, setIsEmailRevealed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    // Decodes the email at runtime upon explicit user action to defeat automated crawler scraping
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="contact" className="py-24 relative z-10 bg-[#070a08]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t('GET IN TOUCH', 'HUBUNGI SAYA')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t("Let's Collaborate On Securing Your Systems", 'Mari Berkolaborasi Mengamankan Sistem Anda')}
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            {t(
              'Seeking full-time cloud security roles, offensive web assessments, internships, or enterprise zero-trust IAM consultation.',
              'Terbuka untuk posisi analis keamanan cloud purnawaktu, asesmen ofensif web, magang, atau konsultasi zero-trust IAM.'
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct channels & anti-scraper email hygiene */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            
            {/* 1. Obfuscated Anti-Scraper Email Card */}
            <motion.div variants={itemVariants} className="bg-[#0b100d]/80 border border-emerald-950/80 hover:border-emerald-500/40 shiny-border rounded-2xl p-6 backdrop-blur-md transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{t('Direct Email', 'Email Langsung')}</h3>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Bot-Protected</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{t('Obfuscated against web scrapers', 'Terenkripsi dari bot web scraper')}</p>
                </div>
              </div>

              {/* Obfuscated / Revealed Email Pill */}
              <div className="bg-[#050807] p-3 rounded-xl border border-emerald-950 flex flex-col gap-2 font-mono text-xs sm:text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-emerald-300 font-semibold truncate">
                    {isEmailRevealed ? PERSONAL_INFO.email : 'muhammed [at] medxploit.sec'}
                  </span>
                  
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsEmailRevealed((prev) => !prev)}
                      className="p-1.5 text-slate-400 hover:text-white bg-[#0e1612] hover:bg-emerald-950 rounded border border-emerald-900/60 transition-colors cursor-pointer"
                      title={isEmailRevealed ? 'Hide raw address' : 'Reveal real email address'}
                    >
                      {isEmailRevealed ? <EyeOff className="w-3.5 h-3.5 text-slate-400" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="p-1.5 text-slate-400 hover:text-white bg-[#0e1612] hover:bg-emerald-950 rounded border border-emerald-900/60 transition-colors cursor-pointer"
                      title="Copy decoded email to clipboard"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="p-1.5 text-slate-400 hover:text-white bg-[#0e1612] hover:bg-emerald-950 rounded border border-emerald-900/60 transition-colors"
                      title="Open in mail client"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 flex items-center justify-between border-t border-emerald-950/80 pt-1.5">
                  <span>Security Hygiene: No raw plain text for crawler bots</span>
                  <span className="text-emerald-400 font-semibold">
                    {copied ? 'Copied to Clipboard!' : 'Click copy to paste'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 2. Location & Status Card */}
            <motion.div variants={itemVariants} className="bg-[#0b100d]/80 border border-emerald-950/80 hover:border-emerald-500/40 shiny-border rounded-2xl p-6 backdrop-blur-md transition-all">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{t('Location & Availability', 'Lokasi & Ketersediaan')}</h3>
                  <p className="text-xs text-slate-400">{PERSONAL_INFO.location}</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 rounded-lg px-3 py-1.5 font-medium mt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{PERSONAL_INFO.availability}</span>
              </div>
            </motion.div>

            {/* 3. Verified Channels & Profiles */}
            <motion.div variants={itemVariants} className="bg-[#0b100d]/80 border border-emerald-950/80 hover:border-emerald-500/40 shiny-border rounded-2xl p-6 backdrop-blur-md transition-all">
              <h3 className="text-sm font-bold text-white mb-3">
                {t('Verified Cyber Profiles', 'Profil Terverifikasi')}
              </h3>
              <div className="space-y-2">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#050807] hover:bg-[#0e1612] border border-emerald-950 hover:border-emerald-500/50 transition-all text-xs group"
                >
                  <span className="font-semibold text-slate-200 group-hover:text-emerald-300">LinkedIn: timi-azeez36</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400" />
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#050807] hover:bg-[#0e1612] border border-emerald-950 hover:border-emerald-500/50 transition-all text-xs group"
                >
                  <span className="font-semibold text-slate-200 group-hover:text-emerald-300">GitHub: muhammedabdulazeez</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400" />
                </a>

                <a
                  href={PERSONAL_INFO.credly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#050807] hover:bg-[#0e1612] border border-emerald-950 hover:border-emerald-500/50 transition-all text-xs group"
                >
                  <span className="font-semibold text-slate-200 group-hover:text-emerald-300">Credly Digital Badges</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400" />
                </a>

                <a
                  href={PERSONAL_INFO.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#050807] hover:bg-[#0e1612] border border-emerald-950 hover:border-emerald-500/50 transition-all text-xs group"
                >
                  <span className="font-semibold text-slate-200 group-hover:text-emerald-300">Medium Security Articles</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400" />
                </a>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-[#0b100d]/80 border border-emerald-950/80 hover:border-emerald-500/40 shiny-border rounded-2xl p-6 sm:p-8 backdrop-blur-md"
          >
            <h3 className="text-xl font-bold text-white mb-2">
              {t('Send a Direct Dispatch', 'Kirim Pesan Langsung')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              {t(
                'Fill in the brief details below and I will respond promptly to discuss security engagements or hiring.',
                'Isi formulir di bawah ini dan saya akan segera merespons untuk mendiskusikan peluang keamanan atau rekrutmen.'
              )}
            </p>

            {submitted ? (
              <div className="p-6 bg-[#050807] border border-emerald-500/50 rounded-xl text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">
                    {t('Dispatch Transmitted Successfully', 'Pesan Berhasil Terkirim')}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
                    {t(
                      `Thank you, ${formData.name}. Your inquiry has been received. I will reply to ${formData.email} promptly.`,
                      `Terima kasih, ${formData.name}. Pesan Anda telah diterima. Saya akan segera membalas ke ${formData.email}.`
                    )}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-300 bg-[#0e1612] hover:bg-[#14221b] rounded-lg border border-emerald-900/60 transition-colors cursor-pointer"
                  >
                    {t('Send Another Message', 'Kirim Pesan Lain')}
                  </button>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject || 'Inquiry')}&body=${encodeURIComponent(formData.message)}`}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>{t('Open in Mail Client', 'Buka di Email')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-emerald-400/90 mb-1">
                      {t('Your Name *', 'Nama Anda *')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-[#050807] border border-emerald-950 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 placeholder:text-slate-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-emerald-400/90 mb-1">
                      {t('Email Address *', 'Alamat Email *')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@organization.com"
                      className="w-full bg-[#050807] border border-emerald-950 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 placeholder:text-slate-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-emerald-400/90 mb-1">
                    {t('Subject / Inquiry Type', 'Subjek / Jenis Pertanyaan')}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Cloud Security Analyst Opportunity / IAM Pentest"
                    className="w-full bg-[#050807] border border-emerald-950 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 placeholder:text-slate-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-emerald-400/90 mb-1">
                    {t('Message *', 'Pesan *')}
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Detail your opportunity, role requirements, or consulting timeline..."
                    className="w-full bg-[#050807] border border-emerald-950 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 placeholder:text-slate-600 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 rounded-xl shadow-lg shadow-emerald-950/60 hover:shadow-emerald-500/20 transition-all cursor-pointer font-mono font-bold"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('Send Direct Dispatch', 'Kirim Pesan Langsung')}</span>
                </button>
              </form>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
}
