import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Flex,
  Circle,
  Divider,
  HStack,
  List,
  ListItem,
  Grid,
  GridItem,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { FiCheck, FiClock, FiFileText, FiHome, FiMail } from 'react-icons/fi';

interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  selectedLenders?: string[];
}

const Confirmation = () => {
  const [userData, setUserData] = useState<UserData>({});
  const [requestCount, setRequestCount] = useState(0);
  const navigate = useNavigate();
  
  // Load user data from localStorage
  useEffect(() => {
    const signupData = localStorage.getItem('signupData');
    if (signupData) {
      setUserData(JSON.parse(signupData));
    }
    
    const documentRequestData = localStorage.getItem('documentRequestData');
    if (documentRequestData) {
      const requestData = JSON.parse(documentRequestData);
      setRequestCount(requestData.selectedLenders?.length || 0);
    }
  }, []);
  
  // Colors
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const successBg = useColorModeValue('green.50', 'green.900');
  const successIconBg = useColorModeValue('green.100', 'green.800');
  const successTextColor = useColorModeValue('green.800', 'green.200');
  const featureIconBg = useColorModeValue('blue.100', 'blue.800');
  
  return (
    <Container maxW="container.lg" py={12}>
      <VStack spacing={10} align="stretch">
        {/* Success Message */}
        <Box
          bg={successBg}
          p={8}
          borderRadius="xl"
          borderWidth="1px"
          borderColor="green.200"
          textAlign="center"
        >
          <Flex justify="center" mb={6}>
            <Circle size="80px" bg={successIconBg} color="green.500">
              <Icon as={FiCheck} boxSize={10} />
            </Circle>
          </Flex>
          <Heading color={successTextColor} size="xl" mb={4}>
            Your Account is Ready!
          </Heading>
          <Text fontSize="lg" color={successTextColor}>
            Congratulations {userData.firstName || 'User'}, your document requests have been sent successfully.
            Your account is now fully set up and ready to use.
          </Text>
        </Box>
        
        {/* Request Summary */}
        <Box
          bg={cardBg}
          borderRadius="xl"
          boxShadow="md"
          p={8}
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Heading size="lg" mb={6}>Request Summary</Heading>
          
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
            <GridItem>
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text fontWeight="medium" color={labelColor}>Full Name</Text>
                  <Text fontSize="lg">{userData.firstName} {userData.lastName}</Text>
                </Box>
                
                <Box>
                  <Text fontWeight="medium" color={labelColor}>Email Address</Text>
                  <Text fontSize="lg">{userData.email}</Text>
                </Box>
                
                <Box>
                  <Text fontWeight="medium" color={labelColor}>Phone Number</Text>
                  <Text fontSize="lg">{userData.phoneNumber}</Text>
                </Box>
              </VStack>
            </GridItem>
            
            <GridItem>
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text fontWeight="medium" color={labelColor}>Document Requests</Text>
                  <Flex align="center">
                    <Text fontSize="lg">{requestCount} document requests sent</Text>
                    <Badge ml={2} colorScheme="green">Complete</Badge>
                  </Flex>
                </Box>
                
                <Box>
                  <Text fontWeight="medium" color={labelColor}>Payment Status</Text>
                  <Flex align="center">
                    <Text fontSize="lg">Payment received</Text>
                    <Badge ml={2} colorScheme="green">Verified</Badge>
                  </Flex>
                </Box>
                
                <Box>
                  <Text fontWeight="medium" color={labelColor}>Account Status</Text>
                  <Flex align="center">
                    <Text fontSize="lg">Active</Text>
                    <Badge ml={2} colorScheme="blue">Ready</Badge>
                  </Flex>
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </Box>
        
        {/* What's Next */}
        <Box
          bg={cardBg}
          borderRadius="xl"
          boxShadow="md"
          p={8}
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Heading size="lg" mb={6}>What's Next?</Heading>
          
          <List spacing={6}>
            <ListItem display="flex">
              <Box bg={featureIconBg} p={3} borderRadius="full" mr={4}>
                <Icon as={FiClock} color="blue.500" boxSize={5} />
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize="lg">Wait for lender responses</Text>
                <Text color={labelColor}>
                  Lenders typically respond to document requests within 30 days. 
                  We'll notify you when responses arrive.
                </Text>
              </Box>
            </ListItem>
            
            <ListItem display="flex">
              <Box bg={featureIconBg} p={3} borderRadius="full" mr={4}>
                <Icon as={FiFileText} color="blue.500" boxSize={5} />
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize="lg">Review your documents</Text>
                <Text color={labelColor}>
                  Once lenders respond, you'll be able to review the documents 
                  and agreements through your dashboard.
                </Text>
              </Box>
            </ListItem>
            
            <ListItem display="flex">
              <Box bg={featureIconBg} p={3} borderRadius="full" mr={4}>
                <Icon as={FiMail} color="blue.500" boxSize={5} />
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize="lg">Stay informed</Text>
                <Text color={labelColor}>
                  We'll keep you updated via email about the progress of your claims.
                  Check your inbox regularly.
                </Text>
              </Box>
            </ListItem>
          </List>
        </Box>
        
        <Divider />
        
        {/* Go to Dashboard Button */}
        <Flex justify="center">
          <Button
            size="lg"
            colorScheme="blue"
            rightIcon={<FiHome />}
            onClick={() => navigate('/dashboard')}
            px={10}
            py={6}
            fontSize="lg"
            bgGradient="linear(to-r, blue.400, blue.600)"
            _hover={{
              bgGradient: "linear(to-r, blue.500, blue.700)",
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Go to Your Dashboard
          </Button>
        </Flex>
        
        {/* Help Info */}
        <HStack justifyContent="center" color={labelColor}>
          <Text>Need help?</Text>
          <Button variant="link" colorScheme="blue">
            Contact support
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Confirmation; 