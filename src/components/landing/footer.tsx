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
  Image,
  Icon,
} from '@chakra-ui/react';
import { FiMail, FiShield } from 'react-icons/fi';

// Combined Footer and Disclaimer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const bgGradient = useColorModeValue(
    'linear(to-b, blue.50, purple.100)', 
    'linear(to-b, blue.900, purple.800)'
  );
  const borderColor = useColorModeValue('purple.200', 'purple.700');
  const textColor = useColorModeValue('blue.600', 'blue.300');
  const disclaimerBg = useColorModeValue('purple.50', 'blue.800');
  return (
    <Box 
      as="footer" 
      bgGradient={bgGradient}
      borderTop="1px solid"
      borderColor={borderColor}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative elements */}
      <Box
        position="absolute"
        top="5%"
        left="5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bgGradient="radial(blue.50, transparent 70%)"
        opacity={0.4}
        zIndex={0}
      />
      
      <Box
        position="absolute"
        bottom="10%"
        right="5%"
        width="200px"
        height="200px"
        borderRadius="full"
        bgGradient="radial(purple.50, transparent 70%)"
        opacity={0.3}
        zIndex={0}
      />
      
      <Container maxW="container.xl" position="relative" zIndex={1} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={10}>
          {/* Logo and Description */}
          <Box>
            <Flex align="center" mb={4}>
              <Image 
                src="/jimmi-logo.png" 
                alt="My Claim Buddy Logo" 
                h="50px" 
                mr={3}
                objectFit="contain"
              />
              <Text fontWeight="bold" fontSize="xl">
                My Claim Buddy
              </Text>
            </Flex>
            <Text color={textColor} maxW="md">
              Buddy makes car finance claims simple, transparent and fair for everyone. 
              Take control of your claims without the hassle and fees of solicitors today!
            </Text>
          </Box>
          
          {/* Contact */}
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={4}>
              Contact Us
            </Text>
            <VStack align={{ base: "center", md: "flex-start" }} spacing={4}>
              <HStack>
                <Icon as={FiMail} color="blue.400" />
                <Link href="mailto:support@myclaimbuddy.co.uk" color={textColor} _hover={{ color: "blue.400" }}>
                  support@myclaimbuddy.co.uk
                </Link>
              </HStack>
            </VStack>
          </Box>
        </SimpleGrid>
        
        {/* Disclaimer */}
        <Box 
          p={6} 
          borderRadius="lg" 
          bg={disclaimerBg}
          boxShadow="sm"
          mb={8}
          borderLeft="4px solid"
          borderColor="blue.400"
        >
          <Flex align="flex-start" gap={3}>
            <Icon as={FiShield} boxSize={5} color="blue.500" mt={1} />
            <Box>
              <Text fontWeight="bold" fontSize="md" mb={1}>
                ⚖️ Disclaimer
              </Text>
              <Text fontSize="sm" color={textColor}>
                My Claim Buddy is not a regulated legal or financial services provider. 
                We offer educational tools and templates to support financial independence — but do not act on your behalf or offer regulated advice.
              </Text>
            </Box>
          </Flex>
        </Box>
        
        {/* Copyright */}
        <Divider mb={6} borderColor={borderColor} />
        <Flex 
          direction={{ base: "column", md: "row" }} 
          justify="space-between" 
          align="center"
          textAlign={{ base: "center", md: "left" }}
        >
          <Text fontSize="sm" color={textColor}>
            © {currentYear} My Claim Buddy. All rights reserved.
          </Text>
          <HStack spacing={6} mt={{ base: 4, md: 0 }}>
            <Link as={RouterLink} to="/privacy" fontSize="sm" color={textColor} _hover={{ color: "blue.400" }}>
              Privacy Policy
            </Link>
            <Link as={RouterLink} to="/tnc" fontSize="sm" color={textColor} _hover={{ color: "blue.400" }}>
              Terms of Service
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer; 