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

// Function to calculate time until next Sunday midnight
const calculateTimeToNextSunday = () => {
  const now = new Date();
  const nextSunday = new Date();
  const daysToSunday = 7 - now.getDay();
  nextSunday.setDate(now.getDate() + (daysToSunday === 0 ? 7 : daysToSunday));
  nextSunday.setHours(23, 59, 59, 999);
  const diff = nextSunday.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
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
        bg={scrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent'}
        color={useColorModeValue('gray.950', 'white')}
        boxShadow={scrolled ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none'}
        backdropFilter={scrolled ? 'blur(10px)' : 'none'}
        borderBottom={scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'}
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
              filter={scrolled ? 'none' : 'brightness(0) invert(1)'}
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
                borderColor="yellow.400"
                bg="blur(80px) rgba(255, 255, 255, 0.1)"
                backdropFilter="blur(50px)"
                color="yellow.400"
                _hover={{
                  bg: "rgba(92, 123, 94, 0.88)",
                  borderColor: "yellow.300"
                }}
              >
                Sign In
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>
      
      {/* Timer Banner */}
      <Box 
        position="fixed"
        top="60px"
        left={0}
        right={0}
        bgGradient="linear(to-r, #FF0080, #FF6B35, #F7931E)"
        color="white"
        py={{ base: "4px", md: "6px" }}
        zIndex={999}
        boxShadow="0 8px 32px rgba(255, 0, 128, 0.3)"
        backdropFilter="blur(10px)"
        borderBottom="1px solid rgba(255, 255, 255, 0.1)"
      >
        <Container maxW="container.xl">
          <Flex 
            alignItems="center" 
            justifyContent="center"
            flexWrap="wrap"
            gap={{ base: 2, md: 4 }}
          >
            <HStack spacing={1}>
              <Icon as={FaFire} boxSize={{ base: 3, md: 4 }} animation={`${pulse} 1s infinite`} />
              <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="bold" textShadow="0 2px 4px rgba(0,0,0,0.3)">
                LIMITED TIME OFFER
              </Text>
            </HStack>
            
            <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="medium" color="rgba(255,255,255,0.9)">
              —
            </Text>
            
            <HStack spacing={1}>
              <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="medium" color="rgba(255,255,255,0.9)">
                Ends in
              </Text>
              <Text 
                fontSize={{ base: "xs", md: "sm" }} 
                fontWeight="bold"
                color="yellow.200"
              >
                {timeRemaining.days} day{timeRemaining.days !== 1 ? 's' : ''},
              </Text>
              
              <HStack spacing={0}>
                {String(timeRemaining.hours).padStart(2, '0').split('').map((char, index) => (
                  <Box 
                    key={`h-${index}`}
                    bg="rgba(255,255,255,0.9)" 
                    color="black"
                    px={1}
                    py={0.5}
                    fontSize={{ base: "2xs", md: "xs" }}
                    fontWeight="bold"
                    minW={{ base: "14px", md: "16px" }}
                    textAlign="center"
                    borderRadius="2px"
                  >
                    {char}
                  </Box>
                ))}
                <Text fontSize={{ base: "xs", md: "sm" }} color="yellow.200" mx={1}>:</Text>
                {String(timeRemaining.minutes).padStart(2, '0').split('').map((char, index) => (
                  <Box 
                    key={`m-${index}`}
                    bg="rgba(255,255,255,0.9)" 
                    color="black"
                    px={1}
                    py={0.5}
                    fontSize={{ base: "2xs", md: "xs" }}
                    fontWeight="bold"
                    minW={{ base: "14px", md: "16px" }}
                    textAlign="center"
                    borderRadius="2px"
                  >
                    {char}
                  </Box>
                ))}
                <Text fontSize={{ base: "xs", md: "sm" }} color="yellow.200" mx={1}>:</Text>
                {String(timeRemaining.seconds).padStart(2, '0').split('').map((char, index) => (
                  <Box 
                    key={`s-${index}`}
                    bg="rgba(255,255,255,0.9)" 
                    color="black"
                    px={1}
                    py={0.5}
                    fontSize={{ base: "2xs", md: "xs" }}
                    fontWeight="bold"
                    minW={{ base: "14px", md: "16px" }}
                    textAlign="center"
                    borderRadius="2px"
                  >
                    {char}
                  </Box>
                ))}
              </HStack>
            </HStack>
                
            <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="medium" textShadow="0 2px 4px rgba(0,0,0,0.3)" lineHeight={1.2}>
              Get full access for just{' '}
              <Text as="span" fontWeight="extrabold" fontSize={{ base: "sm", md: "md" }}>
                £39.99
              </Text>{' '}
              instead of{' '}
              <Text as="span" textDecoration="line-through" fontWeight="bold" opacity={0.8}>
                £79.99
              </Text>
            </Text>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;