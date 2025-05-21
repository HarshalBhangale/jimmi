import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Progress,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  Divider,
  Collapse,
  IconButton,
  SimpleGrid,
  useDisclosure,
  Flex,
  Badge,
  List,
  ListItem,
  useOutsideClick,
  Spinner,
} from '@chakra-ui/react';
import { FiArrowRight, FiPlus, FiTrash2, FiSearch } from 'react-icons/fi';
import type { IAddress, IPreviousName, IUser } from '@/api/services/profile';
import { updateProfile, getAddressSuggestions, getAddressDetails } from '@/api/services/profile';
import { userAtom } from '@/jotai/atoms';
import { useAtomValue } from 'jotai';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  address1?: string;
  city?: string;
  postcode?: string;
}

type SafeUser = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  address: IAddress;
  previousNames: IPreviousName[];
  previousAddresses: IAddress[];
};

const sanitizeUser = (user?: IUser): SafeUser => ({
  firstName: user?.firstName ?? '',
  lastName: user?.lastName ?? '',
  email: user?.email ?? '',
  dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
  address: {
    address1: user?.address?.address1 ?? '',
    address2: user?.address?.address2 ?? '',
    city: user?.address?.city ?? '',  
    postcode: user?.address?.postcode ?? '',
  },
  previousNames: user?.previousNames ?? [],
  previousAddresses: user?.previousAddresses ?? [],
});

const Step4 = () => {
  const user = useAtomValue(userAtom);
  console.log(user,"user");
  const [profile, setProfile] = useState<SafeUser>(() => sanitizeUser(user));
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    isOpen: isOpenPreviousNames,
    onToggle: onTogglePreviousNames
  } = useDisclosure();

  const {
    isOpen: isOpenPreviousAddresses,
    onToggle: onTogglePreviousAddresses
  } = useDisclosure();

  const [addressSuggestions, setAddressSuggestions] = useState<Array<{ address: string; id: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  useOutsideClick({
    ref: suggestionsRef,
    handler: () => setShowSuggestions(false),
  });

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateUKPostcode = (postcode: string) =>
    /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i.test(postcode);
  const validateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const handleProfileChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.') as [keyof SafeUser, keyof IAddress];
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent] as IAddress),
          [child]: value,
        },
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleAddPreviousName = () => {
    setProfile(prev => ({
      ...prev,
      previousNames: [...prev.previousNames, { firstName: '', lastName: '' }]
    }));
  };

  const handleUpdatePreviousName = (index: number, field: keyof IPreviousName, value: string) => {
    setProfile(prev => ({
      ...prev,
      previousNames: prev.previousNames.map((name, i) =>
        i === index ? { ...name, [field]: value } : name
      )
    }));
  };

  const handleRemovePreviousName = (index: number) => {
    setProfile(prev => ({
      ...prev,
      previousNames: prev.previousNames.filter((_, i) => i !== index)
    }));
  };

  const handleAddPreviousAddress = () => {
    setProfile(prev => ({
      ...prev,
      previousAddresses: [...prev.previousAddresses, {
        address1: '',
        address2: '',
        city: '',
        postcode: ''
      }]
    }));
  };

  const handleUpdatePreviousAddress = (index: number, field: keyof IAddress, value: string) => {
    setProfile(prev => ({
      ...prev,
      previousAddresses: prev.previousAddresses.map((address, i) =>
        i === index ? { ...address, [field]: value } : address
      )
    }));
  };

  const handleRemovePreviousAddress = (index: number) => {
    setProfile(prev => ({
      ...prev,
      previousAddresses: prev.previousAddresses.filter((_, i) => i !== index)
    }));
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
  };

  const handleAddressInput = async (value: string) => {
    handleProfileChange('address.address1', value);
    if (value.length > 2) {
      setIsLoadingAddress(true);
      try {
        const response = await getAddressSuggestions(value);
        if (response.success) {
          setAddressSuggestions(response.data);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error('Error fetching address suggestions:', error);
      } finally {
        setIsLoadingAddress(false);
      }
    } else {
      setAddressSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleAddressSelect = async (id: string) => {
    try {
      const response = await getAddressDetails(id);
      if (response.success) {
        const addressData = response.data;
        setProfile(prev => ({
          ...prev,
          address: {
            address1: [
              addressData.line_1,
              addressData.line_2,
              addressData.line_3
            ].filter(Boolean).join(', '),
            address2: addressData.line_4 || '',
            city: addressData.town_or_city || '',
            postcode: addressData.postcode || '',
          }
        }));
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Error fetching address details:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (!profile.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!profile.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!profile.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(profile.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!profile.dob) {
      newErrors.dob = 'Date of birth is required';
    } else if (!validateAge(profile.dob)) {
      newErrors.dob = 'You must be at least 18 years old';
    }

    if (!profile.address.address1.trim()) {
      newErrors.address1 = 'Address line 1 is required';
    }
    if (!profile.address.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!profile.address.postcode.trim()) {
      newErrors.postcode = 'Postcode is required';
    } else if (!validateUKPostcode(profile.address.postcode)) {
      newErrors.postcode = 'Invalid UK postcode';
    }

    let hasPreviousNameErrors = profile.previousNames.some(
      name => !name.firstName.trim() || !name.lastName.trim()
    );
    let hasPreviousAddressErrors = profile.previousAddresses.some(
      addr =>
        !addr.address1.trim() ||
        !addr.city.trim() ||
        !addr.postcode.trim() ||
        !validateUKPostcode(addr.postcode)
    );

    if (hasPreviousNameErrors) {
      newErrors.firstName = 'All previous names must be complete';
    }
    if (hasPreviousAddressErrors) {
      newErrors.address1 = 'All previous addresses must be complete with valid postcodes';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile({
        ...profile, 
        dob: new Date(profile.dob)  
      });
      localStorage.setItem('signupData', JSON.stringify(profile));
      navigate('/auth/signup/step-5');
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ email: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const sectionBg = useColorModeValue('gray.50', 'gray.800');

  return (
    <Container maxW="container.md" py={8}>
    <Stack spacing={8}>
      {/* Progress indicator */}
      <Box>
        <HStack justify="space-between" mb={1}>
          <Text fontSize="sm" fontWeight="medium">
            Step 4 of 5
          </Text>
          <Text fontSize="sm" color={labelColor}>
            Personal Details
          </Text>
        </HStack>
        <Progress value={80} size="sm" colorScheme="blue" borderRadius="full" />
      </Box>

      {/* Header */}
      <Box textAlign="center">
        <Heading as="h1" size="xl" mb={2}>
          Your Personal Information
        </Heading>
        <Text color={labelColor} fontSize="lg">
          Provide your details to help us process your claim
        </Text>
      </Box>

      {/* Personal Details Form */}
      <Box
        bg={cardBg}
        borderRadius="xl"
        boxShadow="md"
        p={{ base: 6, md: 8 }}
        borderWidth="1px"
        borderColor={borderColor}
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            {/* Basic Information */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired isInvalid={!!errors.firstName}>
                <FormLabel fontWeight="medium">First Name</FormLabel>
                <Input
                  value={profile.firstName}
                  onChange={(e) => {
                    handleProfileChange('firstName', e.target.value);
                    if (errors.firstName) {
                      setErrors({ ...errors, firstName: undefined });
                    }
                  }}
                  placeholder="Your first name"
                />
                {errors.firstName && (
                  <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.lastName}>
                <FormLabel fontWeight="medium">Last Name</FormLabel>
                <Input
                  value={profile.lastName}
                  onChange={(e) => {
                    handleProfileChange('lastName', e.target.value);
                    if (errors.lastName) {
                      setErrors({ ...errors, lastName: undefined });
                    }
                  }}
                  placeholder="Your last name"
                />
                {errors.lastName && (
                  <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>

            <FormControl isRequired isInvalid={!!errors.email}>
              <FormLabel fontWeight="medium">Email Address</FormLabel>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => {
                  handleProfileChange('email', e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: undefined });
                  }
                }}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.dob}>
              <FormLabel fontWeight="medium">Date of Birth</FormLabel>
              <InputGroup>
                <Input
                  type="date"
                  value={formatDate(profile.dob)}
                  onChange={(e) => {
                    handleProfileChange('dob', e.target.value);
                    if (errors.dob) {
                      setErrors({ ...errors, dob: undefined });
                    }
                  }}
                  max={formatDate(new Date().toISOString())}
                />
              </InputGroup>
              {errors.dob && (
                <FormErrorMessage>{errors.dob}</FormErrorMessage>
              )}
            </FormControl>

            <Divider />

            {/* Current Address */}
            <Box>
              <Text fontWeight="medium" fontSize="lg" mb={4}>
                Current Address
              </Text>

              <VStack spacing={4} align="stretch">
                <FormControl isRequired isInvalid={!!errors.address1}>
                  <FormLabel fontWeight="medium">Address Line 1</FormLabel>
                  <Box position="relative" ref={suggestionsRef}>
                    <InputGroup>
                      <Input
                        value={profile.address.address1}
                        onChange={(e) => handleAddressInput(e.target.value)}
                        placeholder="Start typing your address"
                      />
                      <InputRightElement>
                        {isLoadingAddress ? (
                          <Spinner size="sm" />
                        ) : (
                          <FiSearch />
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {showSuggestions && addressSuggestions.length > 0 && (
                      <Box
                        position="absolute"
                        zIndex={1}
                        width="100%"
                        mt={1}
                        bg={cardBg}
                        boxShadow="lg"
                        borderRadius="md"
                        borderWidth="1px"
                        borderColor={borderColor}
                        maxH="300px"
                        overflowY="auto"
                      >
                        <List spacing={0}>
                          {addressSuggestions.map((suggestion) => (
                            <ListItem
                              key={suggestion.id}
                              p={2}
                              cursor="pointer"
                              _hover={{ bg: sectionBg }}
                              onClick={() => handleAddressSelect(suggestion.id)}
                            >
                              {suggestion.address}
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </Box>
                  {errors.address1 && (
                    <FormErrorMessage>{errors.address1}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="medium">Address Line 2 (Optional)</FormLabel>
                  <Input
                    value={profile.address.address2}
                    onChange={(e) => handleProfileChange('address.address2', e.target.value)}
                    placeholder="Apartment, suite, unit, etc."
                  />
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl isRequired isInvalid={!!errors.city}>
                    <FormLabel fontWeight="medium">City</FormLabel>
                    <Input
                      value={profile.address.city}
                      onChange={(e) => {
                        handleProfileChange('address.city', e.target.value);
                        if (errors.city) {
                          setErrors({ ...errors, city: undefined });
                        }
                      }}
                      placeholder="City"
                    />
                    {errors.city && (
                      <FormErrorMessage>{errors.city}</FormErrorMessage>
                    )}
                  </FormControl>

                  <FormControl isRequired isInvalid={!!errors.postcode}>
                    <FormLabel fontWeight="medium">Postcode</FormLabel>
                    <Input
                      value={profile.address.postcode}
                      onChange={(e) => {
                        handleProfileChange('address.postcode', e.target.value);
                        if (errors.postcode) {
                          setErrors({ ...errors, postcode: undefined });
                        }
                      }}
                      placeholder="Postcode"
                    />
                    {errors.postcode && (
                      <FormErrorMessage>{errors.postcode}</FormErrorMessage>
                    )}
                  </FormControl>
                </SimpleGrid>
              </VStack>
            </Box>

            <Divider />

            {/* Previous Names Section */}
            <Box>
              <Flex justify="space-between" align="center" mb={4}>
                <Button 
                  variant="ghost" 
                  rightIcon={isOpenPreviousNames ? undefined : <FiPlus />}
                  onClick={onTogglePreviousNames}
                  fontWeight="medium"
                  fontSize="lg"
                  height="auto"
                  p={0}
                >
                  Previous Names
                </Button>
                {profile.previousNames.length > 0 && (
                  <Badge colorScheme="blue" borderRadius="full" px={2}>
                    {profile.previousNames.length}
                  </Badge>
                )}
              </Flex>

              <Collapse in={isOpenPreviousNames} animateOpacity>
                <Box 
                  bg={sectionBg} 
                  p={4} 
                  borderRadius="md" 
                  mb={4}
                >
                  <Text mb={4}>
                    If you've changed your name in the past, please add your previous names here.
                  </Text>
                  
                  {profile.previousNames.map((name, index) => (
                    <Box 
                      key={index} 
                      mb={4} 
                      p={4} 
                      borderWidth="1px" 
                      borderRadius="md"
                      bg={cardBg}
                    >
                      <Flex justify="space-between" align="center" mb={2}>
                        <Text fontWeight="medium">Previous Name {index + 1}</Text>
                        <IconButton
                          aria-label="Remove previous name"
                          icon={<FiTrash2 />}
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleRemovePreviousName(index)}
                        />
                      </Flex>
                      
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <FormControl isRequired>
                          <FormLabel>First Name</FormLabel>
                          <Input
                            value={name.firstName}
                            onChange={(e) => handleUpdatePreviousName(index, 'firstName', e.target.value)}
                            placeholder="Previous first name"
                          />
                        </FormControl>
                        
                        <FormControl isRequired>
                          <FormLabel>Last Name</FormLabel>
                          <Input
                            value={name.lastName}
                            onChange={(e) => handleUpdatePreviousName(index, 'lastName', e.target.value)}
                            placeholder="Previous last name"
                          />
                        </FormControl>
                      </SimpleGrid>
                    </Box>
                  ))}
                  
                  <Button
                    leftIcon={<FiPlus />}
                    onClick={handleAddPreviousName}
                    size="sm"
                    colorScheme="blue"
                  >
                    Add Previous Name
                  </Button>
                </Box>
              </Collapse>
            </Box>

            {/* Previous Addresses Section */}
            <Box>
              <Flex justify="space-between" align="center" mb={4}>
                <Button 
                  variant="ghost" 
                  rightIcon={isOpenPreviousAddresses ? undefined : <FiPlus />}
                  onClick={onTogglePreviousAddresses}
                  fontWeight="medium"
                  fontSize="lg"
                  height="auto"
                  p={0}
                >
                  Previous Addresses
                </Button>
                {profile.previousAddresses.length > 0 && (
                  <Badge colorScheme="blue" borderRadius="full" px={2}>
                    {profile.previousAddresses.length}
                  </Badge>
                )}
              </Flex>

              <Collapse in={isOpenPreviousAddresses} animateOpacity>
                <Box 
                  bg={sectionBg} 
                  p={4} 
                  borderRadius="md" 
                  mb={4}
                >
                  <Text mb={4}>
                    If you've moved in the last 3 years, please add your previous addresses.
                  </Text>
                  
                  {profile.previousAddresses.map((address, index) => (
                    <Box 
                      key={index} 
                      mb={4} 
                      p={4} 
                      borderWidth="1px" 
                      borderRadius="md"
                      bg={cardBg}
                    >
                      <Flex justify="space-between" align="center" mb={2}>
                        <Text fontWeight="medium">Previous Address {index + 1}</Text>
                        <IconButton
                          aria-label="Remove previous address"
                          icon={<FiTrash2 />}
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleRemovePreviousAddress(index)}
                        />
                      </Flex>
                      
                      <VStack spacing={4} align="stretch">
                        <FormControl isRequired>
                          <FormLabel>Address Line 1</FormLabel>
                          <Input
                            value={address.address1}
                            onChange={(e) => handleUpdatePreviousAddress(index, 'address1', e.target.value)}
                            placeholder="House number and street"
                          />
                        </FormControl>
                        
                        <FormControl>
                          <FormLabel>Address Line 2 (Optional)</FormLabel>
                          <Input
                            value={address.address2}
                            onChange={(e) => handleUpdatePreviousAddress(index, 'address2', e.target.value)}
                            placeholder="Apartment, suite, unit, etc."
                          />
                        </FormControl>
                        
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                          <FormControl isRequired>
                            <FormLabel>City</FormLabel>
                            <Input
                              value={address.city}
                              onChange={(e) => handleUpdatePreviousAddress(index, 'city', e.target.value)}
                              placeholder="City"
                            />
                          </FormControl>
                          
                          <FormControl isRequired>
                            <FormLabel>Postcode</FormLabel>
                            <Input
                              value={address.postcode}
                              onChange={(e) => handleUpdatePreviousAddress(index, 'postcode', e.target.value)}
                              placeholder="Postcode"
                            />
                          </FormControl>
                        </SimpleGrid>
                      </VStack>
                    </Box>
                  ))}
                  
                  <Button
                    leftIcon={<FiPlus />}
                    onClick={handleAddPreviousAddress}
                    size="sm"
                    colorScheme="blue"
                  >
                    Add Previous Address
                  </Button>
                </Box>
              </Collapse>
            </Box>

            {/* Continue Button */}
            <Button
              size="lg"
              colorScheme="blue"
              rightIcon={<FiArrowRight />}
              type="submit"
              isLoading={isLoading}
              bgGradient="linear(to-r, blue.400, blue.600)"
              _hover={{
                bgGradient: "linear(to-r, blue.500, blue.700)",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Continue to ID Verification
            </Button>
          </VStack>
        </form>
      </Box>
    </Stack>
  </Container>
  );
};

export default Step4;
