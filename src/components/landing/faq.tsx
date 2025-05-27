// @ts-nocheck
import {
  Box,
  Container,
  Heading,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
  Text,
  Icon,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { FiHelpCircle } from 'react-icons/fi';

// FAQ Component
const FAQ = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('purple.200', 'purple.700');
  const hoverBg = useColorModeValue('purple.50', 'purple.900');
  
  return (
    <Box as="section" py={20} bg={bgColor} id="faq">
      <Container maxW="container.xl">
        <VStack spacing={8} textAlign="center" mb={12}>
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            Got Questions? We've Got Answers
          </Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')} maxW="2xl">
            Everything you need to know about using buddy to claim what's yours
          </Text>
        </VStack>
        
        <Box maxW="800px" mx="auto">
          <Accordion allowToggle>
            <AccordionItem 
              mb={4} 
              border="1px solid" 
              borderColor={borderColor} 
              borderRadius="xl" 
              overflow="hidden"
              transition="all 0.3s ease"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
            >
              <h2>
                <AccordionButton 
                  py={5} 
                  _expanded={{ bg: hoverBg, color: "purple.700" }}
                  transition="all 0.2s ease"
                >
                  <Box as="span" flex='1' textAlign='left' fontWeight="semibold" fontSize="lg">
                    Do I need legal experience?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={5} bg={cardBg}>
                <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.300')}>
                  Nope! buddy walks you through everything clearly. No jargon, no confusion.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem 
              mb={4} 
              border="1px solid" 
              borderColor={borderColor} 
              borderRadius="xl" 
              overflow="hidden"
              transition="all 0.3s ease"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
            >
              <h2>
                <AccordionButton 
                  py={5} 
                  _expanded={{ bg: hoverBg, color: "purple.700" }}
                  transition="all 0.2s ease"
                >
                  <Box as="span" flex='1' textAlign='left' fontWeight="semibold" fontSize="lg">
                    Is this the same as using a claims company?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={5} bg={cardBg}>
                <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.300')}>
                  Not at all — buddy is a tool you control, with no commissions or middlemen.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem 
              mb={4} 
              border="1px solid" 
              borderColor={borderColor} 
              borderRadius="xl" 
              overflow="hidden"
              transition="all 0.3s ease"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
            >
              <h2>
                <AccordionButton 
                  py={5} 
                  _expanded={{ bg: hoverBg, color: "purple.700" }}
                  transition="all 0.2s ease"
                >
                  <Box as="span" flex='1' textAlign='left' fontWeight="semibold" fontSize="lg">
                    What if I get stuck?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={5} bg={cardBg}>
                <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.300')}>
                  buddy helps you understand lender replies and gives you the next steps.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem 
              mb={4} 
              border="1px solid" 
              borderColor={borderColor} 
              borderRadius="xl" 
              overflow="hidden"
              transition="all 0.3s ease"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
            >
              <h2>
                <AccordionButton 
                  py={5} 
                  _expanded={{ bg: hoverBg, color: "purple.700" }}
                  transition="all 0.2s ease"
                >
                  <Box as="span" flex='1' textAlign='left' fontWeight="semibold" fontSize="lg">
                    Do I have to pay more if I win?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={5} bg={cardBg}>
                <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.300')}>
                  Never. You only pay once for buddy's help. Everything you reclaim is yours.
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;