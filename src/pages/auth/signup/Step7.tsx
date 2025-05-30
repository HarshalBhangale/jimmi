/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Progress,
  useColorModeValue,
  Stack,
  Flex,
  Alert,
  AlertIcon,
  useToast,
  Spinner,
  List,
  ListItem,
  ListIcon,
  Badge,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  Icon,
  Grid,
  Circle,
  useBreakpointValue,
} from '@chakra-ui/react';
import { 
  FiCheck, 
  FiCreditCard, 
  FiStar, 
  FiThumbsUp, 
  FiAward, 
  FiShield, 
  FiX,
  FiDollarSign
} from 'react-icons/fi';
import { createPaymentIntent } from '@api/services/payments';
import { motion } from 'framer-motion';
import { keyframes } from '@emotion/react';

const MotionBox = motion(Box);

// Keyframes for button animation
const pulseAnimation = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.7); }
  70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(66, 153, 225, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(66, 153, 225, 0); }
`;

const Step7 = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [numberOfAgreements, setNumberOfAgreements] = useState(1);
  const [selectedLenders, setSelectedLenders] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  // Get number of agreements from localStorage if available
  useEffect(() => {
    const storedData = localStorage.getItem('numberOfAgreements');
    if (storedData) {
      setNumberOfAgreements(parseInt(storedData));
    }
    
    // Get selected lenders
    const requestData = localStorage.getItem('documentRequestData');
    if (requestData) {
      try {
        const parsedData = JSON.parse(requestData);
        if (parsedData.selectedLenders && Array.isArray(parsedData.selectedLenders)) {
          setSelectedLenders(parsedData.selectedLenders);
        }
      } catch (e) {
        console.error('Error parsing lender data:', e);
      }
    }
  }, []);

  // Fixed costs for calculator
  const avgClaimValue = 4500;
  const solicitorPercentage = 0.35; // 35% of claim value
  const ourFee = 39.99;

  // Calculate potential values
  const lenderCount = selectedLenders.length || 1;
  const potentialRefund = lenderCount * avgClaimValue;
  const solicitorCost = potentialRefund * solicitorPercentage;
  const savings = solicitorCost - ourFee;
  const percentageSavings = Math.round((savings / solicitorCost) * 100);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const paymentIntent = await createPaymentIntent(
        {
          amount: 3999,
          type: 'one_time',
        }
      );
      window.location.href = paymentIntent.url;
    } catch (error) {
      console.error(error);
      setError('An error occurred while processing your payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  // Colors
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const highlightColor = useColorModeValue('blue.500', 'blue.300');
  const successBg = useColorModeValue('green.100', 'green.900');
  const successColor = useColorModeValue('green.600', 'green.200');
  const prosColor = useColorModeValue('green.500', 'green.300');
  const consColor = useColorModeValue('red.500', 'red.300');
  
  // Responsive sizes
  const headingSize = useBreakpointValue({ base: "lg", md: "xl" });
  const statSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Show payment confirmation if payment was successful
  if (isPaymentSuccess) {
    return (
      <Container maxW="container.md" py={8}>
        <VStack spacing={8} align="center" justifyContent="center" py={12}>
          <Box
            bg="green.100"
            borderRadius="full"
            p={3}
            boxSize="80px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box as={FiCheck} color="green.500" boxSize="40px" />
          </Box>
          
          <Heading textAlign="center" size="xl">
            Payment Successful
          </Heading>
          
          <Text fontSize="lg" textAlign="center" color={labelColor}>
            Your document requests have been submitted to the selected lenders.
            You'll be redirected to the confirmation page shortly.
          </Text>
          
          <Spinner color="blue.500" size="lg" />
        </VStack>
      </Container>
    );
  }

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.800')} minH="100vh">
      <Container maxW="1100px" py={{ base: 6, md: 8 }}>
        <Stack spacing={{ base: 5, md: 8 }}>
          {/* Progress indicator */}
          <Box>
            <HStack justify="space-between" mb={1}>
              <Text fontSize="sm" fontWeight="medium">
                Step 7 of 7
              </Text>
              <Text fontSize="sm" color={labelColor}>
                Payment
              </Text>
            </HStack>
            <Progress 
              value={100} 
              size="sm" 
              colorScheme="blue" 
              borderRadius="full" 
              bg={useColorModeValue('gray.100', 'gray.700')} 
            />
          </Box>

          {/* Hero section with progress info */}
          <Box textAlign="center" mb={{ base: 3, md: 5 }}>
            <Heading 
              as="h1" 
              size={{ base: "lg", md: "xl" }} 
              mb={3}
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              You're Almost There!
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} fontWeight="medium" color={labelColor}>
              Complete your purchase to start your claim journey
            </Text>
          </Box>

          {/* Progress Banner - redesigned for better visual flow */}
          <MotionBox
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            bg={useColorModeValue('blue.50', 'blue.900')}
            borderRadius="xl"
            p={{ base: 4, md: 6 }}
            borderWidth="1px"
            borderColor={useColorModeValue('blue.100', 'blue.700')}
            position="relative"
            overflow="hidden"
            mb={{ base: 4, md: 6 }}
            boxShadow="md"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '5px',
              bgGradient: 'linear(to-r, blue.400, purple.500)',
            }}
          >
            <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={{ base: 3, md: 5 }}>
              <MotionBox
                whileHover={{ scale: 1.03 }}
                p={4}
                bg={useColorModeValue('white', 'gray.800')}
                borderRadius="md"
                boxShadow="sm"
                textAlign="center"
                position="relative"
                transition="all 0.2s"
              >
                <Circle 
                  size="24px" 
                  bg="green.400" 
                  color="white" 
                  position="absolute" 
                  top="-2" 
                  right="-2" 
                  fontSize="xs"
                  fontWeight="bold"
                >
                  ✓
                </Circle>
                <Text fontWeight="bold" mb={2} color="gray.700">01</Text>
                <Text fontSize="sm" fontWeight="medium">Sign up</Text>
                <Text fontSize="xs" mt={1} color={labelColor}>Completed</Text>
              </MotionBox>
              
              <MotionBox
                whileHover={{ scale: 1.03 }}
                p={4}
                bg={useColorModeValue('white', 'gray.800')}
                borderRadius="md"
                boxShadow="sm"
                textAlign="center"
                position="relative"
                transition="all 0.2s"
              >
                <Circle 
                  size="24px" 
                  bg="green.400" 
                  color="white" 
                  position="absolute" 
                  top="-2" 
                  right="-2" 
                  fontSize="xs"
                  fontWeight="bold"
                >
                  ✓
                </Circle>
                <Text fontWeight="bold" mb={2} color="gray.700">02</Text>
                <Text fontSize="sm" fontWeight="medium">Request information</Text>
                <Text fontSize="xs" mt={1} color={labelColor}>Completed</Text>
              </MotionBox>
              
              <MotionBox
                whileHover={{ scale: 1.03 }}
                p={4}
                bg={useColorModeValue('blue.100', 'blue.800')}
                borderRadius="md"
                boxShadow="md"
                textAlign="center"
                position="relative"
                borderWidth="1px"
                borderColor={useColorModeValue('blue.300', 'blue.600')}
                transition="all 0.2s"
              >
                <Circle 
                  size="24px" 
                  bg="blue.500" 
                  color="white" 
                  position="absolute" 
                  top="-2" 
                  right="-2" 
                  fontSize="xs"
                  fontWeight="bold"
                >
                  03
                </Circle>
                <Text fontWeight="bold" mb={2} color={useColorModeValue('blue.700', 'blue.200')}>03</Text>
                <Text fontSize="sm" fontWeight="medium" color={useColorModeValue('blue.700', 'blue.200')}>Submit your claim</Text>
                <Text fontSize="xs" mt={1} color={useColorModeValue('blue.700', 'blue.200')} fontWeight="medium">You are here</Text>
              </MotionBox>
              
              <MotionBox
                whileHover={{ scale: 1.03 }}
                p={4}
                bg={useColorModeValue('gray.100', 'gray.700')}
                borderRadius="md"
                boxShadow="sm"
                textAlign="center"
                opacity={0.8}
                position="relative"
                transition="all 0.2s"
              >
                <Circle 
                  size="24px" 
                  bg="gray.400" 
                  color="white" 
                  position="absolute" 
                  top="-2" 
                  right="-2" 
                  fontSize="xs"
                  fontWeight="bold"
                >
                  04
                </Circle>
                <Text fontWeight="bold" mb={2} color="gray.500">04</Text>
                <Text fontSize="sm" fontWeight="medium" color="gray.500">Get your refund</Text>
                <Text fontSize="xs" mt={1} color="gray.500">Coming soon</Text>
              </MotionBox>
            </Grid>
            
            <Box mt={5} textAlign="center">
              <Text fontWeight="medium" color={useColorModeValue('blue.700', 'blue.300')}>
                If your complaints are rejected, we'll provide all the tools you need to dispute without legal fees!
              </Text>
            </Box>
          </MotionBox>

          {/* Main content - two column layout with improved alignment */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, md: 8 }} alignItems="start">
            {/* Left column - Payment details */}
            <Box>
              {/* Payment Option - improved visual appeal */}
              <Box
                bg={cardBg}
                borderRadius="xl"
                boxShadow="xl"
                p={{ base: 5, md: 6 }}
                borderWidth="1px"
                borderColor={borderColor}
                position="relative"
                overflow="hidden"
              >
                {/* Discount ribbon */}
                <Box 
                  position="absolute" 
                  top="0" 
                  right="0" 
                  bg="red.500" 
                  color="white" 
                  py={1.5} 
                  px={8} 
                  fontSize="lg" 
                  fontWeight="bold" 
                  transform="rotate(45deg) translateX(30%) translateY(-60%)" 
                  width="180px" 
                  textAlign="center"
                  boxShadow="sm"
                  zIndex={1}
                >
                  50% OFF
                </Box>
                
                <VStack spacing={6} align="stretch">
                  {/* Plan header with improved layout to match image */}
                  <Box 
                    bg={useColorModeValue('blue.50', 'blue.900')}
                    p={{ base: 4, md: 6 }}
                    borderRadius="xl"
                    mb={4}
                    boxShadow="md"
                  >
                    <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "start", md: "center" }} wrap="wrap">
                      <Box mb={{ base: 4, md: 0 }}>
                        <Heading as="h3" size="2xl" color={useColorModeValue('gray.800', 'white')} fontWeight="extrabold">
                          Premium Plan
                        </Heading>
                        <HStack spacing={2} mt={3}>
                          <Badge colorScheme="green" py={1.5} px={3} borderRadius="full" bg="green.100" color="green.800" fontWeight="bold">DISCOUNT APPLIED</Badge>
                          <Badge colorScheme="blue" py={1.5} px={3} borderRadius="full" fontWeight="bold">MOST POPULAR</Badge>
                        </HStack>
                      </Box>
                      <Box textAlign={{ base: "left", md: "right" }} mt={{ base: 3, md: 0 }}>
                        <Text as="s" fontSize="lg" color="gray.500" mb={1} mt= {{base: "0", md: "4"}}display="block" textAlign={{ base: "left", md: "left" }}>£79.99</Text>
                        <Flex align="baseline" justifyContent={{ base: "flex-start", md: "flex-end" }}>
                          <Text fontWeight="extrabold" fontSize={{ base: "5xl", md: "6xl" }} color="blue.500" lineHeight="1">£39.99</Text>
                          <Text fontSize={{ base: "sm", md: "md" }} ml={2} color={labelColor} alignSelf="flex-end">one-time</Text>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                  
                  {/* Features list with improved visual styling */}
                  <Box>
                    <Heading size="lg" mb={4} color={labelColor} fontWeight="bold">Everything you need to succeed:</Heading>
                    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                      {[
                        'Full access to all services',
                        'Priority document processing',
                        'No success fee (unlike solicitors)',
                        'Unlimited lender communications',
                        'Dispute tools for rejected claims',
                        'No hidden legal fees',
                        'Expert support team access',
                        'Secure document storage',
                      ].map((feature, index) => (
                        <HStack key={index} align="center" bg={useColorModeValue('white', 'gray.700')} p={3} borderRadius="lg" boxShadow="sm" transition="all 0.3s" _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}>
                          <Circle size="32px" bg="green.100" color="green.500">
                            <Icon as={FiCheck} boxSize={4} />
                          </Circle>
                          <Text fontSize={{ base: "sm", md: "md" }} fontWeight="medium">{feature}</Text>
                        </HStack>
                      ))}
                    </SimpleGrid>
                  </Box>
                  
                  {/* What happens next section */}
                  <Box
                    bg={useColorModeValue('blue.50', 'blue.900')}
                    borderRadius="lg"
                    p={4}
                    borderLeft="4px solid"
                    borderColor={useColorModeValue('blue.500', 'blue.400')}
                  >
                    <Heading size="sm" mb={2} color={useColorModeValue('blue.700', 'blue.300')}>
                      What happens after payment?
                    </Heading>
                    <Text fontSize="sm" color={labelColor}>
                      We'll immediately send your document requests to {lenderCount} {lenderCount === 1 ? 'lender' : 'lenders'}.
                      You'll receive email confirmations as lenders respond, and our system will
                      guide you through each step of the process.
                    </Text>
                  </Box>
                  
                  {/* Error display */}
                  {error && (
                    <Alert status="error" borderRadius="md" variant="left-accent">
                      <AlertIcon />
                      {error}
                    </Alert>
                  )}
                  
                  {/* Payment button with improved styling and animation */}
                  <Button
                    size="lg"
                    colorScheme="blue"
                    rightIcon={<FiCreditCard />}
                    onClick={handlePayment}
                    isLoading={isLoading}
                    loadingText="Processing payment..."
                    bgGradient="linear(to-r, blue.400, purple.500)"
                    w="full"
                    py={7}
                    fontSize="lg"
                    fontWeight="bold"
                    borderRadius="lg"
                    boxShadow="lg"
                    animation={`${pulseAnimation} 2s infinite`}
                    _hover={{
                      bgGradient: "linear(to-r, blue.500, purple.600)",
                      transform: "translateY(-2px)",
                      boxShadow: "xl",
                    }}
                    _active={{
                      bgGradient: "linear(to-r, blue.600, purple.700)",
                      transform: "translateY(0)",
                    }}
                    transition="all 0.2s"
                  >
                    Get Started Now
                  </Button>
                  
                  {/* Trust indicators */}
                  <Flex justify="center" wrap="wrap" gap={3}>
                    <HStack spacing={1} p={2}>
                      <Icon as={FiShield} color="green.500" />
                      <Text fontSize="xs" color={labelColor}>Secure payment</Text>
                    </HStack>
                    <HStack spacing={1} p={2}>
                      <Icon as={FiCreditCard} color="green.500" />
                      <Text fontSize="xs" color={labelColor}>SSL encrypted</Text>
                    </HStack>
                    <HStack spacing={1} p={2}>
                      <Icon as={FiAward} color="green.500" />
                      <Text fontSize="xs" color={labelColor}>Satisfaction guaranteed</Text>
                    </HStack>
                  </Flex>
                </VStack>
              </Box>
              <Box
                bg={cardBg}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={borderColor}
                overflow="hidden"
                boxShadow="lg"
                mt={6}
              >
              </Box>
            </Box>
            
            {/* Right column - Benefits and Savings with improved visual hierarchy */}
            <VStack spacing={6} align="stretch">
              {/* Savings calculator - redesigned for better visual impact */}
              <Box
                bg={cardBg}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={borderColor}
                overflow="hidden"
                boxShadow="lg"
              >
                <Box 
                  bgGradient="linear(to-r, purple.400, purple.600)" 
                  p={4} 
                  borderBottomWidth="1px" 
                  borderColor={borderColor}
                >
                  <Heading as="h3" size="md" color="white">
                    Your Savings Calculator
                  </Heading>
                  <Text fontSize="sm" color="white" opacity={0.9} mt={1}>
                    Based on {lenderCount} {lenderCount === 1 ? 'lender' : 'lenders'} selected
                  </Text>
                </Box>
                
                <Box p={5}>
                  <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} mb={5}>
                    <Stat bg={useColorModeValue('purple.50', 'purple.900')} p={3} borderRadius="lg">
                      <StatLabel fontWeight="medium" color={useColorModeValue('purple.700', 'purple.300')}>
                        Potential Refund
                      </StatLabel>
                      <StatNumber fontSize={statSize} color={useColorModeValue('purple.600', 'purple.300')}>
                        £{potentialRefund.toLocaleString()}
                      </StatNumber>
                      <StatHelpText>£{avgClaimValue.toLocaleString()} per lender × {lenderCount}</StatHelpText>
                    </Stat>
                    
                    <Stat bg={useColorModeValue('green.50', 'green.900')} p={3} borderRadius="lg">
                      <StatLabel fontWeight="medium" color={useColorModeValue('green.700', 'green.300')}>
                        Your Savings
                      </StatLabel>
                      <StatNumber fontSize={statSize} color={useColorModeValue('green.600', 'green.300')}>
                        £{savings.toLocaleString()}
                      </StatNumber>
                      <StatHelpText>
                        <Badge colorScheme="green" fontSize="sm" px={2} py={0.5} borderRadius="md">
                          {percentageSavings}% vs. solicitors
                        </Badge>
                      </StatHelpText>
                    </Stat>
                  </SimpleGrid>
                  
                  <Divider mb={5} />
                  
                  {/* Comparison with improved visual styling */}
                  <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                    <Box 
                      bg={useColorModeValue('red.50', 'red.900')} 
                      p={4} 
                      borderRadius="lg" 
                      borderWidth="1px" 
                      borderColor={useColorModeValue('red.100', 'red.700')}
                      position="relative"
                      _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '5px',
                        bg: useColorModeValue('red.400', 'red.500'),
                        borderTopLeftRadius: 'lg',
                        borderTopRightRadius: 'lg',
                      }}
                    >
                      <VStack align="flex-start" spacing={2} pt={1}>
                        <HStack>
                          <Icon as={FiX} color={useColorModeValue('red.500', 'red.300')} boxSize={4} />
                          <Text fontWeight="bold" color={useColorModeValue('red.700', 'red.300')}>
                            With Solicitors
                          </Text>
                        </HStack>
                        <Heading size="lg" color={useColorModeValue('red.700', 'red.300')}>
                          £{solicitorCost.toLocaleString()}
                        </Heading>
                        <Text fontSize="sm" color={labelColor}>35% of your potential refund</Text>
                      </VStack>
                    </Box>
                    
                    <Box 
                      bg={useColorModeValue('green.50', 'green.900')} 
                      p={4} 
                      borderRadius="lg" 
                      borderWidth="1px" 
                      borderColor={useColorModeValue('green.100', 'green.700')}
                      position="relative"
                      _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '5px',
                        bg: useColorModeValue('green.400', 'green.500'),
                        borderTopLeftRadius: 'lg',
                        borderTopRightRadius: 'lg',
                      }}
                    >
                      <VStack align="flex-start" spacing={2} pt={1}>
                        <HStack>
                          <Icon as={FiCheck} color={useColorModeValue('green.500', 'green.300')} boxSize={4} />
                          <Text fontWeight="bold" color={useColorModeValue('green.700', 'green.300')}>
                            With Our Service
                          </Text>
                        </HStack>
                        <Heading size="lg" color={useColorModeValue('green.700', 'green.300')}>
                          £{ourFee.toFixed(2)}
                        </Heading>
                        <Text fontSize="sm" color={labelColor}>Fixed one-time fee</Text>
                      </VStack>
                    </Box>
                  </SimpleGrid>
                </Box>
              </Box>
              
              {/* Additional content for right column could go here */}
              <Box
                bg={cardBg}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={borderColor}
                overflow="hidden"
                boxShadow="md"
                p={5}
              >
                <Heading size="md" mb={4}>Customer Testimonials</Heading>
                <VStack spacing={4} align="stretch">
                  <Box bg={useColorModeValue('gray.50', 'gray.700')} p={4} borderRadius="md">
                    <Text fontSize="sm" fontStyle="italic">
                      "I saved over £3,000 using this service instead of going through a solicitor. The process was straightforward and support was excellent."
                    </Text>
                    <Text fontSize="sm" fontWeight="bold" mt={2}>— John D.</Text>
                  </Box>
                  <Box bg={useColorModeValue('gray.50', 'gray.700')} p={4} borderRadius="md">
                    <Text fontSize="sm" fontStyle="italic">
                      "Within weeks of submitting my claim, I received positive responses from all my lenders. Highly recommend!"
                    </Text>
                    <Text fontSize="sm" fontWeight="bold" mt={2}>— Sarah M.</Text>
                  </Box>
                </VStack>
              </Box>
            </VStack>
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Step7;