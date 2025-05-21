//@ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
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
  Radio,
  RadioGroup,
  Stack,
  Flex,
  Checkbox,
  SimpleGrid,
  Textarea,
  Divider,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { userAtom, refetchUserAtom } from '@/jotai/atoms';
import { useAtomValue, useAtom } from 'jotai';

// Template texts for different request types
const requestTemplates = {
  full_dsar: `Dear [Lender],

I am writing to make a Subject Access Request under Article 15 of the General Data Protection Regulation.

I request copies of all personal data you hold about me, including but not limited to:
1. All finance/loan agreements I have held with you
2. All personal information you hold about me
3. All credit checks, scoring, and decisioning information
4. Details of all payments made and charges applied
5. Any call recordings, correspondence, or notes related to my agreements
6. Information about how my data has been processed and shared

Please provide this information in an electronic format.

Yours faithfully,
[Full Name]`,

  key_info: `Dear [Lender],

I am writing to request key information about all finance agreements I have held with you.

Please provide the following details:
1. Agreement/contract numbers
2. Start and end dates of each agreement
3. Initial loan amounts
4. Interest rates applied
5. Total amount repaid
6. Status of the agreements (active/settled)

Thank you for your assistance.

Yours faithfully,
[Full Name]`,

  custom: '',
};

const Step6 = () => {
  const user = useAtomValue(userAtom);
  const [selectedLenders, setSelectedLenders] = useState<string[]>(
    user.lenders ? user.lenders.map((l: any) => l.id) : []
  );
  const [selectedOption, setSelectedOption] = useState<string>('full_dsar');
  const [customRequestText, setCustomRequestText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [, refetchUser] = useAtom(refetchUserAtom);

  useEffect(() => {
    if (user.lenders && user.lenders.length > 0) {
      setSelectedLenders(user.lenders.map((l: any) => l.id));
    }
  }, [user.lenders]);

  const handleToggleLender = (lenderId: string) => {
    if (selectedLenders.includes(lenderId)) {
      setSelectedLenders(selectedLenders.filter((id) => id !== lenderId));
    } else {
      setSelectedLenders([...selectedLenders, lenderId]);
    }
  };

  const getPreviewText = () => {
    // Get selected lender names
    const selectedLenderNames = user.lenders
      .filter((l: any) => selectedLenders.includes(l.id))
      .map((l: any) => l.name);

    // Get user's full name
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');

    // If custom, just return as before
    if (selectedOption === 'custom') {
      return customRequestText || 'Please enter your custom request text.';
    }

    // Replace placeholders
    let template = requestTemplates[selectedOption as keyof typeof requestTemplates];
    template = template.replace('[Lender]', selectedLenderNames.join(', '));
    template = template.replace('[Full Name]', fullName);

    return template;
  };

  const canSendRequests = selectedLenders.length > 0 && selectedOption && 
    (selectedOption !== 'custom' || customRequestText.trim().length > 0);

  const handleContinue = () => {
    if (!canSendRequests) return;
    
    setIsLoading(true);

    // Save data to localStorage
    const requestData = {
      selectedLenders,
      requestType: selectedOption,
      requestText: selectedOption === 'custom' ? customRequestText : requestTemplates[selectedOption as keyof typeof requestTemplates],
    };
    
    localStorage.setItem('documentRequestData', JSON.stringify(requestData));
    
    // Navigate to payment page
    navigate('/auth/signup/step-7');
    
    toast({
      title: 'Document requests ready',
      description: 'Please complete the payment to send your requests',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Colors
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const selectedBg = useColorModeValue('blue.50', 'blue.900');
  const selectedBorderColor = useColorModeValue('blue.500', 'blue.300');
  const lenderBg = useColorModeValue('gray.50', 'gray.800');
  const previewBg = useColorModeValue('gray.50', 'gray.800');

  useEffect(() => {
    refetchUser();
  }, []);

  const selectedLenderNames = user.lenders
    .filter((l: any) => selectedLenders.includes(l.id))
    .map((l: any) => l.name);

  return (
    <Container maxW="container.md" py={8}>
      <Stack spacing={8}>
        {/* Progress indicator */}
        <Box>
          <HStack justify="space-between" mb={1}>
            <Text fontSize="sm" fontWeight="medium">
              Step 6 of 7
            </Text>
            <Text fontSize="sm" color={labelColor}>
              Document Requests
            </Text>
          </HStack>
          <Progress value={85} size="sm" colorScheme="blue" borderRadius="full" />
        </Box>

        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>
            Request Your Documents
          </Heading>
          <Text color={labelColor} fontSize="lg">
            We'll help you request the necessary documents from your lenders
          </Text>
        </Box>

        {isLoading ? (
          <Box textAlign="center" py={12}>
            <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" mb={6} />
            <Text fontSize="lg" fontWeight="medium">Loading your claims...</Text>
          </Box>
        ) : (
          <VStack spacing={6} align="stretch">
            {/* Lender Selection */}
            <Box
              bg={cardBg}
              borderRadius="xl"
              boxShadow="md"
              p={{ base: 6, md: 8 }}
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Heading as="h3" size="lg" mb={4}>
                Your Lenders
              </Heading>
              <Text color={labelColor} mb={6}>
                Select the lenders you want to send document requests to:
              </Text>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {user.lenders.map((lender:any) => (
                  <Flex
                    key={lender.id}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    alignItems="center"
                    borderColor={selectedLenders.includes(lender.id) ? selectedBorderColor : borderColor}
                    bg={selectedLenders.includes(lender.id) ? selectedBg : 'transparent'}
                    cursor="pointer"
                    onClick={() => handleToggleLender(lender.id)}
                    transition="all 0.2s"
                    _hover={{
                      borderColor: selectedBorderColor,
                      shadow: "sm"
                    }}
                  >
                    <Checkbox
                      isChecked={selectedLenders.includes(lender.id)}
                      onChange={() => handleToggleLender(lender.id)}
                      colorScheme="blue"
                      mr={3}
                    />
                    <Text>{lender.name}</Text>
                  </Flex>
                ))}
              </SimpleGrid>
            </Box>

            {/* Request Options */}
            <Box
              bg={cardBg}
              borderRadius="xl"
              boxShadow="md"
              p={{ base: 6, md: 8 }}
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Heading as="h3" size="lg" mb={4}>
                Request Options
              </Heading>
              
              <RadioGroup onChange={setSelectedOption} value={selectedOption}>
                <VStack align="stretch" spacing={4}>
                  {/* Full DSAR Option */}
                  <Box
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={selectedOption === 'full_dsar' ? selectedBorderColor : borderColor}
                    bg={selectedOption === 'full_dsar' ? selectedBg : 'transparent'}
                    cursor="pointer"
                    onClick={() => setSelectedOption('full_dsar')}
                    transition="all 0.2s"
                  >
                    <Flex>
                      <Radio value="full_dsar" colorScheme="blue" />
                      <Box ml={3}>
                        <Text fontWeight="medium">Request all your documents</Text>
                        <Text fontSize="sm" color={labelColor} mt={1}>
                          This is a complete Subject Access Request that asks for all personal data, 
                          finance agreements, and related information.
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  
                  {/* Key Information Option */}
                  <Box
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={selectedOption === 'key_info' ? selectedBorderColor : borderColor}
                    bg={selectedOption === 'key_info' ? selectedBg : 'transparent'}
                    cursor="pointer"
                    onClick={() => setSelectedOption('key_info')}
                    transition="all 0.2s"
                  >
                    <Flex>
                      <Radio value="key_info" colorScheme="blue" />
                      <Box ml={3}>
                        <Text fontWeight="medium">Request key information</Text>
                        <Text fontSize="sm" color={labelColor} mt={1}>
                          Only requests essential agreement details like agreement numbers, 
                          dates, and loan amounts.
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  
                  {/* Custom Option */}
                  <Box
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={selectedOption === 'custom' ? selectedBorderColor : borderColor}
                    bg={selectedOption === 'custom' ? selectedBg : 'transparent'}
                    cursor="pointer"
                    onClick={() => setSelectedOption('custom')}
                    transition="all 0.2s"
                  >
                    <Flex>
                      <Radio value="custom" colorScheme="blue" />
                      <Box ml={3}>
                        <Text fontWeight="medium">Write your own</Text>
                        <Text fontSize="sm" color={labelColor} mt={1}>
                          Create a custom request that will be sent to all selected lenders.
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  
                  {/* Custom text area */}
                  {selectedOption === 'custom' && (
                    <Box mt={3} p={4} borderRadius="md" bg={lenderBg}>
                      <Textarea
                        value={customRequestText}
                        onChange={(e) => setCustomRequestText(e.target.value)}
                        placeholder="Enter your custom request text here..."
                        rows={6}
                        resize="vertical"
                      />
                    </Box>
                  )}
                </VStack>
              </RadioGroup>
            </Box>

            {/* Preview */}
            {selectedOption && selectedLenders.length > 0 && (
              <Box
                bg={cardBg}
                borderRadius="xl"
                boxShadow="md"
                p={{ base: 6, md: 8 }}
                borderWidth="1px"
                borderColor={borderColor}
              >
                <Heading as="h3" size="lg" mb={4}>
                  Preview
                </Heading>
                <Text color={labelColor} mb={6}>
                  This request will be sent to {selectedLenders.length} lender
                  {selectedLenders.length > 1 ? 's' : ''}:
                </Text>
                
                <Box p={6} bg={previewBg} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                  <Box
                    fontFamily="serif"
                    whiteSpace="pre-line"
                    p={6}
                    bg="white"
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor={borderColor}
                    boxShadow="sm"
                  >
                    {getPreviewText()}
                  </Box>
                </Box>
              </Box>
            )}

            <Divider />

            <Flex justify="space-between" mt={4}>
              <Button 
                variant="outline" 
                onClick={() => navigate('/auth/signup/step-5')}
              >
                Back
              </Button>
              <Button
                size="lg"
                colorScheme="blue"
                rightIcon={<FiArrowRight />}
                onClick={handleContinue}
                isLoading={isLoading}
                isDisabled={!canSendRequests}
                loadingText="Preparing request..."
                bgGradient="linear(to-r, blue.400, blue.600)"
                _hover={{
                  bgGradient: "linear(to-r, blue.500, blue.700)",
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Continue to Payment
              </Button>
            </Flex>
          </VStack>
        )}
      </Stack>
    </Container>
  );
};

export default Step6; 