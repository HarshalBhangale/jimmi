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
  Grid,
  GridItem,
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
      minH={{ base: 'calc(100vh - 30px)', md: '100vh' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      bg="black"
      py={{ base: 8, md: 0 }}
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
          gap={{ base: 4, md: 8 }}
          py={{ base: 6, md: 20, lg: 28 }}
          px={{ base: 4, md: 8 }}
        >
          {/* Mobile Image - Reduced size and padding */}
          <Box 
            maxW={{ base: '45%', md: 'none' }}
            display={{ base: 'block', md: 'none' }}
            mb={3}
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
            maxW={{ base: '50%', md: '40%', lg: '40%' }}
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
            {/* <Flex 
              wrap="wrap" 
              justify={{ base: 'center', lg: 'flex-start' }}
              mb={{ base: 4, md: 6 }}
              gap={2}
            >
              <Badge 
                colorScheme="purple" 
                fontSize={{ base: 'xs', md: 'sm', lg: 'md' }} 
                px={{ base: 2, md: 3 }} 
                py={1} 
                borderRadius="full"
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
                textTransform="none"
                fontWeight="bold"
                bg="yellow.400"
                color="gray.800"
                boxShadow="md"
                display="inline-flex"
                alignItems="center"
              >
                <Box as="span" mr={1}>🔥</Box> Special Offer: £39.99 <Box as="span" fontSize="xs" ml={1} textDecoration="line-through">£49.99</Box>
              </Badge>
            </Flex> */}
            
            <Heading
              as="h1"
              fontSize={{ base: '2xl', sm: '3xl', md: '5xl', lg: '6xl' }}
              fontWeight="extrabold"
              lineHeight={1.1}
              mb={{ base: 3, md: 6 }}
              bgGradient="linear(to-r, blue.300, purple.300, pink.300)"
              bgClip="text"
              letterSpacing="tight"
            >
              Take Control of Your Claim
              <Box as="span" display="block" mt={2} fontSize={{ base: 'xl', sm: '2xl', md: '4xl', lg: '5xl' }}>
                Without the Hassle, Fees, or Firms
              </Box>
            </Heading>
            
            <Text
              fontSize={{ base: 'sm', sm: 'md', md: 'xl', lg: '2xl' }}
              lineHeight="tall"
              mb={{ base: 4, md: 6 }}
              color="whiteAlpha.800"
              maxW="3xl"
            >
              You don't need a solicitor to make a car finance claim. You just need the <Text as="span" fontWeight="bold" color="blue.200">right guide</Text>.
              <Text 
                as="span" 
                display="block" 
                fontSize={{ base: 'md', sm: 'lg', md: 'xl', lg: '2xl' }} 
                mt={{ base: 2, md: 3 }} 
                // color="blue.200"
                lineHeight="tall"
              >
                Buddy makes it easy to reclaim what you're owed — step by step.
              </Text>
            </Text>
            
            <Box
              bg="linear-gradient(135deg, rgba(255,215,0,0.15) 0%, rgba(255,215,0,0.05) 100%)"
              backdropFilter="blur(12px)"
              borderRadius="2xl"
              p={{ base: 4, md: 6 }}
              mb={{ base: 4, md: 6 }}
              border="2px solid"
              borderColor="yellow.400"
              boxShadow="0 8px 32px rgba(255,215,0,0.25)"
              position="relative"
              overflow="hidden"
              maxW={{ base: "full", lg: "600px" }}
              mx={{ base: "auto", lg: 0 }}
              _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
              animation: `shimmer 3s infinite ease-in-out`,
              }}
            >
              <HStack spacing={4} align="center" justify={{ base: "center", lg: "flex-start" }}>
              <Box fontSize={{ base: "2xl", md: "3xl" }}>🔥</Box>
              <VStack spacing={1} align={{ base: "center", lg: "start" }}>
                <Text 
                fontWeight="black" 
                color="yellow.300" 
                fontSize={{ base: "lg", md: "xl" }}
                textShadow="0 2px 4px rgba(0,0,0,0.3)"
                letterSpacing="wide"
                >
                LIMITED TIME OFFER
                </Text>
                <Text 
                color="white" 
                fontSize={{ base: "md", md: "lg" }}
                textAlign={{ base: "center", lg: "left" }}
                lineHeight="short"
                >
                Get full access for just <Text as="span" fontWeight="bold" color="yellow.300">£39.99</Text> instead of <Text as="span" textDecoration="line-through" color="whiteAlpha.600">£79.99</Text>
                </Text>
                <Text 
                color="yellow.200" 
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="semibold"
                >
                Save 50% today!
                </Text>
              </VStack>
              </HStack>
            </Box>
            
            <Grid 
              templateColumns={{ base: '1fr', md: '1fr 1fr' }}
              gap={{ base: 3, md: 4 }}
              mb={{ base: 4, md: 6 }}
              w="full"
              maxW={{ base: 'full', md: 'none' }}
              mx={{ base: 'auto', lg: 0 }}
            >
              {/* Primary CTA Button */}
                <GridItem>
                <Button
                  as={RouterLink}
                  to="/auth/signup/step-1"
                  size={{ base: 'lg', md: 'xl' }}
                  h={{ base: '56px', md: '64px' }}
                  px={{ base: 8, md: 10 }}
                  fontSize={{ base: 'lg', md: 'xl' }}
                  fontWeight="black"
                  bgGradient="linear(45deg, #FF0080 0%, #7928CA 50%, #FF0080 100%)"
                  backgroundSize="200% 200%"
                  color="white"
                  rightIcon={<Icon as={FiArrowRight} boxSize={6} />}
                  _hover={{ 
                  backgroundPosition: '100% 0',
                  transform: { base: 'translateY(-2px)', md: 'translateY(-3px) scale(1.02)' },
                  boxShadow: '0 20px 40px rgba(255, 0, 128, 0.6), 0 0 30px rgba(255, 0, 128, 0.4), 0 0 0 2px rgba(255,255,255,0.2)' 
                  }}
                  _active={{
                  transform: 'translateY(-1px) scale(1.01)',
                  }}
                  transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  w="full"
                  position="relative"
                  overflow="hidden"
                  borderRadius="full"
                  border="3px solid"
                  borderColor="pink.400"
                  boxShadow="0 15px 35px rgba(255, 0, 128, 0.4), 0 0 20px rgba(255, 0, 128, 0.2), inset 0 1px 0 rgba(255,255,255,0.4)"
                  css={{
                  animation: `${pulse} 2s infinite, gradient 3s ease infinite`,
                  }}
                  _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                  transition: 'left 0.6s ease',
                  }}
                  _groupHover={{
                  _before: {
                    left: '100%',
                  }
                  }}
                >
                  Start Your Claim Now
                </Button>
                </GridItem>

                {/* Secondary Button */}
                <GridItem>
                <Button
                  as="a"
                  href="#how-it-works"
                  size={{ base: 'md', md: 'lg' }}
                  h={{ base: '48px', md: '56px' }}
                  px={{ base: 6, md: 8 }}
                  fontSize={{ base: 'md', md: 'lg' }}
                  variant="ghost"
                  color="white"
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                  leftIcon={<Icon as={FiBookOpen} />}
                  _hover={{ 
                  bg: 'whiteAlpha.200',
                  borderColor: 'whiteAlpha.500',
                  transform: { base: 'translateY(-1px)', md: 'translateY(-2px)' },
                  boxShadow: { base: '0 4px 12px rgba(255,255,255,0.1)', md: '0 8px 20px rgba(255,255,255,0.15)' }
                  }}
                  _active={{
                  bg: 'whiteAlpha.300',
                  transform: 'scale(0.98)'
                  }}
                  transition="all 0.2s ease"
                  w="full"
                  borderRadius="full"
                  fontWeight="medium"
                  backdropFilter="blur(10px)"
                  boxShadow="0 4px 15px rgba(0,0,0,0.1)"
                >
                  How It Works
                </Button>
                </GridItem>
            </Grid>
            
            <Grid
              templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
              gap={{ base: 2, md: 4 }}
              justifyItems={{ base: 'center', lg: 'start' }}
              w="full"
              maxW={{ base: 'full', lg: '600px' }}
            >
              <GridItem colSpan={{ base: 2, md: 1 }}>
                <HStack 
                  bg="whiteAlpha.200" 
                  backdropFilter="blur(10px)"
                  rounded="full" 
                  px={{ base: 3, md: 4 }} 
                  py={{ base: 1.5, md: 2 }}
                  boxShadow="md"
                  minW="fit-content"
                >
                  <Icon as={FiCheckCircle} color="green.300" />
                  <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium">No Solicitor Fees</Text>
                </HStack>
              </GridItem>
              <GridItem>
                <HStack 
                  bg="whiteAlpha.200" 
                  backdropFilter="blur(10px)"
                  rounded="full" 
                  px={{ base: 3, md: 4 }} 
                  py={{ base: 1.5, md: 2 }}
                  boxShadow="md"
                  minW="fit-content"
                >
                  <Icon as={FiCheckCircle} color="green.300" />
                  <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium">Keep 100% of Refund</Text>
                </HStack>
              </GridItem>
              <GridItem>
                <HStack 
                  bg="whiteAlpha.200" 
                  backdropFilter="blur(10px)"
                  rounded="full" 
                  px={{ base: 3, md: 4 }}
                  py={{ base: 1.5, md: 2 }}
                  boxShadow="md"
                  minW="fit-content"
                >
                  <Icon as={FiCheckCircle} color="green.300" />
                  <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium">AI-Powered Support</Text>
                </HStack>
              </GridItem>
            </Grid>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;
