import { Box, Flex, Image, useColorModeValue, Button } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import ProtectedRoute from './ProtectedRoute';

const AuthLayout = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const refBy = searchParams.get('refBy');
    if (refBy) {
      localStorage.setItem('refBy', refBy);
    }
  }, [searchParams]);

  return (
    <ProtectedRoute>
      <Flex minH="100vh" overflow="hidden">
        {/* Left side - Brand (Fixed) */}
        <Box
          display={{ base: 'none', md: 'flex' }}
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          w="40vw"
          minW="350px"
          maxW="500px"
          bg={useColorModeValue('blue.500', 'blue.600')}
          color="white"
          p={8}
          position="fixed"
          left={0}
          top={0}
          h="100vh"
          zIndex={10}
        >
          <Box textAlign="center" maxW="400px">
            <Image
              src="/jimmi.png"
              alt="My Claim Buddy"
              mx="auto"
              h="320px"
              mb={8}
            />
            <Box fontSize="3xl" fontWeight="bold" mb={6}>
              Your Car Finance Claim Journey Starts Here
            </Box>
            <Box fontSize="lg" opacity={0.9}>
              Take control of your car finance claims without the solicitor fees.
            </Box>
          </Box>
        </Box>

        {/* Right side - Auth Forms */}
        <Box
          w={{ base: '100%', md: '60vw' }}
          ml={{ base: 0, md: '40vw' }}
          p={{ base: 4, md: 12 }}
          position="relative"
          minH="100vh"
        >
          <Link to="/">
            <Button
              position="absolute"
              top={4}
              left={4}
              leftIcon={<FaChevronLeft />}
              variant="ghost"
              color={useColorModeValue('gray.600', 'gray.400')}
              fontWeight="medium"
              size="sm"
              borderRadius="md"
              px={3}
              _hover={{
                bg: useColorModeValue('blue.50', 'blue.900'),
                color: useColorModeValue('blue.600', 'blue.300'),
                transform: 'translateX(-2px)',
                boxShadow: 'sm',
              }}
              transition="all 0.2s"
            >
              Back to Home
            </Button>
          </Link>
          <Flex
            h="100%"
            w="100%"
            alignItems="flex-start"
            justifyContent="center"
            pt={12}
          >
            <Box w="100%" maxW={{ base: "480px", lg: "1200px" }} >
              <Outlet />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </ProtectedRoute>
  );
};

export default AuthLayout;