import React, { useState } from 'react';
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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Icon,
  Divider,
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from '@chakra-ui/react';
import { FiArrowRight, FiShield, FiDollarSign, FiCreditCard } from 'react-icons/fi';

const Pricing: React.FC = () => {
  const [agreements, setAgreements] = useState<number>(2);
  
  // Calculate pricing and savings
  const solicitorFeePerAgreement = 1620;
  const jimmiPrice = 39.99;
  const solicitorFees = agreements * solicitorFeePerAgreement;
  const savings = solicitorFees - jimmiPrice;
  const savingsPercentage = Math.round((savings / solicitorFees) * 100);
  const avgRefundPerAgreement = 4522;
  const potentialRefund = agreements * avgRefundPerAgreement;
  
  // Theme colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const statBg = useColorModeValue('blue.50', 'blue.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const highlightColor = useColorModeValue('purple.500', 'purple.300');
  
  return (
    <Box as="section" py={20} id="pricing">
      <Container maxW="container.xl">
        <VStack spacing={8} textAlign="center" mb={16}>
          <Heading 
            as="h2" 
            size="xl"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            💸 How Much Could You Get Back?
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }}
            maxW="2xl"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            See how much you could save with Jimmi compared to traditional solicitors
          </Text>
        </VStack>

        <Box 
          p={8} 
          bg={bgColor} 
          borderRadius="xl" 
          boxShadow="xl"
          borderWidth="1px"
          borderColor={borderColor}
          mb={16}
        >
          <VStack spacing={10}>
            {/* Calculator */}
            <Box width="100%">
              <Heading size="lg" mb={6} textAlign="center">
                💡 How much will you save with Jimmi?
              </Heading>
              
              <Box maxW="md" mx="auto" mb={8}>
                <Text fontWeight="medium" mb={2}>
                  Number of car finance agreements:
                </Text>
                <NumberInput 
                  value={agreements} 
                  min={1} 
                  max={10} 
                  onChange={(_, value) => setAgreements(value)}
                  size="lg"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>

              <Box
                p={6}
                bg={statBg}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <Flex direction={{ base: "column", md: "row" }} justify="space-between">
                  <Stat>
                    <StatLabel color="gray.600">Traditional Solicitor Fees</StatLabel>
                    <StatNumber fontSize="2xl" color="red.500">£{solicitorFees.toLocaleString()}</StatNumber>
                  </Stat>
                  
                  <Stat>
                    <StatLabel color="gray.600">Jimmi</StatLabel>
                    <StatNumber fontSize="2xl" color="green.500">£{jimmiPrice}</StatNumber>
                  </Stat>
                  
                  <Stat>
                    <StatLabel color="gray.600">Your Savings</StatLabel>
                    <StatNumber fontSize="2xl" color={highlightColor}>£{savings.toLocaleString()} 💸</StatNumber>
                    <StatHelpText>Over {savingsPercentage}% savings</StatHelpText>
                  </Stat>
                </Flex>
              </Box>
              
              <Text fontSize="sm" color="gray.500" textAlign="center" mt={3}>
                That's over 95% savings per claim on average compared to law firms — saving up to £1,570 per successful claim.
              </Text>
            </Box>
            
            <Divider />
            
            {/* Potential Refund */}
            <Box width="100%">
              <Heading size="lg" mb={6} textAlign="center">
                📈 Potential Claim Refund
              </Heading>
              
              <Box
                p={6}
                bg="green.50"
                borderRadius="lg"
                borderWidth="1px"
                borderColor="green.100"
                maxW="md"
                mx="auto"
              >
                <VStack spacing={3}>
                  <HStack>
                    <Text fontWeight="medium" color="gray.700">Number of Claims:</Text>
                    <Text fontWeight="bold" color="gray.700">{agreements}</Text>
                  </HStack>
                  
                  <Stat textAlign="center">
                    <StatLabel color="gray.600">Potential Refund up to</StatLabel>
                    <StatNumber 
                      fontSize="3xl" 
                      bgGradient="linear(to-r, green.400, green.600)" 
                      bgClip="text"
                    >
                      £{potentialRefund.toLocaleString()}
                    </StatNumber>
                    <StatHelpText>
                      That's an average potential refund of up to £{avgRefundPerAgreement.toLocaleString()} per agreement
                    </StatHelpText>
                  </Stat>
                </VStack>
              </Box>
            </Box>
          </VStack>
        </Box>
        
        {/* Pricing Card */}
        <Box textAlign="center" maxW="container.md" mx="auto">
          <Heading 
            as="h3" 
            size="xl" 
            mb={8}
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            💼 One Simple Price. Zero Surprises.
          </Heading>
          
          <Text fontSize="lg" mb={10} color={useColorModeValue('gray.600', 'gray.400')}>
            Worried it's not for you? Jimmi's so confident he can help, he offers a full refund if you're not satisfied. No questions asked.
          </Text>
          
          <Card
            borderRadius="xl"
            boxShadow="2xl"
            bg={bgColor}
            borderWidth="1px"
            borderColor={borderColor}
            overflow="hidden"
            position="relative"
          >
            <Box 
              bgGradient="linear(to-r, blue.400, purple.500)" 
              h="8px" 
              position="absolute" 
              top={0} 
              left={0} 
              right={0} 
            />
            
            <CardHeader pt={10}>
              <Badge colorScheme="purple" fontSize="md" p={2} borderRadius="full" mb={4}>
                One-Time Access
              </Badge>
              <Heading 
                as="h4" 
                size="2xl" 
                bgGradient="linear(to-r, blue.500, purple.600)" 
                bgClip="text"
              >
                £39.99
              </Heading>
            </CardHeader>
            
            <CardBody>
              <VStack spacing={5} align="center">
                <HStack>
                  <Icon as={FiCreditCard} color="gray.600" />
                  <Text>No hidden charges</Text>
                </HStack>
                <HStack>
                  <Icon as={FiDollarSign} color="gray.600" />
                  <Text>No success fee</Text>
                </HStack>
                <HStack>
                  <Icon as={FiShield} color="gray.600" />
                  <Text>Secure, one-off payment</Text>
                </HStack>
              </VStack>
            </CardBody>
            
            <CardFooter>
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
              >
                Start Your Claim Now
              </Button>
            </CardFooter>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Pricing; 