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
  Textarea,
  useColorModeValue,
  Flex,
  Badge,
  Divider,
  Card,
  CardBody,
  Tooltip,
  Icon,
  HStack,
  useToast,
  Progress,
  List,
  ListItem,
  IconButton,
  Checkbox,
} from '@chakra-ui/react';
import { FiInfo, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

interface Agreement {
  id: string;
  agreementNumber: string;
  status: string;
  carRegistration: string;
  startDate?: string;
  amount?: number;
}

interface SubmitClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  lenderName: string;
  agreements: Agreement[];
  onSubmitClaim: (templateType: string, customText?: string, selectedAgreements?: string[]) => Promise<void>;
}

const SubmitClaimModal: React.FC<SubmitClaimModalProps> = ({
  isOpen,
  onClose,
  lenderName,
  agreements,
  onSubmitClaim,
}) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [claimType, setClaimType] = useState('dca');
  const [customText, setCustomText] = useState('');
  const [selectedAgreements, setSelectedAgreements] = useState<string[]>([]);
  const toast = useToast();

  // UI Colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const selectedCardBg = useColorModeValue('blue.50', 'blue.900');
  const selectedCardBorder = useColorModeValue('blue.200', 'blue.700');

  const handleToggleAgreement = (agreementId: string) => {
    if (selectedAgreements.includes(agreementId)) {
      setSelectedAgreements(selectedAgreements.filter(id => id !== agreementId));
    } else {
      setSelectedAgreements([...selectedAgreements, agreementId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedAgreements.length === agreements.length) {
      setSelectedAgreements([]);
    } else {
      setSelectedAgreements(agreements.map(a => a.id));
    }
  };

  const handleNextStep = () => {
    if (selectedAgreements.length === 0) {
      toast({
        title: "No agreements selected",
        description: "Please select at least one agreement to proceed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmitClaim(
        claimType, 
        claimType === 'custom' ? customText : undefined,
        selectedAgreements
      );
      toast({
        title: "Claim submitted successfully",
        description: `Your claim for ${lenderName} has been submitted.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error('Error submitting claim:', error);
      toast({
        title: "Error submitting claim",
        description: "There was an error submitting your claim. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Claim template texts
  const claimTemplates = {
    dca: {
      title: "DCA Claim",
      text: "I'm writing regarding my vehicle finance agreement, which I believe was affected by unfair Discretionary Commission Arrangements (DCA). The dealer who arranged my finance had discretion to increase my interest rate and earned higher commission for doing so, creating a conflict of interest that was never disclosed to me.\n\nI'm seeking compensation for the unfair, concealed commission that directly increased my costs, as this practice has been deemed unlawful by the Financial Conduct Authority.",
      tooltip: "This template focuses solely on claiming for Discretionary Commission Arrangements (DCA), where the dealer had discretion to set your interest rate and received a commission for doing so."
    },
    dcaHidden: {
      title: "DCA + Hidden Commissions Claim",
      text: "I'm writing to submit a dual claim regarding my vehicle finance agreement. Firstly, I believe I was subject to unfair Discretionary Commission Arrangements (DCA) where the dealer increased my interest rate to earn higher commission. Secondly, I was never informed about substantial hidden commissions paid to the dealer for arranging my finance.\n\nThese undisclosed arrangements created a serious conflict of interest, violating financial regulations and my consumer rights. I'm seeking full compensation for both the DCA impact and the concealed commission payments that directly affected the cost of my finance.",
      tooltip: "This comprehensive template claims for both Discretionary Commission Arrangements (DCA) and undisclosed commission payments between the dealer and finance company, maximizing your potential compensation."
    },
    custom: {
      title: "Write Your Own",
      text: "",
      tooltip: "Create your own custom claim text if you have specific circumstances or prefer to use your own wording."
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
      <ModalContent borderRadius="xl" bg={bgColor}>
        <ModalHeader borderBottomWidth="1px" borderColor={borderColor} py={4}>
          <Text fontSize="xl" fontWeight="bold">Submit Claim for {lenderName}</Text>
          <Progress 
            value={step === 1 ? 50 : 100} 
            size="sm" 
            colorScheme="blue" 
            borderRadius="full" 
            mt={2}
          />
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody py={6}>
          {step === 1 ? (
            <Stack spacing={6}>
              <Box>
                <Flex justify="space-between" align="center" mb={3}>
                  <Text fontSize="lg" fontWeight="semibold">
                    Selected Agreements
                  </Text>
                  <Button variant="link" size="sm" onClick={handleSelectAll}>
                    {selectedAgreements.length === agreements.length 
                      ? "Deselect All" 
                      : "Select All"}
                  </Button>
                </Flex>
                
                <Text mb={4} color="blue.500">
                  You currently have {agreements.length} agreements to submit. 
                  Do you want to add any more agreements?
                </Text>
                
                <Stack spacing={3}>
                  {agreements.map((agreement) => (
                    <Card 
                      key={agreement.agreementNumber}
                      variant="outline"
                      bg={selectedAgreements.includes(agreement.id) ? selectedCardBg : cardBg}
                      borderColor={selectedAgreements.includes(agreement.id) ? selectedCardBorder : borderColor}
                      cursor="pointer"
                      onClick={() => handleToggleAgreement(agreement.id)}
                      _hover={{ boxShadow: 'md' }}
                      mb={2}
                    >
                      <CardBody py={3}>
                        <Flex justify="space-between" align="center">
                          <Box>
                            <Text fontWeight="bold">Agreement #{agreement.agreementNumber}</Text>
                            <HStack spacing={2} mt={1}>
                              {agreement.startDate && <Text fontSize="sm">{agreement.startDate}</Text>}
                              {agreement.amount && <Text fontSize="sm">• £{agreement.amount}</Text>}
                              {agreement.startDate && <Text fontSize="sm">• 12 months</Text>}
                            </HStack>
                          </Box>
                          <Checkbox 
                            isChecked={selectedAgreements.includes(agreement.id)}
                            colorScheme="blue"
                            onChange={(e) => {
                              e.stopPropagation();
                              handleToggleAgreement(agreement.id);
                            }}
                          />
                        </Flex>
                      </CardBody>
                    </Card>
                  ))}
                </Stack>
                
                <Flex justify="space-between" mt={6}>
                  <Button 
                    variant="outline" 
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  
                  <Button 
                    colorScheme="blue" 
                    onClick={handleNextStep}
                    isDisabled={selectedAgreements.length === 0}
                    rightIcon={<FiArrowRight />}
                  >
                    Continue
                  </Button>
                </Flex>
              </Box>
            </Stack>
          ) : (
            <Stack spacing={6}>
              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={3}>
                  Choose Claim Template
                </Text>
                
                <RadioGroup value={claimType} onChange={setClaimType} mb={5}>
                  <Stack spacing={4}>
                    <Card
                      variant="outline"
                      p={3}
                      borderColor={claimType === 'dca' ? 'blue.300' : borderColor}
                      bg={claimType === 'dca' ? 'blue.50' : bgColor}
                      _hover={{ boxShadow: 'md' }}
                    >
                      <Flex align="flex-start">
                        <Radio value="dca" colorScheme="blue" mr={2} mt={1} />
                        <Box>
                          <Flex align="center">
                            <Text fontWeight="bold">1. {claimTemplates.dca.title}</Text>
                            <Tooltip label={claimTemplates.dca.tooltip} placement="top">
                              <IconButton
                                icon={<Icon as={FiInfo} />}
                                aria-label="More information"
                                variant="ghost"
                                size="sm"
                                ml={1}
                              />
                            </Tooltip>
                          </Flex>
                          <Text fontSize="sm" color="gray.600" mt={1} whiteSpace="pre-line">
                            {claimTemplates.dca.text.substring(0, 100)}...
                          </Text>
                        </Box>
                      </Flex>
                    </Card>
                    
                    <Card
                      variant="outline"
                      p={3}
                      borderColor={claimType === 'dcaHidden' ? 'blue.300' : borderColor}
                      bg={claimType === 'dcaHidden' ? 'blue.50' : bgColor}
                      _hover={{ boxShadow: 'md' }}
                    >
                      <Flex align="flex-start">
                        <Radio value="dcaHidden" colorScheme="blue" mr={2} mt={1} />
                        <Box>
                          <Flex align="center">
                            <Text fontWeight="bold">2. {claimTemplates.dcaHidden.title}</Text>
                            <Tooltip label={claimTemplates.dcaHidden.tooltip} placement="top">
                              <IconButton
                                icon={<Icon as={FiInfo} />}
                                aria-label="More information"
                                variant="ghost"
                                size="sm"
                                ml={1}
                              />
                            </Tooltip>
                          </Flex>
                          <Text fontSize="sm" color="gray.600" mt={1} whiteSpace="pre-line">
                            {claimTemplates.dcaHidden.text.substring(0, 100)}...
                          </Text>
                        </Box>
                      </Flex>
                    </Card>
                    
                    <Card
                      variant="outline"
                      p={3}
                      borderColor={claimType === 'custom' ? 'blue.300' : borderColor}
                      bg={claimType === 'custom' ? 'blue.50' : bgColor}
                      _hover={{ boxShadow: 'md' }}
                    >
                      <Flex align="flex-start">
                        <Radio value="custom" colorScheme="blue" mr={2} mt={1} />
                        <Box width="100%">
                          <Flex align="center">
                            <Text fontWeight="bold">3. {claimTemplates.custom.title}</Text>
                            <Tooltip label={claimTemplates.custom.tooltip} placement="top">
                              <IconButton
                                icon={<Icon as={FiInfo} />}
                                aria-label="More information"
                                variant="ghost"
                                size="sm"
                                ml={1}
                              />
                            </Tooltip>
                          </Flex>
                          {claimType === 'custom' && (
                            <Textarea
                              mt={2}
                              placeholder="Enter your own claim text here..."
                              value={customText}
                              onChange={(e) => setCustomText(e.target.value)}
                              rows={6}
                              isRequired={claimType === 'custom'}
                            />
                          )}
                        </Box>
                      </Flex>
                    </Card>
                  </Stack>
                </RadioGroup>
                
                <Divider my={5} />
                
                <Box>
                  <Text fontWeight="semibold" mb={2}>Selected Agreements ({selectedAgreements.length})</Text>
                  <List spacing={1}>
                    {selectedAgreements.map(id => {
                      const agreement = agreements.find(a => a.id === id);
                      return (
                        <ListItem key={id}>
                          <HStack>
                            <Icon as={FiCheckCircle} color="green.500" />
                            <Text fontSize="sm">Agreement #{agreement?.agreementNumber || id}</Text>
                            {agreement?.startDate && (
                              <Text fontSize="sm" color="gray.500">{agreement.startDate}</Text>
                            )}
                          </HStack>
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              </Box>
            </Stack>
          )}
        </ModalBody>

        {step === 2 && (
          <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
            <Button variant="outline" mr={3} onClick={() => setStep(1)}>
              Back
            </Button>
            <Button 
              colorScheme="green" 
              onClick={handleSubmit} 
              isLoading={isLoading}
              loadingText="Submitting"
              isDisabled={claimType === 'custom' && !customText.trim()}
              leftIcon={<FiCheckCircle />}
            >
              Submit These Claims
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SubmitClaimModal; 