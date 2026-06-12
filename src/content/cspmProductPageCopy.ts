export const CSPM_PRODUCT_SEO = {
  title: "Cloud Security & Governance Platform | CSPM, DevSecOps & Cost Intelligence | AiRAT",
  description:
    "Secure every cloud. Govern every resource. Unified visibility across infrastructure, identities, code, and services - with posture management, DevSecOps, identity governance, compliance, and cost intelligence.",
} as const;

export const CSPM_HERO = {
  eyebrow: "Cloud Security & Governance Platform",
  title: "Secure Every Cloud. Govern Every Resource.",
  lead:
    "Gain complete visibility across your cloud infrastructure, applications, identities, code repositories, and cloud services from a single intelligent platform.",
  sublead:
    "Detect risks, eliminate misconfigurations, optimize costs, strengthen compliance, and continuously improve your cloud security posture.",
  tagline: "Secure · Govern · Optimize",
  primaryCta: { label: "Request Demo", to: "/contact?intent=cspm-demo" },
  secondaryCta: { label: "Talk to a Cloud Security Expert", to: "/contact?intent=cspm-expert" },
} as const;

export const CSPM_METRICS = [
  {
    label: "Visibility Domains",
    detail: "Resources, workloads, identities, networks & code",
    counter: { target: 8, suffix: "+" },
    fallback: "8+",
  },
  {
    label: "Monitoring",
    detail: "Continuous posture, compliance & cost intelligence",
    counter: { target: 24, suffix: "\u00d77" },
    fallback: "24\u00d77",
  },
  {
    label: "Frameworks",
    detail: "ISO, SOC 2, PCI, GDPR, HIPAA, NIST & CIS",
    fallback: "Multi-Framework",
  },
  {
    label: "Intelligence",
    detail: "Security, governance, compliance & cost - unified",
    fallback: "One Platform",
  },
] as const;

export const CSPM_SCROLL_ONE = {
  eyebrow: "Complete cloud visibility",
  title: "One view across your entire cloud estate",
  lead:
    "Monitor cloud resources, services, workloads, identities, networks, storage, applications, and infrastructure through a unified cloud intelligence layer.",
  listLabel: "Visibility across",
  items: [
    "Cloud Resources",
    "Compute Services",
    "Storage Platforms",
    "Databases",
    "Containers & Kubernetes",
    "Virtual Networks",
    "Serverless Services",
    "Multi-Cloud Environments",
  ],
  visual: {
    src: "/images/duna-style/feature-service-cloud-native.svg",
    alt: "Unified cloud visibility across compute, storage, containers, networks, and multi-cloud environments",
    width: 1200,
    height: 675,
  },
} as const;

export const CSPM_SCROLL_TWO = {
  posture: {
    eyebrow: "Cloud security posture management",
    title: "Identify risks before they become incidents",
    lead:
      "Continuously evaluate your cloud environment against security best practices, compliance frameworks, and operational standards.",
    listLabel: "Continuous validation",
    items: [
      "Misconfiguration Detection",
      "Public Exposure Analysis",
      "Identity Risk Assessment",
      "Excessive Permissions Detection",
      "Security Baseline Validation",
      "Resource Hardening Checks",
      "Cloud Risk Scoring",
      "Continuous Compliance Monitoring",
    ],
    visual: {
      src: "/images/duna-style/feature-security-detection-matrix.svg",
      alt: "Cloud risk matrix showing misconfiguration severity and exposure across cloud sources",
      width: 1200,
      height: 675,
    },
  },
  devSecOps: {
    eyebrow: "DevSecOps & code security",
    title: "Shift security left",
    lead:
      "Integrate security directly into development workflows and identify issues before they reach production.",
    listLabel: "Secure development lifecycle",
    items: [
      "Source Code Analysis",
      "Repository Security Reviews",
      "Infrastructure-as-Code Validation",
      "Secrets Detection",
      "Dependency Analysis",
      "Build Pipeline Security",
      "Deployment Validation",
      "Security Policy Enforcement",
    ],
  },
  cost: {
    eyebrow: "Cloud cost intelligence",
    title: "Understand where every dollar goes",
    lead:
      "Gain deep visibility into cloud consumption, spending patterns, resource utilization, and optimization opportunities.",
    listLabel: "Cost optimization",
    items: [
      "Resource Utilization Tracking",
      "Cost Allocation",
      "Waste Detection",
      "Unused Resource Discovery",
      "Capacity Optimization",
      "Budget Monitoring",
      "Cost Forecasting",
      "Optimization Recommendations",
    ],
  },
} as const;

export const CSPM_SCROLL_THREE = {
  identity: {
    eyebrow: "Identity & access governance",
    title: "Control access across your cloud ecosystem",
    lead:
      "Continuously analyze identities, permissions, privileges, and access paths to reduce exposure and enforce least-privilege principles.",
    listLabel: "Governance controls",
    items: [
      "Identity Visibility",
      "Privilege Analysis",
      "Access Reviews",
      "Role Optimization",
      "Permission Auditing",
      "Risk-Based Access Monitoring",
      "Identity Attack Path Analysis",
      "Governance Reporting",
    ],
  },
  compliance: {
    eyebrow: "Compliance & governance center",
    title: "Stay audit ready",
    lead:
      "Map cloud resources and operational controls against regulatory requirements and internal governance standards.",
    listLabel: "Compliance coverage",
    frameworks: [
      { label: "ISO 27001", markSrc: "/images/compliance/iso-27001.svg" },
      { label: "SOC 2", markSrc: "/images/compliance/soc-2.svg" },
      { label: "PCI DSS", markSrc: "/images/compliance/pci-dss.svg" },
      { label: "GDPR", iconSlug: "europeanunion" },
      { label: "HIPAA", markSrc: "/images/compliance/hipaa.svg" },
      { label: "NIST", markSrc: "/images/compliance/nist.svg" },
      { label: "CIS Benchmarks", markSrc: "/images/compliance/cis-benchmarks.svg" },
    ],
    othersLabel: "Also supported",
    others: ["Custom frameworks", "Internal control catalogues", "Regional & industry-specific standards"],
  },
  dashboard: {
    eyebrow: "Cloud intelligence dashboard",
    title: "Security, compliance & cost - in one view",
    lead: "Transform cloud complexity into actionable intelligence.",
    listLabel: "Executive visibility",
    highlights: [
      "Cloud Risk Score",
      "Compliance Status",
      "Security Findings",
      "Identity Exposure",
      "Resource Inventory",
      "Cost Optimization Opportunities",
      "Cloud Asset Relationships",
      "Governance Metrics",
    ],
    visual: {
      src: "/images/duna-style/soc-platform-dashboard.svg",
      alt: "Cloud intelligence dashboard showing risk score, compliance status, security findings, and cost optimization opportunities",
      width: 1200,
      height: 675,
    },
  },
  why: {
    eyebrow: "Why organizations choose this platform",
    title: "Cloud security, governance, and cost - unified",
    items: [
      { title: "Reduce Cloud Risk", body: "Identify and remediate security gaps continuously." },
      { title: "Improve Governance", body: "Maintain visibility and control across environments." },
      { title: "Strengthen Compliance", body: "Monitor compliance in real time." },
      { title: "Optimize Spending", body: "Eliminate waste and improve cloud efficiency." },
      { title: "Accelerate Development", body: "Embed security directly into engineering workflows." },
      { title: "Scale With Confidence", body: "Operate securely across multi-cloud and hybrid environments." },
    ],
  },
  cta: {
    title: "Secure. Govern. Optimize.",
    lead: "Transform cloud complexity into continuous visibility, security, compliance, and operational intelligence.",
    subtitle: "Cloud Security, Governance, Compliance, and Cost Intelligence - Unified.",
    primary: { label: "Request Demo", to: "/contact?intent=cspm-demo" },
    secondary: { label: "Talk to a Cloud Security Expert", to: "/contact?intent=cspm-expert" },
  },
} as const;
