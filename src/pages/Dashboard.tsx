// @ts-nocheck

import { useState, useEffect, type Key } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Badge,
  Text,
  useColorModeValue,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Card,
  CardBody,
  StatArrow,
  Container,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiPlus,
  FiChevronRight,
  FiTrendingUp,
  FiUsers,
  FiFileText,
  FiDollarSign,
  FiMail,
} from 'react-icons/fi';
import AddLenderModal from '../components/modals/AddLenderModal';
import AddAgreementModal from '../components/modals/AddAgreementModal';
import SubmitClaimModal from '../components/modals/SubmitClaimModal';
import { userAtom } from '@/jotai/atoms';
import { useAtomValue } from 'jotai';
import { getClaims, createClaim } from '@/api/services/claims';

interface Agreement {
  agreementNumber: string;
  status: string;
  carRegistration: string;
  offerStatus: string | null;
  documentRequestStatus: string;
}

interface Claim {
  _id: string;
  user: string;
  lender: string;
  claimStatus: string;
  agreement: Agreement;
  createdAt: string;
  updatedAt: string;
}

interface LenderWithClaims {
  lender: {
    id: string;
    name: string;
  };
  claims: Claim[];
}

// Add new interfaces for the dashboard data structure
interface DashboardAgreement {
  id: string;
  status: string;
  carRegistration: string;
  startDate: string;
}

interface DashboardLender {
  id: string;
  name: string;
  status: string;
  agreementsCount: number;
  prefix: string;
  claimSubmitted: boolean;
  lenderResponded: boolean;
  potentialRefund: number;
  agreements: DashboardAgreement[];
}

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

// Agreement card component
const AgreementCard = ({ id = '001', status = 'Pending', carRegistration = '', createdAt = '', onClick }: { id?: string, status?: string, carRegistration?: string, createdAt?: string, onClick?: () => void }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('white', 'gray.700');

  // Status badge colors
  const statusColors = {
    Pending: { bg: 'yellow.100', color: 'yellow.800', text: 'Pending' },
    Submitted: { bg: 'blue.100', color: 'blue.800', text: 'Submitted' },
    'Offer Made': { bg: 'green.100', color: 'green.800', text: 'Offer Made' },
    Rejected: { bg: 'red.100', color: 'red.800', text: 'Rejected' },
    'FCA Pause': { bg: 'purple.100', color: 'purple.800', text: 'FCA Pause' },
    Accepted: { bg: 'green.100', color: 'green.800', text: 'Accepted' },
    Declined: { bg: 'orange.100', color: 'orange.800', text: 'Declined' },
    Escalated: { bg: 'red.100', color: 'red.800', text: 'Escalated' }
  };

  const statusColor = statusColors[status as keyof typeof statusColors] ||
    { bg: 'gray.100', color: 'gray.800', text: status };

  return (
    <Card
      variant="outline"
      my={3}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      boxShadow="sm"
      bg={cardBg}
      onClick={onClick}
      cursor={onClick ? "pointer" : "default"}
      _hover={onClick ? {
        boxShadow: 'md',
        borderColor: 'blue.200',
      } : {}}
      transition="all 0.2s"
    >
      <CardBody>
        <Flex justify="space-between" align="center" mb={3}>
          <Text fontWeight="bold">Agreement # {id}</Text>
          <Badge
            px={2}
            py={1}
            borderRadius="full"
            bg={statusColor.bg}
            color={statusColor.color}
          >
            {statusColor.text}
          </Badge>
        </Flex>
        <VStack spacing={2} align="stretch">
          <HStack>
            <Icon as={FiChevronRight} color="blue.500" />
            <Text fontSize="sm">Car Registration: {carRegistration}</Text>
          </HStack>
          <HStack>
            <Icon as={FiChevronRight} color="blue.500" />
            <Text fontSize="sm">Added at: {new Date(createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}</Text>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

// Lender section component with improved timeline
const LenderSection = ({
  lender,
  onAddAgreement,
  onViewDetails,
  onSubmitClaim
}: {
  lender: DashboardLender,
  onAddAgreement: (lenderId: string) => void,
  onViewDetails: (lenderId: string) => void,
  onSubmitClaim: (lenderId: string) => void
}) => {
  const statusBgColor = useColorModeValue('blue.50', 'blue.900');
  const sectionBgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Determine active step based on lender status
  let activeStep = 1; // Default to first step
  if (lender.agreementsCount > 0) activeStep = 2;
  if (lender.claimSubmitted) activeStep = 3;
  if (lender.lenderResponded) activeStep = 4;

  // Timeline steps configuration
  const timelineSteps = [
    { number: 1, text: "Document requested", description: "Documents requested from lender" },
    { number: 2, text: "Agreement added", description: "Agreement details added" },
    { number: 3, text: "Submit claim", description: "Claim submitted to lender" },
    { number: 4, text: "Lender Responded", description: "Response received from lender" }
  ];

  return (
    <Box
      mb={8}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      bg={sectionBgColor}
      boxShadow="sm"
      transition="all 0.2s ease"
      _hover={{ boxShadow: "md", cursor: "pointer" }}
      onClick={() => onViewDetails(lender.id)}
    >
      <Flex
        justify="space-between"
        align="center"
        px={6}
        py={4}
        borderBottomWidth="1px"
        borderColor={borderColor}
        bg={useColorModeValue('gray.50', 'gray.700')}
      >
        <Heading as="h3" size="md" fontWeight="bold" fontFamily="body">
          {lender.name}
        </Heading>
        <Badge
          px={3}
          py={1.5}
          borderRadius="full"
          bg={statusBgColor}
          color="blue.600"
          fontWeight="medium"
          fontSize="xs"
          boxShadow="sm"
          borderWidth="1px"
          borderColor="blue.200"
        >
          Status: {lender.status}
        </Badge>
        <Button
          size="sm"
          variant="outline"
          color="green.500"
          borderColor="gray.300"
          _hover={{ bg: 'blue.50', borderColor: 'blue.400' }}
          onClick={(e) => {
            e.stopPropagation();
            onSubmitClaim(lender.id);
          }}
          isDisabled={lender.agreementsCount === 0 || lender.claimSubmitted}
        >
          Submit Claim
        </Button>
      </Flex>

      {/* Improved Timeline */}
      <Box px={4} py={4} borderBottomWidth="1px" borderColor={borderColor}>
        <Timeline steps={timelineSteps} activeStep={activeStep} />
      </Box>

      {/* Agreement cards */}
      <Box p={6}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {lender.agreementsCount > 0 ? (
            lender.agreements.map((agreement) => (
              <AgreementCard
                key={agreement.id}
                id={agreement.id}
                status={agreement.status}
                carRegistration={agreement.carRegistration}
                createdAt={agreement.startDate}
              />
            ))
          ) : (
            <Text color="gray.500">No agreements added yet.</Text>
          )}
        </SimpleGrid>

        {/* Add Agreement button */}
        <Flex justify="center" mt={6}>
          <Button
            variant="outline"
            borderStyle="dashed"
            leftIcon={<FiPlus />}
            color="blue.500"
            borderColor="blue.300"
            _hover={{ bg: 'blue.50', borderColor: 'blue.400' }}
            onClick={(e) => {
              e.stopPropagation();
              onAddAgreement(lender.id);
            }}
          >
            Add Agreement
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

// Main Dashboard component
const Dashboard = () => {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [lenders, setLenders] = useState<DashboardLender[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [claims, setClaims] = useState<LenderWithClaims[]>([]);
  const [statistics, setStatistics] = useState({
    totalLenders: 0,
    activeLenders: 0,
    potentialRefund: 0,
    totalAgreements: 0,
    percentIncrease: 23
  });

  const {
    isOpen: isAddLenderOpen,
    onOpen: onAddLenderOpen,
    onClose: onAddLenderClose
  } = useDisclosure();

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

  const [selectedLenderId, setSelectedLenderId] = useState<string | null>(null);

  // UI colors
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const claimsData = await getClaims();
      setClaims(claimsData.data);
      
      // Update lenders based on claims data with proper typing
      const updatedLenders: DashboardLender[] = claimsData.data.map((lenderData: LenderWithClaims) => {
        // Check if any agreement in the claims has a status of "Submitted"
        const hasSubmittedClaim = lenderData.claims.some(claim => 
          claim.agreement.status === 'Submitted'
        );
        
        return {
          id: lenderData.lender.id,
          name: lenderData.lender.name,
          status: hasSubmittedClaim ? 'Claim Submitted' : 'Document Requested',
          agreementsCount: lenderData.claims.length,
          prefix: lenderData.lender.name.substring(0, 2).toUpperCase() + '00',
          claimSubmitted: hasSubmittedClaim,
          lenderResponded: false,
          potentialRefund: 0,
          agreements: lenderData.claims.map(claim => ({
            id: claim.agreement.agreementNumber,
            startDate: new Date(claim.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }),
            status: claim.agreement.status,
            carRegistration: claim.agreement.carRegistration
          }))
        };
      });

      setLenders(updatedLenders);

      // Calculate statistics
      const totalLenders = updatedLenders.length;
      const activeLenders = updatedLenders.filter((l: any) => l.status !== 'Completed').length;
      const totalAgreements = updatedLenders.reduce((acc: number, l: any) => acc + l.agreementsCount, 0);
      const potentialRefund = updatedLenders.reduce((acc: number, l: any) => acc + l.potentialRefund, 0);

      setStatistics({
        totalLenders,
        activeLenders,
        potentialRefund,
        totalAgreements,
        percentIncrease: 23
      });
    } catch (error) {
      console.error('Error fetching claims:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddLender = async (newLenders: { _id: string; name: string }[]) => {
    // Add new lenders to the list with proper typing
    const updatedLenders: DashboardLender[] = [...lenders, ...newLenders.map(nl => ({
      id: `${lenders.length + 1}`,
      name: nl.name,
      status: 'Document Requested',
      agreementsCount: 0,
      prefix: nl.name.substring(0, 2).toUpperCase() + '00',
      claimSubmitted: false,
      lenderResponded: false,
      potentialRefund: 0,
      agreements: []
    }))];

    setLenders(updatedLenders);

    // Update statistics
    setStatistics({
      ...statistics,
      totalLenders: updatedLenders.length,
      activeLenders: updatedLenders.filter(l => l.status !== 'Completed').length
    });
  };

  const handleAddAgreement = (lenderId: string) => {
    setSelectedLenderId(lenderId);
    onAddAgreementOpen();
  };

  const handleSaveAgreement = async (agreementData: { agreementNumber: string, carRegistration: string }) => {
    if (selectedLenderId) {
      try {
        const selectedLender = lenders.find(lender => lender.id === selectedLenderId);
        if (!selectedLender) return;
        // Create claim in backend with the required format
        const claimData = {
          agreement: {
            agreementNumber: agreementData.agreementNumber,
            carRegistration: agreementData.carRegistration
          },
          lenderId: selectedLenderId
        };

        const response = await createClaim(claimData);
        
        if (response.success) {
          // Refresh the claims data to get the updated state
          await fetchData();
        } else {
          throw new Error('Failed to create claim');
        }
      } catch (error) {
        console.error('Error creating claim:', error);
      }
    }
  };

  const handleViewLenderDetails = (lenderId: string) => {
    navigate(`/dashboard/lenders/${lenderId}`);
  };

  const handleSubmitClaim = (lenderId: string) => {
    setSelectedLenderId(lenderId);
    onSubmitClaimOpen();
  };

  const handleProcessClaimSubmission = async (
    templateType: string,
    customText?: string,
    selectedAgreements?: string[]
  ) => {
    if (selectedLenderId) {
      // Update lender status to indicate claim submission and update agreement statuses
      const updatedLenders = lenders.map(lender => {
        if (lender.id === selectedLenderId) {
          // Update the status of submitted agreements
          const updatedAgreements = lender.agreements.map(agreement => {
            // Check if this agreement's ID is in the selectedAgreements array
            if (selectedAgreements?.includes(agreement.id)) {
              return { 
                ...agreement, 
                status: 'Submitted' 
              };
            }
            return agreement;
          });

          // Check if any agreement has status 'Submitted'
          const hasSubmittedAgreement = updatedAgreements.some(agreement => 
            agreement.status === 'Submitted'
          );

          return {
            ...lender,
            status: hasSubmittedAgreement ? 'Claim Submitted' : 'Document Requested',
            claimSubmitted: hasSubmittedAgreement,
            agreements: updatedAgreements
          };
        }
        return lender;
      });

      setLenders(updatedLenders);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      return true;
    }
    return false;
  };

  // Add a function to navigate to mailbox
  const handleNavigateToMailbox = () => {
    navigate('/dashboard/mailbox');
  };

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="container.xl">
        <Flex
          justify="space-between"
          align="center"
          mb={8}
          bg={cardBg}
          p={6}
          borderRadius="xl"
          boxShadow="sm"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Box>
            <Heading size="lg" fontWeight="bold">Welcome back</Heading>
            <Text color="gray.600" mt={1}>Manage your lenders and agreements</Text>
          </Box>
          <HStack spacing={4}>
            <Button
              leftIcon={<Icon as={FiMail} />}
              colorScheme="blue"
              variant="outline"
              onClick={handleNavigateToMailbox}
            >
              Check Messages
            </Button>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="blue"
              onClick={onAddLenderOpen}
            >
              Add Lender
            </Button>
          </HStack>
        </Flex>

        {/* Stats Overview */}
        {/* <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={10}>
          <Stat
            p={6}
            boxShadow="md"
            border="1px"
            borderColor={borderColor}
            borderRadius="xl"
            bg={cardBg}
          >
            <Flex mb={2}>
              <Box p={2} bg="blue.50" borderRadius="md" color="blue.500" mr={2}>
                <Icon as={FiUsers} boxSize={5} />
              </Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.500">
                Total Lenders
              </Text>
            </Flex>
            <StatNumber fontSize="3xl" fontWeight="bold">{statistics.totalLenders}</StatNumber>
            <StatHelpText mt={2} mb={0}>
              <StatArrow type="increase" />
              <Text as="span" fontWeight="medium" color="green.500">
                {statistics.percentIncrease}% from last month
              </Text>
            </StatHelpText>
          </Stat>

          <Stat
            p={6}
            boxShadow="md"
            border="1px"
            borderColor={borderColor}
            borderRadius="xl"
            bg={cardBg}
          >
            <Flex mb={2}>
              <Box p={2} bg="orange.50" borderRadius="md" color="orange.500" mr={2}>
                <Icon as={FiUsers} boxSize={5} />
              </Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.500">
                Active Lenders
              </Text>
            </Flex>
            <StatNumber fontSize="3xl" fontWeight="bold">{statistics.activeLenders}</StatNumber>
            <StatHelpText mt={2} mb={0}>
              <Flex align="center">
                <Box w="2" h="2" borderRadius="full" bg="orange.400" mr={2}></Box>
                <Text fontSize="xs" color="gray.500" fontWeight="medium">
                  Awaiting action
                </Text>
              </Flex>
            </StatHelpText>
          </Stat>

          <Stat
            p={6}
            boxShadow="md"
            border="1px"
            borderColor={borderColor}
            borderRadius="xl"
            bg={cardBg}
          >
            <Flex mb={2}>
              <Box p={2} bg="green.50" borderRadius="md" color="green.500" mr={2}>
                <Icon as={FiDollarSign} boxSize={5} />
              </Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.500">
                Potential Refund
              </Text>
            </Flex>
            <StatNumber fontSize="3xl" fontWeight="bold">£{statistics.potentialRefund.toLocaleString()}</StatNumber>
            <StatHelpText mt={2} mb={0}>
              <Flex align="center">
                <Box w="2" h="2" borderRadius="full" bg="blue.400" mr={2}></Box>
                <Text fontSize="xs" color="gray.500" fontWeight="medium">
                  Estimated total
                </Text>
              </Flex>
            </StatHelpText>
          </Stat>

          <Stat
            p={6}
            boxShadow="md"
            border="1px"
            borderColor={borderColor}
            borderRadius="xl"
            bg={cardBg}
          >
            <Flex mb={2}>
              <Box p={2} bg="purple.50" borderRadius="md" color="purple.500" mr={2}>
                <Icon as={FiFileText} boxSize={5} />
              </Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.500">
                Total Agreements
              </Text>
            </Flex>
            <StatNumber fontSize="3xl" fontWeight="bold">{statistics.totalAgreements}</StatNumber>
            <StatHelpText mt={2} mb={0}>
              <Flex align="center">
                <Box w="2" h="2" borderRadius="full" bg="green.400" mr={2}></Box>
                <Text fontSize="xs" color="gray.500" fontWeight="medium">
                  Across all lenders
                </Text>
              </Flex>
            </StatHelpText>
          </Stat>
        </SimpleGrid> */}

        {/* My Lenders section */}
        <Box mb={10}>
          <Flex
            justify="space-between"
            align="center"
            mb={6}
            bg={cardBg}
            p={5}
          >
            <Heading as="h2" size="lg" fontWeight="bold" >
              My Lenders
            </Heading>
          </Flex>

          {isLoading ? (
            <Text>Loading...</Text>
          ) : lenders.length === 0 ? (
            <Box p={10} textAlign="center" borderWidth="1px" borderColor={borderColor} borderRadius="xl">
              <Heading size="md" mb={4}>No lenders added yet</Heading>
              <Text mb={6}>Start by adding your first lender to begin the claims process.</Text>
              <Button colorScheme="blue" leftIcon={<FiPlus />} onClick={onAddLenderOpen}>
                Add Your First Lender
              </Button>
            </Box>
          ) : (
            lenders.map(lender => (
              <LenderSection
                key={lender.id}
                lender={lender}
                onAddAgreement={handleAddAgreement}
                onViewDetails={handleViewLenderDetails}
                onSubmitClaim={handleSubmitClaim}
              />
            ))
          )}
        </Box>
      </Container>

      {/* Add Lender Modal */}
      <AddLenderModal
        isOpen={isAddLenderOpen}
        onClose={onAddLenderClose}
        onAddLenders={handleAddLender}
        existingLenders={lenders.map(l => ({ _id: l.id, name: l.name }))}
      />

      {/* Add Agreement Modal */}
      {selectedLenderId && (
        <AddAgreementModal
          isOpen={isAddAgreementOpen}
          onClose={onAddAgreementClose}
          lenderName={lenders.find(l => l.id === selectedLenderId)?.name || ''}
          lenderId={selectedLenderId}
          onAddAgreement={handleSaveAgreement}
        />
      )}

      {/* Submit Claim Modal */}
      {selectedLenderId && (
        <SubmitClaimModal
          isOpen={isSubmitClaimOpen}
          onClose={onSubmitClaimClose}
          lenderName={lenders.find(l => l.id === selectedLenderId)?.name || ''}
          agreements={lenders.find(l => l.id === selectedLenderId)?.agreements.map(a => ({
            agreementNumber: a.id,
            status: a.status,
            carRegistration: a.carRegistration,
            startDate: a.startDate
          })) || []}
          onSubmitClaim={async (templateType: string, customText?: string, selectedAgreements?: string[]) => {
            await handleProcessClaimSubmission(templateType, customText, selectedAgreements);
          }}
        />
      )}
    </Box>
  );
};

export default Dashboard; 