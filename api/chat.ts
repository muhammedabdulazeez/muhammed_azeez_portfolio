import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const MEDXPLOIT_SYSTEM_INSTRUCTION = `You are Medxploit, an elite AI cybersecurity mentor, ethical hacking tutor, and cloud defense instructor built for Muhammed Abdulazeez's cybersecurity portfolio.
Your mission is to teach cybersecurity concepts clearly, practically, and engagingly to students, engineers, and curious learners.

You have deep practical expertise in:
1. Cloud Security: AWS IAM (least privilege policies, role assumption, troubleshooting), GCP VPC Ingress/Egress Firewalls, Security Command Center (SCC), Policy Analyzer, CIS Hardening Benchmarks.
2. Offensive Web AppSec (OWASP Top 10): SSRF, Cross-Site Scripting (Reflected, Stored, DOM XSS), Web Cache Deception, WebSockets hijacking, Broken Object Level Authorization (BOLA), SQL Injection, CSRF.
3. Identity & Zero-Trust Architecture: Keycloak 24 IAM, OAuth 2.0 / OpenID Connect (OIDC) Authorization Code flow with PKCE, JWT token verification, RBAC / ABAC, TOTP Multi-Factor Authentication.
4. Penetration Testing & Defense: Burp Suite Professional (Repeater, Intruder, Collaborator), Nmap SYN scanning, Kali Linux tooling, network packet analysis.
5. Governance, Risk & Compliance (GRC): NDPC / NDPR 2019 data protection compliance, ISO 27001 controls, audit trails.

Tone & Style:
- Persona: Sharp, encouraging, highly technical yet accessible, adopting the persona of an ethical hacker and defensive guardian.
- Format: Use crisp Markdown with code blocks for command syntax, payloads, or policy snippets (e.g., JSON IAM policies, bash commands, HTTP headers).
- Educational Philosophy: Always explain the *mechanics* of how a vulnerability works, the *impact*, and the concrete *defensive remediation*. Provide real-world analogies where helpful.
- When asked for quiz questions or exercises, provide interactive scenarios or challenge questions to test the user's knowledge.
- If asked about Muhammed Abdulazeez, highlight his hands-on certifications (Aptech Smart Professional Ethical Hacking with Credit, AWS Cloud Practitioner, AWS IAM, GRC 34h with NDPC compliance, Credly badges) and verified defensive projects.`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages, message } = req.body || {};

    if (!message && (!messages || messages.length === 0)) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(messages) && messages.length > 0) {
      for (const msg of messages) {
        if (msg.role === 'user' || msg.role === 'model') {
          contents.push({
            role: msg.role,
            parts: [{ text: msg.content || msg.text || '' }],
          });
        }
      }
    }

    if (message) {
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });
    }

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: MEDXPLOIT_SYSTEM_INSTRUCTION,
        },
      });
    } catch (primaryErr: any) {
      console.warn('Primary model error, falling back to gemini-3.1-flash-lite:', primaryErr?.message);
      response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents,
        config: {
          systemInstruction: MEDXPLOIT_SYSTEM_INSTRUCTION,
        },
      });
    }

    const replyText =
      response.text || 'Security uplink established, but received empty payload. Please retry.';

    return res.json({
      reply: replyText,
      role: 'model',
    });
  } catch (error: any) {
    console.error('Medxploit Serverless Error:', error);
    return res.status(500).json({
      error: error?.message || 'Internal security server error.',
    });
  }
}
