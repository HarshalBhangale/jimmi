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
  Textarea,
  useColorModeValue,
  Flex,
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
  Input,
} from '@chakra-ui/react';
import { FiInfo, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { getTemplates } from '@/api/services/templates';
import { interpolateString } from '@/utils';
import { userAtom } from '@/jotai/atoms';
import { useAtomValue } from 'jotai';


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
  const [customSubject, setCustomSubject] = useState('');
  const [selectedAgreements, setSelectedAgreements] = useState<string[]>([]);
  const [detailedTemplates, setDetailedTemplates] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mail, setMail] = useState({ subject: '', body: '' });

  const user = useAtomValue(userAtom);

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
    console.log(mail, "mail");
    setIsLoading(true);
    try {
      await onSubmitClaim(
        claimType,
        claimType === 'custom' ? customText : undefined,
        selectedAgreements,
        mail
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

  const handleTemplateChange = (templateName: string) => {
    setClaimType(templateName);
    const selectedTemplate = detailedTemplates.find(template => template.templateName === templateName);
    if (selectedTemplate) {
      console.log(selectedTemplate, "selectedTemplate");
      setMail({ subject: selectedTemplate.subject, body: selectedTemplate.text });
      console.log(mail, "mail");
    }
  };

  // Claim template texts
  const claimTemplates = {
    dcaAndHiddenCommission: {
      title: "DCA & Hidden Commission",
      templateName: "submitClaimDcaHiddenCommission",
      text: "Hi [lender],\n\nI would regards,\n\n[fullName]",
    },
    hiddenCommission: {
      title: "Hidden Commissions Claim Only",
      templateName: "submitClaimHiddenCommissionsOnly",
      text: "Hi [lender],\n\nI would regards,\n\n[fullName]",
    }
  };
  const selectedAgreement = agreements.find(a => a.id === selectedAgreements[0]);
  useEffect(() => {
    const personalDetailsAndAgreementDetails = `
    Full Name: ${user.firstName} ${user.lastName}
    Email: ${user.email}
    Phone Number: ${user.phoneNumber}
    Agreement Details:
    Agreement Number: ${selectedAgreement?.agreementNumber}
    Registration Number: ${selectedAgreement?.carRegistration}`;

    const fetchTemplates = async () => {
      try {
        const fetchedTemplates = await Promise.all(
          Object.keys(claimTemplates).map(async (templateKey) => {
            const templateData = await getTemplates(claimTemplates[templateKey].templateName);
            console.log(templateData, "templateData");
            let interpolatedText = interpolateString(templateData.body, [{ key: 'lender', value: lenderName },
            { key: 'fullName', value: `${user.firstName} ${user.lastName},` },
            { key: 'personalAndAgreementDetails', value: personalDetailsAndAgreementDetails }

            ]);
            return { ...claimTemplates[templateKey], text: interpolatedText, subject: templateData.subject };
          })
        );
        console.log(fetchedTemplates, "templates");
        setDetailedTemplates(fetchedTemplates);
      } catch (error) {
        console.error('Error fetching templates:', error);
        toast({
          title: "Error loading templates",
          description: "There was an error loading the templates. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    if (isOpen) {
      fetchTemplates();
    }
  }, [isOpen, selectedAgreement]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
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
                      onClick={() => setSelectedAgreements([agreement.id])}
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
                          <Radio
                            isChecked={selectedAgreements.includes(agreement.id)}
                            colorScheme="blue"
                            onChange={(e) => {
                              e.stopPropagation();
                              setSelectedAgreements([agreement.id]);
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

                <RadioGroup value={claimType} onChange={handleTemplateChange} mb={5}>
                  <Stack spacing={4}>
                    {detailedTemplates.map((template) => (
                      <Card
                        key={template.templateName}
                        variant="outline"
                        p={3}
                        borderColor={claimType === template.templateName ? 'blue.300' : borderColor}
                        bg={claimType === template.templateName ? 'blue.50' : bgColor}
                        _hover={{ boxShadow: 'md' }}
                      >
                        <Flex align="flex-start">
                          <Radio value={template.templateName} colorScheme="blue" mr={2} mt={1} />
                          <Box>
                            <Flex align="center">
                              <Text fontWeight="bold">{template.title}</Text>
                              <Tooltip label={template.tooltip} placement="top">
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
                              <Text fontWeight="semibold" color="blue.600">{template.subject}</Text>
                              {claimType === template.templateName && (
                                <>
                                  {isExpanded ? template.text : `${template.text?.substring(0, 100)}...`}
                                  <br />
                                  <Button variant="link" size="sm" onClick={toggleReadMore} ml={1}>
                                    {isExpanded ? "Read Less" : "Read More"}
                                  </Button>
                                </>
                              )}
                            </Text>
                          </Box>
                        </Flex>
                      </Card>
                    ))}
                    <Card
                      key="customClaim"
                      variant="outline"
                      p={3}
                      borderColor={claimType === 'custom' ? 'blue.300' : borderColor}
                      bg={claimType === 'custom' ? 'blue.50' : bgColor}
                      _hover={{ boxShadow: 'md' }}
                    >
                      <Flex align="flex-start">
                        <Radio value="custom" colorScheme="blue" mr={2} mt={1} />
                        <Box>
                          <Text fontWeight="bold">Custom Claim</Text>
                          {claimType === 'custom' && (
                            <>
                              <Input
                                value={customSubject}
                                onChange={(e) => setCustomSubject(e.target.value)}
                                placeholder="Enter Mail Subject here..."
                                mt={2}
                                w="100%"
                              />
                              <Textarea
                                value={customText}
                                onChange={(e) => setCustomText(e.target.value)}
                                placeholder="Enter Mail Body here..."
                                mt={2}
                                w="100%"
                              />

                            </>
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