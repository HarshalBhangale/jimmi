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
  useBreakpointValue,
  VStack,
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
  const [claimType, setClaimType] = useState<string | null>(null);
  const [selectedAgreements, setSelectedAgreements] = useState<string[]>([]);
  const [detailedTemplates, setDetailedTemplates] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mail, setMail] = useState({ subject: '', body: '' });

  const user = useAtomValue(userAtom);
  const toast = useToast();

  // Reset all state when modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setIsLoading(false);
      setClaimType('dca');
      setSelectedAgreements([]);
      setDetailedTemplates([]);
      setIsExpanded(false);
      setMail({ subject: '', body: '' });
    }
  }, [isOpen]);

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
    if (!claimType) {
      toast({
        title: "No template selected",
        description: "Please select a template to proceed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    console.log(mail, "mail");
    setIsLoading(true);
    try {
      await onSubmitClaim(
        claimType,
        claimType === 'custom' ? mail.body : undefined,
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
    if (templateName === 'custom') {
      setMail({ subject: '', body: '' });
    } else {
      const selectedTemplate = detailedTemplates.find(template => template.templateName === templateName);
      if (selectedTemplate) {
        console.log(selectedTemplate, "selectedTemplate");
        setMail({ subject: selectedTemplate.subject, body: selectedTemplate.text });
        console.log(mail, "mail");
      }
    }
  };

  // Claim template texts
  const claimTemplates = {
    dcaAndHiddenCommission: {
      title: "DCA & Hidden Commission",
      templateName: "submitClaimDcaHiddenCommission",
      text: "Hi [lender],\n\nI would regards,\n\n[fullName]",
      tooltip: "**Discretionary Commission (DCA) Claims**\n\nThe DCA model was banned on **28 January 2021**.\n\nIf your finance agreement started after this date, it's unlikely to qualify under this type of claim.\n\n**Hidden Commission Claims**\n\nThese apply when you **weren't told** that a commission was being paid to the broker.\n\nYou may still have a valid claim even if your agreement is post-2021.",

    },
    hiddenCommission: {
      title: "Hidden Commissions Claim Only",
      templateName: "submitClaimHiddenCommissionsOnly",
      text: "Hi [lender],\n\nI would regards,\n\n[fullName]",
      tooltip: "**Hidden Commission Claims**\n\nThese apply when you **weren't told** that a commission was being paid to the broker.\n\nYou may still have a valid claim even if your agreement is post-2021.",

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
            let interpolatedSubject = interpolateString(templateData.subject, [
            { key: 'fullName', value: `${user.firstName} ${user.lastName},` },
            { key: 'agreementNumber', value: selectedAgreement?.agreementNumber }
            ]);
            
            return { ...claimTemplates[templateKey], text: interpolatedText, subject: interpolatedSubject };
          })
        );
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={useBreakpointValue({ base: "lg", md: "xl" })}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
      <ModalContent
        borderRadius={{ base: "lg", md: "xl" }}
        bg={bgColor}
        mx={{ base: "4", md: "auto" }}
        my={{ base: "3", md: "1.75rem" }}
        maxH={{ base: "calc(100vh - 3rem)", md: "calc(100vh - 3.5rem)" }}
      >
        <ModalHeader
          borderBottomWidth="1px"
          borderColor={borderColor}
          py={{ base: 3, md: 4 }}
          px={{ base: 4, md: 6 }}
        >
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            lineHeight="short"
          >
            Submit Claim for {lenderName}
          </Text>
          <Progress
            value={step === 1 ? 50 : 100}
            size="sm"
            colorScheme="blue"
            borderRadius="full"
            mt={2}
          />
        </ModalHeader>
        <ModalCloseButton top={{ base: 2, md: 4 }} right={{ base: 2, md: 4 }} />

        <ModalBody py={{ base: 4, md: 6 }} px={{ base: 4, md: 6 }}>
          {step === 1 ? (
            <Stack spacing={{ base: 4, md: 6 }}>
              <Box>
                <Flex
                  justify="space-between"
                  align={{ base: "flex-start", md: "center" }}
                  mb={3}
                  direction={{ base: "column", sm: "row" }}
                  gap={{ base: 2, sm: 0 }}
                >
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="semibold"
                    mb={{ base: 1, sm: 0 }}
                  >
                    Selected Agreements
                  </Text>
                  <Button
                    variant="link"
                    size={{ base: "xs", md: "sm" }}
                    onClick={handleSelectAll}
                    alignSelf={{ base: "flex-start", sm: "auto" }}
                  >
                    {selectedAgreements.length === agreements.length
                      ? "Deselect All"
                      : "Select All"}
                  </Button>
                </Flex>

                <Text
                  mb={4}
                  color="blue.500"
                  fontSize={{ base: "sm", md: "md" }}
                  lineHeight="tall"
                >
                  You currently have {agreements.length} agreements to submit.
                  Do you want to add any more agreements?
                </Text>

                <Stack spacing={{ base: 2, md: 3 }}>
                  {agreements.map((agreement) => (
                    <Card
                      key={agreement.agreementNumber}
                      variant="outline"
                      bg={selectedAgreements.includes(agreement.id) ? selectedCardBg : cardBg}
                      borderColor={selectedAgreements.includes(agreement.id) ? selectedCardBorder : borderColor}
                      cursor="pointer"
                      onClick={() => setSelectedAgreements([agreement.id])}
                      _hover={{ boxShadow: 'md' }}
                      _active={{ transform: 'scale(0.98)' }}
                      transition="all 0.2s"
                    >
                      <CardBody py={{ base: 3, md: 4 }} px={{ base: 3, md: 4 }}>
                        <Flex
                          justify="space-between"
                          align="center"
                          direction={{ base: "column", sm: "row" }}
                          gap={{ base: 2, sm: 0 }}
                        >
                          <Box flex="1" mr={{ base: 0, sm: 3 }}>
                            <Text
                              fontWeight="bold"
                              fontSize={{ base: "sm", md: "md" }}
                              mb={{ base: 1, sm: 0 }}
                            >
                              Agreement #{agreement.agreementNumber}
                            </Text>
                            <VStack
                              spacing={1}
                              align={{ base: "center", sm: "flex-start" }}
                              mt={1}
                            >
                              {agreement.startDate && (
                                <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                                  {agreement.startDate}
                                </Text>
                              )}
                              <HStack spacing={2} flexWrap="wrap" justify={{ base: "center", sm: "flex-start" }}>
                                {agreement.amount && (
                                  <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                                    £{agreement.amount}
                                  </Text>
                                )}
                                {agreement.startDate && (
                                  <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                                    • 12 months
                                  </Text>
                                )}
                              </HStack>
                            </VStack>
                          </Box>
                          <Radio
                            isChecked={selectedAgreements.includes(agreement.id)}
                            colorScheme="blue"
                            size={{ base: "md", md: "lg" }}
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

                <Flex
                  justify="space-between"
                  mt={{ base: 4, md: 6 }}
                  direction={{ base: "column-reverse", sm: "row" }}
                  gap={{ base: 3, sm: 0 }}
                >
                  <Button
                    variant="outline"
                    onClick={onClose}
                    size={{ base: "md", md: "md" }}
                    w={{ base: "full", sm: "auto" }}
                  >
                    Cancel
                  </Button>

                  <Button
                    colorScheme="blue"
                    onClick={handleNextStep}
                    isDisabled={selectedAgreements.length === 0}
                    rightIcon={<FiArrowRight />}
                    size={{ base: "md", md: "md" }}
                    w={{ base: "full", sm: "auto" }}
                  >
                    Continue
                  </Button>
                </Flex>
              </Box>
            </Stack>
          ) : (
            <Stack spacing={{ base: 4, md: 6 }}>
              <Box>
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="semibold"
                  mb={3}
                >
                  Choose Claim Template
                </Text>

                <RadioGroup value={claimType} onChange={handleTemplateChange} mb={5}>
                  <Stack spacing={{ base: 3, md: 4 }}>
                    {detailedTemplates.map((template) => (
                      <Card
                        key={template.templateName}
                        variant="outline"
                        p={{ base: 2, md: 3 }}
                        borderColor={claimType === template.templateName ? 'blue.300' : borderColor}
                        bg={claimType === template.templateName ? 'blue.50' : bgColor}
                        _hover={{ boxShadow: 'md' }}
                        _active={{ transform: 'scale(0.98)' }}
                        transition="all 0.2s"
                      >
                        <Flex align="flex-start" direction={{ base: "column", sm: "row" }}>
                          <Radio
                            value={template.templateName}
                            colorScheme="blue"
                            mr={{ base: 0, sm: 2 }}
                            mb={{ base: 2, sm: 0 }}
                            mt={1}
                            size={{ base: "md", md: "lg" }}
                          />
                          <Box flex="1">
                            <Flex
                              align="center"
                              direction={{ base: "column", sm: "row" }}
                              mb={{ base: 2, sm: 0 }}
                            >
                              <Text
                                fontWeight="bold"
                                fontSize={{ base: "sm", md: "md" }}
                                mb={{ base: 1, sm: 0 }}
                              >
                                {template.title}
                              </Text>
                              <Tooltip label={template.tooltip} placement="top">
                                <IconButton
                                  icon={<Icon as={FiInfo} />}
                                  aria-label="More information"
                                  variant="ghost"
                                  size={{ base: "xs", md: "sm" }}
                                  ml={{ base: 0, sm: 1 }}
                                />
                              </Tooltip>
                            </Flex>
                            <Box fontSize={{ base: "xs", md: "sm" }} color="gray.600" mt={1}>
                              <Text
                                fontWeight="semibold"
                                color="blue.600"
                                fontSize={{ base: "xs", md: "sm" }}
                                mb={1}
                              >
                                {template.subject}
                              </Text>
                              {claimType === template.templateName && (
                                <Box>
                                  <Text
                                    whiteSpace="pre-line"
                                    fontSize={{ base: "xs", md: "sm" }}
                                    lineHeight="tall"
                                  >
                                    {isExpanded ? template.text : `${template.text?.substring(0, 100)}...`}
                                  </Text>
                                  <Button
                                    variant="link"
                                    size={{ base: "xs", md: "sm" }}
                                    onClick={toggleReadMore}
                                    mt={1}
                                  >
                                    {isExpanded ? "Read Less" : "Read More"}
                                  </Button>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </Flex>
                      </Card>
                    ))}
                    <Card
                      key="customClaim"
                      variant="outline"
                      p={{ base: 2, md: 3 }}
                      borderColor={claimType === 'custom' ? 'blue.300' : borderColor}
                      bg={claimType === 'custom' ? 'blue.50' : bgColor}
                      _hover={{ boxShadow: 'md' }}
                      _active={{ transform: 'scale(0.98)' }}
                      transition="all 0.2s"
                    >
                      <Flex align="flex-start" direction={{ base: "column", sm: "row" }}>
                        <Radio
                          value="custom"
                          colorScheme="blue"
                          mr={{ base: 0, sm: 2 }}
                          mb={{ base: 2, sm: 0 }}
                          mt={1}
                          size={{ base: "md", md: "lg" }}
                        />
                        <Box flex="1" w="full ">
                          <Text
                            fontWeight="bold"
                            fontSize={{ base: "sm", md: "md" }}
                            mb={2}
                          >
                            Custom Claim
                          </Text>
                          {claimType === 'custom' && (
                            <VStack spacing={3} align="stretch">
                              <Input
                                w="100%"
                                value={mail.subject}
                                onChange={(e) => setMail(prev => ({ ...prev, subject: e.target.value }))}
                                placeholder="Enter Mail Subject here..."
                                size={{ base: "md", md: "md" }}
                                fontSize={{ base: "sm", md: "md" }}
                              />
                              <Textarea
                                w="100%"
                                value={mail.body}
                                onChange={(e) => setMail(prev => ({ ...prev, body: e.target.value }))}
                                placeholder="Enter Mail Body here..."
                                rows={{ base: 4, md: 6 }}
                                fontSize={{ base: "sm", md: "md" }}
                                resize="vertical"
                              />
                            </VStack>
                          )}
                        </Box>
                      </Flex>
                    </Card>
                  </Stack>
                </RadioGroup>

                <Divider my={{ base: 4, md: 5 }} />

                <Box>
                  <Text
                    fontWeight="semibold"
                    mb={2}
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Selected Agreements ({selectedAgreements.length})
                  </Text>
                  <List spacing={1}>
                    {selectedAgreements.map(id => {
                      const agreement = agreements.find(a => a.id === id);
                      return (
                        <ListItem key={id}>
                          <HStack
                            spacing={2}
                            align="center"
                            flexWrap={{ base: "wrap", sm: "nowrap" }}
                          >
                            <Icon as={FiCheckCircle} color="green.500" minW="16px" />
                            <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="medium">
                              Agreement #{agreement?.agreementNumber || id}
                            </Text>
                            {agreement?.startDate && (
                              <Text
                                fontSize={{ base: "xs", md: "sm" }}
                                color="gray.500"
                                display={{ base: "block", sm: "inline" }}
                                w={{ base: "full", sm: "auto" }}
                                ml={{ base: 6, sm: 0 }}
                              >
                                {agreement.startDate}
                              </Text>
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
          <ModalFooter
            borderTopWidth="1px"
            borderColor={borderColor}
            py={{ base: 3, md: 4 }}
            px={{ base: 4, md: 6 }}
            flexDirection={{ base: "column-reverse", sm: "row" }}
            gap={{ base: 3, sm: 0 }}
          >
            <Button
              variant="outline"
              mr={{ base: 0, sm: 3 }}
              onClick={() => setStep(1)}
              size={{ base: "md", md: "md" }}
              w={{ base: "full", sm: "auto" }}
            >
              Back
            </Button>
            <Button
              colorScheme="green"
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText="Submitting"
              leftIcon={<FiCheckCircle />}
              size={{ base: "md", md: "md" }}
              w={{ base: "full", sm: "auto" }}
              isDisabled={!claimType}
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