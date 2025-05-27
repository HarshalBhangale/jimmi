// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
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
  Badge,
  Circle,
  useBreakpointValue,
  IconButton,
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
  FiCheck,
  FiArrowLeft,
  FiLock,
  FiShield
} from 'react-icons/fi';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/jotai/atoms';


// ID document types
const idDocumentTypes = [
  {
    id: 'passport',
    name: 'Passport',
    icon: FiCompass,
    description: 'Upload your passport photo page',
    recommended: true,
  },
  {
    id: 'driving-license',
    name: 'Driving License',
    icon: FiCreditCard,
    description: 'Front and back of your UK driving license',
    recommended: false,
  }
];

const Step5 = () => {
  const [selectedIdType, setSelectedIdType] = useState('passport');
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Clean up object URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  
  // Update preview when document changes
  useEffect(() => {
    if (idDocument && idDocument.type.startsWith('image/')) {
      const url = URL.createObjectURL(idDocument);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  }, [idDocument]);

  useEffect(() => {
    if (user.identityDoc) {
      setSelectedIdType(user.identityDoc.type);
      
      // If we have a signed URL, fetch and set the document
      if (user.identityDoc.signedUrl) {
        setIsPreloading(true);
        fetch(user.identityDoc.signedUrl)
          .then(response => response.blob())
          .then(blob => {
            // Create a File object from the blob
            const file = new File([blob], 'identity-document', { type: blob.type });
            setIdDocument(file);
            
            // Create preview URL if it's an image
            if (blob.type.startsWith('image/')) {
              const url = URL.createObjectURL(blob);
              setPreviewUrl(url);
            }
          })
          .catch(error => {
            console.error('Error loading identity document:', error);
            toast({
              title: 'Error loading document',
              description: 'There was an error loading your previously uploaded document.',
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: 'top',
            });
          })
          .finally(() => {
            setIsPreloading(false);
          });
      }
    }
  }, [user.identityDoc, toast]);

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
        position: 'top',
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
        position: 'top',
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
      position: 'top',
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
        position: 'top',
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
        position: 'top',
      });
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your document. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
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
  const bgGradient = useColorModeValue(
    'linear(to-b, white, gray.50)', 
    'linear(to-b, gray.800, gray.900)'
  );

  const headingSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const iconSize = useBreakpointValue({ base: 5, md: 6 });

  return (
    <Box 
      bgGradient={bgGradient}
      minH="100vh" 
      py={{ base: 6, md: 12 }}
      px={{ base: 4, md: 6 }}
    >
      <Container maxW="container.md" px={{ base: 0, md: 4 }}>
        <Stack spacing={{ base: 6, md: 8 }}>
          {/* Progress indicator with improved spacing */}
          <Box px={{ base: 2, md: 4 }}>
            <HStack justify="space-between" mb={2}>
              <HStack>
                <Text fontSize={{ base: "sm", md: "md" }} fontWeight="semibold" color="blue.600">
                  Step 5 of 5
                </Text>
              </HStack>
              <Text fontSize={{ base: "sm", md: "md" }} color={labelColor}>
                ID Verification
              </Text>
            </HStack>
            <Progress 
              value={100} 
              size={{ base: "sm", md: "md" }} 
              colorScheme="blue" 
              borderRadius="full"
              bg={useColorModeValue('gray.100', 'gray.700')}
              sx={{
                '& > div': {
                  transition: 'width 0.5s ease-in-out'
                }
              }}
            />
          </Box>

          {/* Header */}
          <Box textAlign="center" px={{ base: 2, md: 4 }}>
            <Heading 
              as="h1" 
              size={headingSize} 
              mb={3}
              bgGradient="linear(to-r, blue.400, blue.600)" 
              bgClip="text"
            >
              Upload your ID.
            </Heading>
            <Text 
              color={labelColor} 
              fontSize={{ base: "md", md: "lg" }}
              maxW="700px"
              mx="auto"
            >
              You will need to send this to your lenders to verify your identity 

            </Text>
          </Box>
          
          {/* Security Indicator */}
          <Flex
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={4}
            borderRadius="lg"
            alignItems="center"
            boxShadow="sm"
            mx={{ base: 2, md: 4 }}
          >
            <Circle size="40px" bg={useColorModeValue('blue.100', 'blue.800')} color="blue.500" mr={4}>
              <Icon as={FiShield} boxSize={5} />
            </Circle>
            <Box>
              <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>
                Your data is secure
              </Text>
              <Text fontSize={{ base: "xs", md: "sm" }} color={labelColor}>
                All documents are encrypted and transmitted securely. We never share your ID with lenders.
              </Text>
            </Box>
          </Flex>

          {/* ID Verification Form */}
          <Box
            bg={cardBg}
            borderRadius="xl"
            boxShadow="lg"
            p={{ base: 5, md: 8 }}
            borderWidth="1px"
            borderColor={borderColor}
            mx={{ base: 2, md: 4 }}
            position="relative"
            transition="all 0.3s"
            _hover={{
              boxShadow: "xl",
            }}
          >
            <VStack spacing={{ base: 6, md: 8 }} align="stretch">
              {/* Document Type Selection */}
              <Box>
                <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }} mb={4}>
                  Select ID Document Type
                </Text>
                
                <RadioGroup onChange={setSelectedIdType} value={selectedIdType}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {idDocumentTypes.map((type) => (
                      <Box
                        key={type.id}
                        borderWidth="1px"
                        borderRadius="lg"
                        borderColor={selectedIdType === type.id ? activeBorderColor : borderColor}
                        p={{ base: 4, md: 5 }}
                        cursor="pointer"
                        onClick={() => setSelectedIdType(type.id)}
                        bg={selectedIdType === type.id ? dropzoneActiveBg : 'transparent'}
                        _hover={{ bg: selectedIdType === type.id ? dropzoneActiveBg : hoverBg }}
                        position="relative"
                        transition="all 0.2s"
                        boxShadow={selectedIdType === type.id ? "md" : "none"}
                      >
                        {type.recommended && (
                          <Badge 
                            position="absolute" 
                            top={2} 
                            right={2} 
                            colorScheme="green"
                            borderRadius="full"
                            px={2}
                            fontSize="xs"
                          >
                            Recommended
                          </Badge>
                        )}
                        <Radio 
                          value={type.id} 
                          colorScheme="blue"
                          isChecked={selectedIdType === type.id}
                        >
                          <Flex align="center" mt={type.recommended ? 2 : 0}>
                            <Circle 
                              size="40px" 
                              bg={selectedIdType === type.id 
                                ? useColorModeValue('blue.100', 'blue.800') 
                                : useColorModeValue('gray.100', 'gray.700')
                              } 
                              color={selectedIdType === type.id ? 'blue.500' : labelColor}
                              mr={3}
                            >
                              <Icon as={type.icon} boxSize={iconSize} />
                            </Circle>
                            <Box>
                              <Text fontWeight="medium" fontSize={{ base: "md", md: "lg" }}>
                                {type.name}
                              </Text>
                              <Text fontSize={{ base: "sm", md: "md" }} color={labelColor}>
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
                <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }} mb={4}>
                  Upload Your Document
                </Text>
                
                <Alert 
                  status="info" 
                  mb={5} 
                  borderRadius="md"
                  variant="left-accent"
                  borderLeftWidth="4px"
                >
                  <AlertIcon boxSize={5} />
                    <AlertDescription fontSize={{ base: "sm", md: "md" }}>
                    The ID picture must be:
                    <VStack align="start" spacing={1} mt={2} pl={4}>
                      <Text>• Clear & Valid</Text>
                      <Text>• Show all four corners completely</Text>
                      <Text>• In JPEG, PNG, or PDF format (max 10MB)</Text>
                    </VStack>
                    </AlertDescription>
                </Alert>
                
                {!idDocument ? (
                  <Box
                    borderWidth="2px"
                    borderRadius="lg"
                    borderColor={dragActive ? activeBorderColor : 'gray.200'}
                    borderStyle="dashed"
                    bg={dragActive ? dropzoneActiveBg : dropzoneBg}
                    p={{ base: 6, md: 10 }}
                    textAlign="center"
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    transition="all 0.3s"
                    _hover={{ borderColor: activeBorderColor }}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileInputChange}
                      style={{ display: 'none' }}
                      accept=".jpg,.jpeg,.png,.pdf"
                    />
                    
                    <VStack spacing={4}>
                      {isPreloading ? (
                        <>
                          <Circle 
                            size={{ base: "60px", md: "80px" }} 
                            bg={useColorModeValue('blue.100', 'blue.800')}
                            color="blue.500"
                          >
                            <Icon as={FiUpload} boxSize={{ base: 6, md: 8 }} />
                          </Circle>
                          <Text fontWeight="medium" fontSize={{ base: "md", md: "lg" }}>
                            Loading your document...
                          </Text>
                          <Progress 
                            size="xs" 
                            isIndeterminate 
                            width="200px" 
                            colorScheme="blue"
                          />
                        </>
                      ) : (
                        <>
                          <Circle 
                            size={{ base: "60px", md: "80px" }} 
                            bg={dragActive 
                              ? useColorModeValue('blue.100', 'blue.800') 
                              : useColorModeValue('gray.100', 'gray.700')
                            }
                            color={dragActive ? 'blue.500' : labelColor}
                          >
                            <Icon as={FiUpload} boxSize={{ base: 6, md: 8 }} />
                          </Circle>
                          <Text fontWeight="medium" fontSize={{ base: "md", md: "lg" }}>
                            {dragActive ? 'Drop your file here' : 'Drag and drop your file here'}
                          </Text>
                          <Text fontSize={{ base: "sm", md: "md" }} color={labelColor}>
                            Supported formats: JPEG, PNG, PDF (max 10MB)
                          </Text>
                          <Text fontSize={{ base: "xs", md: "sm" }} color={labelColor}>
                            or
                          </Text>
                          <Button
                            colorScheme="blue"
                            leftIcon={<FiUpload />}
                            onClick={() => fileInputRef.current?.click()}
                            size={{ base: "md", md: "lg" }}
                            px={8}
                            bgGradient="linear(to-r, blue.400, blue.600)"
                            _hover={{
                              bgGradient: "linear(to-r, blue.500, blue.700)",
                              transform: "translateY(-2px)",
                              boxShadow: "md",
                            }}
                            _active={{
                              bgGradient: "linear(to-r, blue.600, blue.800)",
                              transform: "translateY(0)",
                            }}
                            transition="all 0.2s"
                          >
                            Select File
                          </Button>
                        </>
                      )}
                    </VStack>
                  </Box>
                ) : (
                  <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    p={{ base: 5, md: 6 }}
                    position="relative"
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    boxShadow="sm"
                  >
                    <VStack spacing={4} align="stretch">
                      <Flex 
                        align="center" 
                        bg={cardBg} 
                        p={3} 
                        borderRadius="md"
                        borderWidth="1px"
                        borderColor={borderColor}
                      >
                        <Circle 
                          size="40px" 
                          bg={useColorModeValue('green.100', 'green.900')} 
                          color="green.500" 
                          mr={3}
                        >
                          <Icon as={FiCheckCircle} boxSize={5} />
                        </Circle>
                        <Box flex="1">
                          <Text fontWeight="medium" isTruncated>
                            {idDocument.name}
                          </Text>
                          <Text fontSize="sm" color={labelColor}>
                            {(idDocument.size / (1024 * 1024)).toFixed(2)} MB
                          </Text>
                        </Box>
                      </Flex>
                      
                      {previewUrl && (
                        <Box 
                          borderRadius="md" 
                          overflow="hidden" 
                          bg={cardBg} 
                          p={2}
                          borderWidth="1px"
                          borderColor={borderColor}
                          textAlign="center"
                        >
                          <Image
                            src={previewUrl}
                            alt="ID Document Preview"
                            maxH="200px"
                            objectFit="contain"
                            borderRadius="md"
                            mx="auto"
                          />
                          <Text fontSize="xs" color={labelColor} mt={2}>
                            Preview
                          </Text>
                        </Box>
                      )}
                      
                      {idDocument && !previewUrl && idDocument.type === 'application/pdf' && (
                        <Box 
                          borderRadius="md" 
                          overflow="hidden" 
                          bg={cardBg} 
                          p={2}
                          borderWidth="1px"
                          borderColor={borderColor}
                          textAlign="center"
                        >
                          <Circle 
                            size="60px" 
                            bg={useColorModeValue('blue.100', 'blue.800')} 
                            color="blue.500" 
                            mx="auto"
                            mb={2}
                          >
                            <Icon as={FiFileText} boxSize={6} />
                          </Circle>
                          <Text fontSize="sm" color={labelColor} mb={2}>
                            PDF Document
                          </Text>
                          <Button
                            size="sm"
                            colorScheme="blue"
                            variant="outline"
                            leftIcon={<FiFileText />}
                            onClick={() => {
                              const url = URL.createObjectURL(idDocument);
                              window.open(url, '_blank');
                            }}
                          >
                            Preview PDF
                          </Button>
                        </Box>
                      )}
                      
                      <HStack spacing={4} justify="center">
                        <Button
                          leftIcon={<FiAlertTriangle />}
                          colorScheme="red"
                          variant="outline"
                          size="md"
                          onClick={() => {
                            setIdDocument(null);
                            if (previewUrl) {
                              URL.revokeObjectURL(previewUrl);
                              setPreviewUrl(null);
                            }
                          }}
                        >
                          Remove
                        </Button>
                        
                        <Button
                          leftIcon={<FiUpload />}
                          colorScheme="blue"
                          variant="solid"
                          size="md"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Change
                        </Button>
                      </HStack>
                      
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileInputChange}
                        style={{ display: 'none' }}
                        accept=".jpg,.jpeg,.png,.pdf"
                      />
                    </VStack>
                  </Box>
                )}
              </Box>
              
              <Divider />
              
              {/* What happens next */}
              <Box>
                <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }} mb={4}>
                  What Happens Next?
                </Text>
                
                <VStack 
                  align="start" 
                  spacing={4} 
                  bg={useColorModeValue('gray.50', 'gray.800')}
                  p={4}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <HStack align="start" spacing={3}>
                    <Circle 
                      size="36px" 
                      bg={useColorModeValue('green.100', 'green.900')} 
                      color="green.500"
                      flexShrink={0}
                    >
                      <Icon as={FiCheck} boxSize={4} />
                    </Circle>
                    <Text fontSize={{ base: "md", md: "lg" }}>
                      You will be requesting the information from the lenders to verify your claim
                    </Text>
                  </HStack>
                  
                  <HStack align="start" spacing={3}>
                    <Circle 
                      size="36px" 
                      bg={useColorModeValue('green.100', 'green.900')} 
                      color="green.500"
                      flexShrink={0}
                    >
                      <Icon as={FiCheck} boxSize={4} />
                    </Circle>
                    <Text fontSize={{ base: "md", md: "lg" }}>
                      We have templates to choose from or you can build your own with guidance
                    </Text>
                  </HStack>
                  
                  <HStack align="start" spacing={3}>
                    <Circle 
                      size="36px" 
                      bg={useColorModeValue('green.100', 'green.900')} 
                      color="green.500"
                      flexShrink={0}
                    >
                      <Icon as={FiCheck} boxSize={4} />
                    </Circle>
                    <Text fontSize={{ base: "md", md: "lg" }}>
                      Once the information is returned, you will be coached on how to make your complaint in the right way
                    </Text>
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
                py={7}
                borderRadius="xl"
                fontWeight="extrabold"
                fontSize={{ base: "md", md: "lg" }}
                bgGradient="linear(to-r, blue.400, blue.600)"
                _hover={{
                  bgGradient: "linear(to-r, blue.500, blue.700)",
                  transform: "translateY(-2px)",
                  boxShadow: "xl",
                }}
                _active={{
                  bgGradient: "linear(to-r, blue.600, blue.800)",
                  transform: "translateY(0)",
                  boxShadow: "md",
                }}
                transition="all 0.3s"
              >
                Start your claim
              </Button>
            </VStack>
          </Box>
          
          {/* Trust indicators section at bottom */}
          <Box 
            mt={{ base: 4, md: 8 }} 
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
                  <Icon as={FiCheckCircle} boxSize={{ base: 5, md: 6 }} />
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
            <Flex justify="space-between" align="center" mt={4}>
              <Button
                variant="outline"
                colorScheme="blue"
                leftIcon={<FiArrowLeft />}
                onClick={() => navigate('/auth/signup/step-4')}
                size={{ base: "sm", md: "md" }}
                borderRadius="lg"
                fontWeight="medium"
                _hover={{
                  bg: useColorModeValue('blue.50', 'blue.900'),
                  transform: "translateX(-2px)",
                }}
                transition="all 0.2s"
              >
                Back
              </Button>
              </Flex>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Step5;