import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Text, Button, Flex, VStack, useColorModeValue} from '@chakra-ui/react';
import { FiHome, FiAlertTriangle } from 'react-icons/fi';
import { keyframes } from '@emotion/react';
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const NotFound = () => {
  const bgGradient = useColorModeValue(
    'linear(to-r, blue.50, purple.50)',
    'linear(to-r, gray.900, purple.900)'
  );

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient={bgGradient}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-10%"
        left="-10%"
        right="-10%"
        bottom="-10%"
        bgGradient="radial(circle, rgba(255,255,255,0.1) 0%, transparent 60%)"
        transform="rotate(-12deg)"
      />
      <VStack
        spacing={8}
        p={12}
        borderRadius="2xl"
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow="2xl"
        maxW="550px"
        w="full"
        textAlign="center"
        position="relative"
        zIndex={1}
      >
        <Box
          animation={`${pulse} 2s infinite ease-in-out`}
          color={useColorModeValue('red.500', 'red.300')}
        >
          <FiAlertTriangle size="80px" />
        </Box>
        <Heading
          as="h1"
          size="4xl"
          fontWeight="extrabold"
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
        >
          404
        </Heading>
        <Heading as="h2" size="xl" fontWeight="bold" mb={2}>
          Oops! Page Not Found
        </Heading>
        <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')} maxW="md">
          It seems you've ventured into uncharted territory. The page you're looking for has vanished into the digital void.
        </Text>
        <Button
          as={RouterLink}
          to="/dashboard"
          colorScheme="blue"
          size="lg"
          fontWeight="bold"
          leftIcon={<FiHome />}
          px={8}
          py={6}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          transition="all 0.3s"
        >
          Return Home
        </Button>
      </VStack>
    </Flex>
  );
};

export default NotFound;