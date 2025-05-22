import {
  Box,
  Container,
  Heading,
  VStack,
  SimpleGrid,
  Text,
  HStack,
  Icon,
  Avatar,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { FiMessageSquare, FiStar } from 'react-icons/fi';

// Testimonials Component
const Testimonials = () => {
  const bgGradient = useColorModeValue(
    'linear(to-b, white, gray.50)',
    'linear(to-b, gray.800, gray.900)'
  );
  
  return (
    <Box 
      as="section" 
      py={{ base: 16, md: 24 }} 
      id="testimonials"
      bgGradient={bgGradient}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative elements */}
      <Box
        position="absolute"
        top="10%"
        right="5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bgGradient="radial(purple.100, transparent 70%)"
        opacity={0.6}
        zIndex={0}
      />
      
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={8} textAlign="center" mb={{ base: 12, md: 16 }}>
          <Badge 
            colorScheme="purple" 
            fontSize="md" 
            px={3} 
            py={1} 
            borderRadius="full"
            textTransform="none"
          >
            Success Stories
          </Badge>
          
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            bgGradient="linear(to-r, blue.400, purple.500, pink.400)"
            bgClip="text"
            letterSpacing="tight"
            lineHeight="1.2"
          >
            🗣️ Real People. Real Results.
          </Heading>
          
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            maxW="2xl"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            See what our customers are saying about their experience with Buddy
          </Text>
        </VStack>
        
        <SimpleGrid 
          columns={{ base: 1, md: 2 }} 
          spacing={{ base: 8, md: 12 }} 
          maxW="1000px" 
          mx="auto"
        >
          <TestimonialCard
            quote="I had no clue where to start until Buddy explained it all. I just followed the steps and ended up with over £2,000 back."
            name="Jason M"
            location="Leeds"
            avatarColor="purple"
            rating={5}
          />
          
          <TestimonialCard
            quote="It's like having a legal expert in your pocket… without the bill."
            name="Priya S"
            location="Birmingham"
            avatarColor="blue"
            rating={5}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

// Testimonial Card Component
interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  avatarColor: string;
  rating: number;
}

const TestimonialCard = ({ quote, name, location, avatarColor, rating }: TestimonialCardProps) => {
  const borderColor = useColorModeValue(`${avatarColor}.400`, `${avatarColor}.500`);
  const avatarBg = useColorModeValue(`${avatarColor}.500`, `${avatarColor}.400`);
  const quoteBg = useColorModeValue(`${avatarColor}.50`, `${avatarColor}.900`);
  const quoteBorderColor = useColorModeValue(`${avatarColor}.100`, `${avatarColor}.800`);
  
  return (
    <Box
      position="relative"
      transition="all 0.3s ease"
      _hover={{ transform: 'translateY(-5px)' }}
    >
      {/* Quote background */}
      <Box
        p={6}
        bg={quoteBg}
        borderRadius="2xl"
        boxShadow="lg"
        borderWidth="1px"
        borderColor={quoteBorderColor}
        mb={6}
        position="relative"
      >
        {/* Quote icon */}
        <Box position="absolute" top={4} right={4} opacity={0.3}>
          <Icon as={FiMessageSquare} boxSize={6} color={borderColor} />
        </Box>
        
        {/* Stars */}
        <HStack spacing={1} mb={4}>
          {[...Array(rating)].map((_, i) => (
            <Icon key={i} as={FiStar} color="yellow.400" />
          ))}
        </HStack>
        
        <Text fontSize="lg" fontStyle="italic" mb={4}>
          "{quote}"
        </Text>
        
        {/* Triangle pointer */}
        <Box
          position="absolute"
          bottom="-12px"
          left="24px"
          width="0"
          height="0"
          borderLeft="12px solid transparent"
          borderRight="12px solid transparent"
          borderTop={`12px solid ${quoteBg}`}
          zIndex={1}
        />
      </Box>
      
      {/* Author info */}
      <HStack pl={6}>
        <Avatar 
          bg={avatarBg} 
          color="white" 
          name={name} 
          size="md"
          boxShadow="md"
        />
        <Box>
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            {location}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default Testimonials; 