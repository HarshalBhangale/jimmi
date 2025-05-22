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
  Alert,
  AlertIcon,
  Icon,
  Flex,
  Button,
  HStack,
  Tag,
  Card,
  CardBody,
  Stack,
} from '@chakra-ui/react';
import { 
  FiMail, 
  FiShield, 
  FiAlertCircle, 
  FiCheck, 
  FiX, 
  FiDollarSign,
  FiClock,
  FiInfo,
  FiHelpCircle,
  FiCalendar,
  FiCheckCircle,
  FiMessageCircle,
  FiArrowRight,
} from 'react-icons/fi';

const RefundPolicy = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const headingColor = useColorModeValue('blue.600', 'blue.300');
  const sectionBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('blue.100', 'blue.700');
  const alertBg = useColorModeValue('blue.50', 'blue.900');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const cardBg = useColorModeValue('purple.50', 'purple.900');
  const highlightColor = useColorModeValue('yellow.100', 'yellow.800');
  const currentDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Container maxW="4xl">
        <VStack spacing={12} align="stretch">
          {/* Refund Policy Header */}
          <Box textAlign="center" mb={8}>
            <Badge colorScheme="blue" fontSize="md" mb={4} py={1} px={3} borderRadius="full">
              Our Commitment to You
            </Badge>
            <Heading as="h1" size="3xl" color={headingColor} mb={4}>
              Refund Policy
            </Heading>
            <Text color="gray.500" fontSize="lg">
              Last updated: {currentDate}
            </Text>
          </Box>

          <Box mb={6} fontSize="lg" color={textColor}>
            <Text>
              At My Claim Buddy, we stand behind the value of our self-service platform and aim to provide a transparent, risk-free experience.
            </Text>
            <Text mt={3}>
              This Refund Policy outlines the conditions under which users may be eligible for a refund.
            </Text>
          </Box>

          {/* Refund Policy Content */}
          <Box bg={sectionBg} p={8} borderRadius="xl" boxShadow="xl" position="relative">
            <VStack spacing={8} align="stretch">
              {/* Overview Section */}
              <Box>
                <Heading as="h2" size="lg" mb={6} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiInfo} mr={3} />
                    1. Overview
                  </Flex>
                </Heading>
                <VStack spacing={3} align="start">
                  <Text>
                    My Claim Buddy ("MCB", "we", "us", or "our") offers users the ability to manage their own car finance information requests and complaints via a digital platform. Access is granted through a one-time or subscription-based payment.
                  </Text>
                  <Alert status="info" borderRadius="md" width="full">
                    <AlertIcon />
                    <Text>
                      Because our service is digital and accessible immediately upon payment, our refund terms are limited to ensure fair use.
                    </Text>
                  </Alert>
                </VStack>
              </Box>

              <Divider />

              {/* Refund Eligibility Section */}
              <Box>
                <Heading as="h2" size="lg" mb={6} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiCheckCircle} mr={3} />
                    2. Refund Eligibility
                  </Flex>
                </Heading>
                <Text mb={4}>You are eligible for a full refund if all of the following conditions are met:</Text>
                <List spacing={4}>
                  <ListItem display="flex" alignItems="flex-start">
                    <Icon as={FiCheck} color="green.500" mt={1} mr={3} />
                    <Text>You request the refund within 14 calendar days of purchase; <strong>and</strong></Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="flex-start">
                    <Icon as={FiCheck} color="green.500" mt={1} mr={3} />
                    <Text>You have not submitted any claims, templates, or communications using your @buddy-mail.co.uk email address; <strong>and</strong></Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="flex-start">
                    <Icon as={FiCheck} color="green.500" mt={1} mr={3} />
                    <Text>You have not used the platform to send or receive messages from lenders; <strong>and</strong></Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="flex-start">
                    <Icon as={FiCheck} color="green.500" mt={1} mr={3} />
                    <Text>You have not accessed or completed any significant steps in the guided claims process beyond registration.</Text>
                  </ListItem>
                </List>
                <Box bg={highlightColor} p={4} borderRadius="md" mt={6}>
                  <Text fontWeight="medium">If you meet these criteria, you may request a refund with no questions asked.</Text>
                </Box>
              </Box>

              <Divider />

              {/* Non-Refundable Circumstances Section */}
              <Box>
                <Heading as="h2" size="lg" mb={6} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiX} mr={3} />
                    3. Non-Refundable Circumstances
                  </Flex>
                </Heading>
                <Text mb={4}>We will not issue refunds if:</Text>
                <List spacing={4}>
                  <ListItem display="flex" alignItems="flex-start">
                    <Icon as={FiX} color="red.500" mt={1} mr={3} />
                    <Text>You have actively used the system to generate or send communications to lenders</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="flex-start">
                    <Icon as={FiX} color="red.500" mt={1} mr={3} />
                    <Text>You have submitted any claim or data through the platform</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="flex-start">
                    <Icon as={FiX} color="red.500" mt={1} mr={3} />
                    <Text>Your refund request is made after 14 days from the date of purchase</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="flex-start">
                    <Icon as={FiX} color="red.500" mt={1} mr={3} />
                    <Text>You are attempting to seek a refund after completing a claim or receiving a lender response</Text>
                  </ListItem>
                </List>
              </Box>

              <Divider />

              {/* How to Request a Refund Section */}
              <Box>
                <Heading as="h2" size="lg" mb={6} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiMessageCircle} mr={3} />
                    4. How to Request a Refund
                  </Flex>
                </Heading>
                <Text mb={4}>To request a refund, please email us at:</Text>
                <Card bg={cardBg} mb={6}>
                  <CardBody>
                    <Stack direction="row" align="center">
                      <Icon as={FiMail} color={accentColor} boxSize={5} />
                      <VStack align="start" spacing={1}>
                        <Link href="mailto:support@myclaimbuddy.com" color={accentColor} fontWeight="bold">
                          support@myclaimbuddy.com
                        </Link>
                        <Text fontSize="sm">Subject: Refund Request</Text>
                      </VStack>
                    </Stack>
                  </CardBody>
                </Card>
                
                <Text mb={3}>Please include the following:</Text>
                <List spacing={2} ml={4} mb={6}>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiArrowRight} color={accentColor} mr={2} />
                    <Text>Your full name</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiArrowRight} color={accentColor} mr={2} />
                    <Text>Email address used to register</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiArrowRight} color={accentColor} mr={2} />
                    <Text>Date of purchase</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiArrowRight} color={accentColor} mr={2} />
                    <Text>Reason for your request (optional)</Text>
                  </ListItem>
                </List>
                
                <Alert status="info" borderRadius="md">
                  <AlertIcon />
                  <Text>Refunds will be processed within 5–10 business days back to your original payment method.</Text>
                </Alert>
              </Box>

              <Divider />

              {/* Subscriptions Section */}
              <Box>
                <Heading as="h2" size="lg" mb={6} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiCalendar} mr={3} />
                    5. Subscriptions and Renewals
                  </Flex>
                </Heading>
                <Text mb={4}>If you are on a monthly subscription:</Text>
                <List spacing={3} ml={4}>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiCheck} color="green.500" mr={2} />
                    <Text>You can cancel at any time from within your account settings</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiCheck} color="green.500" mr={2} />
                    <Text>No refunds will be issued for partially used billing periods</Text>
                  </ListItem>
                  <ListItem display="flex" alignItems="center">
                    <Icon as={FiCheck} color="green.500" mr={2} />
                    <Text>You will retain access until the end of the current billing cycle</Text>
                  </ListItem>
                </List>
              </Box>

              <Divider />

              {/* Our Guarantee Section */}
              <Box>
                <Heading as="h2" size="lg" mb={6} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiShield} mr={3} />
                    6. Our Guarantee
                  </Flex>
                </Heading>
                <Box bg={highlightColor} p={6} borderRadius="md">
                  <VStack spacing={4} align="stretch">
                    <Text fontSize="lg" fontWeight="medium">
                      We want you to feel confident using My Claim Buddy.
                    </Text>
                    <Text>
                      If you are unhappy with the service and believe there are exceptional circumstances, please get in touch — we will always do our best to help.
                    </Text>
                  </VStack>
                </Box>
              </Box>

              <Divider />

              {/* Contact Section */}
              <Box bg={alertBg} p={6} borderRadius="lg" boxShadow="md">
                <Heading as="h2" size="lg" mb={6} color={headingColor}>
                  <Flex align="center">
                    <Icon as={FiMail} mr={3} />
                    7. Contact
                  </Flex>
                </Heading>
                <VStack spacing={4} align="stretch">
                  <Text>If you have any questions or need support, contact:</Text>
                  <Flex align="center">
                    <Icon as={FiMail} mr={3} color="blue.500" boxSize={5} />
                    <Link href="mailto:support@myclaimbuddy.com" color="blue.500" fontWeight="medium" fontSize="lg">
                      support@myclaimbuddy.com
                    </Link>
                  </Flex>
                  <HStack mt={4} spacing={4} wrap="wrap">
                    <Button 
                      as={Link}
                      href="/tnc" 
                      size="sm" 
                      variant="outline"
                      _hover={{ textDecoration: 'none' }}
                    >
                      Terms of Service
                    </Button>
                    <Button 
                      as={Link}
                      href="/privacy" 
                      size="sm" 
                      variant="outline"
                      _hover={{ textDecoration: 'none' }}
                    >
                      Privacy Policy
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

export default RefundPolicy; 