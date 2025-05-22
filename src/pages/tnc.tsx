// @ts-nocheck
import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Divider,
  List,
  ListItem,
  Link,
  useColorModeValue,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Alert,
  AlertIcon,
  Icon,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  HStack,
  Tag,
} from '@chakra-ui/react';
import { 
  FiMail, 
  FiShield, 
  FiAlertCircle, 
  FiCheck, 
  FiX, 
  FiDollarSign, 
  FiUser,
  FiCalendar,
  FiInfo,
  FiFileText,
  FiMessageCircle,
  FiLock,
  FiEye,
  FiChevronRight,
  FiThumbsUp,
  FiExternalLink,
} from 'react-icons/fi';

const TNC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const headingColor = useColorModeValue('blue.600', 'blue.300');
  const sectionBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('blue.100', 'blue.700');
  const alertBg = useColorModeValue('blue.50', 'blue.900');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const secondaryBg = useColorModeValue('purple.50', 'purple.900');
  const highlightColor = useColorModeValue('yellow.100', 'yellow.800');
  const currentDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <Box bg={bgColor} minH="100vh" py={{ base: 8, md: 12 }}>
      <Container maxW="4xl">
        <VStack spacing={12} align="stretch">
          {/* Terms of Service Header */}
          <Box textAlign="center" mb={{ base: 6, md: 10 }}>
            <Badge colorScheme="blue" fontSize={{ base: "sm", md: "md" }} mb={4} py={1} px={3} borderRadius="full">
              Terms & Conditions
            </Badge>
            <Heading as="h1" size={{ base: "2xl", md: "3xl" }} color={headingColor} mb={4}>
              Terms of Service
            </Heading>
            <Text color="gray.500" fontSize={{ base: "md", md: "lg" }}>
              Last updated: {currentDate}
            </Text>
          </Box>

          <Box mb={6} fontSize={{ base: "md", md: "lg" }} color={textColor}>
            <Text>
              Welcome to My Claim Buddy ("MCB", "we", "us", or "our"). These Terms of Service ("Terms") govern your use of our website, tools, and services ("Platform"). By using MCB, you confirm that you understand and agree to the following terms in full.
            </Text>
          </Box>

          {/* Terms Content */}
          <Box bg={sectionBg} p={{ base: 6, md: 8 }} borderRadius="xl" boxShadow="xl" position="relative">
            <VStack spacing={8} align="stretch">
              {/* Who We Are Section */}
              <Box>
                <Heading as="h2" size={{ base: "md", md: "lg" }} mb={4} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiInfo} mr={3} />
                    1. Who We Are
                  </Flex>
                </Heading>
                <VStack spacing={3} align="start" fontSize={{ base: "sm", md: "md" }}>
                  <Text>My Claim Buddy is a self-service platform that helps individuals handle their own car finance information requests and complaints directly with lenders.</Text>
                  <Text>We provide step-by-step guidance, pre-built templates, and tracking tools to assist you in managing your claim process independently.</Text>
                  <Alert status="info" bg={alertBg} borderRadius="md" mt={2}>
                    <AlertIcon />
                    <Box>
                      <Text fontWeight="medium">We are not a law firm or a claims management company.</Text>
                      <Text>We do not act on your behalf or provide legal advice. Our services are educational and informational only.</Text>
                    </Box>
                  </Alert>
                </VStack>
              </Box>

              <Divider />

              {/* Eligibility Section */}
              <Box>
                <Heading as="h2" size={{ base: "md", md: "lg" }} mb={4} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiUser} mr={3} />
                    2. Eligibility
                  </Flex>
                </Heading>
                <Text mb={3} fontSize={{ base: "sm", md: "md" }}>To use the Platform, you must:</Text>
                <List spacing={3} pl={4}>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiCheck} color="green.500" mr={2} />
                    <Text fontSize={{ base: "sm", md: "md" }}>Be at least 18 years old.</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiCheck} color="green.500" mr={2} />
                    <Text fontSize={{ base: "sm", md: "md" }}>Be a UK resident.</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiCheck} color="green.500" mr={2} />
                    <Text fontSize={{ base: "sm", md: "md" }}>Be the person associated with the agreements you are submitting.</Text>
                  </ListItem>
                </List>
              </Box>

              <Divider />

              {/* How It Works Section */}
              <Box>
                <Heading as="h2" size={{ base: "md", md: "lg" }} mb={4} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiFileText} mr={3} />
                    3. How It Works
                  </Flex>
                </Heading>
                <Text mb={3} fontSize={{ base: "sm", md: "md" }}>Once registered:</Text>
                <VStack spacing={4} align="stretch" bg={alertBg} p={5} borderRadius="md">
                  <Flex align="center">
                    <Icon as={FiUser} mr={3} color="blue.500" />
                    <Text fontSize={{ base: "sm", md: "md" }}>You'll verify your identity and provide necessary personal details.</Text>
                  </Flex>
                  <Flex align="center">
                    <Icon as={FiMail} mr={3} color="blue.500" />
                    <Text fontSize={{ base: "sm", md: "md" }}>You'll be issued a unique inbox: yourname@buddy-mail.co.uk, which is used to send and receive communications with your lenders from within the platform.</Text>
                  </Flex>
                  <Flex align="center">
                    <Icon as={FiShield} mr={3} color="blue.500" />
                    <Text fontSize={{ base: "sm", md: "md" }}>You'll access educational tools and pre-written templates for submitting Subject Access Requests (SARs), claim letters, and follow-ups.</Text>
                  </Flex>
                  <Flex align="center">
                    <Icon as={FiAlertCircle} mr={3} color="blue.500" />
                    <Text fontSize={{ base: "sm", md: "md" }}>All submissions are made by you — MCB does not submit claims or interact with lenders on your behalf.</Text>
                  </Flex>
                </VStack>
              </Box>

              <Divider />

              {/* What We Don't Do Section */}
              <Box>
                <Heading as="h2" size={{ base: "md", md: "lg" }} mb={4} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiX} mr={3} />
                    4. What We Don't Do
                  </Flex>
                </Heading>
                <Text mb={3} fontSize={{ base: "sm", md: "md" }}>To stay outside the scope of UK regulatory requirements:</Text>
                <List spacing={3} pl={4}>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiX} color="red.500" mr={2} />
                    <Text fontSize={{ base: "sm", md: "md" }}>We do not give legal advice or opinions.</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiX} color="red.500" mr={2} />
                    <Text fontSize={{ base: "sm", md: "md" }}>We do not represent or contact lenders on your behalf.</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiX} color="red.500" mr={2} />
                    <Text fontSize={{ base: "sm", md: "md" }}>We do not negotiate or escalate your case.</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiX} color="red.500" mr={2} />
                    <Text fontSize={{ base: "sm", md: "md" }}>We do not handle complaints for a fee or percentage.</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiX} color="red.500" mr={2} />
                    <Text fontSize={{ base: "sm", md: "md" }}>We do not offer financial services or manage compensation payments.</Text>
                  </ListItem>
                </List>
                <Box bg={highlightColor} p={3} borderRadius="md" mt={4}>
                  <Text fontSize={{ base: "sm", md: "md" }} fontWeight="medium">
                    MCB is a digital assistant and tool provider — you are in full control of your actions on the platform.
                  </Text>
                </Box>
              </Box>

              <Divider />

              {/* No Legal Advice Section */}
              <Box>
                <Heading as="h2" size={{ base: "md", md: "lg" }} mb={4} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiAlertCircle} mr={3} />
                    5. No Legal Advice
                  </Flex>
                </Heading>
                <Alert status="warning" borderRadius="md">
                  <AlertIcon />
                  <Text fontSize={{ base: "sm", md: "md" }}>
                    Nothing on the MCB platform should be interpreted as legal, financial, or regulatory advice. While we offer educational materials and general guidance, you should consult a qualified solicitor or regulated claims professional if you need legal support.
                  </Text>
                </Alert>
              </Box>

              <Divider />

              {/* Your Responsibilities Section */}
              <Box>
                <Heading as="h2" size={{ base: "md", md: "lg" }} mb={4} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiUser} mr={3} />
                    6. Your Responsibilities
                  </Flex>
                </Heading>
                <Text mb={3} fontSize={{ base: "sm", md: "md" }}>By using MCB, you agree to:</Text>
                <List spacing={3} pl={4}>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiCheck} color="green.500" mr={2} />
                    <Text fontSize={{ base: "sm", md: "md" }}>Use the service only for your own claims.</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiCheck} color="green.500" mr={2} />
                    <Text fontSize={{ base: "sm", md: "md" }}>Provide accurate, truthful, and complete information.</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiCheck} color="green.500" mr={2} />
                    <Text fontSize={{ base: "sm", md: "md" }}>Use your @buddy-mail.co.uk inbox only for legitimate communications with your lenders.</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiCheck} color="green.500" mr={2} />
                    <Text fontSize={{ base: "sm", md: "md" }}>Comply with all applicable laws and avoid submitting any fraudulent or misleading information.</Text>
                  </ListItem>
                </List>
              </Box>

              <Divider />

              {/* Pricing & Payment Section */}
              <Box>
                <Heading as="h2" size={{ base: "md", md: "lg" }} mb={4} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiDollarSign} mr={3} />
                    7. Pricing & Payment
                  </Flex>
                </Heading>
                <Text mb={3} fontSize={{ base: "sm", md: "md" }}>We offer access to the platform via:</Text>
                <HStack spacing={4} mb={4} flexWrap="wrap" gap={4}>
                  <Box 
                    borderWidth="1px" 
                    borderColor={borderColor}
                    borderRadius="lg"
                    p={4}
                    minW={{ base: "full", md: "200px" }}
                    bg={secondaryBg}
                  >
                    <Heading size="md" mb={2} color={headingColor}>£99</Heading>
                    <Text fontSize="sm">One-time payment</Text>
                    <Text fontSize="sm" fontWeight="bold">Lifetime access</Text>
                  </Box>
                  <Box 
                    borderWidth="1px" 
                    borderColor={borderColor}
                    borderRadius="lg"
                    p={4}
                    minW={{ base: "full", md: "200px" }}
                    bg={secondaryBg}
                  >
                    <Heading size="md" mb={2} color={headingColor}>£24.99</Heading>
                    <Text fontSize="sm">Per month</Text>
                    <Text fontSize="sm" fontWeight="bold">Cancel any time</Text>
                  </Box>
                </HStack>
                <Text fontSize={{ base: "sm", md: "md" }}>
                  All payments are securely processed via Stripe, PayPal, Apple Pay, or Google Pay.
                </Text>
              </Box>

              <Divider />

              {/* Refund Policy Section */}
              <Box>
                <Heading as="h2" size={{ base: "md", md: "lg" }} mb={4} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiThumbsUp} mr={3} />
                    8. Refund Policy
                  </Flex>
                </Heading>
                <Text fontSize={{ base: "sm", md: "md" }} mb={3}>
                  If you're not satisfied with the platform, you may request a full refund within 14 days of purchase provided you haven't yet submitted any emails or claims using the platform. Once claims have been submitted, no refunds can be issued.
                </Text>
                <Button 
                  as={Link} 
                  href="/refund-policy" 
                  size="sm" 
                  colorScheme="blue" 
                  variant="outline" 
                  rightIcon={<FiChevronRight />}
                  _hover={{ textDecoration: 'none' }}
                >
                  View full Refund Policy
                </Button>
              </Box>

              <Divider />

              {/* Your Data & Privacy Section */}
              <Box>
                <Heading as="h2" size={{ base: "md", md: "lg" }} mb={4} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiLock} mr={3} />
                    9. Your Data & Privacy
                  </Flex>
                </Heading>
                <VStack spacing={3} align="start">
                  <Text fontSize={{ base: "sm", md: "md" }}>We are committed to protecting your personal information in accordance with the UK GDPR.</Text>
                  <Text fontSize={{ base: "sm", md: "md" }}>Your data is securely stored and never sold.</Text>
                  <Text fontSize={{ base: "sm", md: "md" }}>Your @buddy-mail.co.uk inbox is private and only accessible via the platform.</Text>
                  <Button 
                    as={Link} 
                    href="/privacy" 
                    size="sm" 
                    colorScheme="blue" 
                    rightIcon={<FiExternalLink />}
                    _hover={{ textDecoration: 'none' }}
                  >
                    View Privacy Policy
                  </Button>
                </VStack>
              </Box>

              <Divider />

              {/* Communications Disclaimer Section */}
              <Box>
                <Heading as="h2" size={{ base: "md", md: "lg" }} mb={4} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiMessageCircle} mr={3} />
                    10. Communications Disclaimer
                  </Flex>
                </Heading>
                <Text mb={3} fontSize={{ base: "sm", md: "md" }}>All messages and claims sent via your @buddy-mail.co.uk inbox are:</Text>
                <List spacing={3} pl={4}>
                  <ListItem display="flex" alignItems="flex-start">
                    <Icon as={FiAlertCircle} color="orange.500" mt={1} mr={2} />
                    <Text fontSize={{ base: "sm", md: "md" }}>Created and initiated by you, not MCB.</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="flex-start">
                    <Icon as={FiAlertCircle} color="orange.500" mt={1} mr={2} />
                    <Text fontSize={{ base: "sm", md: "md" }}>Not reviewed, approved, or sent by MCB.</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="flex-start">
                    <Icon as={FiAlertCircle} color="orange.500" mt={1} mr={2} />
                    <Text fontSize={{ base: "sm", md: "md" }}>Your sole responsibility in terms of accuracy and appropriateness.</Text>
                  </ListItem>
                </List>
                <Box bg={highlightColor} p={3} borderRadius="md" mt={4}>
                  <Text fontSize={{ base: "sm", md: "md" }} fontWeight="medium">
                    We are not responsible for the content of your messages or any responses you receive from lenders.
                  </Text>
                </Box>
              </Box>

              <Accordion allowMultiple>
                {/* Additional Sections in Accordion */}
                {[
                  {
                    title: "11. Escalation to the Financial Ombudsman",
                    icon: FiExternalLink,
                    content: (
                      <>
                        <Text mb={2} fontSize={{ base: "sm", md: "md" }}>
                          If your lender rejects your claim, we may provide general guidance about escalating to the Financial Ombudsman Service (FOS).
                        </Text>
                        <Text fontSize={{ base: "sm", md: "md" }}>
                          This does not constitute a referral or formal submission, and you are solely responsible for any decisions or actions you take.
                        </Text>
                      </>
                    )
                  },
                  {
                    title: "12. Platform Access & Limitations",
                    icon: FiEye,
                    content: (
                      <>
                        <List spacing={3} pl={0}>
                          <ListItem fontSize={{ base: "sm", md: "md" }}>
                            • Your unique inbox is available only within the MCB platform and cannot be accessed externally.
                          </ListItem>
                          <ListItem fontSize={{ base: "sm", md: "md" }}>
                            • We may suspend or terminate your access if we suspect misuse, abuse, fraud, or breach of these Terms.
                          </ListItem>
                          <ListItem fontSize={{ base: "sm", md: "md" }}>
                            • From time to time, the Platform may be unavailable due to updates or maintenance.
                          </ListItem>
                        </List>
                      </>
                    )
                  },
                  {
                    title: "13-19. Additional Terms",
                    icon: FiFileText,
                    content: (
                      <Accordion allowMultiple>
                        <AccordionItem border="none">
                          <h3>
                            <AccordionButton pl={0} _hover={{ bg: "transparent" }}>
                              <Box flex="1" textAlign="left" fontWeight="medium">
                                13. Accessibility
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h3>
                          <AccordionPanel pb={4} fontSize={{ base: "sm", md: "md" }}>
                            We strive to make MCB accessible to everyone, including users with disabilities. If you encounter any barriers, please contact us so we can help.
                          </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem border="none">
                          <h3>
                            <AccordionButton pl={0} _hover={{ bg: "transparent" }}>
                              <Box flex="1" textAlign="left" fontWeight="medium">
                                14. Backups & Data Loss
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h3>
                          <AccordionPanel pb={4} fontSize={{ base: "sm", md: "md" }}>
                            While we take care to safeguard your data, we cannot guarantee against loss. You are encouraged to download or copy any critical information you may need to retain for your records.
                          </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem border="none">
                          <h3>
                            <AccordionButton pl={0} _hover={{ bg: "transparent" }}>
                              <Box flex="1" textAlign="left" fontWeight="medium">
                                15. User-Generated Content
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h3>
                          <AccordionPanel pb={4} fontSize={{ base: "sm", md: "md" }}>
                            <Text mb={2}>You are solely responsible for:</Text>
                            <List spacing={2}>
                              <ListItem>• The content of any emails or claims sent from your @buddy-mail.co.uk inbox.</ListItem>
                              <ListItem>• Any modifications made to the templates we provide.</ListItem>
                            </List>
                            <Text mt={2}>MCB does not pre-screen messages and is not liable for any claims, errors, or disputes resulting from your communications.</Text>
                          </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem border="none">
                          <h3>
                            <AccordionButton pl={0} _hover={{ bg: "transparent" }}>
                              <Box flex="1" textAlign="left" fontWeight="medium">
                                16. No Guarantees
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h3>
                          <AccordionPanel pb={4} fontSize={{ base: "sm", md: "md" }}>
                            We provide tools designed to support your claim process, but we cannot guarantee any specific outcomes, timelines, or refund amounts. Your success depends on your lenders' responses and the details of your finance agreements.
                          </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem border="none">
                          <h3>
                            <AccordionButton pl={0} _hover={{ bg: "transparent" }}>
                              <Box flex="1" textAlign="left" fontWeight="medium">
                                17. Limitation of Liability
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h3>
                          <AccordionPanel pb={4} fontSize={{ base: "sm", md: "md" }}>
                            To the fullest extent permitted by law, MCB will not be liable for any indirect, incidental, or consequential damages resulting from your use of the Platform, including claim rejections, data loss, or missed refunds.
                          </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem border="none">
                          <h3>
                            <AccordionButton pl={0} _hover={{ bg: "transparent" }}>
                              <Box flex="1" textAlign="left" fontWeight="medium">
                                18. Changes to These Terms
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h3>
                          <AccordionPanel pb={4} fontSize={{ base: "sm", md: "md" }}>
                            We may occasionally update these Terms. Material changes will be communicated through the platform. Continued use of the Platform after changes means you accept the new Terms.
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    )
                  }
                ].map((section, index) => (
                  <AccordionItem key={index} borderWidth="1px" borderColor={borderColor} borderRadius="md" mb={3} overflow="hidden">
                    <h3>
                      <AccordionButton _expanded={{ bg: accentColor, color: 'white' }}>
                        <Box flex="1" textAlign="left">
                          <Flex align="center">
                            <Icon as={section.icon} mr={2} />
                            <Text fontWeight="medium">{section.title}</Text>
                          </Flex>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h3>
                    <AccordionPanel pb={4} bg={sectionBg}>
                      {section.content}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>

              <Divider />

              {/* Contact Section */}
              <Box bg={alertBg} p={6} borderRadius="lg" boxShadow="md">
                <Heading as="h2" size={{ base: "md", md: "lg" }} mb={5} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiMail} mr={3} />
                    19. Contact
                  </Flex>
                </Heading>
                <VStack spacing={4} align="stretch">
                  <Flex align="center">
                    <Icon as={FiMail} mr={3} color="blue.500" boxSize={5} />
                    <Link href="mailto:support@myclaimbuddy.com" color="blue.500" fontWeight="medium" fontSize={{ base: "md", md: "lg" }}>
                      support@myclaimbuddy.com
                    </Link>
                  </Flex>
                  <HStack mt={4} spacing={4} wrap="wrap">
                    <Button 
                      as={Link}
                      href="/privacy" 
                      size="sm" 
                      leftIcon={<FiLock />}
                      _hover={{ textDecoration: 'none' }}
                    >
                      Privacy Policy
                    </Button>
                    <Button 
                      as={Link}
                      href="/refund-policy" 
                      size="sm" 
                      leftIcon={<FiDollarSign />}
                      _hover={{ textDecoration: 'none' }}
                    >
                      Refund Policy
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default TNC;
