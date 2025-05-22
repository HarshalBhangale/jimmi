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
  useToast,
  Spinner,
  List,
  ListItem,
  ListIcon,
  Badge,
} from '@chakra-ui/react';
import { FiCheck, FiCreditCard, FiStar } from 'react-icons/fi';
import { createPaymentIntent } from '@api/services/payments';
import { useSearchParams } from 'react-router-dom';

const Step7 = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const paymentIntent = await createPaymentIntent(
        {
          amount: 3999,
          type: 'one_time',
        }
      );
      window.location.href = paymentIntent.url;
      console.log(paymentIntent);
    } catch (error) {
      console.error(error);
      setError('An error occurred while processing your payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  // Colors
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const highlightColor = useColorModeValue('blue.500', 'blue.300');

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
            Complete Your Purchase
          </Heading>
          <Text color={labelColor} fontSize="lg">
            Unlock full access to our premium service
          </Text>
        </Box>

        {/* Payment Option */}
        <Box
          bg={cardBg}
          borderRadius="xl"
          boxShadow="lg"
          p={{ base: 6, md: 8 }}
          borderWidth="2px"
          borderColor={highlightColor}
          position="relative"
          overflow="hidden"
        >
          <Badge
            position="absolute"
            top={4}
            right={-10}
            transform="rotate(45deg)"
            px={8}
            py={1}
            colorScheme="red"
            fontSize="sm"
            fontWeight="bold"
          >
            50% OFF
          </Badge>
          
          <VStack spacing={6} align="stretch">
            <Flex justify="space-between" align="center">
              <Heading as="h3" size="lg">
                Premium Plan
              </Heading>
              <Box textAlign="right">
                <Text as="s" fontSize="xl" color={labelColor}>£79.99</Text>
                <Text fontWeight="bold" fontSize="3xl" color={highlightColor}>£39.99</Text>
              </Box>
            </Flex>
            
            <List spacing={3}>
              {[
                'Full access to all services',
                'Priority document processing',
                'Dedicated customer support',
                'Comprehensive lender network',
                'Advanced analytics and insights',
              ].map((feature, index) => (
                <ListItem key={index} display="flex" alignItems="center">
                  <ListIcon as={FiStar} color={highlightColor} />
                  <Text>{feature}</Text>
                </ListItem>
              ))}
            </List>
            
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