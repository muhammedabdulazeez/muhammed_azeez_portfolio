import { useState } from 'react';
import { PROJECTS, Project, PERSONAL_INFO } from '../data/portfolioData';
import { ExternalLink, ArrowRight, Github } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<'all' | 'cloud' | 'pentest' | 'iam'>('all');

  const filteredProjects = PROJECTS.filter((proj) => {
    if (filter === 'all') return true;
    return proj.category === filter;
  });

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'cloud', label: 'Cloud Security' },
    { id: 'iam', label: 'Zero-Trust IAM' },
    { id: 'pentest', label: 'Web AppSec' },
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 border-b border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-red-500 font-semibold mb-2">
              Selected Work
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Security Projects & Case Studies
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl">
              Real cloud IAM setups, firewall defenses, and web testing labs with documented results.
            </p>
          </div>

          <a
            href={PERSONAL_INFO.githubProjects}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-red-600/60 rounded-lg self-start md:self-auto shrink-0"
          >
            <Github className="w-4 h-4 text-red-500" />
            <span>All GitHub Projects</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="surface-card rounded-xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="block w-full text-left aspect-video bg-black border-b border-neutral-800 overflow-hidden cursor-pointer"
                  title="Inspect project details and screenshots"
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </button>

                {/* Body */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                    <span className="text-red-500 font-semibold">{project.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.date}</span>
                  </div>

                  <h3
                    onClick={() => onSelectProject(project)}
                    className="font-display text-lg font-bold text-white mb-3 hover:text-red-500 cursor-pointer leading-snug"
                  >
                    {project.title}
                  </h3>

                  <div className="space-y-2.5 text-xs text-neutral-300 leading-relaxed mb-4">
                    <p>
                      <span className="text-white font-semibold">Problem: </span>
                      {project.problem}
                    </p>
                    <p>
                      <span className="text-white font-semibold">Action: </span>
                      {project.whatIDid}
                    </p>
                    <p>
                      <span className="text-red-400 font-semibold">Result: </span>
                      {project.result}
                    </p>
                  </div>

                  {/* Unboxed Tools Metadata */}
                  <p className="text-[11px] font-mono text-neutral-400">
                    Tools: {project.toolsUsed.join(' · ')}
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-5 py-3.5 border-t border-neutral-800 bg-[#0b0b0b] flex items-center justify-between text-xs font-mono">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-neutral-200 hover:text-red-500"
                >
                  <Github className="w-3.5 h-3.5 text-red-500" />
                  <span>GitHub Repo</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>

                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-1 text-white hover:text-red-500 font-semibold cursor-pointer"
                >
                  <span>Screenshots</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
