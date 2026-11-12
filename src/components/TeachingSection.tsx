import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Terminal, 
  ShieldCheck, 
  Sparkles, 
  Quote, 
  ExternalLink 
} from 'lucide-react';
import { TEACHING_EXPERIENCE, PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export function TeachingSection() {
  const { t } = useLanguage();

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
    <section id="teaching" className="py-24 relative z-10 bg-[#060a08]/70 border-y border-emerald-950/60">
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
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('TEACHING & LEADERSHIP', 'PENGAJARAN & KEPEMIMPINAN')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('Cybersecurity Instruction & Mentorship', 'Instruktur & Mentor Keamanan Siber')}
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            {t(
              'Demonstrating deep technical grasp and clear communication by training over 120+ students and aspiring analysts in cloud security, ethical hacking, and identity defense.',
              'Membuktikan pemahaman teknis mendalam dan komunikasi yang jelas dengan membimbing lebih dari 120+ mahasiswa dan analis pemula dalam keamanan cloud, ethical hacking, dan pertahanan identitas.'
            )}
          </p>

          {/* Quick Stats Pill Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a120e] border border-emerald-900/60 text-emerald-300">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>{TEACHING_EXPERIENCE.studentsCount}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a120e] border border-emerald-900/60 text-emerald-300">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>{TEACHING_EXPERIENCE.labsCount}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a120e] border border-emerald-900/60 text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-lime-400" />
              <span>Active Curriculum · 2024 - Present</span>
            </div>
          </div>
        </motion.div>

        {/* 4 Curriculum Pillars Grid with Sequential Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16"
        >
          {TEACHING_EXPERIENCE.topics.map((topic, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-[#0a120e]/80 border border-emerald-950/80 hover:border-emerald-500/40 rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all group hover:-translate-y-1 shadow-lg shadow-black/40"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-900 px-2.5 py-1 rounded-md">
                  MODULE 0{idx + 1}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  Interactive Lab
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                {topic.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                {topic.description}
              </p>

              <div className="pt-4 border-t border-emerald-950 flex flex-wrap gap-1.5">
                {topic.tools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-0.5 rounded-md bg-[#050807] border border-emerald-900/60 text-[11px] font-mono text-slate-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Student Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {TEACHING_EXPERIENCE.studentTestimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-gradient-to-br from-[#0c1611] to-[#070d09] border border-emerald-950 rounded-2xl p-6 flex flex-col justify-between relative shadow-md"
            >
              <Quote className="w-6 h-6 text-emerald-500/30 mb-3" />
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-4">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-emerald-950 text-xs font-mono">
                <span className="text-white font-bold">{testimonial.author}</span>
                <span className="text-emerald-400">{testimonial.role}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
