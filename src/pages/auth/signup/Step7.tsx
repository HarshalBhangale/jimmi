/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Progress,
  useColorModeValue,
  Stack,
  Flex,
  Alert,
  AlertIcon,
  Divider,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { FiCheck, FiCreditCard } from 'react-icons/fi';
import { createPaymentIntent } from '@api/services/payments';
import { useSearchParams } from 'react-router-dom';
// Payment options
const paymentOptions = [
  {
    id: 'one_time',
    name: 'One-time Payment',
    description: 'Full access to all services with no recurring charges',
    price: 99,
  },
  {
    id: 'subscription',
    name: 'Monthly Subscription',
    description: 'Ongoing access with lower initial cost',
    price: 25,
    installments: 4,
  },
];

const Step7 = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handlePayment = async () => {
    if (!selectedOption) {
      setError('Please select a payment option');
      return;
    }

    setIsLoading(true);

    try {
      const paymentIntent = await createPaymentIntent(
        {
          amount: 99,
          type: selectedOption === 'one_time' ? 'one_time' : 'subscription',
        }
      );
      window.location.href = paymentIntent.url;
      console.log(paymentIntent);
    } catch (error) {
      console.error(error);
    }
  }

    // Colors
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const selectedBg = useColorModeValue('blue.50', 'blue.900');
  const selectedBorderColor = useColorModeValue('blue.500', 'blue.300');

  // Show payment confirmation if payment was successful
  if (isPaymentSuccess) {
    return (
      <Container maxW="container.md" py={8}>
        <VStack spacing={8} align="center" justifyContent="center" py={12}>
          <Box
            bg="green.100"
            borderRadius="full"
            p={3}
            boxSize="80px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box as={FiCheck} color="green.500" boxSize="40px" />
          </Box>
          
          <Heading textAlign="center" size="xl">
            Payment Successful
          </Heading>
          
          <Text fontSize="lg" textAlign="center" color={labelColor}>
            Your document requests have been submitted to the selected lenders.
            You'll be redirected to the confirmation page shortly.
          </Text>
          
          <Spinner color="blue.500" size="lg" />
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <Stack spacing={8}>
        {/* Progress indicator */}
        <Box>
          <HStack justify="space-between" mb={1}>
            <Text fontSize="sm" fontWeight="medium">
              Step 7 of 7
            </Text>
            <Text fontSize="sm" color={labelColor}>
              Payment
            </Text>
          </HStack>
          <Progress value={100} size="sm" colorScheme="blue" borderRadius="full" />
        </Box>

        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>
            Choose Your Payment Plan
          </Heading>
          <Text color={labelColor} fontSize="lg">
            Select how you'd like to pay for our service
          </Text>
        </Box>

        {/* Payment Options */}
        <Box
          bg={cardBg}
          borderRadius="xl"
          boxShadow="md"
          p={{ base: 6, md: 8 }}
          borderWidth="1px"
          borderColor={borderColor}
        >
          <VStack spacing={6} align="stretch">
            <Heading as="h3" size="lg" mb={2}>
              Payment Options
            </Heading>
            
            <VStack align="stretch" spacing={4}>
              {paymentOptions.map((option) => (
                <Box

                  key={option.id}
                  p={5}
                  borderWidth="1px"
                  borderRadius="md"
                  cursor="pointer"
                  borderColor={selectedOption === option.id ? selectedBorderColor : borderColor}
                  bg={selectedOption === option.id ? selectedBg : 'transparent'}
                  transition="all 0.2s"
                  onClick={() => {
                    console.log(option.id, "================");
                    setSelectedOption(option.id);
                    setError('');
                  }}
                  _hover={{
                    borderColor: selectedBorderColor,
                    transform: "translateY(-2px)",
                    boxShadow: "md",
                  }}
                >
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Text fontWeight="semibold">{option.name}</Text>
                      <Text fontSize="sm" color={labelColor}>
                        {option.description}
                      </Text>
                    </Box>
                    
                    <Box textAlign="right">
                      <Text fontWeight="bold" fontSize="xl">£{option.price}</Text>
                      {option.installments && (
                        <Text fontSize="sm" color={labelColor}>
                          {option.installments} x £{(option.price / option.installments).toFixed(2)}
                        </Text>
                      )}
                    </Box>
                  </Flex>
                </Box>
              ))}
            </VStack>
            
            {selectedOption && (
              <Box mt={4}>
                <Alert status="info" borderRadius="md">
                  <AlertIcon />
                  <Box>
                    <Text fontWeight="medium">What happens next?</Text>
                    <Text fontSize="sm">
                      After payment, we'll immediately send your document requests to all selected lenders.
                      You can track the status of your requests from your dashboard.
                    </Text>
                  </Box>
                </Alert>
              </Box>
            )}
            
            {error && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {error}
              </Alert>
            )}
            
            <Flex justify="space-between" mt={4}>
              <Button 
                variant="outline" 
                onClick={() => navigate('/auth/signup/step-6')}
              >
                Back
              </Button>
              <Button
                size="lg"
                colorScheme="blue"
                rightIcon={<FiCreditCard />}
                onClick={handlePayment}
                isLoading={isLoading}
                isDisabled={!selectedOption}
                loadingText="Processing payment..."
                bgGradient="linear(to-r, blue.400, blue.600)"
                _hover={{
                  bgGradient: "linear(to-r, blue.500, blue.700)",
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Complete Payment
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Step7; 