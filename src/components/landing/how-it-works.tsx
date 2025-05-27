// @ts-nocheck
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
  useColorModeValue,
  Icon,
  Badge,
  SimpleGrid,
  chakra,
  useBreakpointValue,
  Divider,
  Circle,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { 
  FiArrowRight, 
  FiUserPlus, 
  FiFileText, 
  FiMail, 
  FiInbox, 
  FiSearch, 
  FiBookOpen, 
  FiSend, 
  FiClock, 
  FiAlertTriangle, 
  FiDollarSign, 
  FiShare2 
} from 'react-icons/fi';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const HowItWorks = () => {
  const pulseAnimation = `${pulse} 3s ease-in-out infinite`;
  const bgGradient = useColorModeValue(
    'linear(to-b, blue.50, white)',
    'linear(to-b, gray.900, gray.800)'
  );
  
  const isMobile = useBreakpointValue({ base: true, md: false });
  const containerPadding = useBreakpointValue({ base: 4, md: 8, lg: 12 });
  const headingSize = useBreakpointValue({ base: "2xl", md: "4xl", lg: "5xl" });
  
  // Journey steps data
  const journeySteps = [
    {
      number: 1,
      icon: FiUserPlus,
      title: "Sign Up",
      description: "Create your account in seconds",
      details: [
        "Enter your phone number and verify with OTP",
        "Provide basic details like name and email",
        "Choose a plan: one-time £79.99",
        "Get your secure Buddy Mail email and portal",
        "Check if your lenders were involved in the scandal"
      ],
      color: "blue"
    },
    {
      number: 2,
      icon: FiSearch,
      title: "Investigate",
      description: "Find out what claims you might have",
      details: [
        "Select your lenders from our smart dropdown",
        "Check if they're part of the DCA/hidden commission scandal",
        "Submit SARs to get your finance information",
        "Track responses inside your dashboard"
      ],
      color: "purple"
    },
    {
      number: 3,
      icon: FiBookOpen,
      title: "Review & Learn",
      description: "Understand the documents you've received",
      details: [
        "Learn how to read your information and what terms mean",
        "Discover if your agreement involves hidden commissions",
        "Get clear guidance to move forward confidently"
      ],
      color: "cyan"
    },
    {
      number: 4,
      icon: FiSend,
      title: "Claim",
      description: "Build and submit your claims with ease",
      details: [
        "Add key agreement details when your lender replies",
        "Identify what commission model was used",
        "Pick a template, review, and send your claim",
        "Watch your dashboard update with every action"
      ],
      color: "teal"
    },
    {
      number: 5,
      icon: FiClock,
      title: "Await Response",
      description: "Track progress while the lender reviews",
      details: [
        "See exactly what was sent and when",
        "Expect to hear back in 28 days (or after FCA deadlines)",
        "Monitor real-time updates on your dashboard"
      ],
      color: "orange"
    },
    {
      number: 6,
      icon: FiAlertTriangle,
      title: "Dispute",
      description: "Handle pushbacks like a pro",
      details: [
        "Get tailored response templates for rejections",
        "Escalate your case to the Financial Ombudsman Service",
        "Keep your claim progressing without legal stress"
      ],
      color: "red"
    },
    {
      number: 7,
      icon: FiDollarSign,
      title: "Refund",
      description: "Get what's owed to you",
      details: [
        "Track your accepted claim through to payment",
        "Mark your refund as received when paid",
        "Keep 100% of your refund - no fees taken by us"
      ],
      color: "green"
    },
    {
      number: 8,
      icon: FiShare2,
      title: "Refer Friends & Earn",
      description: "Share the benefits of My Claim Buddy",
      details: [
        "Invite friends using your unique referral link",
        "Track how many friends sign up from your dashboard",
        "Earn rewards for every successful referral"
      ],
      color: "pink"
    }
  ];
  
  return (
    <Box 
      as="section" 
      py={{ base: 16, md: 24, lg: 32 }}
      id="how-it-works"
      bgGradient={bgGradient}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative elements */}
      <Box
        position="absolute"
        top="5%"
        right="5%"
        width={{ base: "200px", md: "300px" }}
        height={{ base: "200px", md: "300px" }}
        borderRadius="full"
        bgGradient="radial(blue.100, transparent 70%)"
        opacity={0.6}
        zIndex={0}
      />
      
      <Box
        position="absolute"
        bottom="5%"
        left="5%"
        width={{ base: "200px", md: "300px" }}
        height={{ base: "200px", md: "300px" }}
        borderRadius="full"
        bgGradient="radial(purple.100, transparent 70%)"
        opacity={0.6}
        zIndex={0}
      />
      
      <Container maxW="container.xl" position="relative" zIndex={1} px={containerPadding}>
        <VStack 
          spacing={{ base: 6, md: 8, lg: 12 }} 
          textAlign="center" 
          mb={{ base: 8, md: 12, lg: 16 }}
        >
          <Badge 
            colorScheme="purple" 
            fontSize={{ base: "sm", md: "md" }}
            px={4}
            py={1.5}
            borderRadius="full"
            textTransform="none"
            boxShadow="sm"
          >
            Get Started Today
          </Badge>
          
          <Heading 
            as="h2" 
            fontSize={headingSize}
            fontWeight="extrabold"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            letterSpacing="tight"
            lineHeight="1.2"
            px={4}
          >
            🏁 Ready When You Are
          </Heading>
          
          <Text 
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
            maxW="2xl"
            color={useColorModeValue('gray.600', 'gray.400')}
            px={4}
          >
            Let Buddy walk you through the process. <br/> Submit your claims today wit Buddy guiding you every step of the way
          </Text>
        </VStack>
        
        <Box maxW="1200px" mx="auto">
          <Heading 
            as="h3" 
            size={{ base: "md", md: "lg" }}
            mb={{ base: 8, md: 12 }}
            textAlign="center"
            fontWeight="bold"
          >
            📅 How It Works
          </Heading>
          
          {/* Journey Timeline - Desktop */}
          <Box display={{ base: 'none', lg: 'block' }} mb={{ base: 12, md: 16 }}>
            <Flex 
              position="relative" 
              flexDirection="column"
              alignItems="center"
            >
              {/* Center line */}
              <Box 
                position="absolute"
                width="4px"
                height="100%"
                bg="blue.100"
                left="50%"
                transform="translateX(-50%)"
                borderRadius="full"
                zIndex={1}
              />
              
              {journeySteps.map((step, index) => (
                <Flex 
                  key={index} 
                  width="100%" 
                  justifyContent={index % 2 === 0 ? "flex-start" : "flex-end"}
                  position="relative"
                  mb={index === journeySteps.length - 1 ? 0 : 12}
                  zIndex={2}
                >
                  {/* Step content */}
                  <Box 
                    width="45%" 
                    bg={useColorModeValue('white', 'gray.800')}
                    borderRadius="xl"
                    boxShadow="lg"
                    p={6}
                    borderTop="4px solid"
                    borderColor={`${step.color}.400`}
                    transition="all 0.3s ease"
                    _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
                  >
                    <Flex align="center" mb={4}>
                      <Circle
                        size={12}
                        bg={`${step.color}.100`}
                        color={`${step.color}.600`}
                        mr={4}
                      >
                        <Icon as={step.icon} boxSize={6} />
                      </Circle>
                      <Box>
                        <Flex align="baseline">
                          <Text 
                            fontSize="3xl"
                            fontWeight="bold" 
                            color={`${step.color}.600`}
                            lineHeight="1"
                            mr={2}
                          >
                            {step.number}
                          </Text>
                          <Text fontWeight="bold" fontSize="xl">{step.title}</Text>
                        </Flex>
                        <Text color={useColorModeValue('gray.600', 'gray.400')} fontWeight="medium">
                          {step.description}
                        </Text>
                      </Box>
                    </Flex>
                    <Box pl={16}>
                      {step.details.map((detail, i) => (
                        <Flex key={i} mb={2} align="center">
                          <Box 
                            w={1.5} 
                            h={1.5} 
                            borderRadius="full" 
                            bg={`${step.color}.400`} 
                            mr={3}
                          />
                          <Text fontSize="sm">{detail}</Text>
                        </Flex>
                      ))}
                    </Box>
                  </Box>
                  
                  {/* Center dot */}
                  <Circle
                    size={8}
                    bg={`${step.color}.400`}
                    color="white"
                    position="absolute"
                    left="50%"
                    transform="translateX(-50%)"
                    boxShadow="md"
                    border="3px solid white"
                    zIndex={3}
                  >
                    <Text fontWeight="bold">{step.number}</Text>
                  </Circle>
                </Flex>
              ))}
            </Flex>
          </Box>
          
          {/* Journey Cards - Mobile & Tablet */}
          <VStack 
            spacing={6} 
            display={{ base: 'flex', lg: 'none' }}
            mb={{ base: 12, md: 16 }}
          >
            {journeySteps.map((step, index) => (
              <Box 
                key={index}
                width="100%"
                bg={useColorModeValue('white', 'gray.800')}
                borderRadius="xl"
                boxShadow="lg"
                p={5}
                borderLeft="4px solid"
                borderColor={`${step.color}.400`}
                position="relative"
              >
                <Flex align="center" mb={4}>
                  <Circle
                    size={10}
                    bg={`${step.color}.100`}
                    color={`${step.color}.600`}
                    mr={4}
                  >
                    <Icon as={step.icon} boxSize={5} />
                  </Circle>
                  <Box>
                    <Flex align="baseline">
                      <Text 
                        fontSize="2xl"
                        fontWeight="bold" 
                        color={`${step.color}.600`}
                        lineHeight="1"
                        mr={2}
                      >
                        {step.number}
                      </Text>
                      <Text fontWeight="bold" fontSize="lg">{step.title}</Text>
                    </Flex>
                    <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
                      {step.description}
                    </Text>
                  </Box>
                </Flex>
                <Box pl={14}>
                  {step.details.map((detail, i) => (
                    <Flex key={i} mb={1.5} align="center">
                      <Box 
                        w={1} 
                        h={1} 
                        borderRadius="full" 
                        bg={`${step.color}.400`} 
                        mr={2}
                      />
                      <Text fontSize="xs">{detail}</Text>
                    </Flex>
                  ))}
                </Box>
              </Box>
            ))}
          </VStack>
          
          <Box 
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="2xl"
            boxShadow="xl"
            p={{ base: 6, md: 8 }}
            borderTop="4px solid"
            borderColor="blue.400"
            textAlign="center"
            maxW="3xl"
            mx="auto"
            as={chakra.div}
            animation={pulseAnimation}
            position="relative"
            overflow="hidden"
          >
            {/* Decorative gradient line */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              h="4px"
              bgGradient="linear(to-r, blue.400, purple.500, pink.400)"
            />
            
            <VStack spacing={6}>
              <Heading 
                size="md" 
                color={useColorModeValue('gray.700', 'gray.200')}
                fontWeight="bold"
              >
                Ready to Submit Your Claims with the help of Buddy ? 
              </Heading>
              
              <Text 
                color={useColorModeValue('gray.600', 'gray.400')}
                fontSize={{ base: "sm", md: "md" }}
                maxW="2xl"
              >
                Join thousands of others who have successfully claimed their car finance refunds. 
                The average claim takes just 15 minutes to set up.
              </Text>
              
              <HStack 
                spacing={{ base: 3, md: 4 }} 
                justify="center" 
                flexWrap="wrap"
                gap={{ base: 3, md: 4 }}
              >
                <Button
                  as={RouterLink}
                  to="/auth/signup/step-1"
                  size={{ base: "md", md: "lg" }}
                  colorScheme="blue"
                  bgGradient="linear(to-r, blue.400, purple.500)"
                  rightIcon={<FiArrowRight />}
                  px={{ base: 6, md: 8 }}
                  py={{ base: 4, md: 6 }}
                  _hover={{ 
                    bgGradient: "linear(to-r, blue.500, purple.600)",
                    transform: 'translateY(-2px)', 
                    boxShadow: 'lg' 
                  }}
                  transition="all 0.3s"
                  w={{ base: "full", md: "auto" }}
                >
                  Let's get started
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks; 