// @ts-nocheck
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
  Text,
  Stack,
  Box,
  RadioGroup,
  Radio,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Flex,
  Card,
  useToast,
  Progress,
  Icon,
  Select,
} from '@chakra-ui/react';
import { 
  FiCheck, 
  FiX, 
  FiAlertTriangle, 
  FiClock, 
  FiDollarSign, 
  FiThumbsUp, 
  FiThumbsDown,
  FiSend,
  FiArrowRight,
  FiFileText
} from 'react-icons/fi';
import { updateClaim } from '@/api/services/claims';

interface Agreement {
  id: string;
  startDate?: string;
  endDate?: string;
  amount?: number;
  status: string;
  agreementNumber?: string;
  claimId?: string; // Add claimId for backend reference
}

interface LenderResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  lenderName: string;
  agreement: Agreement;
  agreements: Agreement[];
  onUpdateStatus: (agreementId: string, newStatus: string, details?: any) => Promise<void>;
}

const LenderResponseModal: React.FC<LenderResponseModalProps> = ({
  isOpen,
  onClose,
  lenderName,
  agreement,
  agreements,
  onUpdateStatus,
}) => {
  const [step, setStep] = useState(1);
  const [responseType, setResponseType] = useState('offer');
  const [offerAmount, setOfferAmount] = useState(0);
  const [isSatisfied, setIsSatisfied] = useState<boolean | null>(null);
  const [fcaReturnDate, setFcaReturnDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAgreementId, setSelectedAgreementId] = useState(agreement.id);
  const toast = useToast();

  // UI Colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  // const cardBg = useColorModeValue('gray.50', 'gray.700');
  
  // Get the selected agreement details
  const selectedAgreement = agreements.find(ag => ag.id === selectedAgreementId) || agreement;
  
  const handleNextStep = () => {
    // Validate current step
    if (responseType === 'offer' && offerAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid offer amount greater than 0",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    if (responseType === 'fcaPause' && !fcaReturnDate) {
      toast({
        title: "Missing date",
        description: "Please enter the comeback date after FCA pause",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // If we're at step 1 and the response is 'offer', go to step 2 for satisfaction
    if (step === 1 && responseType === 'offer') {
      setStep(2);
    } else {
      // Otherwise, submit directly
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Determine the new status and details based on response type
      let newStatus = '';
      let details = {};
      let offerStatus = null;
      
      switch (responseType) {
        case 'offer':
          newStatus = 'OfferMade';
          offerStatus = isSatisfied ? 'Satisfied' : 'NotSatisfied';
          details = { 
            offerAmount, 
            isSatisfied,
            responseAction: isSatisfied ? 'acceptance' : 'rejection'
          };
          break;
        case 'rejected':
          newStatus = 'Rejected';
          details = { escalateToFCA: true };
          break;
        case 'fcaPause':
          newStatus = 'FOS Escalation'; // Using FOSEscalation for FCA Pause
          details = { comebackDate: fcaReturnDate };
          break;
        case 'alreadySubmitted':
          newStatus = 'ClaimAlreadySubmitted';
          details = {};
          break;
      }
      
      // First, update the backend with agreement status changes
      if (selectedAgreement.claimId) {
        // Create update payload for the backend
        const updateData = {
          claimId: selectedAgreement.claimId,
          agreement: {
            status: newStatus,
            agreementNumber: selectedAgreement.agreementNumber
          }
        };
        
        // Add offerAmount if this is an offer
        if (responseType === 'offer') {
          updateData.agreement = {
            ...updateData.agreement,
            offerAmount: offerAmount,
            offerStatus: offerStatus
          } as any; // Type assertion needed since these properties aren't in the type definition
        }
        
        // Make the API call to update the claim in the backend
        await updateClaim(updateData);
      }
      
      // Then call the parent component's onUpdateStatus for UI updates
      await onUpdateStatus(selectedAgreementId, newStatus, details);
      
      toast({
        title: "Response recorded",
        description: `The lender's response has been recorded for agreement #${selectedAgreementId}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      onClose();
    } catch (error) {
      console.error('Error updating agreement status:', error);
      toast({
        title: "Error updating status",
        description: "There was an error recording the lender's response. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderAgreementSelector = () => (
    <Box mb={6}>
      <FormControl>
        <FormLabel>Select Agreement</FormLabel>
        <Select
          value={selectedAgreementId}
          onChange={(e) => setSelectedAgreementId(e.target.value)}
          icon={<FiFileText />}
        >
          {agreements.map((ag) => (
            <option key={ag.id} value={ag.id}>
              Agreement #{ag.agreementNumber || ag.id}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

  const renderResponseTypeOptions = () => (
    <RadioGroup value={responseType} onChange={setResponseType} mb={6}>
      <Stack spacing={4}>
        <Card
          variant="outline"
          p={4}
          borderColor={responseType === 'offer' ? 'blue.300' : borderColor}
          bg={responseType === 'offer' ? 'blue.50' : bgColor}
          _hover={{ boxShadow: 'md' }}
        >
          <Flex align="flex-start">
            <Radio value="offer" colorScheme="blue" mr={3} mt={1} />
            <Box>
              <Flex align="center">
                <Icon as={FiDollarSign} mr={2} color="green.500" />
                <Text fontWeight="bold">Made an Offer</Text>
              </Flex>
              <Text fontSize="sm" color="gray.600" mt={1}>
                The lender has made a compensation offer.
              </Text>
              
              {responseType === 'offer' && (
                <Box mt={4}>
                  <FormControl>
                    <FormLabel>Offer Amount (£)</FormLabel>
                    <NumberInput 
                      value={offerAmount} 
                      onChange={(_, value) => setOfferAmount(value)}
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Box>
              )}
            </Box>
          </Flex>
        </Card>
        
        <Card
          variant="outline"
          p={4}
          borderColor={responseType === 'rejected' ? 'red.300' : borderColor}
          bg={responseType === 'rejected' ? 'red.50' : bgColor}
          _hover={{ boxShadow: 'md' }}
        >
          <Flex align="flex-start">
            <Radio value="rejected" colorScheme="red" mr={3} mt={1} />
            <Box>
              <Flex align="center">
                <Icon as={FiX} mr={2} color="red.500" />
                <Text fontWeight="bold">Rejected</Text>
              </Flex>
              <Text fontSize="sm" color="gray.600" mt={1}>
                The lender has rejected the claim. This can be escalated to the FCA.
              </Text>
            </Box>
          </Flex>
        </Card>
        
        <Card
          variant="outline"
          p={4}
          borderColor={responseType === 'fcaPause' ? 'purple.300' : borderColor}
          bg={responseType === 'fcaPause' ? 'purple.50' : bgColor}
          _hover={{ boxShadow: 'md' }}
        >
          <Flex align="flex-start">
            <Radio value="fcaPause" colorScheme="purple" mr={3} mt={1} />
            <Box>
              <Flex align="center">
                <Icon as={FiClock} mr={2} color="purple.500" />
                <Text fontWeight="bold">Come back after 28 Days FCA Pause</Text>
              </Flex>
              <Text fontSize="sm" color="gray.600" mt={1}>
                The lender has requested a 28-day pause due to FCA regulations.
              </Text>
            </Box>
          </Flex>
        </Card>
        
        <Card
          variant="outline"
          p={4}
          borderColor={responseType === 'alreadySubmitted' ? 'yellow.300' : borderColor}
          bg={responseType === 'alreadySubmitted' ? 'yellow.50' : bgColor}
          _hover={{ boxShadow: 'md' }}
        >
          <Flex align="flex-start">
            <Radio value="alreadySubmitted" colorScheme="yellow" mr={3} mt={1} />
            <Box>
              <Flex align="center">
                <Icon as={FiAlertTriangle} mr={2} color="yellow.500" />
                <Text fontWeight="bold">Claim Already Submitted</Text>
              </Flex>
              <Text fontSize="sm" color="gray.600" mt={1}>
                The lender states that this claim was already submitted previously.
              </Text>
            </Box>
          </Flex>
        </Card>
      </Stack>
    </RadioGroup>
  );

  const renderSatisfactionOptions = () => (
    <>
      <Text fontSize="md" fontWeight="semibold" mb={4}>
        Are you satisfied with the offer of <Text as="span" fontWeight="bold">£{offerAmount.toLocaleString()}</Text>?
      </Text>
      
      <Stack spacing={4}>
        <Card
          variant="outline"
          p={4}
          borderColor={isSatisfied === true ? 'green.300' : borderColor}
          bg={isSatisfied === true ? 'green.50' : bgColor}
          _hover={{ boxShadow: 'md' }}
          onClick={() => setIsSatisfied(true)}
          cursor="pointer"
        >
          <Flex align="center">
            <Icon as={FiThumbsUp} mr={3} color="green.500" />
            <Box>
              <Text fontWeight="bold">Satisfied with the offer</Text>
              <Text fontSize="sm" color="gray.600" mt={1}>
                Accept the offer and proceed with the acceptance email.
              </Text>
            </Box>
          </Flex>
        </Card>
        
        <Card
          variant="outline"
          p={4}
          borderColor={isSatisfied === false ? 'red.300' : borderColor}
          bg={isSatisfied === false ? 'red.50' : bgColor}
          _hover={{ boxShadow: 'md' }}
          onClick={() => setIsSatisfied(false)}
          cursor="pointer"
        >
          <Flex align="center">
            <Icon as={FiThumbsDown} mr={3} color="red.500" />
            <Box>
              <Text fontWeight="bold">Not satisfied with the offer</Text>
              <Text fontSize="sm" color="gray.600" mt={1}>
                Reject the offer and send a rejection email.
              </Text>
            </Box>
          </Flex>
        </Card>
      </Stack>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
      <ModalContent borderRadius="xl" bg={bgColor}>
        <ModalHeader borderBottomWidth="1px" borderColor={borderColor} py={4}>
          <Text fontSize="xl" fontWeight="bold">
            Record Lender Response
          </Text>
          <Progress 
            value={step === 1 ? 50 : 100} 
            size="sm" 
            colorScheme="blue" 
            borderRadius="full" 
            mt={2}
          />
          <Text fontSize="sm" color="gray.500" mt={2}>
            Lender: {lenderName}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody py={6}>
          {step === 1 ? (
            <Box>
              {renderAgreementSelector()}
              <Text fontSize="md" mb={4}>
                What was the lender's response to the claim?
              </Text>
              {renderResponseTypeOptions()}
            </Box>
          ) : (
            <Box>
              {renderSatisfactionOptions()}
            </Box>
          )}
        </ModalBody>

        <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
          {step === 1 ? (
            <>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button 
                colorScheme="blue" 
                onClick={handleNextStep}
                rightIcon={responseType === 'offer' ? <FiArrowRight /> : <FiSend />}
                isLoading={isLoading}
              >
                {responseType === 'offer' ? 'Next' : 'Record Response'}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" mr={3} onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                colorScheme="green" 
                onClick={handleSubmit}
                isLoading={isLoading}
                isDisabled={isSatisfied === null}
                leftIcon={<FiCheck />}
              >
                Record Response
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LenderResponseModal; 