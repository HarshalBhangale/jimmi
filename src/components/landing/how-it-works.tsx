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
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';

// How It Works Steps
const HowItWorks = () => {
  return (
    <Box as="section" py={20} id="how-it-works">
      <Container maxW="container.xl">
        <VStack spacing={8} textAlign="center" mb={12}>
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
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
        
        <Box maxW="800px" mx="auto">
          <Heading as="h3" size="lg" mb={8} textAlign="center">
            📅 How It Works
          </Heading>
          
          <VStack spacing={8} align="stretch">
            <HStack 
              bg={useColorModeValue('white', 'gray.800')} 
              p={6} 
              borderRadius="lg" 
              boxShadow="md"
              borderLeft="4px solid"
              borderColor="blue.400"
            >
              <Flex 
                bg="blue.100" 
                color="blue.700" 
                borderRadius="full" 
                w={10} 
                h={10} 
                align="center" 
                justify="center"
                fontWeight="bold"
                flexShrink={0}
              >
                1
              </Flex>
              <Box>
                <Text fontWeight="bold">Create your account</Text>
                <Text>Quick setup with phone verification</Text>
              </Box>
            </HStack>
            
            <HStack 
              bg={useColorModeValue('white', 'gray.800')} 
              p={6} 
              borderRadius="lg" 
              boxShadow="md"
              borderLeft="4px solid"
              borderColor="blue.400"
            >
              <Flex 
                bg="blue.100" 
                color="blue.700" 
                borderRadius="full" 
                w={10} 
                h={10} 
                align="center" 
                justify="center"
                fontWeight="bold"
                flexShrink={0}
              >
                2
              </Flex>
              <Box>
                <Text fontWeight="bold">Tell Jimmi about your loans</Text>
                <Text>Choose your lender, upload your documents</Text>
              </Box>
            </HStack>
            
            <HStack 
              bg={useColorModeValue('white', 'gray.800')} 
              p={6} 
              borderRadius="lg" 
              boxShadow="md"
              borderLeft="4px solid"
              borderColor="blue.400"
            >
              <Flex 
                bg="blue.100" 
                color="blue.700" 
                borderRadius="full" 
                w={10} 
                h={10} 
                align="center" 
                justify="center"
                fontWeight="bold"
                flexShrink={0}
              >
                3
              </Flex>
              <Box>
                <Text fontWeight="bold">Let Jimmi help you prepare your letters</Text>
                <Text>SARs and complaints generated based on your inputs</Text>
              </Box>
            </HStack>
            
            <HStack 
              bg={useColorModeValue('white', 'gray.800')} 
              p={6} 
              borderRadius="lg" 
              boxShadow="md"
              borderLeft="4px solid"
              borderColor="blue.400"
            >
              <Flex 
                bg="blue.100" 
                color="blue.700" 
                borderRadius="full" 
                w={10} 
                h={10} 
                align="center" 
                justify="center"
                fontWeight="bold"
                flexShrink={0}
              >
                4
              </Flex>
              <Box>
                <Text fontWeight="bold">Track everything</Text>
                <Text>All replies and updates go into your Jimmi Inbox</Text>
              </Box>
            </HStack>
          </VStack>
          
          <HStack spacing={4} justify="center" mt={12}>
            <Button
              as={RouterLink}
              to="/auth/signup/step-1"
              size="lg"
              colorScheme="blue"
              bgGradient="linear(to-r, blue.400, purple.500)"
              rightIcon={<FiArrowRight />}
              _hover={{ 
                bgGradient: "linear(to-r, blue.500, purple.600)",
                transform: 'translateY(-2px)', 
                boxShadow: 'lg' 
              }}
            >
              Start Now
            </Button>
            <Button
              as={RouterLink}
              to="/contact"
              size="lg"
              variant="outline"
              colorScheme="blue"
              _hover={{ 
                bg: 'blue.50',
                transform: 'translateY(-2px)', 
                boxShadow: 'sm' 
              }}
            >
              Need Help First?
            </Button>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks; 