import { NavLink, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Icon,
  VStack,
  useColorModeValue,
  Divider,
  Button,
  HStack,
  Avatar,
} from '@chakra-ui/react';
import {
  FiHome,
  FiUser,
  FiLogOut,
  FiHelpCircle,
  FiAlertCircle,
  FiMail,
} from 'react-icons/fi';
import { userAtom } from '@/jotai/atoms';
import { useAtomValue } from 'jotai';

interface SidebarItemProps {
  icon: React.ElementType;
  children: string;
  to: string;
  activeColor?: string;
  onClose?: () => void;
  badge?: number | string;
}

interface SidebarProps {
  onClose?: () => void;
}

const SidebarItem = ({ icon, children, to, activeColor, onClose, badge }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = to === '/dashboard' 
    ? location.pathname === '/dashboard'
    : location.pathname === to || location.pathname.startsWith(to + '/');
  const defaultActiveColor = useColorModeValue('blue.500', 'blue.300');
  const color = activeColor || defaultActiveColor;
  const bgColor = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <NavLink 
      to={to} 
      style={{ width: '100%' }}
      onClick={() => {
        if (onClose) onClose();
      }}
    >
      <Flex
        align="center"
        p={3}
        borderRadius="md"
        role="group"
        cursor="pointer"
        bg={isActive ? bgColor : 'transparent'}
        color={isActive ? color : useColorModeValue('gray.600', 'gray.400')}
        fontWeight={isActive ? 'medium' : 'normal'}
        _hover={{
          bg: hoverBg,
          color: color,
        }}
        transition="all 0.2s"
        boxShadow={isActive ? 'sm' : 'none'}
        borderLeft={isActive ? `4px solid ${color}` : 'none'}
        pl={isActive ? 3 : 4}
        >
        <Icon
          mr={4}
          fontSize="20px"
          as={icon}
          color="inherit"
        />
        <Text fontSize="md">{children}</Text>
        
        {badge && (
          <Text 
            ml="auto" 
            fontWeight="medium"
            fontSize="xs"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            {badge}
          </Text>
        )}
      </Flex>
    </NavLink>
  );
};

const Sidebar = ({ onClose }: SidebarProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const user = useAtomValue(userAtom);

  return (
    <Flex
      direction="column"
      w="full"
      h="full"
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
    >
      {/* Main Content */}
      <Box flex="1" overflowY="auto" pt={6}>
        {/* User Profile */}
        <VStack spacing={3} align="center" mb={6}>
          <Avatar
            size="lg"
            name={user?.firstName + ' ' + user?.lastName}
            background="blue.500"
            color="white"
          />
          <Text fontWeight="medium">{user?.firstName + ' ' + user?.lastName}</Text>
        </VStack>

        <Divider mb={6} borderColor={borderColor} />

        {/* Navigation Links */}
        <VStack spacing={1} align="stretch" px={3} mb={6} >
          <SidebarItem icon={FiHome} to="/dashboard" onClose={onClose}>
            Dashboard
          </SidebarItem>
          
          <SidebarItem icon={FiMail} to="/dashboard/mailbox" onClose={onClose}>
            Jimmi Mailbox
          </SidebarItem>

          <SidebarItem icon={FiUser} to="/dashboard/profile" onClose={onClose}>
            My Profile
          </SidebarItem>

          <SidebarItem icon={FiHelpCircle} to="/dashboard/help" onClose={onClose}>
            Help Center
          </SidebarItem>
        </VStack>
      </Box>

      {/* Bottom Section */}
      <Box 
        borderTop="1px" 
        borderColor={borderColor}
        p={4}
        bg={useColorModeValue('white.50', 'gray.800')}
      >
        {/* Support Box */}
        <Box 
          mb={4} 
          p={4} 
          borderRadius="md" 
          bg={useColorModeValue('blue.50', 'blue.900')}
        >
          <HStack spacing={3} mb={2}>
            <Icon as={FiAlertCircle} color="blue.500" boxSize={5} />
            <Text fontWeight="medium" fontSize="sm">Need Help?</Text>
          </HStack>
          <Text fontSize="xs" mb={3}>
            Our support team is available 24/7 to assist you.
          </Text>
          <Button size="sm" colorScheme="blue" width="full">
            Contact Support
          </Button>
        </Box>

        {/* Logout Button */}
        <Button
          leftIcon={<FiLogOut />}
          variant="ghost"
          w="full"
          justifyContent="flex-start"
          colorScheme="red"
          border="1px"
          borderColor="black.500"
          borderRadius="md"
          onClick={() => {
            if (onClose) onClose();
            // Implement logout functionality
          }}
        >
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default Sidebar;