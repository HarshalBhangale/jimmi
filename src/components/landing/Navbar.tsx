// @ts-nocheck
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Container,
  Image,
  useColorModeValue,
  Button,
  HStack,
  Text,
  Icon,
} from '@chakra-ui/react';
import { FaFire } from 'react-icons/fa';
import { keyframes } from '@emotion/react';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Function to calculate time until a specific date or default to next Sunday
const calculateTimeRemaining = (targetDate = null) => {
  const now = new Date();
  
  // If a target date is provided, use it
  if (targetDate) {
    const diff = targetDate.getTime() - now.getTime();
    
    if (diff <= 0) {
      // If date is in the past, default to next Sunday
      return calculateTimeUntilNextSunday();
    }
    
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { totalHours, minutes, seconds, hasTargetDate: true };
  } else {
    // Default to next Sunday if no date provided
    return calculateTimeUntilNextSunday();
  }
};

// Function to calculate time until next Sunday midnight (next next Sunday)
const calculateTimeUntilNextSunday = () => {
  const now = new Date();
  const nextSunday = new Date();
  const daysToSunday = 7 - now.getDay();
  nextSunday.setDate(now.getDate() + (daysToSunday === 0 ? 7 : daysToSunday));
  nextSunday.setHours(23, 59, 59, 999);
  const diff = nextSunday.getTime() - now.getTime();
  const totalHours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { totalHours, minutes, seconds, hasTargetDate: false };
};

// Function to parse date from URL format
const parseDateFromURL = (dateString) => {
  if (!dateString) return null;
  
  try {
    // Expected format: YYYYMMDDHHMMSS
    // For example: 20250603000000 (June 3, 2025, 00:00:00)
    if (dateString.length !== 14) {
      return null;
    }
    
    const year = parseInt(dateString.substring(0, 4));
    const month = parseInt(dateString.substring(4, 6)) - 1; // JS months are 0-indexed
    const day = parseInt(dateString.substring(6, 8));
    const hour = parseInt(dateString.substring(8, 10));
    const minute = parseInt(dateString.substring(10, 12));
    const second = parseInt(dateString.substring(12, 14));
    
    // Create a simple date object
    const date = new Date(year, month, day, hour, minute, second);
    
    // Validate the date
    if (isNaN(date.getTime())) {
      return null;
    }
    
    return date;
  } catch (error) {
    return null;
  }
};

// Function to extract URL parameters
const getUrlParameters = () => {
  const hash = window.location.hash;
  if (!hash || hash.length <= 1) return {};
  
  const paramString = hash.substring(1); // Remove the # character
  const params = {};
  
  paramString.split('&').forEach(param => {
    const [key, value] = param.split('=');
    if (key && value) {
      params[key] = decodeURIComponent(value);
    }
  });
  
  return params;
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({ totalHours: 0, minutes: 0, seconds: 0, hasTargetDate: false });
  const [discountCode, setDiscountCode] = useState("CLAIMBACK");
  const [targetDate, setTargetDate] = useState(null);

  // Function to initialize data from URL parameters
  const initializeFromURLParams = () => {
    const params = getUrlParameters();
    
    // Handle name parameter
    if (params.name && params.name.trim() !== "") {
      // Convert to uppercase and ensure it's formatted properly
      const formattedName = params.name.toUpperCase().trim();
      setDiscountCode(formattedName);
    }
    
    // Handle date parameter
    if (params.date && params.date.trim() !== "") {
      const parsedDate = parseDateFromURL(params.date.trim());
      
      if (parsedDate) {
        setTargetDate(parsedDate);
        const remaining = calculateTimeRemaining(parsedDate);
        setTimeRemaining(remaining);
      } else {
        setTimeRemaining(calculateTimeUntilNextSunday());
      }
    } else {
      setTimeRemaining(calculateTimeUntilNextSunday());
    }
  };

  useEffect(() => {
    // Initialize data from URL parameters
    initializeFromURLParams();
    
    // Handle hash change (if URL parameters change)
    const handleHashChange = () => {
      initializeFromURLParams();
    };
    
    // Handle scroll events
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    // Update the countdown every second
    const timer = setInterval(() => {
      if (targetDate) {
        const newTimeRemaining = calculateTimeRemaining(targetDate);
        setTimeRemaining(newTimeRemaining);
      } else {
        setTimeRemaining(calculateTimeUntilNextSunday());
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
<>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        transition="all 0.3s ease-in-out"
        bg={scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent'} // Changed to white background
        color={useColorModeValue('gray.800', 'white')} // Darker text for light theme
        boxShadow={scrolled ? '0 2px 12px rgba(0, 0, 0, 0.05)' : 'none'} // Softer shadow
        backdropFilter={scrolled ? 'blur(10px)' : 'none'}
        borderBottom={scrolled ? '1px solid rgba(0, 0, 0, 0.06)' : 'none'} // Lighter border
      >
        <Container maxW="container.xl">
          <Flex
            minH={'60px'}
            py={{ base: 2 }}
            px={{ base: 4 }}
            align={'center'}
            justify={'space-between'}
          >
            <Image
              src="/jimmi-logo.png"
              alt="Jimmi Logo"
              h="40px"
              objectFit="contain"
              display={{ base: "block", md: "block" }}
              transition="all 0.3s"
              _hover={{ transform: 'scale(1.05)' }}
            />
            <HStack spacing={{ base: 2, md: 4 }}>
              <Image 
                src="/secure.svg"
                alt="Secure Tag"
                h={{ base: "24px", md: "34px" }}
                display={{ base: "none", sm: "block" }}
                borderRadius= "4px"
                objectFit="contain"
                transition="all 0.3s"
                _hover={{ transform: 'scale(1.05)' }}
              />
              <Button
                as={RouterLink}
                to="/auth/login"
                variant="outline"
                border="1px"
                borderColor="blue.500" // Changed to blue for light theme
                bg="transparent"
                color="blue.500" // Changed to blue for light theme
                _hover={{
                  bg: "blue.50", // Light blue background on hover
                  borderColor: "blue.600"
                }}
              >
                Sign In
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>
      
      <Box 
        position="fixed"
        top="60px"
        left={0}
        right={0}
        bg="blue.500" // Changed to solid blue background
        color="white"
        py={{ base: "4px", md: "6px" }}
        zIndex={999}
        boxShadow="0 8px 32px rgba(66, 153, 225, 0.2)" // Softer blue shadow
        backdropFilter="blur(10px)"
        borderBottom="1px solid rgba(255, 255, 255, 0.1)"
      >
        <Container maxW="container.xl">
          <Flex 
            alignItems="center" 
            justifyContent="center"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            <Text 
              fontSize={{ base: "xs", md: "sm" }} 
              fontWeight="bold"
              textAlign="center"
              display={{ base: "none", md: "block" }}
            >
              🔥 Discount code <Box as="span" color="white" px={2} py={0.5} bg="whiteAlpha.300" borderRadius="md">{discountCode}50</Box> applied - 
              {timeRemaining.hasTargetDate ? (
                <> 50% off ends in {String(timeRemaining.totalHours).padStart(2, '0')}h {String(timeRemaining.minutes).padStart(2, '0')}m {String(timeRemaining.seconds).padStart(2, '0')}s.</>
              ) : (
                <> Offer now - on 50% off for a limited time.</>
              )}
              {' '}
              <Box as="span" animation={`${pulse} 2s infinite`} color="yellow.100">Act Now!</Box>
            </Text>

            <Text 
              fontSize={{ base: "xs", md: "sm" }} 
              fontWeight="bold"
              textAlign="center"
              display={{ base: "block", md: "none" }}
            >
              <Box as="span" color="white" px={2} py={0.5} bg="whiteAlpha.300" borderRadius="md">{discountCode}50</Box> applied - 
              {timeRemaining.hasTargetDate ? (
                <> 50% off ends in {String(timeRemaining.totalHours).padStart(2, '0')}h {String(timeRemaining.minutes).padStart(2, '0')}m {String(timeRemaining.seconds).padStart(2, '0')}s.</>
              ) : (
                <> Offer now - on 50% off for a limited time.</>
              )}
            </Text>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;