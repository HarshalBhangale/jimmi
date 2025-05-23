/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck
import type { ReactNode } from 'react';
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
} from '@chakra-ui/react';
import { 
  FiBell, 
  FiChevronDown, 
  FiSearch, 
  FiUser, 
  FiLogOut, 
} from 'react-icons/fi';
import { Link as RouterLink} from 'react-router-dom';
import { userAtom } from '@/jotai/atoms';   
import { useAtomValue } from 'jotai';

interface NavbarProps {
  children?: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  const user = useAtomValue(userAtom);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const searchBgColor = useColorModeValue('gray.100', 'gray.700');
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.2)');
  
  // Hide search on smaller screens
  const showSearch = useBreakpointValue({ base: false, lg: true });
  const showUserName = useBreakpointValue({ base: false, md: true });

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
        <HStack spacing={{ base: 3, md: 4 }}>
          {children}
          
          {/* Use actual logo.png */}
          <Flex align="center" gap={{ base: 2, md: 3 }}>
            <Image
              src="/logo.png" 
              alt="Buddy"
              h={{ base: "96px", md: "140px" }}
              w="auto"
              objectFit="contain"
            />
          </Flex>
        </HStack>
        
        {/* Center Section - Search */}
        {showSearch && (
          <Box maxW="400px" w="full" mx={{ base: 4, md: 6 }}>
            <InputGroup size="md">
              <InputLeftElement pointerEvents="none">
                <FiSearch color={useColorModeValue('gray.400', 'gray.500')} />
              </InputLeftElement>
              <Input 
                placeholder="Search for claims, lenders..." 
                bg={searchBgColor} 
                border="none"
                _placeholder={{ color: 'gray.400' }}
                _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
                transition="all 0.2s"
                borderRadius="full"
              />
            </InputGroup>
          </Box>
        )}

        {/* Right Section - Actions */}
        <HStack spacing={{ base: 2, md: 4 }}>
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