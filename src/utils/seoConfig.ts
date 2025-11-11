export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

export const defaultSEO: SEOConfig = {
  title: "Final Wishes Guardian - Secure Digital Legacy & Time Capsule Platform",
  description: "Protect your digital legacy with our secure time capsule platform. Store memories, documents, and final wishes with military-grade encryption and verification.",
  keywords: [
    "digital legacy",
    "time capsule",
    "secure document storage",
    "final wishes",
    "estate planning",
    "digital vault",
    "memory preservation",
    "encrypted storage",
    "legacy planning",
    "digital inheritance"
  ],
  ogImage: "/og-image.png",
  ogType: "website"
};

export const pageSEO: Record<string, SEOConfig> = {
  home: {
    title: "Final Wishes Guardian - Secure Digital Legacy & Time Capsule Platform",
    description: "Protect your digital legacy with our secure time capsule platform. Store memories, documents, and final wishes with military-grade encryption and multi-layer verification.",
    keywords: [
      "digital legacy platform",
      "secure time capsule",
      "digital vault",
      "final wishes storage",
      "encrypted memory preservation",
      "legacy planning software",
      "digital inheritance",
      "secure document storage",
      "family time capsule",
      "digital estate planning"
    ],
    ogType: "website"
  },
  howItWorks: {
    title: "How It Works - Digital Time Capsule Creation | Final Wishes Guardian",
    description: "Learn how to create your digital time capsule in 4 simple steps. Store memories, set unlock dates, and securely share your legacy with loved ones.",
    keywords: [
      "how to create time capsule",
      "digital legacy tutorial",
      "time capsule guide",
      "secure storage process",
      "legacy planning steps",
      "digital vault setup",
      "memory preservation guide",
      "time capsule instructions"
    ],
    ogType: "article"
  },
  security: {
    title: "Security & Encryption - Military-Grade Protection | Final Wishes Guardian",
    description: "Bank-level encryption, multi-factor authentication, and zero-knowledge architecture protect your digital legacy. Learn about our comprehensive security features.",
    keywords: [
      "military-grade encryption",
      "secure document storage",
      "zero-knowledge encryption",
      "multi-factor authentication",
      "data security",
      "encrypted time capsule",
      "secure legacy storage",
      "privacy protection",
      "data encryption standards"
    ],
    ogType: "article"
  },
  pricing: {
    title: "Pricing Plans - Affordable Digital Legacy Storage | Final Wishes Guardian",
    description: "Choose the perfect plan for your digital legacy needs. Personal, Family, and Enterprise options with flexible pricing and comprehensive features.",
    keywords: [
      "digital legacy pricing",
      "time capsule subscription",
      "secure storage plans",
      "legacy storage cost",
      "family vault pricing",
      "enterprise legacy solution",
      "affordable digital vault",
      "memory storage pricing"
    ],
    ogType: "product"
  },
  helpCenter: {
    title: "Help Center - Support & FAQs | Final Wishes Guardian",
    description: "Get answers to common questions about digital legacy storage, time capsules, security, and account management. 24/7 support available.",
    keywords: [
      "digital legacy help",
      "time capsule FAQ",
      "support documentation",
      "legacy storage help",
      "troubleshooting guide",
      "customer support",
      "vault assistance",
      "account help"
    ],
    ogType: "website"
  },
  documentation: {
    title: "Documentation - Complete Guide | Final Wishes Guardian",
    description: "Comprehensive documentation for using Final Wishes Guardian. Learn about features, security, integrations, and best practices.",
    keywords: [
      "digital legacy documentation",
      "time capsule guide",
      "user manual",
      "feature documentation",
      "api documentation",
      "integration guide",
      "setup instructions",
      "technical documentation"
    ],
    ogType: "article"
  },
  emergencyAccess: {
    title: "Emergency Access - Request Legacy Access | Final Wishes Guardian",
    description: "Request emergency access to a loved one's digital legacy. Secure verification process ensures authorized access to time capsules and final wishes.",
    keywords: [
      "emergency access request",
      "digital legacy access",
      "time capsule unlock",
      "authorized access",
      "legacy verification",
      "emergency document access",
      "final wishes access",
      "trusted contact access"
    ],
    ogType: "website"
  },
  contact: {
    title: "Contact Us - Get in Touch | Final Wishes Guardian",
    description: "Contact Final Wishes Guardian for support, questions, or enterprise solutions. We're here to help protect your digital legacy.",
    keywords: [
      "contact support",
      "customer service",
      "legacy platform support",
      "get in touch",
      "contact form",
      "enterprise contact",
      "sales inquiry"
    ],
    ogType: "website"
  },
  compliance: {
    title: "Compliance & Certifications - GDPR, SOC 2, HIPAA | Final Wishes Guardian",
    description: "Learn about our compliance certifications including GDPR, SOC 2, HIPAA, and ISO 27001. We take data protection and privacy seriously.",
    keywords: [
      "GDPR compliance",
      "SOC 2 certified",
      "HIPAA compliant",
      "ISO 27001",
      "data protection compliance",
      "privacy certifications",
      "security standards",
      "regulatory compliance"
    ],
    ogType: "article"
  },
  privacyPolicy: {
    title: "Privacy Policy - Data Protection & Privacy | Final Wishes Guardian",
    description: "Read our privacy policy to understand how we collect, use, and protect your data. Transparent practices for your digital legacy.",
    keywords: [
      "privacy policy",
      "data protection",
      "privacy practices",
      "user privacy",
      "data security policy",
      "information collection",
      "privacy rights"
    ],
    ogType: "article"
  },
  termsOfService: {
    title: "Terms of Service - Legal Terms | Final Wishes Guardian",
    description: "Read our terms of service to understand your rights and obligations when using Final Wishes Guardian platform.",
    keywords: [
      "terms of service",
      "legal terms",
      "user agreement",
      "service terms",
      "terms and conditions",
      "usage policy"
    ],
    ogType: "article"
  }
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Final Wishes Guardian",
  "description": "Secure digital legacy and time capsule platform for preserving memories and final wishes",
  "url": "https://finalwishesguardian.lovable.app",
  "logo": "https://finalwishesguardian.lovable.app/og-image.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "email": "support@finalwishesguardian.com",
    "availableLanguage": ["en"]
  },
  "sameAs": [
    "https://twitter.com/finalwishesguardian",
    "https://facebook.com/finalwishesguardian",
    "https://linkedin.com/company/finalwishesguardian"
  ]
};
