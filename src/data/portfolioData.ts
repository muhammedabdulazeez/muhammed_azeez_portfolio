export interface Project {
  id: string;
  title: string;
  category: 'cloud' | 'pentest' | 'iam' | 'grc';
  categoryLabel: string;
  subtitle: string;
  description: string;
  fullDetails: {
    overview: string;
    challenge: string;
    solution: string;
    keyFindings: string[];
    toolsUsed: string[];
  };
  thumbnail: string;
  images: string[];
  badge: string;
  tags: string[];
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
  verifyUrl?: string;
  description: string;
  skills: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  tools: string[];
  skills: {
    name: string;
    icon: string;
    details: string;
    impact: string;
  }[];
}

export const PERSONAL_INFO = {
  name: 'Muhammed Abdulazeez',
  fullName: 'Muhammed Oluwatimileyin Abdulazeez',
  role: 'Cloud Security Analyst · Offensive AppSec · IAM Specialist',
  headline: 'Securing Cloud Infrastructures, Web Applications & Identity Perimeters',
  bio: 'I help organizations discover and remediate security vulnerabilities before threat actors exploit them. Practical, hands-on proficiency in AWS IAM least-privilege policies, Google Cloud VPC perimeter firewalls, Keycloak Zero-Trust MFA, and offensive web application testing with Burp Suite. Eager to bring immediate value and strong work ethic as a Full-Time Security Analyst, Junior Engineer, Penetration Tester, or Security Intern (Open to Remote & Worldwide Relocation).',
  email: 'muhammedabdulazeez770@gmail.com',
  location: 'Lagos, Nigeria · Open to Global Remote & Relocation',
  availability: '🟢 Ready to Work: Open to Full-Time, Junior Roles, or Internships (Immediate Availability)',
  portraitImage: '/assets/aistudio/portrait_d5fda6fa.jpg',
  workstationImage: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_12.27.23_464e322f.jpeg',
  hackerAiImage: '/src/assets/images/hacker_ai_avatar_1794235471805.jpg',
  github: 'https://github.com/muhammedabdulazeez',
  linkedin: 'https://www.linkedin.com/in/timi-azeez36/',
  twitter: 'https://x.com/Medxploit',
  medium: 'https://medium.com/@muhammedabdulazeez770',
  tryhackme: 'https://tryhackme.com/p/Muhammedazeez770',
  credly: 'https://www.credly.com/users/muhammed-abdul-azeez.4c97459e',
  stats: [
    { label: 'Verified Credentials', value: '11+' },
    { label: 'Security Labs & CTFs', value: '78+' },
    { label: 'Zero-Trust IAM Deployed', value: '100%' },
    { label: 'Immediate Availability', value: 'Open' },
  ]
};

export const PLAYLISTS = {
  spotify: {
    title: 'Security Focus & Coding Beats',
    subtitle: 'Official Curated Spotify Playlist for Muhammed Abdulazeez',
    embedUrl: 'https://open.spotify.com/embed/playlist/0310BzBG2RzCoJOSwowtaN?utm_source=generator&theme=0',
    externalUrl: 'https://open.spotify.com/playlist/0310BzBG2RzCoJOSwowtaN?si=5f8ff00fbd284cb1'
  },
  youtube: {
    title: 'Cloud Security & Ethical Hacking Stream',
    subtitle: 'Curated Security Playlist: Hands-on Labs & Attack Walkthroughs',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLhRi2qermsC2M54wMax4FI1gRzp9YkOOs',
    externalUrl: 'https://youtube.com/playlist?list=PLhRi2qermsC2M54wMax4FI1gRzp9YkOOs&si=V-uc6t2jtxWpPtWo'
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'authshield-360',
    title: 'AuthShield 360 – Enterprise Zero-Trust IAM & OIDC Portal',
    category: 'iam',
    categoryLabel: 'Identity & Access Management',
    subtitle: 'Containerized OpenID Connect, TOTP MFA, and granular Role-Based Access Control.',
    description: 'Designed and deployed an enterprise-grade identity provider setup using Keycloak 24 and a Flask Relying Party portal, enforcing MFA enrollment and least-privilege RBAC policies.',
    fullDetails: {
      overview: 'AuthShield 360 solves enterprise authentication vulnerabilities by decoupling authentication from application logic using a centralized Keycloak 24 Identity Provider (IdP) operating inside Docker networks with MailHog SMTP relay.',
      challenge: 'Legacy applications often suffer from credential stuffing, lack of mandatory multi-factor authentication (MFA), and broken object-level authorization where unauthorized roles access sensitive academic records.',
      solution: 'Architected an OIDC authorization code flow with backchannel token exchange. Enforced mandatory mobile authenticator (TOTP QR code) registration before initial login, brute-force temporary lockout, and strict RBAC decorators.',
      keyFindings: [
        'Mandatory TOTP prevents credential compromise even if primary passwords leak.',
        'Backchannel authorization code exchange prevents token interception in user browser.',
        'Verified TC-01: student1 receives 200 OK on academic roster, but TC-02: student1 receives strict 403 Forbidden on /grades.'
      ],
      toolsUsed: ['Keycloak 24', 'OAuth 2.0 / OIDC', 'Docker Bridge Network', 'Flask', 'TOTP MFA', 'MailHog SMTP', 'RBAC']
    },
    thumbnail: '/assets/aistudio/proj-authshield_94134474.jpg',
    images: [
      '/assets/aistudio/proj-authshield_94134474.jpg',
      '/assets/aistudio/proj-authshield-rbac_8792f419.jpg'
    ],
    badge: 'Enterprise Architecture',
    tags: ['Keycloak', 'OAuth2/OIDC', 'TOTP MFA', 'Docker', 'RBAC'],
    date: '2026'
  },
  {
    id: 'gcp-iam-least-privilege',
    title: 'Google Cloud IAM Least-Privilege Role & Policy Audit',
    category: 'cloud',
    categoryLabel: 'Cloud Security & IAM',
    subtitle: 'Custom role engineering, principal-role bindings, and Policy Analyzer audit verification.',
    description: 'Constructed custom Google Cloud IAM roles tailored for compliance auditors ("Audit Team Reviewer"), strictly adhering to the least privilege principle and validating access through Policy Analyzer.',
    fullDetails: {
      overview: 'Demonstrated real-world cloud security operations by replacing over-privileged predefined administrative roles with precisely scoped custom roles, followed by independent policy query validation.',
      challenge: 'Predefined cloud roles frequently bundle overly broad permissions (e.g., Editor or Viewer), exposing internal resources to lateral movement and privilege escalation attacks.',
      solution: 'Formulated a custom role "Audit Team Reviewer" with strictly limited view/audit capabilities, attached the role to the auditor identity via IAM policy binding, and verified effective permissions using GCP Policy Analyzer custom queries.',
      keyFindings: [
        'Adhered strictly to the formula: Principal + Role + Allow Policy = Access Granted.',
        'Zero individual direct permissions granted—all access flows via reusable, auditable roles.',
        'Confirmed exact policy bindings via Policy Analyzer, satisfying quarterly compliance attestations.'
      ],
      toolsUsed: ['Google Cloud IAM', 'GCP Policy Analyzer', 'Role Launch Stages (GA)', 'Cloud Audit Logs']
    },
    thumbnail: '/assets/aistudio/proj-iam_deac8c6c.jpg',
    images: [
      '/assets/aistudio/proj-iam_deac8c6c.jpg',
      '/assets/aistudio/proj-iam-verify_d2fe28fe.jpg'
    ],
    badge: 'Least Privilege',
    tags: ['Google Cloud', 'IAM Policies', 'Policy Analyzer', 'Audit Verification'],
    date: '2026'
  },
  {
    id: 'gcp-vpc-firewall',
    title: 'GCP VPC Perimeter Defense & Network Telemetry Inspection',
    category: 'cloud',
    categoryLabel: 'Network & Cloud Security',
    subtitle: 'Custom VPC ingress rules, stateful inspection, and Cloud Logging flow analysis.',
    description: 'Configured robust perimeter firewall policies in Google Cloud VPC to restrict ingress traffic, tagging specific compute workloads, and monitoring connection dispositions in Cloud Logging.',
    fullDetails: {
      overview: 'Built a hardened virtual private cloud perimeter defense using custom ingress firewall rules and Cloud Logging query analytics to isolate critical services from the public internet.',
      challenge: 'Default firewall rules in cloud environments often permit unrestricted internal traffic and broad SSH/RDP exposure, leaving virtual machines open to brute-force attacks and port scans.',
      solution: 'Implemented ingress rule "allow-http-ssh" with target tag isolation (http-server), strict priority enforcement (priority 1000), and logging enabled. Leveraged Cloud Logging Explorer to query ALLOWED vs DROPPED packet dispositions.',
      keyFindings: [
        'Target tags prevent unauthorized ingress to untagged database and backend VM instances.',
        'Real-time Cloud Logging queries captured dropped probes against unauthorized ports.',
        'Validated firewall telemetry against SIEM log formats for rapid incident triage.'
      ],
      toolsUsed: ['Google Cloud VPC', 'Firewall Policies', 'Cloud Logging Explorer', 'Network Security', 'Traffic Analysis']
    },
    thumbnail: '/assets/aistudio/proj-firewall_32bdbd78.jpg',
    images: [
      '/assets/aistudio/proj-firewall_32bdbd78.jpg',
      '/assets/aistudio/proj-firewall-logs_ffb2022d.jpg'
    ],
    badge: 'Perimeter Defense',
    tags: ['GCP VPC', 'Firewall Rules', 'Cloud Logging', 'Network Telemetry'],
    date: '2026'
  },
  {
    id: 'gcp-scc-posture',
    title: 'Continuous Cloud Security Posture Management (CSPM) via Google SCC',
    category: 'cloud',
    categoryLabel: 'Threat Detection & CSPM',
    subtitle: 'Security Command Center risk evaluation, attack exposure triage, and compliance audit.',
    description: 'Utilized Google Cloud Security Command Center (SCC) to detect high-severity misconfigurations (Open SSH/RDP), assess attack exposure scores, and audit compliance benchmarks.',
    fullDetails: {
      overview: 'Managed cloud security posture across enterprise GCP assets using Security Command Center to surface active threats, misconfigurations, and regulatory non-compliance.',
      challenge: 'Modern cloud footprints suffer from configuration drift, where developers inadvertently leave public management ports open or disable vital encryption and logging controls.',
      solution: 'Configured SCC Security Health Analytics findings queries to prioritize High Severity findings (Open SSH port & Open RDP port), reviewed attack exposure scores, and evaluated benchmark compliance details.',
      keyFindings: [
        'Detected high-severity open management ports on public VM compute instances.',
        'Triaged non-compliant controls across CIS benchmark criteria (1.2.1, 7.1.2, 10.1, 10.2).',
        'Implemented automated remediation workflows to seal attack paths before exploitation.'
      ],
      toolsUsed: ['Google Security Command Center (SCC)', 'Security Health Analytics', 'CIS Benchmarks', 'Attack Exposure Scoring']
    },
    thumbnail: '/assets/aistudio/proj-scc_f28c0478.jpg',
    images: [
      '/assets/aistudio/proj-scc_f28c0478.jpg',
      '/assets/aistudio/proj-scc-rules_b572ec61.jpg'
    ],
    badge: 'CSPM & Risk',
    tags: ['Google SCC', 'Threat Detection', 'Compliance Audit', 'Attack Exposure'],
    date: '2026'
  },
  {
    id: 'web-hack-diaries-auth',
    title: 'Web Hack Diaries: Advanced Authentication & SSRF Exploitation',
    category: 'pentest',
    categoryLabel: 'Offensive Security & AppSec',
    subtitle: '100% completion on PortSwigger Practitioner tracks: 55 Auth & 23 SSRF labs solved.',
    description: 'Comprehensive research and technical writeups documenting modern web vulnerability exploitation using Burp Suite Pro, covering password resets, 2FA bypasses, and blind SSRF.',
    fullDetails: {
      overview: 'A deep-dive offensive security research series focused on dissecting vulnerabilities in web authentication, session management, and server-side request forgery (SSRF).',
      challenge: 'Modern web applications use seemingly secure mechanisms (hashing, 2FA, password resets, backend APIs) that fail catastrophically when implemented with flawed business logic.',
      solution: 'Executed targeted Burp Suite Repeater and Intruder attacks to identify rate-limiting bypasses, 2FA broken logic, out-of-band blind SSRF via Burp Collaborator, and cache server normalization deception.',
      keyFindings: [
        'Completed all 55/55 Authentication Vulnerability labs on PortSwigger Web Security Academy.',
        'Completed all 23/23 Server-Side Request Forgery (SSRF) labs including circumvention techniques.',
        'Engineered defense guides for secure WebSocket handshakes (CSRF origin check, wss://, SameSite Strict).'
      ],
      toolsUsed: ['Burp Suite Professional', 'Repeater & Intruder', 'Burp Collaborator', 'PortSwigger Academy', 'WebSockets', 'SSRF Payloads']
    },
    thumbnail: '/assets/aistudio/proj-webhack-auth_958aec1a.jpg',
    images: [
      '/assets/aistudio/proj-webhack-auth_958aec1a.jpg',
      '/assets/aistudio/proj-webhack-ssrf_a8c5f1ee.jpg',
      '/assets/aistudio/proj-webhack-cache_6a6defe1.jpg',
      '/assets/aistudio/proj-webhack-ws_1bdab829.jpg',
      '/assets/aistudio/proj-pentest-burp_bca3022f.jpg'
    ],
    badge: '100% Practitioner Solved',
    tags: ['Burp Suite Pro', 'PortSwigger Academy', 'SSRF', 'Auth Bypass', 'WebSockets'],
    date: '2026'
  },
  {
    id: 'gcp-web-security-scanner',
    title: 'Automated Web Vulnerability Scanning & Cross-Site Scripting (XSS) Triaging',
    category: 'pentest',
    categoryLabel: 'Vulnerability Assessment',
    subtitle: 'Compute Engine testbed deployment, automated crawl, and verified XSS bug triaging.',
    description: 'Deployed and tested web targets on Google Cloud Compute Engine, configured gcloud firewall rules, and performed automated scans using Web Security Scanner to confirm 3 XSS vectors.',
    fullDetails: {
      overview: 'Conducted automated and manual vulnerability assessment against containerized applications hosted on Google Cloud VM instances (`lab-vm`, `xss-test-vm-instance`).',
      challenge: 'Unescaped user input in web endpoints creates high-risk stored and reflected Cross-Site Scripting vectors that compromise user sessions.',
      solution: 'Provisioned dedicated VM instances, created custom firewall rules (`enable-wss-scan`), launched targeted crawls, and verified root causes of 3 identified unescaped input vulnerabilities.',
      keyFindings: [
        'Detected 3 active unescaped cross-site scripting vulnerabilities on port 8080.',
        'Demonstrated automated vulnerability identification in under 2 minutes 16 seconds.',
        'Prescribed context-aware HTML entity encoding and strict Content Security Policy (CSP) mitigations.'
      ],
      toolsUsed: ['GCP Web Security Scanner', 'Google Compute Engine', 'gcloud CLI', 'XSS Exploitation', 'CSP Hardening']
    },
    thumbnail: '/assets/aistudio/proj-xss_6756102f.jpg',
    images: [
      '/assets/aistudio/proj-xss_6756102f.jpg',
      '/assets/aistudio/proj-xss-alert_3dccce23.jpg'
    ],
    badge: 'Vulnerability Triage',
    tags: ['Web Security Scanner', 'GCP Compute', 'XSS', 'gcloud CLI', 'Remediation'],
    date: '2026'
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'cert-aptech-ethical-hacking',
    title: 'Smart Professional - Ethical Hacking',
    issuer: 'Aptech Computer Education',
    issuerCategory: 'offensive',
    date: 'August 2025 (Issued Nov 2025)',
    image: '/assets/aistudio/cert-aptech_5395fef5.jpg',
    credentialId: 'Sr No: 022379',
    description: 'Awarded with Credit grade at ACE-LAGOS-13-AKOWONJO Centre for mastery of ethical hacking methodologies, footprinting, network sniffing, and penetration testing.',
    skills: ['Ethical Hacking', 'Penetration Testing', 'Network Security', 'Vulnerability Assessment']
  },
  {
    id: 'cert-google-cloud-cyber',
    title: 'Google Cloud Cybersecurity Certificate',
    issuer: 'Google Cloud (Credly Verified)',
    issuerCategory: 'cloud',
    date: 'October 14, 2026',
    image: '/assets/aistudio/cert-gcp_e7af34da.jpg',
    credentialId: 'Credly ID: 23437b0f-7fad-4048-94d1-32d051f90094',
    verifyUrl: 'https://www.credly.com/users/muhammed-abdul-azeez.4c97459e',
    description: 'Comprehensive 5-course Google Cloud cybersecurity specialization covering cloud architecture, security risk management, threat identification, detection, response, and recovery.',
    skills: ['GCP Security', 'Threat Analysis', 'Cloud Incident Response', 'SQL & Telemetry']
  },
  {
    id: 'cert-aws-cloud-practitioner',
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services (AWS)',
    issuerCategory: 'cloud',
    date: 'October 11, 2026',
    image: '/assets/aistudio/cert-aws-ccp_9b68e363.jpg',
    description: 'Official AWS completion certificate demonstrating fundamental knowledge of cloud concepts, security, architecture, pricing, and support.',
    skills: ['AWS Cloud', 'Cloud Economics', 'Security Fundamentals', 'Global Infrastructure']
  },
  {
    id: 'cert-aws-iam',
    title: 'Introduction to AWS Identity and Access Management (IAM)',
    issuer: 'Amazon Web Services (AWS)',
    issuerCategory: 'cloud',
    date: 'October 16, 2026',
    image: '/assets/aistudio/cert-aws-iam_28bbc9d2.jpg',
    description: 'Core certification covering AWS IAM policies, users, groups, roles, permissions boundaries, and least-privilege identity access management.',
    skills: ['AWS IAM', 'Least Privilege', 'Policy Evaluation', 'Multi-Account Access']
  },
  {
    id: 'cert-aws-shared-responsibility',
    title: 'AWS Shared Responsibility Model',
    issuer: 'Amazon Web Services (AWS)',
    issuerCategory: 'cloud',
    date: 'October 16, 2026',
    image: '/assets/aistudio/cert-aws-shared_9990f017.jpg',
    description: 'Deep dive into security of the cloud versus security in the cloud, compliance boundaries, and operational ownership in multi-tenant environments.',
    skills: ['Shared Responsibility', 'Cloud Compliance', 'Customer vs Cloud Provider Controls']
  },
  {
    id: 'cert-aws-iam-troubleshooting',
    title: 'AWS IAM - Troubleshooting',
    issuer: 'Amazon Web Services (AWS)',
    issuerCategory: 'cloud',
    date: 'October 17, 2026',
    image: '/assets/aistudio/cert-aws-trouble_d4c38b5c.jpg',
    description: 'Specialized diagnostic training for resolving complex policy conflicts, implicit denies, boundary mismatches, and access evaluation anomalies.',
    skills: ['IAM Policy Troubleshooting', 'Access Analyzer', 'Deny Precedence', 'Role Debugging']
  },
  {
    id: 'cert-grc-elevify',
    title: 'GRC (Governance, Risk & Compliance) Certification',
    issuer: 'Elevify (NDPC Framework)',
    issuerCategory: 'grc',
    date: '2026 (34 Hours Completed)',
    image: '/assets/aistudio/cert-grc_a50a8f53.jpg',
    description: 'Completed 34 hours of rigorous continuing education compliant with Nigeria Data Protection Commission (NDPC) & NDPR 2019 standards.',
    skills: ['GRC', 'NDPR 2019', 'Data Privacy', 'Risk Assessment', 'Compliance Frameworks']
  },
  {
    id: 'cert-alison-vapt',
    title: 'Vulnerability Assessment and Penetration Testing (VAPT)',
    issuer: 'Alison (CPD Certified)',
    issuerCategory: 'offensive',
    date: 'April 2024',
    image: '/assets/aistudio/cert-alison_cd77f272.jpg',
    description: 'CPD-certified coursework in professional vulnerability assessment, threat modeling, scanning methodologies, and penetration testing workflows.',
    skills: ['VAPT', 'Vulnerability Assessment', 'CPD Certified', 'Reporting & Remediation']
  },
  {
    id: 'cert-thm-ctf',
    title: 'Love at First Breach – CTF Participation',
    issuer: 'TryHackMe',
    issuerCategory: 'offensive',
    date: '25th February 2026',
    image: '/assets/aistudio/cert-thm-ctf_706ad167.jpg',
    credentialId: 'Handle: MUHAMMEDAZEEZ770',
    description: 'Solved real-world offensive cybersecurity challenges, reverse engineering, exploit payloads, and web vulnerability flags in competitive CTF event.',
    skills: ['CTF', 'Offensive Security', 'Reverse Engineering', 'Hands-on Exploitation']
  },
  {
    id: 'cert-thm-hacker-holidays',
    title: 'Hacker Holidays – Certificate of Participation',
    issuer: 'TryHackMe',
    issuerCategory: 'offensive',
    date: '17 August 2026',
    image: '/assets/aistudio/cert-thm-hacker_a8a31ec5.jpg',
    credentialId: 'THM-RDQNE3PC3T',
    description: 'Awarded for active participation and solving advanced offensive security machine labs in TryHackMe Hacker Holidays event.',
    skills: ['Machine Pwning', 'Privilege Escalation', 'Network Exploitation', 'TryHackMe']
  },
  {
    id: 'cert-credly-wallet',
    title: 'Credly Verified Digital Credentials Wallet',
    issuer: 'Credly (Cisco & APIsec)',
    issuerCategory: 'badge',
    date: '2025 - 2026',
    image: '/assets/aistudio/cert-credly_560761c2.jpg',
    credentialId: 'Credly Verified Badges',
    verifyUrl: 'https://www.credly.com/users/muhammed-abdul-azeez.4c97459e',
    description: 'Verified badge wallet featuring API Security Fundamentals \'25 (APIsec Univ), Google Cloud Cybersecurity, Cisco Introduction to Cybersecurity, and Cisco Networking Basics.',
    skills: ['API Security', 'Cisco Networking Basics', 'Cisco Cybersecurity', 'Credly Badges']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Cloud Security & Perimeter Architecture',
    description: 'Securing multi-cloud footprints, hardening IAM boundaries, and preventing lateral movement.',
    tools: ['Google Cloud Platform', 'AWS IAM', 'VPC Firewalls', 'Cloud Logging', 'Security Command Center', 'Policy Analyzer'],
    skills: [
      { 
        name: 'Google Cloud Platform (GCP)', 
        icon: 'Cloud', 
        details: 'Custom IAM roles, VPC perimeter firewalls, Cloud Logging telemetry analysis, Security Health Analytics.',
        impact: 'Remediates public port exposures and prevents privilege escalation across cloud projects.'
      },
      { 
        name: 'Amazon Web Services (AWS)', 
        icon: 'Server', 
        details: 'Least-privilege IAM policies, permission boundaries, IAM policy troubleshooting, CloudTrail logging.',
        impact: 'Eliminates wildcard administrative policies and ensures compliance with Shared Responsibility.'
      },
      { 
        name: 'VPC & Perimeter Firewalls', 
        icon: 'Shield', 
        details: 'Stateful ingress/egress filtering, target tag isolation, network segmentation, packet disposition auditing.',
        impact: 'Isolates sensitive databases and internal microservices from the public internet.'
      },
      { 
        name: 'Cloud Security Posture (CSPM)', 
        icon: 'Activity', 
        details: 'Automated vulnerability discovery via Google SCC, CIS benchmark compliance, attack exposure score evaluation.',
        impact: 'Ensures continuous visibility of configuration drift and open management ports.'
      }
    ]
  },
  {
    title: 'Offensive Security & Web AppSec',
    description: 'Methodical penetration testing, vulnerability discovery, and exploit verification before attackers strike.',
    tools: ['Burp Suite Pro', 'Repeater & Intruder', 'Burp Collaborator', 'PortSwigger Academy', 'Nmap', 'Kali Linux'],
    skills: [
      { 
        name: 'Burp Suite Professional', 
        icon: 'Crosshair', 
        details: 'Advanced manual testing via Repeater, automated fuzzing via Intruder, and out-of-band testing with Collaborator.',
        impact: 'Dissects complex request workflows, authentication bypasses, and multi-step logic flaws.'
      },
      { 
        name: 'OWASP Top 10 Web Vulnerabilities', 
        icon: 'Zap', 
        details: 'Server-Side Request Forgery (SSRF), Cross-Site Scripting (XSS), Web Cache Deception, IDOR, SQL Injection, CSRF.',
        impact: 'Proactively identifies exploitable vulnerabilities in client-facing web applications and APIs.'
      },
      { 
        name: 'WebSocket & API Security', 
        icon: 'Radio', 
        details: 'Cross-site WebSocket hijacking, REST endpoint fuzzing, JWT token inspection, authorization header validation.',
        impact: 'Protects real-time communications and API data flows from unauthorized tampering.'
      },
      { 
        name: 'Network Reconnaissance & Linux Pentesting', 
        icon: 'Terminal', 
        details: 'Stealth SYN scans with Nmap, packet analysis with Wireshark, Bash & Python automation, Metasploit verification.',
        impact: 'Maps internal attack surfaces and validates firewall rules against external port scanners.'
      }
    ]
  },
  {
    title: 'Identity & Access Management (Zero-Trust IAM)',
    description: 'Centralized authentication, OAuth 2.0 / OIDC flows, and multi-factor token verification.',
    tools: ['Keycloak 24', 'OAuth 2.0 / OIDC', 'PKCE', 'TOTP MFA', 'Docker', 'JWT', 'RBAC'],
    skills: [
      { 
        name: 'Keycloak 24 Enterprise IdP', 
        icon: 'Key', 
        details: 'Dedicated realm architecture, client confidential onboarding, backchannel token exchange, Docker deployment.',
        impact: 'Decouples authentication from application code and eliminates hardcoded credentials.'
      },
      { 
        name: 'Multi-Factor Authentication (TOTP)', 
        icon: 'Lock', 
        details: 'Mandatory QR authenticator registration, time-based one-time password verification, brute-force defense.',
        impact: 'Stops credential-stuffing and unauthorized logins even when primary passwords are leaked.'
      },
      { 
        name: 'Role-Based Access Control (RBAC)', 
        icon: 'UserCheck', 
        details: 'Fine-grained policy enforcement decorators, token claim validation, least-privilege role assignment.',
        impact: 'Blocks horizontal and vertical privilege escalation between tenant user tiers.'
      },
      { 
        name: 'OAuth 2.0 / OIDC Authorization Code + PKCE', 
        icon: 'FileCheck', 
        details: 'Cryptographic code_verifier and code_challenge implementation for single-page applications and mobile clients.',
        impact: 'Prevents authorization code interception on untrusted public client browsers.'
      }
    ]
  },
  {
    title: 'Governance, Risk & Compliance (GRC)',
    description: 'Aligning technical architectures with data privacy laws and recognized industry security benchmarks.',
    tools: ['NDPC / NDPR 2019', 'CIS Benchmarks', 'ISO 27001 Controls', 'Risk Assessment', 'Audit Logs'],
    skills: [
      { 
        name: 'NDPC / NDPR 2019 Framework', 
        icon: 'Scale', 
        details: '34-hour certified compliance training, data subject privacy rights, lawful data processing, breach workflows.',
        impact: 'Keeps enterprise systems compliant with Nigerian and international data protection laws.'
      },
      { 
        name: 'CIS Benchmark Auditing', 
        icon: 'CheckCircle2', 
        details: 'Auditing cloud controls against CIS AWS/GCP benchmarks (e.g. disabling public SSH, enforcing MFA).',
        impact: 'Produces defensible, audit-ready cloud baselines that pass third-party security audits.'
      },
      { 
        name: 'Security Risk Assessment & Threat Modeling', 
        icon: 'AlertTriangle', 
        details: 'Evaluating threat likelihood vs impact, architectural risk prioritization, documented remediation roadmaps.',
        impact: 'Provides leadership with clear, risk-weighted recommendations that protect business continuity.'
      }
    ]
  }
];

export const CV_DATA = {
  summary: 'Results-driven Cloud Security Analyst and Offensive Security Specialist with deep expertise in Zero-Trust Identity and Access Management (IAM), Cloud Security Posture Management (CSPM), and Web Application Penetration Testing. Proven track record solving 78+ complex security labs across PortSwigger Web Security Academy and TryHackMe CTFs, certified in Ethical Hacking (Aptech, Credit Grade), Google Cloud Cybersecurity, and AWS Cloud Architecture.',
  education: [
    {
      degree: 'Smart Professional - Ethical Hacking (Credit Grade)',
      institution: 'Aptech Computer Education (ACE-LAGOS-13-AKOWONJO)',
      year: '2025'
    },
    {
      degree: 'GRC (Governance, Risk & Compliance) Certification',
      institution: 'Elevify / NDPC Framework (34 Hours)',
      year: '2026'
    }
  ],
  certificationsSummary: [
    'Smart Professional in Ethical Hacking - Aptech (Credit)',
    'Google Cloud Cybersecurity Certificate (Credly Verified)',
    'AWS Cloud Practitioner Essentials',
    'AWS Identity and Access Management (IAM) & IAM Troubleshooting',
    'AWS Shared Responsibility Model',
    'API Security Fundamentals \'25 - APIsec University',
    'Cisco Networking Academy - Introduction to Cybersecurity & Networking Basics',
    'Vulnerability Assessment and Penetration Testing (VAPT) - Alison',
    'TryHackMe: Love at First Breach CTF & Hacker Holidays'
  ],
  coreCompetencies: [
    'Cloud Security (AWS & Google Cloud)',
    'Identity & Access Management (Keycloak, OIDC, RBAC, TOTP)',
    'Web Application Penetration Testing (Burp Suite Pro)',
    'Network Security & Firewalls (VPC Rules, Logging)',
    'Cloud Security Posture Management (Google SCC, CIS)',
    'Data Protection & GRC (NDPR 2019, Risk Assessment)',
    'Linux System Administration & Bash Automation'
  ]
};
