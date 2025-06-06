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
  useColorModeValue,
  Icon,
  Divider,
  Badge,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { FiArrowRight, FiShield, FiDollarSign, FiCheck, FiStar } from 'react-icons/fi';

const Pricing: React.FC = () => {
  // Theme colors
  const bgGradient = useColorModeValue(
    'linear(to-b, gray.50, white)',
    'linear(to-b, gray.900, gray.800)'
  );
  
  return (
    <Box 
      as="section" 
      py={{ base: 16, md: 24 }} 
      id="pricing"
      bgGradient={bgGradient}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative elements */}
      <Box
        position="absolute"
        top="15%"
        left="5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bgGradient="radial(blue.100, transparent 70%)"
        opacity={0.6}
        zIndex={0}
      />
      
      <Box
        position="absolute"
        bottom="10%"
        right="5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bgGradient="radial(green.100, transparent 70%)"
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
            Potential Savings
          </Badge>
          
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            bgGradient="linear(to-r, blue.400, green.400)"
            bgClip="text"
            letterSpacing="tight"
            lineHeight="1.2"
          >
            💸 How Much Could You Get Back?
          </Heading>
          
          <Text 
            fontSize={{ base: "lg", md: "xl" }}
            maxW="2xl"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            See how much you could save with Buddy compared to traditional solicitors
          </Text>
        </VStack>

        
        {/* Pricing Card */}
        <Box textAlign="center" maxW="container.md" mx="auto">
          <Badge 
            colorScheme="purple" 
            fontSize="md" 
            px={3} 
            py={1} 
            borderRadius="full"
            mb={4}
            textTransform="none"
          >
            Transparent Pricing
          </Badge>
          
          <Heading 
            as="h3" 
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            mb={6}
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            lineHeight="1.1"
          >
            💼 One Simple Price. 
            <Box as="span" display="block">
              Zero Surprises.
            </Box>
          </Heading>
          
          <Text fontSize={{ base: "lg", md: "xl" }} mb={10} color={useColorModeValue('gray.600', 'gray.400')} maxW="2xl" mx="auto">
            Worried it's not for you? Buddy's so confident he can help, he offers a full refund if you're not satisfied. No questions asked.
          </Text>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={12}>
            <Box
              borderRadius="xl"
              boxShadow="xl"
              bg={useColorModeValue('white', 'gray.800')}
              borderWidth="1px"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
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
                
                <VStack spacing={3} align="center">
                  <Badge 
                    colorScheme="green" 
                    fontSize="sm" 
                    px={3} 
                    py={1} 
                    borderRadius="full"
                    textTransform="none"
                  >
                    Limited Time Offer
                  </Badge>
                  
                  <Text 
                    fontWeight="semibold" 
                    color={useColorModeValue('gray.600', 'gray.400')}
                    fontSize="lg"
                  >
                    One-Time Payment
                  </Text>
                  
                  <HStack spacing={2} align="baseline">
                    <Text 
                      as="span" 
                      fontSize="xl" 
                      textDecoration="line-through" 
                      color={useColorModeValue('gray.400', 'gray.500')}
                    >
                      £79.99
                    </Text>
                    <Heading 
                      as="h4" 
                      size="2xl" 
                      bgGradient="linear(to-r, blue.500, purple.600)" 
                      bgClip="text"
                      fontWeight="extrabold"
                    >
                      £39.00
                    </Heading>
                  </HStack>
                  
                  <Text 
                    color={useColorModeValue('gray.500', 'gray.400')}
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    No hidden fees ever
                  </Text>
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
              bg={useColorModeValue('white', 'gray.800')} 
              p={8} 
              justify="center"
              spacing={8}
            >
              <Heading as="h4" size="lg">Why pay a one-time fee?</Heading>
              
              <VStack spacing={6} align="start" width="100%">
                <Flex align="center" width="100%">
                  <Box
                    bg="blue.50"
                    color="blue.500"
                    borderRadius="full"
                    p={3}
                    width="40px"
                    height="40px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    mr={4}
                  >
                    <Icon as={FiDollarSign} boxSize={5} />
                  </Box>
                  <Box textAlign="left">
                    <Text fontWeight="bold" mb={1}>Keep your full refund</Text>
                    <Text color="gray.600">Others take up to 36% of your refund money</Text>
                  </Box>
                </Flex>
                
                <Flex align="center" width="100%">
                  <Box
                    bg="purple.50"
                    color="purple.500"
                    borderRadius="full"
                    p={3}
                    width="40px"
                    height="40px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    mr={4}
                  >
                    <Icon as={FiShield} boxSize={5} />
                  </Box>
                  <Box textAlign="left">
                    <Text fontWeight="bold" mb={1}>No financial risk</Text>
                    <Text color="gray.600">Money-back guarantee if you're not satisfied</Text>
                  </Box>
                </Flex>
                
                <Flex align="center" width="100%">
                  <Box
                    bg="green.50"
                    color="green.500"
                    borderRadius="full"
                    p={3}
                    width="40px"
                    height="40px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    mr={4}
                  >
                    <Icon as={FiStar} boxSize={5} />
                  </Box>
                  <Box textAlign="left">
                    <Text fontWeight="bold" mb={1}>Support when you need it</Text>
                    <Text color="gray.600">No being passed from person to person</Text>
                  </Box>
                </Flex>
              </VStack>
            </VStack>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default Pricing; 