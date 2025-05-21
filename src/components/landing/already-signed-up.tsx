import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiCheckCircle } from 'react-icons/fi';

// Already Signed Up Component
const AlreadySignedUp = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const boxBg = useColorModeValue('blue.50', 'blue.900');
  
  return (
    <Box as="section" py={20} id="already-signed">
      <Container maxW="container.xl">
        <VStack spacing={8} textAlign="center" mb={12}>
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            🧾 Already Signed Up Somewhere Else?
          </Heading>
        </VStack>
        
        <Box 
          maxW="800px" 
          mx="auto" 
          bg={bgColor} 
          p={8} 
          borderRadius="xl" 
          boxShadow="xl"
          borderTop="4px solid"
          borderColor="blue.400"
        >
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Not sure if you've already claimed?
          </Text>
          
          <Text mb={6}>
            If you've previously signed up with a law firm or claims management company and aren't happy with the service, you still have options.
          </Text>
          
          <List spacing={4} mb={8}>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={FiCheckCircle} color="green.500" fontSize="xl" />
              <Text>Jimmi can help you investigate the status of your claim</Text>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={FiCheckCircle} color="green.500" fontSize="xl" />
              <Text>If appropriate, Jimmi will guide you through the steps to take back control</Text>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={FiCheckCircle} color="green.500" fontSize="xl" />
              <Text>You'll get clear instructions on what to say and do next</Text>
            </ListItem>
          </List>
          
          <Box 
            bg={boxBg} 
            p={4} 
            borderRadius="md" 
            fontStyle="italic"
            borderLeft="4px solid"
            borderColor="blue.400"
          >
            <Text>You're not stuck. Jimmi is here to help you reclaim your refund — and your independence.</Text>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AlreadySignedUp; 