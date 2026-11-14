import { useState } from 'react';
import { CERTIFICATES, Certificate, PERSONAL_INFO } from '../data/portfolioData';
import { ExternalLink, Eye, Award } from 'lucide-react';

interface CertificatesSectionProps {
  onSelectCertificate: (cert: Certificate) => void;
}

export function CertificatesSection({ onSelectCertificate }: CertificatesSectionProps) {
  const [filter, setFilter] = useState<'all' | 'cloud' | 'offensive' | 'grc'>('all');

  const filteredCerts = CERTIFICATES.filter((cert) => {
    if (filter === 'all') return true;
    return cert.issuerCategory === filter;
  });

  const filterTabs = [
    { id: 'all', label: 'All Credentials' },
    { id: 'cloud', label: 'Cloud Security' },
    { id: 'offensive', label: 'Ethical Hacking & CTF' },
    { id: 'grc', label: 'GRC & Compliance' },
  ];

  return (
    <section id="certificates" className="py-16 sm:py-20 border-b border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-red-500 font-semibold mb-2">
              Verified Credentials
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Certifications & Badges
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl">
              Official certificates from Google Cloud, AWS, Aptech, Elevify, and TryHackMe.
            </p>
          </div>

          <a
            href={PERSONAL_INFO.credly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg self-start md:self-auto shrink-0"
          >
            <Award className="w-4 h-4 text-red-600" />
            <span>Credly Transcript</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer ${
                filter === tab.id
                  ? 'bg-red-600 text-white font-semibold'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="surface-card rounded-xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <button
                  type="button"
                  onClick={() => onSelectCertificate(cert)}
                  className="block w-full aspect-[16/10] bg-black border-b border-neutral-800 overflow-hidden p-2 cursor-pointer"
                  title="Inspect high-resolution certificate"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </button>

                <div className="p-5">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1.5">
                    <span className="text-red-500 font-semibold">{cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>

                  <h3 className="font-display text-base font-bold text-white mb-2 leading-snug">
                    {cert.title}
                  </h3>

                  {cert.credentialId && (
                    <p className="text-[11px] font-mono text-neutral-500 mb-2 truncate">
                      {cert.credentialId}
                    </p>
                  )}

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {cert.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 py-3.5 border-t border-neutral-800 bg-[#0b0b0b] flex items-center justify-between text-xs font-mono">
                <button
                  type="button"
                  onClick={() => onSelectCertificate(cert)}
                  className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-red-500" />
                  <span>Inspect</span>
                </button>

                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-white hover:text-red-500 font-semibold"
                >
                  <span>Verify Online</span>
                  <ExternalLink className="w-3 h-3 text-red-500" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
