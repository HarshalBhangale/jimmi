import {
  Box,
  Container,
  Heading,
  VStack,
  SimpleGrid,
  Text,
  HStack,
  Flex,
  Icon,
  Card,
  CardBody,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiMessageSquare, FiUser } from 'react-icons/fi';

// Testimonials Component
const Testimonials = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  
  return (
    <Box as="section" py={20} bg={bgColor} id="testimonials">
      <Container maxW="container.xl">
        <VStack spacing={8} textAlign="center" mb={12}>
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            🗣️ Real People. Real Results.
          </Heading>
        </VStack>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} maxW="900px" mx="auto">
          <Card
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="lg"
            boxShadow="lg"
            p={2}
            position="relative"
            overflow="hidden"
            borderTop="4px solid"
            borderColor="purple.400"
          >
            <CardBody>
              <Box mb={4}>
                <Icon as={FiMessageSquare} color="gray.400" boxSize={8} />
              </Box>
              <Text fontSize="lg" fontStyle="italic" mb={4}>
                "I had no clue where to start until Jimmi explained it all. I just followed the steps and ended up with over £2,000 back."
              </Text>
              <HStack>
                <Flex
                  align="center"
                  justify="center"
                  borderRadius="full"
                  bg="purple.100"
                  color="purple.500"
                  boxSize={10}
                >
                  <Icon as={FiUser} />
                </Flex>
                <Box>
                  <Text fontWeight="bold">Jason M</Text>
                  <Text fontSize="sm" color="gray.500">Leeds</Text>
                </Box>
              </HStack>
            </CardBody>
          </Card>
          
          <Card
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="lg"
            boxShadow="lg"
            p={2}
            position="relative"
            overflow="hidden"
            borderTop="4px solid"
            borderColor="blue.400"
          >
            <CardBody>
              <Box mb={4}>
                <Icon as={FiMessageSquare} color="gray.400" boxSize={8} />
              </Box>
              <Text fontSize="lg" fontStyle="italic" mb={4}>
                "It's like having a legal expert in your pocket… without the bill."
              </Text>
              <HStack>
                <Flex
                  align="center"
                  justify="center"
                  borderRadius="full"
                  bg="blue.100"
                  color="blue.500"
                  boxSize={10}
                >
                  <Icon as={FiUser} />
                </Flex>
                <Box>
                  <Text fontWeight="bold">Priya S</Text>
                  <Text fontSize="sm" color="gray.500">Birmingham</Text>
                </Box>
              </HStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Testimonials; 