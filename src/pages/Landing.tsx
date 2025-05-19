/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Icon,
  HStack,
  useColorModeValue,
  VStack,
  Link,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { FiArrowRight, FiUser, FiCheckCircle, FiMessageSquare } from 'react-icons/fi';

// Import components
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/hero';
import ActuallyDoes from '../components/landing/actually-does';
import Comparison from '../components/landing/comparison';
import Tools from '../components/landing/tools';
import Pricing from '../components/landing/pricing';


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

// FAQ Component
const FAQ = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  
  return (
    <Box as="section" py={20} bg={bgColor} id="faq">
      <Container maxW="container.xl">
        <VStack spacing={8} textAlign="center" mb={10}>
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            ❓ Questions We Hear A Lot
          </Heading>
        </VStack>
        
        <Box maxW="800px" mx="auto">
          <Accordion allowToggle>
            <AccordionItem mb={4} border="1px solid" borderColor="gray.200" borderRadius="lg" overflow="hidden">
              <h2>
                <AccordionButton py={4} _expanded={{ bg: "blue.50", color: "blue.700" }}>
                  <Box as="span" flex='1' textAlign='left' fontWeight="medium">
                    Do I need legal experience?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} bg={useColorModeValue('white', 'gray.800')}>
                Nope! Jimmi walks you through everything clearly. No jargon, no confusion.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem mb={4} border="1px solid" borderColor="gray.200" borderRadius="lg" overflow="hidden">
              <h2>
                <AccordionButton py={4} _expanded={{ bg: "blue.50", color: "blue.700" }}>
                  <Box as="span" flex='1' textAlign='left' fontWeight="medium">
                    Is this the same as using a claims company?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} bg={useColorModeValue('white', 'gray.800')}>
                Not at all — Jimmi is a tool you control, with no commissions or middlemen.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem mb={4} border="1px solid" borderColor="gray.200" borderRadius="lg" overflow="hidden">
              <h2>
                <AccordionButton py={4} _expanded={{ bg: "blue.50", color: "blue.700" }}>
                  <Box as="span" flex='1' textAlign='left' fontWeight="medium">
                    What if I get stuck?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} bg={useColorModeValue('white', 'gray.800')}>
                Jimmi helps you understand lender replies and gives you the next steps.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem mb={4} border="1px solid" borderColor="gray.200" borderRadius="lg" overflow="hidden">
              <h2>
                <AccordionButton py={4} _expanded={{ bg: "blue.50", color: "blue.700" }}>
                  <Box as="span" flex='1' textAlign='left' fontWeight="medium">
                    Do I have to pay more if I win?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} bg={useColorModeValue('white', 'gray.800')}>
                Never. You only pay once for Jimmi's help. Everything you reclaim is yours.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Container>
    </Box>
  );
};

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

// How It Works Steps
const HowItWorks = () => {
  return (
    <Box as="section" py={20} id="how-it-works">
      <Container maxW="container.xl">
        <VStack spacing={8} textAlign="center" mb={12}>
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            🏁 Ready When You Are
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }}
            maxW="2xl"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            Let Jimmi walk you through the process. You've got this — and he's got your back.
          </Text>
        </VStack>
        
        <Box maxW="800px" mx="auto">
          <Heading as="h3" size="lg" mb={8} textAlign="center">
            📅 How It Works
          </Heading>
          
          <VStack spacing={8} align="stretch">
            <HStack 
              bg={useColorModeValue('white', 'gray.800')} 
              p={6} 
              borderRadius="lg" 
              boxShadow="md"
              borderLeft="4px solid"
              borderColor="blue.400"
            >
              <Flex 
                bg="blue.100" 
                color="blue.700" 
                borderRadius="full" 
                w={10} 
                h={10} 
                align="center" 
                justify="center"
                fontWeight="bold"
                flexShrink={0}
              >
                1
              </Flex>
              <Box>
                <Text fontWeight="bold">Create your account</Text>
                <Text>Quick setup with phone verification</Text>
              </Box>
            </HStack>
            
            <HStack 
              bg={useColorModeValue('white', 'gray.800')} 
              p={6} 
              borderRadius="lg" 
              boxShadow="md"
              borderLeft="4px solid"
              borderColor="blue.400"
            >
              <Flex 
                bg="blue.100" 
                color="blue.700" 
                borderRadius="full" 
                w={10} 
                h={10} 
                align="center" 
                justify="center"
                fontWeight="bold"
                flexShrink={0}
              >
                2
              </Flex>
              <Box>
                <Text fontWeight="bold">Tell Jimmi about your loans</Text>
                <Text>Choose your lender, upload your documents</Text>
              </Box>
            </HStack>
            
            <HStack 
              bg={useColorModeValue('white', 'gray.800')} 
              p={6} 
              borderRadius="lg" 
              boxShadow="md"
              borderLeft="4px solid"
              borderColor="blue.400"
            >
              <Flex 
                bg="blue.100" 
                color="blue.700" 
                borderRadius="full" 
                w={10} 
                h={10} 
                align="center" 
                justify="center"
                fontWeight="bold"
                flexShrink={0}
              >
                3
              </Flex>
              <Box>
                <Text fontWeight="bold">Let Jimmi help you prepare your letters</Text>
                <Text>SARs and complaints generated based on your inputs</Text>
              </Box>
            </HStack>
            
            <HStack 
              bg={useColorModeValue('white', 'gray.800')} 
              p={6} 
              borderRadius="lg" 
              boxShadow="md"
              borderLeft="4px solid"
              borderColor="blue.400"
            >
              <Flex 
                bg="blue.100" 
                color="blue.700" 
                borderRadius="full" 
                w={10} 
                h={10} 
                align="center" 
                justify="center"
                fontWeight="bold"
                flexShrink={0}
              >
                4
              </Flex>
              <Box>
                <Text fontWeight="bold">Track everything</Text>
                <Text>All replies and updates go into your Jimmi Inbox</Text>
              </Box>
            </HStack>
          </VStack>
          
          <HStack spacing={4} justify="center" mt={12}>
            <Button
              as={RouterLink}
              to="/auth/signup/step-1"
              size="lg"
              colorScheme="blue"
              bgGradient="linear(to-r, blue.400, purple.500)"
              rightIcon={<FiArrowRight />}
              _hover={{ 
                bgGradient: "linear(to-r, blue.500, purple.600)",
                transform: 'translateY(-2px)', 
                boxShadow: 'lg' 
              }}
            >
              Start Now
            </Button>
            <Button
              as={RouterLink}
              to="/contact"
              size="lg"
              variant="outline"
              colorScheme="blue"
              _hover={{ 
                bg: 'blue.50',
                transform: 'translateY(-2px)', 
                boxShadow: 'sm' 
              }}
            >
              Need Help First?
            </Button>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

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

// Main Landing component
const Landing = () => {
  return (
    <Box>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* What Jimmi Actually Does Section */}
      <ActuallyDoes />

      {/* Comparison Section */}
      <Comparison />

      {/* Tools Section */}
      <Tools />
      
      {/* Is Jimmi Right For You Section */}
      <RightForYou />

      {/* FAQ Section */}
      <FAQ />
      
      {/* Pricing Section */}
      <Pricing />
      
      {/* Already Signed Up Section */}
      <AlreadySignedUp />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* How It Works Steps */}
      <HowItWorks />
      
      {/* Disclaimer */}
      <Disclaimer />

      {/* Footer */}
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
    </Box>
  );
};

export default Landing; 