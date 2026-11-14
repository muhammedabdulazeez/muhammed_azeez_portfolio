import { FileText, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, TEACHING_TOPICS } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenResume: () => void;
}

export function AboutSection({ onOpenResume }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 sm:py-20 border-b border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-red-500 font-semibold mb-2">
            Background & Instruction
          </p>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
            About Me & Teaching Focus
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Concise Background */}
          <div className="lg:col-span-7 surface-card rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-white mb-3">
                Background
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-4">
                Trained in Ethical Hacking at Aptech Computer Education (Credit Grade) and certified in Google Cloud Cybersecurity, AWS IAM, and NDPC GRC compliance.
              </p>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
                I also instruct and mentor learners on foundational cloud security, web testing workflows, and identity defense, turning technical topics into practical hands-on labs.
              </p>

              <h4 className="text-xs font-mono uppercase tracking-wider text-red-500 font-semibold mb-3">
                Topics Taught
              </h4>
              <ul className="space-y-2 text-sm text-neutral-300">
                {TEACHING_TOPICS.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-500 font-mono">0{idx + 1}.</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-neutral-800 flex flex-wrap items-center gap-4 text-xs font-mono">
              <a
                href={PERSONAL_INFO.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white hover:text-red-500 font-semibold"
              >
                <span>Read Technical Write-ups on Medium</span>
                <ExternalLink className="w-3.5 h-3.5 text-red-500" />
              </a>
            </div>
          </div>

          {/* Right: Work Readiness */}
          <div className="lg:col-span-5 surface-card rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-red-500 font-semibold mb-2">
                Work Availability
              </p>
              <h3 className="font-display text-lg font-bold text-white mb-3">
                Ready for Security Teams
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                Available immediately for Cloud Security Analyst, Junior Penetration Tester, IAM Specialist, or Security Intern roles.
              </p>

              <div className="space-y-3 text-xs font-mono border-t border-neutral-800 pt-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-neutral-500">Target Roles</span>
                  <span className="text-white text-right">Analyst / AppSec / Intern</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-neutral-500">Work Mode</span>
                  <span className="text-white text-right">Remote / Hybrid / On-Site</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-neutral-500">Location</span>
                  <span className="text-white text-right">Lagos, Nigeria</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenResume}
              className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded-lg cursor-pointer"
            >
              <FileText className="w-4 h-4 text-red-600" />
              <span>View Full Resume / CV</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
