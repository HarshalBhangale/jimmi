// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  Stack,
  HStack,
  Icon,
  useBreakpointValue,
  Badge,
  Image,
  useMediaQuery,
  VStack,
  Grid,
  GridItem,
  Link,
} from '@chakra-ui/react';
import { FiArrowRight, FiBookOpen, FiCheckCircle, FiClock } from 'react-icons/fi';
import { FaFire, FaRegClock } from 'react-icons/fa';
import { keyframes } from '@emotion/react';

// Enhanced animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 0, 128, 0.3); }
  50% { box-shadow: 0 0 30px rgba(255, 0, 128, 0.6); }
`;

const countdownPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Function to calculate time until next Sunday midnight
const calculateTimeToNextSunday = () => {
  const now = new Date();
  const nextSunday = new Date();
  
  // Get days until next Sunday (0 is Sunday, so we add 7 if today is Sunday)
  const daysToSunday = 7 - now.getDay();
  nextSunday.setDate(now.getDate() + (daysToSunday === 0 ? 7 : daysToSunday));
  
  // Set to midnight (23:59:59)
  nextSunday.setHours(23, 59, 59, 999);
  
  // Calculate difference in milliseconds
  const diff = nextSunday.getTime() - now.getTime();
  
  // Convert to hours, minutes, seconds
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { hours, minutes, seconds };
};

const Hero: React.FC = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeToNextSunday());
  
  // Enhanced timer countdown with real-time calculation
  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeToNextSunday();
      setTimeRemaining(newTime);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <Box 
      as="section" 
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      bg="black"
      pt={{ base: "100px", md: "120px" }}
    >
      {/* Enhanced animated background with multiple layers */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(45deg, #0a0015, #1a0033, #000428, #004e92)"
        opacity={0.9}
        zIndex={-2}
      />
      
      {/* Animated mesh gradient overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        background="radial-gradient(circle at 20% 80%, rgba(120, 40, 200, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 0, 128, 0.3) 0%, transparent 50%)"
        zIndex={-1}
        animation={`${pulse} 8s ease-in-out infinite`}
      />
      
      {/* Enhanced limited-time offer banner - REDUCED HEIGHT */}
      <Box 
        position="fixed"
        top={{ base: "60px", md: "70px" }}
        left="0"
        right="0"
        bgGradient="linear(to-r, #FF0080, #FF6B35, #F7931E)"
        color="white"
        py={{ base: "2px", md: "6px" }}  // Significantly reduced padding
        zIndex="banner"
        boxShadow="0 8px 32px rgba(255, 0, 128, 0.3)"
        backdropFilter="blur(10px)"
        borderBottom="1px solid rgba(255, 255, 255, 0.1)"
      >
        <Container maxW="container.xl">
          <Flex 
            alignItems="center" 
            justifyContent="center"
            flexWrap="wrap"
            gap={{ base: 2, md: 3 }}
          >
            <HStack spacing={1}>
              <Icon as={FaFire} boxSize={{ base: 3, md: 4 }} animation={`${pulse} 1s infinite`} />
              <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="bold" textShadow="0 2px 4px rgba(0,0,0,0.3)">
                LIMITED TIME OFFER
              </Text>
            </HStack>
            
            {/* Enhanced countdown display - REDUCED SIZE */}
            <HStack 
              spacing={2} 
              bg="rgba(0,0,0,0.3)" 
              px={3}  // Reduced padding
              py={1}  // Reduced padding
              borderRadius="full"
              backdropFilter="blur(10px)"
              border="1px solid rgba(255, 255, 255, 0.2)"
            >
              <Icon 
                as={FiClock} 
                boxSize={{ base: 3, md: 4 }} 
                color="yellow.300" 
                animation={`${pulse} 2s infinite`}
              />
              <Text 
                fontSize={{ base: "2xs", md: "xs" }} 
                fontWeight="bold"
                color="yellow.100"
              >
                Offer ends in:
              </Text>
              <HStack spacing={1}>
                <Box 
                  bg="rgba(255,255,255,0.15)" 
                  px={1.5}  // Reduced padding
                  py={0.5}  // Reduced padding
                  borderRadius="md" 
                  minW={{ base: "24px", md: "28px" }}  // Reduced width
                  textAlign="center"
                  animation={timeRemaining.hours <= 24 ? `${glow} 2s infinite` : 'none'}
                  border="1px solid rgba(255,255,255,0.1)"
                >
                  <Text 
                    fontSize={{ base: "xs", md: "sm" }} 
                    fontWeight="bold"
                    color="yellow.100"
                  >
                    {String(timeRemaining.hours).padStart(2, '0')}
                  </Text>
                </Box>
                <Text fontSize={{ base: "xs", md: "sm" }} color="yellow.100">:</Text>
                <Box 
                  bg="rgba(255,255,255,0.15)" 
                  px={1.5}  // Reduced padding
                  py={0.5}  // Reduced padding
                  borderRadius="md" 
                  minW={{ base: "24px", md: "28px" }}  // Reduced width
                  textAlign="center"
                  animation={timeRemaining.minutes === 0 ? `${countdownPulse} 0.5s` : 'none'}
                  border="1px solid rgba(255,255,255,0.1)"
                >
                  <Text 
                    fontSize={{ base: "xs", md: "sm" }} 
                    fontWeight="bold"
                    color="yellow.100"
                  >
                    {String(timeRemaining.minutes).padStart(2, '0')}
                  </Text>
                </Box>
                <Text fontSize={{ base: "xs", md: "sm" }} color="yellow.100">:</Text>
                <Box 
                  bg="rgba(255,255,255,0.15)" 
                  px={1.5}  // Reduced padding
                  py={0.5}  // Reduced padding
                  borderRadius="md" 
                  minW={{ base: "24px", md: "28px" }}  // Reduced width
                  textAlign="center"
                  animation={`${countdownPulse} 1s infinite`}
                  border="1px solid rgba(255,255,255,0.1)"
                >
                  <Text 
                    fontSize={{ base: "2xs", md: "xs" }} 
                    fontWeight="bold"
                    color="yellow.100"
                  >
                    {String(timeRemaining.seconds).padStart(2, '0')}
                  </Text>
                </Box>
              </HStack>
            </HStack>
                
            <Text fontSize={{ base: "xs", md: "md" }} fontWeight="medium" textShadow="0 2px 4px rgba(0,0,0,0.3)">
              Get full access for just{' '}
              <Text as="span" fontWeight="extrabold" fontSize={{ base: "sm", md: "lg" }}>
                £39.99
              </Text>{' '}
              instead of{' '}
              <Text as="span" textDecoration="line-through" opacity={0.8}>
                £79.99
              </Text>
            </Text>
          </Flex>
        </Container>
      </Box>
      
      {/* Enhanced floating decorative elements */}
      <Box
        position="absolute"
        top="15%"
        left="5%"
        width={{ base: '200px', md: '400px' }}
        height={{ base: '200px', md: '400px' }}
        borderRadius="full"
        bgGradient="radial(blue.400, purple.500, transparent 70%)"
        opacity={0.3}
        zIndex={0}
        animation={`${float} 6s ease-in-out infinite`}
        filter="blur(1px)"
      />
      
      <Box
        position="absolute"
        bottom="10%"
        right="5%"
        width={{ base: '250px', md: '500px' }}
        height={{ base: '250px', md: '500px' }}
        borderRadius="full"
        bgGradient="radial(pink.400, purple.500, transparent 70%)"
        opacity={0.3}
        zIndex={0}
        animation={`${float} 8s ease-in-out infinite reverse`}
        filter="blur(1px)"
      />
      
      {/* Additional floating particles */}
      <Box
        position="absolute"
        top="30%"
        right="10%"
        width="100px"
        height="100px"
        borderRadius="full"
        bg="rgba(255, 255, 255, 0.1)"
        animation={`${float} 4s ease-in-out infinite`}
        zIndex={0}
      />
      
      <Box
        position="absolute"
        bottom="30%"
        left="10%"
        width="80px"
        height="80px"
        borderRadius="full"
        bg="rgba(255, 0, 128, 0.2)"
        animation={`${float} 5s ease-in-out infinite reverse`}
        zIndex={0}
      />
      
      <Container maxW="container.xl" position="relative" zIndex={1} pt={{ base: 8, md: 12 }}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="center"
          gap={{ base: 8, md: 12, lg: 20 }}
          px={{ base: 4, md: 6 }}
        >
          {/* Enhanced logo with glow effect */}
          <Box 
            maxW={{ base: '50%', md: '45%', lg: '40%' }}
            mb={{ base: 4, md: 0 }}
            animation={`${float} 3s ease-in-out infinite`}
          >
            <Image
              src="/jimmi-logo.png"
              alt="Buddy Logo"
              w="full"
              h="auto"
              objectFit="contain"
              filter="drop-shadow(0 0 40px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 80px rgba(255, 0, 128, 0.3))"
              transition="all 0.3s ease"
              _hover={{
                filter: "drop-shadow(0 0 60px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 120px rgba(255, 0, 128, 0.5))",
                transform: "scale(1.05)"
              }}
            />
          </Box>

          {/* Enhanced hero text */}
          <Box 
            maxW={{ base: 'full', lg: '60%' }} 
            color="white"
            textAlign={{ base: 'center', lg: 'left' }}
          >
            <Box width="100%" mb={8}>
              <Heading
                as="h1"
                fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl', xl: '7xl' }}
                fontWeight="900"
                lineHeight={0.9}
                bgGradient="linear(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)"
                bgClip="text"
                letterSpacing="tight"
                textShadow="0 0 40px rgba(255, 255, 255, 0.3)"
                mb={2}
              >
                Take Control of Your Claim
              </Heading>
              
              <Heading
                as="h2"
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl', xl: '6xl' }}
                fontWeight="700"
                lineHeight={1.1}
                bgGradient="linear(135deg, #f093fb 0%, #f5576c 25%, #4facfe 50%, #00f2fe 75%, #4facfe 100%)"
                bgClip="text"
                letterSpacing="tight"
                textShadow="0 0 30px rgba(255, 255, 255, 0.2)"
              >
                Without the Hassle, Fees, or Firms
              </Heading>
            </Box>
            
            <Text
              fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
              lineHeight="tall"
              mb={10}
              color="whiteAlpha.900"
              maxW={{ base: "100%", lg: "95%" }}
              textShadow="0 2px 4px rgba(0,0,0,0.3)"
              fontWeight="400"
            >
              You don't need a solicitor to make a car finance claim. You just need the{' '}
              <Text 
                as="span" 
                fontWeight="bold" 
                bgGradient="linear(to-r, #4facfe, #00f2fe)"
                bgClip="text"
              >
                right guide
              </Text>. 
              Buddy makes it easy to reclaim what you're owed — step by step.
            </Text>
            
            {/* Enhanced CTAs and Features Container */}
            <VStack spacing={10} align={{ base: "stretch", lg: "flex-start" }} width="100%">
              {/* Enhanced CTAs */}
              <Flex 
                direction={{ base: "column", lg: "row" }} 
                gap={{ base: 6, lg: 6 }} 
                width="100%"
                maxW={{ base: "100%", lg: "95%" }}
              >
                {/* Main CTA with enhanced effects */}
                <Button
                  as={RouterLink}
                  to="/auth/signup/step-1"
                  size="lg"
                  height={{ base: "64px", md: "72px" }}
                  fontSize={{ base: 'lg', md: 'xl' }}
                  fontWeight="bold"
                  bgGradient="linear(135deg, #FF0080, #7928CA, #FF0080)"
                  backgroundSize="200% 200%"
                  color="white"
                  rightIcon={<Icon as={FiArrowRight} boxSize={{ base: 5, md: 6 }} />}
                  _hover={{ 
                    backgroundPosition: "right center",
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow: '0 20px 40px rgba(255, 0, 128, 0.4)' 
                  }}
                  transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                  flex={{ lg: "1.2" }}
                  borderRadius="full"
                  position="relative"
                  overflow="hidden"
                  boxShadow="0 15px 35px rgba(255, 0, 128, 0.3)"
                  border="2px solid transparent"
                  backgroundClip="padding-box"
                  animation={`${glow} 3s ease-in-out infinite`}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    animation: `${shimmer} 3s infinite ease-out`,
                  }}
                >
                  Start Your Claim Now
                </Button>

                {/* Enhanced secondary action */}
                <Button
                  as="a"
                  href="#how-it-works"
                  size="lg"
                  variant="outline"
                  color="white"
                  borderColor="rgba(255, 255, 255, 0.3)"
                  borderWidth="2px"
                  leftIcon={<Icon as={FiBookOpen} boxSize={{ base: 5, md: 6 }} />}
                  _hover={{ 
                    bg: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 15px 35px rgba(255, 255, 255, 0.2)'
                  }}
                  flex={{ lg: "0.8" }}
                  borderRadius="full"
                  fontWeight="medium"
                  height={{ base: "64px", md: "72px" }}
                  fontSize={{ base: 'lg', md: 'xl' }}
                  transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                  backdropFilter="blur(10px)"
                  position="relative"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    padding: '2px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
                    borderRadius: 'inherit',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                  }}
                >
                  Learn How It Works
                </Button>
              </Flex>

              {/* Enhanced features with better styling */}
              <Flex 
                wrap="wrap" 
                gap={{ base: 3, md: 4 }} 
                justify={{ base: "center", lg: "flex-start" }}
                mt={{ base: 4, lg: 6 }}
              >
                {[
                  { icon: FiCheckCircle, text: "No Solicitor Fees", color: "green.300" },
                  { icon: FiCheckCircle, text: "Keep 100% of Refund", color: "blue.300" },
                  { icon: FiCheckCircle, text: "AI-Powered Support", color: "purple.300" }
                ].map((feature, index) => (
                  <HStack 
                    key={index}
                    bg="rgba(255, 255, 255, 0.1)" 
                    backdropFilter="blur(20px)"
                    rounded="full" 
                    px={{ base: 4, md: 6 }}
                    py={{ base: 3, md: 4 }}
                    boxShadow="0 8px 32px rgba(0, 0, 0, 0.2)"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                    _hover={{ 
                      transform: 'translateY(-2px)', 
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
                      bg: "rgba(255, 255, 255, 0.15)"
                    }}
                    cursor="default"
                  >
                    <Icon as={feature.icon} color={feature.color} boxSize={{ base: 4, md: 5 }} />
                    <Text 
                      fontSize={{ base: 'sm', md: 'md' }} 
                      fontWeight="medium"
                      textShadow="0 1px 2px rgba(0,0,0,0.3)"
                    >
                      {feature.text}
                    </Text>
                  </HStack>
                ))}
              </Flex>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;