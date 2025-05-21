import {
  Box,
  Container,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

// Disclaimer Component
const Disclaimer = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  
  return (
    <Box as="section" py={10} bg={bgColor}>
      <Container maxW="container.xl">
        <Box 
          maxW="800px" 
          mx="auto" 
          p={6} 
          borderRadius="md" 
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="sm"
          borderTop="2px solid"
          borderColor="gray.300"
        >
          <Heading as="h3" size="md" mb={4}>
            ⚖️ Disclaimer
          </Heading>
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            Jimmi is not a regulated legal or financial services provider. Jimmi offers educational tools and templates to support financial independence — but does not act on your behalf or offer regulated advice.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Disclaimer; 