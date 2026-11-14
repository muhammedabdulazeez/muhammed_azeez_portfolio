import { useState, FormEvent } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Copy, Check, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEmailRevealed, setIsEmailRevealed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-red-500 font-semibold mb-2">
            Contact
          </p>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl">
            Reach out for security roles, internships, or cloud/IAM consulting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-5">
            {/* Bot-Protected Email Card */}
            <div className="surface-card rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <h3 className="font-display text-base font-bold text-white">Direct Email</h3>
                  <p className="text-xs text-neutral-400">Obfuscated to prevent automated scraping</p>
                </div>
              </div>

              <div className="bg-[#070707] p-3 rounded-lg border border-neutral-800 flex items-center justify-between gap-2 font-mono text-xs">
                <span className="text-white truncate">
                  {isEmailRevealed ? PERSONAL_INFO.email : PERSONAL_INFO.obfuscatedEmail}
                </span>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsEmailRevealed((prev) => !prev)}
                    className="p-1.5 text-neutral-400 hover:text-white bg-neutral-900 rounded border border-neutral-800 cursor-pointer"
                    title={isEmailRevealed ? 'Hide email' : 'Reveal email'}
                  >
                    {isEmailRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-red-500" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 text-neutral-400 hover:text-white bg-neutral-900 rounded border border-neutral-800 cursor-pointer"
                    title="Copy email"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-red-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              {copied && (
                <p className="text-[11px] font-mono text-red-500 mt-2">
                  Copied to clipboard.
                </p>
              )}
            </div>

            {/* Location Card */}
            <div className="surface-card rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                <h3 className="font-display text-base font-bold text-white">Location</h3>
              </div>
              <p className="text-xs text-neutral-300">{PERSONAL_INFO.location}</p>
            </div>

            {/* Verified Profiles */}
            <div className="surface-card rounded-xl p-5">
              <h3 className="font-display text-sm font-bold text-white mb-3">Verified Links</h3>
              <div className="space-y-2 text-xs font-mono">
                <a
                  href={PERSONAL_INFO.githubProjects}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#070707] border border-neutral-800 hover:border-red-600/60 text-neutral-200 hover:text-white"
                >
                  <span>GitHub Projects</span>
                  <ExternalLink className="w-3.5 h-3.5 text-red-500" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#070707] border border-neutral-800 hover:border-red-600/60 text-neutral-200 hover:text-white"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-red-500" />
                </a>
                <a
                  href={PERSONAL_INFO.credly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#070707] border border-neutral-800 hover:border-red-600/60 text-neutral-200 hover:text-white"
                >
                  <span>Credly Credentials</span>
                  <ExternalLink className="w-3.5 h-3.5 text-red-500" />
                </a>
                <a
                  href={PERSONAL_INFO.tryhackme}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#070707] border border-neutral-800 hover:border-red-600/60 text-neutral-200 hover:text-white"
                >
                  <span>TryHackMe</span>
                  <ExternalLink className="w-3.5 h-3.5 text-red-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 surface-card rounded-xl p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold text-white mb-2">
              Send a Message
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6">
              Share role details or security inquiry below.
            </p>

            {submitted ? (
              <div className="p-6 bg-[#070707] border border-neutral-800 rounded-lg text-center space-y-4">
                <CheckCircle2 className="w-8 h-8 text-red-500 mx-auto" />
                <div>
                  <h4 className="font-display text-lg font-bold text-white">Message Ready</h4>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    Thank you, {formData.name}. Open your mail client below to send this directly.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-lg cursor-pointer"
                  >
                    Reset
                  </button>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`}
                    className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg inline-flex items-center gap-1.5"
                  >
                    <span>Send via Email Client</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-[#070707] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 placeholder:text-neutral-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full bg-[#070707] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 placeholder:text-neutral-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Cloud Security Analyst / Pentest Role"
                    className="w-full bg-[#070707] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 placeholder:text-neutral-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message..."
                    className="w-full bg-[#070707] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 placeholder:text-neutral-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Prepare Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
