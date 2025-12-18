
export enum PipelineStatus {
  IDLE = 'IDLE',
  DISCOVERY = 'DISCOVERY',
  ENRICHING = 'ENRICHING',
  AI_VALIDATION = 'AI_VALIDATION',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface Lead {
  id: string;
  businessName: string;
  legalName?: string;
  email: string;
  phone: string;
  hasWhatsApp: boolean;
  website: string;
  address: string;
  niche: string;
  relevanceScore: number;
  confidence: 'High' | 'Medium' | 'Low';
}

export interface GroundingSource {
  title: string;
  uri: string;
}
