// @ts-nocheck
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
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  useBreakpointValue,
  IconButton,
} from '@chakra-ui/react';
import { FiArrowRight, FiCheck, FiMinus, FiPlus } from 'react-icons/fi';
import { keyframes } from '@emotion/react';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Step1 = () => {
  const [numberOfAgreements, setNumberOfAgreements] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fixed costs
  const solicitorCostPerAgreement = 1620;
  const avgClaimValue = 4500;
  
  // Calculated values
  const jimmiCost = 39.99;
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

  // Visual styles
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const highlightColor = useColorModeValue('blue.50', 'blue.900');
  
  // Responsive adjustments - reduced sizes
  const headingSize = useBreakpointValue({ base: "md", md: "lg" });
  const textSize = useBreakpointValue({ base: "xs", md: "sm" });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const counterSize = useBreakpointValue({ base: "sm", md: "md" });
  const statFontSize = useBreakpointValue({ base: "xl", md: "2xl" });

  return (
    <Box 
      bg={useColorModeValue('gray.50', 'gray.900')} 
      px={{ base: 4, md: 0 }}
    >
      <Container maxW={{ base: "container.sm", md: "700px" }} py={5}>
        <Stack spacing={4} animation={`${fadeIn} 0.5s ease-out`}>
          {/* Progress indicator */}
          <Box mb={1}>
            <HStack justify="space-between" mb={1}>
              <Text fontSize="sm" fontWeight="semibold" color="blue.600">
                Step 1 of 5
              </Text>
              <Text fontSize="sm" color={labelColor}>
                Cost Calculator
              </Text>
            </HStack>
            <Progress 
              value={20} 
              size="sm" 
              colorScheme="blue" 
              borderRadius="full" 
              bg={useColorModeValue('gray.100', 'gray.700')}
            />
          </Box>

          {/* Header - more compact */}
          <Box 
            textAlign="center" 
            bg={useColorModeValue('blue.50', 'blue.900')} 
            py={4} 
            px={4} 
            borderRadius="lg" 
            borderWidth="1px"
            borderColor={useColorModeValue('blue.100', 'blue.700')}
          >
            <Heading as="h1" size={headingSize} mb={2} bgGradient="linear(to-r, blue.400, purple.500)" bgClip="text">
              Calculate Your Savings
            </Heading>
            <Text color={labelColor} fontSize="sm">
              See how much you could save compared to traditional solicitors
            </Text>
          </Box>

          {/* Main Content */}
          <Box
            bg={cardBg}
            borderRadius="lg"
            p={{ base: 4, md: 5 }}
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Stack spacing={4}>
              {/* Counter Section */}
              <Box 
                p={4} 
                borderRadius="md" 
                bg={highlightColor}
                borderWidth="1px" 
                borderColor={useColorModeValue('blue.100', 'blue.700')}
              >
                <Text 
                  fontSize="md" 
                  fontWeight="bold" 
                  textAlign="center" 
                  mb={3}
                >
                  How many car finance agreements have you had since 2007?
                </Text>
                
                <Flex 
                  maxW="220px" 
                  mx="auto" 
                  borderWidth="1px" 
                  borderRadius="md" 
                  overflow="hidden"
                  borderColor={useColorModeValue('blue.300', 'blue.500')}
                >
                  <IconButton
                    icon={<FiMinus />}
                    aria-label="Decrease agreements"
                    onClick={() => setNumberOfAgreements(Math.max(1, numberOfAgreements - 1))}
                    size="md" 
                    rounded="none" 
                    colorScheme="blue" 
                    isDisabled={numberOfAgreements <= 1}
                    variant="ghost"
                    height="44px"
                    width="50px"
                  />
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
                    textAlign="center"
                    size="lg"
                    rounded="none"
                    fontWeight="bold"
                    fontSize="2xl"
                    border="none"
                    _focus={{ borderColor: 'transparent', boxShadow: 'none' }}
                    height="44px"
                    width="100px"
                  />
                  <IconButton
                    icon={<FiPlus />}
                    aria-label="Increase agreements"
                    onClick={() => setNumberOfAgreements(numberOfAgreements + 1)}
                    size="md" 
                    rounded="none" 
                    colorScheme="blue" 
                    variant="ghost"
                    height="44px"
                    width="50px"
                  />
                </Flex>
              </Box>

              {/* Cost Cards Section */}
              <Box>
                <Text
                  fontWeight="semibold"
                  mb={3}
                  textAlign="center"
                  fontSize="md"
                  color={useColorModeValue('gray.700', 'white')}
                >
                  Your Potential Savings
                </Text>
                
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 3, sm: 4 }}>
                  {/* Solicitor Cost Card */}
                  <Box 
                    p={3}
                    borderRadius="md" 
                    bg={useColorModeValue('red.50', 'red.900')} 
                    borderWidth="1px" 
                    borderColor={useColorModeValue('red.100', 'red.700')}
                  >
                    <Stat textAlign="center">
                      <StatLabel fontSize="sm" fontWeight="semibold">
                        With Solicitors
                      </StatLabel>
                      <StatNumber fontSize={statFontSize} mt={1}>
                        £{solicitorCost.toLocaleString()}
                      </StatNumber>
                      <StatHelpText fontSize="sm" mt={0}>
                        £{solicitorCostPerAgreement.toLocaleString()}/agreement
                      </StatHelpText>
                    </Stat>
                  </Box>
                  
                  {/* Buddy Cost Card */}
                  <Box 
                    p={3}
                    borderRadius="md" 
                    bg={useColorModeValue('blue.50', 'blue.900')} 
                    borderWidth="1px" 
                    borderColor={useColorModeValue('blue.200', 'blue.600')}
                    position="relative"
                  >
                    <Badge 
                      position="absolute" 
                      top="-2" 
                      right="2" 
                      colorScheme="green" 
                      fontSize="xs" 
                      borderRadius="sm" 
                      px={1}
                    >
                      RECOMMENDED
                    </Badge>
                    <Stat textAlign="center">
                      <StatLabel fontSize="sm" fontWeight="semibold">
                        With Buddy
                      </StatLabel>
                      <StatNumber fontSize={statFontSize} mt={1}>
                        £{jimmiCost.toLocaleString()}
                      </StatNumber>
                      <StatHelpText fontSize="sm" mt={0}>
                        Fixed fee
                      </StatHelpText>
                    </Stat>
                  </Box>
                  
                  {/* Total Savings */}
                  <Box 
                    p={3}
                    borderRadius="md" 
                    bgGradient={useColorModeValue(
                      'linear(to-r, green.50, teal.50)',
                      'linear(to-r, green.900, teal.900)'
                    )}
                    borderWidth="1px" 
                    borderColor={useColorModeValue('green.100', 'green.700')}
                  >
                    <Stat textAlign="center">
                      <StatLabel fontSize="sm" fontWeight="semibold">
                        YOUR SAVINGS
                      </StatLabel>
                      <StatNumber fontSize={statFontSize} mt={1}>
                        £{totalSavings.toLocaleString()}
                      </StatNumber>
                      <Badge 
                        colorScheme="green" 
                        fontSize="sm" 
                        mt={1}
                      >
                        {percentageSavings}% savings
                      </Badge>
                    </Stat>
                  </Box>
                  
                  {/* Potential Refund */}
                  <Box 
                    p={3}
                    borderRadius="md" 
                    bgGradient={useColorModeValue(
                      'linear(to-r, purple.50, blue.50)',
                      'linear(to-r, purple.900, blue.900)'
                    )}
                    borderWidth="1px" 
                    borderColor={useColorModeValue('purple.100', 'purple.700')}
                  >
                    <Stat textAlign="center">
                      <StatLabel fontSize="sm" fontWeight="semibold">
                        EST. REFUND
                      </StatLabel>
                      <StatNumber fontSize={statFontSize} mt={1}>
                        £{potentialRefund.toLocaleString()}
                      </StatNumber>
                      <StatHelpText fontSize="sm" mt={0}>
                        Avg. value per claim
                      </StatHelpText>
                    </Stat>
                  </Box>
                </SimpleGrid>
              </Box>
              
              {/* Benefits Section */}
              <Box mt={2}>
                <Text 
                  fontWeight="semibold" 
                  mb={3} 
                  fontSize="md"
                  textAlign="center"
                >
                  Why Choose Buddy?
                </Text>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={3}>
                  {jimmiFeatures.map((feature, index) => (
                    <HStack 
                      key={index} 
                      align="start"
                      bg={useColorModeValue('gray.50', 'gray.800')}
                      borderRadius="md"
                      p={2.5}
                      borderWidth="1px"
                      borderColor={borderColor}
                    >
                      <Icon 
                        as={FiCheck} 
                        color="green.500"
                        boxSize={4} 
                        mt={0.5}
                        flexShrink={0}
                      />
                      <Text fontSize="sm" noOfLines={2}>
                        {feature}
                      </Text>
                    </HStack>
                  ))}
                </SimpleGrid>
              </Box>
              
              {/* Continue Button */}
              <Button
                size="md"
                colorScheme="blue"
                rightIcon={<FiArrowRight />}
                onClick={handleContinue}
                isLoading={isLoading}
                w="full"
                mt={2}
                py={5}
                fontSize="md"
              >
                Let's Start
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Step1;