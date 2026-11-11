import { motion } from 'motion/react';
import { Shield, CheckCircle2, MapPin, Mail, Award, Lock, Server, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface AboutSectionProps {
  onOpenResume: () => void;
}

export function AboutSection({ onOpenResume }: AboutSectionProps) {
  const { t } = useLanguage();

  const corePillars = [
    {
      icon: Lock,
      title: t('Zero-Trust Identity & Access', 'Identitas Zero-Trust & Akses'),
      desc: t(
        'Designing centralized Keycloak IdP architectures, mandatory TOTP MFA, and granular role-based access control preventing privilege escalation.',
        'Merancang arsitektur Keycloak IdP terpusat, MFA TOTP wajib, serta kontrol akses berbasis peran (RBAC) untuk mencegah eskalasi hak istimewa.'
      ),
    },
    {
      icon: Server,
      title: t('Cloud Infrastructure Security', 'Keamanan Infrastruktur Cloud'),
      desc: t(
        'Hardening AWS IAM least-privilege policies, GCP VPC firewalls, and implementing continuous CSPM via Security Command Center.',
        'Memperkuat kebijakan least-privilege AWS IAM, firewall VPC GCP, dan menerapkan CSPM berkelanjutan melalui Security Command Center.'
      ),
    },
    {
      icon: Shield,
      title: t('Offensive Web Pentesting', 'Penetration Testing Web Ofensif'),
      desc: t(
        'Uncovering critical attack vectors (SSRF, Web Cache Deception, XSS, Auth Bypass) across PortSwigger Practitioner tracks and live target environments.',
        'Menemukan vektor serangan kritis (SSRF, Web Cache Deception, XSS, Auth Bypass) melalui materi PortSwigger Practitioner dan uji coba nyata.'
      ),
    },
    {
      icon: Award,
      title: t('Governance, Risk & Compliance (GRC)', 'Tata Kelola, Risiko & Kepatuhan'),
      desc: t(
        'Auditing cloud infrastructure against CIS benchmarks and enforcing compliance with NDPC / NDPR 2019 data protection standards.',
        'Mengaudit infrastruktur cloud terhadap standar CIS dan menegakkan kepatuhan terhadap regulasi privasi data NDPC / NDPR 2019.'
      ),
    },
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
    <section id="about" className="py-24 relative z-10">
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
            <span>{t('ABOUT ME', 'TENTANG SAYA')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t(
              'Bridging Offensive Vulnerability Research with Resilient Cloud Defense',
              'Menjembatani Riset Kerentanan Ofensif dengan Pertahanan Cloud yang Tangguh'
            )}
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg leading-relaxed">
            {t(
              'My philosophy is simple: To defend an enterprise, you must master the mindset of the adversary. I combine practical ethical hacking with rigorous cloud architecture standards.',
              'Filosofi saya sederhana: Untuk mempertahankan sistem, Anda harus menguasai pola pikir penyerang. Saya memadukan ethical hacking praktis dengan standar arsitektur cloud terpercaya.'
            )}
          </p>
        </motion.div>

        {/* 2-Column Story & Details with Scroll Drop */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16"
        >
          
          {/* Left: Bio narrative */}
          <div className="lg:col-span-7 bg-[#0a120e]/80 shiny-border rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-gradient-to-b from-emerald-400 to-lime-400 rounded-sm" />
              <span>{t('Professional Journey & Vision', 'Perjalanan Profesional & Visi')}</span>
            </h3>
            
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                {t(
                  "As a dedicated Cloud Security Analyst and Offensive Security Specialist, I specialize in engineering resilient multi-cloud perimeters, architecting zero-trust IAM frameworks, and conducting proactive penetration tests. My foundational technical training at Aptech Computer Education culminated in a Credit-grade Smart Professional Ethical Hacking diploma, establishing a methodical approach to vulnerability assessment, reconnaissance, and protocol security.",
                  "Sebagai Analis Keamanan Cloud dan Spesialis Keamanan Ofensif yang berdedikasi, saya mengkhususkan diri dalam merancang perimeter multi-cloud yang tangguh, arsitektur zero-trust IAM, dan pengujian penetrasi proaktif. Pelatihan saya di Aptech Computer Education menghasilkan diploma Smart Professional Ethical Hacking dengan predikat Credit."
                )}
              </p>
              <p>
                {t(
                  "Across enterprise cloud environments, I hold verified credentials including the Google Cloud Cybersecurity Certificate and AWS Cloud Practitioner Essentials. I construct least-privilege IAM custom roles, configure hardened VPC firewall policies with stateful packet inspection, and automate threat posture monitoring using Google Security Command Center (SCC) and Policy Analyzer.",
                  "Di lingkungan cloud enterprise, saya memegang kredensial terverifikasi termasuk Sertifikat Google Cloud Cybersecurity dan AWS Cloud Practitioner. Saya merancang peran kustom IAM least-privilege, mengonfigurasi kebijakan firewall VPC yang diperkuat, dan mengotomatisasi pemantauan ancaman menggunakan Google Security Command Center (SCC) dan Policy Analyzer."
                )}
              </p>
              <p>
                {t(
                  "On the application layer, I have solved over 78 advanced labs across PortSwigger Web Security Academy practitioner modules and TryHackMe CTFs, uncovering severe vectors in Authentication, SSRF, and Web Cache Deception. Furthermore, my training in Nigeria's NDPC framework equips me with 34+ hours of rigorous Governance, Risk & Compliance (GRC) and data privacy expertise.",
                  "Di lapisan aplikasi, saya telah menyelesaikan lebih dari 78 lab tingkat lanjut di PortSwigger Academy dan TryHackMe CTF, mengungkap celah kritis pada Autentikasi, SSRF, dan Web Cache Deception. Pelatihan kerangka kerja NDPC membekali saya dengan 34+ jam keahlian GRC dan privasi data."
                )}
              </p>
            </div>

            {/* Quick bullets */}
            <div className="mt-6 pt-6 border-t border-emerald-950/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('Least-Privilege Role Engineering', 'Rekayasa Peran Least-Privilege')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('PortSwigger SSRF Practitioner', 'Praktisi PortSwigger SSRF')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('Keycloak PKCE OIDC Setup', 'Implementasi Keycloak PKCE OIDC')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('NDPC Data Privacy Audit', 'Audit Privasi Data NDPC')}</span>
              </div>
            </div>
          </div>

          {/* Right: Quick facts & Work Ready Badge */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Ready to Work Card */}
            <div className="bg-[#0a120e]/80 shiny-border rounded-2xl p-6 backdrop-blur-md">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>OPERATIONAL STATUS // READY FOR WORK</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                {t('Immediate Availability For Security Engagements', 'Ketersediaan Langsung Untuk Posisi Keamanan')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mb-4 leading-relaxed">
                {t(
                  'Actively seeking full-time Cloud Security Analyst roles, Offensive Web Pentesting positions, or Security Internships. Highly motivated to solve complex authentication, cloud infrastructure, and compliance challenges.',
                  'Aktif mencari posisi Analis Keamanan Cloud purnawaktu, posisi Pentesting Web Ofensif, atau Magang Keamanan.'
                )}
              </p>

              <div className="space-y-2 text-xs font-mono text-slate-300 border-t border-emerald-950/80 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{t('Target Roles:', 'Posisi Dituju:')}</span>
                  <span className="text-emerald-300 font-semibold">Cloud Sec Analyst / AppSec / Intern</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{t('Deployment:', 'Penempatan:')}</span>
                  <span className="text-white">Remote / Hybrid / On-Site</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{t('Location:', 'Lokasi:')}</span>
                  <span className="text-white">{PERSONAL_INFO.location}</span>
                </div>
              </div>

              {/* View CV trigger */}
              <div className="mt-6 pt-4 border-t border-emerald-950">
                <button
                  onClick={onOpenResume}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-300 hover:from-emerald-300 hover:to-lime-300 rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-950/50"
                >
                  <FileText className="w-4 h-4 text-slate-950" />
                  <span>{t('Open Full Resume & Credentials', 'Buka Resume & Kredensial Lengkap')}</span>
                </button>
              </div>
            </div>

            {/* Quote card */}
            <div className="bg-gradient-to-br from-emerald-950/30 to-[#0a120e]/80 shiny-border rounded-2xl p-5 text-xs sm:text-sm text-slate-300 italic border-emerald-950">
              &ldquo;{t(
                'Security is not a checkbox product; it is an active discipline of understanding authorization trust boundaries, validating access policies, and assuming breach.',
                'Keamanan bukan sekadar daftar centang; ini adalah disiplin berkelanjutan dalam memahami batasan kepercayaan otorisasi dan memvalidasi setiap kebijakan akses.'
              )}&rdquo;
            </div>
          </div>

        </motion.div>

        {/* 4 Core Pillars Grid with Sequential Stagger (Appearing One by One) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {corePillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group bg-[#0a120e]/70 shiny-border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/50 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/70 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 group-hover:bg-emerald-900/80 transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-950/80 flex items-center justify-between text-[11px] font-mono text-emerald-400/80">
                  <span>PILLAR 0{idx + 1}</span>
                  <span className="text-emerald-400">ACTIVE</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
