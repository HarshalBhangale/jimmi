import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Progress,
  SimpleGrid,
  Flex,
  Icon,
  Badge,
  VStack,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
} from '@chakra-ui/react';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

const Step1 = () => {
  const [numberOfAgreements, setNumberOfAgreements] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fixed costs
  
  const solicitorCostPerAgreement = 1620;
  const avgClaimValue = 4500;
  
  // Calculated values
  const jimmiCost = 25;
  const solicitorCost = numberOfAgreements * solicitorCostPerAgreement;
  const totalSavings = solicitorCost - jimmiCost;
  const percentageSavings = Math.round((totalSavings / solicitorCost) * 100);
  const potentialRefund = numberOfAgreements * avgClaimValue;

  const handleContinue = () => {
    setIsLoading(true);
    
    // Store calculator data
    const calculatorData = {
      numberOfAgreements,
      jimmiCost,
      solicitorCost,
      totalSavings,
      potentialRefund
    };
    
    localStorage.setItem('calculatorData', JSON.stringify(calculatorData));
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/auth/signup/step-2');
    }, 500);
  };

  // Benefits
  const jimmiFeatures = [
    'Save an average of £1,535 in legal fees',
    '95% cheaper than signing up to a law firm',
    '98% receives the same result',
    'Full control over your claims',
    'Direct communication with lenders',
    'Transparent process and updates'
  ];

  // Calculate label text color based on theme
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Container maxW="container.md" py={8}>
      <Stack spacing={8}>
        {/* Progress indicator */}
        <Box>
          <HStack justify="space-between" mb={1}>
            <Text fontSize="sm" fontWeight="medium">
              Step 1 of 5
            </Text>
            <Text fontSize="sm" color={labelColor}>
              Cost Calculator
            </Text>
          </HStack>
          <Progress value={20} size="sm" colorScheme="blue" borderRadius="full" />
        </Box>

        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>
            Calculate Your Potential Savings
          </Heading>
          <Text color={labelColor} fontSize="lg">
            See how much you could save by using Jimmi instead of traditional solicitors
          </Text>
        </Box>

        {/* Calculator */}
        <Box
          bg={cardBg}
          borderRadius="xl"
          boxShadow="md"
          p={{ base: 6, md: 8 }}
          borderWidth="1px"
          borderColor={borderColor}
        >
          {/* Counter Section */}
          <Stack spacing={8}>
            <Box>
              <Text 
                fontSize="lg" 
                fontWeight="medium" 
                textAlign="center" 
                mb={4}
              >
                How many car finance agreements have you had since 2007?
              </Text>
              
              <Flex 
                maxW="xs" 
                mx="auto" 
                borderWidth="1px" 
                borderRadius="md" 
                overflow="hidden"
                borderColor={borderColor}
              >
                <Button 
                  onClick={() => setNumberOfAgreements(Math.max(1, numberOfAgreements - 1))}
                  size="lg" 
                  rounded="none" 
                  colorScheme="blue" 
                  variant="outline"
                  borderRight="none"
                  fontSize="xl"
                  disabled={numberOfAgreements <= 1}
                >
                  -
                </Button>
                <Input 
                  type="number" 
                  value={numberOfAgreements}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value > 0) {
                      setNumberOfAgreements(value);
                    }
                  }}
                  min="1"
                  max="10"
                  textAlign="center"
                  size="lg"
                  rounded="none"
                  fontWeight="bold"
                  borderColor={borderColor}
                />
                <Button 
                  onClick={() => setNumberOfAgreements(numberOfAgreements + 1)}
                  size="lg" 
                  rounded="none" 
                  colorScheme="blue" 
                  variant="outline"
                  borderLeft="none"
                  fontSize="xl"
                >
                  +
                </Button>
              </Flex>
            </Box>

            {/* Results Section */}
            <Box>
              <Heading as="h3" size="md" mb={4} textAlign="center">
                Your Potential Savings
              </Heading>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {/* Solicitor Cost Card */}
                <Box 
                  p={4} 
                  borderRadius="lg" 
                  bg="red.50" 
                  borderWidth="1px" 
                  borderColor="red.100"
                >
                  <Stat>
                    <StatLabel color="red.700" fontWeight="medium">With Traditional Solicitors</StatLabel>
                    <StatNumber color="red.600" fontSize="3xl">£{solicitorCost.toLocaleString()}</StatNumber>
                    <StatHelpText color="red.700">£{solicitorCostPerAgreement.toLocaleString()} per agreement</StatHelpText>
                  </Stat>
                </Box>
                
                {/* Jimmi Cost Card */}
                <Box 
                  p={4} 
                  borderRadius="lg" 
                  bg="blue.50" 
                  borderWidth="1px" 
                  borderColor="blue.100"
                  position="relative"
                >
                  <Badge 
                    position="absolute" 
                    top="-3" 
                    right="4" 
                    colorScheme="green" 
                    fontSize="xs" 
                    borderRadius="full" 
                    px={2}
                  >
                    Recommended
                  </Badge>
                  <Stat>
                    <StatLabel color="blue.700" fontWeight="medium">With Jimmi</StatLabel>
                    <StatNumber color="blue.600" fontSize="3xl">£{jimmiCost.toLocaleString()}</StatNumber>
                    <StatHelpText color="blue.700">Fixed fee per agreement</StatHelpText>
                  </Stat>
                </Box>
              </SimpleGrid>
              
              {/* Total Savings */}
              <Box 
                mt={6} 
                p={4} 
                borderRadius="lg" 
                bg="green.50" 
                borderWidth="1px" 
                borderColor="green.100"
              >
                <Stat textAlign="center">
                  <StatLabel color="green.700" fontWeight="medium">Your Total Savings</StatLabel>
                  <StatNumber color="green.600" fontSize="3xl">
                    £{totalSavings.toLocaleString()} ({percentageSavings}% savings)
                  </StatNumber>
                  <StatHelpText color="green.700">
                    By using Jimmi instead of traditional solicitors
                  </StatHelpText>
                </Stat>
              </Box>
              
              {/* Potential Refund */}
              <Box 
                mt={6} 
                p={4} 
                borderRadius="lg" 
                bgGradient="linear(to-r, purple.50, blue.50)" 
                borderWidth="1px" 
                borderColor="purple.100"
              >
                <Stat textAlign="center">
                  <StatLabel color="purple.700" fontWeight="medium">Estimated Total Refund</StatLabel>
                  <StatNumber color="purple.600" fontSize="3xl">£{potentialRefund.toLocaleString()}</StatNumber>
                  <StatHelpText color="purple.700">
                    Based on average claim value per agreement
                  </StatHelpText>
                </Stat>
              </Box>
            </Box>
            
            {/* Benefits */}
            <Box>
              <Divider my={4} />
              <Heading as="h3" size="md" mb={4} textAlign="center">
                Why Choose Jimmi?
              </Heading>
              <VStack align="start" spacing={3}>
                {jimmiFeatures.map((feature, index) => (
                  <HStack key={index} align="start">
                    <Icon as={FiCheck} color="green.500" mt={1} />
                    <Text>{feature}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
            
            {/* Continue Button */}
            <Button
              size="lg"
              colorScheme="blue"
              rightIcon={<FiArrowRight />}
              onClick={handleContinue}
              isLoading={isLoading}
              bgGradient="linear(to-r, blue.400, blue.600)"
              _hover={{
                bgGradient: "linear(to-r, blue.500, blue.700)",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Continue to Mobile Verification
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Step1; 