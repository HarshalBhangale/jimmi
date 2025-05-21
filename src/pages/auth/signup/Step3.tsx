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
} from '@chakra-ui/react';
import { FiArrowRight, FiX, FiChevronDown, FiChevronRight } from 'react-icons/fi';
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

  const LenderCard = ({ lender }: { lender: Lender }) => {
    const hasSubLenders = lender.subLenders && lender.subLenders.length > 0;
    const isExpanded = isLenderExpanded(lender._id);
    const isSelected = selectedLenders.some(l => l._id === lender._id);

    return (
      <Box>
        <Flex
          p={3}
          borderWidth="1px"
          borderRadius="md"
          alignItems="center"
          borderColor={isSelected ? selectedBorder : borderColor}
          bg={isSelected ? selectedBg : 'transparent'}
          cursor="pointer"
          onClick={() => handleToggleLender(lender)}
          transition="all 0.2s"
          _hover={{
            borderColor: selectedBorder,
            shadow: "sm"
          }}
        >
          <Checkbox
            isChecked={isSelected}
            onChange={() => handleToggleLender(lender)}
            colorScheme="blue"
            mr={3}
          />
          <Text flex="1">{lender.name}</Text>
          {hasSubLenders && (
            <IconButton
              aria-label={isExpanded ? "Collapse sublenders" : "Expand sublenders"}
              icon={isExpanded ? <FiChevronDown /> : <FiChevronRight />}
              size="sm"
              variant="ghost"
              onClick={(e) => toggleLenderExpand(lender._id, e)}
            />
          )}
        </Flex>
        
        {hasSubLenders && (
          <Collapse in={isExpanded}>
            <Box pl={8} mt={2}>
              {lender.subLenders?.map((subLender) => (
                <Flex
                  key={`${lender._id}-${subLender}`}
                  p={2}
                  alignItems="center"
                  borderLeftWidth="1px"
                  borderLeftColor={borderColor}
                  _hover={{
                    bg: selectedBg,
                  }}
                >
                  <Checkbox
                    isChecked={selectedLenders.some(l => 
                      l._id === `${lender._id}-${subLender}`
                    )}
                    onChange={() => handleToggleSubLender(lender, subLender)}
                    colorScheme="blue"
                    mr={3}
                  />
                  <Text fontSize="sm">{subLender}</Text>
                </Flex>
              ))}
            </Box>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Container maxW="container.md" py={8}>
      <Stack spacing={8}>
        {/* Progress indicator */}
        <Box>
          <HStack justify="space-between" mb={1}>
            <Text fontSize="sm" fontWeight="medium">
              Step 3 of 5 
            </Text>
            <Text fontSize="sm" color={labelColor}>
              Select Lenders
            </Text>
          </HStack>
          <Progress value={60} size="sm" colorScheme="blue" borderRadius="full" />
        </Box>

        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>
            Select Your Car Finance Lenders
          </Heading>
          <Text color={labelColor} fontSize="lg">
            Choose all lenders you've had car finance agreements with since 2007
          </Text>
        </Box>

        {/* Lenders Selection Form */}
        <Box
          bg={cardBg}
          borderRadius="xl"
          boxShadow="md"
          p={{ base: 6, md: 8 }}
          borderWidth="1px"
          borderColor={borderColor}
        >
          <VStack spacing={8} align="stretch">
            {/* Search box */}
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
            
            {/* Lenders grid */}
            <Box>
              <Text fontWeight="medium" mb={3}>
                Popular Lenders
              </Text>
              {isLoadingLenders ? (
                <Center py={8}>
                  <Spinner size="xl" color="blue.500" />
                </Center>
              ) : (
                <>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                    {paginatedLenders.map((lender) => (
                      <LenderCard key={lender._id} lender={lender} />
                    ))}
                  </SimpleGrid>
                  
                  {hasMoreLenders && (
                    <Center mt={4}>
                      <Button
                        variant="ghost"
                        rightIcon={<FiChevronDown />}
                        onClick={handleShowMore}
                        colorScheme="blue"
                      >
                        Show More Lenders
                      </Button>
                    </Center>
                  )}
                </>
              )}
            </Box>
            
            {/* Selected lenders */}
            {selectedLenders.length > 0 && (
              <Box>
                <Text fontWeight="medium" mb={3}>
                  Your Selected Lenders ({selectedLenders.length})
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                  {selectedLenders.map((lender) => (
                    <Flex
                      key={lender._id}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      alignItems="center"
                      borderColor={selectedBorder}
                      bg={selectedBg}
                      justifyContent="space-between"
                    >
                      <Text>{lender.name}</Text>
                      <IconButton
                        aria-label="Remove lender"
                        icon={<FiX />}
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleLender(lender)}
                      />
                    </Flex>
                  ))}
                </SimpleGrid>
              </Box>
            )}
            
            {/* Error message */}
            {error && (
              <Text color="red.500" textAlign="center">
                {error}
              </Text>
            )}
            
            
            <Button
              size="lg"
              colorScheme="blue"
              rightIcon={<FiArrowRight />}
              onClick={handleSubmit}
              isLoading={isLoading}
              bgGradient="linear(to-r, blue.400, blue.600)"
              _hover={{
                bgGradient: "linear(to-r, blue.500, blue.700)",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Continue to Personal Details
            </Button>
          </VStack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Step3; 