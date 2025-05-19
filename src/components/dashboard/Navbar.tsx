/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
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
  useColorMode,
  HStack,
  Tooltip,
  Image,
  InputGroup,
  Input,
  InputLeftElement,
  MenuGroup,
  useBreakpointValue,
} from '@chakra-ui/react';
import { 
  FiMoon, 
  FiSun, 
  FiBell, 
  FiChevronDown, 
  FiSearch, 
  FiUser, 
  FiSettings, 
  FiLogOut, 
  FiHelpCircle,
} from 'react-icons/fi';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { userAtom } from '@/jotai/atoms';   
import { useAtomValue } from 'jotai';

interface NavbarProps {
  children?: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === 'light';
  const user = useAtomValue(userAtom);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const searchBgColor = useColorModeValue('gray.100', 'gray.700');
  
  // Hide search on mobile
  const showSearch = useBreakpointValue({ base: false, md: true });

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="10"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
    >
      <Flex 
        alignItems="center" 
        justify="space-between" 
        h={{ base: "60px", md: "70px" }}
        px={{ base: 4, md: 6 }}
      >
        <HStack spacing={{ base: 2, md: 4 }}>
          {children}
          <Image
            src="/logo.png" 
            alt="JIMMI"
            h={{ base: "30px", md: "40px" }}
          />
        </HStack>
        
        {showSearch && (
          <Box maxW="400px" w="full" mx={6}>
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

        <HStack spacing={{ base: 2, md: 4 }}>
          <Tooltip label={`Switch to ${isLight ? 'dark' : 'light'} mode`}>
            <IconButton
              aria-label="Toggle color mode"
              icon={isLight ? <FiMoon /> : <FiSun />}
              onClick={toggleColorMode}
              variant="ghost"
              color={useColorModeValue('gray.600', 'gray.300')}
              size={{ base: "sm", md: "md" }}
            />
          </Tooltip>

          <Tooltip label="Notifications">
            <IconButton
              aria-label="Notifications"
              icon={<FiBell />}
              variant="ghost"
              color={useColorModeValue('gray.600', 'gray.300')}
              size={{ base: "sm", md: "md" }}
            />
          </Tooltip>

          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<FiChevronDown />}
              variant="ghost"
              size={{ base: "sm", md: "md" }}
              px={{ base: 1, md: 2 }}
            >
              <HStack spacing={2}>
                <Avatar
                  size="sm"
                  name={user?.firstName + ' ' + user?.lastName}
                  background="blue.500"
                  color="white"
                />
                <Text display={{ base: 'none', md: 'block' }}>{user?.firstName + ' ' + user?.lastName}</Text>
              </HStack>
            </MenuButton>
            <MenuList zIndex={11} minW="220px">
              <Box px={3} pt={1} pb={2}>
                <Text fontWeight="medium">{user?.firstName + ' ' + user?.lastName}</Text>
                <Text fontSize="sm" color="gray.500">{user?.email}</Text>
              </Box>
              <MenuDivider />
              <MenuGroup title="Profile">
                <MenuItem as={RouterLink} to="/dashboard/profile" icon={<FiUser fontSize="14px" />}>
                  My Profile
                </MenuItem>
                <MenuItem as={RouterLink} to="/dashboard/settings" icon={<FiSettings fontSize="14px" />}>
                  Settings
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Support">
                <MenuItem as={RouterLink} to="/dashboard/help" icon={<FiHelpCircle fontSize="14px" />}>
                  Help Center
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem 
                as={RouterLink} 
                to="/" 
                icon={<FiLogOut fontSize="14px" />}
                color="red.500"
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