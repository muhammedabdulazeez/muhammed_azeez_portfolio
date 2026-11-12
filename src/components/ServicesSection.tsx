import { motion } from 'motion/react';
import { 
  Briefcase, 
  Cloud, 
  Shield, 
  Key, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Target 
} from 'lucide-react';
import { SERVICES } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export function ServicesSection() {
  const { t } = useLanguage();

  const iconMap: Record<string, typeof Cloud> = {
    Cloud,
    Shield,
    Key,
  };

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
    hidden: { opacity: 0, y: 30, scale: 0.97 },
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
    <section id="services" className="py-24 relative z-10 bg-[#060a08]/50">
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
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('SECURITY CONSULTING & FREELANCE', 'KONSULTASI & LAYANAN FREELANCE')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('Consulting Services & Advisory Engagements', 'Layanan Konsultasi & Asesmen Keamanan')}
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            {t(
              'Available for contract audits, pre-launch penetration tests, and enterprise zero-trust IAM modernization.',
              'Tersedia untuk audit kontrak, pengujian penetrasi pra-peluncuran, dan modernisasi zero-trust IAM enterprise.'
            )}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {SERVICES.map((service) => {
            const IconComp = iconMap[service.icon] || Shield;
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="bg-[#0a120e]/80 border border-emerald-950/80 hover:border-emerald-500/50 shiny-border rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-black/40 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/70 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
                    {service.tagline}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-emerald-950">
                    <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      Key Deliverables
                    </div>
                    {service.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-emerald-950/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Turnaround: {service.turnaround}</span>
                    </span>
                  </div>

                  <a
                    href="#contact"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0e1612] hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 font-mono text-xs font-semibold border border-emerald-900/60 hover:border-emerald-400 transition-all cursor-pointer shadow-sm"
                  >
                    <span>{t('Inquire For Engagement', 'Ajukan Kebutuhan')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
