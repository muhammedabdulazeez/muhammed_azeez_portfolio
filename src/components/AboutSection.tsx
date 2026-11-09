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
        'Engineering hardened VPC perimeters, configuring least-privilege IAM policies, and automating threat detection with Google Security Command Center.',
        'Membangun perimeter VPC yang kuat, mengonfigurasi kebijakan IAM least-privilege, dan mengotomatisasi deteksi ancaman dengan Google SCC.'
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

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-xs font-mono text-cyan-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
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
        </div>

        {/* 2-Column Story & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left: Bio narrative */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-sm" />
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
            <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{t('Least-Privilege Role Engineering', 'Rekayasa Peran Least-Privilege')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{t('Burp Suite Practitioner Workflows', 'Alur Kerja Praktisi Burp Suite')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{t('Keycloak 24 OIDC / RBAC Portals', 'Portal OIDC / RBAC Keycloak 24')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{t('NDPR & CIS Benchmark Compliance', 'Kepatuhan Standar NDPR & CIS')}</span>
              </div>
            </div>
          </div>

          {/* Right: Key Info Snapshot Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b border-slate-800">
                {t('Security Profile Snapshot', 'Ringkasan Profil Keamanan')}
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-xs text-slate-400 block">{t('Full Name', 'Nama Lengkap')}</span>
                  <span className="font-semibold text-slate-200">{PERSONAL_INFO.fullName}</span>
                </div>

                <div>
                  <span className="text-xs text-slate-400 block">{t('Location & Mobility', 'Lokasi & Mobilitas')}</span>
                  <div className="flex items-center gap-1.5 text-slate-200">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-400 block">{t('Direct Email', 'Email Kontak')}</span>
                  <div className="flex items-center gap-1.5 text-slate-200 font-mono text-xs sm:text-sm">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-cyan-400 transition-colors">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-400 block">{t('Primary Education', 'Pendidikan Utama')}</span>
                  <span className="text-slate-200">
                    Smart Professional in Ethical Hacking · Aptech Computer Education
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-400 block">{t('Availability Status', 'Status Ketersediaan')}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 rounded-md px-2.5 py-1 mt-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {PERSONAL_INFO.availability}
                  </span>
                </div>
              </div>

              {/* View CV trigger */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={onOpenResume}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>{t('Open Full Resume & Credentials', 'Buka Resume & Kredensial Lengkap')}</span>
                </button>
              </div>
            </div>

            {/* Quote card */}
            <div className="bg-gradient-to-br from-blue-950/40 to-slate-900/60 border border-blue-900/40 rounded-2xl p-5 text-xs sm:text-sm text-slate-300 italic">
              &ldquo;{t(
                'Security is not a checkbox product; it is an active discipline of understanding authorization trust boundaries, validating access policies, and assuming breach.',
                'Keamanan bukan sekadar daftar centang; ini adalah disiplin berkelanjutan dalam memahami batasan kepercayaan otorisasi dan memvalidasi setiap kebijakan akses.'
              )}&rdquo;
            </div>
          </div>

        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {corePillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className="group bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-blue-950/30"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-950/70 border border-blue-800/60 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 group-hover:bg-blue-900/70 transition-all">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
