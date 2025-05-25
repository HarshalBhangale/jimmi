// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  HStack,
  Icon,
  Image,
  VStack,
  Link,
  Stack,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FiArrowRight, FiBookOpen, FiCheckCircle } from 'react-icons/fi';
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

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 0, 128, 0.3); }
  50% { box-shadow: 0 0 30px rgba(255, 0, 128, 0.6); }
`;

const Hero: React.FC = () => {
  const [showRobot, setShowRobot] = useState(false);

  // Scroll handler for robot visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowRobot(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isMobile = useBreakpointValue({ base: true, lg: false });
  
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
        zIndex={0}
      />
      
      <Container maxW="container.xl" position="relative" zIndex={1} pt={{ base: "140px", md: "160px" }}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="center"
          gap={{ base: 6, md: 8, lg: 16 }}
          px={{ base: 4, md: 6 }}
        >
          {/* Robot logo - Now appears only after scroll, no floating animation, reduced padding */}
          <Box 
            maxW={{ base: '45%', md: '40%', lg: '35%' }}
            mb={{ base: 2, md: 0 }}
            opacity={showRobot ? 1 : 1}
            transition="opacity 0.3s ease"
          >
            <Image
              src="/jimmi-logo.png"
              alt="Buddy Logo"
              w="full"
              h="auto"
              objectFit="contain"
              filter="drop-shadow(0 0 40px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 80px rgba(255, 0, 128, 0.3))"
            />
          </Box>

          {/* Enhanced hero text */}
          <Box 
            maxW={{ base: 'full', lg: '65%' }} 
            color="white"
            textAlign={{ base: 'center', lg: 'left' }}
          >
            <Box width="100%" mb={6}>
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
              mb={8}
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
            <VStack spacing={8} align={{ base: "stretch", lg: "flex-start" }} width="100%">
              {/* Enhanced CTAs */}
              <Stack 
                direction={{ base: "column", lg: "row" }} 
                spacing={{ base: 4, lg: 6 }} 
                width="100%"
                maxW={{ base: "100%", lg: "95%" }}
                align={{ base: "stretch", lg: "center" }}
              >
                {/* Main CTA with enhanced effects */}
                <Button
                  as={RouterLink}
                  to="/auth/signup/step-1"
                  size="lg"
                  height={{ base: "64px", md: "70px" }}
                  fontSize={{ base: 'lg', md: 'xl' }}
                  fontWeight="bold"
                  bgGradient="linear(135deg, #FF0080, #7928CA)"
                  color="white"
                  rightIcon={<Icon as={FiArrowRight} boxSize={{ base: 5, md: 6 }} />}
                  _hover={{ 
                    bgGradient: "linear(135deg, #FF1493, #9370DB)",
                    transform: 'translateY(-2px)',
                    boxShadow: '0 15px 30px rgba(255, 0, 128, 0.4)' 
                  }}
                  _active={{
                    transform: 'translateY(1px)',
                    boxShadow: '0 5px 15px rgba(255, 0, 128, 0.4)'
                  }}
                  transition="all 0.3s ease"
                  flex={{ lg: "0.8" }}
                  borderRadius="full"
                  position="relative"
                  boxShadow="0 10px 25px rgba(255, 0, 128, 0.3)"
                >
                  Start Your Claim Now
                </Button>

                {/* Secondary CTA as button for better visibility */}
                <Button
                  as="a"
                  href="#how-it-works"
                  size="lg"
                  height={{ base: "64px", md: "70px" }}
                  fontSize={{ base: 'lg', md: 'xl' }}
                  fontWeight="semibold"
                  variant="outline"
                  color="white"
                  borderColor="rgba(255, 255, 255, 0.4)"
                  borderWidth="2px"
                  _hover={{ 
                    bg: "whiteAlpha.100",
                    borderColor: "white",
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 25px rgba(255, 255, 255, 0.2)' 
                  }}
                  _active={{
                    transform: 'translateY(1px)',
                    boxShadow: '0 5px 15px rgba(255, 255, 255, 0.1)'
                  }}
                  transition="all 0.3s ease"
                  flex={{ lg: "0.8" }}
                  borderRadius="full"
                  leftIcon={<Icon as={FiBookOpen} boxSize={{ base: 5, md: 6 }} />}
                >
                  How It Works
                </Button>
              </Stack>

              {isMobile ? (
                <Box mt={8} width="100%">
                  <SimpleGrid 
                    columns={{ base: 3 }}
                    spacing={{ base: 3 }}
                    width="100%"
                  >
                    {[
                      { icon: FiCheckCircle, text: "No Solicitor Fees", color: "green.400" },
                      { icon: FiCheckCircle, text: "Keep 100% of Refund", color: "blue.400" },
                      { icon: FiCheckCircle, text: "AI-Powered Support", color: "purple.400" }
                    ].map((feature, index) => (
                      <Box
                        key={index}
                        bg="rgba(20, 20, 20, 0.85)"
                        borderRadius="xl"
                        p={4}
                        boxShadow="0 8px 16px rgba(0, 0, 0, 0.3)"
                        border="1px solid rgba(50, 50, 50, 0.8)"
                        transition="all 0.3s ease"
                        _hover={{ 
                          transform: 'translateY(-2px)', 
                          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)'
                        }}
                        height="100%"
                      >
                        <Flex
                          direction="column"
                          align="center"
                          justify="center"
                          textAlign="center"
                          height="100%"
                        >
                          <Box
                            mb={3}
                            p={2}
                          >
                            <Icon 
                              as={feature.icon} 
                              color={feature.color} 
                              boxSize={{ base: 6, sm: 7 }}
                            />
                          </Box>
                          <Text 
                            fontSize={{ base: "xs", sm: "sm" }}
                            fontWeight="semibold"
                            color="white"
                            lineHeight="tight"
                          >
                            {feature.text}
                          </Text>
                        </Flex>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              ) : (
                <Flex 
                  wrap="wrap" 
                  gap={{ base: 3, md: 4 }} 
                  justify={{ base: "center", lg: "flex-start" }}
                  mt={{ base: 2, lg: 4 }}
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
              )}
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;