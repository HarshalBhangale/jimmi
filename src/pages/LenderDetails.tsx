// @ts-nocheck
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  Card,
  CardBody,
  Divider,
  Icon,
  HStack,
  VStack,
  useColorModeValue,
  useDisclosure,
  Spinner,
  Center,
  IconButton,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Progress,
} from '@chakra-ui/react';
import {
  FiArrowLeft,
  FiPlus,
  FiChevronRight,
  FiFileText,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiPercent,
  FiUser,
  FiSend,
  FiCheckCircle,
  FiMessageSquare,
  FiPlusCircle,
  FiMessageCircle,
  FiX,
  FiAlertTriangle,
  FiFlag,
  FiFilter,
  FiCheck,
} from 'react-icons/fi';
import AddAgreementModal from '../components/modals/AddAgreementModal';
import SubmitClaimModal from '../components/modals/SubmitClaimModal';
import LenderResponseModal from '../components/modals/LenderResponseModal';
import { useAtomValue } from 'jotai';
import { claimsAtom, refetchClaimsAtom } from '@/jotai/atoms';
import { useSetAtom } from 'jotai';
import { submitClaim, createClaim } from '@/api/services/claims';

// Timeline step component
const TimelineStep = ({ 
  number, 
  active, 
  text,
  description
}: { 
  number: number, 
  active: boolean, 
  text: string,
  description?: string
}) => {
  // Colors for active steps - adjusted to match the design
  const activeColors = {
    1: { bg: 'green.100', text: 'green.700', border: 'green.500', 
         activeBg: active ? 'green.100' : 'gray.100', activeText: active ? 'green.700' : 'gray.400' },
    2: { bg: 'yellow.100', text: 'yellow.700', border: 'yellow.500', 
         activeBg: active ? 'yellow.100' : 'gray.100', activeText: active ? 'yellow.700' : 'gray.400' },
    3: { bg: 'blue.100', text: 'blue.700', border: 'blue.500', 
         activeBg: active ? 'blue.100' : 'gray.100', activeText: active ? 'blue.700' : 'gray.400' },
    4: { bg: 'purple.100', text: 'purple.700', border: 'purple.500', 
         activeBg: active ? 'purple.100' : 'gray.100', activeText: active ? 'purple.700' : 'gray.400' },
  };
  
  const colors = activeColors[number as keyof typeof activeColors];

  return (
    <Flex direction="column" align="center" flex={1} position="relative" zIndex={1}>
      <Flex
        w="60px"
        h="60px"
        borderRadius="full"
        bg={colors.activeBg}
        color={colors.activeText}
        justify="center"
        align="center"
        fontWeight="bold"
        fontSize="xl"
        mb={3}
        border="2px solid"
        borderColor={active ? colors.border : 'gray.200'}
        boxShadow={active ? "0 2px 4px rgba(0,0,0,0.05)" : "none"}
        position="relative"
        transition="all 0.3s ease"
      >
        {number}
      </Flex>
      <Text 
        fontSize="sm" 
        textAlign="center" 
        color={active ? colors.activeText : 'gray.500'} 
        fontWeight="semibold"
        mb={description ? 1 : 0}
      >
        {text}
      </Text>
      {description && (
        <Text fontSize="xs" textAlign="center" color="gray.500" maxW="150px">
          {description}
        </Text>
      )}
    </Flex>
  );
};

// Timeline component with connecting line styling
const Timeline = ({ 
  steps,
  activeStep
}: { 
  steps: {number: number, text: string, description?: string}[],
  activeStep: number
}) => {
  // Color for active line
  const activeLineColor = useColorModeValue('blue.400', 'blue.500');
  
  return (
    <Flex position="relative" w="100%" py={6} px={4}>
      {/* Horizontal line that connects all steps */}
      <Box 
        position="absolute" 
        height="2px" 
        bg="gray.200" 
        top="36px" 
        left="40px" 
        right="40px" 
        zIndex={0} 
      />
      
      {/* Active portion of the line */}
      <Box 
        position="absolute"
        height="2px"
        bg={activeLineColor}
        top="36px"
        left="40px"
        width={`calc(${(Math.max(1, Math.min(activeStep, steps.length)) - 1) / (steps.length - 1)} * (100% - 80px))`}
        zIndex={0}
        transition="width 0.5s ease-in-out"
      />
      
      {/* Steps */}
      <Flex justify="space-between" w="100%" position="relative">
        {steps.map((step) => (
          <TimelineStep 
            key={step.number}
            number={step.number} 
            active={step.number <= activeStep} 
            text={step.text}
            description={step.description}
          />
        ))}
      </Flex>
    </Flex>
  );
};

// Update the status badge colors to be lighter and match the design
const statusBadgeColors = {
  'Document Requested': { bg: 'blue.50', color: 'blue.600' },
  'Agreement Added': { bg: 'yellow.50', color: 'yellow.600' },
  'Claim Submitted': { bg: 'green.50', color: 'green.600' },
  'Lender Responded': { bg: 'purple.50', color: 'purple.600' },
};

// Status colors for consistent usage throughout the component
const statusColors = {
  'Pending': { bg: 'yellow.50', color: 'yellow.600', text: 'PENDING' },
  'Submitted': { bg: 'blue.50', color: 'blue.600', text: 'SUBMITTED' },
  'Offer Made': { bg: 'green.50', color: 'green.600', text: 'OFFER MADE' },
  'Rejected': { bg: 'red.50', color: 'red.600', text: 'REJECTED' },
  'Claim Already Submitted': { bg: 'yellow.50', color: 'yellow.600', text: 'ALREADY SUBMITTED' },
  'FOS Escalation': { bg: 'purple.50', color: 'purple.600', text: 'FOS ESCALATION' },
  'Completed': { bg: 'green.50', color: 'green.600', text: 'COMPLETED' }
};

// Status badge component for consistent styling
const StatusBadge = ({ status }: { status: string }) => {
  const statusBadgeColors = {
    'Document Requested': { bg: 'blue.50', color: 'blue.600' },
    'Agreement Added': { bg: 'yellow.50', color: 'yellow.600' },
    'Claim Submitted': { bg: 'green.50', color: 'green.600' },
    'Lender Responded': { bg: 'purple.50', color: 'purple.600' },
  };
  
  const defaultColors = { bg: 'gray.50', color: 'gray.600' };
  const colors = statusBadgeColors[status as keyof typeof statusBadgeColors] || defaultColors;
  
  return (
    <Badge
      px={3}
      py={1.5}
      borderRadius="full"
      bg={colors.bg}
      color={colors.color}
      fontWeight="medium"
      fontSize="xs"
    >
      STATUS: {status.toUpperCase()}
    </Badge>
  );
};

// Improved agreement card with clearer status and activity information
const AgreementCard = ({ agreement, onRecordResponse }: { agreement: any, onRecordResponse?: (agreement: any) => void }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('white', 'gray.700');

  const agreementStatus = agreement.status || 'Pending';
  const statusColor = statusColors[agreementStatus as keyof typeof statusColors] || 
                      { bg: 'gray.50', color: 'gray.600', text: agreementStatus.toUpperCase() };
  
  const canRecordResponse = agreementStatus === 'Submitted';

  // Format date for display
  const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card
      variant="outline"
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      boxShadow="sm"
      bg={cardBg}
      transition="all 0.2s"
      _hover={{
        boxShadow: 'md',
        borderColor: 'blue.200',
      }}
      overflow="hidden"
    >
      <Box 
        bg={statusColor.bg} 
        py={1} 
        px={4} 
        borderBottomWidth="1px" 
        borderBottomColor={borderColor}
      >
        <Flex justify="space-between" align="center">
          <Text fontWeight="bold">Agreement #{agreement.agreementNumber}</Text>
          <Badge 
            px={2}
            py={1}
            borderRadius="full"
            bg="white"
            color={statusColor.color}
            fontWeight="bold"
          >
            {statusColor.text}
          </Badge>
        </Flex>
      </Box>
      
      <CardBody py={4}>
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} mb={4}>
          <Box>
            <Text fontSize="xs" color="gray.500">Agreement Number</Text>
            <Text fontSize="sm" fontWeight="medium">{agreement.agreementNumber}</Text>
          </Box>
          <Box>
            <Text fontSize="xs" color="gray.500">Car Registration</Text>
            <Text fontSize="sm" fontWeight="medium">{agreement.carRegistration || 'N/A'}</Text>
          </Box>
          <Box>
            <Text fontSize="xs" color="gray.500">Created</Text>
            <Text fontSize="sm" fontWeight="medium">{formatDate(agreement.created)}</Text>
          </Box>
          <Box>
            <Text fontSize="xs" color="gray.500">Last Updated</Text>
            <Text fontSize="sm" fontWeight="medium">{formatDate(agreement.updated)}</Text>
          </Box>
        </SimpleGrid>
        
        {/* Status timeline for this agreement */}
        <Box 
          mt={4} 
          pt={4}
          borderTopWidth="1px"
          borderTopColor="gray.100"
        >
          <Text fontSize="sm" fontWeight="medium" mb={2}>Agreement Status</Text>
          
          <VStack align="stretch" spacing={2}>
            {/* Show when agreement was added */}
            <Flex align="center">
              <Icon 
                as={FiPlusCircle} 
                color="green.500" 
                mr={2} 
                boxSize="18px"
              />
              <Box>
                <Text fontSize="xs" fontWeight="medium">Agreement Added</Text>
                <Text fontSize="xs" color="gray.500">
                  {formatDate(agreement.created)}
                </Text>
              </Box>
            </Flex>
            
            {/* Show when claim was submitted */}
            {agreementStatus !== 'Pending' && (
              <Flex align="center">
                <Icon 
                  as={FiSend} 
                  color="blue.500" 
                  mr={2} 
                  boxSize="18px"
                />
                <Box>
                  <Text fontSize="xs" fontWeight="medium">Claim Submitted</Text>
                  <Text fontSize="xs" color="gray.500">
                    {agreement.timestamp ? formatDate(agreement.timestamp) : 'Not available'}
                  </Text>
                </Box>
              </Flex>
            )}
            
            {/* Show response details if available */}
            {agreement.responseDetails && (
              <Flex align="center">
                {agreementStatus === 'OfferMade' ? (
                  <>
                    <Icon 
                      as={FiDollarSign} 
                      color="green.500" 
                      mr={2} 
                      boxSize="18px"
                    />
                    <Box>
                      <Text fontSize="xs" fontWeight="medium">
                        Offer Received: £{agreement.responseDetails.offerAmount.toLocaleString()}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {agreement.respondedAt ? formatDate(agreement.respondedAt) : 'Not available'}
                      </Text>
                    </Box>
                  </>
                ) : agreementStatus === 'FOSEscalation' ? (
                  <>
                    <Icon 
                      as={FiClock} 
                      color="purple.500" 
                      mr={2} 
                      boxSize="18px"
                    />
                    <Box>
                      <Text fontSize="xs" fontWeight="medium">
                        FCA Pause Requested
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        Return on {agreement.responseDetails.comebackDate}
                      </Text>
                    </Box>
                  </>
                ) : agreementStatus === 'Rejected' ? (
                  <>
                    <Icon 
                      as={FiX} 
                      color="red.500" 
                      mr={2} 
                      boxSize="18px"
                    />
                    <Box>
                      <Text fontSize="xs" fontWeight="medium">
                        Claim Rejected
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {agreement.respondedAt ? formatDate(agreement.respondedAt) : 'Not available'}
                      </Text>
                    </Box>
                  </>
                ) : null}
              </Flex>
            )}
          </VStack>
          
          {/* Action button */}
          {canRecordResponse && onRecordResponse && (
            <Button
              leftIcon={<FiMessageSquare />}
              colorScheme="blue"
              size="sm"
              onClick={() => onRecordResponse(agreement)}
              w="full"
              mt={4}
            >
              Record Lender Response
            </Button>
          )}
        </Box>
      </CardBody>
    </Card>
  );
};

// Activity item component for the activity log
const ActivityItem = ({ 
  icon, 
  title, 
  description, 
  timestamp,
  isLatest = false
}: { 
  icon: React.ElementType, 
  title: string, 
  description: string, 
  timestamp: string,
  isLatest?: boolean 
}) => {
  const itemBg = useColorModeValue('white', 'gray.800');
  const latestBg = useColorModeValue('blue.50', 'blue.900');
  
  return (
    <Flex mb={4}>
      <Box 
        minWidth="40px" 
        height="40px" 
        borderRadius="full" 
        bg={isLatest ? 'blue.100' : 'gray.100'} 
        color={isLatest ? 'blue.500' : 'gray.500'}
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        mr={3}
      >
        <Icon as={icon} boxSize="20px" />
      </Box>
      <Box 
        flex="1" 
        p={3} 
        borderRadius="md" 
        bg={isLatest ? latestBg : itemBg}
        borderWidth="1px"
        borderColor={isLatest ? 'blue.200' : 'gray.200'}
      >
        <Flex justifyContent="space-between" alignItems="center" mb={1}>
          <Text fontWeight="bold">{title}</Text>
          <Text fontSize="xs" color="gray.500">{timestamp}</Text>
        </Flex>
        <Text fontSize="sm" color="gray.600">{description}</Text>
      </Box>
    </Flex>
  );
};

const LenderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const claims = useAtomValue(claimsAtom);
  const [lender, setLender] = useState<any>(null);
  const [agreements, setAgreements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAgreement, setSelectedAgreement] = useState<any>(null);
  const [activityLog, setActivityLog] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const refetchClaims = useSetAtom(refetchClaimsAtom);
  
  const { 
    isOpen: isAddAgreementOpen, 
    onOpen: onAddAgreementOpen, 
    onClose: onAddAgreementClose 
  } = useDisclosure();

  const {
    isOpen: isSubmitClaimOpen,
    onOpen: onSubmitClaimOpen,
    onClose: onSubmitClaimClose
  } = useDisclosure();
  
  const {
    isOpen: isLenderResponseOpen,
    onOpen: onLenderResponseOpen,
    onClose: onLenderResponseClose
  } = useDisclosure();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const statusBgColor = useColorModeValue('blue.50', 'blue.900');

  // Load lender data
  useEffect(() => {
    setIsLoading(true);

    if (claims) {
      // Find the lender with matching ID
      const lenderData = claims.find((claim: any) => claim.lender.id === id);
      
      if (lenderData) {
        // Transform the data to match your lender state structure
        const transformedLender = {
          id: lenderData.lender.id,
          name: lenderData.lender.name,
          status: lenderData.claims.length > 0 ? 'Claim Submitted' : 'Document Requested',
          agreementsCount: lenderData.claims.length,
          lastUpdated: new Date().toISOString(),
          createdAt: lenderData.claims[0]?.createdAt || new Date().toISOString()
        };

        // Transform agreements data with only required fields
        const transformedAgreements = lenderData.claims.map((claim: any) => ({
          id: claim._id || claim.id, // Use claim ID or fallback
          claimId: claim._id || claim.id, // Add claimId for backend updating
          agreementNumber: claim.agreement.agreementNumber,
          carRegistration: claim.agreement.carRegistration,
          created: claim.createdAt,
          updated: claim.updatedAt || claim.createdAt,
          timestamp: claim.timestamp || claim.createdAt,
          status: claim.agreement.status
        }));

        setLender(transformedLender);
        setAgreements(transformedAgreements);
      }
    }
    
    setIsLoading(false);
  }, [claims, id]);

  useEffect(() => {
    refetchClaims();
  }, []);

  const handleAddAgreement = async (agreementData: { agreementNumber: string, carRegistration: string }) => {
    try {
      // Create claim in backend with the required format
      const claimData = {
        agreement: {
          agreementNumber: agreementData.agreementNumber,
          carRegistration: agreementData.carRegistration
        },
        lenderId: lender.id
      };

      const response = await createClaim(claimData);
      
      if (response.success) {
        // Create a new agreement for local state update
        const newAgreement = {
          id: response.data._id || `new_agreement_${Date.now()}`,
          claimId: response.data._id,
          agreementNumber: agreementData.agreementNumber,
          carRegistration: agreementData.carRegistration,
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
          timestamp: new Date().toISOString(),
          status: 'Pending'
        };

        setAgreements([...agreements, newAgreement]);
        
        // Add to activity log
        const newActivity = {
          id: `activity_${Date.now()}`,
          type: 'agreement_added',
          title: 'Agreement Added',
          description: `Agreement #${newAgreement.agreementNumber} added to claim`,
          timestamp: newAgreement.created,
          icon: FiPlusCircle
        };
        
        setActivityLog([newActivity, ...activityLog]);
        
        // Update lender data
        setLender({
          ...lender,
          agreementsCount: lender.agreementsCount + 1,
          status: lender.agreementsCount === 0 ? 'Agreement Added' : lender.status
        });
      } else {
        throw new Error(response.message || 'Failed to create claim');
      }
    } catch (error) {
      console.error('Error adding agreement:', error);
    } finally {
      onAddAgreementClose();
    }
  };

  const handleSubmitClaim = async (
    templateType: string,
    customText?: string,
    selectedAgreements?: string[],
    mail?: {
      subject: string,
      body: string
    }
  ) => {
    const actionTimestamp = new Date().toISOString();
    
    try {
      console.log(mail, "mail");
      const response = await submitClaim({
        lenderId: lender.id,
        templateType,
        customText,
        agreementIds: selectedAgreements || [],
        mail
      });

      if (!response.success) {
        throw new Error(response.message || 'Failed to submit claim');
      }
      
      if (selectedAgreements && selectedAgreements.length > 0) {
        const updatedAgreements = agreements.map(agreement => {
          if (selectedAgreements.includes(agreement.id)) {
            return { 
              ...agreement, 
              status: 'Submitted',
              updated: actionTimestamp,
              timestamp: actionTimestamp
            };
          }
          return agreement;
        });
        
        setAgreements(updatedAgreements);
        
        const newActivity = {
          id: `activity_${Date.now()}`,
          type: 'claim_submitted',
          title: 'Claim Submitted',
          description: `Claim with ${selectedAgreements.length} agreement(s) submitted to ${lender.name}`,
          timestamp: actionTimestamp,
          icon: FiSend
        };
        
        setActivityLog([newActivity, ...activityLog]);
      }
      
      setLender({
        ...lender,
        status: 'Claim Submitted',
        claimType: templateType,
        claimText: customText || (templateType === 'dca' ? 'DCA Claim' : 'DCA + Hidden Commissions Claim'),
        claimDate: actionTimestamp,
        submittedAgreements: selectedAgreements
      });
      
      return true;
    } catch (error) {
      console.error('Error submitting claim:', error);
      throw error;
    }
  };
  
  const handleRecordResponse = (agreement: any) => {
    setSelectedAgreement(agreement);
    onLenderResponseOpen();
  };
  
  const handleUpdateAgreementStatus = async (agreementId: string, newStatus: string, details?: any) => {
    const actionTimestamp = new Date().toISOString();
    
    const updatedAgreements = agreements.map(agreement => {
      if (agreement.agreementNumber === agreementId) {
        return { 
          ...agreement, 
          status: newStatus,
          updated: actionTimestamp,
          timestamp: actionTimestamp,
          responseDetails: details
        };
      }
      return agreement;
    });
    
    setAgreements(updatedAgreements);
    
    let activityTitle = 'Lender Responded';
    let activityDescription = `${lender.name} responded to claim for agreement #${agreementId}`;
    let activityIcon = FiMessageCircle;
    
    switch (newStatus) {
      case 'OfferMade':
        activityTitle = 'Offer Received';
        activityDescription = `${lender.name} made an offer of £${details?.offerAmount || 0} for agreement #${agreementId}`;
        activityIcon = FiDollarSign;
        break;
      case 'Rejected':
        activityTitle = 'Claim Rejected';
        activityDescription = `${lender.name} rejected the claim for agreement #${agreementId}`;
        activityIcon = FiX;
        break;
      case 'FOSEscalation':
        activityTitle = 'FCA Pause Requested';
        activityDescription = `${lender.name} requested a 28-day FCA pause for agreement #${agreementId}`;
        activityIcon = FiClock;
        break;
      case 'ClaimAlreadySubmitted':
        activityTitle = 'Already Submitted';
        activityDescription = `${lender.name} informed that claim for agreement #${agreementId} was already submitted`;
        activityIcon = FiAlertTriangle;
        break;
    }
    
    const newActivity = {
      id: `activity_${Date.now()}`,
      type: 'lender_response',
      title: activityTitle,
      description: activityDescription,
      timestamp: actionTimestamp,
      icon: activityIcon
    };
    
    setActivityLog([newActivity, ...activityLog]);
    
    const hasResponses = updatedAgreements.some(agreement => 
      ['OfferMade', 'Rejected', 'ClaimAlreadySubmitted', 'FOSEscalation', 'Completed'].includes(agreement.status)
    );
    
    if (hasResponses && !lender.lenderResponded) {
      setLender({
        ...lender,
        lenderResponded: true,
        status: 'Lender Responded',
        respondedAt: actionTimestamp
      });
    }
  };

  // Add a function to check if we have any submitted agreements
  const hasSubmittedAgreements = agreements.some(agreement => agreement.status === 'Submitted');

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusCounts = () => {
    return agreements.reduce((counts, agreement) => {
      const status = agreement.status || 'Pending';
      if (!counts[status]) {
        counts[status] = 0;
      }
      counts[status]++;
      return counts;
    }, {} as Record<string, number>);
  };

  const filteredAgreements = agreements.filter(agreement => {
    // Only filter by status filter if any
    if (statusFilter.length > 0) {
      return statusFilter.includes(agreement.status);
    }
    return true;
  });

  // Render status count badges in the Agreements tab
  const renderStatusCounts = () => {
    return Object.entries(getStatusCounts()).map(([status, count]) => {
      const colorInfo = statusColors[status as keyof typeof statusColors] || 
                        { bg: 'gray.50', color: 'gray.600' };
      
      return (
        <Box 
          key={status} 
          px={3} 
          py={2} 
          borderRadius="md" 
          bg={colorInfo.bg} 
          color={colorInfo.color}
        >
          <Text fontSize="sm">
            <Text as="span" fontWeight="bold">{String(count)}</Text> {status}
          </Text>
        </Box>
      );
    });
  };

  const toggleStatusFilter = (status: string) => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter((s) => s !== status));
    } else {
      setStatusFilter([...statusFilter, status]);
    }
  };

  const clearStatusFilter = () => {
    setStatusFilter([]);
  };

  // Determine active step based on agreements and claim status
  let activeStep = 1; // Start at step 1 (Document Requested) by default
  if (agreements.length > 0) activeStep = 2; // Step 2: Agreement Added
  if (agreements.some(agreement => agreement.status === 'Submitted')) activeStep = 3; // Step 3: Claim Submitted
  if (agreements.some(agreement => ['OfferMade', 'Rejected', 'ClaimAlreadySubmitted', 'FOSEscalation', 'Completed'].includes(agreement.status))) activeStep = 4; // Step 4: Lender Responded

  // Define color schemes for different steps
  const stepColorSchemes = ['green', 'yellow', 'blue', 'purple'];
  
  // Define steps for the stepper
  const steps = [
    { title: "Document requested", description: "Documents requested from lender" },
    { title: "Agreement added", description: "Agreement details added" },
    { title: "Submit claim", description: "Claim submitted to lender" },
    { title: "Lender Responded", description: "Response received from lender" }
  ];

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (!lender) {
    return (
      <Center h="100vh">
        <VStack>
          <Heading>Lender not found</Heading>
          <Button leftIcon={<FiArrowLeft />} onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </VStack>
      </Center>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="container.xl">
        {/* Header with back button */}
        <VStack 
          mb={6} 
          spacing={3}
          align="flex-start"
          width="100%"
        >
          <Button
            leftIcon={<FiArrowLeft />}
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            size={{ base: 'sm', md: 'md' }}
          >
            Back to Dashboard
          </Button>
          <Heading 
            size={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            borderBottomWidth="1px"
            borderColor={borderColor}
            pb={2}
            width="100%"
          >
            Lender Details
          </Heading>
        </VStack>

        {/* Lender info card */}
        <Card mb={6} bg={cardBg} borderRadius="xl" boxShadow="md" overflow="hidden">
          <CardBody p={6}>
            <Flex 
              direction={{ base: 'column', md: 'row' }} 
              justify="space-between" 
              align={{ base: 'stretch', md: 'center' }} 
              gap={6}
            >
              {/* Left section with lender info */}
              <VStack align="stretch" spacing={3}>
                <Flex align="center" gap={3}>
                  <Box
                    bg="blue.50"
                    p={2}
                    borderRadius="lg"
                    color="blue.500"
                  >
                    <Icon as={FiUser} boxSize={6} />
                  </Box>
                  <Box>
                    <Heading size="lg" mb={1}>{lender.name}</Heading>
                    <HStack spacing={2} color="gray.500" fontSize="sm">
                      <Icon as={FiClock} />
                      <Text>Updated {new Date(lender.lastUpdated).toLocaleDateString()}</Text>
                    </HStack>
                  </Box>
                </Flex>
                <Badge
                  alignSelf="flex-start"
                  px={3}
                  py={1}
                  borderRadius="full"
                  colorScheme={
                    lender.status === 'Document Requested' ? 'blue' :
                    lender.status === 'Agreement Added' ? 'yellow' :
                    lender.status === 'Claim Submitted' ? 'green' :
                    'purple'
                  }
                  variant="subtle"
                  fontSize="sm"
                >
                  {lender.status.toUpperCase()}
                </Badge>
              </VStack>

              {/* Right section with action buttons */}
              <VStack 
                align="stretch" 
                spacing={4}
                minW={{ md: '320px' }}
              >
                <SimpleGrid columns={{ base: 1, sm: 2, md: 1 }} spacing={3}>
                  <Button
                    colorScheme="blue"
                    leftIcon={<FiPlus />}
                    onClick={onAddAgreementOpen}
                    size="md"
                    isFullWidth
                  >
                    Add Agreement
                  </Button>
                  
                  {agreements.some(agreement => agreement.status !== 'Submitted') && (
                    <Button
                      colorScheme="green"
                      leftIcon={<FiSend />}
                      onClick={onSubmitClaimOpen}
                      size="md"
                      isFullWidth
                      isDisabled={!agreements.some(agreement => agreement.status !== 'Submitted')}
                    >
                      Submit Claim
                    </Button>
                  )}
                </SimpleGrid>

                {agreements.some(agreement => agreement.status === 'Submitted') && (
                  <Button
                    colorScheme="orange"
                    leftIcon={<FiMessageSquare />}
                    onClick={() => {
                      const firstSubmitted = agreements.find(a => a.status === 'Submitted');
                      if (firstSubmitted) {
                        handleRecordResponse(firstSubmitted);
                      }
                    }}
                    size="md"
                    isFullWidth
                    variant="outline"
                  >
                    Record Response
                  </Button>
                )}
              </VStack>
            </Flex>
          </CardBody>
        </Card>

        {/* Tabs section */}
        <Tabs colorScheme="blue" variant="enclosed" bg={cardBg} borderRadius="xl" boxShadow="md">
          <TabList px={6} pt={4}>
            <Tab fontWeight="medium">Overview</Tab>
            <Tab fontWeight="medium">Agreements</Tab>
          </TabList>

          <TabPanels>
            {/* Overview Tab */}
            <TabPanel p={6}>
              {/* 1. Stats Overview */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
                <Stat
                  p={6}
                  boxShadow="sm"
                  border="1px"
                  borderColor={borderColor}
                  borderRadius="lg"
                  bg={cardBg}
                >
                  <StatLabel color="gray.500">Total Agreements</StatLabel>
                  <StatNumber fontSize="3xl">{lender.agreementsCount}</StatNumber>
                  <StatHelpText>With this lender</StatHelpText>
                </Stat>

                <Stat
                  p={6}
                  boxShadow="sm"
                  border="1px"
                  borderColor={borderColor}
                  borderRadius="lg"
                  bg={cardBg}
                >
                  <StatLabel color="gray.500">Current Stage</StatLabel>
                  <StatNumber fontSize="xl">{lender.status}</StatNumber>
                  <StatHelpText>Claim progress</StatHelpText>
                </Stat>
              </SimpleGrid>

              {/* 2. Claim Progress Timeline section - UPDATED */}
              <Box
                mb={8}
                p={6}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                bg={cardBg}
              >
                <Heading size="md" mb={6}>Claim Progress</Heading>
                
                <Box position="relative" px={{ base: 2, md: 4 }}>
                  {/* Desktop view - Horizontal stepper (hidden on mobile) */}
                  <Box display={{ base: 'none', md: 'block' }}>
                    <Stepper 
                      index={activeStep} 
                      colorScheme={stepColorSchemes[activeStep]} 
                      size="md"
                    >
                      {steps.map((step, index) => (
                        <Step key={index}>
                          <StepIndicator>
                            <StepStatus
                              complete={<StepIcon as={FiCheck} />}
                              incomplete={<StepNumber />}
                              active={<StepNumber />}
                            />
                          </StepIndicator>
                          
                          <Box flexShrink="0">
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>{step.description}</StepDescription>
                          </Box>
                          
                          <StepSeparator />
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                  
                  {/* Mobile view - Vertical stepper (hidden on desktop) */}
                  <Box display={{ base: 'block', md: 'none' }}>
                    <VStack spacing={0} align="stretch">
                      {steps.map((step, index) => (
                        <Flex key={index} mb={index < steps.length - 1 ? 3 : 0} align="center">
                          <Flex
                            w="40px"
                            h="40px"
                            borderRadius="full"
                            bg={index <= activeStep ? `${stepColorSchemes[activeStep]}.100` : 'gray.100'}
                            color={index <= activeStep ? `${stepColorSchemes[activeStep]}.600` : 'gray.400'}
                            justify="center"
                            align="center"
                            fontWeight="bold"
                            fontSize="md"
                            border="2px solid"
                            borderColor={index <= activeStep ? `${stepColorSchemes[activeStep]}.500` : 'gray.200'}
                            boxShadow={index <= activeStep ? "0 2px 4px rgba(0,0,0,0.05)" : "none"}
                            mr={3}
                          >
                            {index < activeStep ? <Icon as={FiCheck} /> : index + 1}
                          </Flex>
                          <Box>
                            <Text fontWeight="medium" fontSize="sm">{step.title}</Text>
                            <Text fontSize="xs" color="gray.500">{step.description}</Text>
                          </Box>
                        </Flex>
                      ))}
                    </VStack>
                  </Box>
                </Box>
                
                <Text textAlign="center" color="gray.500" mt={6}>
                  {agreements.length === 0
                    ? "Add your first agreement to proceed with your claim"
                    : agreements.some(agreement => agreement.status === 'Submitted') && agreements.some(agreement => agreement.status === 'Submitted')
                    ? "Waiting for lender response. You can record their response when received in agreements tab."
                    : agreements.some(agreement => agreement.status === 'Submitted')
                    ? "Your claim has been submitted. All lender responses have been recorded."
                    : "Your agreements have been added. You can now submit your claim."}
                </Text>
                
                {agreements.length > 0 && !agreements.some(agreement => agreement.status === 'Submitted') && (
                  <Flex justify="center" mt={4}>
                    <Button
                      colorScheme="green"
                      leftIcon={<FiSend />}
                      onClick={onSubmitClaimOpen}
                    >
                      Submit Claim
                    </Button>
                  </Flex>
                )}
              </Box>

              {/* 3. Lender Information section */}
              <Box
                mb={8}
                p={6}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                bg={cardBg}
              >
                <Flex justify="space-between" mb={6}>
                  <Heading size="md">Lender Information</Heading>
                  <Tooltip label="View complete activity history">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      leftIcon={<FiClock />} 
                      fontSize="sm"
                      onClick={() => {
                        // Scroll to activity log section
                        document.getElementById('activity-log-section')?.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }}
                    >
                      View History
                    </Button>
                  </Tooltip>
                </Flex>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <VStack align="start" spacing={4}>
                    <HStack>
                      <Icon as={FiUser} color="blue.500" />
                      <Text fontWeight="medium">Company Name:</Text>
                      <Text>{lender.name}</Text>
                    </HStack>

                    <HStack>
                      <Icon as={FiFileText} color="blue.500" />
                      <Text fontWeight="medium">Total Agreements:</Text>
                      <Text>{lender.agreementsCount}</Text>
                    </HStack>
                    
                    <Box py={1} px={3} bg="gray.50" borderRadius="md" w="full">
                      <Flex justify="space-between" align="center">
                        <Text fontWeight="medium" fontSize="sm" color="gray.700">Current Status:</Text>
                        <StatusBadge status={lender.status} />
                      </Flex>
                    </Box>
                  </VStack>

                  <VStack align="start" spacing={4}>
                    <HStack>
                      <Icon as={FiCalendar} color="blue.500" />
                      <Text fontWeight="medium">Date Added:</Text>
                      <Text>{formatTimestamp(lender.createdAt)}</Text>
                    </HStack>

                    <HStack>
                      <Icon as={FiClock} color="blue.500" />
                      <Text fontWeight="medium">Last Updated:</Text>
                      <Text>{lender.lastUpdated}</Text>
                    </HStack>
                    
                    {agreements.some(agreement => agreement.status === 'Submitted') && (
                      <HStack>
                        <Icon as={FiSend} color="blue.500" />
                        <Text fontWeight="medium">Claim Submitted:</Text>
                        <Text>{formatTimestamp(lender.claimDate)}</Text>
                      </HStack>
                    )}
                    
                  </VStack>
                </SimpleGrid>
                
                {/* Status Timeline */}
                <Box mt={6}>
                  <Text fontWeight="medium" mb={2}>Status History:</Text>
                  <VStack align="stretch" spacing={2}>
                    {activityLog
                      .filter(activity => 
                        ['claim_created', 'document_requested', 'claim_submitted', 'lender_response'].includes(activity.type)
                      )
                      .slice(0, 4) // Only show latest 4 statuses
                      .map((activity, index) => (
                        <Flex 
                          key={activity.id} 
                          p={2} 
                          bg={index === 0 ? 'blue.50' : 'gray.50'} 
                          borderRadius="md"
                          borderLeftWidth="3px"
                          borderLeftColor={index === 0 ? 'blue.400' : 'gray.300'}
                        >
                          <Icon as={activity.icon} color={index === 0 ? 'blue.500' : 'gray.500'} mr={2} />
                          <Box>
                            <Text fontSize="sm" fontWeight="medium">{activity.title}</Text>
                            <Text fontSize="xs" color="gray.500">{formatTimestamp(activity.timestamp)}</Text>
                          </Box>
                        </Flex>
                      ))
                    }
                  </VStack>
                </Box>
              </Box>

              {/* 4. Activity Log Section - with ID for scrolling */}
              <Box
                id="activity-log-section"
                mb={8}
                p={6}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                bg={cardBg}
                scrollMarginTop="100px"
              >
                <Heading size="md" mb={6}>Activity Log</Heading>
                
                {activityLog.length === 0 ? (
                  <Text color="gray.500" textAlign="center">No activity recorded yet</Text>
                ) : (
                  <VStack spacing={0} align="stretch" maxH="500px" overflowY="auto" pr={2}>
                    {activityLog.map((activity, index) => (
                      <ActivityItem
                        key={activity.id}
                        icon={activity.icon}
                        title={activity.title}
                        description={activity.description}
                        timestamp={formatTimestamp(activity.timestamp)}
                        isLatest={index === 0}
                      />
                    ))}
                  </VStack>
                )}
              </Box>
            </TabPanel>

            {/* Agreements Tab - Simplified and clearer */}
            <TabPanel p={6}>
              <Flex 
                direction={{ base: 'column', md: 'row' }} 
                justify={{ base: 'flex-start', md: 'space-between' }} 
                align={{ base: 'stretch', md: 'center' }} 
                mb={6} 
                gap={4}
              >
                <Heading size="md">All Agreements</Heading>
                <HStack spacing={3} width={{ base: 'full', md: 'auto' }}>
                  <Menu closeOnSelect={false}>
                    <MenuButton 
                      as={Button} 
                      rightIcon={<FiFilter />} 
                      size="sm"
                      variant="outline"
                      width={{ base: 'full', md: 'auto' }}
                    >
                      Filter
                    </MenuButton>
                    <MenuList minWidth="240px">
                      <MenuOptionGroup title="Status" type="checkbox" value={statusFilter}>
                        <MenuItemOption value="Pending" onClick={() => toggleStatusFilter('Pending')}>
                          Pending
                        </MenuItemOption>
                        <MenuItemOption value="Submitted" onClick={() => toggleStatusFilter('Submitted')}>
                          Submitted
                        </MenuItemOption>
                        <MenuItemOption value="OfferMade" onClick={() => toggleStatusFilter('OfferMade')}>
                          Offer Made
                        </MenuItemOption>
                        <MenuItemOption value="Rejected" onClick={() => toggleStatusFilter('Rejected')}>
                          Rejected
                        </MenuItemOption>
                        <MenuItemOption value="ClaimAlreadySubmitted" onClick={() => toggleStatusFilter('ClaimAlreadySubmitted')}>
                          Already Submitted
                        </MenuItemOption>
                        <MenuItemOption value="FOSEscalation" onClick={() => toggleStatusFilter('FOSEscalation')}>
                          FOS Escalation
                        </MenuItemOption>
                        <MenuItemOption value="Completed" onClick={() => toggleStatusFilter('Completed')}>
                          Completed
                        </MenuItemOption>
                      </MenuOptionGroup>
                    </MenuList>
                  </Menu>
                  <Button 
                    leftIcon={<FiPlus />} 
                    colorScheme="blue" 
                    onClick={onAddAgreementOpen} 
                    size="sm"
                    width={{ base: 'full', md: 'auto' }}
                  >
                    Add Agreement
                  </Button>
                </HStack>
              </Flex>

              {agreements.length === 0 ? (
                <Box
                  p={10}
                  textAlign="center"
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="lg"
                >
                  <Icon as={FiFileText} boxSize={10} color="gray.400" mb={4} />
                  <Heading size="md" mb={2}>No agreements added yet</Heading>
                  <Text color="gray.500" mb={6}>
                    Add your first agreement to continue with your claim process.
                  </Text>
                  <Button colorScheme="blue" leftIcon={<FiPlus />} onClick={onAddAgreementOpen}>
                    Add Agreement
                  </Button>
                </Box>
              ) : (
                <>
                  {/* Status summary counts */}
                  <Flex mb={6} wrap="wrap" gap={3}>
                    {renderStatusCounts()}
                  </Flex>
                  
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    {filteredAgreements.map((agreement, index) => (
                      <AgreementCard 
                        key={index} 
                        agreement={agreement} 
                        onRecordResponse={handleRecordResponse}
                      />
                    ))}
                  </SimpleGrid>
                  
                  {/* Show message if no agreements match the filter */}
                  {filteredAgreements.length === 0 && (
                    <Box textAlign="center" p={6} color="gray.500">
                      <Text>No agreements match the selected filters.</Text>
                      <Button size="sm" variant="link" colorScheme="blue" onClick={clearStatusFilter} mt={2}>
                        Clear Filters
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>

      {/* Add Agreement Modal */}
      <AddAgreementModal
        isOpen={isAddAgreementOpen}
        onClose={onAddAgreementClose}
        lenderName={lender.name}
        lenderId={lender.id}
        onAddAgreement={handleAddAgreement}
      />

      {/* Submit Claim Modal */}
      <SubmitClaimModal
        isOpen={isSubmitClaimOpen}
        onClose={onSubmitClaimClose}
        lenderName={lender.name}
        agreements={agreements.filter(agreement => agreement.status === 'Pending')}
        onSubmitClaim={async (templateType: string, customText?: string, selectedAgreements?: string[], mail?: { subject: string, body: string }) => {
          await handleSubmitClaim(templateType, customText, selectedAgreements, mail);
        }}
      />
      
      {/* Lender Response Modal */} 
      {selectedAgreement && (
        <LenderResponseModal
          isOpen={isLenderResponseOpen}
          onClose={onLenderResponseClose}
          lenderName={lender.name}
          agreement={selectedAgreement}
          agreements={agreements.filter(agreement => agreement.status != 'Pending')}
          onUpdateStatus={handleUpdateAgreementStatus}
        />
      )}
    </Box>
  );
};

export default LenderDetails; 