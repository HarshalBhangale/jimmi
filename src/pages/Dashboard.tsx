// @ts-nocheck

import { useState, useEffect, type Key, useRef } from 'react';
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
  Center,
  Spinner,
  CardHeader,
  Skeleton,
  SkeletonText,
  Avatar,
  AvatarGroup,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
} from '@chakra-ui/react';
import {
  FiPlus,
  FiChevronRight,
  FiTrendingUp,
  FiUsers,
  FiFileText,
  FiDollarSign,
  FiMail,
  FiCheck,
  FiClock,
  FiActivity,
  FiTarget,
  FiSearch,
  FiUser,
  FiX,
} from 'react-icons/fi';
import AddLenderModal from '../components/modals/AddLenderModal';
import AddAgreementModal from '../components/modals/AddAgreementModal';
import SubmitClaimModal from '../components/modals/SubmitClaimModal';
import { userAtom } from '@/jotai/atoms';
import { useAtomValue } from 'jotai';
import { getClaims, createClaim } from '@/api/services/claims';

const CLAIM_RESPONSE_STATUSES =  ['OfferMade', 'Accepted', 'Rejected', 'Declined', 'Escalated', 'FCA Pause']

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

// Enhanced Statistics Cards Component
const StatisticsCards = ({ statistics, isLoading }: { statistics: any, isLoading: boolean }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const iconBg = useColorModeValue('blue.50', 'blue.900');
  
  const stats = [
    {
      label: 'Total Lenders',
      value: statistics.totalLenders,
      icon: FiUsers,
      color: 'blue',
      change: '+12%',
      changeType: 'increase'
    },
    {
      label: 'Active Claims',
      value: statistics.activeLenders,
      icon: FiActivity,
      color: 'green',
      change: '+8%',
      changeType: 'increase'
    },
    {
      label: 'Total Agreements',
      value: statistics.totalAgreements,
      icon: FiFileText,
      color: 'purple',
      change: '+23%',
      changeType: 'increase'
    },
    {
      label: 'Potential Refund',
      value: `£${statistics.potentialRefund.toLocaleString()}`,
      icon: FiDollarSign,
      color: 'orange',
      change: '+15%',
      changeType: 'increase'
    }
  ];

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={{ base: 4, md: 6 }} mb={{ base: 6, md: 8 }}>
      {stats.map((stat, index) => (
        <Card
          key={index}
          bg={cardBg}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="xl"
          overflow="hidden"
          transition="all 0.3s ease"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
            borderColor: `${stat.color}.200`
          }}
          cursor="pointer"
        >
          <CardBody p={{ base: 4, md: 6 }}>
            {isLoading ? (
              <VStack spacing={3} align="stretch">
                <Skeleton height="40px" borderRadius="lg" />
                <Skeleton height="20px" borderRadius="md" />
                <Skeleton height="16px" borderRadius="md" width="60%" />
              </VStack>
            ) : (
              <>
                <Flex justify="space-between" align="flex-start" mb={4}>
                  <Box>
                    <Stat>
                      <StatLabel fontSize={{ base: "sm", md: "md" }} color="gray.600" fontWeight="medium">
                        {stat.label}
                      </StatLabel>
                      <StatNumber fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color={`${stat.color}.600`}>
                        {stat.value}
                      </StatNumber>
                      <StatHelpText fontSize="xs" mb={0}>
                        <StatArrow type={stat.changeType as any} />
                        {stat.change} from last month
                      </StatHelpText>
                    </Stat>
                  </Box>
                  <Flex
                    w={{ base: "40px", md: "48px" }}
                    h={{ base: "40px", md: "48px" }}
                    borderRadius="xl"
                    bg={`${stat.color}.50`}
                    align="center"
                    justify="center"
                    flexShrink={0}
                  >
                    <Icon as={stat.icon} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} color={`${stat.color}.600`} />
                  </Flex>
                </Flex>
              </>
            )}
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
};

// Enhanced Agreement card component
const AgreementCard = ({ id = '001', status = 'Pending', carRegistration = '', createdAt = '', onClick }: { id?: string, status?: string, carRegistration?: string, createdAt?: string, onClick?: () => void }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  // Enhanced status badge colors with better visual hierarchy
  const statusColors = {
    Pending: { bg: 'yellow.100', color: 'yellow.800', text: 'Pending', borderColor: 'yellow.200' },
    Submitted: { bg: 'blue.100', color: 'blue.800', text: 'Submitted', borderColor: 'blue.200' },
    OfferMade: { bg: 'green.100', color: 'green.800', text: 'OfferMade', borderColor: 'green.200' },
    Rejected: { bg: 'red.100', color: 'red.800', text: 'Rejected', borderColor: 'red.200' },
    FCAPause: { bg: 'purple.100', color: 'purple.800', text: 'FCAPause', borderColor: 'purple.200' },
    Accepted: { bg: 'green.100', color: 'green.800', text: 'Accepted', borderColor: 'green.200' },
    Declined: { bg: 'orange.100', color: 'orange.800', text: 'Declined', borderColor: 'orange.200' },
    Escalated: { bg: 'red.100', color: 'red.800', text: 'Escalated', borderColor: 'red.200' }
  };

  const statusColor = statusColors[status as keyof typeof statusColors] ||
    { bg: 'gray.100', color: 'gray.800', text: status, borderColor: 'gray.200' };

  return (
    <Card
      variant="outline"
      my={{ base: 2, md: 3 }}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      boxShadow="sm"
      bg={cardBg}
      onClick={onClick}
      cursor={onClick ? "pointer" : "default"}
      _hover={onClick ? {
        boxShadow: 'lg',
        borderColor: 'blue.300',
        bg: hoverBg,
        transform: 'translateY(-1px)',
      } : {}}
      transition="all 0.2s ease"
      overflow="hidden"
    >
      <CardBody py={{ base: 4, md: 5 }} px={{ base: 4, md: 5 }}>
        <Flex 
          justify="space-between" 
          align={{ base: "flex-start", sm: "center" }}
          mb={4}
          direction={{ base: "column", sm: "row" }}
          gap={{ base: 3, sm: 2 }}
        >
          <VStack align="flex-start" spacing={1}>
            <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }} color="gray.800">
              Agreement #{id}
            </Text>
            <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500">
              {new Date(createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </Text>
          </VStack>
          <Badge
            px={{ base: 3, md: 4 }}
            py={2}
            borderRadius="lg"
            bg={statusColor.bg}
            color={statusColor.color}
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="semibold"
            borderWidth="1px"
            borderColor={statusColor.borderColor}
            whiteSpace="nowrap"
            boxShadow="sm"
          >
            {statusColor.text}
          </Badge>
        </Flex>
        
        <VStack spacing={3} align="stretch">
          <Flex align="center" gap={3} p={3} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
            <Flex 
              w={8} h={8} 
              borderRadius="md" 
              bg="blue.100" 
              align="center" 
              justify="center"
              flexShrink={0}
            >
              <Icon as={FiChevronRight} color="blue.600" w={4} h={4} />
            </Flex>
            <Box flex="1" minW="0">
              <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600" mb={1}>
                Car Registration
              </Text>
              <Text fontSize={{ base: "sm", md: "md" }} fontWeight="medium" wordBreak="break-word">
                {carRegistration}
              </Text>
            </Box>
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
};

// Enhanced Lender section component
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
  const headerBg = useColorModeValue('gray.50', 'gray.700');

  // Enhanced active step logic based on lender status and agreements
  let activeStep = 0;
  
  // Step 1: Document Requested (initial state)
  if (lender.status === 'Document Requested') {
    activeStep = 0;
  }
  
  // Step 2: Agreement Added (if there are any agreements)
  if (lender.agreementsCount > 0) {
    activeStep = 1;
  }
  
  // Step 3: Submit Claim (if any agreement has been submitted or lender status is Claim Submitted)
  if (lender.status === 'Claim Submitted' || lender.agreements.some(agreement => agreement.status === 'Submitted')) {
    activeStep = 2;
  }
  
  // Step 4: Lender Responded (if any agreement has a response status)
  if (lender.status === 'Lender Responded' || lender.agreements.some(agreement => 
    CLAIM_RESPONSE_STATUSES.includes(agreement.status)
  )) {
    activeStep = 4;
  }

  const stepColorSchemes = ['blue', 'green', 'purple', 'orange'];

  const steps = [
    { title: "Document requested", description: "Documents requested from lender", icon: FiFileText },
    { title: "Agreement added", description: "Agreement details added", icon: FiPlus },
    { title: "Submit claim", description: "Claim submitted to lender", icon: FiTarget },
    { title: "Lender Responded", description: "Response received from lender", icon: FiCheck }
  ];

  return (
    <Card
      mb={8}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="2xl"
      overflow="hidden"
      bg={sectionBgColor}
      boxShadow="md"
      transition="all 0.3s ease"
      _hover={{ 
        boxShadow: "xl", 
        transform: "translateY(-2px)",
        cursor: "pointer" 
      }}
      onClick={() => onViewDetails(lender.id)}
    >
      {/* Enhanced Header */}
      <CardHeader
        px={{ base: 5, md: 8 }}
        py={{ base: 5, md: 6 }}
        borderBottomWidth="1px"
        borderColor={borderColor}
        bg={headerBg}
      >
        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap={{ base: 4, md: 0 }}
        >
          <VStack align="flex-start" spacing={2}>
            <Flex align="center" gap={3}>
              <Avatar 
                name={lender.name} 
                size={{ base: "sm", md: "md" }}
                bg="blue.500"
                color="white"
                fontWeight="bold"
              />
              <Box>
                <Heading as="h3" size={{ base: "md", md: "lg" }} fontWeight="bold" color="gray.800">
                  {lender.name}
                </Heading>
                <Text fontSize={{ base: "sm", md: "md" }} color="gray.600">
                  {lender.agreementsCount} agreement{lender.agreementsCount !== 1 ? 's' : ''}
                </Text>
              </Box>
            </Flex>
          </VStack>
          
          <VStack align={{ base: "stretch", md: "flex-end" }} spacing={3}>
            <Badge
              px={4}
              py={2}
              borderRadius="xl"
              bg={statusBgColor}
              color="blue.700"
              fontWeight="semibold"
              fontSize={{ base: "sm", md: "md" }}
              boxShadow="sm"
              borderWidth="1px"
              borderColor="blue.200"
              textAlign="center"
            >
              {lender.status}
            </Badge>
            {/* <Button
              size={{ base: "sm", md: "md" }}
              colorScheme="green"
              variant={lender.claimSubmitted ? "outline" : "solid"}
              leftIcon={<Icon as={lender.claimSubmitted ? FiCheck : FiTarget} />}
              onClick={(e) => {
                e.stopPropagation();
                onSubmitClaim(lender.id);
              }}
              isDisabled={lender.agreementsCount === 0 || lender.claimSubmitted}
              fontSize={{ base: "sm", md: "md" }}
              px={{ base: 4, md: 6 }}
              minW={{ base: "auto", md: "140px" }}
            >
              {lender.claimSubmitted ? 'Claim Submitted' : 'Submit Claim'}
            </Button> */}
          </VStack>
        </Flex>
      </CardHeader>

      {/* Enhanced Progress Tracker */}
      <Box px={{ base: 5, md: 8 }} py={{ base: 6, md: 8 }} borderBottomWidth="1px" borderColor={borderColor}>
        {/* Desktop view - Horizontal stepper */}
        <Box display={{ base: 'none', lg: 'block' }}>
          <Stepper 
            index={activeStep} 
            colorScheme={stepColorSchemes[Math.min(activeStep, stepColorSchemes.length - 1)]} 
            size="lg"
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon as={FiCheck} />}
                    incomplete={<Icon as={step.icon} />}
                    active={<Icon as={step.icon} />}
                  />
                </StepIndicator>
                
                <Box flexShrink="0" ml={4}>
                  <StepTitle fontSize="md" fontWeight="semibold">{step.title}</StepTitle>
                  <StepDescription fontSize="sm" color="gray.600">{step.description}</StepDescription>
                </Box>
                
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Box>
        
        {/* Mobile/Tablet view - Enhanced vertical stepper */}
        <Box display={{ base: 'block', lg: 'none' }}>
          <VStack spacing={4} align="stretch">
            {steps.map((step, index) => (
              <Flex key={index} align="center" gap={4}>
                <Flex
                  w={{ base: "48px", md: "56px" }}
                  h={{ base: "48px", md: "56px" }}
                  borderRadius="xl"
                  bg={index <= activeStep ? `${stepColorSchemes[Math.min(activeStep, stepColorSchemes.length - 1)]}.100` : 'gray.100'}
                  color={index <= activeStep ? `${stepColorSchemes[Math.min(activeStep, stepColorSchemes.length - 1)]}.600` : 'gray.400'}
                  justify="center"
                  align="center"
                  fontWeight="bold"
                  fontSize={{ base: "lg", md: "xl" }}
                  border="3px solid"
                  borderColor={index <= activeStep ? `${stepColorSchemes[Math.min(activeStep, stepColorSchemes.length - 1)]}.500` : 'gray.200'}
                  boxShadow={index <= activeStep ? "lg" : "sm"}
                  flexShrink={0}
                  transition="all 0.2s ease"
                >
                  {index < activeStep ? <Icon as={FiCheck} /> : <Icon as={step.icon} />}
                </Flex>
                <Box flex="1" minW="0">
                  <Text fontWeight="semibold" fontSize={{ base: "md", md: "lg" }} mb={1}>{step.title}</Text>
                  <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" lineHeight="short">{step.description}</Text>
                </Box>
              </Flex>
            ))}
          </VStack>
        </Box>
      </Box>

      {/* Enhanced Agreement cards section */}
      <CardBody p={{ base: 5, md: 8 }}>
        {lender.agreementsCount > 0 ? (
          <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={{ base: 4, md: 6 }}>
            {lender.agreements.map((agreement) => (
              <AgreementCard
                key={agreement.id}
                id={agreement.id}
                status={agreement.status}
                carRegistration={agreement.carRegistration}
                createdAt={agreement.startDate}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Center w="100%" p={{ base: 6, md: 8 }} borderRadius="xl" bg={useColorModeValue('gray.50', 'gray.700')}>
            <VStack spacing={4}>
              <Icon as={FiFileText} w={12} h={12} color="gray.400" />
              <Text color="gray.500" fontSize={{ base: "md", md: "lg" }} textAlign="center">
                No agreements added yet
              </Text>
              <Text color="gray.400" fontSize={{ base: "sm", md: "md" }} textAlign="center">
                Start by adding your first agreement to proceed with the claim
              </Text>
            </VStack>
          </Center>
        )}

        {/* Enhanced Add Agreement button */}
        <Flex justify="center" mt={{ base: 6, md: 8 }}>
          <Button
            variant="outline"
            borderStyle="dashed"
            borderWidth="2px"
            leftIcon={<FiPlus />}
            colorScheme="blue"
            borderColor="blue.300"
            _hover={{ 
              bg: 'blue.50', 
              borderColor: 'blue.400',
              transform: 'translateY(-1px)',
              boxShadow: 'md'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onAddAgreement(lender.id);
            }}
            size={{ base: "md", md: "lg" }}
            fontSize={{ base: "md", md: "lg" }}
            px={{ base: 6, md: 8 }}
            py={{ base: 6, md: 7 }}
            borderRadius="xl"
            transition="all 0.2s ease"
          >
            Add Agreement
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

// Enhanced Loading Component
const DashboardSkeleton = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <VStack spacing={8} align="stretch">
      {/* Header skeleton */}
      <Card bg={cardBg} p={6} borderRadius="xl">
        <Flex justify="space-between" align="center">
          <VStack align="flex-start" spacing={2}>
            <Skeleton height="32px" width="200px" />
            <Skeleton height="20px" width="300px" />
          </VStack>
          <HStack spacing={4}>
            <Skeleton height="40px" width="120px" borderRadius="md" />
            <Skeleton height="40px" width="120px" borderRadius="md" />
          </HStack>
        </Flex>
      </Card>
      
      {/* Stats skeleton */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} bg={cardBg} p={6} borderRadius="xl">
            <VStack spacing={3} align="stretch">
              <Skeleton height="60px" />
              <Skeleton height="20px" />
              <Skeleton height="16px" width="60%" />
            </VStack>
          </Card>
        ))}
      </SimpleGrid>
      
      {/* Lender sections skeleton */}
      {[1, 2].map((i) => (
        <Card key={i} bg={cardBg} borderRadius="2xl" overflow="hidden">
          <Box p={6}>
            <Flex justify="space-between" align="center" mb={6}>
              <HStack spacing={3}>
                <Skeleton w={12} h={12} borderRadius="full" />
                <VStack align="flex-start" spacing={2}>
                  <Skeleton height="24px" width="150px" />
                  <Skeleton height="16px" width="100px" />
                </VStack>
              </HStack>
              <Skeleton height="40px" width="120px" borderRadius="md" />
            </Flex>
            <SkeletonText noOfLines={3} spacing={4} />
          </Box>
        </Card>
      ))}
    </VStack>
  );
};

// Main Dashboard component
const Dashboard = () => {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [lenders, setLenders] = useState<DashboardLender[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [claims, setClaims] = useState<LenderWithClaims[]>([]);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLenders, setFilteredLenders] = useState<DashboardLender[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
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
  const searchBgColor = useColorModeValue('white', 'gray.700');
  const dropdownBg = useColorModeValue('white', 'gray.800');
  const dropdownBorder = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

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
        
        // Check if any agreement has a response status
        const hasLenderResponse = lenderData.claims.some(claim => 
          CLAIM_RESPONSE_STATUSES.includes(claim.agreement.status)
        );
        
        return {
          id: lenderData.lender.id,
          name: lenderData.lender.name,
          status: hasLenderResponse ? 'Lender Responded' : (hasSubmittedClaim ? 'Claim Submitted' : 'Document Requested'),
          agreementsCount: lenderData.claims.length,
          prefix: lenderData.lender.name.substring(0, 2).toUpperCase() + '00',
          claimSubmitted: hasSubmittedClaim,
          lenderResponded: hasLenderResponse,
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
        lenderId: selectedLenderId,
        templateType,
        customText,
        agreementIds: selectedAgreements || [],
        mail
      });

      if (!response.success) {
        throw new Error(response.message || 'Failed to submit claim');
      }
      
      if (selectedAgreements && selectedAgreements.length > 0) {
        const updatedLenders = lenders.map(lender => {
          if (lender.id === selectedLenderId) {
            // Update the status of submitted agreements
            const updatedAgreements = lender.agreements.map(agreement => {
              // Check if this agreement's ID is in the selectedAgreements array
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

            return {
              ...lender,
              status: 'Claim Submitted',
              claimType: templateType,
              claimText: customText || (templateType === 'dca' ? 'DCA Claim' : 'DCA + Hidden Commissions Claim'),
              claimDate: actionTimestamp,
              submittedAgreements: selectedAgreements,
              agreements: updatedAgreements
            };
          }
          return lender;
        });
        
        setLenders(updatedLenders);
      }
      
      return true;
    } catch (error) {
      console.error('Error submitting claim:', error);
      throw error;
    }
  };

  // Add a function to navigate to mailbox
  const handleNavigateToMailbox = () => {
    navigate('/dashboard/mailbox');
  };

  // Search functionality
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredLenders(lenders);
      return;
    }

    setIsSearching(true);
    try {
      // Filter lenders based on search query
      const filtered = lenders.filter(lender => {
        const lenderName = lender.name.toLowerCase();
        const searchTerm = query.toLowerCase();
        
        // Search in lender name
        const matchesLender = lenderName.includes(searchTerm);
        
        // Search in agreement numbers or car registrations
        const matchesAgreement = lender.agreements.some(agreement => 
          agreement.id.toLowerCase().includes(searchTerm) ||
          agreement.carRegistration.toLowerCase().includes(searchTerm)
        );
        
        return matchesLender || matchesAgreement;
      });

      setFilteredLenders(filtered);
    } catch (error) {
      console.error('Search error:', error);
      setFilteredLenders(lenders);
    } finally {
      setIsSearching(false);
    }
  };

  // Initialize filteredLenders with all lenders
  useEffect(() => {
    setFilteredLenders(lenders);
  }, [lenders]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle search result click
  const handleResultClick = (result: any) => {
    if (result.type === 'lender') {
      navigate(`/dashboard/lenders/${result.id}`);
      setSearchQuery('');
      searchInputRef.current?.blur();
    }
  };

  // Handle escape key to close search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchQuery('');
        searchInputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = searchInputRef.current?.parentElement?.parentElement;
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setSearchQuery('');
      }
    };

    if (isSearching) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSearching]);

  return (
    <Box bg={bgColor} minH="100vh" py={{ base: 6, md: 10 }}>
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            {/* Enhanced Header */}
            <Card
              mb={{ base: 8, md: 10 }}
              bg={cardBg}
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="xl"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Box
                bgGradient="linear(135deg, blue.500, purple.600)"
                px={{ base: 6, md: 10 }}
                py={{ base: 8, md: 12 }}
                color="white"
                position="relative"
                overflow="hidden"
              >
                <Box position="relative" zIndex={1}>
                  <Flex
                    justify="space-between"
                    align={{ base: "flex-start", md: "center" }}
                    direction={{ base: "column", md: "row" }}
                    gap={{ base: 6, md: 0 }}
                  >
                    <VStack align="flex-start" spacing={3}>
                      <Heading size={{ base: "lg", md: "xl" }} fontWeight="bold">
                        Welcome back, {user?.firstName || 'User'}! 👋
                      </Heading>
                      <Text fontSize={{ base: "md", md: "lg" }} opacity={0.9}>
                        Manage your lenders, track claims, and monitor your progress
                      </Text>
                    </VStack>
                    <HStack spacing={{ base: 3, md: 4 }} flexWrap="wrap">
                      <Button
                        leftIcon={<Icon as={FiMail} />}
                        colorScheme="whiteAlpha"
                        variant="outline"
                        onClick={handleNavigateToMailbox}
                        size={{ base: "md", md: "lg" }}
                        borderColor="whiteAlpha.300"
                        _hover={{ bg: 'whiteAlpha.200', borderColor: 'whiteAlpha.400' }}
                      >
                        Messages
                      </Button>
                      <Button
                        leftIcon={<FiPlus />}
                        bg="white"
                        color="blue.600"
                        onClick={onAddLenderOpen}
                        size={{ base: "md", md: "lg" }}
                        _hover={{ bg: 'gray.100', transform: 'translateY(-1px)' }}
                        boxShadow="lg"
                      >
                        Add Lender
                      </Button>
                    </HStack>
                  </Flex>
                </Box>
                
                {/* Decorative elements */}
                <Box
                  position="absolute"
                  top="-50%"
                  right="-10%"
                  w="300px"
                  h="300px"
                  borderRadius="full"
                  bg="whiteAlpha.100"
                  filter="blur(100px)"
                />
              </Box>
            </Card>

            {/* Statistics Cards */}
            {/* <StatisticsCards statistics={statistics} isLoading={false} /> */}

            {/* My Lenders section */}
            <Box mb={10}>
              <Flex
                justify="space-between"
                align="center"
                mb={{ base: 4, md: 6 }}
                px={2}
              >
                <VStack align="flex-start" spacing={2}>
                  <Heading as="h2" size={{ base: "lg", md: "xl" }} fontWeight="bold">
                    My Lenders
                  </Heading>
                  <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
                    Track and manage all your lender relationships
                  </Text>
                </VStack>
              </Flex>
              
              {/* Search Bar - Added here as requested */}
              <Box 
                mb={{ base: 6, md: 8 }} 
                w="full" 
                position="relative"
                maxW="100%"
              >
                <Card
                  bg={cardBg}
                  borderRadius="xl"
                  boxShadow="sm"
                  p={{ base: 2, md: 3 }}
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <InputGroup size={{ base: "md", md: "lg" }}>
                    <InputLeftElement pointerEvents="none" h="full">
                      <Icon as={FiSearch} color={useColorModeValue('gray.400', 'gray.500')} boxSize={5} />
                    </InputLeftElement>
                    <Input 
                      ref={searchInputRef}
                      placeholder="Search lenders, agreements, or car registrations..." 
                      bg={searchBgColor} 
                      border="none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      _placeholder={{ color: 'gray.400' }}
                      _hover={{ bg: useColorModeValue('gray.50', 'gray.600') }}
                      _focus={{ 
                        bg: useColorModeValue('white', 'gray.700'),
                        boxShadow: 'none',
                      }}
                      transition="all 0.2s"
                      borderRadius="lg"
                      fontSize={{ base: "md", md: "lg" }}
                      h={{ base: "48px", md: "56px" }}
                      pl={{ base: 10, md: 12 }}
                    />
                    {searchQuery.trim() && (
                      <Box position="absolute" right={3} top="50%" transform="translateY(-50%)" zIndex={2}>
                        <Button
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          onClick={() => setSearchQuery('')}
                          p={1}
                          minW={0}
                          h={8}
                        >
                          <Icon as={FiX} boxSize={4} />
                        </Button>
                      </Box>
                    )}
                  </InputGroup>
                </Card>
                {searchQuery.trim() && filteredLenders.length > 0 && (
                  <Flex mt={2} align="center">
                    <Text fontSize="sm" color="gray.600">
                      Found {filteredLenders.length} {filteredLenders.length === 1 ? 'result' : 'results'}
                    </Text>
                    <Spacer />
                    <Button
                      size="xs"
                      variant="link"
                      colorScheme="blue"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear
                    </Button>
                  </Flex>
                )}
              </Box>

              {lenders.length === 0 ? (
                <Card 
                  p={{ base: 8, md: 12 }} 
                  textAlign="center" 
                  borderWidth="2px" 
                  borderStyle="dashed"
                  borderColor={borderColor} 
                  borderRadius="2xl"
                  bg={cardBg}
                >
                  <VStack spacing={6}>
                    <Box
                      w={{ base: "80px", md: "100px" }}
                      h={{ base: "80px", md: "100px" }}
                      borderRadius="full"
                      bg="blue.50"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FiUsers} w={{ base: 8, md: 10 }} h={{ base: 8, md: 10 }} color="blue.500" />
                    </Box>
                    <VStack spacing={3}>
                      <Heading size={{ base: "md", md: "lg" }} color="gray.800">No lenders added yet</Heading>
                      <Text color="gray.600" fontSize={{ base: "md", md: "lg" }} maxW="md" lineHeight="relaxed">
                        Start your journey by adding your first lender. We'll help you through every step of the claims process.
                      </Text>
                    </VStack>
                    <Button 
                      colorScheme="blue" 
                      leftIcon={<FiPlus />} 
                      onClick={onAddLenderOpen}
                      size={{ base: "lg", md: "xl" }}
                      px={{ base: 8, md: 12 }}
                      py={{ base: 6, md: 8 }}
                      borderRadius="xl"
                      boxShadow="lg"
                      _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
                    >
                      Add Your First Lender
                    </Button>
                  </VStack>
                </Card>
              ) : filteredLenders.length === 0 && searchQuery.trim() ? (
                <Card 
                  p={{ base: 8, md: 12 }} 
                  textAlign="center" 
                  borderWidth="2px" 
                  borderStyle="dashed"
                  borderColor={borderColor} 
                  borderRadius="2xl"
                  bg={cardBg}
                >
                  <VStack spacing={6}>
                    <Box
                      w={{ base: "80px", md: "100px" }}
                      h={{ base: "80px", md: "100px" }}
                      borderRadius="full"
                      bg="blue.50"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FiFileText} w={{ base: 8, md: 10 }} h={{ base: 8, md: 10 }} color="blue.500" />
                    </Box>
                    <VStack spacing={3}>
                      <Heading size={{ base: "md", md: "lg" }} color="gray.800">No results found</Heading>
                      <Text color="gray.600" fontSize={{ base: "md", md: "lg" }} maxW="md" lineHeight="relaxed">
                        No lenders match your search for "{searchQuery}". Try a different search term or clear your search.
                      </Text>
                    </VStack>
                    <Button 
                      variant="outline"
                      colorScheme="blue" 
                      onClick={() => setSearchQuery('')}
                      size={{ base: "md", md: "lg" }}
                      px={{ base: 6, md: 8 }}
                      py={{ base: 4, md: 6 }}
                      borderRadius="xl"
                    >
                      Clear Search
                    </Button>
                  </VStack>
                </Card>
              ) : (
                <VStack spacing={{ base: 6, md: 8 }} align="stretch">
                  {filteredLenders.map(lender => (
                    <LenderSection
                      key={lender.id}
                      lender={lender}
                      onAddAgreement={handleAddAgreement}
                      onViewDetails={handleViewLenderDetails}
                      onSubmitClaim={handleSubmitClaim}
                    />
                  ))}
                </VStack>
              )}
            </Box>
          </>
        )}
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
          agreements={lenders.find(l => l.id === selectedLenderId)?.agreements.filter(agreement => agreement.status !== 'Submitted') || []}
          onSubmitClaim={async (templateType: string, customText?: string, selectedAgreements?: string[], mail?: { subject: string, body: string }) => {
            await handleProcessClaimSubmission(templateType, customText, selectedAgreements, mail);
          }}
        />
      )}
    </Box>
  );
};

export default Dashboard;