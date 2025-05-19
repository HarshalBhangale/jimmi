// @ts-nocheck
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addIdentityDocument } from '@/api/services/profile';
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Progress,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  Flex,
  SimpleGrid,
  Radio,
  RadioGroup,
  Icon,
  useToast,
  Image,
  Divider,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { 
  FiArrowRight, 
  FiUpload, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiCreditCard, 
  FiUser, 
  FiFileText, 
  FiCompass,
  FiCheck
} from 'react-icons/fi';

// ID document types
const idDocumentTypes = [
  {
    id: 'passport',
    name: 'Passport',
    icon: FiCompass,
    description: 'Upload your passport photo page',
  },
  {
    id: 'driving-license',
    name: 'Driving License',
    icon: FiCreditCard,
    description: 'Front and back of your UK driving license',
  }
];

const Step5 = () => {
  const [selectedIdType, setSelectedIdType] = useState('passport');
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Handle file selection via input
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Validate and process the file
  const handleFile = (file: File) => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a JPEG, PNG, or PDF file',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Maximum file size is 10MB',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    // Set the file
    setIdDocument(file);
    
    toast({
      title: 'File uploaded',
      description: `${file.name} has been uploaded successfully`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate document upload
    if (!idDocument) {
      toast({
        title: 'Document required',
        description: 'Please upload your identification document',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Upload document to backend
      await addIdentityDocument({
        type: selectedIdType,
        document: idDocument
      });
      
      // Navigate to Step 6
      navigate('/auth/signup/step-6');
      
      // Show success toast
      toast({
        title: 'ID verification complete',
        description: 'Your ID has been verified. Now let\'s request documents from your lenders.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your document. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate colors based on theme
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const activeBorderColor = useColorModeValue('blue.500', 'blue.300');
  const hoverBg = useColorModeValue('gray.50', 'gray.600');
  const dropzoneBg = useColorModeValue('gray.50', 'gray.800');
  const dropzoneActiveBg = useColorModeValue('blue.50', 'blue.900');

  return (
    <Container maxW="container.md" py={8}>
      <Stack spacing={8}>
        {/* Progress indicator */}
        <Box>
          <HStack justify="space-between" mb={1}>
            <Text fontSize="sm" fontWeight="medium">
              Step 5 of 5
            </Text>
            <Text fontSize="sm" color={labelColor}>
              ID Verification
            </Text>
          </HStack>
          <Progress value={100} size="sm" colorScheme="blue" borderRadius="full" />
        </Box>

        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>
            Verify Your Identity
          </Heading>
          <Text color={labelColor} fontSize="lg">
            To complete your account setup, please upload a valid ID document
          </Text>
        </Box>

        {/* ID Verification Form */}
        <Box
          bg={cardBg}
          borderRadius="xl"
          boxShadow="md"
          p={{ base: 6, md: 8 }}
          borderWidth="1px"
          borderColor={borderColor}
        >
          <VStack spacing={8} align="stretch">
            {/* Document Type Selection */}
            <Box>
              <Text fontWeight="medium" fontSize="lg" mb={4}>
                Select ID Document Type
              </Text>
              
              <RadioGroup onChange={setSelectedIdType} value={selectedIdType}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {idDocumentTypes.map((type) => (
                    <Box
                      key={type.id}
                      borderWidth="1px"
                      borderRadius="md"
                      borderColor={selectedIdType === type.id ? activeBorderColor : borderColor}
                      p={4}
                      cursor="pointer"
                      onClick={() => setSelectedIdType(type.id)}
                      bg={selectedIdType === type.id ? dropzoneActiveBg : 'transparent'}
                      _hover={{ bg: selectedIdType === type.id ? dropzoneActiveBg : hoverBg }}
                      transition="all 0.2s"
                    >
                      <Radio value={type.id} colorScheme="blue">
                        <Flex align="center">
                          <Icon as={type.icon} boxSize={5} mr={3} />
                          <Box>
                            <Text fontWeight="medium">{type.name}</Text>
                            <Text fontSize="sm" color={labelColor}>
                              {type.description}
                            </Text>
                          </Box>
                        </Flex>
                      </Radio>
                    </Box>
                  ))}
                </SimpleGrid>
              </RadioGroup>
            </Box>
            
            <Divider />
            
            {/* Upload Section */}
            <Box>
              <Text fontWeight="medium" fontSize="lg" mb={3}>
                Upload Your Document
              </Text>
              
              <Alert status="info" mb={4} borderRadius="md">
                <AlertIcon />
                <AlertDescription fontSize="sm">
                  Your document must be clearly visible and all information must be legible. We accept JPEG, PNG, and PDF formats (max 10MB).
                </AlertDescription>
              </Alert>
              
              {!idDocument ? (
                <Box
                  borderWidth="2px"
                  borderRadius="md"
                  borderColor={dragActive ? activeBorderColor : 'gray.200'}
                  borderStyle="dashed"
                  bg={dragActive ? dropzoneActiveBg : dropzoneBg}
                  p={8}
                  textAlign="center"
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  transition="all 0.2s"
                  _hover={{ borderColor: activeBorderColor }}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  
                  <VStack spacing={3}>
                    <Icon as={FiUpload} boxSize={8} color={dragActive ? 'blue.500' : 'gray.400'} />
                    <Text fontWeight="medium">Drag and drop your file here or click to browse</Text>
                    <Text fontSize="sm" color={labelColor}>
                      Supported formats: JPEG, PNG, PDF (max 10MB)
                    </Text>
                    <Button
                      mt={2}
                      colorScheme="blue"
                      leftIcon={<FiUpload />}
                      onClick={() => fileInputRef.current?.click()}
                      size="md"
                    >
                      Select File
                    </Button>
                  </VStack>
                </Box>
              ) : (
                <Box
                  borderWidth="1px"
                  borderRadius="md"
                  p={4}
                  position="relative"
                >
                  <VStack spacing={3} align="stretch">
                    <Flex align="center">
                      <Icon as={FiCheckCircle} color="green.500" boxSize={5} mr={2} />
                      <Text fontWeight="medium" flex="1" isTruncated>
                        {idDocument.name}
                      </Text>
                      <Text fontSize="sm" color={labelColor}>
                        {(idDocument.size / (1024 * 1024)).toFixed(2)} MB
                      </Text>
                    </Flex>
                    
                    {idDocument.type.startsWith('image/') && URL.createObjectURL(idDocument) && (
                      <Image
                        src={URL.createObjectURL(idDocument)}
                        alt="ID Document Preview"
                        maxH="200px"
                        objectFit="contain"
                        borderRadius="md"
                        mx="auto"
                      />
                    )}
                    
                    <HStack>
                      <Button
                        leftIcon={<FiAlertTriangle />}
                        colorScheme="red"
                        variant="outline"
                        size="sm"
                        onClick={() => setIdDocument(null)}
                      >
                        Remove
                      </Button>
                      
                      <Button
                        leftIcon={<FiUpload />}
                        colorScheme="blue"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change
                      </Button>
                    </HStack>
                  </VStack>
                </Box>
              )}
            </Box>
            
            <Divider />
            
            {/* What happens next */}
            <Box>
              <Text fontWeight="medium" fontSize="lg" mb={3}>
                What Happens Next?
              </Text>
              
              <VStack align="start" spacing={3}>
                <HStack align="start">
                  <Icon as={FiCheck} color="green.500" mt={1} />
                  <Text>We'll create your account and link it to your uploaded documents</Text>
                </HStack>
                
                <HStack align="start">
                  <Icon as={FiCheck} color="green.500" mt={1} />
                  <Text>You'll be able to track your claims progress from your dashboard</Text>
                </HStack>
                
                <HStack align="start">
                  <Icon as={FiCheck} color="green.500" mt={1} />
                  <Text>Our team will prepare and submit your claims to your selected lenders</Text>
                </HStack>
              </VStack>
            </Box>
            
            {/* Submit Button */}
            <Button
              size="lg"
              colorScheme="blue"
              rightIcon={<FiArrowRight />}
              onClick={handleSubmit}
              isLoading={isLoading}
              isDisabled={!idDocument}
              loadingText="Verifying..."
              bgGradient="linear(to-r, blue.400, blue.600)"
              _hover={{
                bgGradient: "linear(to-r, blue.500, blue.700)",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Complete Registration
            </Button>
          </VStack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Step5; 