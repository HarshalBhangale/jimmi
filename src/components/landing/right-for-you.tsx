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
  
  // Right For You Component
  const RightForYou = () => {
    const bgColor = useColorModeValue('white', 'gray.800');
    
    return (
      <Box as="section" py={20} id="right-for-you">
        <Container maxW="container.xl">
          <VStack spacing={8} textAlign="center" mb={10}>
            <Heading 
              as="h2" 
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              🙋‍♂️ Is Jimmi Right for You?
            </Heading>
          </VStack>
          
          <Box 
            bg={bgColor} 
            p={8} 
            borderRadius="xl" 
            boxShadow="xl"
            maxW="800px"
            mx="auto"
            borderTop="4px solid"
            borderColor="blue.400"
          >
            <Heading size="md" mb={4}>
              ✅ People who…
            </Heading>
            <List spacing={4}>
              <ListItem display="flex" alignItems="center">
                <ListIcon as={FiCheckCircle} color="green.500" fontSize="xl" />
                <Text>Know they've been overcharged, but don't know where to start</Text>
              </ListItem>
              <ListItem display="flex" alignItems="center">
                <ListIcon as={FiCheckCircle} color="green.500" fontSize="xl" />
                <Text>Have car finance from 2007 onwards</Text>
              </ListItem>
              <ListItem display="flex" alignItems="center">
                <ListIcon as={FiCheckCircle} color="green.500" fontSize="xl" />
                <Text>Don't want to hand over a third of their refund</Text>
              </ListItem>
              <ListItem display="flex" alignItems="center">
                <ListIcon as={FiCheckCircle} color="green.500" fontSize="xl" />
                <Text>Prefer tools over lawyers, but still want guidance to get it right</Text>
              </ListItem>
            </List>
          </Box>
        </Container>
      </Box>
    );
  };
  
  export default RightForYou;