import { useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS, Project } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight, 
  Eye, 
  Github, 
  Wrench, 
  AlertCircle, 
  CheckCircle2 
} from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'cloud' | 'pentest' | 'iam'>('all');

  const filteredProjects = PROJECTS.filter((proj) => {
    if (filter === 'all') return true;
    return proj.category === filter;
  });

  const filterTabs = [
    { id: 'all', label: t('All Case Studies', 'Semua Studi Kasus') },
    { id: 'cloud', label: t('Cloud Security & CSPM', 'Keamanan Cloud & CSPM') },
    { id: 'iam', label: t('Zero-Trust IAM (Keycloak)', 'Zero-Trust IAM') },
    { id: 'pentest', label: t('Offensive Web AppSec', 'Pentesting Web') },
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
    <section id="projects" className="py-24 relative z-10">
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
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t('DEEP SECURITY CASE STUDIES', 'STUDI KASUS KEAMANAN MENDALAM')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('Cloud Defense Architectures & Offensive Exploits', 'Arsitektur Pertahanan Cloud & Riset Eksploitasi')}
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            {t(
              'Each project is backed by verified problem statements, tools used, architecture decisions, measurable results, and linked GitHub repositories.',
              'Setiap proyek didukung oleh pernyataan masalah, alat yang digunakan, keputusan arsitektur, hasil terukur, dan tautan repositori GitHub.'
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

        {/* Project Cards Grid */}
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
              className="group shiny-border rounded-2xl overflow-hidden bg-[#0a120e]/80 hover:bg-[#0e1913] transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-black/50 hover:shadow-2xl hover:shadow-emerald-950/40 flex flex-col justify-between hover:border-emerald-500/50"
            >
              <div>
                {/* Thumbnail Container */}
                <div 
                  onClick={() => onSelectProject(project)}
                  className="relative aspect-video overflow-hidden bg-[#050807] border-b border-emerald-950 cursor-pointer"
                  title="Click to view full architecture details"
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Scrim overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050807] via-[#050807]/30 to-transparent opacity-80 group-hover:opacity-50 transition-opacity" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-[#050807]/90 backdrop-blur-md border border-emerald-900/80 rounded-md px-2.5 py-1 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{project.badge}</span>
                  </div>

                  {/* Hover Inspect Action */}
                  <div className="absolute inset-0 bg-[#050807]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-emerald-400 text-xs font-semibold font-mono pointer-events-none">
                    <Eye className="w-4 h-4" />
                    <span>{t('Inspect Case Study', 'Buka Studi Kasus')}</span>
                  </div>
                </div>

                {/* Card Content with Depth Fields */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span className="text-emerald-400 font-semibold">{project.categoryLabel}</span>
                    <span>{project.date}</span>
                  </div>

                  <h3 
                    onClick={() => onSelectProject(project)}
                    className="text-lg font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors line-clamp-2 cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  {/* Problem & Result Mini-Blocks */}
                  <div className="space-y-2 mb-4 text-xs">
                    <div className="bg-[#050807] p-2.5 rounded-lg border border-emerald-950">
                      <div className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider mb-0.5">
                        Problem
                      </div>
                      <p className="text-slate-300 line-clamp-2 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="bg-[#050807] p-2.5 rounded-lg border border-emerald-950">
                      <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider mb-0.5">
                        Outcome
                      </div>
                      <p className="text-slate-300 line-clamp-2 leading-relaxed">
                        {project.result}
                      </p>
                    </div>
                  </div>

                  {/* Tools Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.tags.slice(0, 4).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-[#060a08] text-[10px] font-mono text-emerald-300/90 border border-emerald-950"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: GitHub Link + Case Study Details */}
              <div className="px-6 pb-6 pt-3 border-t border-emerald-950/80 flex items-center justify-between text-xs font-mono">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group/link"
                    title="View GitHub Repository"
                  >
                    <Github className="w-3.5 h-3.5 text-emerald-400 group-hover/link:scale-110 transition-transform" />
                    <span>GitHub Repo</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                ) : (
                  <span className="text-slate-600">Enterprise Lab</span>
                )}

                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                >
                  <span>{t('Deep Dive', 'Detail')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
