// @ts-nocheck
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
import { getTemplates } from '@/api/services/templates';
import { interpolateString } from '@/utils';
import { userAtom } from '@/jotai/atoms';
import { useAtomValue } from 'jotai';



interface Agreement {
  id: string;
  startDate?: string;
  endDate?: string;
  amount?: number;
  status: string;
  agreementNumber?: string;
  claimId?: string; // Add claimId for backend reference
}

interface EmailTemplate {
  id: string;
  name: string;
  description: string;
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
  const [responseType, setResponseType] = useState('offer');
  const [offerAmount, setOfferAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAgreementId, setSelectedAgreementId] = useState(agreement.id);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState<string>('');
  const [detailedTemplates, setDetailedTemplates] = useState<any[]>([]);
  const [wantToTakeOver, setWantToTakeOver] = useState<boolean | null>(null);
  const [rejectedAction, setRejectedAction] = useState<'fosEscalation' | 'leaveAsIs' | null>(null);
  const [accountName, setAccountName] = useState('');
  const [sortCode, setSortCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const toast = useToast();
  const user = useAtomValue(userAtom);

  // Reset all state variables to their initial values
  const resetState = () => {
    setResponseType('offer');
    setOfferAmount(0);
    setIsLoading(false);
    setSelectedAgreementId(agreement.id);
    setSelectedEmailTemplate('');
    setDetailedTemplates([]);
    setWantToTakeOver(null);
    setRejectedAction(null);
    setAccountName('');
    setSortCode('');
    setAccountNumber('');
  };

  // Reset state when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      resetState();
    }
  }, [isOpen]);

  // UI Colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  // const cardBg = useColorModeValue('gray.50', 'gray.700');

  // Get the selected agreement details
  const selectedAgreement = agreements.find(ag => ag.id === selectedAgreementId) || agreement;

  // Add template mapping
  const responseTemplates = {
    offer: {
      accept: {
        title: "Accept Offer",
        templateName: "acceptOffer",
      },
      reject: {
        title: "Reject Offer & Request Calculation",
        templateName: "rejectOfferRequestCalculation",
      }
    },
    rejected: {
      zeroCommission: {
        title: "Zero Commission No Redress Due",
        templateName: "zeroCommissionNoRedressDue",
      },
      leaveAsIs: {
        title: "Leave as is",
        // templateName: "leaveAsIs",
      }
    },
    alreadySubmitted: {
      takeOver: {
        title: "Already Claimed - Request Take Over",
        templateName: "alreadyClaimedRequestToTakeOverClaim",
      }
    }
  };

  // Add useEffect to fetch templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templates = [];

        // Skip template loading if it's alreadySubmitted and user doesn't want to take over
        if (responseType === 'alreadySubmitted' && wantToTakeOver === false) {
          setDetailedTemplates([]);
          return;
        }

        // Skip template loading for FCA pause and rejected status
        if (responseType === 'fcaPause' || responseType === 'rejected') {
          setDetailedTemplates([]);
          return;
        }

        // Fetch templates based on response type
        if (responseType === 'offer') {
          const acceptTemplate = await getTemplates(responseTemplates.offer.accept.templateName);
          const rejectTemplate = await getTemplates(responseTemplates.offer.reject.templateName);

          templates.push({
            ...responseTemplates.offer.accept,
            text: interpolateString(acceptTemplate.body, [
              { key: 'lender', value: lenderName },
              { key: 'fullName', value: `${user.firstName} ${user.lastName}` },
              { key: 'offerAmount', value: offerAmount.toString() },
              { key: 'accName', value: accountName },
              { key: 'sortCode', value: sortCode },
              { key: 'accNumber', value: accountNumber }
            ]),
            subject: acceptTemplate.subject
          });

          templates.push({
            ...responseTemplates.offer.reject,
            text: interpolateString(rejectTemplate.body, [
              { key: 'lender', value: lenderName },
              { key: 'fullName', value: `${user.firstName} ${user.lastName}` },
              { key: 'offerAmount', value: offerAmount.toString() }
            ]),
            subject: rejectTemplate.subject
          });
        } else if (responseType === 'alreadySubmitted' && wantToTakeOver) {
          const takeOverTemplate = await getTemplates(responseTemplates.alreadySubmitted.takeOver.templateName);

          templates.push({
            ...responseTemplates.alreadySubmitted.takeOver,
            text: interpolateString(takeOverTemplate.body, [
              { key: 'lender', value: lenderName },
              { key: 'fullName', value: `${user.firstName} ${user.lastName}` }
            ]),
            subject: takeOverTemplate.subject
          });
        }

        setDetailedTemplates(templates);
      } catch (error) {
        console.error('Error fetching templates:', error);
        toast({
          title: "Error loading templates",
          description: "There was an error loading the email templates. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    if (isOpen) {
      fetchTemplates();
    }
  }, [isOpen, responseType, offerAmount, lenderName, user, wantToTakeOver, rejectedAction, accountName, sortCode, accountNumber]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Validate account details if accepting offer
      if (responseType === 'offer' && selectedEmailTemplate === responseTemplates.offer.accept.templateName) {
        if (!accountName || !sortCode || !accountNumber) {
          toast({
            title: "Missing account details",
            description: "Please fill in all account details to accept the offer",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
          return;
        }
      }

      // Validate offer amount if it's an offer
      if (responseType === 'offer' && offerAmount <= 0) {
        toast({
          title: "Invalid amount",
          description: "Please enter a valid offer amount greater than 0",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
        return;
      }

      // Validate rejected action if rejected
      if (responseType === 'rejected' && !rejectedAction) {
        toast({
          title: "Missing action",
          description: "Please select an action for the rejected claim",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
        return;
      }

      // Determine the new status and details based on response type
      let newStatus = '';
      let details = {};

      switch (responseType) {
        case 'offer':
          newStatus = 'OfferMade';
          details = {
            offerAmount,
            responseAction: 'offer'
          };
          break;
        case 'rejected':
          newStatus = rejectedAction === 'fosEscalation' ? 'FOSEscalation' : 'Rejected';
          details = { 
            escalateToFCA: rejectedAction === 'fosEscalation',
            responseAction: rejectedAction
          };
          break;
        case 'fcaPause':
          newStatus = 'FCAPause';
          details = { responseAction: 'fcaPause' };
          break;
        case 'alreadySubmitted':
          newStatus = 'ClaimAlreadySubmitted';
          details = {
            wantToTakeOver,
            responseAction: wantToTakeOver ? 'takeOver' : 'close'
          };
          break;
      }

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
          offerAmount: offerAmount
        } as any;
      }

      // Add takeover details if applicable
      if (responseType === 'alreadySubmitted') {
        updateData.agreement = {
          ...updateData.agreement,
          wantToTakeOver,
          responseAction: wantToTakeOver ? 'takeOver' : 'close'
        } as any;
      }

      // Add email details if template is selected and not rejected status
      if (selectedEmailTemplate && 
          !(responseType === 'alreadySubmitted' && !wantToTakeOver) && 
          responseType !== 'rejected') {
        const selectedTemplate = detailedTemplates.find(t => t.templateName === selectedEmailTemplate);
        if (selectedTemplate) {
          updateData.mail = {
            subject: selectedTemplate.subject,
            body: selectedTemplate.text
          };
        }
      }

      // Make the API call to update the claim in the backend
      await updateClaim(updateData);

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
                The lender has rejected the claim. This can be escalated to the FOS.
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

  const renderEmailTemplateSelection = () => {
    if (detailedTemplates.length === 0) return null;

    // For already submitted without takeover, don't show email template selection
    if (responseType === 'alreadySubmitted' && !wantToTakeOver) {
      return null;
    }

    // Don't show email template selection for FCA pause
    if (responseType === 'fcaPause') {
      return null;
    }

    return (
      <Box>
        <Text fontSize="md" fontWeight="semibold" mb={4}>
          Select Email Template
        </Text>
        {responseType === 'offer' && selectedEmailTemplate === responseTemplates.offer.accept.templateName && (
          <Box my={6}>
            <Text fontSize="md" fontWeight="semibold" mb={4}>
              Account Details for Payment
            </Text>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Account Name</FormLabel>
                <Input
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Enter account holder name"
                  isRequired
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Sort Code</FormLabel>
                <Input
                  value={sortCode}
                  onChange={(e) => setSortCode(e.target.value)}
                  placeholder="Enter sort code"
                  isRequired
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Account Number</FormLabel>
                <Input
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter account number"
                  isRequired
                />
              </FormControl>
            </Stack>
          </Box>
        )}
        <RadioGroup value={selectedEmailTemplate} onChange={setSelectedEmailTemplate}>
          <Stack spacing={4}>
            {detailedTemplates.map((template) => (
              <Card
                key={template.templateName}
                variant="outline"
                p={4}
                borderColor={selectedEmailTemplate === template.templateName ? 'blue.300' : borderColor}
                bg={selectedEmailTemplate === template.templateName ? 'blue.50' : bgColor}
                _hover={{ boxShadow: 'md' }}
                onClick={() => setSelectedEmailTemplate(template.templateName)}
                cursor="pointer"
              >
                <Flex align="center">
                  <Radio value={template.templateName} colorScheme="blue" mr={3} />
                  <Box>
                    <Text fontWeight="bold">{template.title}</Text>
                    <Text fontSize="sm" color="gray.600" mt={1}>
                      {template.subject}
                    </Text>
                    {selectedEmailTemplate === template.templateName && (
                      <Text fontSize="sm" color="gray.600" mt={2} whiteSpace="pre-line">
                        {template.text}
                      </Text>
                    )}
                  </Box>
                </Flex>
              </Card>
            ))}
          </Stack>
        </RadioGroup>
      </Box>
    );
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
      <ModalContent borderRadius="xl" bg={bgColor}>
        <ModalHeader borderBottomWidth="1px" borderColor={borderColor} py={4}>
          <Text fontSize="xl" fontWeight="bold">
            Record Lender Response
          </Text>
          <Text fontSize="sm" color="gray.500" mt={2}>
            Lender: {lenderName}
          </Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody py={6}>
          <Box>
            {renderAgreementSelector()}
            <Text fontSize="md" mb={4}>
              What was the lender's response to the claim?
            </Text>
            {renderResponseTypeOptions()}
            
            {responseType === 'offer' && (
              <Box mt={6}>
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

            {responseType === 'alreadySubmitted' && (
              <Box mt={6}>
                <Text fontSize="md" fontWeight="semibold" mb={4}>
                  Would you like to take over this claim?
                </Text>
                <Stack spacing={4}>
                  <Card
                    variant="outline"
                    p={4}
                    borderColor={wantToTakeOver === true ? 'green.300' : borderColor}
                    bg={wantToTakeOver === true ? 'green.50' : bgColor}
                    _hover={{ boxShadow: 'md' }}
                    onClick={() => setWantToTakeOver(true)}
                    cursor="pointer"
                  >
                    <Flex align="center">
                      <Icon as={FiThumbsUp} mr={3} color="green.500" />
                      <Box>
                        <Text fontWeight="bold">Yes, take over the claim</Text>
                        <Text fontSize="sm" color="gray.600" mt={1}>
                          Send a request to take over the claim from the previous representative.
                        </Text>
                      </Box>
                    </Flex>
                  </Card>

                  <Card
                    variant="outline"
                    p={4}
                    borderColor={wantToTakeOver === false ? 'red.300' : borderColor}
                    bg={wantToTakeOver === false ? 'red.50' : bgColor}
                    _hover={{ boxShadow: 'md' }}
                    onClick={() => setWantToTakeOver(false)}
                    cursor="pointer"
                  >
                    <Flex align="center">
                      <Icon as={FiThumbsDown} mr={3} color="red.500" />
                      <Box>
                        <Text fontWeight="bold">No, do not take over</Text>
                        <Text fontSize="sm" color="gray.600" mt={1}>
                          Close this claim as it was already submitted by another representative.
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                </Stack>
              </Box>
            )}

            {responseType === 'rejected' && (
              <Box mt={6}>
                <Text fontSize="md" fontWeight="semibold" mb={4}>
                  What would you like to do with this rejected claim?
                </Text>
                <Stack spacing={4}>
                  <Card
                    variant="outline"
                    p={4}
                    borderColor={rejectedAction === 'fosEscalation' ? 'red.300' : borderColor}
                    bg={rejectedAction === 'fosEscalation' ? 'red.50' : bgColor}
                    _hover={{ boxShadow: 'md' }}
                    onClick={() => setRejectedAction('fosEscalation')}
                    cursor="pointer"
                  >
                    <Flex align="center">
                      <Icon as={FiAlertTriangle} mr={3} color="red.500" />
                      <Box>
                        <Text fontWeight="bold">Escalate to FOS</Text>
                        <Text fontSize="sm" color="gray.600" mt={1}>
                          Escalate this claim to the Financial Ombudsman Service.
                        </Text>
                      </Box>
                    </Flex>
                  </Card>

                  <Card
                    variant="outline"
                    p={4}
                    borderColor={rejectedAction === 'leaveAsIs' ? 'gray.300' : borderColor}
                    bg={rejectedAction === 'leaveAsIs' ? 'gray.50' : bgColor}
                    _hover={{ boxShadow: 'md' }}
                    onClick={() => setRejectedAction('leaveAsIs')}
                    cursor="pointer"
                  >
                    <Flex align="center">
                      <Icon as={FiX} mr={3} color="gray.500" />
                      <Box>
                        <Text fontWeight="bold">Leave as is</Text>
                        <Text fontSize="sm" color="gray.600" mt={1}>
                          Keep the claim as rejected without further action.
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                </Stack>
              </Box>
            )}

            {renderEmailTemplateSelection()}
          </Box>
        </ModalBody>

        <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
          <Button variant="outline" mr={3} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            colorScheme="green"
            onClick={handleSubmit}
            isLoading={isLoading}
            isDisabled={
              (responseType === 'alreadySubmitted' && wantToTakeOver && !selectedEmailTemplate) || 
              (responseType === 'offer' && 
               selectedEmailTemplate === responseTemplates.offer.accept.templateName && 
               (!accountName || !sortCode || !accountNumber)) ||
              (responseType === 'rejected' && !rejectedAction)
            }
            leftIcon={<FiCheck />}
          >
            Record Response
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LenderResponseModal; 