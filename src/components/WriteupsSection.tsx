import { motion } from 'motion/react';
import { 
  FileCode2, 
  Clock, 
  Calendar, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { WRITEUPS, PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export function WriteupsSection() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
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
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="writeups" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-800/70 text-xs font-mono text-emerald-400 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <FileCode2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('TECHNICAL RESEARCH & LAB WALKTHROUGHS', 'RISET TEKNIS & LAB WALKTHROUGH')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('Security Research & Cloud Misconfiguration Breakdowns', 'Riset Keamanan & Analisis Misorientasi Cloud')}
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            {t(
              'How I think and approach offensive vectors, root-cause vulnerability analysis, and production remediation patterns.',
              'Bagaimana saya menganalisis vektor serangan ofensif, investigasi akar masalah kerentanan, dan mitigasi arsitektur produksi.'
            )}
          </p>
        </motion.div>

        {/* Writeups Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {WRITEUPS.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="bg-[#0a120e]/80 border border-emerald-950/80 hover:border-emerald-500/50 shiny-border rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-black/40 flex flex-col justify-between group"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                  <span className="text-emerald-400 font-semibold">{post.category}</span>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
                  {post.summary}
                </p>

                {/* Key Takeaway box */}
                <div className="bg-[#050807] border border-emerald-950 rounded-xl p-3 mb-5">
                  <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase mb-1">
                    Key Remediation
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {post.keyTakeaway}
                  </p>
                </div>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {post.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-[#060a08] border border-emerald-900/60 text-[10px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Direct External Link */}
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between pt-3 border-t border-emerald-950/80 text-xs font-mono text-emerald-400 group-hover:text-emerald-300 transition-colors"
                >
                  <span className="font-semibold flex items-center gap-1">
                    <span>{t('Read Full Writeup on Medium', 'Baca Selengkapnya di Medium')}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Medium Profile Direct Link Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[#0b140f] via-[#0e1a14] to-[#0b140f] border border-emerald-900/60 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-bold text-white">
              {t('Interested in More Technical Walkthroughs & Cloud Exploits?', 'Tertarik dengan Walkthrough Teknis & Eksploitasi Cloud Lainnya?')}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {t(
                'Follow my deep dive articles on authentication bypasses, IAM permissions, and cloud penetration testing.',
                'Ikuti artikel mendalam tentang bypass autentikasi, izin IAM, dan penetration testing cloud.'
              )}
            </p>
          </div>
          <a
            href={PERSONAL_INFO.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs shadow-md shadow-emerald-500/20 shrink-0 transition-all"
          >
            <span>{t('View Medium Profile', 'Buka Profil Medium')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
