import { useState } from 'react';
import { motion } from 'motion/react';
import { CERTIFICATES, Certificate, PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Award, CheckCircle, ExternalLink, Shield, Eye } from 'lucide-react';

interface CertificatesSectionProps {
  onSelectCertificate: (cert: Certificate) => void;
}

export function CertificatesSection({ onSelectCertificate }: CertificatesSectionProps) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'offensive' | 'cloud' | 'grc'>('all');

  const filteredCerts = CERTIFICATES.filter((cert) => {
    if (filter === 'all') return true;
    return cert.issuerCategory === filter;
  });

  const filterTabs = [
    { id: 'all', label: t('All Certifications', 'Semua Sertifikasi') },
    { id: 'offensive', label: t('Ethical Hacking & CTF', 'Ethical Hacking & CTF') },
    { id: 'cloud', label: t('Cloud Security (AWS & GCP)', 'Keamanan Cloud') },
    { id: 'grc', label: t('GRC & Compliance', 'GRC & Kepatuhan') },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.96 },
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
    <section id="certificates" className="py-24 relative z-10 bg-[#060a08]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Drop Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-800/70 text-xs font-mono text-emerald-400 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('ACCREDITED CERTIFICATIONS', 'SERTIFIKASI TERAKREDITASI')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('Verified Industry Credentials', 'Kredensial Industri Terverifikasi')}
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            {t(
              'Official accreditations from Google Cloud, AWS, Aptech Computer Education, and Elevify GRC. Click any card to inspect full high-resolution proof.',
              'Akreditasi resmi dari Google Cloud, AWS, Aptech Computer Education, dan Elevify GRC. Klik kartu mana pun untuk memeriksa dokumen bukti resolusi tinggi.'
            )}
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer font-mono ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-lime-400 text-slate-950 font-bold shadow-md shadow-emerald-500/25'
                    : 'bg-[#0d1611] text-slate-400 hover:text-white border border-emerald-950 hover:border-emerald-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Certificate Cards Grid with Sequential Stagger (Appearing One by One) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredCerts.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              onClick={() => onSelectCertificate(cert)}
              className="group cursor-pointer shiny-border rounded-2xl overflow-hidden bg-[#0a120e]/80 hover:bg-[#0e1913] transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-black/50 hover:shadow-emerald-950/40 flex flex-col justify-between hover:border-emerald-500/50"
            >
              <div>
                {/* Thumbnail Preview Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#050807] border-b border-emerald-950">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 bg-[#050807]"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050807]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Verified Pill */}
                  <div className="absolute top-3 left-3 bg-[#050807]/90 backdrop-blur-md border border-emerald-800/80 rounded-md px-2 py-0.5 text-[11px] font-mono text-emerald-400 flex items-center gap-1 shadow-sm">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span>{t('VERIFIED PROOF', 'TERVERIFIKASI')}</span>
                  </div>

                  {/* Hover Inspect button */}
                  <div className="absolute inset-0 bg-[#050807]/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-emerald-400 text-xs font-semibold font-mono">
                    <Eye className="w-4 h-4" />
                    <span>{t('Inspect Proof', 'Periksa Bukti')}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                    <span className="text-emerald-400 font-semibold">{cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {cert.title}
                  </h3>

                  {cert.credentialId && (
                    <div className="text-[11px] font-mono text-slate-400 mb-2 truncate">
                      {cert.credentialId}
                    </div>
                  )}

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>
              </div>

              {/* Skills Footer */}
              <div className="px-5 pb-5">
                <div className="flex flex-wrap gap-1 mb-4">
                  {cert.skills.slice(0, 3).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded bg-[#060a08] text-[10px] font-mono text-slate-300 border border-emerald-950"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="pt-3 border-t border-emerald-950/80 flex items-center justify-between text-xs font-mono text-emerald-400 group-hover:text-emerald-300 transition-colors">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t('Click to Inspect', 'Klik untuk Periksa')}</span>
                  </span>
                  <span>↗</span>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Credly Wallet Direct Banner with Scroll Drop */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-gradient-to-r from-[#0a120e] via-[#0d1611] to-[#0a120e] border border-emerald-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {t('Official Digital Badge Transcripts on Credly', 'Transkrip Badge Digital Resmi di Credly')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {t(
                  'Verify cryptographic issue signatures for Google Cloud, AWS, and enterprise cybersecurity accreditations directly.',
                  'Verifikasi tanda tangan kriptografis penerbitan kredensial Google Cloud dan AWS secara langsung.'
                )}
              </p>
            </div>
          </div>

          <a
            href={PERSONAL_INFO.credly}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-slate-950 font-bold rounded-xl font-mono text-xs shadow-md shadow-emerald-500/20 whitespace-nowrap transition-all cursor-pointer"
          >
            <span>{t('Open Credly Wallet', 'Buka Dompet Credly')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
