import { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  useColorModeValue,
  SimpleGrid,
  Checkbox,
  Spinner,
  Center,
  InputGroup,
  InputRightElement,
  IconButton,
  VStack,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { FiX, FiPlus, FiSearch } from 'react-icons/fi';

// Mock API call, replace with actual API call
const getLenders = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data
  return {
    success: true,
    data: [
      { _id: '1', name: 'Black Horse' },
      { _id: '2', name: 'Barclays Partner Finance' },
      { _id: '3', name: 'Santander Consumer Finance' },
      { _id: '4', name: 'Motonovo Finance' },
      { _id: '5', name: 'Close Brothers' },
      { _id: '6', name: 'BMW Financial Services' },
      { _id: '7', name: 'Mercedes-Benz Financial Services' },
      { _id: '8', name: 'Volkswagen Financial Services' },
      { _id: '9', name: 'Toyota Financial Services' },
      { _id: '10', name: 'Ford Credit' },
      { _id: '11', name: 'Honda Finance' },
      { _id: '12', name: 'Nissan Finance' },
    ]
  };
};

interface Lender {
  _id: string;
  name: string;
}

interface AddLenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLenders: (lenders: Lender[]) => Promise<void>;
  existingLenders?: Lender[];
}

const AddLenderModal: React.FC<AddLenderModalProps> = ({
  isOpen,
  onClose,
  onAddLenders,
  existingLenders = [],
}) => {
  const [selectedLenders, setSelectedLenders] = useState<Lender[]>(existingLenders);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [isLoadingLenders, setIsLoadingLenders] = useState(true);

  // Fetch lenders on modal open
  useEffect(() => {
    if (isOpen) {
      fetchLenders();
    }
  }, [isOpen]);

  const fetchLenders = async () => {
    try {
      setIsLoadingLenders(true);
      const response = await getLenders();
      if (response?.success && Array.isArray(response.data)) {
        setLenders(response.data);
      } else {
        setError('Failed to load lenders');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load lenders');
    } finally {
      setIsLoadingLenders(false);
    }
  };

  // Filter lenders based on search query
  const filteredLenders = searchQuery
    ? lenders.filter((lender) => 
        lender.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : lenders;

  const handleToggleLender = (lender: Lender) => {
    if (selectedLenders.some(l => l._id === lender._id)) {
      setSelectedLenders(selectedLenders.filter((l) => l._id !== lender._id));
    } else {
      setSelectedLenders([...selectedLenders, lender]);
    }
    
    // Clear any error when user selects a lender
    if (error) setError('');
  };

  const handleSubmit = async () => {
    // Validate at least one lender is selected
    if (selectedLenders.length === 0) {
      setError('Please select at least one lender');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await onAddLenders(selectedLenders);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to add lenders');
    } finally {
      setIsLoading(false);
    }
  };

  // UI colors
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const selectedBg = useColorModeValue('blue.50', 'blue.900');
  const selectedBorder = useColorModeValue('blue.500', 'blue.300');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
      <ModalContent borderRadius="xl" bg={cardBg}>
        <ModalHeader borderBottomWidth="1px" borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="bold">Add Lenders</Text>
          <Text color={labelColor} fontSize="sm" mt={1}>
            Select the lenders you have agreements with
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody py={6}>
          <VStack spacing={6} align="stretch">
            {/* Selected lenders tags */}
            {selectedLenders.length > 0 && (
              <Box>
                <Text fontWeight="medium" mb={2}>Selected ({selectedLenders.length})</Text>
                <Flex wrap="wrap" gap={2}>
                  {selectedLenders.map(lender => (
                    <Tag 
                      key={lender._id}
                      size="lg"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="blue"
                    >
                      <TagLabel>{lender.name}</TagLabel>
                      <TagCloseButton onClick={() => handleToggleLender(lender)} />
                    </Tag>
                  ))}
                </Flex>
              </Box>
            )}
            
            {/* Search box */}
            <FormControl>
              <FormLabel fontWeight="medium">Search Lenders</FormLabel>
              <InputGroup size="md">
                <Input
                  placeholder="Type to search lenders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  borderColor={borderColor}
                />
                <InputRightElement>
                  {searchQuery ? (
                    <IconButton
                      aria-label="Clear search"
                      icon={<FiX />}
                      size="sm"
                      variant="ghost"
                      onClick={() => setSearchQuery('')}
                    />
                  ) : (
                    <FiSearch color="gray.500" />
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>
            
            {/* Lenders grid */}
            <Box>
              <Text fontWeight="medium" mb={3}>
                Available Lenders
              </Text>
              
              {isLoadingLenders ? (
                <Center py={8}>
                  <Spinner size="xl" color="blue.500" />
                </Center>
              ) : filteredLenders.length === 0 ? (
                <Center py={8}>
                  <Text color={labelColor}>No lenders found matching "{searchQuery}"</Text>
                </Center>
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                  {filteredLenders.map((lender) => (
                    <Flex
                      key={lender._id}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      alignItems="center"
                      borderColor={selectedLenders.some(l => l._id === lender._id) ? selectedBorder : borderColor}
                      bg={selectedLenders.some(l => l._id === lender._id) ? selectedBg : 'transparent'}
                      cursor="pointer"
                      onClick={() => handleToggleLender(lender)}
                      transition="all 0.2s"
                      _hover={{
                        borderColor: selectedBorder,
                        shadow: "sm"
                      }}
                    >
                      <Checkbox
                        isChecked={selectedLenders.some(l => l._id === lender._id)}
                        onChange={() => {}}
                        colorScheme="blue"
                        mr={3}
                      />
                      <Text>{lender.name}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              )}
            </Box>
            
            {/* Error message */}
            {error && (
              <Text color="red.500" textAlign="center">
                {error}
              </Text>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button 
            colorScheme="blue" 
            onClick={handleSubmit}
            isLoading={isLoading}
            loadingText="Adding"
            leftIcon={<FiPlus />}
          >
            Add Selected Lenders
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddLenderModal; 