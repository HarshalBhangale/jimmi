import React, { useState } from 'react';
import {
  Box,
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
  Divider,
  SimpleGrid,
} from '@chakra-ui/react';

// Calculator component for the savings calculator section
const Calculator: React.FC = () => {
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
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');
  const statBg = useColorModeValue('blue.50', 'blue.900');
  
  return (
    <Box 
      p={{ base: 6, md: 10 }} 
      bg={cardBg}
      borderRadius="2xl" 
      boxShadow="xl"
      borderWidth="1px"
      borderColor={borderColor}
      mb={{ base: 16, md: 20 }}
      maxW="1100px"
      mx="auto"
      mt = {{ base: 8, md: 12 }}
    >
      <VStack spacing={12}>
        {/* Calculator */}
        <Box width="100%">
          <Heading size="lg" mb={6} textAlign="center">
            💡 How much will you save with Buddy?
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
              borderColor={borderColor}
              focusBorderColor="blue.400"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>

          <SimpleGrid 
            columns={{ base: 1, md: 3 }} 
            spacing={6} 
            bg={statBg}
            p={{ base: 6, md: 8 }}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Stat>
              <StatLabel color="gray.600">Traditional Solicitor Fees</StatLabel>
              <StatNumber fontSize="2xl" color="red.500">£{solicitorFees.toLocaleString()}</StatNumber>
              <StatHelpText>Usually 33% of your refund</StatHelpText>
            </Stat>
            
            <Stat>
              <StatLabel color="gray.600">Buddy</StatLabel>
              <StatNumber fontSize="2xl" color="green.500">£{jimmiPrice}</StatNumber>
              <StatHelpText>One-time fee</StatHelpText>
            </Stat>
            
            <Stat>
              <StatLabel color="gray.600">Your Savings upto</StatLabel>
              <StatNumber 
                fontSize="2xl" 
                bgGradient="linear(to-r, purple.500, blue.500)" 
                bgClip="text"
                fontWeight="bold"
              >
                £{savings.toLocaleString()} 💸
              </StatNumber>
              <StatHelpText>Over {savingsPercentage}% savings</StatHelpText>
            </Stat>
          </SimpleGrid>
          
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
            p={8}
            bg="green.50"
            borderRadius="xl"
            borderWidth="1px"
            borderColor="green.100"
            maxW="md"
            mx="auto"
            boxShadow="lg"
          >
            <VStack spacing={4}>
              <HStack>
                <Text fontWeight="medium" color="gray.700">Number of Claims:</Text>
                <Text fontWeight="bold" color="gray.700">{agreements}</Text>
              </HStack>
              
              <Stat textAlign="center">
                <StatLabel color="gray.600">Potential Refund up to</StatLabel>
                <StatNumber 
                  fontSize="4xl" 
                  bgGradient="linear(to-r, green.400, green.600)" 
                  bgClip="text"
                  fontWeight="extrabold"
                >
                  £{potentialRefund.toLocaleString()}
                </StatNumber>
                <StatHelpText fontSize="md">
                  That's upto £{avgRefundPerAgreement.toLocaleString()} per agreement
                </StatHelpText>
              </Stat>
            </VStack>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default Calculator; 