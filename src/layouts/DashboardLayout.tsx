import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

import Sidebar from '../components/dashboard/Sidebar';
import Navbar from '../components/dashboard/Navbar';

const DashboardLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sidebarWidth] = useState(260);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  
  // Use responsive behavior based on screen size
  const isMobile = useBreakpointValue({ base: true, md: false });
  const displaySidebar = useBreakpointValue({ base: 'none', md: 'block' });

  return (
    <Flex direction="column" h="100vh" overflow="hidden">
      {/* Top Navbar - Full Width */}
      <Navbar>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          aria-label="Open menu"
          icon={<FiMenu />}
          onClick={onOpen}
          variant="ghost"
          size="lg"
        />
      </Navbar>

      {/* Content Area with Sidebar */}
      <Flex flex="1" overflow="hidden">
        {/* Desktop Sidebar */}
        <Box
          display={displaySidebar}
          w={`${sidebarWidth}px`}
          h="100%"
          position="relative"
          bg={useColorModeValue('white', 'gray.800')}
        >
          <Sidebar />
        </Box>

        {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent maxW={`${sidebarWidth}px`}>
          <DrawerCloseButton 
            color={useColorModeValue('gray.600', 'gray.400')} 
            size="lg" 
            mt={1} 
          />
          <DrawerBody p={0}>
            <Sidebar onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

        {/* Main Content */}
        <Box
          flex="1"
          bg={bgColor}
          overflowY="auto"
          w={isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`}
        >
          {/* Page Content */}
          <Box 
            as="main" 
            p={{ base: 3, md: 4 }}
          >
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout; 