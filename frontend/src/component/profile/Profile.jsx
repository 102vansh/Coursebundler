import React, { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Container,
  Button,
  Stack,
  Modal,
  useDisclosure,
  Image,
  Input,
  Flex,
  Badge,
  Icon,
  Grid,
  GridItem,
  useColorModeValue,
  useToast,
  Tooltip
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  RiDeleteBin7Fill, 
  RiEditBoxLine, 
  RiLockPasswordLine, 
  RiUserSettingsLine,
  RiVipCrownLine,
  RiCalendarLine,
  RiMailLine,
  RiPlayCircleLine
} from 'react-icons/ri';
import { fileuploadcss } from '../Auth/Register';
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { profilepicture, removefromPlaylist } from '../../redux/actions/profile';
import { cancelsubscription, getmyprofile } from '../../redux/actions/user';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionButton = motion(Button);

const Profile = ({user}) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [avatar, setImage] = useState('');
  const [imgPrev, setImgPrev] = useState('');
  const { loading } = useSelector(state => state.user);
  const toast = useToast();
  
  // Colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const subtleText = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('yellow.500', 'yellow.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const playlistBg = useColorModeValue('gray.50', 'gray.900');
  const badgeBg = useColorModeValue('purple.50', 'purple.900');
  const gradientBg = useColorModeValue(
    'linear(to-r, yellow.400, orange.400)',
    'linear(to-r, yellow.400, orange.400)'
  );

  const changeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgPrev(reader.result);
      setImage(reader.result);
    };
  };

  const changeImgSubmitHandler = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.append('file', avatar);
    
    dispatch(profilepicture(myform));
    onClose();
    
    toast({
      title: 'Photo update in progress',
      description: 'Your profile photo is being updated',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const removeFromPlaylist = async(id) => {
    await dispatch(removefromPlaylist(id));
    dispatch(getmyprofile());
    
    toast({
      title: 'Course removed',
      description: 'Course has been removed from your playlist',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  
  const cancelsubs = async() => {
    await dispatch(cancelsubscription());
    dispatch(getmyprofile());
  };

  return (
    <Container maxW="container.lg" py={12}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={8}>
          {/* Left Column - User Info Card */}
          <GridItem>
            <MotionBox
              bg={cardBg}
              borderRadius="xl"
              overflow="hidden"
              boxShadow="xl"
              borderWidth="1px"
              borderColor={borderColor}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Box 
                h="100px" 
                bgGradient={gradientBg}
                position="relative"
              />
              
              <Flex 
                direction="column" 
                alignItems="center" 
                mt="-50px"
                position="relative"
                px={6}
                pb={6}
              >
                <Avatar 
                  size="2xl" 
                  name={user?.name} 
                  src={user?.avatar?.url} 
                  border="4px solid"
                  borderColor={cardBg}
                  bg={accentColor}
                />
                
                <MotionButton
                  position="absolute"
                  top="50px"
                  right="20px"
                  size="sm"
                  rounded="full"
                  colorScheme="yellow"
                  onClick={onOpen}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon as={RiEditBoxLine} />
                </MotionButton>
                
                <VStack spacing={1} mt={4} textAlign="center">
                  <Heading size="lg" color={textColor}>{user?.name}</Heading>
                  <HStack spacing={1}>
                    <Icon as={RiMailLine} color={subtleText} />
                    <Text color={subtleText}>{user?.email}</Text>
                  </HStack>
                  
                  <Badge 
                    colorScheme={user?.role === 'admin' ? 'purple' : 'gray'} 
                    px={3} 
                    py={1} 
                    borderRadius="full"
                    mt={2}
                  >
                    {user?.role === 'admin' ? 'Administrator' : 'Student'}
                  </Badge>
                </VStack>
                
                <HStack spacing={6} mt={6}>
                  <Tooltip label="Update your profile">
                    <Link to="/updateprofile">
                      <MotionButton 
                        leftIcon={<RiUserSettingsLine />}
                        colorScheme="yellow" 
                        variant="outline"
                        size="sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Profile
                      </MotionButton>
                    </Link>
                  </Tooltip>
                  
                  <Tooltip label="Change your password">
                    <Link to="/changepassword">
                      <MotionButton
                        leftIcon={<RiLockPasswordLine />}
                        colorScheme="yellow"
                        variant="outline"
                        size="sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Password
                      </MotionButton>
                    </Link>
                  </Tooltip>
                </HStack>
                
                <VStack spacing={2} mt={6} width="100%">
                  <Flex 
                    width="100%" 
                    justify="space-between" 
                    align="center" 
                    py={2} 
                    px={3}
                    bg={badgeBg}
                    borderRadius="md"
                  >
                    <HStack>
                      <Icon as={RiCalendarLine} color={subtleText} />
                      <Text fontSize="sm" color={subtleText}>Joined</Text>
                    </HStack>
                    <Text fontSize="sm" fontWeight="medium">
                      {new Date(user?.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </Text>
                  </Flex>
                  
                  {user?.role !== 'admin' && (
                    <Flex 
                      width="100%" 
                      justify="space-between" 
                      align="center"
                      py={2} 
                      px={3}
                      bg={badgeBg}
                      borderRadius="md"
                    >
                      <HStack>
                        <Icon as={RiVipCrownLine} color={user?.subscription?.status === 'active' ? 'yellow.500' : subtleText} />
                        <Text fontSize="sm" color={subtleText}>Subscription</Text>
                      </HStack>
                      <HStack>
                        <Badge 
                          colorScheme={user?.subscription?.status === 'active' ? 'green' : 'gray'}
                          borderRadius="full"
                        >
                          {user?.subscription?.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                        {user?.subscription?.status === 'active' ? (
                          <MotionButton 
                            size="xs"
                            colorScheme="red"
                            onClick={cancelsubs}
                            isLoading={loading}
                            loadingText="Canceling..."
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Cancel
                          </MotionButton>
                        ) : (
                          <Link to="/subscribe">
                            <MotionButton 
                              size="xs" 
                              colorScheme="yellow"
                              isLoading={loading}
                              loadingText="Loading..."
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Subscribe
                            </MotionButton>
                          </Link>
                        )}
                      </HStack>
                    </Flex>
                  )}
                </VStack>
              </Flex>
            </MotionBox>
          </GridItem>
          
          {/* Right Column - Playlist */}
          <GridItem>
            <MotionBox
              bg={cardBg}
              borderRadius="xl"
              overflow="hidden"
              boxShadow="xl"
              borderWidth="1px"
              borderColor={borderColor}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Flex 
                justify="space-between" 
                align="center" 
                borderBottomWidth="1px" 
                borderColor={borderColor}
                p={6}
                bg={playlistBg}
              >
                <Heading size="md" color={textColor}>Your Learning Playlist</Heading>
                <Badge 
                  colorScheme="yellow"
                  borderRadius="full"
                  px={3}
                  py={1}
                >
                  {user?.playlist.length || 0} Courses
                </Badge>
              </Flex>
              
              <Box p={6}>
                {user?.playlist.length > 0 ? (
                  <Grid 
                    templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} 
                    gap={6}
                  >
                    {user?.playlist.map((item) => (
                      <MotionBox
                        key={item?.course}
                        borderRadius="lg"
                        overflow="hidden"
                        borderWidth="1px"
                        borderColor={borderColor}
                        bg={playlistBg}
                        boxShadow="sm"
                        whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                        transition={{ duration: 0.2 }}
                      >
                        <Image 
                          src={item?.poster} 
                          alt={`Course poster`}
                          height="160px"
                          width="100%"
                          objectFit="cover"
                        />
                        
                        <Flex 
                          justify="space-between" 
                          align="center"
                          p={4}
                        >
                          <Link to={`/course/${item.course}`}>
                            <MotionButton
                              leftIcon={<RiPlayCircleLine />}
                              colorScheme="yellow"
                              size="sm"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Watch Now
                            </MotionButton>
                          </Link>
                          
                          <Tooltip label="Remove from playlist">
                            <MotionButton
                              icon={<RiDeleteBin7Fill />}
                              aria-label="Remove from playlist"
                              onClick={() => removeFromPlaylist(item?.course)}
                              colorScheme="red"
                              variant="ghost"
                              size="sm"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Icon as={RiDeleteBin7Fill} />
                            </MotionButton>
                          </Tooltip>
                        </Flex>
                      </MotionBox>
                    ))}
                  </Grid>
                ) : (
                  <Flex 
                    direction="column" 
                    align="center" 
                    justify="center"
                    py={12}
                    textAlign="center"
                  >
                    <Text color={subtleText} mb={4}>
                      Your playlist is empty. Start adding courses to watch later!
                    </Text>
                    <Link to="/courses">
                      <MotionButton
                        colorScheme="yellow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Browse Courses
                      </MotionButton>
                    </Link>
                  </Flex>
                )}
              </Box>
            </MotionBox>
          </GridItem>
        </Grid>
      </MotionBox>
      
      <ChangePhotoModal
        isOpen={isOpen}
        onClose={onClose}
        imgPrev={imgPrev}
        changeImage={changeImage}
        changeImgSubmitHandler={changeImgSubmitHandler}
      />
    </Container>
  );
};

const ChangePhotoModal = ({ isOpen, onClose, imgPrev, changeImage, changeImgSubmitHandler }) => {
  const modalBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg={modalBg} borderRadius="xl" boxShadow="xl">
        <ModalHeader borderBottomWidth="1px" borderColor={borderColor}>Update Profile Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <VStack spacing={6}>
            {imgPrev ? (
              <Avatar 
                size="2xl" 
                src={imgPrev}
                borderWidth="4px"
                borderColor={borderColor}
              />
            ) : (
              <Box 
                p={8} 
                borderWidth="2px" 
                borderStyle="dashed" 
                borderColor={borderColor}
                borderRadius="full"
                textAlign="center"
              >
                <Text>Select an image</Text>
              </Box>
            )}
            
            <Box
              position="relative"
              w="full"
              py={2}
              px={4}
              bgGradient="linear(to-r, yellow.400, yellow.500)"
              color="white"
              borderRadius="md"
              textAlign="center"
              cursor="pointer"
              _hover={{ opacity: 0.9 }}
              transition="all 0.2s"
            >
              <Text fontWeight="medium">Choose File</Text>
              <Input 
                type="file" 
                position="absolute"
                top="0"
                left="0"
                opacity="0"
                w="full"
                h="full"
                cursor="pointer"
                onChange={changeImage}
              />
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button 
            colorScheme="yellow" 
            onClick={changeImgSubmitHandler}
            isDisabled={!imgPrev}
          >
            Save Photo
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Profile;
