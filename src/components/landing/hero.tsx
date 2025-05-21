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
  useBreakpointValue,
  Badge,
} from '@chakra-ui/react';
import { FiArrowRight, FiBookOpen, FiCheckCircle } from 'react-icons/fi';

const Hero: React.FC = () => {
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });
  
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
      
      {/* Decorative elements */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bgGradient="radial(blue.500, transparent 70%)"
        opacity={0.2}
        zIndex={0}
      />
      
      <Box
        position="absolute"
        bottom="10%"
        right="5%"
        width="400px"
        height="400px"
        borderRadius="full"
        bgGradient="radial(purple.500, transparent 70%)"
        opacity={0.2}
        zIndex={0}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
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
            position="relative"
          >
            <Badge 
              colorScheme="purple" 
              fontSize={{ base: 'sm', md: 'md' }} 
              px={3} 
              py={1} 
              borderRadius="full"
              mb={8}
              textTransform="none"
              fontWeight="medium"
            >
              Car finance claims made easy
            </Badge>
            
            <Heading
              as="h1"
              fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
              fontWeight="extrabold"
              lineHeight={1.1}
              mb={6}
              bgGradient="linear(to-r, blue.300, purple.300, pink.300)"
              bgClip="text"
              letterSpacing="tight"
            >
              Take Control of Your Claim
              <Box as="span" display="block" mt={2} fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                Without the Hassle, Fees, or Firms
              </Box>
            </Heading>
            
            <Text
              fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
              lineHeight="tall"
              mb={8}
              color="whiteAlpha.800"
              maxW="3xl"
              mx="auto"
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
              spacing={5} 
              mb={10}
              justify="center"
            >
              <Button
                as={RouterLink}
                to="/auth/signup/step-1"
                size={buttonSize}
                px={8}
                py={7}
                fontSize={{ base: 'md', md: 'lg' }}
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
              >
                Start Your Claim
              </Button>
              <Button
                as="a"
                href="#how-it-works"
                size={buttonSize}
                px={8}
                py={7}
                fontSize={{ base: 'md', md: 'lg' }}
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
              >
                How It Works
              </Button>
            </Stack>
            
            <Flex justify="center" wrap="wrap" gap={4}>
              <HStack 
                bg="whiteAlpha.200" 
                backdropFilter="blur(10px)"
                rounded="full" 
                px={4} 
                py={2}
                boxShadow="md"
              >
                <Icon as={FiCheckCircle} color="green.300" />
                <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium">No Solicitor Fees</Text>
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
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;
