import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Badge,
  Box,
  useColorModeValue,
  Divider,
  useBreakpointValue,
} from '@chakra-ui/react';

interface AddAgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
  lenderName?: string;
  lenderId?: string;
  onAddAgreement?: (agreementData: { agreementNumber: string, carRegistration: string, lenderId?: string }) => Promise<void>;
}

const AddAgreementModal: React.FC<AddAgreementModalProps> = ({
  isOpen,
  onClose,
  lenderName,
  lenderId,
  onAddAgreement,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [agreementData, setAgreementData] = useState({
    agreementNumber: '',
    carRegistration: '',
  });

  // Responsive values
  const modalPadding = useBreakpointValue({ base: "4", md: "6" });
  const badgePadding = useBreakpointValue({ base: "2", md: "3" });
  const stackSpacing = useBreakpointValue({ base: 4, md: 6 });

  // Reset state when modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      setAgreementData({
        agreementNumber: '',
        carRegistration: '',
      });
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAgreementData({
      ...agreementData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (onAddAgreement) {
        // Pass the agreement data to the parent component
        await onAddAgreement({
          agreementNumber: agreementData.agreementNumber,
          carRegistration: agreementData.carRegistration,
          lenderId: lenderId,
        });
      }
      onClose();
    } catch (error) {
      console.error('Error adding agreement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // UI Colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const badgeBg = useColorModeValue('blue.50', 'blue.900');
  const badgeColor = useColorModeValue('blue.600', 'blue.200');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
      <ModalContent 
        borderRadius="xl" 
        bg={bgColor}
        mx={{ base: "4", md: "0" }}
        my={{ base: "4", md: "0" }}
      >
        <ModalHeader 
          borderBottomWidth="1px" 
          borderColor={borderColor}
          px={modalPadding} 
          py={{ base: 3, md: 4 }}
        >
          <Text fontSize="xl" fontWeight="bold">Add Agreement Details</Text>
          <Text fontSize="sm" color="gray.500" mt={1}>
            Enter the agreement details from the documents you received
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody py={{ base: 4, md: 6 }} px={modalPadding}>
          <Stack spacing={stackSpacing}>
            {/* Lender Badge */}
            <Badge
              alignSelf="flex-start"
              px={badgePadding}
              py={2}
              borderRadius="md"
              bg={badgeBg}
              color={badgeColor}
              fontWeight="medium"
            >
              {lenderName}
            </Badge>

            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={{ base: 3, md: 4 }}>
                Agreement Information
              </Text>
              
              <Stack spacing={{ base: 3, md: 4 }}>
                <FormControl isRequired>
                  <FormLabel>Agreement Number</FormLabel>
                  <Input 
                    placeholder="e.g. FIN1234678"
                    name="agreementNumber"
                    value={agreementData.agreementNumber}
                    onChange={handleInputChange}
                    bg={inputBg}
                    size={{ base: "md", md: "md" }}
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Car Registration</FormLabel>
                  <Input 
                    placeholder="e.g. AB12 CDE"
                    name="carRegistration"
                    value={agreementData.carRegistration}
                    onChange={handleInputChange}
                    bg={inputBg}
                    size={{ base: "md", md: "md" }}
                  />
                </FormControl>
              </Stack>
            </Box>           
            <Divider />
          </Stack>
        </ModalBody>

        <ModalFooter 
          borderTopWidth="1px" 
          borderColor={borderColor}
          px={modalPadding}
          py={{ base: 3, md: 4 }}
          flexDirection={{ base: "column", sm: "row" }}
          gap={{ base: 2, sm: 0 }}
        >
          <Button 
            variant="outline" 
            mr={{ base: 0, sm: 3 }} 
            w={{ base: "full", sm: "auto" }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            colorScheme="blue" 
            onClick={handleSubmit} 
            isLoading={isLoading}
            loadingText="Saving"
            isDisabled={!agreementData.agreementNumber || !agreementData.carRegistration}
            w={{ base: "full", sm: "auto" }}
          >
            Save Agreement
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddAgreementModal;