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
  ScaleFade,
  SlideFade,
  VStack,
  Tooltip,
  useDisclosure,
  CloseButton,
  Slide,
} from '@chakra-ui/react';
import { FiArrowRight, FiBookOpen, FiCheckCircle, FiClock, FiAlertCircle, FiGift } from 'react-icons/fi';
import { FaStar, FaBolt, FaTag, FaFire, FaStopwatch, FaRegClock } from 'react-icons/fa';
import { keyframes } from '@emotion/react';
// Define animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const flash = keyframes`
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0.5; }
`;

const Hero: React.FC = () => {
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  
  return (
    <Box 
      as="section" 
      position="relative"
      minH={{ base: 'auto', md: '100vh' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      bg="black"
      py={{ base: 12, md: 0 }}
    >
      {/* Background gradient with animated effect */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-br, blue.900, purple.900, black)"
        opacity={0.9}
        zIndex={-1}
      />
      
      {/* Decorative elements - optimized for mobile */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        width={{ base: '150px', md: '300px' }}
        height={{ base: '150px', md: '300px' }}
        borderRadius="full"
        bgGradient="radial(blue.500, transparent 70%)"
        opacity={0.2}
        zIndex={0}
      />
      
      <Box
        position="absolute"
        bottom="10%"
        right="5%"
        width={{ base: '200px', md: '400px' }}
        height={{ base: '200px', md: '400px' }}
        borderRadius="full"
        bgGradient="radial(purple.500, transparent 70%)"
        opacity={0.2}
        zIndex={0}
      />
      
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="center"
          gap={{ base: 6, md: 8 }}
          py={{ base: 12, md: 20, lg: 28 }}
          px={{ base: 4, md: 8 }}
        >
          {/* Mobile Image */}
          <Box 
            maxW={{ base: '60%', md: 'none' }}
            display={{ base: 'block', md: 'none' }}
            mb={6}
          >
            <Image
              src="/jimmi-logo.png"
              alt="Jimmi Logo"
              w="full"
              h="auto"
              objectFit="contain"
              filter="drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))"
            />
          </Box>

          {/* Desktop Image */}
          <Box 
            maxW={{ base: '80%', md: '60%', lg: '40%' }}
            display={{ base: 'none', lg: 'block' }}
          >
            <Image
              src="/jimmi-logo.png"
              alt="Jimmi Logo"
              w="full"
              h="auto"
              objectFit="contain"
              filter="drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))"
              transition="transform 0.3s ease"
              _hover={{ transform: 'scale(1.05)' }}
            />
          </Box>

          {/* Hero Text */}
          <Box 
            maxW={{ base: 'full', lg: '60%' }} 
            color="white"
            position="relative"
            textAlign={{ base: 'center', lg: 'left' }}
          >
            <Badge 
              colorScheme="purple" 
              fontSize={{ base: 'xs', md: 'sm', lg: 'md' }} 
              px={{ base: 2, md: 3 }} 
              py={1} 
              borderRadius="full"
              mb={{ base: 6, md: 8 }}
              textTransform="none"
              fontWeight="medium"
            >
              Car finance claims made easy
            </Badge>
            
            <Badge 
              colorScheme="yellow" 
              fontSize={{ base: 'xs', md: 'sm', lg: 'md' }} 
              px={{ base: 3, md: 4 }} 
              py={1.5} 
              borderRadius="full"
              mb={{ base: 6, md: 8 }}
              ml={{ base: 2, md: 3 }}
              textTransform="none"
              fontWeight="bold"
              bg="yellow.400"
              color="gray.800"
              boxShadow="md"
              display="inline-flex"
              alignItems="center"
            >
              <Box as="span" mr={1}>🔥</Box> Special Offer: £29.99 <Box as="span" fontSize="xs" ml={1} textDecoration="line-through">£49.99</Box>
            </Badge>
            
            <Heading
              as="h1"
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
              fontWeight="extrabold"
              lineHeight={1.1}
              mb={{ base: 4, md: 6 }}
              bgGradient="linear(to-r, blue.300, purple.300, pink.300)"
              bgClip="text"
              letterSpacing="tight"
            >
              Take Control of Your Claim
              <Box as="span" display="block" mt={2} fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl' }}>
                Without the Hassle, Fees, or Firms
              </Box>
            </Heading>
            
            <Text
              fontSize={{ base: 'md', sm: 'lg', md: 'xl', lg: '2xl' }}
              lineHeight="tall"
              mb={{ base: 6, md: 8 }}
              color="whiteAlpha.800"
              maxW="3xl"
            >
              You don't need a solicitor to make a car finance claim. You just need the right guide.
              <Text 
                as="span" 
                display="block" 
                fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }} 
                fontWeight="bold" 
                mt={{ base: 3, md: 4 }} 
                color="blue.200"
              >
                Buddy makes it easy to reclaim what you're owed — step by step.
              </Text>
            </Text>
            
            <Box
              bg="linear-gradient(135deg, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0.1) 100%)"
              backdropFilter="blur(8px)"
              borderRadius="xl"
              p={{ base: 3, md: 5 }}
              mb={{ base: 6, md: 8 }}
              border="1px solid"
              borderColor="yellow.400"
              boxShadow="0 4px 12px rgba(255,215,0,0.2)"
            >
              <HStack spacing={3} align="center">
                <Box fontSize={{ base: "xl", md: "2xl" }}>💰</Box>
                <Box>
                  <Text fontWeight="bold" color="yellow.400" fontSize={{ base: "sm", md: "md" }}>
                    LIMITED TIME OFFER
                  </Text>
                  <Text color="white" fontSize={{ base: "xs", md: "sm" }}>
                    Get full access for just £29.99 instead of £49.99. Save 40% today!
                  </Text>
                </Box>
              </HStack>
            </Box>
            
            <Stack 
              direction={{ base: 'column', sm: 'row' }} 
              spacing={{ base: 4, md: 5 }} 
              mb={{ base: 8, md: 10 }}
              justify={{ base: 'center', lg: 'flex-start' }}
            >
              <Button
                as={RouterLink}
                to="/auth/signup/step-1"
                size={buttonSize}
                px={{ base: 6, md: 8 }}
                py={{ base: 6, md: 7 }}
                fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
                fontWeight="bold"
                colorScheme="blue"
                bgGradient="linear(to-r, blue.400, purple.500)"
                rightIcon={<Icon as={FiArrowRight} />}
                _hover={{ 
                  bgGradient: "linear(to-r, blue.500, purple.600)",
                  transform: 'translateY(-2px)', 
                  boxShadow: 'xl' 
                }}
                transition="all 0.3s ease"
                w={{ base: 'full', sm: 'auto' }}
              >
                Start Your Claim
              </Button>
              <Button
                as="a"
                href="#how-it-works"
                size={buttonSize}
                px={{ base: 6, md: 8 }}
                py={{ base: 6, md: 7 }}
                fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
                variant="outline"
                colorScheme="whiteAlpha"
                color="white"
                leftIcon={<Icon as={FiBookOpen} />}
                _hover={{ 
                  bg: 'whiteAlpha.200',
                  transform: 'translateY(-2px)', 
                  boxShadow: 'md' 
                }}
                transition="all 0.3s ease"
                w={{ base: 'full', sm: 'auto' }}
              >
                How It Works
              </Button>
            </Stack>
            
            <Flex 
              justify={{ base: 'center', lg: 'flex-start' }} 
              wrap="wrap" 
              gap={{ base: 3, md: 4 }}
            >
              <HStack 
                bg="whiteAlpha.200" 
                backdropFilter="blur(10px)"
                rounded="full" 
                px={{ base: 3, md: 4 }} 
                py={{ base: 1.5, md: 2 }}
                boxShadow="md"
              >
                <Icon as={FiCheckCircle} color="green.300" />
                <Text fontSize={{ base: '2xs', sm: 'xs', md: 'sm' }} fontWeight="medium">No Solicitor Fees</Text>
              </HStack>
              <HStack 
                bg="whiteAlpha.200" 
                backdropFilter="blur(10px)"
                rounded="full" 
                px={{ base: 3, md: 4 }} 
                py={{ base: 1.5, md: 2 }}
                boxShadow="md"
              >
                <Icon as={FiCheckCircle} color="green.300" />
                <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium">Keep 100% of Refund</Text>
              </HStack>
              <HStack 
                bg="whiteAlpha.200" 
                backdropFilter="blur(10px)"
                rounded="full" 
                px={4} 
                py={2}
                boxShadow="md"
              >
                <Icon as={FiCheckCircle} color="green.300" />
                <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium">AI-Powered Support</Text>
              </HStack>
            </Flex>
          </Box>

          {/* Hero Image */}
          
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;
