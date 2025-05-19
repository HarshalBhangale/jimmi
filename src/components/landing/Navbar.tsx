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
} from '@chakra-ui/react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      transition="all 0.3s ease-in-out"
      bg={scrolled ? useColorModeValue('white', 'gray.800') : 'transparent'}
      boxShadow={scrolled ? 'sm' : 'none'}
      backdropFilter={scrolled ? 'blur(10px)' : 'none'}
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
          <HStack spacing={4}>
            <Button
              as={RouterLink}
              to="/auth/login"
              variant="outline"
              color="yellow.400"
              borderColor="yellow.400"
              bg={scrolled ? "yellow.50" : "transparent"}
              _hover={{
                bg: scrolled ? "yellow.100" : "yellow.900"
              }}
            >
              Login
            </Button>
            <Button
              as={RouterLink}
              to="/auth/signup/step-1"
              colorScheme="blue"
              bgGradient="linear(to-r, blue.400, purple.500)"
              _hover={{
                bgGradient: "linear(to-r, blue.500, purple.600)",
              }}
            >
              Get Started
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar; 