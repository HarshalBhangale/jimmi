/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Divider,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { FiEdit2} from 'react-icons/fi';
import { userAtom } from '@/jotai/atoms';     
import { useAtomValue } from 'jotai';
import { updateProfile, type IUser } from '@/api/services/profile';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  county: string;
  profileImage?: string;
  createdAt: string;
  jimmiMailId: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const toast = useToast();
  const user = useAtomValue(userAtom);
  
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  // Load user data
  useEffect(() => {
    setIsLoading(true);
    
    if (user) {
      const userProfileData: UserProfile = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address1: user.address.address1,
        address2: user.address.address2,
        city: user.address.city,
        postcode: user.address.postcode,
        county: user.address.county,
        profileImage: user.profileImage,
        createdAt: user.signupDate,
        jimmiMailId: user.jimmiMailId,
      };
      
      setUserData(userProfileData);
      setFormData(userProfileData);
    }
    
    setIsLoading(false);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
      
      // Clear error for this field if it exists
      if (formErrors[name]) {
        setFormErrors({
          ...formErrors,
          [name]: '',
        });
      }
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData?.firstName) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData?.lastName) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData?.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData?.address1) {
      errors.address1 = 'Address line 1 is required';
    }
    
    if (!formData?.city) {
      errors.city = 'City is required';
    }
    
    if (!formData?.postcode) {
      errors.postcode = 'Postcode is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm() && formData) {
      setIsLoading(true);
      
      try {
        const updateData: Partial<IUser> = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: {
            address1: formData.address1,
            address2: formData.address2,
            city: formData.city,
            postcode: formData.postcode,
          }
        };

        await updateProfile(updateData);
        
        setUserData(formData);
        setIsEditing(false);
        
        toast({
          title: 'Profile updated',
          description: 'Your profile has been successfully updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to update profile. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setFormData(userData);
    setFormErrors({});
    setIsEditing(false);
  };


  if (isLoading) {
    return (
      <Box p={4}>
        <Text>Loading profile...</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      {/* Header */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={8}
        flexDirection={{ base: 'column', md: 'row' }}
        textAlign={{ base: 'center', md: 'left' }}
      >
        <Box>
          <Heading size="lg" mb={1}>
            My Profile
          </Heading>
          <Text color={textColor}>
            Manage your account details
          </Text>
        </Box>
      </Flex>

      {/* Main content */}
        {/* Profile Details Section */}
        <Box
          bg={cardBg}
          p={6}
          borderRadius="lg"
          boxShadow="sm"
          border="1px"
          borderColor={borderColor}
          gridColumn={{ md: 'span 2' }}
        >
          <Flex justifyContent="space-between" mb={4}>
            <Heading size="md">Personal Information</Heading>
            {!isEditing ? (
              <Button
                leftIcon={<FiEdit2 />}
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            ) : (
              <HStack spacing={2}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={handleSave}
                  isLoading={isLoading}
                >
                  Save
                </Button>
              </HStack>
            )}
          </Flex>
          <Divider mb={4} />

          {isEditing ? (
            <VStack spacing={4} align="stretch">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isInvalid={!!formErrors.firstName}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="firstName"
                    value={formData?.firstName || ''}
                    onChange={handleInputChange}
                  />
                  {formErrors.firstName && (
                    <FormErrorMessage>{formErrors.firstName}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!formErrors.lastName}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="lastName"
                    value={formData?.lastName || ''}
                    onChange={handleInputChange}
                  />
                  {formErrors.lastName && (
                    <FormErrorMessage>{formErrors.lastName}</FormErrorMessage>
                  )}
                </FormControl>
              </SimpleGrid>

              <FormControl isInvalid={!!formErrors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData?.email || ''}
                  onChange={handleInputChange}
                />
                {formErrors.email && (
                  <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!formErrors.phoneNumber}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  name="phoneNumber"
                  value={formData?.phoneNumber || ''}
                  onChange={handleInputChange}
                  isDisabled={true}
                  bg={useColorModeValue('gray.100', 'gray.700')}
                />
                <Text fontSize="sm" color={textColor} mt={1}>
                  Contact your support team to update your phone number
                </Text>
              </FormControl>

              <Text fontWeight="medium" mb={1}>
                Jimmi ID
              </Text>
              <Text mb={4}>{userData?.jimmiMailId}</Text>

              <Heading size="sm" mt={2}>
                Address
              </Heading>
              <Divider />

              <FormControl isInvalid={!!formErrors.address1}>
                <FormLabel>Address Line 1</FormLabel>
                <Input
                  name="address1"
                  value={formData?.address1 || ''}
                  onChange={handleInputChange}
                />
                {formErrors.address1 && (
                  <FormErrorMessage>{formErrors.address1}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Address Line 2 (Optional)</FormLabel>
                <Input
                  name="address2"
                  value={formData?.address2 || ''}
                  onChange={handleInputChange}
                />
              </FormControl>

              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                <FormControl isInvalid={!!formErrors.city}>
                  <FormLabel>City</FormLabel>
                  <Input
                    name="city"
                    value={formData?.city || ''}
                    onChange={handleInputChange}
                  />
                  {formErrors.city && (
                    <FormErrorMessage>{formErrors.city}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!formErrors.postcode}>
                  <FormLabel>Postcode</FormLabel>
                  <Input
                    name="postcode"
                    value={formData?.postcode || ''}
                    onChange={handleInputChange}
                  />
                  {formErrors.postcode && (
                    <FormErrorMessage>{formErrors.postcode}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>County (Optional)</FormLabel>
                  <Input
                    name="county"
                    value={formData?.county || ''}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </SimpleGrid>
            </VStack>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Box>
                <Text fontWeight="medium" mb={1}>
                  Name
                </Text>
                <Text mb={4}>
                  {userData?.firstName} {userData?.lastName}
                </Text>

                <Text fontWeight="medium" mb={1}>
                  Email
                </Text>
                <Text mb={4}>{userData?.email}</Text>

                <Text fontWeight="medium" mb={1}>
                  Phone
                </Text>
                <Text mb={4}>{userData?.phoneNumber}</Text>

                <Text fontWeight="medium" mb={1}>
                  Jimmi Maid ID
                </Text>
                <Text mb={4}>{userData?.jimmiMailId}</Text>
              </Box>

              <Box>
                <Text fontWeight="medium" mb={1}>
                  Address
                </Text>
                <Text>{userData?.address1}</Text>
                {userData?.address2 && <Text>{userData.address2}</Text>}
                <Text>
                  {userData?.city}, {userData?.postcode}
                </Text>
                {userData?.county && <Text>{userData.county}</Text>}
              </Box>
            </SimpleGrid>
          )}
        </Box>

    </Box>
  );
};

export default Profile; 