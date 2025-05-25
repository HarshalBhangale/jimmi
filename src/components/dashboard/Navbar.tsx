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
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.2)');
  const dropdownBg = useColorModeValue('white', 'gray.800');
  const dropdownBorder = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  
  const showUserName = useBreakpointValue({ base: false, md: true });
  const isMobile = useBreakpointValue({ base: true, lg: false });

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
        
        {/* Center Section - Empty space where search was */}
        <Box flex="1" />
        
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