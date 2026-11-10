import { useState, FormEvent } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Shield, Copy, Check, ExternalLink } from 'lucide-react';
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative z-10 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-xs font-mono text-cyan-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{t('GET IN TOUCH', 'HUBUNGI SAYA')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t("Let's Collaborate On Securing Your Systems", 'Mari Berkolaborasi Mengamankan Sistem Anda')}
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            {t(
              'Seeking full-time cloud security roles, offensive web assessments, or enterprise zero-trust IAM consultation.',
              'Terbuka untuk posisi analis keamanan cloud purnawaktu, asesmen ofensif web, atau konsultasi zero-trust IAM.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct channels & profiles */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Card */}
            <div className="bg-slate-900/60 shiny-border rounded-2xl p-6 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{t('Direct Email', 'Email Langsung')}</h3>
                  <p className="text-xs text-slate-400">{t('Drop me an inquiry anytime', 'Kirim pertanyaan kapan saja')}</p>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-2 font-mono text-xs sm:text-sm text-cyan-300">
                <span className="truncate">{PERSONAL_INFO.email}</span>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded border border-slate-800 transition-colors"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded border border-slate-800 transition-colors"
                    title="Open mail client"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Location & Status Card */}
            <div className="bg-slate-900/60 shiny-border rounded-2xl p-6 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{t('Location & Availability', 'Lokasi & Ketersediaan')}</h3>
                  <p className="text-xs text-slate-400">{PERSONAL_INFO.location}</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 rounded-lg px-3 py-1.5 font-medium mt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{PERSONAL_INFO.availability}</span>
              </div>
            </div>

            {/* Profiles & Verification links */}
            <div className="bg-slate-900/60 shiny-border rounded-2xl p-6 backdrop-blur-md">
              <h3 className="text-sm font-bold text-white mb-3">
                {t('Verified Cyber Profiles', 'Profil Terverifikasi')}
              </h3>
              <div className="space-y-2">
                <a
                  href={PERSONAL_INFO.credly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all text-xs group"
                >
                  <span className="font-semibold text-slate-200 group-hover:text-cyan-300">Credly Badge Wallet</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
                </a>

                <a
                  href={PERSONAL_INFO.tryhackme}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all text-xs group"
                >
                  <span className="font-semibold text-slate-200 group-hover:text-cyan-300">TryHackMe Profile (MUHAMMEDAZEEZ770)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all text-xs group"
                >
                  <span className="font-semibold text-slate-200 group-hover:text-cyan-300">LinkedIn: timi-azeez36</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
                </a>

                <a
                  href={PERSONAL_INFO.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all text-xs group"
                >
                  <span className="font-semibold text-slate-200 group-hover:text-cyan-300">X (Twitter): @Medxploit</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
                </a>

                <a
                  href={PERSONAL_INFO.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all text-xs group"
                >
                  <span className="font-semibold text-slate-200 group-hover:text-cyan-300">Medium Articles: @muhammedabdulazeez770</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-slate-900/60 shiny-border rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white mb-2">
              {t('Send an Encrypted Dispatch', 'Kirim Pesan Langsung')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              {t(
                'Fill in the brief details below and I will respond promptly to discuss security engagements.',
                'Isi formulir di bawah ini dan saya akan segera merespons untuk mendiskusikan peluang keamanan.'
              )}
            </p>

            {submitted ? (
              <div className="p-6 bg-slate-950/80 border border-emerald-500/50 rounded-xl text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">
                    {t('Dispatch Transmitted Successfully', 'Pesan Berhasil Terkirim')}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
                    {t(
                      `Thank you, ${formData.name}. Your inquiry has been received. You can also reach out directly via email at ${PERSONAL_INFO.email}.`,
                      `Terima kasih, ${formData.name}. Pesan Anda telah diterima. Anda juga dapat menghubungi via email di ${PERSONAL_INFO.email}.`
                    )}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                  >
                    {t('Send Another Message', 'Kirim Pesan Lain')}
                  </button>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject || 'Inquiry')}&body=${encodeURIComponent(formData.message)}`}
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5"
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
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      {t('Your Name *', 'Nama Anda *')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      {t('Email Address *', 'Alamat Email *')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@organization.com"
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    {t('Subject / Inquiry Type', 'Subjek / Jenis Pertanyaan')}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Cloud Security Analyst Opportunity / Pentest Engagement"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    {t('Message *', 'Pesan *')}
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Detail your requirements, timeline, or role description..."
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-600 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('Send Security Dispatch', 'Kirim Pesan Keamanan')}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
