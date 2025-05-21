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
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FiArrowRight, FiUserPlus, FiFileText, FiMail, FiInbox } from 'react-icons/fi';

// Step Card Props interface
interface StepCardProps {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

// Animation keyframes
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// How It Works Steps
const HowItWorks = () => {
  const pulseAnimation = `${pulse} 3s ease-in-out infinite`;
  const bgGradient = useColorModeValue(
    'linear(to-b, blue.50, white)',
    'linear(to-b, gray.900, gray.800)'
  );
  
  return (
    <Box 
      as="section" 
      py={20} 
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
        width="300px"
        height="300px"
        borderRadius="full"
        bgGradient="radial(blue.100, transparent 70%)"
        opacity={0.6}
        zIndex={0}
      />
      
      <Box
        position="absolute"
        bottom="5%"
        left="5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bgGradient="radial(purple.100, transparent 70%)"
        opacity={0.6}
        zIndex={0}
      />
      
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={{ base: 8, md: 12 }} textAlign="center" mb={{ base: 12, md: 16 }}>
          <Badge 
            colorScheme="purple" 
            fontSize="md" 
            px={3} 
            py={1} 
            borderRadius="full"
            textTransform="none"
          >
            Get Started Today
          </Badge>
          
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            letterSpacing="tight"
            lineHeight="1.2"
          >
            🏁 Ready When You Are
          </Heading>
          
          <Text 
            fontSize={{ base: "lg", md: "xl" }}
            maxW="2xl"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            Let Jimmi walk you through the process. You've got this — and he's got your back.
          </Text>
        </VStack>
        
        <Box maxW="900px" mx="auto">
          <Heading 
            as="h3" 
            size="lg" 
            mb={10} 
            textAlign="center"
            fontWeight="bold"
          >
            📅 How It Works
          </Heading>
          
          <SimpleGrid 
            columns={{ base: 1, md: 2 }} 
            spacing={{ base: 10, md: 16 }}
            mb={16}
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
              title="Tell Jimmi about your loans" 
              description="Choose your lender, upload your documents"
              color="purple"
            />
            
            <StepCard 
              number={3}
              icon={FiMail}
              title="Let Jimmi help you prepare your letters" 
              description="SARs and complaints generated based on your inputs"
              color="pink"
            />
            
            <StepCard 
              number={4}
              icon={FiInbox}
              title="Track everything" 
              description="All replies and updates go into your Jimmi Inbox"
              color="teal"
            />
          </SimpleGrid>
          
          <Box 
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="2xl"
            boxShadow="xl"
            p={8}
            borderTop="4px solid"
            borderColor="blue.400"
            textAlign="center"
            maxW="3xl"
            mx="auto"
            as={chakra.div}
            animation={pulseAnimation}
          >
            <HStack spacing={4} justify="center" flexWrap="wrap">
              <Button
                as={RouterLink}
                to="/auth/signup/step-1"
                size="lg"
                colorScheme="blue"
                bgGradient="linear(to-r, blue.400, purple.500)"
                rightIcon={<FiArrowRight />}
                px={8}
                py={6}
                _hover={{ 
                  bgGradient: "linear(to-r, blue.500, purple.600)",
                  transform: 'translateY(-2px)', 
                  boxShadow: 'lg' 
                }}
                transition="all 0.3s"
              >
                Start Now
              </Button>
              <Button
                as={RouterLink}
                to="/contact"
                size="lg"
                variant="outline"
                colorScheme="blue"
                px={8}
                py={6}
                _hover={{ 
                  bg: 'blue.50',
                  transform: 'translateY(-2px)', 
                  boxShadow: 'sm' 
                }}
                transition="all 0.3s"
              >
                Need Help First?
              </Button>
            </HStack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

// Step Card Component
const StepCard = ({ number, icon, title, description, color }: StepCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue(`${color}.400`, `${color}.300`);
  const iconBg = useColorModeValue(`${color}.100`, `${color}.900`);
  const iconColor = useColorModeValue(`${color}.600`, `${color}.300`);
  const hoverTransform = { transform: 'translateY(-5px)', boxShadow: 'xl' };
  
  return (
    <Box
      bg={cardBg}
      p={6}
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
          w={12}
          h={12}
          align="center"
          justify="center"
          mr={4}
        >
          <Icon as={icon} boxSize={6} />
        </Flex>
        <Box>
          <Flex align="baseline">
            <Text 
              fontSize="3xl" 
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