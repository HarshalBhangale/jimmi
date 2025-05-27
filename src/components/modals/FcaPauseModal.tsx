// @ts-nocheck
import { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { FiClock, FiSend, FiInfo, FiX } from 'react-icons/fi';

interface FcaPauseModalProps {
  isOpen: boolean;
  onClose: () => void;
  lenderName: string;
}

const FcaPauseModal = ({ isOpen, onClose, lenderName }: FcaPauseModalProps) => {
  const [customMessage, setCustomMessage] = useState('');
  const [emailSubject, setEmailSubject] = useState(`${lenderName} Request claim take over`);
  
  // Color scheme
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const highlightBg = useColorModeValue('blue.50', 'blue.900');
  const iconBg = useColorModeValue('blue.100', 'blue.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
  const inputBg = useColorModeValue('white', 'gray.700');
  const closeButtonBg = useColorModeValue('whiteAlpha.800', 'whiteAlpha.200');

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size={{ base: 'full', sm: 'md', md: 'lg' }} 
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
        maxW={{ base: '100%', sm: '600px' }}
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
          bg="blue.500" 
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
            bg="blue.400" 
            opacity={0.6}
          />
          <Box 
            position="absolute" 
            bottom="-30px" 
            left="20%" 
            width="80px" 
            height="80px" 
            borderRadius="full" 
            bg="blue.600" 
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
              <Icon as={FiClock} boxSize={{ base: 5, md: 6 }} color="blue.500" />
            </Flex>
            <Box>
              <Heading 
                size={{ base: "md", md: "lg" }} 
                color="white" 
                fontWeight="bold"
                lineHeight="1.2"
              >
                FCA Pause: What It Means
              </Heading>
              <Text 
                color="whiteAlpha.900" 
                mt={1}
                fontSize={{ base: "sm", md: "md" }}
              >
                Your claim is still valid, but on hold
              </Text>
            </Box>
          </Flex>
        </Box>
        
        <ModalBody 
          py={{ base: 6, md: 8 }} 
          px={{ base: 4, md: 6 }}
        >
          <VStack spacing={{ base: 5, md: 6 }} align="stretch">
            {/* Main explanation text */}
            <Text fontSize={{ base: "md", md: "lg" }} color={textColor} lineHeight="tall">
              The Financial Conduct Authority (FCA) has paused how lenders must respond to complaints about car finance commission.
            </Text>
            
            {/* Highlighted info box */}
            <Box 
              p={{ base: 4, md: 5 }}
              bg={highlightBg} 
              borderRadius="md" 
              borderLeftWidth="4px" 
              borderLeftColor="blue.500"
              boxShadow="sm"
            >
              <Flex align="flex-start">
                <Icon as={FiInfo} color="blue.500" boxSize={5} mt={0.5} mr={3} />
                <Text fontWeight="medium" color={textColor}>
                  This means lenders <strong>don't have to reply until after 4th December 2025</strong>.
                </Text>
              </Flex>
            </Box>
            
            {/* Additional explanation */}
            <Text fontSize={{ base: "md", md: "lg" }} color={textColor} lineHeight="tall">
              If you've submitted your claim, you've done everything right — now it's just a matter of waiting for lenders to respond once the pause ends.
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FcaPauseModal; 