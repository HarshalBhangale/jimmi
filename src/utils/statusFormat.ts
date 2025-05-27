// Function to format status text for display
export const formatStatusText = (status: string): string => {
const statusMap: Record<string, string> = {
  'ClaimAlreadySubmitted': 'Already Submitted',
  'FOSEscalation': 'FOS Escalation',
  'OfferMade': 'Offer Made',
  'Pending': 'Pending',
  'Submitted': 'Submitted',
  'Rejected': 'Rejected',
  'Completed': 'Completed',
  'Document Requested': 'Document Requested',
  'Agreement Added': 'Agreement Added',
  'Claim Submitted': 'Claim Submitted',
  'Lender Responded': 'Lender Responded',
  'FCAPause': 'FCA Pause'
};

return statusMap[status] || status;
};

// Status colors for consistent usage throughout the application
export const statusColors = {
'Pending': { bg: 'yellow.50', color: 'yellow.600', text: 'PENDING' },
'Submitted': { bg: 'blue.50', color: 'blue.600', text: 'SUBMITTED' },
'OfferMade': { bg: 'green.50', color: 'green.600', text: 'OFFER MADE' },
'Rejected': { bg: 'red.50', color: 'red.600', text: 'REJECTED' },
'ClaimAlreadySubmitted': { bg: 'yellow.50', color: 'yellow.600', text: 'ALREADY SUBMITTED' },
'FOSEscalation': { bg: 'purple.50', color: 'purple.600', text: 'FOS ESCALATION' },
'Completed': { bg: 'green.50', color: 'green.600', text: 'COMPLETED' },
'Document Requested': { bg: 'blue.50', color: 'blue.600', text: 'DOCUMENT REQUESTED' },
'Agreement Added': { bg: 'yellow.50', color: 'yellow.600', text: 'AGREEMENT ADDED' },
'Claim Submitted': { bg: 'green.50', color: 'green.600', text: 'CLAIM SUBMITTED' },
'Lender Responded': { bg: 'purple.50', color: 'purple.600', text: 'LENDER RESPONDED' }
}; 