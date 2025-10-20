import { z } from "zod";

// Auth validation
export const signUpSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  password: z.string().min(1, "Password is required"),
});

// Vault item validation
export const vaultItemSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().max(1000).optional(),
  category: z.string().min(1, "Category is required"),
  content: z.record(z.any()).optional(),
});

// Verification request validation
export const verificationRequestSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(100),
  requesterEmail: z.string().email("Invalid email address").max(255),
  vaultOwnerEmail: z.string().email("Invalid email address").max(255),
  phoneNumber: z.string().trim().regex(/^\+?[\d\s\-()]+$/, "Invalid phone number").optional().or(z.literal("")),
  relationship: z.string().trim().min(2, "Relationship is required").max(100),
});

// Family member invitation
export const familyMemberSchema = z.object({
  memberName: z.string().trim().min(2, "Name is required").max(100),
  memberEmail: z.string().email("Invalid email address").max(255),
  accessLevel: z.enum(["limited", "full"]),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type VaultItemInput = z.infer<typeof vaultItemSchema>;
export type VerificationRequestInput = z.infer<typeof verificationRequestSchema>;
export type FamilyMemberInput = z.infer<typeof familyMemberSchema>;
