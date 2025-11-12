
export type AdSize = 'landscape' | 'portrait';

export interface FormData {
  productName: string;
  productDescription: string;
  targetAudience: string;
  adTone: string;
  adObjective: string;
  adSize: AdSize;
}

export interface AdCopy {
  headline: string;
  primaryText: string;
  callToAction: string;
}

export interface VisualConcept {
  layout: string;
  colorScheme: string;
  imageStyle: string;
}

export interface GeneratedCreative {
  adCopies: AdCopy[];
  caption: string;
  visualConcepts: VisualConcept[];
  hashtags: string[];
}
