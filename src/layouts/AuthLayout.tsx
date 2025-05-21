import { Box, Flex, Image, useColorModeValue } from '@chakra-ui/react';
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
        navigate('/auth/signup/step-2');
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
            src="/signup-icon.jpg"
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
          <Flex
            position="absolute"
            top={4}
            left={4}
            alignItems="center"
            color={useColorModeValue('gray.600', 'gray.400')}
            _hover={{ color: useColorModeValue('blue.500', 'blue.300') }}
          >
            <FaChevronLeft />
            <Box ml={2}>Back to Home</Box>
          </Flex>
        </Link>
        <Flex
          h="100%"
          w="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Box w="100%" maxW="480px">
            <Outlet />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AuthLayout; 