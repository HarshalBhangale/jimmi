/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck
import type { ReactNode } from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  HStack,
  Tooltip,
  Image,
  InputGroup,
  Input,
  InputLeftElement,
  MenuGroup,
  useBreakpointValue,
  Badge,
  VStack,
  Icon,
  useDisclosure,
  Portal,
  Divider,
} from '@chakra-ui/react';
import { 
  FiBell, 
  FiChevronDown, 
  FiSearch, 
  FiUser, 
  FiLogOut,
  FiFileText,
  FiActivity,
} from 'react-icons/fi';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { userAtom } from '@/jotai/atoms';   
import { useAtomValue } from 'jotai';
import { getClaims } from '@/api/services/claims';

interface NavbarProps {
  children?: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const searchBgColor = useColorModeValue('gray.100', 'gray.700');
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.2)');
  const dropdownBg = useColorModeValue('white', 'gray.800');
  const dropdownBorder = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  
  // Show search on all screens but adjust style
  const showSearch = useBreakpointValue({ base: true, lg: true });
  const showUserName = useBreakpointValue({ base: false, md: true });
  const isMobile = useBreakpointValue({ base: true, lg: false });

  // Search functionality
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      console.log('Searching for:', query); // Debug log
      
      // Get user's lenders data
      const claimsData = await getClaims();
      console.log('Claims data:', claimsData); // Debug log
      
      if (claimsData?.data && Array.isArray(claimsData.data)) {
        // Filter lenders based on search query
        const filteredLenders = claimsData.data.filter((lenderData: any) => {
          const lenderName = lenderData.lender?.name?.toLowerCase() || '';
          const searchTerm = query.toLowerCase();
          
          // Search in lender name or agreement numbers
          const matchesLender = lenderName.includes(searchTerm);
          const matchesAgreement = lenderData.claims?.some((claim: any) => 
            claim.agreement?.agreementNumber?.toLowerCase().includes(searchTerm) ||
            claim.agreement?.carRegistration?.toLowerCase().includes(searchTerm)
          ) || false;
          
          return matchesLender || matchesAgreement;
        });

        console.log('Filtered lenders:', filteredLenders); // Debug log

        // Transform results for display
        const results = filteredLenders.map((lenderData: any) => ({
          id: lenderData.lender.id,
          name: lenderData.lender.name,
          type: 'lender',
          agreementsCount: lenderData.claims?.length || 0,
          status: lenderData.claims?.length > 0 ? 'Active' : 'Document Requested',
          lastUpdated: lenderData.claims?.[0]?.updatedAt || lenderData.claims?.[0]?.createdAt
        }));

        console.log('Search results:', results); // Debug log
        setSearchResults(results);
      } else {
        console.log('No claims data or invalid format'); // Debug log
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle search result click
  const handleResultClick = (result: any) => {
    if (result.type === 'lender') {
      navigate(`/dashboard/lenders/${result.id}`);
      setIsSearchFocused(false);
      setSearchQuery('');
      searchInputRef.current?.blur();
    }
  };

  // Handle escape key to close search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchFocused(false);
        searchInputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = searchInputRef.current?.parentElement?.parentElement;
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    if (isSearchFocused) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSearchFocused]);

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="100"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      boxShadow={`0 1px 3px ${shadowColor}`}
    >
      <Flex 
        alignItems="center" 
        justify="space-between" 
        h={{ base: "64px", md: "70px" }}
        px={{ base: 4, md: 6, lg: 8 }}
        maxW="100vw"
      >
        {/* Left Section - Logo */}
        <HStack spacing={{ base: 2, md: 4 }} flex="0 0 auto">
          {children}
          
          {/* Use actual logo.png */}
          <Flex align="center" gap={{ base: 1, md: 3 }}>
            <Image
              src="/logo.png" 
              alt="Buddy"
              h={{ base: "60px", md: "96px", lg: "140px" }}
              w="auto"
              objectFit="contain"
            />
          </Flex>
        </HStack>
        
        {/* Center Section - Search */}
        {showSearch && (
          <Box 
            maxW={{ base: "200px", md: "300px", lg: "400px" }} 
            w="full" 
            mx={{ base: 2, md: 4, lg: 6 }} 
            position="relative"
          >
            <InputGroup size={{ base: "sm", md: "md" }}>
              <InputLeftElement pointerEvents="none">
                <FiSearch color={useColorModeValue('gray.400', 'gray.500')} />
              </InputLeftElement>
              <Input 
                ref={searchInputRef}
                placeholder={isMobile ? "Search..." : "Search lenders, agreements..."} 
                bg={searchBgColor} 
                border="none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                _placeholder={{ color: 'gray.400' }}
                _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
                _focus={{ 
                  bg: useColorModeValue('white', 'gray.700'),
                  boxShadow: '0 0 0 1px #3182ce',
                  borderColor: 'blue.500'
                }}
                transition="all 0.2s"
                borderRadius="full"
                fontSize={{ base: "sm", md: "md" }}
              />
            </InputGroup>
            
            {/* Search Results Dropdown */}
            {isSearchFocused && (
              <Box
                position="absolute"
                top="100%"
                left="0"
                right="0"
                mt={2}
                bg={dropdownBg}
                border="1px solid"
                borderColor={dropdownBorder}
                borderRadius="lg"
                boxShadow="xl"
                zIndex={1000}
                maxH="400px"
                overflowY="auto"
                minW={{ base: "280px", md: "350px", lg: "400px" }}
                maxW={{ base: "90vw", md: "400px" }}
              >
                  {isSearching ? (
                    <Flex align="center" justify="center" p={4}>
                      <Flex align="center" gap={2}>
                        <Box
                          w="4"
                          h="4"
                          border="2px solid"
                          borderColor="blue.200"
                          borderTopColor="blue.500"
                          borderRadius="50%"
                          animation="spin 1s linear infinite"
                        />
                        <Text fontSize="sm" color="gray.500">Searching...</Text>
                      </Flex>
                    </Flex>
                  ) : searchResults.length > 0 ? (
                    <VStack spacing={0} align="stretch">
                      <Box p={3} borderBottom="1px solid" borderColor={borderColor}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.600">
                          Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                        </Text>
                      </Box>
                      {searchResults.map((result, index) => (
                        <Flex
                          key={result.id}
                          p={4}
                          align="center"
                          gap={3}
                          cursor="pointer"
                          _hover={{ bg: hoverBg }}
                          onClick={() => handleResultClick(result)}
                          borderBottom={index < searchResults.length - 1 ? "1px solid" : "none"}
                          borderColor={borderColor}
                        >
                          <Box
                            w="8"
                            h="8"
                            bg="blue.100"
                            color="blue.600"
                            borderRadius="md"
                            display="flex"
                            align="center"
                            justify="center"
                          >
                            <Icon as={FiUser} boxSize="4" />
                          </Box>
                          <VStack align="start" spacing={1} flex="1">
                            <Text fontWeight="medium" fontSize="sm">
                              {result.name}
                            </Text>
                            <HStack spacing={2}>
                              <Badge size="sm" colorScheme="blue">
                                {result.agreementsCount} agreement{result.agreementsCount !== 1 ? 's' : ''}
                              </Badge>
                              <Text fontSize="xs" color="gray.500">
                                {result.status}
                              </Text>
                            </HStack>
                          </VStack>
                          <Icon as={FiActivity} color="gray.400" boxSize="4" />
                        </Flex>
                      ))}
                    </VStack>
                  ) : searchQuery.trim() ? (
                    <Flex align="center" justify="center" p={6}>
                      <VStack spacing={2}>
                        <Icon as={FiFileText} boxSize="8" color="gray.300" />
                        <Text fontSize="sm" color="gray.500">
                          No results found for "{searchQuery}"
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                          Try searching for lender names or agreement numbers
                        </Text>
                      </VStack>
                    </Flex>
                  ) : (
                    <Flex align="center" justify="center" p={6}>
                      <VStack spacing={2}>
                        <Icon as={FiSearch} boxSize="8" color="gray.300" />
                        <Text fontSize="sm" color="gray.500">
                          Start typing to search lenders
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                          Search by lender name, agreement number, or car registration
                        </Text>
                      </VStack>
                    </Flex>
                  )}
                </Box>
            )}
          </Box>
        )}

        {/* Right Section - Actions */}
        <HStack spacing={{ base: 1, md: 4 }} flex="0 0 auto">
          {/* Notifications */}
          <Tooltip label="Notifications">
            <IconButton
              aria-label="Notifications"
              icon={<FiBell />}
              variant="ghost"
              color={useColorModeValue('gray.600', 'gray.300')}
              size={{ base: "sm", md: "md" }}
            />
          </Tooltip>

            {/* User Menu */}
            <Menu placement="bottom-end">
            <MenuButton
              as={Button}
              rightIcon={<FiChevronDown />}
              variant="ghost"
              size={{ base: "sm", md: "md" }}
              px={{ base: 1, md: 2 }}
              _hover={{ bg: 'blue.50' }}
              transition="all 0.2s"
            >
              <HStack spacing={2}>
              <Avatar
                size="sm"
                name={user?.firstName + ' ' + user?.lastName}
                bg="blue.500"
                color="white"
                shadow="md"
                border="2px solid"
                borderColor="blue.200"
              />
              {showUserName && (
                <Text fontWeight="medium">{user?.firstName + ' ' + user?.lastName}</Text>
              )}
              </HStack>
            </MenuButton>
            
            <MenuList 
              zIndex={200} 
              minW="240px"
              bg={bgColor}
              shadow="lg"
              border="1px solid"
              borderColor="blue.100"
              p={2}
            >
              {/* User Info */}
              <Box px={4} py={3} bg="blue.50" rounded="md" mb={2}>
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold">{user?.firstName + ' ' + user?.lastName}</Text>
                <Text fontSize="sm" color="gray.500">{user?.email}</Text>
                <Badge colorScheme="blue" mt={1}>Pro User</Badge>
              </VStack>
              </Box>
              
              {/* Profile Menu */}
              <MenuItem 
              as={RouterLink} 
              to="/dashboard/profile" 
              icon={<FiUser fontSize="16px" />}
              _hover={{ bg: 'blue.50' }}
              rounded="md"
              mb={1}
              >
              My Profile
              </MenuItem>
              
              <MenuDivider />
              
              {/* Logout */}
              <MenuItem 
              as={RouterLink} 
              to="/" 
              icon={<FiLogOut fontSize="16px" />}
              color="red.500"
              _hover={{ bg: 'red.50' }}
              rounded="md"
              >
              Logout
              </MenuItem>
            </MenuList>
            </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;