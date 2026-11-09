import { useState } from 'react';
import { Certificate, CERTIFICATES } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Award, CheckCircle, ExternalLink, ShieldCheck, Eye } from 'lucide-react';

interface CertificatesSectionProps {
  onSelectCertificate: (cert: Certificate) => void;
}

export function CertificatesSection({ onSelectCertificate }: CertificatesSectionProps) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'cloud' | 'offensive' | 'grc' | 'badge'>('all');

  const filterTabs = [
    { id: 'all', label: t('All Credentials', 'Semua Kredensial') },
    { id: 'cloud', label: t('Cloud (AWS & GCP)', 'Cloud (AWS & GCP)') },
    { id: 'offensive', label: t('Offensive & Ethical Hacking', 'Etis & Ofensif') },
    { id: 'grc', label: t('GRC & Compliance', 'GRC & Kepatuhan') },
    { id: 'badge', label: t('Credly Badges', 'Badge Credly') },
  ];

  const filteredCerts = CERTIFICATES.filter((cert) => {
    if (filter === 'all') return true;
    return cert.issuerCategory === filter;
  });

  return (
    <section id="certificates" className="py-24 relative z-10 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-xs font-mono text-cyan-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{t('VERIFIED CERTIFICATIONS & BADGES', 'SERTIFIKAT & BADGE TERVERIFIKASI')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('Credential Proofs & Official Accreditations', 'Bukti Kredensial & Akreditasi Resmi')}
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            {t(
              'Each credential represents audited theoretical rigor and hands-on laboratory defense proficiency. Click any certificate to inspect full document proof.',
              'Setiap kredensial mencerminkan penguasaan teori dan keahlian laboratorium praktis. Klik sertifikat untuk melihat bukti dokumen beresolusi penuh.'
            )}
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              onClick={() => onSelectCertificate(cert)}
              className="group cursor-pointer bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-black/40 hover:shadow-cyan-950/20 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Preview Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 border-b border-slate-800">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 bg-slate-950"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                  {/* Verified Pill */}
                  <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 rounded-md px-2 py-0.5 text-[11px] font-mono text-emerald-400 flex items-center gap-1 shadow-sm">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span>{t('VERIFIED PROOF', 'TERVERIFIKASI')}</span>
                  </div>

                  {/* Hover Inspect button */}
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-cyan-400 text-xs font-semibold">
                    <Eye className="w-4 h-4" />
                    <span>{t('Inspect Proof', 'Periksa Bukti')}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                    <span className="text-cyan-400 font-semibold">{cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {cert.title}
                  </h3>

                  {cert.credentialId && (
                    <div className="text-[11px] font-mono text-slate-500 mb-2 truncate">
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
                      className="px-2 py-0.5 rounded bg-slate-950 text-[10px] font-mono text-slate-400 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-950 text-[10px] font-mono text-slate-500 border border-slate-800">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                  <span>{t('View High-Res Certificate', 'Lihat Sertifikat Resolusi Tinggi')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Credly Wallet Direct Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-cyan-950/40 border border-blue-800/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                {t('Official Credly Digital Badges Wallet', 'Dompet Lencana Digital Resmi Credly')}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t(
                  'Verify Muhammed Abdulazeez on Pearson Credly for Google Cloud & Cisco certifications.',
                  'Verifikasi Muhammed Abdulazeez di Pearson Credly untuk sertifikasi Google Cloud & Cisco.'
                )}
              </p>
            </div>
          </div>

          <a
            href="https://www.credly.com/users/muhammed-abdul-azeez.4c97459e"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>{t('Open Credly Profile', 'Buka Profil Credly')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
