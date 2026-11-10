import { useState } from 'react';
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
  CheckCircle2 
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
    { id: 'all', label: t('All Domains', 'Semua Domain') },
    { id: 'cloud', label: t('Cloud Security', 'Keamanan Cloud') },
    { id: 'appsec', label: t('Offensive & AppSec', 'Ofensif & AppSec') },
    { id: 'iam', label: t('IAM & Identity', 'IAM & Identitas') },
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

  return (
    <section id="skills" className="py-24 relative z-10 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-xs font-mono text-cyan-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{t('SKILLS & SECURITY TOOLKIT', 'KEAHLIAN & PERANGKAT')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('Technical Weaponry & Defensive Stack', 'Kemampuan Teknis & Toolkit Pertahanan')}
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            {t(
              'Hands-on expertise across cloud consoles, attack proxies, identity providers, and regulatory audits.',
              'Keahlian langsung di konsol cloud, proxy ofensif, identity provider, dan audit kepatuhan regulasi.'
            )}
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="space-y-10">
          {filteredCategories.map((catGroup, idx) => (
            <div key={idx} className="shiny-border rounded-2xl bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>{catGroup.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">{catGroup.description}</p>
                </div>
                <span className="text-xs font-mono text-cyan-400/80 self-start sm:self-auto bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                  {catGroup.skills.length} competencies
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {catGroup.skills.map((skill, sIdx) => {
                  const Icon = iconMap[skill.icon] || Shield;
                  return (
                    <div
                      key={sIdx}
                      className="shiny-border rounded-xl bg-slate-950/80 p-4 sm:p-5 transition-all group hover:scale-[1.01]"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-cyan-400 group-hover:bg-blue-900/60 transition-colors shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                              {skill.name}
                            </h4>
                            <span className="text-[11px] font-mono text-slate-400">
                              {skill.level}% proficiency
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-3">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      {/* Details / Use cases */}
                      <p className="text-xs text-slate-400 leading-relaxed font-mono">
                        {skill.details}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Global Security Arsenal Pill Tags */}
        <div className="mt-14 p-6 bg-slate-900/60 shiny-border rounded-2xl text-center">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
            {t('Core Ecosystem Technologies', 'Teknologi Ekosistem Utama')}
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              'Google Cloud Platform',
              'Amazon Web Services',
              'Keycloak 24',
              'Burp Suite Professional',
              'OAuth 2.0 / OIDC',
              'TOTP MFA',
              'Docker',
              'VPC Firewalls',
              'Google SCC',
              'Policy Analyzer',
              'PortSwigger Web Academy',
              'TryHackMe',
              'Kali Linux',
              'Nmap',
              'Metasploit',
              'NDPC / NDPR 2019',
              'CIS Benchmarks',
              'Python',
              'Bash',
              'Wireshark'
            ].map((tech, tIdx) => (
              <span
                key={tIdx}
                className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-mono hover:border-cyan-500/50 hover:text-white transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
