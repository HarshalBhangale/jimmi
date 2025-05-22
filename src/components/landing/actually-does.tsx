import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  FiMessageSquare, 
  FiMail, 
  FiFileText, 
  FiZap,
} from 'react-icons/fi';
import { keyframes } from '@emotion/react';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

interface FeatureProps {
  icon: React.ReactElement;
  title: string;
  text: string;
  delay: string;
}

const Feature = ({ icon, title, text, delay }: FeatureProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      p={8}
      borderRadius="2xl"
      boxShadow="lg"
      position="relative"
      transition="all 0.3s"
      animation={`${float} 3s ease-in-out infinite`}
      transitionDelay={delay}
      _hover={{
        transform: 'translateY(-8px)',
        boxShadow: '2xl',
      }}
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: 'linear-gradient(to right, #4299E1, #805AD5)',
      }}
    >
      <Flex
        mb={6}
        position="relative"
        align="flex-start"
      >
        <Flex
          w={12}
          h={12}
          align="center"
          justify="center"
          rounded="xl"
          bg={useColorModeValue('blue.50', 'blue.900')}
          color={useColorModeValue('blue.600', 'blue.200')}
          fontSize="24px"
          mr={4}
          transition="all 0.3s"
          _groupHover={{
            transform: 'scale(1.1)',
          }}
        >
          {icon}
        </Flex>
        <Heading
          size="md"
          fontWeight="bold"
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
          letterSpacing="tight"
        >
          {title}
        </Heading>
      </Flex>

      <Text
        color={useColorModeValue('gray.600', 'gray.400')}
        fontSize="lg"
        lineHeight="tall"
      >
        {text}
      </Text>
    </Box>
  );
};

const ActuallyDoes: React.FC = () => {
  return (
    <Box 
      as="section" 
      py={20}
      bg={useColorModeValue('gray.50', 'gray.900')}
      position="relative"
      overflow="hidden"
    >
      {/* Background Pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={useColorModeValue(
          'linear-gradient(120deg, rgba(66, 153, 225, 0.05) 0%, rgba(128, 90, 213, 0.05) 100%)',
          'linear-gradient(120deg, rgba(66, 153, 225, 0.03) 0%, rgba(128, 90, 213, 0.03) 100%)'
        )}
        zIndex={0}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={8} textAlign="center" mb={16}>
          <Box position="relative" mb={4}>
            <Heading 
              as="h2" 
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
              letterSpacing="tight"
              mb={4}
            >
              🤖 What Our Buddy Actually Does
            </Heading>
            <Box
              position="absolute"
              bottom="-8px"
              left="50%"
              transform="translateX(-50%)"
              width="60px"
              height="4px"
              bgGradient="linear(to-r, blue.400, purple.500)"
              borderRadius="full"
            />
          </Box>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            maxW="2xl"
            color={useColorModeValue('gray.600', 'gray.400')}
            lineHeight="tall"
          >
            Buddy makes the claims process feel simple, supportive and stress-free.
          </Text>
        </VStack>

        <SimpleGrid 
          columns={{ base: 1, md: 2 }} 
          spacing={{ base: 8, lg: 12 }}
          maxW="1200px"
          mx="auto"
        >
          <Feature
            icon={<Icon as={FiMessageSquare} />}
            title="Step-by-Step Guidance"
            text="From signing a letter to replying to your lender — Buddy walks you through it all like a real assistant."
            delay="0s"
          />
          <Feature
            icon={<Icon as={FiMail} />}
            title="Your Own Inbox"
            text="Every message from the lender goes to your personal Buddy Inbox, with clear actions for what to do next."
            delay="0.1s"
          />
          <Feature
            icon={<Icon as={FiFileText} />}
            title="Auto-Generated Letters"
            text="SARs, complaints, appeals — Buddy writes the right letters at the right time. Just review and send."
            delay="0.2s"
          />
          <Feature
            icon={<Icon as={FiZap} />}
            title="Built-In AI Support"
            text="Don't understand what a lender said? Buddy breaks it down and helps you reply with confidence."
            delay="0.3s"
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ActuallyDoes;
