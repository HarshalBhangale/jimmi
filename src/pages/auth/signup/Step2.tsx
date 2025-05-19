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
} from '@chakra-ui/react';
import { FiSend, FiShield } from 'react-icons/fi';
import { generateOtp, verifyOtp } from '../../../api/services/auth';
import { AxiosError } from 'axios';
import { refetchUserAtom } from '@/jotai/atoms';
import { useAtom } from 'jotai';

// List of common country codes with ISO country codes
const countryCodes = [
  { code: '+1', country: 'US/CA' },
  { code: '+44', country: 'GB' },
  { code: '+61', country: 'AU' },
  { code: '+33', country: 'FR' },
  { code: '+49', country: 'DE' },
  { code: '+91', country: 'IN' },
  { code: '+353', country: 'IE' },
  { code: '+39', country: 'IT' },
  { code: '+81', country: 'JP' },
  { code: '+64', country: 'NZ' },
  { code: '+65', country: 'SG' },
  { code: '+34', country: 'ES' },
  { code: '+46', country: 'SE' },
  { code: '+41', country: 'CH' },
  { code: '+971', country: 'AE' },
];

const Step2: React.FC = () => {
  const [countryCode, setCountryCode] = useState('+1');
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
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid 10-digit phone number',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSendingOtp(true);
    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
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
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
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

  // Card background and border colors for dark/light modes
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const labelColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Container maxW="container.md" py={8}>
      <Stack spacing={8}>
        {/* Progress indicator */}
        <Box>
          <HStack justify="space-between" mb={1}>
            <Text fontSize="sm" fontWeight="medium">
              Step 2 of 5
            </Text>
            <Text fontSize="sm" color={labelColor}>
              Mobile Verification
            </Text>
          </HStack>
          <Progress value={40} size="sm" colorScheme="blue" borderRadius="full" />
        </Box>

        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>
            Verify Your Mobile Number
          </Heading>
          <Text color={labelColor} fontSize="lg">
            We'll send a verification code to confirm your mobile number
          </Text>
        </Box>

        {/* Verification Form */}
        <Box
          bg={cardBg}
          borderRadius="xl"
          boxShadow="md"
          p={{ base: 6, md: 8 }}
          borderWidth="1px"
          borderColor={borderColor}
        >
          <VStack spacing={8} align="stretch">
            <FormControl isInvalid={!!error}>
              <FormLabel fontWeight="medium">Mobile Number</FormLabel>
              <HStack spacing={4}>
                <Select 
                  value={countryCode} 
                  onChange={(e) => setCountryCode(e.target.value)} 
                  width={{ base: "40%", md: "30%" }}
                  size="lg"
                  isDisabled={isOtpSent}
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} {country.country}
                    </option>
                  ))}
                </Select>
                <InputGroup size="lg" flex={1}>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (error) {
                        setError('');
                      }
                    }}
                    placeholder="Enter your phone number"
                    isDisabled={isOtpSent}
                  />
                </InputGroup>
              </HStack>
              {error && (
                <FormErrorMessage>{error}</FormErrorMessage>
              )}
            </FormControl>

            {!isOtpSent ? (
              <Button
                size="lg"
                colorScheme="blue"
                isLoading={isSendingOtp}
                loadingText="Sending..."
                onClick={handleSendOtp}
                width="full"
                rightIcon={<FiSend />}
                bgGradient="linear(to-r, blue.400, blue.600)"
                _hover={{
                  bgGradient: "linear(to-r, blue.500, blue.700)",
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Send Verification Code
              </Button>
            ) : (
              <VStack spacing={6} align="stretch">
                <Box textAlign="center">
                  <Text mb={2} fontWeight="medium">
                    Enter the 6-digit code sent to
                  </Text>
                  <Text fontWeight="bold" fontSize="lg">
                    {countryCode} {phoneNumber}
                  </Text>
                </Box>
                
                <FormControl isInvalid={!!error}>
                  <HStack justify="center" spacing={4}>
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
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                  {error && <FormErrorMessage textAlign="center" mt={2}>{error}</FormErrorMessage>}
                </FormControl>
                
                <Button
                  size="lg"
                  colorScheme="blue"
                  isLoading={isVerifying}
                  loadingText="Verifying..."
                  onClick={handleVerifyOtp}
                  rightIcon={<FiShield />}
                  bgGradient="linear(to-r, blue.400, blue.600)"
                  _hover={{
                    bgGradient: "linear(to-r, blue.500, blue.700)",
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                >
                  Verify Code
                </Button>
                
                <HStack justify="center">
                  <Text fontSize="sm" color={labelColor}>
                    Didn't receive the code?
                  </Text>
                  {countdown > 0 ? (
                    <Text fontSize="sm" fontWeight="medium">
                      Resend in {countdown}s
                    </Text>
                  ) : (
                    <Button
                      variant="link"
                      size="sm"
                      colorScheme="blue"
                      isLoading={isSendingOtp}
                      onClick={handleSendOtp}
                    >
                      Resend Code
                    </Button>
                  )}
                </HStack>
                
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsOtpSent(false);
                    setOtp('');
                    setError('');
                  }}
                  size="sm"
                >
                  Change phone number
                </Button>
              </VStack>
            )}
          </VStack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Step2; 