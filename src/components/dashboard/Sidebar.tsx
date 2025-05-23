import { NavLink, useLocation, useNavigate } from 'react-router-dom';
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
  Badge,
  Tooltip,
} from '@chakra-ui/react';
import {
  FiHome,
  FiUser,
  FiLogOut,
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
  const activeBg = useColorModeValue('blue.50', 'blue.900');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Tooltip label={children} placement="right" isDisabled={true}>
      <NavLink 
        to={to} 
        style={{ width: '100%' }}
        onClick={() => {
          if (onClose) onClose();
        }}
      >
        <Flex
          align="center"
          p={{ base: 3, md: 4 }}
          mx={2}
          borderRadius="xl"
          role="group"
          cursor="pointer"
          bg={isActive ? activeBg : 'transparent'}
          color={isActive ? color : useColorModeValue('gray.600', 'gray.400')}
          fontWeight={isActive ? 'semibold' : 'medium'}
          _hover={{
            bg: isActive ? activeBg : hoverBg,
            color: color,
            transform: 'translateX(4px)',
          }}
          transition="all 0.2s ease"
          boxShadow={isActive ? 'md' : 'none'}
          border="1px solid"
          borderColor={isActive ? 'blue.200' : 'transparent'}
          position="relative"
          overflow="hidden"
          _before={isActive ? {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            bg: color,
            borderRadius: '0 4px 4px 0'
          } : {}}
        >
          <Icon
            mr={4}
            fontSize={{ base: "18px", md: "20px" }}
            as={icon}
            color="inherit"
          />
          <Text fontSize={{ base: "sm", md: "md" }} flex="1">{children}</Text>
          
          {badge && (
            <Badge 
              ml="auto" 
              colorScheme="red"
              variant="solid"
              fontSize="xs"
              borderRadius="full"
              minW="20px"
              h="20px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {badge}
            </Badge>
          )}
        </Flex>
      </NavLink>
    </Tooltip>
  );
};

const Sidebar = ({ onClose }: SidebarProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onClose) onClose();
    // Clear authentication data
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    // Redirect to home page
    navigate('/');
  };

  return (
    <Flex
      direction="column"
      w="full"
      h="full"
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
      position="relative"
    >
      {/* Main Content */}
      <Box flex="1" overflowY="auto" pt={{ base: 4, md: 6 }}>
        {/* Enhanced User Profile */}
        <VStack spacing={4} align="center" mb={8} px={4}>
          <Box position="relative">
            <Avatar
              size={{ base: "lg", md: "xl" }}
              name={user?.firstName + ' ' + user?.lastName}
              bg="blue.500"
              color="white"
              fontWeight="bold"
              border="4px solid"
              borderColor={useColorModeValue('white', 'gray.800')}
              boxShadow="xl"
            />
            <Badge
              position="absolute"
              bottom="0"
              right="0"
              bg="green.500"
              color="white"
              borderRadius="full"
              w="16px"
              h="16px"
              fontSize="xs"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="2px solid"
              borderColor={useColorModeValue('white', 'gray.800')}
            >
              ✓
            </Badge>
          </Box>
          
          <VStack spacing={1} align="center">
            <Text 
              fontWeight="bold" 
              fontSize={{ base: "md", md: "lg" }}
              textAlign="center"
              lineHeight="short"
            >
              {user?.firstName + ' ' + user?.lastName}
            </Text>
            <Text 
              fontSize={{ base: "xs", md: "sm" }} 
              color="gray.500"
              textAlign="center"
            >
              Premium Account
            </Text>
            <Badge 
              colorScheme="green" 
              variant="subtle" 
              fontSize="xs"
              px={3}
              py={1}
              borderRadius="full"
            >
              Active Plan
            </Badge>
          </VStack>
        </VStack>

        <Divider mb={6} borderColor={borderColor} />

        {/* Navigation Links */}
        <VStack spacing={2} align="stretch" px={{ base: 2, md: 3 }} mb={6}>
          <SidebarItem icon={FiHome} to="/dashboard" onClose={onClose}>
            Dashboard
          </SidebarItem>
          
          <SidebarItem icon={FiMail} to="/dashboard/mailbox" onClose={onClose} >
            Buddy Mailbox
          </SidebarItem>

          <SidebarItem icon={FiUser} to="/dashboard/profile" onClose={onClose}>
            My Profile
          </SidebarItem>
        </VStack>
      </Box>

      {/* Enhanced Bottom Section */}
      <Box 
        borderTop="1px" 
        borderColor={borderColor}
        p={{ base: 3, md: 4 }}
        bg={useColorModeValue('gray.50', 'gray.750')}
      >
        {/* Support Box */}
        <Box 
          mb={4} 
          p={{ base: 3, md: 4 }} 
          borderRadius="xl" 
          bgGradient="linear(135deg, blue.50, purple.50)"
          border="1px solid"
          borderColor="blue.200"
          position="relative"
          overflow="hidden"
        >
          <Box position="relative" zIndex={1}>
        <HStack spacing={3} mb={3}>
          <Icon 
            as={FiAlertCircle} 
            color="blue.500" 
            boxSize={{ base: 4, md: 5 }} 
          />
          <Text 
            fontWeight="semibold" 
            fontSize={{ base: "sm", md: "md" }}
            color="blue.700"
          >
            Need Help?
          </Text>
        </HStack>
        <Text 
          fontSize={{ base: "xs", md: "sm" }} 
          mb={3}
          color="blue.600"
          lineHeight="short"
        >
          Our support team is available 24/7 to assist you with your claims.
        </Text>
        <Button 
          size={{ base: "sm", md: "md" }} 
          colorScheme="blue" 
          width="full"
          borderRadius="lg"
          fontWeight="semibold"
          _hover={{ transform: 'translateY(-1px)', boxShadow: 'lg' }}
          transition="all 0.2s ease"
          onClick={() => {
            window.location.href = `mailto:support@myclaimbuddy.co.uk?subject=Support Request&body=Hello, I need assistance with my claim.`;
          }}
        >
          Contact Support
        </Button>
          </Box>
        </Box>

        {/* Enhanced Logout Button */}
        <Button
          leftIcon={<FiLogOut />}
          variant="outline"
          w="full"
          justifyContent="flex-start"
          colorScheme="red"
          borderColor="red.200"
          borderRadius="xl"
          py={{ base: 2, md: 3 }}
          h={{ base: "40px", md: "48px" }}
          fontWeight="semibold"
          _hover={{ 
            bg: 'red.50', 
            borderColor: 'red.300',
            transform: 'translateY(-1px)',
            boxShadow: 'md'
          }}
          transition="all 0.2s ease"
          onClick={handleLogout}
        >
          <Text fontSize={{ base: "sm", md: "md" }}>Sign Out</Text>
        </Button>
      </Box>
    </Flex>
  );
};

export default Sidebar;