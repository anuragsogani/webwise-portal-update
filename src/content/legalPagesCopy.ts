/** Minimal legal hub copy (not legal advice; replace with counsel-reviewed text when ready). */

export const PRIVACY_PAGE_SEO = {
  title: "Privacy Policy | AiRAT",
  description:
    "How AiRAT collects, uses, and protects information when you use airat.io and related contact channels.",
} as const;

export const TERMS_PAGE_SEO = {
  title: "Terms of Use | AiRAT",
  description: "Terms governing use of the AiRAT marketing website and published materials.",
} as const;

export const PRIVACY_PAGE_BODY = {
  headline: "Privacy policy",
  updated: "April 2026",
  sections: [
    {
      title: "Who we are",
      paragraphs: [
        "AiRAT (“we”, “us”) operates this website to describe our engineering and advisory services. Primary contact: shared@airat.in.",
      ],
    },
    {
      title: "What we collect",
      paragraphs: [
        "If you use the contact form or newsletter signup, we process the information you submit (such as name, email, company, and message content) to respond or to add you to our mailing list when you opt in.",
        "Like most sites, our hosting and analytics providers may process technical data such as IP address, browser type, and pages visited. If you enable optional analytics (when configured), aggregated usage data may be processed according to that provider’s terms.",
      ],
    },
    {
      title: "How we use data",
      paragraphs: [
        "We use submitted information to respond to enquiries, operate the site, improve content, and comply with law. We do not sell personal data.",
      ],
    },
    {
      title: "Retention & security",
      paragraphs: [
        "We retain messages and subscription details only as long as needed for those purposes or as required by law. We apply reasonable technical and organisational measures to protect data.",
      ],
    },
    {
      title: "Your rights",
      paragraphs: [
        "Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict processing of your personal data, and to object to certain processing. Contact shared@airat.in to exercise these rights.",
      ],
    },
    {
      title: "Changes",
      paragraphs: [
        "We may update this policy from time to time. The “Last updated” date at the top reflects the latest revision.",
      ],
    },
  ],
} as const;

export const TERMS_PAGE_BODY = {
  headline: "Terms of use",
  updated: "April 2026",
  sections: [
    {
      title: "Agreement",
      paragraphs: [
        "By using this website you agree to these terms. If you do not agree, do not use the site.",
      ],
    },
    {
      title: "Not professional advice",
      paragraphs: [
        "Content on this site is for general information. It is not legal, security, or compliance advice. Engagements are governed by separate written agreements.",
      ],
    },
    {
      title: "Intellectual property",
      paragraphs: [
        "Branding, text, graphics, and code on this site are owned by AiRAT or its licensors unless otherwise noted. You may not copy or redistribute materials for commercial use without permission.",
      ],
    },
    {
      title: "Disclaimer",
      paragraphs: [
        "The site is provided “as is”. To the extent permitted by law, we disclaim warranties and limit liability arising from use of the site or linked third-party sites.",
      ],
    },
    {
      title: "Governing law",
      paragraphs: [
        "These terms are governed by the laws applicable in India unless otherwise agreed in writing for a specific engagement.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [
        "Questions about these terms: shared@airat.in.",
      ],
    },
  ],
} as const;
