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
      bg={scrolled ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
      bgGradient={scrolled ? 'linear(to-r, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))' : 'none'}
      boxShadow={scrolled ? 'sm' : 'none'}
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
              colorScheme="blue"
              bgGradient="linear(to-r, blue.400, purple.500)"
              _hover={{
                bgGradient: "linear(to-r, blue.500, purple.600)",
              }}
            >
              Sign In
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;