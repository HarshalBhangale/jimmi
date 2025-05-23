// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  InputGroup,
  PinInput,
  PinInputField,
  Progress,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  useToast,
  Select,
  useBreakpointValue,
  Circle,
  Icon,
  Image,
  InputLeftAddon,
  ScaleFade,
  SlideFade,
  chakra,
  shouldForwardProp,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { FiCheck, FiSend, FiShield, FiSmartphone } from 'react-icons/fi';
import { isValidMotionProp, motion } from 'framer-motion';
import { generateOtp, verifyOtp } from '../../../api/services/auth';
import { AxiosError } from 'axios';
import { refetchUserAtom } from '@/jotai/atoms';
import { useAtom } from 'jotai';

// Create animated components
const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

// List of common country codes with ISO country codes
const countryCodes = [
  { code: '+44', country: 'GB' },
];

const Step2: React.FC = () => {
  const [countryCode, setCountryCode] = useState('+44');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const [, refetchUser] = useAtom(refetchUserAtom);
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleSendOtp = async () => {
    setError('');
    if (!phoneNumber) {
      setError('Please enter your phone number');
      toast({
        title: 'Error',
        description: 'Please enter your phone number',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Validate phone number format
    const phoneRegex = /^(0?7\d{9}|7\d{9})$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Please enter a valid UK mobile number');
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid UK mobile number',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSendingOtp(true);
    try {
      const formattedPhoneNumber = phoneNumber.startsWith('0') ? phoneNumber.slice(1) : phoneNumber;
      const fullPhoneNumber = `${countryCode}${formattedPhoneNumber}`;
      const response = await generateOtp(fullPhoneNumber);
      
      if (response.success) {
        setIsOtpSent(true);
        setCountdown(60);
        toast({
          title: 'OTP Sent',
          description: 'Please check your phone for the verification code',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        setError(response.message || 'Failed to send OTP');
        toast({
          title: 'Error',
          description: response.message || 'Failed to send OTP',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || 'Failed to send OTP';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    if (!otp) {
      setError('Please enter the OTP');
      toast({
        title: 'Error',
        description: 'Please enter the OTP code',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Validate OTP format
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError('Please enter a valid 6-digit OTP');
      toast({
        title: 'Invalid OTP',
        description: 'Please enter a valid 6-digit OTP',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsVerifying(true);
    try {
      const formattedPhoneNumber = phoneNumber.startsWith('0') ? phoneNumber.slice(1) : phoneNumber;
      const fullPhoneNumber = `${countryCode}${formattedPhoneNumber}`;
      const response = await verifyOtp(fullPhoneNumber, otp);
      
      if (response.success) {
        // Store user data and token in localStorage
        if (response.data?.token && response.data?.user) {
          localStorage.setItem('access_token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        toast({
          title: 'Mobile Verification Successful',
          description: 'Your mobile number has been verified successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        await refetchUser();
        setTimeout(() => {
          navigate("/auth/signup/step-3");
        }, 1000);
      } else {
        setError(response.message || 'Invalid OTP');
        toast({
          title: 'Verification Failed',
          description: response.message || 'Invalid OTP code. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || 'Failed to verify OTP';
      setError(errorMessage);
      toast({
        title: 'Verification Failed',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  // Enhanced visual elements
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const bgColor = useColorModeValue(
    'linear(to-b, white, gray.50)', 
    'linear(to-b, gray.900, gray.800)'
  );
  const fieldBg = useColorModeValue('gray.50', 'gray.700');
  
  const headingSize = useBreakpointValue({ base: "lg", md: "xl" });
  const textSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box 
      bgGradient={bgColor}
      minH="100vh" 
      py={{ base: 6, md: 12 }}
      px={{ base: 4, md: 6 }}
    >
      <Container maxW="container.md" px={{ base: 0, md: 4 }}>
        <Stack spacing={{ base: 6, md: 8 }}>
          {/* Enhanced Progress indicator */}
          <Box px={{ base: 2, md: 4 }} mt={8}>
            <HStack justify="space-between" mb={2}>
              <HStack>
                <Text fontSize={textSize} fontWeight="semibold" color="blue.600">
                  Step 2 of 5
                </Text>
              </HStack>
              <Text fontSize={textSize} color={labelColor}>
                Mobile Verification
              </Text>
            </HStack>
            <Progress 
              value={40} 
              size="md" 
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

          {/* Enhanced Header */}
          <Box 
            textAlign="center" 
            py={8} 
            px={{ base: 4, md: 6 }}
            borderRadius="2xl" 
            boxShadow="xl"
            bgGradient={useColorModeValue(
              'linear(to-br, blue.50, purple.50)', 
              'linear(to-br, blue.900, purple.800)'
            )}
            borderWidth="1px"
            borderColor={useColorModeValue('blue.100', 'purple.700')}
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              backgroundImage: 
                'radial-gradient(circle, rgba(255,255,255,0.1) 8%, transparent 8%), ' +
                'radial-gradient(circle, rgba(255,255,255,0.1) 8%, transparent 8%)',
              backgroundSize: '30px 30px',
              backgroundPosition: '0 0, 15px 15px',
              opacity: 0.5,
              pointerEvents: 'none',
            }}
          >
            <Box position="relative">
              <Heading
                as="h1" 
                size={headingSize}
                mb={3} 
                bgGradient="linear(to-r, blue.400, purple.500)"
                bgClip="text"
                textTransform="capitalize"
                letterSpacing="tight"
              >
                Let's get your account set up!
              </Heading>
              <Text 
                color={labelColor} 
                fontSize={textSize}
                maxW="md" 
                mx="auto"
              >
                We'll send a verification code to confirm your mobile number
              </Text>
            </Box>
          </Box>

          {/* Verification Form with enhanced layout */}
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
            <Box 
              position="absolute" 
              bottom="-30px" 
              left="-30px" 
              w="150px" 
              h="150px" 
              bg={useColorModeValue('purple.50', 'purple.800')} 
              borderRadius="full" 
              opacity="0.2" 
              zIndex={0} 
            />

            <Stack spacing={8} position="relative" zIndex={1}>
              {!isOtpSent ? (
                <ScaleFade initialScale={0.9} in={true}>
                  <VStack spacing={8} align="stretch">
                    <Flex direction={{ base: "column", md: "row" }} align="center" mb={4}>
                      <Circle size="60px" bg="blue.500" color="white" mr={{ base: 0, md: 4 }} mb={{ base: 4, md: 0 }}>
                        <Icon as={FiSmartphone} boxSize={6} />
                      </Circle>
                      <Box>
                        <Text fontWeight="bold" fontSize="lg" mb={1}>Enter Your Mobile Number</Text>
                        <Text color={labelColor}>We'll send a verification code to this number</Text>
                      </Box>
                    </Flex>
                    
                    <FormControl isInvalid={!!error}>
                      <FormLabel fontWeight="medium">Mobile Number</FormLabel>
                      <InputGroup size="lg">
                        <InputLeftAddon 
                          bg={useColorModeValue('blue.50', 'blue.800')}
                          color={useColorModeValue('blue.600', 'blue.300')}
                          px={4}
                          borderLeftRadius="xl"
                          borderColor={useColorModeValue('blue.200', 'blue.600')}
                          fontWeight="bold"
                        >
                          +44
                        </InputLeftAddon>
                        <Input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 11) {
                              setPhoneNumber(value);
                            }
                            if (error) {
                              setError('');
                            }
                          }}
                          placeholder="7xxx xxxxxx"
                          borderLeftRadius="0"
                          borderRightRadius="xl"
                          fontSize="lg"
                          bg={fieldBg}
                          _focus={{
                            borderColor: "blue.400",
                            boxShadow: "0 0 0 1px blue.400",
                          }}
                        />
                      </InputGroup>
                      {error && (
                        <FormErrorMessage>{error}</FormErrorMessage>
                      )}
                    </FormControl>

                    <Button
                      size="lg"
                      colorScheme="blue"
                      isLoading={isSendingOtp}
                      loadingText="Sending..."
                      onClick={handleSendOtp}
                      width="full"
                      rightIcon={<FiSend />}
                      bgGradient="linear(to-r, blue.400, blue.600)"
                      py={7}
                      borderRadius="xl"
                      fontWeight="bold"
                      boxShadow="xl"
                      _hover={{
                        bgGradient: "linear(to-r, blue.500, blue.700)",
                        transform: "translateY(-2px)",
                        boxShadow: "2xl",
                      }}
                      _active={{
                        bgGradient: "linear(to-r, blue.600, blue.800)",
                        transform: "translateY(0)",
                        boxShadow: "md",
                      }}
                      transition="all 0.3s"
                    >
                      Send Code
                    </Button>
                  </VStack>
                </ScaleFade>
              ) : (
                <SlideFade in={isOtpSent} offsetY="20px">
                  <VStack spacing={8} align="stretch">
                    <Box 
                      textAlign="center" 
                      bg={useColorModeValue('blue.50', 'blue.900')} 
                      p={{ base: 4, md: 6 }} 
                      borderRadius="xl"
                      borderWidth="1px"
                      borderColor={useColorModeValue('blue.100', 'blue.700')}
                    >
                      <Circle 
                        size="60px" 
                        bg={useColorModeValue('blue.100', 'blue.800')} 
                        color="blue.500" 
                        mx="auto" 
                        mb={3}
                      >
                        <Icon as={FiShield} boxSize={6} />
                      </Circle>
                      <Text fontWeight="bold" fontSize="lg" mb={1}>
                        Enter the 6-digit code sent to
                      </Text>
                      <Text 
                        fontWeight="bold" 
                        fontSize="xl" 
                        color={useColorModeValue('blue.600', 'blue.300')}
                      >
                        +44 {phoneNumber}
                      </Text>
                    </Box>
                    
                    <FormControl isInvalid={!!error} textAlign="center">
                      <ChakraBox
                        animate={{
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      >
                        <HStack justify="center" spacing={{ base: 2, md: 4 }}>
                          <PinInput
                            size="lg"
                            otp
                            value={otp}
                            onChange={(value) => {
                              setOtp(value);
                              if (error) {
                                setError('');
                              }
                            }}
                          >
                            <PinInputField 
                              bg={fieldBg}
                              borderColor={borderColor}
                              h={{ base: "50px", md: "60px" }}
                              w={{ base: "40px", md: "50px" }}
                              fontSize="xl"
                              _focus={{
                                borderColor: "blue.400",
                                boxShadow: "0 0 0 1px blue.400",
                              }}
                            />
                            <PinInputField 
                              bg={fieldBg}
                              borderColor={borderColor}
                              h={{ base: "50px", md: "60px" }}
                              w={{ base: "40px", md: "50px" }}
                              fontSize="xl"
                              _focus={{
                                borderColor: "blue.400",
                                boxShadow: "0 0 0 1px blue.400",
                              }}
                            />
                            <PinInputField 
                              bg={fieldBg}
                              borderColor={borderColor}
                              h={{ base: "50px", md: "60px" }}
                              w={{ base: "40px", md: "50px" }}
                              fontSize="xl"
                              _focus={{
                                borderColor: "blue.400",
                                boxShadow: "0 0 0 1px blue.400",
                              }}
                            />
                            <PinInputField 
                              bg={fieldBg}
                              borderColor={borderColor}
                              h={{ base: "50px", md: "60px" }}
                              w={{ base: "40px", md: "50px" }}
                              fontSize="xl"
                              _focus={{
                                borderColor: "blue.400",
                                boxShadow: "0 0 0 1px blue.400",
                              }}
                            />
                            <PinInputField 
                              bg={fieldBg}
                              borderColor={borderColor}
                              h={{ base: "50px", md: "60px" }}
                              w={{ base: "40px", md: "50px" }}
                              fontSize="xl"
                              _focus={{
                                borderColor: "blue.400",
                                boxShadow: "0 0 0 1px blue.400",
                              }}
                            />
                            <PinInputField 
                              bg={fieldBg}
                              borderColor={borderColor}
                              h={{ base: "50px", md: "60px" }}
                              w={{ base: "40px", md: "50px" }}
                              fontSize="xl"
                              _focus={{
                                borderColor: "blue.400",
                                boxShadow: "0 0 0 1px blue.400",
                              }}
                            />
                          </PinInput>
                        </HStack>
                      </ChakraBox>
                      {error && <FormErrorMessage textAlign="center" mt={2}>{error}</FormErrorMessage>}
                    </FormControl>
                    
                    {/* Verification button */}
                    <Button
                      size="lg"
                      colorScheme="blue"
                      isLoading={isVerifying}
                      loadingText="Verifying..."
                      onClick={handleVerifyOtp}
                      rightIcon={<FiCheck />}
                      bgGradient="linear(to-r, blue.400, blue.600)"
                      py={7}
                      borderRadius="xl"
                      fontWeight="bold"
                      boxShadow="xl"
                      _hover={{
                        bgGradient: "linear(to-r, blue.500, blue.700)",
                        transform: "translateY(-2px)",
                        boxShadow: "2xl",
                      }}
                      _active={{
                        bgGradient: "linear(to-r, blue.600, blue.800)",
                        transform: "translateY(0)",
                        boxShadow: "md",
                      }}
                      transition="all 0.3s"
                    >
                      Verify Code
                    </Button>
                    
                    {/* Enhanced resend options */}
                    <Box 
                      p={4} 
                      borderRadius="xl" 
                      bg={useColorModeValue('gray.50', 'gray.750')} 
                      borderWidth="1px"
                      borderColor={borderColor}
                      textAlign="center"
                    >
                      <Text fontSize="sm" color={labelColor} mb={2}>
                        Didn't receive the code?
                      </Text>
                      {countdown > 0 ? (
                        <HStack justify="center" spacing={1}>
                          <Text fontSize="sm" color={labelColor}>
                            Resend code in
                          </Text>
                          <Text fontSize="sm" fontWeight="bold" color="blue.500">
                            {countdown}s
                          </Text>
                        </HStack>
                      ) : (
                        <Button
                          variant="link"
                          colorScheme="blue"
                          isLoading={isSendingOtp}
                          onClick={handleSendOtp}
                          fontWeight="semibold"
                        >
                          Resend Code
                        </Button>
                      )}
                      <Divider my={3} />
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setIsOtpSent(false);
                          setOtp('');
                          setError('');
                        }}
                        size="sm"
                        colorScheme="gray"
                      >
                        Change phone number
                      </Button>
                    </Box>
                  </VStack>
                </SlideFade>
              )}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Step2;