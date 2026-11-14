import { SKILL_GROUPS } from '../data/portfolioData';

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 sm:py-20 border-b border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-red-500 font-semibold mb-2">
            Tools & Workflow
          </p>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
            How I Use Security Tools
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl">
            Core platforms and workflows applied across cloud security, IAM, testing, and compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.id}
              className="surface-card rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {group.title}
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-5">
                  {group.howIUseIt}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 text-xs font-mono text-neutral-400">
                {group.tools.join(' · ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
