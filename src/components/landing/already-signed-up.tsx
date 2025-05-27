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
  Button,
} from '@chakra-ui/react';
import { FiCheckCircle } from 'react-icons/fi';

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
            ✍️ Already Signed Up Somewhere Else?
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
              <Text>My Claim Buddy can help you investigate the status of your claim</Text>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={FiCheckCircle} color="green.500" fontSize="xl" />
              <Text>If appropriate, My Claim Buddy will guide you through the steps to take back control</Text>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={FiCheckCircle} color="green.500" fontSize="xl" />
              <Text>You'll get clear instructions on what to say and do next</Text>
            </ListItem>
          </List>
          
          <Box 
            bg={boxBg} 
            p={6} 
            borderRadius="md" 
            borderLeft="4px solid"
            borderColor="blue.400"
            textAlign="left"
          >
            <Text fontStyle="italic" mb={4}>
              You're not stuck. My Claim Buddy is here to help you reclaim your refund — and your independence.
            </Text>

            {/* CTA Button */}
            <Box textAlign="center">
              <Button 
              colorScheme="blue" 
              size="lg" 
              fontWeight="bold" 
              mt={2}
              px={8}
              transform="scale(1)"
              transition="transform 0.2s"
              _hover={{
                transform: "scale(1.05)"
              }}
              >
              Start now and save £1000s
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AlreadySignedUp;
