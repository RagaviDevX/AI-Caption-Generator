export interface CaptionResult {
  instagram: string;
  youtube: string;
  linkedin: string;
  hashtags: string;
}

export interface GenerateRequest {
  imageUrl: string;
  tone?: string;
  style?: string;
}

export interface GenerateResponse {
  success: boolean;
  data?: CaptionResult;
  error?: string;
}

export interface UploadResponse {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
}

export type Platform = "instagram" | "youtube" | "linkedin" | "hashtags";

export type CaptionTone = "viral" | "funny" | "luxury" | "emotional" | "professional" | "inspirational";

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}
