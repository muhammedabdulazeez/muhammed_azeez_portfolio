import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateCyberLesson(queryText: string, rawPrompt?: string): string {
  const q = (queryText || '').toLowerCase();

  if (q.includes('ssrf')) {
    return `### 🛡️ Understanding Server-Side Request Forgery (SSRF)

**Server-Side Request Forgery (SSRF)** occurs when a web application makes an HTTP request to an untrusted URL specified by an end-user.

#### 1. Vulnerability Mechanics
When an app accepts user input (e.g. \`?avatar_url=...\` or \`?webhook=...\`) and uses a server-side client (cURL, fetch, requests) to fetch it without strict network boundary enforcement:
- An attacker supplies an internal address: \`http://169.254.169.254/latest/meta-data/\` or \`http://127.0.0.1:8080/admin\`.
- Because the request originates from the server itself, internal firewalls trust it.

#### 2. Cloud Metadata Exploitation
On AWS / GCP / Azure compute instances:
\`\`\`http
GET /latest/meta-data/iam/security-credentials/EC2-Role HTTP/1.1
Host: 169.254.169.254
\`\`\`
The attacker retrieves temporary AWS AccessKeyId, SecretAccessKey, and Token!

#### 3. Defensive Remediation
1. **Enforce IMDSv2**: Require session-oriented PUT requests with a TTL header:
   \`\`\`bash
   aws ec2 modify-instance-metadata-options --instance-id i-xxxx --http-tokens required
   \`\`\`
2. **Strict IP/DNS Whitelisting**: Resolve hostnames and drop RFC 1918 private subnets (\`10.0.0.0/8\`, \`172.16.0.0/12\`, \`192.168.0.0/16\`, \`127.0.0.0/8\`, \`169.254.0.0/16\`).`;
  }

  if (q.includes('iam') || q.includes('privilege')) {
    return `### 🔑 AWS IAM & Least Privilege Architecture

**Least Privilege** is the cornerstone of cloud security: an identity should possess only the exact permissions needed to execute its business role—nothing more.

#### Key Principles:
1. **Never use wildcard actions on sensitive resources**:
   - ❌ Bad: \`"Action": "s3:*", "Resource": "*"\`
   - ✅ Good: \`"Action": ["s3:GetObject"], "Resource": "arn:aws:s3:::client-vault/*"\`
2. **Permission Boundaries**:
   A managed policy that defines the maximum permissions an IAM entity can ever obtain, preventing delegated administrators from elevating themselves to full AdministratorAccess.
3. **IAM Policy Example**:
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "RestrictedS3Audit",
      "Effect": "Allow",
      "Action": ["s3:ListBucket", "s3:GetObject"],
      "Resource": [
        "arn:aws:s3:::audit-logs-2026",
        "arn:aws:s3:::audit-logs-2026/*"
      ],
      "Condition": {
        "Bool": { "aws:SecureTransport": "true" }
      }
    }
  ]
}
\`\`\`
4. **Audit Pipeline**: Use AWS IAM Access Analyzer and GCP Policy Analyzer to catch external sharing or unused permissions.`;
  }

  if (q.includes('keycloak') || q.includes('oidc') || q.includes('mfa')) {
    return `### 🔒 Zero-Trust Identity: Keycloak 24 OIDC & TOTP MFA

Muhammed Abdulazeez deployed this in the **AuthShield 360** architecture:

#### 1. OAuth 2.0 / OIDC Authorization Code Flow with PKCE
- **Code Verifier**: A cryptographically random secret created in the client browser.
- **Code Challenge**: SHA-256 hash of the verifier (\`BASE64URL(SHA256(verifier))\`).
- When exchanging the auth code at Keycloak's \`/token\` endpoint, the client presents the original \`code_verifier\`. Even if an attacker intercepts the authorization code, they cannot exchange it without the verifier!

#### 2. TOTP Multi-Factor Authentication
- Keycloak generates an HMAC-based Secret Key encoded in a QR code.
- User authenticator (Google Authenticator / FreeOTP) computes a 6-digit rolling token:
  \`\`\`
  TOTP = Truncate(HMAC-SHA1(Secret, Floor(CurrentTime / 30)))
  \`\`\`
- Enforced on all administrator realm profiles before session token issuance.`;
  }

  if (q.includes('cache') || q.includes('deception')) {
    return `### ⚡ Web Cache Deception (WCD) Deep-Dive

Web Cache Deception exploits discrepancies in how a **CDN/Cache Proxy** and the **Origin Application** parse URL paths.

#### Attack Walkthrough:
1. Origin server routes dynamic content: \`/account/settings\` renders personal email and API keys.
2. If origin interprets path delimiters flexibly, navigating to \`/account/settings/avatar.css\` will still invoke \`/account/settings\` and return the HTML body!
3. However, the CDN inspects the URL extension (\`.css\`), categorizes it as a static asset, and caches the response on public edge servers.
4. The attacker sends the link to the authenticated victim. Once visited, the attacker requests \`/account/settings/avatar.css\` and views the cached victim PII!

#### Remediations:
- Send explicit \`Cache-Control: no-store, private\` on all authenticated endpoints.
- Ensure the CDN and Origin share identical path normalization rules.`;
  }

  if (q.includes('ctf') || q.includes('challenge') || q.includes('quiz')) {
    return `### 🎯 Medxploit CTF Simulation Challenge

**Target**: *FinCorp Cloud Invoice Portal*
**Scenario**:
You are auditing an API endpoint:
\`POST /api/v1/invoices/export\`
\`\`\`json
{
  "invoiceId": "INV-2026-9921",
  "format": "PDF",
  "callbackUrl": "https://billing.internal/status"
}
\`\`\`

**Question for you, Operator**:
1. What vulnerability would you test for in the \`callbackUrl\` field?
2. If the internal backend sits on an AWS EC2 instance, what exact payload would you submit to probe for instance credentials?
3. What defensive header or mechanism prevents this exploit?

*(Reply with your answers and I will grade your methodology!)*`;
  }

  return `### 🛡️ Medxploit Cyber Defense Briefing

**Query Analysis**: *"${rawPrompt || 'Security Concepts'}"*

In modern enterprise security, defense requires synchronized controls across all layers:

1. **Cloud Infrastructure**: Enforce VPC private subnets, disable public SSH/RDP ports (\`22\` / \`3389\`), and activate continuous CSPM (Google SCC / AWS Security Hub).
2. **Identity & Access**: Adopt Zero-Trust. No user or service is trusted by default. Enforce Keycloak/Okta OIDC with Hardware MFA and Least Privilege RBAC.
3. **Application Security (AppSec)**: Test against OWASP Top 10 with Burp Suite Pro. Validate all inputs, escape outputs to prevent XSS, and parameterize database queries.
4. **GRC & Regulatory Compliance**: Maintain compliance with the **NDPC / NDPR 2019** data protection framework and CIS benchmarks.

*Ask me to dive deeper into any topic, inspect a payload, or test your skills with a CTF challenge!*`;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  const rawApiKey = (process.env.GEMINI_API_KEY || '').trim();
  const hasValidApiKey = rawApiKey.length > 10 && rawApiKey !== 'MY_GEMINI_API_KEY';

  let ai: GoogleGenAI | null = null;
  if (hasValidApiKey) {
    ai = new GoogleGenAI({
      apiKey: rawApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

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

  // Multi-turn Medxploit Chat Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, message } = req.body;

      if (!message && (!messages || messages.length === 0)) {
        return res.status(400).json({ error: 'Message content is required.' });
      }

      const queryText = (message || (messages && messages[messages.length - 1]?.content) || '').toLowerCase();

      // If no valid GEMINI_API_KEY is configured or ai client not initialized, return instant curated lesson
      if (!hasValidApiKey || !ai) {
        return res.json({
          reply: generateCyberLesson(queryText, message),
          role: 'model',
        });
      }

      // Format conversation history for Gemini API
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

      let response: any;
      try {
        // Timeout helper to avoid any upstream hanging
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('TIMEOUT')), 8000)
        );

        response = await Promise.race([
          ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents,
            config: {
              systemInstruction: MEDXPLOIT_SYSTEM_INSTRUCTION,
            },
          }),
          timeoutPromise,
        ]);
      } catch (primaryErr: any) {
        console.warn('Primary model error, attempting gemini-3.1-flash-lite:', primaryErr?.message);
        try {
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('TIMEOUT')), 6000)
          );
          response = await Promise.race([
            ai.models.generateContent({
              model: 'gemini-3.1-flash-lite',
              contents,
              config: {
                systemInstruction: MEDXPLOIT_SYSTEM_INSTRUCTION,
              },
            }),
            timeoutPromise,
          ]);
        } catch (secondaryErr: any) {
          console.warn('Providing resilient cyber lesson:', secondaryErr?.message);
          return res.json({
            reply: generateCyberLesson(queryText, message),
            role: 'model',
          });
        }
      }

      const replyText =
        response?.text || generateCyberLesson(queryText, message);

      return res.json({
        reply: replyText,
        role: 'model',
      });
    } catch (error: any) {
      console.error('Medxploit API Error:', error);
      const queryText = (req.body?.message || '').toLowerCase();
      return res.json({
        reply: generateCyberLesson(queryText, req.body?.message),
        role: 'model',
      });
    }
  });

  // Mount Vite in dev mode or serve built files in production
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Medxploit Server] Operational on http://0.0.0.0:${PORT}`);
  });
}

startServer();
