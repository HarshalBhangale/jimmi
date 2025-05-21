import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Badge,
  List,
  ListItem,
  ListIcon,
  Avatar,
  Card,
  CardBody,
  Divider,
} from '@chakra-ui/react';
import { 
  FiArrowRight, 
  FiCheck, 
  FiStar, 
  FiShield, 
  FiDollarSign, 
  FiMessageSquare,
  FiCalendar,
  FiFileText,
  FiInbox,
  FiUserPlus
} from 'react-icons/fi';

// ------------------------------------
// How Much Could You Get Back? Section
// ------------------------------------
export const PricingSection = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Box 
      as="section" 
      py={{ base: 16, md: 24 }} 
      bgGradient={useColorModeValue(
        'linear(to-b, blue.50, white)',
        'linear(to-b, gray.900, gray.800)'
      )}
      position="relative"
      overflow="hidden"
      id="pricing"
    >
      {/* Decorative elements */}
      <Box
        position="absolute"
        top="10%"
        right="5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bgGradient="radial(blue.100, transparent 70%)"
        opacity={0.6}
        zIndex={0}
      />
      
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={8} textAlign="center" mb={{ base: 12, md: 16 }}>
          <Badge 
            colorScheme="green" 
            fontSize="md" 
            px={3} 
            py={1} 
            borderRadius="full"
            textTransform="none"
          >
            Our Promise
          </Badge>
          
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            bgGradient="linear(to-r, blue.400, green.500)"
            bgClip="text"
            letterSpacing="tight"
          >
            💸 How Much Could You Get Back?
          </Heading>
          
          <Text 
            fontSize={{ base: "lg", md: "xl" }}
            maxW="2xl"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            The average customer claims back £4,522 per car finance agreement
          </Text>
        </VStack>
        
        <Box
          maxW="800px"
          mx="auto"
          mb={16}
        >
          <Card
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="xl"
            borderWidth="1px"
            borderColor={borderColor}
            overflow="hidden"
            position="relative"
          >
            <Box 
              bgGradient="linear(to-r, green.400, blue.500)" 
              h="6px" 
              position="absolute" 
              top={0} 
              left={0} 
              right={0} 
            />
            
            <CardBody p={8}>
              <VStack spacing={10}>
                <Text fontSize="xl" fontWeight="bold">
                  The average successful claim is £4,522 per car finance agreement
                </Text>
                
                <SimpleGrid 
                  columns={{ base: 1, md: 3 }} 
                  spacing={8} 
                  width="100%"
                >
                  <VStack 
                    p={6} 
                    borderRadius="lg" 
                    bg={useColorModeValue('red.50', 'red.900')}
                    spacing={3}
                  >
                    <Text fontWeight="bold" color={useColorModeValue('red.600', 'red.200')}>
                      Traditional Claims Firm
                    </Text>
                    <Heading size="lg" color={useColorModeValue('red.600', 'red.200')}>
                      £1,492
                    </Heading>
                    <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                      33% of your claim
                    </Text>
                  </VStack>
                  
                  <VStack 
                    p={6} 
                    borderRadius="lg" 
                    bg={useColorModeValue('green.50', 'green.900')}
                    spacing={3}
                  >
                    <Text fontWeight="bold" color={useColorModeValue('green.600', 'green.200')}>
                      Jimmi
                    </Text>
                    <Heading size="lg" color={useColorModeValue('green.600', 'green.200')}>
                      £39.99
                    </Heading>
                    <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                      One-time fee
                    </Text>
                  </VStack>
                  
                  <VStack 
                    p={6} 
                    borderRadius="lg" 
                    bg={useColorModeValue('purple.50', 'purple.900')}
                    spacing={3}
                  >
                    <Text fontWeight="bold" color={useColorModeValue('purple.600', 'purple.200')}>
                      Your Savings
                    </Text>
                    <Heading size="lg" color={useColorModeValue('purple.600', 'purple.200')}>
                      £1,452
                    </Heading>
                    <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                      97% savings
                    </Text>
                  </VStack>
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

// ------------------------------------
// One Simple Price Section
// ------------------------------------
export const SimplePriceSection = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Box 
      as="section" 
      py={{ base: 16, md: 24 }} 
      bgGradient={useColorModeValue(
        'linear(to-b, white, gray.50)',
        'linear(to-b, gray.800, gray.900)'
      )}
      position="relative"
      overflow="hidden"
      id="simple-price"
    >
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={8} textAlign="center" mb={{ base: 12, md: 16 }}>
          <Badge 
            colorScheme="purple" 
            fontSize="md" 
            px={3} 
            py={1} 
            borderRadius="full"
            textTransform="none"
          >
            Transparent Pricing
          </Badge>
          
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            letterSpacing="tight"
            lineHeight="1.1"
          >
            💼 One Simple Price. 
            <Box as="span" display="block">
              Zero Surprises.
            </Box>
          </Heading>
          
          <Text 
            fontSize={{ base: "lg", md: "xl" }}
            maxW="2xl"
            mx="auto"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            Worried it's not for you? Jimmi's so confident he can help, he offers a full refund if you're not satisfied. No questions asked.
          </Text>
        </VStack>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} maxW="1000px" mx="auto">
          <Box
            borderRadius="xl"
            boxShadow="xl"
            bg={cardBg}
            borderWidth="1px"
            borderColor={borderColor}
            overflow="hidden"
            position="relative"
            transform={{ md: "scale(1.05)" }}
            zIndex={1}
          >
            <Box 
              bgGradient="linear(to-r, blue.400, purple.500)" 
              h="8px" 
              position="absolute" 
              top={0} 
              left={0} 
              right={0} 
            />
            
            <VStack spacing={6} p={8}>
              <Badge colorScheme="purple" fontSize="md" p={2} borderRadius="full">
                MOST POPULAR
              </Badge>
              
              <VStack spacing={2}>
                <Text fontWeight="medium" color="gray.500">One-Time Payment</Text>
                <Heading 
                  as="h4" 
                  size="3xl" 
                  bgGradient="linear(to-r, blue.500, purple.600)" 
                  bgClip="text"
                >
                  £39.99
                </Heading>
                <Text color="gray.500">No hidden fees ever</Text>
              </VStack>
              
              <Divider />
              
              <List spacing={3} alignSelf="start" width="100%">
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  <Text as="span" fontWeight="medium">Full access to claim tools</Text>
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  <Text as="span" fontWeight="medium">Step-by-step guidance</Text>
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  <Text as="span" fontWeight="medium">Lender replies assistance</Text>
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  <Text as="span" fontWeight="medium">1 year of support</Text>
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color="green.500" />
                  <Text as="span" fontWeight="medium">Money-back guarantee</Text>
                </ListItem>
              </List>
              
              <Button
                as={RouterLink}
                to="/auth/signup/step-1"
                size="lg"
                width="full"
                colorScheme="blue"
                bgGradient="linear(to-r, blue.400, purple.500)"
                rightIcon={<FiArrowRight />}
                py={7}
                fontSize="lg"
                _hover={{ 
                  bgGradient: "linear(to-r, blue.500, purple.600)",
                  transform: 'translateY(-2px)', 
                  boxShadow: 'lg' 
                }}
                transition="all 0.3s"
              >
                Start Your Claim Now
              </Button>
            </VStack>
          </Box>
          
          <VStack 
            bg={cardBg} 
            p={8} 
            borderRadius="xl" 
            boxShadow="md" 
            borderWidth="1px"
            borderColor={borderColor}
            justify="center"
            spacing={8}
          >
            <Heading as="h4" size="lg">Why pay a one-time fee?</Heading>
            
            <VStack spacing={6} align="start">
              <HStack align="flex-start" spacing={4}>
                <Flex
                  bg="blue.50"
                  color="blue.500"
                  borderRadius="full"
                  p={3}
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <Icon as={FiDollarSign} boxSize={5} />
                </Flex>
                <Box>
                  <Text fontWeight="bold" mb={1}>Keep your full refund</Text>
                  <Text color="gray.600">Others take up to 33% of your refund money</Text>
                </Box>
              </HStack>
              
              <HStack align="flex-start" spacing={4}>
                <Flex
                  bg="purple.50"
                  color="purple.500"
                  borderRadius="full"
                  p={3}
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <Icon as={FiShield} boxSize={5} />
                </Flex>
                <Box>
                  <Text fontWeight="bold" mb={1}>No financial risk</Text>
                  <Text color="gray.600">Money-back guarantee if you're not satisfied</Text>
                </Box>
              </HStack>
              
              <HStack align="flex-start" spacing={4}>
                <Flex
                  bg="green.50"
                  color="green.500"
                  borderRadius="full"
                  p={3}
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <Icon as={FiStar} boxSize={5} />
                </Flex>
                <Box>
                  <Text fontWeight="bold" mb={1}>Support when you need it</Text>
                  <Text color="gray.600">No being passed from person to person</Text>
                </Box>
              </HStack>
            </VStack>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

// ------------------------------------
// Testimonials Section
// ------------------------------------
export const TestimonialsSection = () => {
  const bgGradient = useColorModeValue(
    'linear(to-b, gray.50, white)',
    'linear(to-b, gray.900, gray.800)'
  );
  
  return (
    <Box 
      as="section" 
      py={{ base: 16, md: 24 }} 
      id="testimonials"
      bgGradient={bgGradient}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative elements */}
      <Box
        position="absolute"
        top="10%"
        right="5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bgGradient="radial(purple.100, transparent 70%)"
        opacity={0.6}
        zIndex={0}
      />
      
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={8} textAlign="center" mb={{ base: 12, md: 16 }}>
          <Badge 
            colorScheme="purple" 
            fontSize="md" 
            px={3} 
            py={1} 
            borderRadius="full"
            textTransform="none"
          >
            Success Stories
          </Badge>
          
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            bgGradient="linear(to-r, blue.400, purple.500, pink.400)"
            bgClip="text"
            letterSpacing="tight"
            lineHeight="1.2"
          >
            🗣️ Real People. Real Results.
          </Heading>
          
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            maxW="2xl"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            See what our customers are saying about their experience with Jimmi
          </Text>
        </VStack>
        
        <SimpleGrid 
          columns={{ base: 1, md: 2 }} 
          spacing={{ base: 8, md: 12 }} 
          maxW="1000px" 
          mx="auto"
        >
          <TestimonialCard
            quote="I had no clue where to start until Jimmi explained it all. I just followed the steps and ended up with over £2,000 back."
            name="Jason M"
            location="Leeds"
            avatarColor="purple"
            rating={5}
          />
          
          <TestimonialCard
            quote="It's like having a legal expert in your pocket… without the bill."
            name="Priya S"
            location="Birmingham"
            avatarColor="blue"
            rating={5}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

// Testimonial Card Component
interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  avatarColor: string;
  rating: number;
}

const TestimonialCard = ({ quote, name, location, avatarColor, rating }: TestimonialCardProps) => {
  const borderColor = useColorModeValue(`${avatarColor}.400`, `${avatarColor}.500`);
  const avatarBg = useColorModeValue(`${avatarColor}.500`, `${avatarColor}.400`);
  const quoteBg = useColorModeValue(`${avatarColor}.50`, `${avatarColor}.900`);
  const quoteBorderColor = useColorModeValue(`${avatarColor}.100`, `${avatarColor}.800`);
  
  return (
    <Box
      position="relative"
      transition="all 0.3s ease"
      _hover={{ transform: 'translateY(-5px)' }}
    >
      {/* Quote background */}
      <Box
        p={6}
        bg={quoteBg}
        borderRadius="2xl"
        boxShadow="lg"
        borderWidth="1px"
        borderColor={quoteBorderColor}
        mb={6}
        position="relative"
      >
        {/* Quote icon */}
        <Box position="absolute" top={4} right={4} opacity={0.3}>
          <Icon as={FiMessageSquare} boxSize={6} color={borderColor} />
        </Box>
        
        {/* Stars */}
        <HStack spacing={1} mb={4}>
          {[...Array(rating)].map((_, i) => (
            <Icon key={i} as={FiStar} color="yellow.400" />
          ))}
        </HStack>
        
        <Text fontSize="lg" fontStyle="italic" mb={4}>
          "{quote}"
        </Text>
        
        {/* Triangle pointer */}
        <Box
          position="absolute"
          bottom="-12px"
          left="24px"
          width="0"
          height="0"
          borderLeft="12px solid transparent"
          borderRight="12px solid transparent"
          borderTop={`12px solid ${quoteBg}`}
          zIndex={1}
        />
      </Box>
      
      {/* Author info */}
      <HStack pl={6}>
        <Avatar 
          bg={avatarBg} 
          color="white" 
          name={name} 
          size="md"
          boxShadow="md"
        />
        <Box>
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            {location}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

// ------------------------------------
// How It Works Section
// ------------------------------------
export const HowItWorksSection = () => {
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
              icon={FiCalendar}
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
          
          <Flex justify="center">
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
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

// Step Card Component
interface StepCardProps {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

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

export default {
  PricingSection,
  SimplePriceSection,
  TestimonialsSection,
  HowItWorksSection
}; 