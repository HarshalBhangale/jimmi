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
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="xl" bgGradient="linear(to-r, blue.400, blue.600)" bgClip="text">
          Lender Communications
        </Heading>
        <Button 
          leftIcon={<Icon as={FiChevronLeft} />} 
          onClick={handleBackToDashboard}
          variant="ghost"
          colorScheme="blue"
        >
          Back to Dashboard
        </Button>
      </Flex>
      
      {/* Mail Interface */}
      <Box
        bg={bgColor} 
        borderRadius="xl" 
        boxShadow="lg" 
        overflow="hidden"
        borderWidth="1px" 
        borderColor={borderColor}
        h={{ base: "auto", md: "calc(100vh - 200px)" }}
      >
        {/* Email Header/Search */}
        <Flex p={4} borderBottomWidth="1px" borderColor={borderColor} align="center" justify="space-between">
          <InputGroup maxW="400px">
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input 
              placeholder="Search in messages" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              borderRadius="full"
            />
          </InputGroup>
          
          <HStack spacing={2}>
            <Button 
              leftIcon={<Icon as={FiEye} />} 
              variant="ghost" 
              size="sm"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
            <Button 
              leftIcon={<Icon as={FiEyeOff} />} 
              variant="ghost" 
              size="sm"
              onClick={markAllAsUnread}
            >
              Mark all as unread
            </Button>
            <Button leftIcon={<Icon as={FiRefreshCw} />} variant="ghost" size="sm" onClick={fetchMails}>
              Refresh
            </Button>
          </HStack>
        </Flex>
        
        {/* Email List */}
        <Box flex="1" overflow="auto" maxH="calc(100vh - 280px)">
          {isLoading ? (
            <Center h="200px">
              <VStack spacing={4}>
                <Spinner size="xl" color="blue.500" thickness="4px" />
                <Text color={secondaryTextColor}>Loading messages...</Text>
              </VStack>
            </Center>
          ) : (
            <VStack spacing={0} align="stretch" divider={<Divider />}>
              {filteredEmails.length === 0 ? (
                <Flex justify="center" align="center" p={10} direction="column">
                  <Icon as={FiMail} fontSize="5xl" color="gray.300" mb={4} />
                  <Text color={secondaryTextColor}>No messages found</Text>
                </Flex>
              ) : (
                filteredEmails.map((email) => (
                  <Box 
                    key={email._id}
                    p={4}
                    cursor="pointer"
                    bg={email.status === 'read' ? bgColor : useColorModeValue('blue.50', 'blue.900')}
                    _hover={{ bg: hoverBgColor }}
                    onClick={() => handleEmailClick(email)}
                    transition="all 0.2s"
                    position="relative"
                    borderLeft="4px solid"
                    borderLeftColor={email.starred ?starColor : "blue.500" }
                  >
                    <Flex justify="space-between" align="flex-start">
                      <HStack spacing={3} flex="1" overflow="hidden">
                        <IconButton
                          aria-label={email.starred ? "Unstar message" : "Star message"}
                          icon={<Icon as={FiStar} />}
                          size="sm"
                          variant="ghost"
                          color={email.starred ? starColor : "gray.400"}
                          _hover={{ color: starHoverColor, bg: "transparent" }}
                          onClick={(e) => toggleStar(email._id, e)}
                        />
                        <Avatar 
                          size="md" 
                          name={email.sender} 
                          bgGradient="linear(to-r, blue.400, blue.600)"
                        />
                        <Box overflow="hidden">
                          <Text 
                            fontWeight={email.status === 'read' ? "normal" : "bold"}
                            noOfLines={1}
                            mb={1}
                          >
                            {email.sender}
                          </Text>
                          <Text 
                            fontWeight={email.status === 'read' ? "normal" : "bold"} 
                            fontSize="md" 
                            mb={1}
                            noOfLines={1}
                          >
                            {email.subject}
                          </Text>
                          <Text 
                            fontSize="sm" 
                            color={secondaryTextColor}
                            noOfLines={1}
                          >
                            {email.body}
                          </Text>
                          {email.attachments.length > 0 && (
                            <HStack mt={1} spacing={1}>
                              <Icon as={FiPaperclip} fontSize="xs" color="gray.500" />
                              <Text fontSize="xs" color="gray.500">
                                {email.attachments.length} {email.attachments.length === 1 ? 'attachment' : 'attachments'}
                              </Text>
                            </HStack>
                          )}
                        </Box>
                      </HStack>
                      
                      <Box textAlign="right" minW="100px">
                        <Flex justify="flex-end" align="center">
                          <Text fontSize="sm" color={secondaryTextColor} mr={2}>
                            {formatDate(email.timestamp)}
                          </Text>
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              icon={<FiMoreVertical />}
                              variant="ghost"
                              size="sm"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <MenuList>
                              {email.status === 'read' ? (
                                <MenuItem 
                                  icon={<Icon as={FiEyeOff} />} 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsUnread(email._id);
                                  }}
                                >
                                  Mark as unread
                                </MenuItem>
                              ) : (
                                <MenuItem 
                                  icon={<Icon as={FiEye} />} 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(email._id);
                                  }}
                                >
                                  Mark as read
                                </MenuItem>
                              )}
                              <MenuItem 
                                icon={<Icon as={FiStar} color={email.starred ? starColor : undefined} />} 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleStar(email._id, e);
                                }}
                              >
                                {email.starred ? 'Remove star' : 'Add star'}
                              </MenuItem>
                              <MenuItem icon={<Icon as={FiArchive} />}>Archive</MenuItem>
                              <MenuItem icon={<Icon as={FiTrash2} />}>Delete</MenuItem>
                            </MenuList>
                          </Menu>
                        </Flex>
                        <Tag 
                          size="sm" 
                          mt={2}
                          colorScheme="blue"
                          borderRadius="full"
                        >
                          {email.status}
                        </Tag>
                      </Box>
                    </Flex>
                  </Box>
                ))
              )}
            </VStack>
          )}
        </Box>
      </Box>
      
      {/* Email Detail Modal */}
      {selectedMail && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent borderRadius="xl">
            <ModalHeader borderBottomWidth="1px" borderColor={borderColor}>
              <Flex justify="space-between" align="center">
                <Text>{selectedMail.subject}</Text>
                <IconButton
                  aria-label={selectedMail.starred ? "Unstar message" : "Star message"}
                  icon={<Icon as={FiStar} />}
                  size="sm"
                  variant="ghost"
                  color={selectedMail.starred ? starColor : "gray.400"}
                  _hover={{ color: starHoverColor, bg: "transparent" }}
                  onClick={(e) => toggleStar(selectedMail._id, e)}
                />
              </Flex>
              <Flex align="center" mt={1}>
                <Tag 
                  size="sm" 
                  colorScheme="blue"
                  borderRadius="full"
                  mr={2}
                >
                  {selectedMail.status}
                </Tag>
                <Text fontSize="sm" color={secondaryTextColor}>
                  {formatDate(selectedMail.timestamp)}
                </Text>
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            
            <ModalBody pt={4}>
              <Flex align="flex-start" mb={6}>
                <Avatar 
                  size="lg" 
                  name={selectedMail.sender} 
                  bgGradient="linear(to-r, blue.400, blue.600)"
                  mr={4}
                />
                <Box>
                  <Text fontWeight="bold" fontSize="lg">{selectedMail.sender}</Text>
                  <Text fontSize="sm" color={secondaryTextColor}>
                    <Icon as={FiCalendar} mr={1} />
                    {formatDate(selectedMail.timestamp)}
                  </Text>
                </Box>
              </Flex>
              
              <Divider mb={6} />
              
              <Text mb={8} fontSize="md" lineHeight="tall">
                {selectedMail.body}
              </Text>
              
              {selectedMail.attachments.length > 0 && (
                <Box
                  p={4}
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  borderRadius="md"
                  mb={4}
                >
                  <Text fontWeight="medium" mb={3}>
                    Attachments ({selectedMail.attachments.length})
                  </Text>
                  <VStack align="stretch" spacing={2}>
                    {selectedMail.attachments.map((attachment) => (
                      <Flex 
                        key={attachment._id}
                        p={3}
                        borderWidth="1px"
                        borderRadius="md"
                        borderColor={borderColor}
                        bg={bgColor}
                        justify="space-between"
                        align="center"
                      >
                        <HStack>
                          <Icon as={FiFileText} color="blue.500" />
                          <Box>
                            <Text>{attachment.filename}</Text>
                            <Text fontSize="xs" color={secondaryTextColor}>
                              {(attachment.size / 1024).toFixed(1)} KB
                            </Text>
                          </Box>
                        </HStack>
                        <Button 
                          size="sm" 
                          leftIcon={<Icon as={FiDownload} />}
                          colorScheme="blue"
                          variant="ghost"
                          as="a"
                          href={attachment.signedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </Button>
                      </Flex>
                    ))}
                  </VStack>
                </Box>
              )}
            </ModalBody>
            
            <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
              <HStack spacing={3}>
                <Button leftIcon={<Icon as={FiArrowRight} />} colorScheme="blue">
                  Reply
                </Button>
                {selectedMail.status === 'read' ? (
                  <Button 
                    leftIcon={<Icon as={FiEyeOff} />} 
                    variant="ghost"
                    onClick={() => markAsUnread(selectedMail._id)}
                  >
                    Mark as unread
                  </Button>
                ) : (
                  <Button 
                    leftIcon={<Icon as={FiEye} />} 
                    variant="ghost"
                    onClick={() => markAsRead(selectedMail._id)}
                  >
                    Mark as read
                  </Button>
                )}
                <Button leftIcon={<Icon as={FiTrash2} />} variant="ghost">
                  Delete
                </Button>
                <Button leftIcon={<Icon as={FiArchive} />} variant="ghost">
                  Archive
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Mailbox;
