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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Icon,
  Flex,
  Badge,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Alert,
  AlertIcon,
  HStack,
  Tag,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Image,
  Stack,
} from '@chakra-ui/react';
import { 
  FiUser, 
  FiServer, 
  FiCreditCard, 
  FiShield, 
  FiMail, 
  FiLock, 
  FiInfo,
  FiAlertCircle,
  FiFileText,
  FiDatabase,
  FiGlobe,
  FiExternalLink,
  FiClock,
  FiMessageSquare,
  FiStar,
  FiCheckCircle,
  FiSettings,
  FiHelpCircle,
  FiChevronRight,
  FiKey,
  FiGift,
  FiBookOpen,
  FiEye,
  FiPhone,
  FiMapPin
} from 'react-icons/fi';

const Privacy = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const headingColor = useColorModeValue('blue.600', 'blue.300');
  const sectionBg = useColorModeValue('white', 'gray.800');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const borderColor = useColorModeValue('blue.100', 'blue.700');
  const alertBg = useColorModeValue('blue.50', 'blue.900');
  const cardBg = useColorModeValue('blue.50', 'blue.900');
  const currentDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  // Data collection categories
  const dataCategories = [
    {
      title: "Personal Information",
      icon: FiUser,
      items: ["Name", "Email address", "Phone number", "Date of birth", "Current and past addresses", "Identity documents"]
    },
    {
      title: "Technical Information",
      icon: FiServer,
      items: ["IP address", "Browser type and device data", "Usage activity and interaction logs", "Referral source or campaign tags"]
    },
    {
      title: "Payment Details",
      icon: FiCreditCard,
      items: ["Billing method and transaction data"]
    }
  ];

  // User rights
  const userRights = [
    {
      title: "Access",
      description: "Request a copy of your data",
      icon: FiKey
    },
    {
      title: "Rectification",
      description: "Correct inaccurate or incomplete data",
      icon: FiFileText
    },
    {
      title: "Erasure",
      description: "Request deletion of your data",
      icon: FiDatabase
    },
    {
      title: "Restriction",
      description: "Ask us to limit how we use your data",
      icon: FiLock
    },
    {
      title: "Objection",
      description: "Object to processing based on legitimate interest",
      icon: FiAlertCircle
    },
    {
      title: "Portability",
      description: "Request your data in a structured format",
      icon: FiServer
    }
  ];

  // Data processors
  const dataProcessors = [
    { purpose: "Payments", provider: "Stripe, PayPal, Apple Pay, Google Pay" },
    { purpose: "Hosting", provider: "AWS or equivalent UK/EU data centre" },
    { purpose: "Email Delivery", provider: "Mailgun or equivalent infrastructure" }
  ];

  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Container maxW="4xl">
        <VStack spacing={12} align="stretch">
          <Box textAlign="center" mb={8}>
            <Badge colorScheme="blue" fontSize="md" mb={4} px={3} py={1} borderRadius="full">
              Your Privacy Matters
            </Badge>
            <Heading as="h1" size="3xl" color={headingColor} mb={4}>
              Privacy Policy
            </Heading>
            <Text color="gray.500" fontSize="lg">
              Last updated: {currentDate}
            </Text>
          </Box>

          <Box mb={6} fontSize="lg" color={textColor}>
            <Text>
              This Privacy Policy explains how My Claim Buddy ("MCB", "we", "us", or "our") collects, uses, stores, and protects your personal data when you use our website, app, and related services ("the Platform").
            </Text>
            <Text mt={3}>
              We take your privacy seriously and are committed to complying with the UK General Data Protection Regulation (UK GDPR) and other applicable data protection laws.
            </Text>
          </Box>

          <Box bg={sectionBg} p={8} borderRadius="xl" boxShadow="xl" position="relative" overflow="hidden">
            <Box
              position="absolute"
              top="-20px"
              right="-20px"
              width="100px"
              height="100px"
              bg={accentColor}
              opacity={0.1}
              borderRadius="full"
            />
            <VStack spacing={8} align="stretch">
              {/* Who We Are Section */}
              <Box>
                <Heading as="h2" size="lg" mb={6} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiInfo} mr={3} />
                    1. Who We Are
                  </Flex>
                </Heading>
                <VStack spacing={3} align="stretch">
                  <Text color={textColor} fontSize="md" lineHeight="tall">
                    My Claim Buddy is a UK-based self-service claims platform that helps individuals manage and submit their own car finance information requests and complaints.
                  </Text>
                  <Alert status="info" borderRadius="md">
                    <AlertIcon />
                    <Stack>
                      <Text fontWeight="medium">We are not a law firm or claims management company.</Text>
                      <Text>We do not act on your behalf or provide legal advice. Our platform is educational and informational only.</Text>
                    </Stack>
                  </Alert>
                </VStack>
              </Box>

              <Divider />

              {/* What Information We Collect */}
              <Box>
                <Heading as="h2" size="lg" mb={6} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiDatabase} mr={3} />
                    2. What Information We Collect
                  </Flex>
                </Heading>
                <Text mb={4}>We may collect the following types of personal data:</Text>
                
                <Accordion allowMultiple defaultIndex={[0]}>
                  {dataCategories.map((category, index) => (
                    <AccordionItem key={index} borderWidth="1px" borderRadius="md" mb={3} overflow="hidden" borderColor={borderColor}>
                      <h3>
                        <AccordionButton _expanded={{ bg: accentColor, color: 'white' }}>
                          <Box flex="1" textAlign="left">
                            <Flex align="center">
                              <Icon as={category.icon} mr={2} />
                              <Text fontWeight="medium">{category.title}</Text>
                            </Flex>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h3>
                      <AccordionPanel pb={4}>
                        <List spacing={2}>
                          {category.items.map((item, itemIndex) => (
                            <ListItem key={itemIndex} display="flex" alignItems="center">
                              <Icon as={FiCheckCircle} color="green.500" mr={2} />
                              <Text>{item}</Text>
                            </ListItem>
                          ))}
                          {category.title === "Payment Details" && (
                            <Text fontSize="sm" fontStyle="italic" mt={2}>
                              (processed by Stripe, PayPal, Apple Pay, or Google Pay — we do not store card information)
                            </Text>
                          )}
                        </List>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Box>

              <Divider />

              {/* How We Use Your Information */}
              <Box>
                <Heading as="h2" size="lg" mb={6} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiSettings} mr={3} />
                    3. How We Use Your Information
                  </Flex>
                </Heading>
                <Text mb={4}>We use your data to:</Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {[
                    { text: "Create your user account and secure inbox", icon: FiUser },
                    { text: "Enable claim communication via @buddy-mail.co.uk", icon: FiMail },
                    { text: "Provide access to educational claim tools and templates", icon: FiBookOpen },
                    { text: "Track your claim progress", icon: FiCheckCircle },
                    { text: "Send you reminders, updates, and alerts", icon: FiMessageSquare },
                    { text: "Support referral tracking (if applicable)", icon: FiGift },
                    { text: "Comply with legal obligations", icon: FiShield }
                  ].map((item, index) => (
                    <Flex key={index} align="center" bg={cardBg} p={3} borderRadius="md">
                      <Icon as={item.icon} mr={3} color={accentColor} />
                      <Text fontSize="sm">{item.text}</Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </Box>

              <Divider />

              {/* Legal Basis for Processing */}
              <Box>
                <Heading as="h2" size="lg" mb={6} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiShield} mr={3} />
                    4. Legal Basis for Processing
                  </Flex>
                </Heading>
                <Text mb={4}>Our lawful grounds for processing your data include:</Text>
                <VStack spacing={3} align="stretch">
                  <Flex p={3} bg={cardBg} borderRadius="md" align="center">
                    <Tag size="md" colorScheme="blue" mr={3}>Contract</Tag>
                    <Text fontSize="sm">Performance of a contract – to provide the services you sign up for</Text>
                  </Flex>
                  <Flex p={3} bg={cardBg} borderRadius="md" align="center">
                    <Tag size="md" colorScheme="green" mr={3}>Legitimate</Tag>
                    <Text fontSize="sm">Legitimate interests – to operate, improve, and secure the platform</Text>
                  </Flex>
                  <Flex p={3} bg={cardBg} borderRadius="md" align="center">
                    <Tag size="md" colorScheme="purple" mr={3}>Consent</Tag>
                    <Text fontSize="sm">Consent – where required for marketing or referrals</Text>
                  </Flex>
                  <Flex p={3} bg={cardBg} borderRadius="md" align="center">
                    <Tag size="md" colorScheme="orange" mr={3}>Legal</Tag>
                    <Text fontSize="sm">Legal obligation – for compliance and record-keeping</Text>
                  </Flex>
                </VStack>
              </Box>

              <Divider />

              {/* Email Privacy & Access */}
              <Box>
                <Heading as="h2" size="lg" mb={6} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiMail} mr={3} />
                    5. Email Privacy & Access
                  </Flex>
                </Heading>
                <VStack spacing={4} align="stretch" bg={alertBg} p={6} borderRadius="md">
                  <Flex align="flex-start">
                    <Icon as={FiMail} mt={1} mr={3} color="blue.500" />
                    <Text>Each user is issued a private, platform-based email address (e.g. you@buddy-mail.co.uk) for claim communications.</Text>
                  </Flex>
                  <Flex align="flex-start">
                    <Icon as={FiEye} mt={1} mr={3} color="blue.500" />
                    <Text>We do not read, monitor, or access the contents of any emails you send or receive.</Text>
                  </Flex>
                  <Flex align="flex-start">
                    <Icon as={FiLock} mt={1} mr={3} color="blue.500" />
                    <Text>Your inbox is secure and accessible only via your MCB account.</Text>
                  </Flex>
                  <Flex align="flex-start">
                    <Icon as={FiUser} mt={1} mr={3} color="blue.500" />
                    <Text>You are solely responsible for sending, receiving, and managing all communications with your lenders.</Text>
                  </Flex>
                  <Alert status="info" borderRadius="md">
                    <AlertIcon />
                    <Text>This ensures your conversations remain fully confidential and under your control.</Text>
                  </Alert>
                </VStack>
              </Box>

              <Divider />

              {/* Data Storage & Security */}
              <Box>
                <Heading as="h2" size="lg" mb={6} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiLock} mr={3} />
                    6. Data Storage & Security
                  </Flex>
                </Heading>
                <List spacing={4}>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiShield} color="green.500" mr={3} />
                    <Text>All data is stored securely on encrypted servers within the UK or EU.</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiUser} color="green.500" mr={3} />
                    <Text>Access to your data is limited to authorised personnel and subject to strict internal controls.</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiLock} color="green.500" mr={3} />
                    <Text>SSL encryption is used for all data transmission.</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiKey} color="green.500" mr={3} />
                    <Text>Identity documents and sensitive details are encrypted at rest and in transit.</Text>
                  </ListItem>
                </List>
              </Box>

              <Divider />

              {/* Data Retention */}
              <Box>
                <Heading as="h2" size="lg" mb={6} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiClock} mr={3} />
                    7. Data Retention
                  </Flex>
                </Heading>
                <VStack spacing={4} align="stretch">
                  <Text>We retain your personal data while your account is active and for up to 6 years after closure to comply with legal, tax, and audit requirements.</Text>
                  <Text>You may request earlier deletion of your account and associated data unless we are legally required to retain it.</Text>
                </VStack>
              </Box>

              <Divider />

              {/* Data Sharing & Processors */}
              <Box>
                <Heading as="h2" size="lg" mb={6} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiServer} mr={3} />
                    8. Data Sharing & Processors
                  </Flex>
                </Heading>
                <VStack spacing={4} align="stretch">
                  <Alert status="success" variant="subtle" borderRadius="md">
                    <AlertIcon />
                    <Text fontWeight="medium">We do not sell or rent your personal data.</Text>
                  </Alert>
                  <Text>We may share limited data with trusted third parties for service functionality:</Text>
                  
                  <Table variant="simple" borderWidth="1px" borderColor={borderColor} borderRadius="md" overflow="hidden">
                    <Thead bg={cardBg}>
                      <Tr>
                        <Th>Purpose</Th>
                        <Th>Provider</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dataProcessors.map((processor, index) => (
                        <Tr key={index}>
                          <Td>{processor.purpose}</Td>
                          <Td>{processor.provider}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                  
                  <Text fontSize="sm" fontStyle="italic">
                    All third-party providers are subject to data processing agreements and UK GDPR compliance.
                  </Text>
                </VStack>
              </Box>

              <Divider />

              {/* Your Rights */}
              <Box>
                <Heading as="h2" size="lg" mb={6} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiShield} mr={3} />
                    9. Your Rights
                  </Flex>
                </Heading>
                <Text mb={4}>You have the following rights under the UK GDPR:</Text>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mb={6}>
                  {userRights.map((right, index) => (
                    <Box key={index} borderWidth="1px" borderColor={borderColor} p={4} borderRadius="md" bg={cardBg}>
                      <Flex direction="column" align="center" textAlign="center">
                        <Icon as={right.icon} mb={2} boxSize={6} color={accentColor} />
                        <Text fontWeight="bold" mb={1}>{right.title}</Text>
                        <Text fontSize="sm">{right.description}</Text>
                      </Flex>
                    </Box>
                  ))}
                </SimpleGrid>
                <Flex justifyContent="center" mt={4}>
                  <Button
                    size="md"
                    colorScheme="blue"
                    leftIcon={<FiMail />}
                    as={Link}
                    href="mailto:privacy@myclaimbuddy.com"
                    _hover={{ textDecoration: 'none' }}
                  >
                    Request via privacy@myclaimbuddy.com
                  </Button>
                </Flex>
              </Box>

              {/* Additional Sections in Accordion */}
              <Accordion allowMultiple>
                {[
                  {
                    title: "10. Cookies & Analytics",
                    icon: FiServer,
                    content: (
                      <VStack spacing={3} align="stretch">
                        <Text>We use essential and analytics cookies to:</Text>
                        <List spacing={2}>
                          <ListItem display="flex" alignItems="center">
                            <Icon as={FiCheckCircle} color="green.500" mr={2} />
                            <Text>Keep your session secure</Text>
                          </ListItem>
                          <ListItem display="flex" alignItems="center">
                            <Icon as={FiCheckCircle} color="green.500" mr={2} />
                            <Text>Improve platform performance</Text>
                          </ListItem>
                          <ListItem display="flex" alignItems="center">
                            <Icon as={FiCheckCircle} color="green.500" mr={2} />
                            <Text>Understand user behaviour</Text>
                          </ListItem>
                        </List>
                        <Alert status="info" borderRadius="md" mt={2}>
                          <AlertIcon />
                          <Stack>
                            <Text>We do not use advertising cookies or share cookie data with third parties for marketing.</Text>
                            <Text>You can manage cookies through your browser settings.</Text>
                          </Stack>
                        </Alert>
                      </VStack>
                    )
                  },
                  {
                    title: "11. International Transfers",
                    icon: FiGlobe,
                    content: (
                      <Text>
                        All data is processed in the UK or EU. If data is transferred outside these areas in the future, it will be protected by appropriate safeguards such as Standard Contractual Clauses.
                      </Text>
                    )
                  },
                  {
                    title: "12. Children's Data",
                    icon: FiUser,
                    content: (
                      <Alert status="warning" borderRadius="md">
                        <AlertIcon />
                        <Stack>
                          <Text fontWeight="medium">MCB is not intended for users under 18.</Text>
                          <Text>We do not knowingly collect personal data from minors.</Text>
                        </Stack>
                      </Alert>
                    )
                  },
                  {
                    title: "13. Changes to This Policy",
                    icon: FiFileText,
                    content: (
                      <Text>
                        We may update this Privacy Policy from time to time. We will post updates on this page and, where appropriate, notify you via the Platform.
                      </Text>
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
                <Heading as="h2" size="lg" mb={6} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiMessageSquare} mr={3} />
                    14. Contact
                  </Flex>
                </Heading>
                <VStack spacing={4} align="stretch">
                  <Text>If you have any questions, requests, or concerns about your data, contact us at:</Text>
                  <HStack spacing={4}>
                    <Icon as={FiMail} color="blue.500" boxSize={5} />
                    <Link href="mailto:privacy@myclaimbuddy.com" color="blue.500" fontWeight="bold" fontSize="lg">
                      privacy@myclaimbuddy.com
                    </Link>
                  </HStack>

                  <Divider my={2} />
                  
                  <Text>You can also lodge a complaint with the UK Information Commissioner's Office (ICO):</Text>
                  <Button 
                    as={Link} 
                    href="https://ico.org.uk/" 
                    isExternal 
                    size="md" 
                    colorScheme="blue" 
                    variant="outline"
                    rightIcon={<FiExternalLink />}
                    _hover={{ textDecoration: 'none' }}
                  >
                    Visit ICO Website
                  </Button>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Privacy;
