/** Trust / Security page — mirrors duna.com/resources/trust (certifications section omitted). */

export const TRUST_PAGE_SEO = {
  title: "Engineered for integrity | Trust | AiRAT",
  description:
    "How AiRAT secures its platforms: AWS infrastructure, GDPR-aligned data residency, secure development lifecycle, and continuous penetration testing.",
} as const;

export const TRUST_PAGE_HERO = {
  eyebrow: "Trust",
  headline: "Engineered for integrity",
  lead:
    "Your trust is our foundation. Choosing a partner for onboarding and identity verification is a business-critical decision: we therefore uphold high standards of security.",
} as const;

export type TrustSubFeature = {
  readonly title: string;
  readonly body: string;
};

export type TrustSection = {
  readonly id: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly image?: { readonly src: string; readonly alt: string; readonly width: number; readonly height: number };
  readonly subFeatures?: readonly TrustSubFeature[];
  readonly richParagraphs?: readonly { readonly html: string }[];
};

export const TRUST_SECTIONS: readonly TrustSection[] = [
  {
    id: "secure-infrastructure",
    title: "Secure infrastructure",
    paragraphs: [
      "Our platform runs on AWS infrastructure, with robust physical and logical safeguards. These facilities are monitored 24/7, with multi‑factor access controls and surveillance, ensuring only authorized personnel can reach our systems.",
      "On the network side, production and non‑production environments are isolated, using virtual private networks and segmented subnets, and applying strict firewall rules. This layered approach prevents unauthorized lateral movement and tightly controls traffic flow. Combined with real‑time monitoring and automated alerting, our infrastructure is designed to stay resilient against failures and intrusions.",
    ],
    image: {
      src: "/images/trust/secure-infrastructure.png",
      alt: "Secure cloud infrastructure monitoring console",
      width: 1152,
      height: 1152,
    },
  },
  {
    id: "access-controls",
    title: "Access controls",
    richParagraphs: [
      {
        html: "Tight access controls are fundamental to our security model. Internally, <strong>least‑privilege principles</strong> are enforced: employees receive only the minimum access necessary for their roles, and every access request is reviewed, approved, and logged. Multi‑factor authentication is required via a single‑sign‑on (SSO) solution for all internal systems. All team members sign confidentiality agreements, and undergo security training.",
      },
      {
        html: "On the customer side, the platform offers <strong>role‑based access control (RBAC)</strong> so customers can map their own organizational roles to specific permissions. Whether you’re granting read‑only access to auditors or full admin rights to your risk and compliance teams, AiRAT lets you tailor user privileges down to detail.",
      },
    ],
    paragraphs: [],
    image: {
      src: "/images/trust/access-controls.png",
      alt: "Role-based access control and permissions console",
      width: 1152,
      height: 1152,
    },
  },
  {
    id: "data-encryption",
    title: "Data encryption",
    paragraphs: [
      "With industry‑standard protocols data in transit is encrypted (TLS or equivalent) and data at rest is encrypted (AES‑256 or similar). Encryption keys are managed with strict controls and rotated regularly to minimize risk.",
    ],
    image: {
      src: "/images/trust/data-encryption.png",
      alt: "Data encryption and key management dashboard",
      width: 1152,
      height: 1152,
    },
  },
  {
    id: "data-privacy",
    title: "Data privacy",
    paragraphs: [
      "All customer data is stored in the European Union, under the full scope of GDPR. Data minimisation is enforced, clear consent processes are maintained, and tools are provided to meet data‑subject rights such as access, correction, and deletion requests. By combining strong encryption with local processing, customer data remains confidential and compliant.",
    ],
    image: {
      src: "/images/trust/data-privacy.png",
      alt: "Data privacy and residency controls",
      width: 1152,
      height: 1152,
    },
  },
  {
    id: "secure-development-lifecycle",
    title: "Secure Development Lifecycle",
    paragraphs: [
      "Security is integral to our development process. In our secure software development lifecycle security reviews, automated testing, and expert audits are embedded at every stage.",
    ],
    image: {
      src: "/images/trust/secure-development-lifecycle.png",
      alt: "Secure software development lifecycle workflow",
      width: 1536,
      height: 1536,
    },
    subFeatures: [
      {
        title: "Threat modeling",
        body: "Risks are identified early and clear mitigation strategies are defined.",
      },
      {
        title: "Peer reviews and scans",
        body: "Every code change goes through rigorous peer review and static analysis to catch vulnerabilities before they reach production.",
      },
      {
        title: "Dependency management",
        body: "Third-party libraries and frameworks are continuously monitored for new vulnerabilities, and patches are applied promptly when necessary.",
      },
      {
        title: "Penetration testing",
        body: "Independent experts conduct regular penetration tests, and a public bug‑bounty program is maintained to encourage responsible reporting.",
      },
    ],
  },
  {
    id: "business-continuity",
    title: "Business Continuity & Reliability",
    paragraphs: [
      "Your onboarding processes are mission‑critical. AiRAT’s infrastructure is built to maximize uptime and rapid recovery. With event‑sourced architecture and infrastructure‑as‑code capabilities, environments can be rebuilt or event logs replayed quickly, ensuring business continuity even in the face of major disruptions.",
    ],
    image: {
      src: "/images/trust/business-continuity.png",
      alt: "Business continuity and reliability monitoring",
      width: 864,
      height: 864,
    },
    subFeatures: [
      {
        title: "Disaster recovery and backups",
        body: "Regular, encrypted backups are maintained across multiple EU locations, along with an up‑to‑date disaster recovery plan that’s tested at least annually.",
      },
      {
        title: "High availability",
        body: "Critical services are deployed redundantly across separate data centers and network zones to prevent single points of failure.",
      },
      {
        title: "24/7 monitoring and incident response",
        body: "Automated monitoring alerts our on‑call teams instantly to any anomalies, enabling immediate investigation and remediation around the clock.",
      },
    ],
  },
] as const;

export const TRUST_CENTER = {
  title: "AiRAT Trust Center",
  body: "Our Trust Center offers detailed insights into our security practices, including the specific controls and policies implemented by our teams. You can explore our compliance standards, request access to comprehensive security documentation, and gain a clear understanding of how we safeguard your data.",
  ctaLabel: "Learn more",
  ctaTo: "/contact",
  image: {
    src: "/images/trust/trust-center.png",
    alt: "Trust center documentation and compliance overview",
    width: 750,
    height: 750,
  },
} as const;

export const TRUST_NEXT_UP = {
  title: "Next up",
  items: [
    {
      title: "Autonomous SOC Platform",
      description: "Operate security with measurable outcomes",
      to: "/products/soc",
    },
    {
      title: "Endpoint Operations & Security",
      description: "Fleet discovery, patching, policy enforcement, and privileged operations",
      to: "/products/endpoint",
    },
    {
      title: "Cloud Security & Governance",
      description: "CSPM, DevSecOps, identity governance, compliance, and cost intelligence",
      to: "/products/cspm",
    },
    {
      title: "Agent Detection & Response",
      description: "Visibility, governance, and threat detection for AI agents",
      to: "/products/adr",
    },
    {
      title: "Data & search",
      description: "Unified data platforms and search integrations",
      to: "/services#datalakes",
    },
  ],
} as const;
