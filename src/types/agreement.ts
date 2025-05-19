export interface Agreement {
    id: string;
    agreementNumber: string;
    status: string;
    carRegistration: string;
    startDate?: string;
    endDate?: string;
    amount?: number;
    claimId?: string;
    created?: string;
    updated?: string;
    timestamp?: string;
  }