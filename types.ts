
export interface SEOResult {
  titles: string[];
  description: string;
  tags: string[];
  hashtags: string[];
  chapters: { timestamp: string; title: string }[];
  thumbnailConcept: string;
  targetAudience: string;
  suggestedKeywords: string[];
}

export enum LoadingStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  OPTIMIZING = 'OPTIMIZING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}
