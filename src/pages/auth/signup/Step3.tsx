//@ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Progress,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  SimpleGrid,
  Checkbox,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Spinner,
  Center,
  Collapse,
  Tag,
  Badge,
  SlideFade,
  Skeleton,
  SkeletonText,
  Icon,
  useBreakpointValue,
  Circle,
  useBreakpoint,
} from '@chakra-ui/react';
import { 
  FiArrowRight, 
  FiChevronDown, 
  FiChevronRight, 
  FiSearch, 
  FiX,
  FiBriefcase,
  FiCheckCircle,
  FiLock,
  FiClock,
  FiShield,
} from 'react-icons/fi';
import {getLenders, addLenders} from '@api/services/lender';
import { userAtom } from '@/jotai/atoms';
import { useAtomValue } from 'jotai';

interface Lender {
  _id: string;
  name: string;
  subLenders?: string[];
  major?: boolean;
}

const Step3 = () => {
  const [selectedLenders, setSelectedLenders] = useState<Lender[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [isLoadingLenders, setIsLoadingLenders] = useState(true);
  const [displayCount, setDisplayCount] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedLenders, setExpandedLenders] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const toast = useToast();
  const user = useAtomValue(userAtom);

  // Fetch lenders from API
  useEffect(() => {
    const fetchLenders = async () => {
      try {
        setIsLoadingLenders(true);
        const response = await getLenders();
        if (response?.success && Array.isArray(response.data)) {
          setLenders(response.data);
          const userLenders = user.lenders.map((lender:any)=>{
            return response.data.find((lender1:any)=> lender1._id === lender.id);
          }).filter(Boolean);
          setSelectedLenders(userLenders);
        } else {
          setError('Failed to load lenders');
          toast({
            title: "Error loading lenders",
            description: "Please try refreshing the page",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (err) {
        console.log(err, "err");
        setError('Failed to load lenders');
        toast({
          title: "Error loading lenders",
          description: "Please try refreshing the page",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoadingLenders(false);
      }
    };
    fetchLenders();
  }, [toast, user]);

  const toggleLenderExpand = (lenderId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the parent click event
    setExpandedLenders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(lenderId)) {
        newSet.delete(lenderId);
      } else {
        newSet.add(lenderId);
      }
      return newSet;
    });
  };

  const handleToggleLender = (lender: Lender, isSubLender: boolean = false) => {
    if (selectedLenders.some(l => l._id === lender._id)) {
      setSelectedLenders(selectedLenders.filter((l) => l._id !== lender._id));
    } else {
      setSelectedLenders([...selectedLenders, lender]);
    }
    
    if (error) setError('');
  };

  const handleToggleSubLender = (parentLender: Lender, subLenderName: string) => {
    const subLender: Lender = {
      _id: `${parentLender._id}-${subLenderName}`,
      name: subLenderName,
    };

    handleToggleLender(subLender, true);
  };

  const isLenderExpanded = (lenderId: string) => expandedLenders.has(lenderId);

  // Filter lenders based on search query and pagination
  const filteredLenders = searchQuery
    ? lenders.filter((lender) => 
        lender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lender.subLenders?.some(sub => 
          sub.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : lenders;

  const paginatedLenders = filteredLenders.slice(0, displayCount);
  const hasMoreLenders = filteredLenders.length > displayCount;

  const handleShowMore = () => {
    if (displayCount === 6) {
      setDisplayCount(15);
    } else {
      setDisplayCount(displayCount + 15);
    }
  };

  const handleSubmit = async () => {
    // Validate at least one lender is selected
    if (selectedLenders.length === 0) {
      setError('Please select at least one lender');
      return;
    }
    
    const response = await addLenders(selectedLenders.map(lender => lender._id));
    if (response?.success) {
      navigate('/auth/signup/step-4');
    } else {
      setError('Failed to add lenders');
    }
    
    setIsLoading(true);
    
    // Navigate to next step
    setTimeout(() => {
      setIsLoading(false);
      navigate('/auth/signup/step-4');
    }, 800);
  };

  // Card and text colors
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const selectedBg = useColorModeValue('blue.50', 'blue.900');
  const selectedBorder = useColorModeValue('blue.500', 'blue.300');

  // Enhanced LenderCard component with fixed height
  const LenderCard = ({ lender }: { lender: Lender }) => {
    const hasSubLenders = lender.subLenders && lender.subLenders.length > 0;
    const isExpanded = isLenderExpanded(lender._id);
    const isSelected = selectedLenders.some(l => l._id === lender._id);

    return (
      <Box 
        height="100%"
        display="flex"
        flexDirection="column"
      >
        <Flex
          p={{ base: 3, md: 4 }}
          borderWidth="1px"
          borderRadius="lg"
          alignItems="center"
          borderColor={isSelected ? selectedBorder : borderColor}
          bg={isSelected ? selectedBg : 'transparent'}
          cursor="pointer"
          onClick={() => handleToggleLender(lender)}
          transition="all 0.2s"
          _hover={{
            borderColor: selectedBorder,
            shadow: "md",
            transform: "translateY(-2px)",
          }}
          position="relative"
          height="60px" // Fixed height for consistency
        >
          <Checkbox
            isChecked={isSelected}
            onChange={() => handleToggleLender(lender)}
            colorScheme="blue"
            mr={3}
            size="lg"
            borderColor={useColorModeValue('blue.300', 'blue.500')}
          />
          <Text 
            flex="1" 
            fontWeight={isSelected ? "semibold" : "medium"}
            color={isSelected ? useColorModeValue('blue.600', 'blue.300') : undefined}
            isTruncated // Ensure text doesn't break layout
          >
            {lender.name}
          </Text>
          {lender.major && (
            <Tag 
              size="sm" 
              colorScheme="blue" 
              borderRadius="full" 
              mr={2}
              display={{ base: "none", md: "flex" }}
            >
              Popular
            </Tag>
          )}
          {hasSubLenders && (
            <IconButton
              aria-label={isExpanded ? "Collapse sublenders" : "Expand sublenders"}
              icon={isExpanded ? <FiChevronDown /> : <FiChevronRight />}
              size="sm"
              variant="ghost"
              onClick={(e) => toggleLenderExpand(lender._id, e)}
              color={isSelected ? "blue.500" : undefined}
            />
          )}
        </Flex>
        
        {hasSubLenders && (
          <SlideFade in={isExpanded} offsetY={-10}>
            <Box pl={8} mt={2}>
              {lender.subLenders?.map((subLender) => (
                <Flex
                  key={`${lender._id}-${subLender}`}
                  p={3}
                  alignItems="center"
                  borderLeftWidth="1px"
                  borderLeftColor={borderColor}
                  _hover={{
                    bg: selectedBg,
                    transform: "translateX(5px)",
                  }}
                  transition="all 0.2s"
                  borderRadius="md"
                  mb={1}
                  height="40px" // Fixed height for sublenders
                >
                  <Checkbox
                    isChecked={selectedLenders.some(l => 
                      l._id === `${lender._id}-${subLender}`
                    )}
                    onChange={() => handleToggleSubLender(lender, subLender)}
                    colorScheme="blue"
                    mr={3}
                  />
                  <Text fontSize="sm" fontWeight="medium" isTruncated>{subLender}</Text>
                </Flex>
              ))}
            </Box>
          </SlideFade>
        )}
      </Box>
    );
  };

  return (
    <Box 
      bgGradient={useColorModeValue('linear(to-b, white, gray.50)', 'linear(to-b, gray.800, gray.900)')}
      color={useColorModeValue('gray.800', 'white')}
      display="flex"
      minH="100vh" 
      py={{ base: 6, md: 12 }}
      px={{ base: 4, md: 6 }}
    >
      <Container maxW="container.md" px={{ base: 0, md: 4 }}>
        <Stack spacing={{ base: 6, md: 8 }}>
          {/* Progress indicator with improved spacing */}
          <Box px={{ base: 2, md: 4 }} mt={{ base: 6, md: 8 }}>
            <HStack justify="space-between" mb={2}>
              <HStack>
                <Text fontSize={{ base: "sm", md: "md" }} fontWeight="semibold" color="blue.600">
                  Step 3 of 5 
                </Text>
              </HStack>
            </HStack>
            <Progress 
              value={60} 
              size={{ base: "sm", md: "md" }} 
              colorScheme="blue" 
              borderRadius="full"
              bg={useColorModeValue('gray.100', 'gray.700')}
              sx={{
                '& > div': {
                  transition: 'width 0.5s ease-in-out'
                }
              }}
              mb={1}
            />
          </Box>

          {/* Header */}
          <Box textAlign="center">
            <Heading as="h1" size={useBreakpointValue({ base: "lg", md: "xl" })} mb={2}>
              Select Your Lenders
            </Heading>
            <Text color={labelColor} fontSize={{ base: "md", md: "lg" }}>
              The lenders you see have been involved in the scandal, if your lender is missing. It's unlikely you have a claim.
            </Text>
          </Box>

          {/* Lenders Selection Form */}
          <Box
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="2xl"
            p={{ base: 6, md: 8 }}
            borderWidth="1px"
            borderColor={borderColor}
            position="relative"
            overflow="hidden"
            _hover={{
              boxShadow: "2xl",
              transform: "translateY(-4px)",
            }}
            transition="all 0.3s ease"
          >
            {/* Decorative background elements */}
            <Box 
              position="absolute" 
              top="-50px" 
              right="-50px" 
              w="200px" 
              h="200px" 
              bg={useColorModeValue('blue.50', 'blue.800')} 
              borderRadius="full" 
              opacity="0.3" 
              zIndex={0} 
            />

            <VStack spacing={8} align="stretch" position="relative" zIndex={1}>
              {/* Enhanced Search box */}
              <FormControl>
                <FormLabel fontWeight="medium">Search Lenders</FormLabel>
                <InputGroup size="lg">
                  <Input
                    placeholder="Type to search lenders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="Clear search"
                      icon={<FiX />}
                      size="sm"
                      variant="ghost"
                      onClick={() => setSearchQuery('')}
                      visibility={searchQuery ? 'visible' : 'hidden'}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              
              {/* Enhanced Lenders grid with equal-height items */}
              <Box>
                <Flex 
                  justify="space-between" 
                  align="center" 
                  mb={4}
                >
                  <HStack>
                    <Icon as={FiBriefcase} color="blue.500" boxSize={5} />
                    <Text 
                      fontWeight="bold" 
                      fontSize={{ base: "lg", md: "xl" }}
                      color={useColorModeValue('gray.800', 'white')}
                    >
                      Popular Lenders
                    </Text>
                  </HStack>
                  {selectedLenders.length > 0 && (
                    <Badge 
                      colorScheme="blue" 
                      fontSize="sm" 
                      borderRadius="full" 
                      px={3} 
                      py={1}
                    >
                      {selectedLenders.length} selected
                    </Badge>
                  )}
                </Flex>

                {isLoadingLenders ? (
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {[...Array(6)].map((_, i) => (
                      <Box key={i} p={4} borderWidth="1px" borderRadius="lg" borderColor={borderColor} height="60px">
                        <Skeleton height="24px" width="70%" mb={2} />
                        <SkeletonText noOfLines={1} spacing="4" />
                      </Box>
                    ))}
                  </SimpleGrid>
                ) : (
                  <>
                    <SimpleGrid 
                      columns={{ base: 1, md: 2 }} 
                      spacing={4} 
                      alignItems="stretch"
                    >
                      {paginatedLenders.map((lender) => (
                        <Box 
                          key={lender._id} 
                          height={isLenderExpanded(lender._id) && lender.subLenders?.length ? "auto" : "60px"}
                        >
                          <LenderCard lender={lender} />
                        </Box>
                      ))}
                    </SimpleGrid>
                    
                    {hasMoreLenders && (
                      <Center mt={6}>
                        <Button
                          variant="outline"
                          colorScheme="blue"
                          rightIcon={<FiChevronDown />}
                          onClick={handleShowMore}
                          size="lg"
                          fontWeight="medium"
                          borderRadius="xl"
                          borderWidth="2px"
                          _hover={{
                            bg: useColorModeValue('blue.50', 'blue.900'),
                            transform: "translateY(-2px)",
                            boxShadow: "md",
                          }}
                          transition="all 0.2s"
                        >
                          Show More Lenders
                        </Button>
                      </Center>
                    )}
                  </>
                )}
              </Box>
              
              {/* Enhanced Selected lenders with fixed-height cards */}
              {selectedLenders.length > 0 && (
                <Box 
                  mt={4} 
                  p={{ base: 4, md: 6 }} 
                  borderRadius="xl" 
                  bg={useColorModeValue('blue.50', 'blue.900')}
                  borderWidth="1px"
                  borderColor={useColorModeValue('blue.100', 'blue.700')}
                >
                  <HStack mb={4}>
                    <Icon as={FiCheckCircle} color="green.500" boxSize={5} />
                    <Text 
                      fontWeight="bold" 
                      fontSize={{ base: "md", md: "lg" }}
                    >
                      Your Selected Lenders ({selectedLenders.length})
                    </Text>
                  </HStack>
                  <SimpleGrid 
                    columns={{ base: 1, md: 2 }} 
                    spacing={3}
                    alignItems="stretch"
                  >
                    {selectedLenders.map((lender) => (
                      <Flex
                        key={lender._id}
                        p={3}
                        borderWidth="1px"
                        borderRadius="lg"
                        alignItems="center"
                        borderColor={useColorModeValue('blue.200', 'blue.600')}
                        bg={useColorModeValue('white', 'gray.750')}
                        justifyContent="space-between"
                        _hover={{
                          transform: "translateY(-2px)",
                          boxShadow: "md",
                        }}
                        transition="all 0.2s"
                        height="auto" // Changed from fixed 60px to auto height
                        minHeight="60px" // Keep minimum height for consistency
                        py={4} // Add more padding vertically
                      >
                        <Text 
                          fontWeight="medium"
                          color={useColorModeValue('blue.600', 'blue.300')}
                          noOfLines={2} // Allow up to 2 lines instead of 1
                          maxW="90%" // Increased from 80% to give more space for text
                          mr={2} // Add right margin to prevent overlap with the close button
                          wordBreak="break-word" // Allow long words to break
                        >
                          {lender.name}
                        </Text>
                        <IconButton
                          aria-label="Remove lender"
                          icon={<FiX />}
                          size="sm"
                          variant="ghost"
                          onClick={() => handleToggleLender(lender)}
                          colorScheme="red"
                          borderRadius="full"
                          flexShrink={0} // Prevent button from shrinking
                        />
                      </Flex>
                    ))}
                  </SimpleGrid>
                </Box>
              )}
              
              {/* Error message */}
              {error && (
                <Text 
                  color="red.500" 
                  textAlign="center" 
                  bg="red.50" 
                  p={3} 
                  borderRadius="lg"
                  fontWeight="medium"
                >
                  {error}
                </Text>
              )}
              
              {/* CTA Button */}
              <Button
                size="lg"
                colorScheme="blue"
                rightIcon={<FiArrowRight />}
                onClick={handleSubmit}
                isLoading={isLoading}
                bgGradient="linear(to-r, blue.400, blue.600)"
                py={7}
                borderRadius="xl"
                fontWeight="extrabold"
                fontSize={{ base: "md", md: "lg" }}
                boxShadow="xl"
                _hover={{
                  bgGradient: "linear(to-r, blue.500, blue.700)",
                  transform: "translateY(-4px)",
                  boxShadow: "2xl",
                }}
                _active={{
                  bgGradient: "linear(to-r, blue.600, blue.800)",
                  transform: "translateY(0)",
                  boxShadow: "md",
                }}
                transition="all 0.3s"
              >
                Continue to Personal Details
              </Button>
            </VStack>
          </Box>
          {/* Trust indicators section */}
              <Box 
                mt={{ base: 10, md: 16 }} 
                mb={{ base: 6, md: 8 }}
                px={{ base: 2, md: 4 }}
              >
                <SimpleGrid 
                  columns={{ base: 1, sm: 3 }} 
                  spacing={{ base: 8, md: 10 }}
                  textAlign="center"
                >
                  {/* Secure */}
                  <VStack spacing={3}>
                    <Circle 
                      size={{ base: "50px", md: "60px" }} 
                      bg="purple.50" 
                      color="purple.500"
                    >
                      <Icon as={FiLock} boxSize={{ base: 5, md: 6 }} />
                    </Circle>
                    <Text 
                      fontWeight="bold" 
                      fontSize={{ base: "lg", md: "xl" }}
                    >
                      Secure
                    </Text>
                    <Text 
                      color={labelColor} 
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      Your information is 100% safe & secure
                    </Text>
                  </VStack>

                  {/* Quick */}
                  <VStack spacing={3}>
                    <Circle 
                      size={{ base: "50px", md: "60px" }} 
                      bg="blue.50" 
                      color="blue.500"
                    >
                      <Icon as={FiClock} boxSize={{ base: 5, md: 6 }} />
                    </Circle>
                    <Text 
                      fontWeight="bold" 
                      fontSize={{ base: "lg", md: "xl" }}
                    >
                      Quick
                    </Text>
                    <Text 
                      color={labelColor} 
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      It takes 2 mins to complete this form
                    </Text>
                  </VStack>

                  {/* Trusted */}
                  <VStack spacing={3}>
                    <Circle 
                      size={{ base: "50px", md: "60px" }} 
                      bg="green.50" 
                      color="green.500"
                    >
                      <Icon as={FiShield} boxSize={{ base: 5, md: 6 }} />
                    </Circle>
                    <Text 
                      fontWeight="bold" 
                      fontSize={{ base: "lg", md: "xl" }}
                    >
                      Trusted
                    </Text>
                    <Text 
                      color={labelColor} 
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      1000s of people trust us help them claim
                    </Text>
                  </VStack>
                </SimpleGrid>
              </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Step3;