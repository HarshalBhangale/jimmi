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
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FiArrowRight, FiUserPlus, FiFileText, FiMail, FiInbox } from 'react-icons/fi';

interface StepCardProps {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

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
            Let Buddy walk you through the process. You've got this — and he's got your back.
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
          
          <SimpleGrid 
            columns={{ base: 1, md: 2 }} 
            spacing={{ base: 6, md: 8, lg: 12 }}
            mb={{ base: 12, md: 16 }}
            px={{ base: 2, md: 4 }}
          >
            <StepCard 
              number={1}
              icon={FiUserPlus}
              title="Create your account" 
              description="Quick setup with phone verification"
              color="blue"
            />
            
            <StepCard 
              number={2}
              icon={FiFileText}
              title="Tell Buddy about your loans" 
              description="Choose your lender, upload your documents"
              color="purple"
            />
            
            <StepCard 
              number={3}
              icon={FiMail}
              title="Let Buddy help you prepare your letters" 
              description="SARs and complaints generated based on your inputs"
              color="pink"
            />
            
            <StepCard 
              number={4}
              icon={FiInbox}
              title="Track everything" 
              description="All replies and updates go into your Buddy Inbox"
              color="teal"
            />
          </SimpleGrid>
          
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
                Ready to Start Your Journey?
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

const StepCard = ({ number, icon, title, description, color }: StepCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue(`${color}.400`, `${color}.300`);
  const iconBg = useColorModeValue(`${color}.100`, `${color}.900`);
  const iconColor = useColorModeValue(`${color}.600`, `${color}.300`);
  const hoverTransform = { transform: 'translateY(-5px)', boxShadow: 'xl' };
  
  return (
    <Box
      bg={cardBg}
      p={{ base: 4, md: 6 }}
      borderRadius="xl"
      boxShadow="lg"
      borderLeft="4px solid"
      borderColor={borderColor}
      transition="all 0.3s ease"
      _hover={hoverTransform}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Flex align="center" mb={4}>
        <Flex
          bg={iconBg}
          color={iconColor}
          borderRadius="full"
          w={{ base: 10, md: 12 }}
          h={{ base: 10, md: 12 }}
          align="center"
          justify="center"
          mr={4}
        >
          <Icon as={icon} boxSize={{ base: 5, md: 6 }} />
        </Flex>
        <Box>
          <Flex align="baseline">
            <Text 
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold" 
              color={iconColor}
              lineHeight="1"
              mr={2}
            >
              {number}
            </Text>
            <Text fontWeight="bold" fontSize="xl">{title}</Text>
          </Flex>
          <Text mt={1} color={useColorModeValue('gray.600', 'gray.400')}>
            {description}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default HowItWorks; 