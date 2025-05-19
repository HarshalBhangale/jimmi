import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { 
  FiSearch, 
  FiEdit, 
  FiInbox, 
  FiHelpCircle, 
  FiUsers
} from 'react-icons/fi';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

interface ToolItemProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  index: number;
}

const ToolItem: React.FC<ToolItemProps> = ({ icon, title, description, index }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const iconBg = useColorModeValue('purple.50', 'purple.900');
  const iconColor = useColorModeValue('purple.500', 'purple.300');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const descriptionColor = useColorModeValue('gray.600', 'gray.400');
  const shadowColor = useColorModeValue('rgba(128, 90, 213, 0.15)', 'rgba(128, 90, 213, 0.1)');
  const borderColor = useColorModeValue('purple.200', 'purple.700');

  return (
    <Box
      position="relative"
      p={6}
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      transform="translateY(0)"
      _hover={{
        transform: 'translateY(-12px)',
      }}
      style={{
        transitionDelay: `${index * 0.1}s`
      }}
    >
      <Box
        bg={bgColor}
        p={{ base: 6, md: 8 }}
        borderRadius="2xl"
        position="relative"
        overflow="hidden"
        boxShadow={`0px 8px 32px ${shadowColor}`}
        border="1px solid"
        borderColor={borderColor}
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '2xl',
          padding: '1px',
          background: 'linear-gradient(130deg, purple.400, blue.400)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        _hover={{
          boxShadow: `0px 12px 40px ${shadowColor}`,
        }}
      >
        <Box
          bg={iconBg}
          w="64px"
          h="64px"
          borderRadius="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb={6}
          position="relative"
          _after={{
            content: '""',
            position: 'absolute',
            inset: '-4px',
            borderRadius: '24px',
            background: 'linear-gradient(45deg, purple.400, blue.400)',
            opacity: 0.2,
            zIndex: -1,
          }}
        >
          <Box 
            color={iconColor} 
            fontSize="28px"
            transition="all 0.3s"
            animation={`${float} 3s ease-in-out infinite`}
            style={{
              animationDelay: `${index * 0.2}s`
            }}
          >
            {icon}
          </Box>
        </Box>

        <Heading 
          as="h3"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="700"
          mb={3}
          color={textColor}
          letterSpacing="tight"
          bgGradient="linear(to-r, purple.400, blue.400)"
          bgClip="text"
        >
          {title}
        </Heading>

        <Text 
          color={descriptionColor}
          fontSize={{ base: "md", md: "lg" }}
          lineHeight="tall"
        >
          {description}
        </Text>
      </Box>
    </Box>
  );
};

const Tools: React.FC = () => {
  const bgGradient = useColorModeValue(
    'linear-gradient(180deg, rgba(237, 242, 247, 0.5) 0%, #FFFFFF 100%)',
    'linear-gradient(180deg, rgba(45, 55, 72, 0.5) 0%, #1A202C 100%)'
  );

  return (
    <Box 
      as="section" 
      py={{ base: 20, md: 32 }}
      id="tools"
      position="relative"
      overflow="hidden"
      bg={bgGradient}
    >
      <Container maxW="container.xl" position="relative">
        <VStack spacing={10} textAlign="center" mb={{ base: 16, md: 20 }}>
          <Heading 
            as="h2" 
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, purple.400, blue.500)"
            bgClip="text"
            letterSpacing="tight"
            position="relative"
            _after={{
              content: '""',
              display: 'block',
              width: '80px',
              height: '4px',
              background: 'linear-gradient(to right, #805AD5, #4299E1)',
              borderRadius: 'full',
              margin: '20px auto 0',
            }}
          >
            🧰 Tools That Put You in Control
          </Heading>
          <Text 
            fontSize={{ base: "xl", md: "2xl" }}
            maxW="3xl"
            color={useColorModeValue('gray.600', 'gray.400')}
            lineHeight="tall"
          >
            Everything you need to manage your claims with confidence
          </Text>
        </VStack>

        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 3 }} 
          spacing={{ base: 10, lg: 14 }}
          maxW="1200px"
          mx="auto"
        >
          <ToolItem
            icon={<Icon as={FiSearch} boxSize={8} />}
            title="Claim Tracker"
            description="See where you are at every stage of your claim process, with clear next steps and timelines."
            index={0}
          />
          <ToolItem
            icon={<Icon as={FiEdit} boxSize={8} />}
            title="One-Click Letters"
            description="Pre-written, compliant templates and responses that save you time to ensure accuracy."
            index={1}
          />
          <ToolItem
            icon={<Icon as={FiInbox} boxSize={8} />}
            title="Smart Inbox"
            description="Manage all lender replies in one place with clear actions on what to do next."
            index={2}
          />
          <ToolItem
            icon={<Icon as={FiHelpCircle} boxSize={8} />}
            title="Built-In Assistant"
            description="Understand lender replies and act confidently with AI-powered clarification and guidance."
            index={3}
          />
          <ToolItem
            icon={<Icon as={FiUsers} boxSize={8} />}
            title="Referral Rewards"
            description="Help others, get rewarded. Share your success and earn while supporting friends."
            index={4}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Tools;