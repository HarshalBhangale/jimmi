/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  Link,
  Stack,
  Text,
  useColorModeValue,
  FormErrorMessage,
  PinInput,
  PinInputField,
  VStack,
  Select,
  useToast,
} from '@chakra-ui/react';
import { FiSend, FiShield } from 'react-icons/fi';
import { generateOtp, verifyOtp } from '@api/services/auth';
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

const Login = () => {
  const [countryCode, setCountryCode] = useState('+44');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [countdown, setCountdown] = useState(0);
  
  const [isLoading, setIsLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  
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
  
  // Theme colors
  const linkColor = useColorModeValue('blue.600', 'blue.300');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  // Phone handlers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setPhoneError('');
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setOtpError('');
  };

  const validatePhoneForm = () => {
    let isValid = true;

    if (!phone) {
      setPhoneError('Phone number is required');
      toast({
        title: 'Error',
        description: 'Please enter your phone number',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      isValid = false;
    } else if (!/^\d{10}$/.test(phone.replace(/[^0-9]/g, ''))) {
      setPhoneError('Please enter a valid 10-digit phone number');
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid 10-digit phone number',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      isValid = false;
    }

    return isValid;
  };

  const validateOtp = () => {
    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
      setOtpError('Please enter a valid 6-digit OTP');
      toast({
        title: 'Invalid OTP',
        description: 'Please enter a valid 6-digit OTP',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  // Send OTP handler
  const handleSendOtp = async () => {
    if (validatePhoneForm()) {
      setOtpLoading(true);
      try {
        const fullPhoneNumber = `${countryCode}${phone}`;
        const response = await generateOtp(fullPhoneNumber);
        
        if (response.success) {
          setOtpSent(true);
          setCountdown(60);
          toast({
            title: 'OTP Sent',
            description: 'Please check your phone for the verification code',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } else {
          setPhoneError(response.message || 'Failed to send OTP');
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
        setPhoneError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setOtpLoading(false);
      }
    }
  };

  // Form submit handler
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otpSent) {
      if (validateOtp()) {
        setIsLoading(true);
        try {
          const fullPhoneNumber = `${countryCode}${phone}`;
          const response = await verifyOtp(fullPhoneNumber, otp);
          
          if (response.success) {
            // Store user data and token in localStorage
            if (response.data?.token && response.data?.user) {
              localStorage.setItem('access_token', response.data.token);
              localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            toast({
              title: 'Login Successful',
              description: 'Welcome back!',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            const user = await refetchUser();
            if (user?.userStatus === 'Paid') {  
              navigate('/dashboard');
            } else {
              navigate('/auth/signup/step-2');
            }
          } else {
            setOtpError(response.message || 'Invalid OTP');
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
          setOtpError(errorMessage);
          toast({
            title: 'Verification Failed',
            description: errorMessage,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      handleSendOtp();
    }
  };

  return (
    <Box>
      <Stack spacing={6}>
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>
            Welcome Back
          </Heading>
          <Text color={textColor}>
            Sign in to your My Claim Buddy account
          </Text>
        </Box>

        <Stack spacing={4} as="form" onSubmit={handlePhoneSubmit}>
          <FormControl isInvalid={!!phoneError}>
            <FormLabel>Phone Number</FormLabel>
            <HStack spacing={4}>
              <InputGroup size="lg" flex={1}>
                <Input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(123) 456-7890"
                  disabled={otpSent}
                />
              </InputGroup>
            </HStack>
            {phoneError && <FormErrorMessage>{phoneError}</FormErrorMessage>}
          </FormControl>

          {otpSent ? (
            <VStack spacing={4} align="flex-start">
              <Box textAlign="center" w="full">
                <Text mb={2} fontWeight="medium">
                  Enter the 6-digit code sent to
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  {countryCode} {phone}
                </Text>
              </Box>

              <FormControl isInvalid={!!otpError}>
                <FormLabel>Enter OTP sent to your phone</FormLabel>
                <HStack justifyContent="center" spacing={{ base: 1, md: 2 }}>
                  <PinInput size={{ base: "md", md: "lg" }} value={otp} onChange={handleOtpChange}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                {otpError && <FormErrorMessage textAlign="center" mt={2}>{otpError}</FormErrorMessage>}
              </FormControl>
              
              <Stack direction={{ base: "column", sm: "row" }} w="full" spacing={3}>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setOtpSent(false);
                    setOtp('');
                    setOtpError('');
                  }}
                  size="lg"
                  fontSize="md"
                >
                  Change Number
                </Button>
                <Button
                  colorScheme="blue"
                  size="lg"
                  fontSize="md"
                  type="submit"
                  isLoading={isLoading}
                  flex={1}
                  rightIcon={<FiShield />}
                  bgGradient="linear(to-r, blue.400, blue.600)"
                  _hover={{
                    bgGradient: "linear(to-r, blue.500, blue.700)",
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                >
                  Verify & Sign in
                </Button>
              </Stack>

              <HStack justify="center" w="full">
                <Text fontSize="sm" color={textColor}>
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
                    isLoading={otpLoading}
                    onClick={handleSendOtp}
                  >
                    Resend Code
                  </Button>
                )}
              </HStack>
            </VStack>
          ) : (
            <Button
              colorScheme="blue"
              size="lg"
              fontSize="md"
              type="submit"
              isLoading={otpLoading}
              rightIcon={<FiSend />}
              bgGradient="linear(to-r, blue.400, blue.600)"
              _hover={{
                bgGradient: "linear(to-r, blue.500, blue.700)",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Send OTP
            </Button>
          )}
        </Stack>

        <HStack spacing={1} justify="center">
          <Text color={textColor}>
            Don't have an account?
          </Text>
          <Link
            as={RouterLink}
            to="/auth/signup/step-1"
            color={linkColor}
            fontWeight="medium"
            _hover={{ textDecoration: 'underline' }}
          >
            Sign up
          </Link>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Login; 