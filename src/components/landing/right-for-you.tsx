// @ts-nocheck
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  SimpleGrid,
  Flex,
  Icon,
  Button,
  Badge,
  HStack,
} from '@chakra-ui/react';
import { FiArrowRight, FiUsers, FiCalendar, FiDollarSign, FiTool } from 'react-icons/fi';
import type { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Feature Card Props interface
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  accentColor: string;
}

// Feature Card Component
const FeatureCard = ({ icon, title, description, accentColor }: FeatureCardProps): ReactElement => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      p={6}
      borderRadius="lg"
      boxShadow="md"
      borderTop="3px solid"
      borderColor={accentColor}
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "lg",
      }}
    >
      <Flex mb={4} align="center">
        <Flex
          w={12}
          h={12}
          align="center"
          justify="center"
          borderRadius="full"
          bg={`${accentColor}.100`}
          color={`${accentColor}.600`}
          mr={4}
        >
          <Icon as={icon} boxSize={5} />
        </Flex>
        <Heading size="md">{title}</Heading>
      </Flex>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>
        {description}
      </Text>
    </Box>
  );
};

// Right For You Component
const RightForYou = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const highlightBg = useColorModeValue('blue.50', 'blue.900');
  
  return (
    <Box 
      as="section" 
      py={{ base: 14, md: 20 }} 
      id="right-for-you"
      bg={useColorModeValue('gray.50', 'gray.900')}
      position="relative"
    >
      {/* Decorative elements */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        height="10px"
        bgGradient="linear(to-r, blue.400, purple.500)"
      />
      
      <Container maxW="container.xl">
        <VStack spacing={8} textAlign="center" mb={{ base: 8, md: 16 }}>
          <Badge 
            colorScheme="blue" 
            fontSize="sm" 
            px={3} 
            py={1} 
            borderRadius="full"
            mb={3}
          >
            PERFECT MATCH
          </Badge>
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            letterSpacing="tight"
          >
            🙋‍♂️ Is Buddy Right for You?
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }}
            maxW="2xl"
            mx="auto"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            Discover if our approach aligns with your needs and expectations
          </Text>
        </VStack>
        
        {/* Feature cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} mb={14}>
          <FeatureCard
            icon={FiUsers}
            title="For Beginners"
            description="Know you've been overcharged, but don't know where to start? Our guided process makes it simple."
            accentColor="blue"
          />
          
          <FeatureCard
            icon={FiCalendar}
            title="From 2007 Onwards"
            description="Have car finance from 2007 onwards? You may be eligible for a significant refund."
            accentColor="purple"
          />
          
          <FeatureCard
            icon={FiDollarSign}
            title="Keep Your Refund"
            description="Don't want to hand over a third of your refund to claims companies? Keep every penny."
            accentColor="green"
          />
          
          <FeatureCard
            icon={FiTool}
            title="Tools + Guidance"
            description="Prefer tools over lawyers, but still want guidance to get it right? We've got you covered."
            accentColor="orange"
          />
        </SimpleGrid>
        
        {/* CTA Section */}
        <Box 
          bg={highlightBg} 
          p={8} 
          borderRadius="xl" 
          boxShadow="xl"
          maxW="800px"
          mx="auto"
          textAlign="center"
          borderTop="4px solid"
          borderColor="blue.400"
          position="relative"
        >
          <Heading size="md" mb={6}>
            Ready to take control of your car finance claim?
          </Heading>
          
          <HStack spacing={4} justify="center">
            <Button
              as={RouterLink}
              to="/auth/signup/step-1"
              colorScheme="blue"
              size="lg"
              rightIcon={<FiArrowRight />}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              Get Started
            </Button>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

export default RightForYou;