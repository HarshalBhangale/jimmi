import  { Agreement } from '../components/claims/AgreementList';

// Extended status types for claims
export type ClaimStatus = 
  'pending' | 
  'in_progress' | 
  'documents_received' |
  'lender_reviewing' | 
  'approved' | 
  'rejected' |
  'offer_received' | 
  'offer_accepted' | 
  'offer_rejected' |
  'fca_paused' |
  'escalated_to_fca' |
  'duplicate_claim';

// Lender response types
export type LenderResponseType = 'offer' | 'rejection' | 'fca_pause' | 'already_submitted';

// Escalation status types
export type EscalationStatus = 'not_started' | 'in_progress' | 'completed';

// Lender response interface
export interface LenderResponse {
  responseType: LenderResponseType;
  responseDate: string;
  offerAmount?: number;
  offerDetails?: string;
  pauseEndDate?: string; // For FCA pause
  rejectionReason?: string;
  customerSatisfied?: boolean;
  decisionReason?: string;
  decisionDate?: string;
  escalationStatus?: EscalationStatus;
  escalationStartDate?: string;
}

// Claim stage interface
export interface ClaimStage {
  number: number;
  name: string;
  description: string;
  progress: number;
}

// Documents interface
export interface ClaimDocuments {
  agreement?: string;
  bankStatement?: string;
  identity?: string;
  additionalDocs?: string[];
}

// Timeline event interface
export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

// Correspondence interface
export interface Correspondence {
  date: string;
  from: string;
  subject: string;
  content: string;
  attachments?: string[];
}

// Claim interface
export interface Claim {
  id: string;
  lender: string;
  submissionDate: string;
  status: ClaimStatus;
  financedAmount: number;
  potentialRefund: number;
  actionRequired?: boolean;
  lastUpdated: string;
  agreementNumber?: string;
  agreementDate?: string;
  agreementType?: string;
  currentStage?: ClaimStage;
  documents?: ClaimDocuments;
  timeline?: TimelineEvent[];
  correspondence?: Correspondence[];
  agreements?: Agreement[];
  lenderResponse?: LenderResponse;
} 