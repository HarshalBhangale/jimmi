import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Link,
  VStack,
  HStack,
  Flex,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';

// Footer Component
const Footer = () => {
  return (
    <Box as="footer" py={10} bg={useColorModeValue('gray.100', 'gray.800')}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={4}>
              Jimmi
            </Text>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Making car finance claims simple, transparent, and fair for everyone.
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="md" mb={4}>
              Quick Links
            </Text>
            <VStack align="start" spacing={2}>
              <Link as={RouterLink} to="/">
                Home
              </Link>
              <Link as={RouterLink} to="/about">
                About Us
              </Link>
              <Link as={RouterLink} to="/how-it-works">
                How It Works
              </Link>
              <Link as={RouterLink} to="/blog">
                Blog
              </Link>
              <Link as={RouterLink} to="/contact">
                Contact
              </Link>
            </VStack>
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="md" mb={4}>
              Legal
            </Text>
            <VStack align="start" spacing={2}>
              <Link as={RouterLink} to="/terms">
                Terms of Service
              </Link>
              <Link as={RouterLink} to="/privacy">
                Privacy Policy
              </Link>
              <Link as={RouterLink} to="/cookies">
                Cookie Policy
              </Link>
              <Link as={RouterLink} to="/disclaimer">
                Disclaimer
              </Link>
            </VStack>
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="md" mb={4}>
              Contact Us
            </Text>
            <VStack align="start" spacing={2}>
              <Text>support@jimmi.com</Text>
              <Text>0800 123 4567</Text>
              <Text>Mon-Fri: 9am - 5pm</Text>
            </VStack>
          </Box>
        </SimpleGrid>
        
        <Divider my={8} />
        
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'center', md: 'center' }}
        >
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            © {new Date().getFullYear()} Jimmi. All rights reserved.
          </Text>
          <HStack spacing={4} mt={{ base: 4, md: 0 }}>
            <Link href="#" aria-label="Facebook">
              <Box as="span" fontSize="sm">Facebook</Box>
            </Link>
            <Link href="#" aria-label="Twitter">
              <Box as="span" fontSize="sm">Twitter</Box>
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Box as="span" fontSize="sm">LinkedIn</Box>
            </Link>
            <Link href="#" aria-label="Instagram">
              <Box as="span" fontSize="sm">Instagram</Box>
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer; 