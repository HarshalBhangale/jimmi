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
  
  const testimonials = [
    {
      quote: "My solicitor just stopped replying after a while. This felt so much easier. At least I could see what was going on!",
      name: "Lisa M",
      location: "London",
      avatarColor: "pink",
      rating: 5
    },
    {
      quote: "I'd heard those 'no win no fee' firms can drag things out or take a big cut. This was clear and simple the whole way through.",
      name: "Darren T",
      location: "Liverpool",
      avatarColor: "blue",
      rating: 5
    },
    {
      quote: "One claims company told me I didn't meet their criteria, but I still wanted to try. Glad I found a way to submit it myself.",
      name: "Alisha K",
      location: "Birmingham",
      avatarColor: "purple",
      rating: 5
    },
    {
      quote: "I didn't think I could do this on my own. But once I got started, it all just made sense. Way less stressful than I expected.",
      name: "Craig J",
      location: "Newcastle",
      avatarColor: "green",
      rating: 5
    },
    {
      quote: "It wasn't full of jargon or legal stuff. Just ticked some boxes, uploaded my ID, and followed the steps. Really straightforward.",
      name: "Naomi F",
      location: "Cardiff",
      avatarColor: "teal",
      rating: 5
    },
    {
      quote: "Everything was in one place, I didn't have to chase anyone or wait for updates. Felt good to be doing it myself.",
      name: "Josh B",
      location: "Leeds",
      avatarColor: "orange",
      rating: 5
    }
  ];

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
      
      <Box
        position="absolute"
        bottom="10%"
        left="5%"
        width="250px"
        height="250px"
        borderRadius="full"
        bgGradient="radial(blue.100, transparent 70%)"
        opacity={0.5}
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
          columns={{ base: 1, sm: 2, lg: 3 }} 
          spacing={{ base: 6, md: 8 }}
          mx="auto"
          px={{ base: 4, md: 0 }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              location={testimonial.location}
              avatarColor={testimonial.avatarColor}
              rating={testimonial.rating}
            />
          ))}
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
      height="100%"
    >
      {/* Quote background */}
      <Box
        p={5}
        bg={quoteBg}
        borderRadius="xl"
        boxShadow="sm"
        borderWidth="1px"
        borderColor={quoteBorderColor}
        mb={6}
        position="relative"
        height={{ base: "auto", md: "160px" }}
        display="flex"
        flexDirection="column"
        opacity={0.9}
      >
        {/* Quote icon */}
        <Box position="absolute" top={3} right={3} opacity={0.2}>
          <Icon as={FiMessageSquare} boxSize={5} color={borderColor} />
        </Box>
        
        {/* Stars */}
        <HStack spacing={1} mb={3}>
          {[...Array(rating)].map((_, i) => (
            <Icon key={i} as={FiStar} color="yellow.400" fill="yellow.400" boxSize={4} />
          ))}
        </HStack>
        
        <Text 
          fontSize={{ base: "md", md: "lg" }} 
          fontStyle="italic" 
          mb={3} 
          flexGrow={1} 
          overflowY="auto"
          pr={2}
        >
          "{quote}"
        </Text>
        
        {/* Triangle pointer */}
        <Box
          position="absolute"
          bottom="-10px"
          left="24px"
          width="0"
          height="0"
          borderLeft="10px solid transparent"
          borderRight="10px solid transparent"
          borderTop={`10px solid ${quoteBg}`}
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
          boxShadow="sm"
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