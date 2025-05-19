import React, { useState } from 'react';
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
  lenderName = 'Black Horse',
  lenderId,
  onAddAgreement,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [agreementData, setAgreementData] = useState({
    agreementNumber: '',
    carRegistration: '',
  });

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
      <ModalContent borderRadius="xl" bg={bgColor}>
        <ModalHeader borderBottomWidth="1px" borderColor={borderColor} py={4}>
          <Text fontSize="xl" fontWeight="bold">Add Agreement Details</Text>
          <Text fontSize="sm" color="gray.500" mt={1}>
            Enter the agreement details from the documents you received
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody py={6}>
          <Stack spacing={6}>
            {/* Lender Badge */}
            <Badge
              alignSelf="flex-start"
              px={3}
              py={2}
              borderRadius="md"
              bg={badgeBg}
              color={badgeColor}
              fontWeight="medium"
            >
              {lenderName}
            </Badge>

            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Agreement Information
              </Text>
              
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Agreement Number</FormLabel>
                  <Input 
                    placeholder="e.g. FIN1234678"
                    name="agreementNumber"
                    value={agreementData.agreementNumber}
                    onChange={handleInputChange}
                    bg={inputBg}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Car Registration (Optional)</FormLabel>
                  <Input 
                    placeholder="e.g. AB12 CDE"
                    name="carRegistration"
                    value={agreementData.carRegistration}
                    onChange={handleInputChange}
                    bg={inputBg}
                  />
                </FormControl>
              </Stack>
            </Box>           
            <Divider />
          </Stack>
        </ModalBody>

        <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button 
            colorScheme="blue" 
            onClick={handleSubmit} 
            isLoading={isLoading}
            loadingText="Saving"
            isDisabled={!agreementData.agreementNumber}
          >
            Save Agreement
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddAgreementModal; 