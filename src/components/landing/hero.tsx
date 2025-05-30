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
  useMediaQuery,
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
  0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
`;

const Hero: React.FC = () => {
  const [showRobot, setShowRobot] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isMobileDevice] = useMediaQuery("(max-width: 768px)");

  // Scroll handler for robot visibility and scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowRobot(scrollPosition > 100);
      setIsScrolledDown(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const [saversCount, setSaversCount] = useState(5631);

  useEffect(() => {
    const interval = setInterval(() => {
      setSaversCount(prev => prev + 1);
    }, 5000); // Increment every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Box
      as="section"
      position="relative"
      minH={{ base: "auto", md: "100vh" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      bg="gray.25"
      bgGradient="linear(135deg, blue.50, purple.50, indigo.50, cyan.50)"
      pb={{ base: "100px", md: 0 }}
      pt={{ base: "90px", md: "100px" }}
    >
      {/* Enhanced animated background with multiple layers - Light theme */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(45deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.15), rgba(165, 180, 252, 0.1), rgba(196, 181, 253, 0.15))"
        opacity={0.8}
        zIndex={-2}
      />
      
      {/* Animated mesh gradient overlay - Light theme */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        background="radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)"
        zIndex={-1}
        animation={`${pulse} 8s ease-in-out infinite`}
      />
      
      {/* Enhanced floating decorative elements - Light theme */}
      <Box
        position="absolute"
        top="15%"
        left="5%"
        width={{ base: '200px', md: '400px' }}
        height={{ base: '200px', md: '400px' }}
        borderRadius="full"
        bgGradient="radial(blue.200, purple.200, transparent 70%)"
        opacity={0.4}
        zIndex={0}
        filter="blur(2px)"
      />
      
      <Box
        position="absolute"
        bottom="10%"
        right="5%"
        width={{ base: '250px', md: '500px' }}
        height={{ base: '250px', md: '500px' }}
        borderRadius="full"
        bgGradient="radial(purple.200, pink.200, transparent 50%)"
        opacity={0.4}
        zIndex={0}
        filter="blur(2px)"
      />
      
      {/* Additional floating particles - Light theme */}
      <Box
        position="absolute"
        top="30%"
        right="10%"
        width="100px"
        height="100px"
        borderRadius="full"
        bg="rgba(59, 130, 246, 0.1)"
        zIndex={0}
      />
      
      <Box
        position="absolute"
        bottom="30%"
        left="10%"
        width="80px"
        height="80px"
        borderRadius="full"
        bg="rgba(168, 85, 247, 0.15)"
        zIndex={0}
      />
      
      <Container maxW="container.xl" position="relative" zIndex={1} pt={{ base: "30px", md: "90px" }}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="center"
          gap={{ base: 4, md: 8, lg: 16 }}
          px={{ base: 4, md: 6 }}
        >
          {/* Robot logo - Smaller on mobile */}
          <Box 
            maxW={{ base: '35%', md: '40%', lg: '35%' }}
            mb={{ base: 2, md: 0 }}
            opacity={showRobot ? 1 : 1}
            transition="opacity 0.3s ease"
            display={{ base: 'flex', md: 'block' }}
            justifyContent="center"
          >
            <Image
              src="/jimmi-logo.png"
              alt="Buddy Logo"
              w="full"
              h="auto"
              objectFit="contain"
              filter="drop-shadow(0 0 25px rgba(59, 130, 246, 0.2)) drop-shadow(0 0 40px rgba(168, 85, 247, 0.15))"
            />
          </Box>

          {/* Hero text - Reduced font sizes and spacing on mobile */}
          <Box 
            maxW={{ base: 'full', lg: '65%' }} 
            color="gray.800"
            textAlign={{ base: 'center', lg: 'left' }}
          >
            <Box width="100%" mb={{ base: 2, md: 4 }}>
              <Heading
                as="h1"
                fontSize={{ base: '1.8rem', sm: '2.2rem', md: '3.5rem', lg: '4.5rem' }}
                fontWeight="900"
                lineHeight={{ base: '1.1', md: '1.1' }}
                bgGradient="linear(135deg, #1e40af, #7c3aed, #ec4899, #3b82f6)"
                bgClip="text"
                letterSpacing="tight"
                mb={{ base: 1, md: 2 }}
                whiteSpace="normal"
                maxW={{ base: "100%", md: "90%" }}
              >
                Save £1000s in legal fees
              </Heading>
                            
              <Heading
                as="h2"
                fontSize={{ base: '1.4rem', sm: '1.8rem', md: '2.8rem', lg: '3.5rem' }}
                fontWeight="700"
                lineHeight={{ base: '1.1', md: '1.1' }}
                bgGradient="linear(135deg, #7c3aed, #ec4899, #3b82f6, #06b6d4)"
                bgClip="text"
                letterSpacing="tight"
                whiteSpace="normal"
                maxW={{ base: "100%", md: "90%" }}
              >
                Don't pay 36% away when you can do it yourself!
              </Heading>
            </Box>

            {/* Counter - Reduced spacing */}
            <Text
              fontSize={{ base: 'sm', md: 'lg' }}
              color="gray.700"
              textAlign={{ base: "center", lg: "left" }}
              mb={{ base: 2, md: 4 }}
              fontWeight="bold"
              letterSpacing="wide"
            >
              Join the{' '}
              <Text
                as="span"
                fontWeight="bold"
                fontSize={{ base: 'md', md: 'xl' }}
                bgGradient="linear(to-r,rgb(226, 11, 245),rgb(22, 124, 249))"
                bgClip="text"
              >
                {saversCount.toLocaleString()}
              </Text>{' '}
              people already saving with Buddy!
            </Text>
                      
            <Text
              fontSize={{ base: 'sm', md: 'lg', lg: 'xl' }}
              lineHeight={{ base: 1.3, md: 1.4 }}
              mb={{ base: 4, md: 6 }}
              color="gray.700"
              maxW={{ base: "100%", lg: "95%" }}
              fontWeight="400"
            >
              You don't need a solicitor to make a car finance claim. You just need the{' '}
              <Text 
                as="span" 
                fontWeight="bold" 
                bgGradient="linear(to-r, #3b82f6, #06b6d4)"
                bgClip="text"
              >
                right guide
              </Text>. 
              Buddy makes it easy to reclaim what you're owed — step by step.
            </Text>
                      
            {/* CTAs and Features - Sticky container for mobile */}
            <VStack spacing={{ base: 3, md: 6 }} align={{ base: "stretch", lg: "flex-start" }} width="100%">
              {/* CTAs - Made more compact for mobile */}
              <Stack 
                direction={{ base: "column", lg: "row" }} 
                spacing={{ base: 2, lg: 6 }} 
                width="100%"
                maxW={{ base: "100%", lg: "95%" }}
                align={{ base: "stretch", lg: "center" }}
              >
                {/* Main CTA - Reduced height on mobile */}
                <Button
                  as={RouterLink}
                  to="/auth/signup/step-1"
                  size="lg"
                  height={{ base: "54px", md: "70px" }}
                  fontSize={{ base: 'md', md: 'xl' }}
                  fontWeight="bold"
                  bgGradient="linear(135deg, #3b82f6, #7c3aed)"
                  color="white"
                  rightIcon={<Icon as={FiArrowRight} boxSize={{ base: 4, md: 6 }} />}
                  _hover={{ 
                    bgGradient: "linear(135deg, #2563eb, #6d28d9)",
                    transform: 'translateY(-2px)',
                    boxShadow: '0 15px 30px rgba(59, 130, 246, 0.4)' 
                  }}
                  _active={{
                    transform: 'translateY(1px)',
                    boxShadow: '0 5px 15px rgba(59, 130, 246, 0.4)'
                  }}
                  transition="all 0.3s ease"
                  flex={{ lg: "0.8" }}
                  borderRadius="full"
                  position="relative"
                  boxShadow="0 10px 25px rgba(59, 130, 246, 0.3)"
                  zIndex={2}
                >
                  Start Your Claim Now
                </Button>

                {/* Secondary CTA - Reduced height on mobile */}
                <Button
                  as="a"
                  href="#how-it-works"
                  size="lg"
                  height={{ base: "54px", md: "70px" }}
                  fontSize={{ base: 'md', md: 'xl' }}
                  fontWeight="semibold"
                  variant="outline"
                  color="gray.700"
                  borderColor="gray.300"
                  borderWidth="2px"
                  bg="white"
                  _hover={{ 
                    bg: "gray.50",
                    borderColor: "gray.400",
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' 
                  }}
                  _active={{
                    transform: 'translateY(1px)',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                  }}
                  transition="all 0.3s ease"
                  flex={{ lg: "0.8" }}
                  borderRadius="full"
                  leftIcon={<Icon as={FiBookOpen} boxSize={{ base: 4, md: 6 }} />}
                >
                  How It Works
                </Button>
              </Stack>

              {isMobile ? (
                <Box mt={2} width="100%">
                  <SimpleGrid 
                    columns={{ base: 3 }}
                    spacing={{ base: 2 }}
                    width="100%"
                  >
                    {[
                      { icon: FiCheckCircle, text: "No Solicitor Fees", color: "green.600" },
                      { icon: FiCheckCircle, text: "Keep 100% of Refund", color: "blue.600" },
                      { icon: FiCheckCircle, text: "AI-Powered Support", color: "purple.600" }
                    ].map((feature, index) => (
                      <Box
                        key={index}
                        bg="white"
                        borderRadius="xl"
                        p={3}
                        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
                        border="1px solid"
                        borderColor="gray.200"
                        transition="all 0.3s ease"
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
                            mb={2}
                            p={1}
                          >
                            <Icon 
                              as={feature.icon} 
                              color={feature.color} 
                              boxSize={{ base: 5, sm: 6 }}
                            />
                          </Box>
                          <Text 
                            fontSize={{ base: "2xs", sm: "xs" }}
                            fontWeight="semibold"
                            color="gray.700"
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
                  mt={{ base: 2, lg: 2 }}
                >
                  {[
                    { icon: FiCheckCircle, text: "No Solicitor Fees", color: "green.600" },
                    { icon: FiCheckCircle, text: "Keep 100% of Refund", color: "blue.600" },
                    { icon: FiCheckCircle, text: "AI-Powered Support", color: "purple.600" }
                  ].map((feature, index) => (
                    <HStack 
                      key={index}
                      bg="white" 
                      backdropFilter="blur(20px)"
                      rounded="full" 
                      px={{ base: 4, md: 6 }}
                      py={{ base: 3, md: 4 }}
                      boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                      border="1px solid"
                      borderColor="gray.200"
                      transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                      _hover={{ 
                        transform: 'translateY(-2px)', 
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                        bg: "gray.50"
                      }}
                      cursor="default"
                    >
                      <Icon as={feature.icon} color={feature.color} boxSize={{ base: 4, md: 5 }} />
                      <Text 
                        fontSize={{ base: 'sm', md: 'md' }} 
                        fontWeight="medium"
                        color="gray.700"
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

      {/* Sticky CTA for Mobile */}
      {isMobileDevice && (
        <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          bg="white"
          py={3}
          px={4}
          boxShadow="0 -4px 10px rgba(0, 0, 0, 0.1)"
          zIndex={999}
          transform={isScrolledDown ? "translateY(0)" : "translateY(100%)"}
          transition="transform 0.3s ease-in-out"
          borderTopRadius="xl"
        >
          <Button
            as={RouterLink}
            to="/auth/signup/step-1"
            size="lg"
            width="100%"
            height="54px"
            fontSize="md"
            fontWeight="bold"
            bgGradient="linear(135deg, #3b82f6, #7c3aed)"
            color="white"
            rightIcon={<Icon as={FiArrowRight} boxSize={5} />}
            _hover={{ 
              bgGradient: "linear(135deg, #2563eb, #6d28d9)",
            }}
            borderRadius="full"
            boxShadow="0 10px 25px rgba(59, 130, 246, 0.3)"
          >
            Start Your Claim Now
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Hero;