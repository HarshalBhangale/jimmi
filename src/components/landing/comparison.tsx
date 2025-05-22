import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  Icon,
  VStack,
  useColorModeValue,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FiCheck, FiX } from 'react-icons/fi';
import { keyframes } from '@emotion/react';

// Add subtle floating animation
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
`;

interface ComparisonRowProps {
  feature: string;
  jimmi: { check: boolean; text: string };
  solicitors: { check: boolean; text: string };
  index: number;
}

const ComparisonRow: React.FC<ComparisonRowProps> = ({ feature, jimmi, solicitors, index }) => {
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const jimmiIconBg = useColorModeValue('green.50', 'green.900');
  const solicitorIconBg = useColorModeValue('red.50', 'red.900');
  const rowHoverBg = useColorModeValue('blue.50', 'blue.900');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Tr
      borderBottomWidth="1px"
      borderColor={borderColor}
      transition="all 0.3s"
      _hover={{ 
        bg: rowHoverBg,
        transform: 'scale(1.01)',
        boxShadow: 'lg',
      }}
      style={{
        animation: `${float} 3s ease-in-out infinite`,
        animationDelay: `${index * 0.1}s`
      }}
    >
      <Td 
        fontWeight="medium" 
        py={4} 
        fontSize={{ base: "sm", md: "md" }}
        color={textColor}
        pl={{ base: 3, md: 6 }}
      >
        {feature}
      </Td>
      <Td py={4} px={{ base: 2, md: 4 }}>
        <Flex 
          align="center" 
          gap={2}
          flexDir={isMobile ? 'column' : 'row'}
          alignItems={isMobile ? 'flex-start' : 'center'}
        >
          <Flex
            w={{ base: "24px", md: "28px" }}
            h={{ base: "24px", md: "28px" }}
            rounded="full"
            bg={jimmi.check ? jimmiIconBg : solicitorIconBg}
            color={jimmi.check ? "green.500" : "red.500"}
            align="center"
            justify="center"
            transition="all 0.3s"
            _hover={{
              transform: 'rotate(360deg) scale(1.1)',
            }}
            boxShadow={jimmi.check ? '0 0 10px rgba(72, 187, 120, 0.3)' : '0 0 10px rgba(245, 101, 101, 0.3)'}
          >
            <Icon as={jimmi.check ? FiCheck : FiX} boxSize={4} />
          </Flex>
          <Text 
            fontSize={{ base: "xs", md: "sm" }} 
            fontWeight="medium"
            color={textColor}
          >
            {jimmi.text}
          </Text>
        </Flex>
      </Td>
      <Td py={4} px={{ base: 2, md: 4 }} pr={{ base: 3, md: 6 }}>
        <Flex 
          align="center" 
          gap={2}
          flexDir={isMobile ? 'column' : 'row'}
          alignItems={isMobile ? 'flex-start' : 'center'}
        >
          <Flex
            w={{ base: "24px", md: "28px" }}
            h={{ base: "24px", md: "28px" }}
            rounded="full"
            bg={solicitors.check ? jimmiIconBg : solicitorIconBg}
            color={solicitors.check ? "green.500" : "red.500"}
            align="center"
            justify="center"
            transition="all 0.3s"
            _hover={{
              transform: 'rotate(360deg) scale(1.1)',
            }}
            boxShadow={solicitors.check ? '0 0 10px rgba(72, 187, 120, 0.3)' : '0 0 10px rgba(245, 101, 101, 0.3)'}
          >
            <Icon as={solicitors.check ? FiCheck : FiX} boxSize={4} />
          </Flex>
          <Text 
            fontSize={{ base: "xs", md: "sm" }} 
            fontWeight="medium"
            color={textColor}
          >
            {solicitors.text}
          </Text>
        </Flex>
      </Td>
    </Tr>
  );
};

const Comparison: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const tableBorderColor = useColorModeValue('gray.200', 'gray.700');
  const tableHeaderBg = useColorModeValue('blue.50', 'blue.900');
  const tableHeaderColor = useColorModeValue('blue.700', 'blue.200');
  const sectionBg = useColorModeValue('gray.50', 'gray.900');
  
  const comparisonData = [
    {
      feature: "Fees",
      jimmi: { check: true, text: "Fixed one-time or monthly" },
      solicitors: { check: false, text: "36% of your refund" }
    },
    {
      feature: "Keep 100% of Refund",
      jimmi: { check: true, text: "Always yours" },
      solicitors: { check: false, text: "Partial refund after fees" }
    },
    {
      feature: "Ease of Use",
      jimmi: { check: true, text: "Simple guided steps" },
      solicitors: { check: false, text: "Complex legal process" }
    },
    {
      feature: "Direct Access",
      jimmi: { check: true, text: "Start in minutes" },
      solicitors: { check: false, text: "Wait for callbacks" }
    },
    {
      feature: "Availability",
      jimmi: { check: true, text: "24/7 support" },
      solicitors: { check: false, text: "Office hours only" }
    },
    {
      feature: "Communication",
      jimmi: { check: true, text: "Direct, from your inbox" },
      solicitors: { check: false, text: "All handled through solicitor" }
    },
    {
      feature: "Transparency",
      jimmi: { check: true, text: "Full visibility" },
      solicitors: { check: false, text: "Limited updates" }
    },
    {
      feature: "Language",
      jimmi: { check: true, text: "Plain English" },
      solicitors: { check: false, text: "Legal jargon" }
    }
  ];
  
  return (
    <Box 
      as="section" 
      py={{ base: 8, md: 16 }} 
      bg={sectionBg}
      id="comparison"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(66, 153, 225, 0.05) 0%, rgba(128, 90, 213, 0.05) 100%)',
        zIndex: 0,
      }}
    >
      <Container 
        maxW="container.xl" 
        position="relative" 
        zIndex={1}
        px={{ base: 4, sm: 6, md: 8 }}
      >
        <VStack spacing={6} textAlign="center" mb={{ base: 8, md: 12 }}>
          <Heading 
            as="h2" 
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            position="relative"
            letterSpacing="tight"
            _after={{
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '50px',
              height: '3px',
              background: 'linear-gradient(to right, #4299E1, #805AD5)',
              borderRadius: 'full',
            }}
          >
            ⚖️ Buddy vs Solicitors: The Honest Comparison
          </Heading>
          <Text 
            fontSize={{ base: "sm", md: "lg" }}
            maxW="2xl"
            color={useColorModeValue('gray.600', 'gray.400')}
            lineHeight="tall"
          >
            See how Buddy transforms your claims experience compared to traditional solicitor services:
          </Text>
        </VStack>

        <Box 
          overflowX="auto" 
          borderRadius={{ base: "lg", md: "2xl" }}
          bg={bgColor}
          borderWidth="1px"
          borderColor={tableBorderColor}
          position="relative"
          transition="all 0.3s"
          transform={{ base: "none", md: "translate(-8px, -8px)" }}
          _hover={{
            transform: { base: "none", md: "translate(-10px, -10px)" },
          }}
          mx={{ base: 2, sm: 4, md: 6 }}
          my={{ base: 4, md: 6 }}
          sx={{
            boxShadow: { base: 'sm', md: '8px 8px 0 0 rgb(0, 176, 225)' },
            '&:hover': {
              boxShadow: { base: 'md', md: '10px 10px 0 0 rgb(17, 235, 144)' },
            },
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(66, 153, 225, 0.5) rgba(226, 232, 240, 0.3)',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(226, 232, 240, 0.3)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(66, 153, 225, 0.5)',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'rgba(66, 153, 225, 0.7)',
              }
            }
          }}
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(to right, #4299E1, #805AD5)',
            borderTopRadius: { base: "lg", md: "2xl" },
          }}
        >
          <Table variant="simple" size={{ base: "sm", md: "md" }} width="100%">
            <Tbody>
              <Tr bg={tableHeaderBg}>
                <Td 
                  fontWeight="bold" 
                  fontSize={{ base: "sm", md: "lg" }}
                  color={tableHeaderColor}
                  borderBottomWidth="2px"
                  borderColor={tableBorderColor}
                  py={{ base: 3, md: 5 }}
                  pl={{ base: 3, md: 6 }}
                  width="30%"
                >
                  Feature
                </Td>
                <Td 
                  fontWeight="bold" 
                  fontSize={{ base: "sm", md: "lg" }}
                  color={tableHeaderColor}
                  borderBottomWidth="2px"
                  borderColor={tableBorderColor}
                  py={{ base: 3, md: 5 }}
                  px={{ base: 2, md: 4 }}
                  width="35%"
                >
                  Jimmi
                </Td>
                <Td 
                  fontWeight="bold" 
                  fontSize={{ base: "sm", md: "lg" }}
                  color={tableHeaderColor}
                  borderBottomWidth="2px"
                  borderColor={tableBorderColor}
                  py={{ base: 3, md: 5 }}
                  px={{ base: 2, md: 4 }}
                  pr={{ base: 3, md: 6 }}
                  width="35%"
                >
                  Traditional Solicitors
                </Td>
              </Tr>
              
              {comparisonData.map((item, index) => (
                <ComparisonRow 
                  key={index} 
                  feature={item.feature} 
                  jimmi={item.jimmi} 
                  solicitors={item.solicitors}
                  index={index}
                />
              ))}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </Box>
  );
};

export default Comparison;