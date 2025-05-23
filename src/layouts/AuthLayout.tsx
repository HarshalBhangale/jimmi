import { Box, Flex, Image, useColorModeValue, Button } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userAtom } from '@/jotai/atoms';
import { useAtomValue, useAtom } from 'jotai';
import { isAuthenticatedAtom } from '@/jotai/atoms';
import { useSearchParams } from 'react-router-dom';

const AuthLayout = () => {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const currentPath = useLocation().pathname;

  useEffect(() => {
    if (!isAuthenticated) {
      if (currentPath === "/auth/login") {
        return;
      } else {
        navigate('/auth/signup/step-1');
      }
    } else {
       if (user.userStatus==="Paid"){
        navigate('/dashboard');
      }
      else if (user.stage === "lenders") {
        navigate('/auth/signup/step-4');
      } else if (user.stage === "profile") {
        navigate('/auth/signup/step-5');
      } else if (user.stage === "identity") {
        navigate('/auth/signup/step-6');
      } else {
        navigate('/auth/signup/step-3');
      }
    }
  }, []);
  
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const refBy = searchParams.get('refBy');
    if (refBy) {
      localStorage.setItem('refBy', refBy);
    }
  }, [searchParams]);
  return (
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
            size="sm"  // Changed from "md" to "sm"
            borderRadius="md"
            px={3}     // Reduced padding
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
          alignItems="flex-start" // Changed from "center" to push content to the top
          justifyContent="center"
          pt={12} // Add padding top instead of relying on vertical centering
        >
          <Box w="100%" maxW={{ base: "480px", lg: "1200px" }} >
            <Outlet />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AuthLayout;