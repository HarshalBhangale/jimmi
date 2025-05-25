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
  Badge,
} from '@chakra-ui/react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { userAtom, refetchUserAtom } from '@/jotai/atoms';
import { useAtomValue, useAtom } from 'jotai';
import { updateProfile } from '@/api/services/profile';

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
  const [currentLenderIndex, setCurrentLenderIndex] = useState(0);
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

  const navigateToNextLender = () => {
    if (currentLenderIndex < selectedLenders.length - 1) {
      setCurrentLenderIndex(currentLenderIndex + 1);
    }
  };

  const navigateToPreviousLender = () => {
    if (currentLenderIndex > 0) {
      setCurrentLenderIndex(currentLenderIndex - 1);
    }
  };

  // Add this function to update custom text for specific lenders
const handleCustomTextChange = (text: string) => {
  // Create a map for custom texts if it doesn't exist
  if (!customRequestText) {
    const initialTexts = {};
    selectedLenders.forEach(lenderId => {
      // Find lender name
      const lender = user.lenders.find((l: any) => l.id === lenderId);
      const lenderName = lender ? lender.name : 'Unknown lender';
      // Initial template with lender name already inserted
      const template = `Dear ${lenderName},\n\n[Your custom request here]\n\nYours faithfully,\n${[user.firstName, user.lastName].filter(Boolean).join(' ')}`;
      initialTexts[lenderId] = template;
    });
    setCustomRequestText(JSON.stringify(initialTexts));
  }

  // Update the text for the current lender
  const currentLenderId = selectedLenders[currentLenderIndex];
  if (currentLenderId) {
    const customTexts = customRequestText ? JSON.parse(customRequestText) : {};
    customTexts[currentLenderId] = text;
    setCustomRequestText(JSON.stringify(customTexts));
  }
};

// Modify getPreviewText to handle custom texts for each lender
const getPreviewText = () => {
  // For custom option, return the custom text for the current lender
  if (selectedOption === 'custom') {
    const currentLenderId = selectedLenders[currentLenderIndex];
    if (!currentLenderId) {
      return 'Please select a lender to write a custom request.';
    }
    
    try {
      const customTexts = customRequestText ? JSON.parse(customRequestText) : {};
      if (customTexts[currentLenderId]) {
        return customTexts[currentLenderId];
      }
      
      // If no text exists for this lender, create an initial template
      const lender = user.lenders.find((l: any) => l.id === currentLenderId);
      const lenderName = lender ? lender.name : 'Unknown lender';
      return `Dear ${lenderName},\n\n[Your custom request here]\n\nYours faithfully,\n${[user.firstName, user.lastName].filter(Boolean).join(' ')}`;
    } catch (e) {
      return 'Please enter your custom request text.';
    }
  }

  // For standard templates
  let template = requestTemplates[selectedOption as keyof typeof requestTemplates];
  
  // Use only the current lender
  const currentLenderId = selectedLenders[currentLenderIndex];
  const currentLender = user.lenders.find((l: any) => l.id === currentLenderId);
  
  // Get user's full name
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
  
  // Replace placeholders for the current lender
  template = template.replace('[Lender]', currentLender ? currentLender.name : '');
  template = template.replace('[Full Name]', fullName);

  return template;
};

  const canSendRequests = selectedLenders.length > 0 && selectedOption && 
    (selectedOption !== 'custom' || customRequestText.trim().length > 0);

  const handleContinue = async () => {
    if (!canSendRequests) return;
    
    setIsLoading(true);

    // Save data to localStorage
    const requestData = {
      selectedLenders,
      requestType: selectedOption,
      requestText: selectedOption === 'custom' ? customRequestText : requestTemplates[selectedOption as keyof typeof requestTemplates],
    };
    
    localStorage.setItem('documentRequestData', JSON.stringify(requestData));
    await updateProfile({
      requestDocmentForLenders: selectedLenders,
    });

    
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
  <Box maxW="1200px" mx="auto" py={4} px={{ base: 4, md: 6 }} h="100%" display="flex" flexDir="column">
    {/* Progress indicator - more compact */}
    <Box mb={4}>
      <HStack justify="space-between" mb={1}>
        <Text fontSize="sm" fontWeight="medium">
          Step 6 of 7
        </Text>
        <Text fontSize="sm" color={labelColor}>
          Document Requests
        </Text>
      </HStack>
      <Progress 
        value={85} 
        size="sm" 
        colorScheme="blue" 
        borderRadius="full"
        bg={useColorModeValue('gray.100', 'gray.700')}
      />
    </Box>

    {isLoading ? (
      <Flex 
        flex="1" 
        align="center" 
        justify="center"
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="md"
        bg={cardBg}
        minH="300px"
      >
        <VStack>
          <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" />
          <Text fontSize="lg" fontWeight="medium" mt={4}>Loading your claims...</Text>
        </VStack>
      </Flex>
    ) : (
      <Flex direction="column" h="100%" justifyContent="space-between" flex="1">
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} w="full" flexGrow={1}>
          {/* Left Column */}
          <VStack spacing={4} align="stretch">
            {/* Lender Selection - more compact */}
            <Box
              bg={cardBg}
              borderRadius="md"
              boxShadow="sm"
              p={4}
              borderWidth="1px"
              borderColor={borderColor}
              transition="all 0.2s"
              _hover={{ shadow: "md" }}
              flex="1"
            >
              <Heading as="h3" size="md" mb={2} display="flex" alignItems="center">
                <Box 
                  bg="blue.500" 
                  w={1} 
                  h={5} 
                  borderRadius="sm" 
                  mr={3} 
                  display="inline-block"
                />
                Your Lenders
              </Heading>
              <Text color={labelColor} mb={3} fontSize="sm">
                Select the lenders you want to send document requests to:
              </Text>

              <Box
                p={2.5}
                bg="blue.500"
                color="white"
                borderRadius="md"
                mb={3}
                textAlign="center"
                boxShadow="sm"
                position="relative"
                overflow="hidden"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'shimmer 2s infinite',
                }}
                sx={{
                  "@keyframes shimmer": {
                    "0%": { backgroundPosition: '0% 0%' },
                    "100%": { backgroundPosition: '200% 200%' }
                  }
                }}
              >
                <Text fontWeight="medium" display="flex" alignItems="center" justifyContent="center">
                  <Box as="span" mr={1}>✨</Box>
                  Don't worry, we have all the correct answers emails ready to go!
                  <Box as="span" ml={1}>✨</Box>
                </Text>
              </Box>
              
              {/* More compact lender list with scrollbar for many lenders */}
              <Box 
                maxH="160px" 
                overflowY="auto" 
                px={1} 
                py={1}
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "6px",
                    borderRadius: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: `rgba(0, 0, 0, 0.1)`,
                    borderRadius: "6px",
                  },
                  // Enable momentum scrolling on iOS
                  WebkitOverflowScrolling: "touch"
                }}
              >
                <VStack align="stretch" spacing={2}>
                  {user.lenders.map((lender:any) => (
                    <Flex
                      key={lender.id}
                      p={2.5}
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
                        size="md"
                      />
                      <Text fontWeight="medium">{lender.name}</Text>
                    </Flex>
                  ))}
                </VStack>
              </Box>
            </Box>

            {/* Request Options - more compact */}
            <Box
              bg={cardBg}
              borderRadius="md"
              boxShadow="sm"
              p={4}
              borderWidth="1px"
              borderColor={borderColor}
              transition="all 0.2s"
              _hover={{ shadow: "md" }}
            >
              <Heading as="h3" size="md" mb={2} display="flex" alignItems="center">
                <Box 
                  bg="blue.500" 
                  w={1} 
                  h={5} 
                  borderRadius="sm" 
                  mr={3} 
                  display="inline-block"
                />
                Request Options
              </Heading>
              
              <RadioGroup onChange={setSelectedOption} value={selectedOption}>
                <VStack align="stretch" spacing={2}>
                  {/* Request options with improved design */}
                  <Box
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={selectedOption === 'full_dsar' ? selectedBorderColor : borderColor}
                    bg={selectedOption === 'full_dsar' ? selectedBg : 'transparent'}
                    cursor="pointer"
                    onClick={() => setSelectedOption('full_dsar')}
                    transition="all 0.2s"
                    _hover={{
                      borderColor: selectedBorderColor,
                      shadow: "sm"
                    }}
                  >
                    <Flex alignItems="flex-start">
                      <Radio 
                        value="full_dsar" 
                        colorScheme="blue" 
                        mt={0.5}
                        size="md"
                      />
                      <Box ml={2.5}>
                        <Text fontWeight="medium" fontSize="sm">Request all your documents</Text>
                        <Text fontSize="xs" color={labelColor} mt={0.5}>
                          Complete Subject Access Request for all personal data and agreements
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  
                  <Box
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={selectedOption === 'key_info' ? selectedBorderColor : borderColor}
                    bg={selectedOption === 'key_info' ? selectedBg : 'transparent'}
                    cursor="pointer"
                    onClick={() => setSelectedOption('key_info')}
                    transition="all 0.2s"
                    _hover={{
                      borderColor: selectedBorderColor,
                      shadow: "sm"
                    }}
                  >
                    <Flex alignItems="flex-start">
                      <Radio 
                        value="key_info" 
                        colorScheme="blue" 
                        mt={0.5}
                        size="md"
                      />
                      <Box ml={2.5}>
                        <Text fontWeight="medium" fontSize="sm">Request key information</Text>
                        <Text fontSize="xs" color={labelColor} mt={0.5}>
                          Only essential agreement details like numbers, dates, and amounts
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  
                  <Box
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={selectedOption === 'custom' ? selectedBorderColor : borderColor}
                    bg={selectedOption === 'custom' ? selectedBg : 'transparent'}
                    cursor="pointer"
                    onClick={() => setSelectedOption('custom')}
                    transition="all 0.2s"
                    _hover={{
                      borderColor: selectedBorderColor,
                      shadow: "sm"
                    }}
                  >
                    <Flex alignItems="flex-start">
                      <Radio 
                        value="custom" 
                        colorScheme="blue" 
                        mt={0.5}
                        size="md"
                      />
                      <Box ml={2.5}>
                        <Text fontWeight="medium" fontSize="sm">Write your own</Text>
                        <Text fontSize="xs" color={labelColor} mt={0.5}>
                          Create custom requests for each lender
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </VStack>
              </RadioGroup>
            </Box>
          </VStack>

          {/* Right Column - Preview */}
          {selectedOption && selectedLenders.length > 0 && (
            <Box
              bg={cardBg}
              borderRadius="md"
              boxShadow="sm"
              p={4}
              borderWidth="1px"
              borderColor={borderColor}
              display="flex"
              flexDirection="column"
              position="relative"
              transition="all 0.2s"
              _hover={{ shadow: "md" }}
              overflow="hidden"
              mb={{ base: 4, md: 0 }}
              h="100%"
            >
              <Box mb={4}>
                <Heading as="h3" size="md" mb={2} display="flex" alignItems="center">
                  <Box 
                    bg="blue.500" 
                    w={1} 
                    h={5} 
                    borderRadius="sm" 
                    mr={3} 
                    display="inline-block"
                  />
                  {selectedOption === 'custom' ? 'Write Your Email' : 'Preview'}
                </Heading>
                
                {/* Lender navigation controls - more compact */}
                <Flex justify="space-between" align="center" mb={2}>
                  <Badge colorScheme="blue" px={2} py={1} borderRadius="md">
                    {selectedLenders.length > 1 ? 
                      `Lender ${currentLenderIndex + 1} of ${selectedLenders.length}` : 
                      'Preview'}
                  </Badge>
                  
                  {selectedLenders.length > 1 && (
                    <HStack spacing={1}>
                      <Button
                        size="xs"
                        variant="ghost"
                        leftIcon={<FiArrowLeft />}
                        onClick={navigateToPreviousLender}
                        isDisabled={currentLenderIndex === 0}
                        colorScheme="blue"
                        borderRadius="full"
                        px={2}
                      >
                        Prev
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        rightIcon={<FiArrowRight />}
                        onClick={navigateToNextLender}
                        isDisabled={currentLenderIndex === selectedLenders.length - 1}
                        colorScheme="blue"
                        borderRadius="full"
                        px={2}
                      >
                        Next
                      </Button>
                    </HStack>
                  )}
                </Flex>
                
                {/* Current lender name - enhanced */}
                <Box 
                  mb={3} 
                  p={2} 
                  bg="blue.50" 
                  color="blue.700"
                  borderRadius="md"
                  fontWeight="medium"
                  borderWidth="1px"
                  borderColor="blue.100"
                  position="relative"
                  overflow="hidden"
                  _after={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '5px',
                    height: '100%',
                    bg: 'blue.500',
                  }}
                  pl={4}
                >
                  {(() => {
                    const currentLenderId = selectedLenders[currentLenderIndex];
                    const currentLender = user.lenders.find((l: any) => l.id === currentLenderId);
                    return currentLender ? currentLender.name : 'Unknown lender';
                  })()}
                </Box>
              </Box>
              
              {/* Document preview/edit area - fills available space */}
              <Box 
                flex="1"
                borderRadius="md" 
                borderWidth="1px" 
                borderColor={borderColor}
                bg={previewBg}
                p={1}
                shadow="sm"
                position="relative"
                display="flex"
                flexDirection="column"
                minH="250px"
                maxH={{ base: "350px", md: "none" }}
              >
                {selectedOption === 'custom' ? (
                  <Textarea
                    value={getPreviewText()}
                    onChange={(e) => handleCustomTextChange(e.target.value)}
                    fontFamily="serif"
                    p={3}
                    bg="white"
                    borderRadius="md"
                    fontSize="sm"
                    borderWidth="1px"
                    borderColor="gray.100"
                    flex="1"
                    resize="none"
                    _focus={{
                      borderColor: "blue.300",
                      boxShadow: "0 0 0 1px var(--chakra-colors-blue-300)"
                    }}
                    sx={{
                      "&::-webkit-scrollbar": {
                        width: "6px",
                        borderRadius: "6px",
                        backgroundColor: `rgba(0, 0, 0, 0.05)`,
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: `rgba(0, 0, 0, 0.1)`,
                        borderRadius: "6px",
                      },
                      // Enable momentum scrolling on iOS
                      WebkitOverflowScrolling: "touch"
                    }}
                  />
                ) : (
                  <Box
                    fontFamily="serif"
                    whiteSpace="pre-line"
                    p={3}
                    bg="white"
                    borderRadius="md"
                    fontSize="sm"
                    borderWidth="1px"
                    borderColor="gray.100"
                    boxShadow="inner"
                    overflowY="auto"
                    flex="1"
                    sx={{
                      "&::-webkit-scrollbar": {
                        width: "6px",
                        borderRadius: "6px",
                        backgroundColor: `rgba(0, 0, 0, 0.05)`,
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: `rgba(0, 0, 0, 0.1)`,
                        borderRadius: "6px",
                      },
                      // Enable momentum scrolling on iOS
                      WebkitOverflowScrolling: "touch"
                    }}
                  >
                    {getPreviewText()}
                  </Box>
                )}
              </Box>
              
              {/* Lender navigation dots - more compact */}
              {selectedLenders.length > 1 && (
                <Flex mt={2} justify="center">
                  {selectedLenders.map((_, index) => (
                    <Box
                      key={index}
                      w={2}
                      h={2}
                      borderRadius="full"
                      bg={index === currentLenderIndex ? "blue.500" : "gray.200"}
                      mx={0.5}
                      cursor="pointer"
                      onClick={() => setCurrentLenderIndex(index)}
                      transition="all 0.2s"
                    />
                  ))}
                </Flex>
              )}
            </Box>
          )}
        </SimpleGrid>

        {/* Navigation Buttons - fixed at the bottom with proper spacing */}
        <Flex 
          justify="space-between" 
          mt={4}
          py={4}
          borderTopWidth="1px"
          borderTopColor={borderColor}
          bg={cardBg}
          w="full"
        >
          <Button 
            variant="outline" 
            onClick={() => navigate('/auth/signup/step-5')}
            size={{ base: "sm", md: "md" }}
            leftIcon={<FiArrowLeft />}
            borderRadius="md"
            _hover={{
              bg: useColorModeValue('gray.100', 'gray.700'),
              transform: "translateX(-2px)"
            }}
            transition="all 0.2s"
          >
            Back
          </Button>
          <Button
            size={{ base: "sm", md: "md" }}
            colorScheme="blue"
            rightIcon={<FiArrowRight />}
            onClick={handleContinue}
            isLoading={isLoading}
            isDisabled={!canSendRequests}
            px={{ base: 4, md: 6 }}
            borderRadius="md"
            fontWeight="medium"
            _hover={{
              transform: "translateX(2px)"
            }}
            transition="all 0.2s"
            boxShadow="md"
            bgGradient="linear(to-r, blue.500, blue.600)"
            _active={{
              bgGradient: "linear(to-r, blue.600, blue.700)"
            }}
          >
            Verify my claim
          </Button>
        </Flex>
      </Flex>
    )}
  </Box>
);
};

export default Step6;