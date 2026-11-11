import { useState } from 'react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { 
  Cloud, 
  Server, 
  Shield, 
  Activity, 
  Crosshair, 
  Zap, 
  Radio, 
  Terminal, 
  Key, 
  Lock, 
  UserCheck, 
  FileCheck, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  Wrench,
  Sparkles
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Cloud,
  Server,
  Shield,
  Activity,
  Crosshair,
  Zap,
  Radio,
  Terminal,
  Key,
  Lock,
  UserCheck,
  FileCheck,
  Scale,
  AlertTriangle,
  CheckCircle2,
};

export function SkillsSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: t('All Capabilities', 'Semua Keahlian') },
    { id: 'cloud', label: t('Cloud Security', 'Keamanan Cloud') },
    { id: 'appsec', label: t('Offensive & AppSec', 'Ofensif & AppSec') },
    { id: 'iam', label: t('Zero-Trust IAM', 'Zero-Trust IAM') },
    { id: 'grc', label: t('GRC & Compliance', 'GRC & Kepatuhan') },
  ];

  const filteredCategories = SKILL_CATEGORIES.filter((cat) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'cloud' && cat.title.includes('Cloud')) return true;
    if (activeCategory === 'appsec' && cat.title.includes('Offensive')) return true;
    if (activeCategory === 'iam' && cat.title.includes('Identity')) return true;
    if (activeCategory === 'grc' && cat.title.includes('Governance')) return true;
    return false;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.97 },
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
    <section id="skills" className="py-24 relative z-10 bg-[#060a08]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Drop Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-800/70 text-xs font-mono text-emerald-400 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Wrench className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('TECHNICAL COMPETENCIES & TOOLKIT', 'KOMPETENSI TEKNIS & TOOLKIT')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('Production-Ready Security Toolstack', 'Toolkit Keamanan Siap Kerja')}
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            {t(
              'Hands-on, verified capabilities across cloud perimeters, offensive attack proxies, identity providers, and regulatory audits—focused on measurable business security.',
              'Kemampuan terverifikasi dan langsung pada perimeter cloud, proxy pengujian ofensif, identity provider, dan audit kepatuhan regulasi.'
            )}
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer font-mono ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-lime-400 text-slate-950 font-bold shadow-md shadow-emerald-500/25'
                    : 'bg-[#0d1611] text-slate-400 hover:text-white border border-emerald-950 hover:border-emerald-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills Categories with Staggered Cascades */}
        <div className="space-y-10">
          {filteredCategories.map((catGroup, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0a120e]/60 border border-emerald-950/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md hover:border-emerald-500/40 transition-colors"
            >
              {/* Category Header */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-950/80 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{catGroup.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">{catGroup.description}</p>
                </div>

                {/* Core Tools Badges */}
                <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
                  {catGroup.tools.map((tool, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2.5 py-1 rounded bg-[#060a08] text-[11px] font-mono text-emerald-300 border border-emerald-950"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Individual Competencies Grid with Staggered Child Reveal (Appearing One by One) */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
              >
                {catGroup.skills.map((skill, sIdx) => {
                  const Icon = iconMap[skill.icon] || Shield;
                  return (
                    <motion.div
                      key={sIdx}
                      variants={itemVariants}
                      className="bg-[#070d09]/90 border border-emerald-950 hover:border-emerald-500/50 rounded-xl p-4 sm:p-5 transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-900/80 group-hover:scale-105 transition-all shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                              {skill.name}
                            </h4>
                            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Verified Applied Competency</span>
                            </span>
                          </div>
                        </div>

                        {/* Practical Details */}
                        <p className="text-xs text-slate-300 leading-relaxed font-mono mb-3">
                          {skill.details}
                        </p>
                      </div>

                      {/* Evidence Pill */}
                      <div className="pt-3 border-t border-emerald-950/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className="text-slate-400">{t('Real World Evidence:', 'Bukti Implementasi:')}</span>
                        <span className="text-emerald-300 font-semibold">{skill.impact}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

            </motion.div>
          ))}
        </div>

        {/* Enterprise Ecosystem Footnote with Scroll Drop */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-gradient-to-r from-emerald-950/40 via-[#0a120e]/60 to-emerald-950/40 border border-emerald-950 rounded-2xl p-6 text-center"
        >
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2 font-semibold">
            {t('Enterprise Security Architecture Toolchain', 'Toolchain Arsitektur Keamanan Enterprise')}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {[
              'Burp Suite Professional',
              'Keycloak 24 (OIDC/SAML)',
              'Google Cloud IAM & SCC',
              'AWS IAM & Organizations',
              'OAuth 2.0 / PKCE',
              'GCP VPC Firewall Rules',
              'Docker Containerization',
              'Linux Bash Scripting',
              'CIS Benchmarks v8',
              'NDPC / NDPR 2019'
            ].map((tool, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-[#060a08] border border-emerald-950 hover:border-emerald-500/40 rounded-lg text-xs font-mono text-slate-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
