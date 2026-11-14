import { ArrowUp, Github, Linkedin, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-[#070707] py-10 text-neutral-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-neutral-900">
          <div className="text-center md:text-left">
            <div className="font-display text-base font-bold text-white">
              muhammed<span className="text-red-600">.sec</span>
            </div>
            <p className="text-neutral-500 mt-1">
              Cloud Security Analyst & Ethical Hacker
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 font-mono">
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#certificates" className="hover:text-white">Credentials</a>
            <a href="#skills" className="hover:text-white">Tools</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={PERSONAL_INFO.githubProjects}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg"
              title="GitHub Projects"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.credly}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg"
              title="Credly"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0 })}
              className="p-2 text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer ml-1"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-neutral-500 text-center sm:text-left">
          <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
          <span>Lagos, Nigeria · Open to Remote & Relocation</span>
        </div>
      </div>
    </footer>
  );
}
