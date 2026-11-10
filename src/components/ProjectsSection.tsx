import { useState } from 'react';
import { Project, PROJECTS } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink, Layers, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'cloud' | 'pentest' | 'iam'>('all');

  const filterTabs = [
    { id: 'all', label: t('All Projects', 'Semua Proyek') },
    { id: 'cloud', label: t('Cloud Security & CSPM', 'Keamanan Cloud & CSPM') },
    { id: 'iam', label: t('Identity & Zero-Trust', 'Identitas & Zero-Trust') },
    { id: 'pentest', label: t('Offensive Pentesting', 'Penetration Testing') },
  ];

  const filteredProjects = PROJECTS.filter((proj) => {
    if (filter === 'all') return true;
    return proj.category === filter;
  });

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-xs font-mono text-cyan-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
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

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer shiny-border rounded-2xl overflow-hidden bg-slate-900/60 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-cyan-950/40 flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-slate-950 border-b border-slate-800">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Badge */}
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 rounded-md px-2.5 py-1 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{project.badge}</span>
                </div>

                <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-md p-1.5 text-slate-400 group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{project.categoryLabel}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-950 text-[11px] font-mono text-slate-400 border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-950 text-[11px] font-mono text-slate-500 border border-slate-800">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Link */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                    <span>{t('View Deep-Dive & Screenshots', 'Lihat Analisis & Tangkapan Layar')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
