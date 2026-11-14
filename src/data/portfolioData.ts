export interface Project {
  id: string;
  title: string;
  category: 'cloud' | 'pentest' | 'iam';
  categoryLabel: string;
  problem: string;
  whatIDid: string;
  result: string;
  toolsUsed: string[];
  githubUrl: string;
  thumbnail: string;
  images: string[];
  date: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerCategory: 'cloud' | 'offensive' | 'grc' | 'badge';
  date: string;
  image: string;
  credentialId?: string;
  verifyUrl: string;
  summary: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  howIUseIt: string;
  tools: string[];
}

export const PERSONAL_INFO = {
  name: 'Muhammed Abdulazeez',
  fullName: 'Muhammed Oluwatimileyin Abdulazeez',
  role: 'Cloud Security Analyst & Ethical Hacker',
  headline: 'Securing cloud perimeters, IAM identities, and web applications.',
  bio: 'Hands-on practitioner in AWS & GCP IAM least privilege, Keycloak Zero-Trust OIDC/MFA, VPC firewalls, and web application testing with Burp Suite. Open to Security Analyst, Junior Engineer, Penetration Tester, and Intern roles.',
  email: 'muhammedabdulazeez770@gmail.com',
  obfuscatedEmail: 'muhammed [at] medxploit.sec',
  location: 'Lagos, Nigeria · Open to Remote & Relocation',
  availability: 'Available for Full-Time, Junior Roles & Internships',
  portraitImage: '/assets/aistudio/portrait_d5fda6fa.jpg',
  workstationImage: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_12.27.23_464e322f.jpeg',
  githubProfile: 'https://github.com/muhammedabdulazeez',
  githubProjects: 'https://github.com/muhammedabdulazeez/projects',
  linkedin: 'https://www.linkedin.com/in/timi-azeez36/',
  twitter: 'https://x.com/Medxploit',
  medium: 'https://medium.com/@muhammedabdulazeez770',
  tryhackme: 'https://tryhackme.com/p/Muhammedazeez770',
  credly: 'https://www.credly.com/users/muhammed-abdul-azeez.4c97459e',
  stats: [
    { label: 'Verified Certificates', value: '11' },
    { label: 'PortSwigger Labs (Auth + SSRF)', value: '78' },
    { label: 'Documented Case Studies', value: '6' },
    { label: 'Work Status', value: 'Open' },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'authshield-360',
    title: 'AuthShield 360 — Zero-Trust IAM & OIDC Portal',
    category: 'iam',
    categoryLabel: 'Identity & Access Management',
    problem: 'Apps using local password checks without MFA or strict role gates are vulnerable to credential stuffing and unauthorized route access.',
    whatIDid: 'Deployed Keycloak 24 inside Docker with a Flask Relying Party, enforcing OIDC authorization code flow, mandatory TOTP QR enrollment, and RBAC route checks.',
    result: 'Verified role separation in testing: authorized roles received 200 OK on permitted pages while unauthorized student access to /grades returned 403 Forbidden.',
    toolsUsed: ['Keycloak 24', 'OAuth 2.0 / OIDC', 'Docker', 'Flask', 'TOTP MFA', 'RBAC'],
    githubUrl: 'https://github.com/muhammedabdulazeez/projects',
    thumbnail: '/assets/aistudio/proj-authshield_94134474.jpg',
    images: [
      '/assets/aistudio/proj-authshield_94134474.jpg',
      '/assets/aistudio/proj-authshield-rbac_8792f419.jpg'
    ],
    date: '2026'
  },
  {
    id: 'gcp-iam-least-privilege',
    title: 'Google Cloud IAM Least-Privilege & Policy Audit',
    category: 'cloud',
    categoryLabel: 'Cloud IAM',
    problem: 'Broad predefined roles like Editor or Viewer give auditors more permissions than required for compliance reviews.',
    whatIDid: 'Built a scoped custom role ("Audit Team Reviewer"), bound it to auditor identities, and audited effective access through GCP Policy Analyzer queries.',
    result: 'Confirmed exact read/audit permissions via Policy Analyzer with zero excess write privileges granted.',
    toolsUsed: ['Google Cloud IAM', 'GCP Policy Analyzer', 'Cloud Audit Logs'],
    githubUrl: 'https://github.com/muhammedabdulazeez/projects',
    thumbnail: '/assets/aistudio/proj-iam_deac8c6c.jpg',
    images: [
      '/assets/aistudio/proj-iam_deac8c6c.jpg',
      '/assets/aistudio/proj-iam-verify_d2fe28fe.jpg'
    ],
    date: '2026'
  },
  {
    id: 'gcp-vpc-firewall',
    title: 'GCP VPC Perimeter Firewall & Traffic Logging',
    category: 'cloud',
    categoryLabel: 'Network Security',
    problem: 'Unrestricted ingress rules expose compute instances to automated port scans and brute-force login attempts.',
    whatIDid: 'Configured custom VPC ingress rules ("allow-http-ssh") scoped by target network tags and queried ALLOWED vs DROPPED packet logs in Cloud Logging.',
    result: 'Isolated compute workloads by tag and verified dropped probe telemetry in Cloud Logging Explorer.',
    toolsUsed: ['Google Cloud VPC', 'Firewall Policies', 'Cloud Logging'],
    githubUrl: 'https://github.com/muhammedabdulazeez/projects',
    thumbnail: '/assets/aistudio/proj-firewall_32bdbd78.jpg',
    images: [
      '/assets/aistudio/proj-firewall_32bdbd78.jpg',
      '/assets/aistudio/proj-firewall-logs_ffb2022d.jpg'
    ],
    date: '2026'
  },
  {
    id: 'gcp-scc-posture',
    title: 'Cloud Security Posture Management (Google SCC)',
    category: 'cloud',
    categoryLabel: 'Cloud CSPM',
    problem: 'Misconfigurations like open SSH/RDP ports on public instances introduce direct external attack exposure.',
    whatIDid: 'Reviewed Security Health Analytics findings in Google Security Command Center, triaged high-severity open ports, and checked CIS benchmark gaps.',
    result: 'Identified exposed SSH/RDP findings and documented exact remediation steps aligned with CIS controls.',
    toolsUsed: ['Google SCC', 'Security Health Analytics', 'CIS Benchmarks'],
    githubUrl: 'https://github.com/muhammedabdulazeez/projects',
    thumbnail: '/assets/aistudio/proj-scc_f28c0478.jpg',
    images: [
      '/assets/aistudio/proj-scc_f28c0478.jpg',
      '/assets/aistudio/proj-scc-rules_b572ec61.jpg'
    ],
    date: '2026'
  },
  {
    id: 'web-hack-diaries-auth',
    title: 'PortSwigger Web Security — Authentication & SSRF Labs',
    category: 'pentest',
    categoryLabel: 'Web AppSec',
    problem: 'Flawed password reset, 2FA, cache parsing, and backend URL fetch logic allow account takeover and internal SSRF access.',
    whatIDid: 'Completed all 55 Authentication labs and all 23 SSRF labs using Burp Suite Pro (Repeater, Intruder, Collaborator), documenting fixes for each class.',
    result: '100% completion across 78 labs (55 Auth + 23 SSRF) plus Web Cache Deception & WebSocket security notes.',
    toolsUsed: ['Burp Suite Pro', 'PortSwigger Academy', 'Repeater', 'Collaborator'],
    githubUrl: 'https://github.com/muhammedabdulazeez/projects',
    thumbnail: '/assets/aistudio/proj-webhack-auth_958aec1a.jpg',
    images: [
      '/assets/aistudio/proj-webhack-auth_958aec1a.jpg',
      '/assets/aistudio/proj-webhack-ssrf_a8c5f1ee.jpg',
      '/assets/aistudio/proj-webhack-cache_6a6defe1.jpg',
      '/assets/aistudio/proj-webhack-ws_1bdab829.jpg',
      '/assets/aistudio/proj-pentest-burp_bca3022f.jpg'
    ],
    date: '2026'
  },
  {
    id: 'gcp-web-security-scanner',
    title: 'Automated Web Vulnerability Scan & XSS Triage',
    category: 'pentest',
    categoryLabel: 'Vulnerability Assessment',
    problem: 'Unescaped input parameters on web servers expose users to Cross-Site Scripting (XSS) session hijacking.',
    whatIDid: 'Deployed test VMs on Google Compute Engine, configured gcloud firewall access, and ran automated Web Security Scanner crawls.',
    result: 'Confirmed 3 active unescaped XSS vectors in 2m 16s and documented output encoding and CSP fixes.',
    toolsUsed: ['GCP Web Security Scanner', 'Compute Engine', 'gcloud CLI', 'CSP'],
    githubUrl: 'https://github.com/muhammedabdulazeez/projects',
    thumbnail: '/assets/aistudio/proj-xss_6756102f.jpg',
    images: [
      '/assets/aistudio/proj-xss_6756102f.jpg',
      '/assets/aistudio/proj-xss-alert_3dccce23.jpg'
    ],
    date: '2026'
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'cert-google-cloud-cyber',
    title: 'Google Cloud Cybersecurity Certificate',
    issuer: 'Google Cloud (Credly)',
    issuerCategory: 'cloud',
    date: 'Oct 2026',
    image: '/assets/aistudio/cert-gcp_e7af34da.jpg',
    credentialId: 'Credly ID: 23437b0f-7fad-4048-94d1-32d051f90094',
    verifyUrl: 'https://www.credly.com/users/muhammed-abdul-azeez.4c97459e',
    summary: 'Cloud security risk management, detection, telemetry, and incident response.'
  },
  {
    id: 'cert-aptech-ethical-hacking',
    title: 'Smart Professional - Ethical Hacking',
    issuer: 'Aptech Computer Education',
    issuerCategory: 'offensive',
    date: 'Aug 2025 (Credit)',
    image: '/assets/aistudio/cert-aptech_5395fef5.jpg',
    credentialId: 'Sr No: 022379',
    verifyUrl: 'https://www.aptech-education.com/verify-student',
    summary: 'Footprinting, network scanning, system hacking, and penetration testing (Credit Grade).'
  },
  {
    id: 'cert-aws-cloud-practitioner',
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services',
    issuerCategory: 'cloud',
    date: 'Oct 2026',
    image: '/assets/aistudio/cert-aws-ccp_9b68e363.jpg',
    verifyUrl: 'https://www.credly.com/users/muhammed-abdul-azeez.4c97459e',
    summary: 'AWS core cloud services, global infrastructure, and foundational security.'
  },
  {
    id: 'cert-aws-iam',
    title: 'Introduction to AWS IAM',
    issuer: 'Amazon Web Services',
    issuerCategory: 'cloud',
    date: 'Oct 2026',
    image: '/assets/aistudio/cert-aws-iam_28bbc9d2.jpg',
    verifyUrl: 'https://www.credly.com/users/muhammed-abdul-azeez.4c97459e',
    summary: 'Least-privilege IAM policies, users, groups, roles, and permission boundaries.'
  },
  {
    id: 'cert-aws-shared-responsibility',
    title: 'AWS Shared Responsibility Model',
    issuer: 'Amazon Web Services',
    issuerCategory: 'cloud',
    date: 'Oct 2026',
    image: '/assets/aistudio/cert-aws-shared_9990f017.jpg',
    verifyUrl: 'https://www.credly.com/users/muhammed-abdul-azeez.4c97459e',
    summary: 'Security of the cloud vs. security in the cloud and customer compliance boundaries.'
  },
  {
    id: 'cert-aws-iam-troubleshooting',
    title: 'AWS IAM - Troubleshooting',
    issuer: 'Amazon Web Services',
    issuerCategory: 'cloud',
    date: 'Oct 2026',
    image: '/assets/aistudio/cert-aws-trouble_d4c38b5c.jpg',
    verifyUrl: 'https://www.credly.com/users/muhammed-abdul-azeez.4c97459e',
    summary: 'Diagnosing explicit denies, policy conflicts, and IAM evaluation errors.'
  },
  {
    id: 'cert-grc-elevify',
    title: 'GRC Certification (NDPC Framework)',
    issuer: 'Elevify',
    issuerCategory: 'grc',
    date: '2026 (34 Hours)',
    image: '/assets/aistudio/cert-grc_a50a8f53.jpg',
    verifyUrl: 'https://www.credly.com/users/muhammed-abdul-azeez.4c97459e',
    summary: 'Governance, Risk, Compliance, and Nigeria Data Protection (NDPR 2019) privacy controls.'
  },
  {
    id: 'cert-alison-vapt',
    title: 'Vulnerability Assessment & Penetration Testing',
    issuer: 'Alison (CPD Certified)',
    issuerCategory: 'offensive',
    date: 'Apr 2024',
    image: '/assets/aistudio/cert-alison_cd77f272.jpg',
    verifyUrl: 'https://alison.com/certification/check/CPD-VAPT',
    summary: 'Vulnerability scanning workflows, threat modeling, and assessment reporting.'
  },
  {
    id: 'cert-thm-ctf',
    title: 'Love at First Breach — CTF',
    issuer: 'TryHackMe',
    issuerCategory: 'offensive',
    date: 'Feb 2026',
    image: '/assets/aistudio/cert-thm-ctf_706ad167.jpg',
    credentialId: 'Handle: MUHAMMEDAZEEZ770',
    verifyUrl: 'https://tryhackme.com/p/Muhammedazeez770',
    summary: 'Hands-on offensive CTF web exploitation and reverse engineering challenges.'
  },
  {
    id: 'cert-thm-hacker-holidays',
    title: 'Hacker Holidays — Participation',
    issuer: 'TryHackMe',
    issuerCategory: 'offensive',
    date: 'Aug 2026',
    image: '/assets/aistudio/cert-thm-hacker_a8a31ec5.jpg',
    credentialId: 'THM-RDQNE3PC3T',
    verifyUrl: 'https://tryhackme.com/p/Muhammedazeez770',
    summary: 'Practical security lab machine exploitation and privilege escalation challenges.'
  },
  {
    id: 'cert-credly-wallet',
    title: 'Credly Badges (APIsec & Cisco)',
    issuer: 'Credly',
    issuerCategory: 'badge',
    date: '2025 - 2026',
    image: '/assets/aistudio/cert-credly_560761c2.jpg',
    verifyUrl: 'https://www.credly.com/users/muhammed-abdul-azeez.4c97459e',
    summary: 'Includes API Security Fundamentals \'25 (APIsec Univ), Cisco Cybersecurity, and Cisco Networking Basics.'
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'cloud',
    title: 'Cloud Security & IAM',
    howIUseIt: 'Build least-privilege IAM roles, verify access bindings with Policy Analyzer, lock down VPC ingress rules, and triage open ports in Google SCC.',
    tools: ['AWS IAM', 'Google Cloud IAM', 'GCP VPC Firewalls', 'Google SCC', 'Policy Analyzer', 'Cloud Logging']
  },
  {
    id: 'appsec',
    title: 'Offensive Security & AppSec',
    howIUseIt: 'Intercept requests with Burp Suite Pro, test authentication and SSRF logic flaws, run automated XSS scans, and document concrete fixes.',
    tools: ['Burp Suite Pro', 'Repeater & Intruder', 'Burp Collaborator', 'GCP Web Security Scanner', 'Nmap', 'Kali Linux']
  },
  {
    id: 'iam',
    title: 'Zero-Trust Identity',
    howIUseIt: 'Containerize Keycloak 24 in Docker, enforce OAuth 2.0 / OIDC authorization flows, mandate TOTP QR enrollment, and apply route-level RBAC.',
    tools: ['Keycloak 24', 'OAuth 2.0 / OIDC', 'TOTP MFA', 'Docker', 'Flask RBAC', 'JWT']
  },
  {
    id: 'grc',
    title: 'GRC & Compliance',
    howIUseIt: 'Audit cloud infrastructure against CIS benchmarks and align system controls with NDPC / NDPR 2019 privacy requirements.',
    tools: ['NDPC / NDPR 2019', 'CIS Benchmarks', 'Risk Triage', 'Audit Logging', 'Linux Hardening']
  }
];

export const TEACHING_TOPICS = [
  'Cloud IAM Least Privilege & Policy Analysis (AWS / GCP)',
  'Web Application Penetration Testing with Burp Suite',
  'Zero-Trust Identity & TOTP MFA with Keycloak',
  'Linux Security Fundamentals & Perimeter Defense'
];

export const CV_DATA = {
  summary: 'Cloud Security Analyst and Ethical Hacker focused on AWS/GCP IAM least privilege, Zero-Trust identity (Keycloak OIDC/MFA), VPC perimeter security, and web application testing. Completed 78 PortSwigger labs (55 Auth, 23 SSRF), Aptech Smart Professional Ethical Hacking (Credit Grade), Google Cloud Cybersecurity, and AWS IAM training.',
  education: [
    {
      degree: 'Smart Professional - Ethical Hacking (Credit Grade)',
      institution: 'Aptech Computer Education',
      year: '2025'
    },
    {
      degree: 'GRC Certification (34 Hours)',
      institution: 'Elevify / NDPC Framework',
      year: '2026'
    }
  ],
  coreCompetencies: [
    'Cloud Security (AWS IAM, GCP IAM, VPC, SCC)',
    'Identity & Access Management (Keycloak, OIDC, RBAC, TOTP)',
    'Web AppSec & Pentesting (Burp Suite Pro, SSRF, XSS, Auth)',
    'GRC & Benchmarks (NDPR 2019, CIS Controls)'
  ]
};
