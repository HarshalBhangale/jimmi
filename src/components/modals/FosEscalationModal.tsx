// @ts-nocheck
import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  VStack,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import { FiAlertCircle, FiCheck, FiExternalLink, FiX } from 'react-icons/fi';

interface FosEscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FosEscalationModal = ({ isOpen, onClose }: FosEscalationModalProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const stepBg = useColorModeValue('purple.50', 'purple.900');
  const iconBg = useColorModeValue('purple.100', 'purple.800');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
  const closeButtonBg = useColorModeValue('whiteAlpha.800', 'whiteAlpha.200');
  
  const handleOpenFosWebsite = () => {
    window.open('https://www.financial-ombudsman.org.uk/make-complaint', '_blank');
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size={{ base: 'full', sm: 'md', md: 'xl' }} 
      isCentered
      motionPreset="slideInBottom"
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
      <ModalContent 
        borderRadius={{ base: 0, sm: 'xl' }} 
        mx={{ base: 0, sm: 4 }} 
        my={{ base: 0, sm: 4 }}
        bg={bgColor}
        overflow="hidden"
        maxH={{ base: '100vh', sm: '90vh' }}
        maxW={{ base: '100%', sm: '700px' }}
        position="relative"
      >
        {/* Custom close button */}
        <IconButton
          aria-label="Close modal"
          icon={<FiX />}
          position="absolute"
          top={3}
          right={3}
          zIndex={10}
          size="md"
          isRound
          bg={closeButtonBg}
          color="white"
          _hover={{ bg: 'whiteAlpha.900', color: 'gray.800' }}
          _active={{ bg: 'white' }}
          onClick={onClose}
          boxShadow="sm"
        />
        
        {/* Header with decorative elements */}
        <Box 
          bg="purple.600" 
          py={{ base: 6, md: 8 }}
          px={{ base: 5, md: 8 }}
          position="relative"
          overflow="hidden"
        >
          {/* Decorative circles */}
          <Box 
            position="absolute" 
            top="-20px" 
            right="-20px" 
            width="100px" 
            height="100px" 
            borderRadius="full" 
            bg="purple.500" 
            opacity={0.6}
          />
          <Box 
            position="absolute" 
            bottom="-30px" 
            left="20%" 
            width="80px" 
            height="80px" 
            borderRadius="full" 
            bg="purple.700" 
            opacity={0.4}
          />
          
          {/* Header content */}
          <Flex align="center" position="relative" zIndex={1}>
            <Flex
              bg={iconBg} 
              p={3} 
              borderRadius="full" 
              mr={4}
              justify="center"
              align="center"
              flexShrink={0}
            >
              <Icon as={FiAlertCircle} boxSize={{ base: 5, md: 6 }} color="purple.500" />
            </Flex>
            <Box>
              <Heading 
                size={{ base: "md", md: "lg" }} 
                color="white" 
                fontWeight="bold"
                lineHeight="1.2"
              >
                This Is As Far As Buddy Can Take You
              </Heading>
              <Text 
                color="whiteAlpha.900" 
                mt={1}
                fontSize={{ base: "sm", md: "md" }}
              >
                Next step: Financial Ombudsman Service
              </Text>
            </Box>
          </Flex>
        </Box>
        
        <ModalBody 
          py={{ base: 6, md: 8 }} 
          px={{ base: 4, md: 6 }}
          overflowY="auto"
        >
          <VStack spacing={{ base: 5, md: 6 }} align="stretch">
            {/* Main explanation text */}
            <Text fontSize={{ base: "md", md: "lg" }} color={textColor} lineHeight="tall">
              Thanks for using Buddy to help with your claim. If you're not satisfied with the lender's response, or you still believe you're entitled to redress, you have the right to escalate your complaint to the Financial Ombudsman Service (FOS).
            </Text>
            
            {/* Highlighted info box */}
            <Box 
              p={{ base: 4, md: 5 }}
              bg={stepBg} 
              borderRadius="md" 
              borderLeftWidth="4px" 
              borderLeftColor="purple.500"
              boxShadow="sm"
            >
              <Flex align="flex-start">
                <Icon as={FiAlertCircle} color="purple.500" boxSize={5} mt={0.5} mr={3} />
                <Text fontWeight="medium" color={textColor}>
                  The Ombudsman is completely free, impartial, and has the authority to make legally binding decisions on financial complaints.
                </Text>
              </Flex>
            </Box>
            
            {/* Call to action button */}
            <Button
              colorScheme="purple"
              size="lg"
              width="full"
              height={{ base: "54px", md: "60px" }}
              rightIcon={<FiExternalLink />}
              onClick={handleOpenFosWebsite}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
              fontWeight="semibold"
              fontSize={{ base: "md", md: "lg" }}
              mt={2}
            >
              Complain Here
            </Button>
            
            <Divider borderColor={borderColor} my={2} />
            
            {/* Steps Section */}
            <Box>
              <Heading 
                size="md" 
                mb={{ base: 3, md: 4 }}
                color={textColor}
                fontWeight="bold"
              >
                What to Do Next
              </Heading>
              
              <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                {/* Step 1 */}
                <Card 
                  p={{ base: 3, md: 4 }} 
                  bg={cardBg} 
                  borderRadius="md"
                  boxShadow="sm"
                  borderWidth="1px"
                  borderColor={borderColor}
                  transition="all 0.2s"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                >
                  <Flex align="flex-start" gap={{ base: 3, md: 4 }}>
                    <Flex
                      minW={{ base: "32px", md: "36px" }}
                      h={{ base: "32px", md: "36px" }}
                      bg="purple.100"
                      color="purple.600"
                      borderRadius="full"
                      justify="center"
                      align="center"
                      fontWeight="bold"
                      flexShrink={0}
                      fontSize={{ base: "md", md: "lg" }}
                      boxShadow="sm"
                    >
                      1
                    </Flex>
                    <Box>
                      <Heading size="sm" mb={1} color={textColor}>Visit the Ombudsman's Online Form</Heading>
                      <Text fontSize={{ base: "sm", md: "md" }} color={mutedTextColor}>Tap the button above to start your complaint.</Text>
                    </Box>
                  </Flex>
                </Card>
                
                {/* Step 2 */}
                <Card 
                  p={{ base: 3, md: 4 }} 
                  bg={cardBg} 
                  borderRadius="md"
                  boxShadow="sm"
                  borderWidth="1px"
                  borderColor={borderColor}
                  transition="all 0.2s"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                >
                  <Flex align="flex-start" gap={{ base: 3, md: 4 }}>
                    <Flex
                      minW={{ base: "32px", md: "36px" }}
                      h={{ base: "32px", md: "36px" }}
                      bg="purple.100"
                      color="purple.600"
                      borderRadius="full"
                      justify="center"
                      align="center"
                      fontWeight="bold"
                      flexShrink={0}
                      fontSize={{ base: "md", md: "lg" }}
                      boxShadow="sm"
                    >
                      2
                    </Flex>
                    <Box flex="1" minW="0">
                      <Heading size="sm" mb={1} color={textColor}>Prepare Your Details</Heading>
                      <Text mb={2} fontSize={{ base: "sm", md: "md" }} color={mutedTextColor}>You'll need to provide:</Text>
                      <List spacing={1}>
                        <ListItem fontSize={{ base: "sm", md: "md" }} color={textColor}>
                          <ListIcon as={FiCheck} color="green.500" />
                          Your full name and contact info
                        </ListItem>
                        <ListItem fontSize={{ base: "sm", md: "md" }} color={textColor}>
                          <ListIcon as={FiCheck} color="green.500" />
                          The name of the lender and any reference numbers
                        </ListItem>
                        <ListItem fontSize={{ base: "sm", md: "md" }} color={textColor}>
                          <ListIcon as={FiCheck} color="green.500" />
                          A summary of what happened and why you're unhappy
                        </ListItem>
                        <ListItem fontSize={{ base: "sm", md: "md" }} color={textColor}>
                          <ListIcon as={FiCheck} color="green.500" />
                          Any supporting documents (Buddy can help you download these)
                        </ListItem>
                      </List>
                    </Box>
                  </Flex>
                </Card>
                
                {/* Step 3 */}
                <Card 
                  p={{ base: 3, md: 4 }} 
                  bg={cardBg} 
                  borderRadius="md"
                  boxShadow="sm"
                  borderWidth="1px"
                  borderColor={borderColor}
                  transition="all 0.2s"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                >
                  <Flex align="flex-start" gap={{ base: 3, md: 4 }}>
                    <Flex
                      minW={{ base: "32px", md: "36px" }}
                      h={{ base: "32px", md: "36px" }}
                      bg="purple.100"
                      color="purple.600"
                      borderRadius="full"
                      justify="center"
                      align="center"
                      fontWeight="bold"
                      flexShrink={0}
                      fontSize={{ base: "md", md: "lg" }}
                      boxShadow="sm"
                    >
                      3
                    </Flex>
                    <Box>
                      <Heading size="sm" mb={1} color={textColor}>Submit the Form</Heading>
                      <Text fontSize={{ base: "sm", md: "md" }} color={mutedTextColor}>
                        Once submitted, the FOS will take over. They'll review your case, contact the lender, and work toward a fair outcome.
                      </Text>
                    </Box>
                  </Flex>
                </Card>
              </VStack>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter 
          borderTopWidth="1px" 
          borderColor={borderColor}
          p={{ base: 4, md: 5 }}
          bg={useColorModeValue('gray.50', 'gray.900')}
        >
          <Button 
            colorScheme="purple" 
            onClick={onClose}
            size="lg"
            width={{ base: 'full', sm: 'auto' }}
            fontWeight="medium"
            boxShadow="sm"
            _hover={{
              transform: 'translateY(-1px)',
              boxShadow: 'md',
            }}
            transition="all 0.2s"
          >
            I Understand
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FosEscalationModal; 