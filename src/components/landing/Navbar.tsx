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

// Function to calculate time until next Sunday midnight (next next Sunday)
const calculateTimeToNextSunday = () => {
  const now = new Date();
  const nextSunday = new Date();
  const daysToSunday = 7 - now.getDay();
  nextSunday.setDate(now.getDate() + (daysToSunday === 0 ? 14 : daysToSunday + 7));
  nextSunday.setHours(23, 59, 59, 999);
  const diff = nextSunday.getTime() - now.getTime();
  const totalHours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { totalHours, minutes, seconds };
};


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeToNextSunday());

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeToNextSunday());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
              🔥 Discount code <Box as="span" color="white" px={2} py={0.5} bg="whiteAlpha.300" borderRadius="md">JAMES50</Box> applied - 50% off ends in {String(timeRemaining.totalHours).padStart(2, '0')}h {String(timeRemaining.minutes).padStart(2, '0')}m {String(timeRemaining.seconds).padStart(2, '0')}s.{' '}
              <Box as="span" animation={`${pulse} 2s infinite`} color="yellow.100">Act Now!</Box>
            </Text>

            <Text 
              fontSize={{ base: "xs", md: "sm" }} 
              fontWeight="bold"
              textAlign="center"
              display={{ base: "block", md: "none" }}
            >
            <Box as="span" color="white" px={2} py={0.5} bg="whiteAlpha.300" borderRadius="md">JAMES50</Box> applied - 50% off ends in {String(timeRemaining.totalHours).padStart(2, '0')}h {String(timeRemaining.minutes).padStart(2, '0')}m {String(timeRemaining.seconds).padStart(2, '0')}s.
            </Text>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;