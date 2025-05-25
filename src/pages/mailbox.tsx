// @ts-nocheck
import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Container,
  VStack,
  HStack,
  Badge,
  Icon,
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  Divider,
  useColorModeValue,
  Button,
  Tag,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Grid,
  GridItem,
  IconButton,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  Center,
  SimpleGrid,
} from '@chakra-ui/react';
import { 
  FiMail, 
  FiSearch, 
  FiTrash2, 
  FiArchive, 
  FiRefreshCw, 
  FiChevronLeft, 
  FiPaperclip,
  FiDownload,
  FiFileText,
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiStar,
  FiMoreVertical,
  FiCheck,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getMails, updateMailStatus } from '@/api/services/mail';

// Interface for email type
interface Attachment {
  filename: string;
  path: string;
  mimetype: string;
  size: number;
  _id: string;
  signedUrl: string;
}

interface Email {
  _id: string;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  timestamp: string;
  attachments: Attachment[];
  userId: string;
  status: 'read' | 'unread' | 'archived';
  messageId: string;
  createdAt: string;
  updatedAt: string;
  starred?: boolean;
}

const Mailbox: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedMail, setSelectedMail] = useState<Email | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  
  // Mark all emails as read
  const markAllAsRead = async () => {
    try {
      const response = await updateMailStatus({ markAll: 'read' });
      
      if (response.success) {
        setEmails(emails.map(email => ({ ...email, status: 'read' })));
        if (selectedMail) {
          setSelectedMail({ ...selectedMail, status: 'read' });
        }
      }
    } catch (error) {
      console.error('Error marking all emails as read:', error);
    }
  };

  // Mark all emails as unread
  const markAllAsUnread = async () => {
    try {
      const response = await updateMailStatus({ markAll: 'unread' });
      
      if (response.success) {
        setEmails(emails.map(email => ({ ...email, status: 'unread' })));
        if (selectedMail) {
          setSelectedMail({ ...selectedMail, status: 'unread' });
        }
      }
    } catch (error) {
      console.error('Error marking all emails as unread:', error);
    }
  };

  //
  // Filter emails based on search
  const filterEmails = () => {
    let filtered = [...emails];
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(email => 
        email.sender.toLowerCase().includes(searchQuery.toLowerCase()) || 
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
        email.body.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };
  
  const filteredEmails = filterEmails();
  
  // Open email details
  const handleEmailClick = (email: Email) => {
    // Mark as read when opening
    if (email.status === 'unread') {
      markAsRead(email._id);
    }
    setSelectedMail(email);
    onOpen();
  };
  
  // Toggle star status
  const toggleStar = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent email from opening
    try {
      const email = emails.find(e => e._id === id);
      if (email) {
        const response = await updateMailStatus({ emailId: id, starred: !email.starred });
        if (response.success) {
          setEmails(emails.map(email => 
            email._id === id ? { ...email, starred: !email.starred } : email
          ));
        }
      }
    } catch (error) {
      console.error('Error updating star status:', error);
    }
  };
  
  // Mark email as read
  const markAsRead = async (id: string) => {
    try {
      const response = await updateMailStatus({ emailId: id, status: 'read' });
      if (response.success) {
        setEmails(emails.map(email => 
          email._id === id ? { ...email, status: 'read' } : email
        ));
        
        // Also update selectedMail if it's the one being marked
        if (selectedMail && selectedMail._id === id) {
          setSelectedMail({ ...selectedMail, status: 'read' });
        }
      }
    } catch (error) {
      console.error('Error marking email as read:', error);
    }
  };
  
  // Mark email as unread
  const markAsUnread = async (id: string) => {
    try {
      const response = await updateMailStatus({ emailId: id, status: 'unread' });
      if (response.success) {
        setEmails(emails.map(email => 
          email._id === id ? { ...email, status: 'unread' } : email
        ));
        
        // Also update selectedMail if it's the one being marked
        if (selectedMail && selectedMail._id === id) {
          setSelectedMail({ ...selectedMail, status: 'unread' });
        }
      }
    } catch (error) {
      console.error('Error marking email as unread:', error);
    }
  };
  const fetchMails = async () => {
    setIsLoading(true);
    try {
      const response = await getMails();
      if (response.success && response.data.emails) {
        setEmails(response.data.emails);
      }
    } catch (error) {
      console.error('Error fetching emails:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
   
    fetchMails();
  }, []);
  
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    return date.toLocaleDateString(undefined, { 
      weekday: 'short',
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Navigate back to dashboard
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  
  // Colors for design elements
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.50', 'gray.700');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  const starColor = useColorModeValue('yellow.400', 'yellow.300');
  const starHoverColor = useColorModeValue('yellow.500', 'yellow.400');
  
  return (
    <Box 
      bg={useColorModeValue('gray.50', 'gray.900')} 
      minH="100vh" 
      py={{ base: 2, md: 8 }}
      px={{ base: 0, md: 4 }}
    >
      <Container maxW="container.xl" px={{ base: 0, md: 4 }}>
        {/* Enhanced Header - Better Mobile Optimization */}
        <Box mb={{ base: 2, md: 6 }}>
          <Flex 
            justify="space-between" 
            align="center" 
            bg={useColorModeValue('white', 'gray.800')}
            p={{ base: 4, md: 6 }}
            borderRadius={{ base: 0, md: "xl" }}
            boxShadow={{ base: "none", md: "sm" }}
            borderWidth={{ base: 0, md: "1px" }}
            borderBottomWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
          >
            <VStack align="flex-start" spacing={0}>
              <Heading 
                size={{ base: "md", md: "lg" }}
                bgGradient="linear(to-r, blue.500, purple.500)"
                bgClip="text"
                fontWeight="bold"
              >
                Inbox
              </Heading>
              <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }}>
                Lender communications
              </Text>
            </VStack>
            <Button 
              leftIcon={<Icon as={FiChevronLeft} boxSize={{ base: 4, md: 5 }} />} 
              onClick={handleBackToDashboard}
              variant="ghost"
              colorScheme="blue"
              size="sm"
              px={{ base: 2, md: 4 }}
              _hover={{ transform: 'translateX(-2px)' }}
              transition="all 0.2s"
            >
              Back
            </Button>
          </Flex>
        </Box>

        {/* Optimized Mail Interface - Better for Mobile */}
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          borderRadius={{ base: 0, md: "xl" }}
          boxShadow={{ base: "none", md: "md" }}
          overflow="hidden"
          borderWidth={{ base: 0, md: "1px" }}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          h={{ base: "calc(100vh - 100px)", md: "calc(100vh - 180px)" }}
          display="flex"
          flexDirection="column"
        >
          {/* Streamlined Search/Actions Bar - Better Mobile Alignment */}
          <Flex 
            p={{ base: 3, md: 4 }} 
            borderBottomWidth="1px" 
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            bg={useColorModeValue('gray.50', 'gray.750')}
            align="center"
            gap={2}
          >
            <InputGroup size={{ base: "sm", md: "md" }} flex="1">
              <InputLeftElement pointerEvents="none" pl={{ base: 2, md: 3 }}>
                <Icon as={FiSearch} color="gray.400" boxSize={{ base: 3, md: 4 }} />
              </InputLeftElement>
              <Input 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                borderRadius="full"
                bg={useColorModeValue('white', 'gray.700')}
                _placeholder={{ color: 'gray.400' }}
                fontSize={{ base: "sm", md: "md" }}
                pl={{ base: 8, md: 10 }}
              />
            </InputGroup>

            <IconButton
              aria-label="Refresh messages"
              icon={<Icon as={FiRefreshCw} boxSize={{ base: 3.5, md: 4 }} />}
              variant="ghost"
              size={{ base: "sm", md: "md" }}
              onClick={fetchMails}
              colorScheme="blue"
              isRound
            />
          </Flex>

          {/* Enhanced Email List with Better Mobile Layout */}
          <Box 
            flex="1" 
            overflow="auto" 
            className="hide-scrollbar"
            position="relative"
          >
            {isLoading ? (
              <Center h="100%" w="full">
                <VStack spacing={3}>
                  <Spinner 
                    size={{ base: "md", md: "xl" }} 
                    color="blue.500" 
                    thickness="4px"
                    speed="0.65s"
                    emptyColor={useColorModeValue("gray.200", "gray.700")}
                  />
                  <Text color="gray.500" fontSize={{ base: "sm", md: "md" }}>
                    Loading messages...
                  </Text>
                </VStack>
              </Center>
            ) : (
              <>
                {filteredEmails.length === 0 ? (
                  <Flex 
                    justify="center" 
                    align="center" 
                    p={{ base: 6, md: 10 }}
                    direction="column"
                    h="full"
                    textAlign="center"
                  >
                    <Box 
                      bg={useColorModeValue("gray.50", "gray.700")}
                      p={5}
                      borderRadius="full"
                      mb={4}
                    >
                      <Icon 
                        as={FiMail} 
                        boxSize={{ base: 8, md: 12 }}
                        color={useColorModeValue("gray.300", "gray.500")}
                      />
                    </Box>
                    <Text 
                      color={useColorModeValue("gray.600", "gray.400")}
                      fontSize={{ base: "md", md: "lg" }}
                      fontWeight="medium"
                    >
                      {searchQuery ? 'No matching messages' : 'Your inbox is empty'}
                    </Text>
                    <Text 
                      color={useColorModeValue("gray.500", "gray.500")} 
                      fontSize={{ base: "xs", md: "sm" }}
                      mt={2}
                      maxW="xs"
                    >
                      {searchQuery 
                        ? 'Try adjusting your search terms or clear the search' 
                        : 'New messages from lenders will appear here'}
                    </Text>
                  </Flex>
                ) : (
                  // Improved Email Items with Better Mobile Layout and Fixed Star Alignment
                  <VStack spacing={0} align="stretch" divider={
                    <Divider borderColor={useColorModeValue("gray.100", "gray.700")} />
                  }>
                    {filteredEmails.map((email) => (
                      <Box 
                        key={email._id}
                        onClick={() => handleEmailClick(email)}
                        cursor="pointer"
                        transition="all 0.2s"
                        bg={email.status === 'read' 
                          ? useColorModeValue("white", "gray.800") 
                          : useColorModeValue("blue.50", "blue.900")
                        }
                        px={{ base: 3, md: 5 }}
                        py={{ base: 3, md: 4 }}
                        _hover={{ 
                          bg: useColorModeValue("gray.50", "gray.750"),
                        }}
                        position="relative"
                        borderLeft="3px solid"
                        borderLeftColor={email.starred 
                          ? useColorModeValue("yellow.400", "yellow.500") 
                          : (email.status === 'unread' 
                              ? useColorModeValue("blue.400", "blue.500") 
                              : "transparent")
                        }
                      >
                        <Flex gap={3} align="flex-start">
                          {/* Left side - Avatar */}
                          <Avatar 
                            size={{ base: "sm", md: "md" }}
                            name={email.sender}
                            bgGradient="linear(to-r, blue.400, purple.500)"
                            border="2px solid"
                            borderColor={useColorModeValue("white", "gray.700")}
                            boxShadow="sm"
                          />
                          
                          {/* Center - Message content with improved mobile layout */}
                          <Box flex="1" minW="0" mr={{ base: 6, md: 10 }}>
                            {/* Header with better alignment */}
                            <Flex 
                              justify="space-between" 
                              align="center"
                              mb={1}
                              wrap="nowrap"
                              gap={2}
                            >
                              <Text 
                                fontWeight={email.status === 'read' ? "medium" : "bold"} 
                                fontSize={{ base: "xs", md: "sm" }}
                                noOfLines={1}
                                flex="1"
                                color={useColorModeValue("gray.800", "white")}
                                maxW="70%"
                              >
                                {email.sender}
                              </Text>
                              <Text 
                                fontSize={{ base: "2xs", md: "xs" }}
                                color="gray.500"
                                flexShrink={0}
                                whiteSpace="nowrap"
                              >
                                {formatDate(email.timestamp)}
                              </Text>
                            </Flex>
                            
                            {/* Subject with proper spacing */}
                            <Text 
                              fontSize={{ base: "sm", md: "md" }}
                              fontWeight={email.status === 'read' ? "normal" : "medium"}
                              mb={1}
                              noOfLines={1}
                              color={email.status === 'read' 
                                ? useColorModeValue("gray.700", "gray.300")
                                : useColorModeValue("gray.800", "white")
                              }
                              pr={{ base: 1, md: 2 }}
                            >
                              {email.subject}
                            </Text>
                            
                            {/* Body preview with better spacing */}
                            <Text 
                              fontSize={{ base: "xs", md: "sm" }}
                              color={useColorModeValue("gray.600", "gray.400")}
                              noOfLines={{ base: 1, md: 2 }}
                              mb={{ base: 1, md: 2 }}
                              pr={{ base: 0, md: 2 }}
                            >
                              {email.body}
                            </Text>
                            
                            {/* Footer with improved mobile layout */}
                            <Flex justify="flex-start" align="center">
                              {/* Attachment indicator */}
                              {email.attachments.length > 0 && (
                                <HStack spacing={1} mr={2}>
                                  <Icon 
                                    as={FiPaperclip} 
                                    boxSize={{ base: 3, md: 3.5 }} 
                                    color={useColorModeValue("blue.500", "blue.300")}
                                  />
                                  <Text 
                                    fontSize={{ base: "2xs", md: "xs" }}
                                    color={useColorModeValue("blue.600", "blue.300")}
                                  >
                                    {email.attachments.length}
                                  </Text>
                                </HStack>
                              )}
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>
                    ))}
                  </VStack>
                )}
              </>
            )}
          </Box>
        </Box>
      </Container>

      {/* Redesigned Email Detail Modal - Enhanced for Mobile */}
      {selectedMail && (
        <Modal 
          isOpen={isOpen} 
          onClose={onClose} 
          size={{ base: "full", md: "2xl" }}
          motionPreset="slideInBottom"
          scrollBehavior="inside"
        >
          <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(8px)" />
          <ModalContent 
            borderRadius={{ base: 0, md: "2xl" }}
            my={{ base: 0, md: 4 }}
            maxH={{ base: "100vh", md: "85vh" }}
            overflow="hidden" // Ensure content doesn't overflow
          >
            <ModalHeader 
              borderBottomWidth="1px" 
              borderColor={borderColor}
              bg={useColorModeValue("gray.50", "gray.750")}
              px={{ base: 4, md: 6 }}
              py={{ base: 3, md: 4 }}
              position="relative" // For absolute positioning of star
            >
              <Flex direction="column">
                <Text 
                  fontSize={{ base: "md", md: "lg" }} 
                  fontWeight="bold"
                  noOfLines={1}
                  pr={{ base: 10, md: 12 }} // Space for star button
                  mb={1}
                >
                  {selectedMail.subject}
                </Text>
                <HStack spacing={2}>
                  <Badge 
                    colorScheme={selectedMail.status === 'unread' ? "blue" : "gray"}
                    variant="subtle"
                    fontSize="xs"
                    borderRadius="full"
                    px={2}
                  >
                    {selectedMail.status}
                  </Badge>
                  <Text fontSize="xs" color="gray.500">
                    {formatDate(selectedMail.timestamp)}
                  </Text>
                </HStack>
              </Flex>
            </ModalHeader>
            <ModalCloseButton size="md" top={3} right={3} zIndex="1" />
            
            <ModalBody pt={5} px={{ base: 4, md: 6 }}>
              {/* Sender info - Better mobile layout */}
              <Flex 
                align="flex-start" 
                mb={{ base: 4, md: 6 }}
                gap={{ base: 3, md: 4 }}
              >
                <Avatar 
                  size={{ base: "sm", md: "md" }}
                  name={selectedMail.sender} 
                  bgGradient="linear(to-r, blue.400, purple.500)"
                  border="2px solid"
                  borderColor={useColorModeValue("white", "gray.700")}
                />
                <Box flex="1" minW="0">
                  <Text 
                    fontWeight="bold" 
                    fontSize={{ base: "md", md: "lg" }}
                    noOfLines={1}
                  >
                    {selectedMail.sender}
                  </Text>
                  <Text 
                    fontSize={{ base: "xs", md: "sm" }} 
                    color="gray.500"
                    display="flex"
                    alignItems="center"
                  >
                    <Icon as={FiCalendar} mr={1} />
                    <span>{formatDate(selectedMail.timestamp)}</span>
                  </Text>
                </Box>
              </Flex>
              
              <Divider mb={{ base: 4, md: 6 }} />
              
              {/* Enhanced Email body with better quoted text formatting */}
              <Box 
                fontSize={{ base: "sm", md: "md" }}
                lineHeight="tall"
                mb={{ base: 6, md: 8 }}
                color={useColorModeValue("gray.700", "gray.200")}
              >
                {selectedMail.body.split('\n').map((line, index) => {
                  // Check if line starts with ">" for quoted text
                  const isQuotedLine = line.trim().startsWith('>');
                  
                  // Check if line contains Google Maps links and skip it
                  const hasGoogleMapsLink = line.includes('maps.google.com') || 
                                          line.includes('goo.gl/maps') || 
                                          line.includes('google.com/maps') ||
                                          line.includes('maps.app.goo.gl');
                  
                  if (hasGoogleMapsLink) {
                    return null; // Don't render lines with Google Maps links
                  }
                  
                    if (isQuotedLine) {
                    // Handle double ">>" and single ">" quotes
                    const doubleQuoted = line.trim().startsWith('>>');
                    const cleanedLine = line.replace(/^>+\s*/, '');
                    return (
                      <Box
                      key={index}
                      pl={doubleQuoted ? 6 : 4}
                      py={1}
                      px={3}
                      my={1}
                      borderRadius="md"
                      fontSize={{ base: "xs", md: "sm" }}
                      color={useColorModeValue("gray.500", "gray.400")}
                      fontStyle="italic"
                      >
                      {cleanedLine}
                      </Box>
                    );
                    }
                  
                  // Regular text lines
                  return (
                    <Text
                      key={index}
                      mb={line.trim() === '' ? 2 : 1}
                      sx={{
                        wordBreak: "break-word",
                        "& a": {
                          color: "blue.500",
                          textDecoration: "underline",
                          _hover: {
                            color: "blue.600",
                          }
                        }
                      }}
                    >
                      {line || '\u00A0'} {/* Non-breaking space for empty lines */}
                    </Text>
                  );
                })}
              </Box>
              
              {/* Enhanced attachment display - Better mobile layout */}
              {selectedMail.attachments.length > 0 && (
                <Box
                  p={{ base: 3, md: 5 }}
                  bg={useColorModeValue('gray.50', 'gray.750')}
                  borderRadius="xl"
                  mb={4}
                  border="1px solid"
                  borderColor={useColorModeValue("gray.100", "gray.700")}
                >
                  <Flex align="center" mb={{ base: 2, md: 3 }}>
                    <Icon 
                      as={FiPaperclip} 
                      mr={2}
                      color={useColorModeValue("blue.500", "blue.300")}
                    />
                    <Text fontWeight="medium">
                      Attachments ({selectedMail.attachments.length})
                    </Text>
                  </Flex>
                  
                  <SimpleGrid 
                    columns={{ base: 1, md: 2 }}
                    spacing={{ base: 2, md: 3 }}
                  >
                    {selectedMail.attachments.map((attachment) => (
                      <Flex 
                        key={attachment._id}
                        p={{ base: 2, md: 3 }}
                        borderRadius="lg"
                        bg={useColorModeValue("white", "gray.800")}
                        borderWidth="1px"
                        borderColor={useColorModeValue("gray.200", "gray.600")}
                        align="center"
                        justify="space-between"
                        transition="all 0.2s"
                        _hover={{
                          bg: useColorModeValue("gray.50", "gray.700"),
                          borderColor: useColorModeValue("blue.100", "blue.700"),
                        }}
                        gap={2}
                      >
                        <HStack flex="1" minWidth="0" spacing={2}>
                          <Icon 
                            as={FiFileText} 
                            color="blue.500"
                            boxSize={{ base: 4, md: 5 }}
                            flexShrink={0}
                          />
                          <Box flex="1" minWidth="0">
                            <Text 
                              fontWeight="medium" 
                              fontSize={{ base: "xs", md: "sm" }}
                              noOfLines={1}
                            >
                              {attachment.filename}
                            </Text>
                            <Text 
                              fontSize={{ base: "2xs", md: "xs" }}
                              color="gray.500"
                            >
                              {(attachment.size / 1024).toFixed(1)} KB
                            </Text>
                          </Box>
                        </HStack>
                        
                        <IconButton
                          icon={<Icon as={FiDownload} boxSize={{ base: 3.5, md: 4 }} />}
                          aria-label="Download attachment"
                          size="sm"
                          colorScheme="blue"
                          variant="ghost"
                          as="a"
                          href={attachment.signedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          flexShrink={0}
                          minW={{ base: "28px", md: "32px" }}
                          h={{ base: "28px", md: "32px" }}
                          p={0}
                        />
                      </Flex>
                    ))}
                  </SimpleGrid>
                </Box>
              )}
            </ModalBody>
            
            <ModalFooter 
              borderTopWidth="1px" 
              borderColor={borderColor}
              justifyContent="center"
              p={{ base: 3, md: 4 }}
            >
              <Button 
                leftIcon={<Icon as={selectedMail.status === 'read' ? FiEyeOff : FiEye} />}
                onClick={() => {
                  if (selectedMail.status === 'read') {
                    markAsUnread(selectedMail._id);
                    onClose();
                  } else {
                    markAsRead(selectedMail._id);
                  }
                }}
                colorScheme="blue"
                size={{ base: "md", md: "md" }}
                w={{ base: "full", md: "auto" }}
                minW={{ base: "auto", md: "200px" }}
                borderRadius="lg"
              >
                Mark as {selectedMail.status === 'read' ? 'unread' : 'read'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Fixed FAB Action Button - Mobile optimization */}
      <Box
        display={{ base: "block", md: "none" }}
        position="fixed"
        bottom={4}
        right={4}
        zIndex={10}
      >
        <Tooltip label="Mark all as read" placement="left">
          <IconButton
            aria-label="Mark all as read"
            icon={<Icon as={FiEye} boxSize={5} />}
            onClick={markAllAsRead}
            colorScheme="blue"
            isRound
            size="lg"
            boxShadow="xl"
            width="50px"
            height="50px"
          />
        </Tooltip>
      </Box>

      {/* Add optimized styles for touch interfaces */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* Improve touch targets for mobile */
        @media (max-width: 768px) {
          button, a {
            cursor: default !important;
          }
        }
      `}</style>
    </Box>
  );
};

export default Mailbox;
