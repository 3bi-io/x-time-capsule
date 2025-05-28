
import { FileText, Heart, Lock, User, Shield, Eye, Clock } from "lucide-react";

export const VAULT_CATEGORIES = [
  {
    id: "documents",
    name: "Legal Documents",
    icon: FileText,
    count: 12,
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: "financial",
    name: "Financial Information",
    icon: Lock,
    count: 8,
    color: "bg-emerald-100 text-emerald-700"
  },
  {
    id: "personal",
    name: "Personal Messages",
    icon: Heart,
    count: 5,
    color: "bg-rose-100 text-rose-700"
  },
  {
    id: "contacts",
    name: "Important Contacts",
    icon: User,
    count: 15,
    color: "bg-purple-100 text-purple-700"
  }
];

export const SECURITY_FEATURES = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description: "All data is encrypted with AES-256 encryption before storage, ensuring only authorized family members can access information.",
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    icon: Lock,
    title: "Multi-Factor Authentication",
    description: "Additional security layers including SMS verification, email confirmation, and biometric authentication options.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Eye,
    title: "Document Verification",
    description: "Death certificates are verified through official channels and cross-referenced with government databases.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Clock,
    title: "Access Logging",
    description: "Complete audit trail of all access attempts and document views, with notifications to designated family members.",
    color: "bg-amber-100 text-amber-600"
  }
];

export const HERO_FEATURES = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "256-bit encryption and multi-factor authentication",
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    icon: Clock,
    title: "Verified Access",
    description: "Death certificate verification required for access",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Heart,
    title: "Family Focused",
    description: "Designed with your loved ones' needs in mind",
    color: "bg-amber-100 text-amber-600"
  }
];

export const VERIFICATION_STEPS = [
  {
    stepNumber: 1,
    title: "Identity Verification",
    description: "Provide your relationship to the deceased and contact information"
  },
  {
    stepNumber: 2,
    title: "Death Certificate Upload",
    description: "Upload a certified copy of the death certificate"
  },
  {
    stepNumber: 3,
    title: "Review & Approval",
    description: "Our team reviews your request (typically 24-48 hours)"
  },
  {
    stepNumber: 4,
    title: "Access Granted",
    description: "Secure access to the Time Capsule contents"
  }
];

export const MOCK_VAULT_ITEMS = [
  { name: "Last Will and Testament", type: "PDF", date: "2024-01-15", status: "secured" },
  { name: "Bank Account Information", type: "Document", date: "2024-01-10", status: "secured" },
  { name: "Insurance Policies", type: "PDF", date: "2024-01-08", status: "secured" },
  { name: "Letter to Sarah", type: "Message", date: "2024-01-20", status: "secured" }
];
