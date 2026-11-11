import { useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS, Project } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, ExternalLink, ArrowRight, Wrench, Eye, Shield } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'cloud' | 'offensive' | 'iam'>('all');

  const filteredProjects = PROJECTS.filter((proj) => {
    if (filter === 'all') return true;
    return proj.category === filter;
  });

  const filterTabs = [
    { id: 'all', label: t('All Case Studies', 'Semua Studi Kasus') },
    { id: 'cloud', label: t('Cloud Security (AWS/GCP)', 'Keamanan Cloud') },
    { id: 'offensive', label: t('Offensive Pentesting', 'Pentesting Ofensif') },
    { id: 'iam', label: t('Zero-Trust IAM', 'Zero-Trust IAM') },
  ];

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
    hidden: { opacity: 0, y: 40, scale: 0.95 },
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
    <section id="projects" className="py-24 relative z-10">
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
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t('FEATURED SECURITY PROJECTS', 'PROYEK KEAMANAN UNGGULAN')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('Defensive Deployments & Security Exploits', 'Implementasi Defensif & Riset Eksploitasi')}
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            {t(
              'Real-world architectures, cloud policies, and attack lab verifications with authentic screenshot evidence.',
              'Arsitektur dunia nyata, kebijakan cloud, dan verifikasi lab pengujian dengan bukti tangkapan layar otentik.'
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

        {/* Project Cards Grid with Sequential Stagger (Appearing One by One) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer shiny-border rounded-2xl overflow-hidden bg-[#0a120e]/80 hover:bg-[#0e1913] transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-black/50 hover:shadow-2xl hover:shadow-emerald-950/40 flex flex-col hover:border-emerald-500/50"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-[#050807] border-b border-emerald-950">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050807] via-[#050807]/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Badge */}
                <div className="absolute top-3 left-3 bg-[#050807]/90 backdrop-blur-md border border-emerald-900/80 rounded-md px-2.5 py-1 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{project.badge}</span>
                </div>

                {/* Inspect button overlay */}
                <div className="absolute inset-0 bg-[#050807]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-emerald-400 text-xs font-semibold font-mono">
                  <Eye className="w-4 h-4" />
                  <span>{t('Click to Inspect Case Study', 'Klik untuk Periksa Studi Kasus')}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span className="text-emerald-400 font-semibold">{project.categoryLabel}</span>
                    <span>{project.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md bg-[#060a08] text-[11px] font-mono text-emerald-300/90 border border-emerald-950"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Action */}
                  <div className="pt-3 border-t border-emerald-950/80 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-emerald-400 transition-colors">
                    <span className="font-semibold flex items-center gap-1">
                      <span>{t('View Architecture & Proofs', 'Lihat Arsitektur & Bukti')}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
