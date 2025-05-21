import React from 'react';
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
} from '@chakra-ui/react';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';

const Hero: React.FC = () => {
  return (
    <Box 
      as="section" 
      position="relative"
      minH="90vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      {/* Background Image with Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgImage="url('/bg3.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        zIndex={-2}
      />
      
      {/* Gradient overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        //bgGradient="linear(to-r, rgba(23, 25, 35, 0.92), rgba(23, 25, 35, 0.85))"
        zIndex={-1}
      />

      <Container maxW="container.xl" position="relative">
        <Flex
          direction="column"
          align="center"
          justify="center"
          textAlign="center"
          py={{ base: 20, md: 28 }}
          px={{ base: 4, md: 8 }}
        >
          {/* Hero Text */}
          <Box 
            maxW={{ base: 'full', lg: '80%' }} 
            color="white"
          >
            <Box mb={8} display="flex" justifyContent="center">
              <img src="/jimmi-logo.png" alt="Jimmi Logo" style={{ maxWidth: '200px' }} />
            </Box>
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
              lineHeight={1.2}
              mb={6}
              bgGradient="linear(to-r, blue.200, purple.200)"
              bgClip="text"
            >
              Take Control of Your Claim — Without the Hassle, Fees, or Firms.
            </Heading>
            
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              lineHeight="tall"
              mb={8}
              color="gray.300"
            >
              You don't need a solicitor to make a car finance claim. You just need the right guide.
              <Text 
                as="span" 
                display="block" 
                fontSize={{ base: 'xl', md: '2xl' }} 
                fontWeight="bold" 
                mt={4} 
                color="blue.200"
              >
                Jimmi makes it easy to reclaim what you're owed — step by step.
              </Text>
            </Text>
            
            <Stack 
              direction={{ base: 'column', sm: 'row' }} 
              spacing={4} 
              mb={10}
              justify="center"
            >
              <Button
                as={RouterLink}
                to="/auth/signup/step-1"
                size="lg"
                px={8}
                py={7}
                fontSize="lg"
                colorScheme="blue"
                bgGradient="linear(to-r, blue.400, purple.500)"
                rightIcon={<Icon as={FiArrowRight} />}
                _hover={{ 
                  bgGradient: "linear(to-r, blue.500, purple.600)",
                  transform: 'translateY(-2px)', 
                  boxShadow: 'lg' 
                }}
              >
                Start Your Claim
              </Button>
              <Button
                as="a"
                href="#how-it-works"
                size="lg"
                px={8}
                py={7}
                fontSize="lg"
                variant="outline"
                colorScheme="whiteAlpha"
                color="white"
                leftIcon={<Icon as={FiBookOpen} />}
                _hover={{ 
                  bg: 'whiteAlpha.200',
                  transform: 'translateY(-2px)', 
                  boxShadow: 'md' 
                }}
              >
                How It Works
              </Button>
            </Stack>
            
            <HStack spacing={6} justify="center" flexWrap="wrap">
              <Flex 
                align="center" 
                bg="whiteAlpha.200" 
                rounded="full" 
                px={4} 
                py={2}
              >
                <Text fontSize="sm">No Solicitor Fees</Text>
              </Flex>
              <Flex 
                align="center" 
                bg="whiteAlpha.200" 
                rounded="full" 
                px={4} 
                py={2}
              >
                <Text fontSize="sm">Keep 100% of Refund</Text>
              </Flex>
              <Flex 
                align="center" 
                bg="whiteAlpha.200" 
                rounded="full" 
                px={4} 
                py={2}
              >
                <Text fontSize="sm">AI-Powered Support</Text>
              </Flex>
            </HStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;
