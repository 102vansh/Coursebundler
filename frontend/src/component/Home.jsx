import React, { useEffect } from 'react';
import { 
  Box, 
  Heading, 
  Stack, 
  VStack, 
  Button, 
  Image, 
  Text, 
  Container, 
  Flex,
  HStack,
  Icon,
  Badge,
  useColorModeValue,
  keyframes,
  Grid,
  GridItem
} from '@chakra-ui/react';
import './home.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import { FaGraduationCap, FaLaptopCode, FaRocket, FaArrowRight } from 'react-icons/fa';

// Animation keyframes
const slideAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 214, 0, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(255, 214, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 214, 0, 0); }
`;

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionButton = motion(Button);

const Home = () => {
  // Define all color mode values at the top level
  const bgGradient = useColorModeValue(
    'linear(to-b, white, yellow.50)',
    'linear(to-b, gray.900, yellow.900)'
  );
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('gray.800', 'white');
  const accentColor = useColorModeValue('yellow.500', 'yellow.300');
  const carouselBgColor = useColorModeValue('gray.50', 'gray.700');
  const carouselHoverBgColor = useColorModeValue('white', 'gray.600');
  const brandSectionBg = useColorModeValue('white', 'gray.800');
  const videoSectionBg = useColorModeValue('gray.50', 'gray.900');
  const beforeGradient = useColorModeValue('linear(to-r, white, transparent)', 'linear(to-r, gray.800, transparent)');
  const afterGradient = useColorModeValue('linear(to-l, white, transparent)', 'linear(to-l, gray.800, transparent)');
  
  const animationDuration = '25s';
  const floatAnimation = `${float} 5s ease-in-out infinite`;
  const pulseAnimation = `${pulse} 2s infinite`;
  
  // For duplicating the brand logos to create an infinite loop
  const brandLogos = [
    { icon: CgGoogle, name: 'Google', color: '#4285F4' },
    { icon: CgYoutube, name: 'YouTube', color: '#FF0000' },
    { icon: SiCoursera, name: 'Coursera', color: '#0056D2' },
    { icon: SiUdemy, name: 'Udemy', color: '#A435F0' },
    { icon: DiAws, name: 'AWS', color: '#FF9900' }
  ];
  
  // Double the array for smooth infinite scrolling
  const allBrandLogos = [...brandLogos, ...brandLogos];
  
  // Features data
  const features = [
    {
      icon: FaGraduationCap,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience"
    },
    {
      icon: FaLaptopCode,
      title: "Hands-on Practice",
      description: "Apply what you learn with interactive exercises and projects"
    },
    {
      icon: FaRocket,
      title: "AI-Powered Learning",
      description: "Enhance your learning with our cutting-edge AI tools and quizzes"
    }
  ];
  
  return (
    <Box overflow="hidden">
      {/* Hero Section */}
      <Box 
        py={16} 
        bgGradient={bgGradient}
        position="relative"
        overflow="hidden"
      >
        {/* Background Elements */}
        <Box 
          position="absolute" 
          top="5%" 
          left="5%" 
          height="300px" 
          width="300px" 
          bgGradient="radial(yellow.100, yellow.50)"
          borderRadius="full"
          opacity="0.4"
          filter="blur(40px)"
          zIndex={0}
        />
        
        <Box 
          position="absolute" 
          bottom="5%" 
          right="5%" 
          height="200px" 
          width="200px" 
          bgGradient="radial(yellow.200, yellow.50)"
          borderRadius="full"
          opacity="0.3"
          filter="blur(30px)"
          zIndex={0}
        />
        
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <Stack 
            direction={["column", "column", "row"]} 
            spacing={[8, 10, 20]} 
            justify="space-between" 
            align="center"
          >
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              maxW={["100%", "100%", "50%"]}
            >
              <VStack align={["center", "center", "flex-start"]} spacing={6}>
                <MotionHeading
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  fontSize={["4xl", "5xl", "6xl"]}
                  fontWeight="bold"
                  lineHeight="shorter"
                  color={headingColor}
                >
                  <Text as="span" color={accentColor}>LEARN</Text> FROM THE{" "}
                  <Text as="span" 
                    bgGradient="linear(to-r, yellow.400, yellow.600)" 
                    bgClip="text"
                  >
                    EXPERTS
                  </Text>
                </MotionHeading>
                
                <MotionBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <Text 
                    fontSize={["lg", "xl"]} 
                    color="gray.600"
                    fontWeight="medium"
                    maxW="500px"
                  >
                    Discover the most valuable and effective way to master new skills with our expert-led courses and resources.
                  </Text>
                </MotionBox>
                
                <HStack spacing={4}>
                  <MotionButton
                    as={Link}
                    to="/courses"
                    size="lg"
                    colorScheme="yellow"
                    fontWeight="bold"
                    px={8}
                    rightIcon={<FaArrowRight />}
                    position="relative"
                    overflow="hidden"
                    _hover={{ transform: "translateY(-3px)" }}
                    transition="all 0.3s ease"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    Explore Courses
                  </MotionButton>
                  
                  <MotionButton
                    as={Link}
                    to="/quiz"
                    variant="outline"
                    colorScheme="yellow"
                    size="lg"
                    fontWeight="bold"
                    position="relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  >
                    Try AI Quiz
                    <Badge ml={2} colorScheme="purple" variant="solid" borderRadius="full">
                      New
                    </Badge>
                  </MotionButton>
                </HStack>
              </VStack>
            </MotionBox>
            
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              animation={floatAnimation}
            >
              <Image 
                src={'https://img.freepik.com/premium-vector/student-with-laptop-education-studying-concept-vector-illustration-young-boy-studying-la_549515-475.jpg'} 
                boxSize={["300px", "350px", "400px"]} 
                objectFit="contain" 
                borderRadius="2xl"
                boxShadow="lg"
              />
            </MotionBox>
          </Stack>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Box py={20} bg={cardBg}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack spacing={4}>
              <Heading 
                textAlign="center" 
                size="2xl" 
                fontWeight="bold"
              >
                Why Choose Our{" "}
                <Text 
                  as="span" 
                  bgGradient="linear(to-r, yellow.400, yellow.600)" 
                  bgClip="text"
                >
                  Learning Platform
                </Text>
              </Heading>
              <Text 
                textAlign="center" 
                fontSize="xl" 
                color="gray.500" 
                maxW="700px"
              >
                Our platform offers a unique blend of expert instruction and cutting-edge technology to help you advance your skills.
              </Text>
            </VStack>
            
            <Grid 
              templateColumns={["1fr", "1fr", "repeat(3, 1fr)"]} 
              gap={8}
              width="100%"
            >
              {features.map((feature, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                >
                  <Box 
                    bg={cardBg} 
                    p={8} 
                    borderRadius="xl" 
                    boxShadow="md"
                    height="100%"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: "translateY(-5px)",
                      boxShadow: "xl"
                    }}
                  >
                    <Flex 
                      h={12} 
                      w={12} 
                      align="center" 
                      justify="center" 
                      rounded="full" 
                      bg="yellow.100" 
                      color="yellow.600"
                      mb={4}
                    >
                      <Icon as={feature.icon} boxSize={6} />
                    </Flex>
                    <Heading size="md" mb={4}>{feature.title}</Heading>
                    <Text color="gray.600">{feature.description}</Text>
                  </Box>
                </MotionBox>
              ))}
            </Grid>
          </VStack>
        </Container>
      </Box>
      
      {/* Brand Carousel Section */}
      <Box py={12} bg={brandSectionBg}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Heading 
              textAlign="center" 
              color="yellow.500" 
              fontFamily="body"
              fontSize={["2xl", "3xl"]}
            >
              Trusted By Industry Leaders
            </Heading>
            
            <Box 
              position="relative" 
              width="100%" 
              overflow="hidden"
              py={8}
              _before={{
                content: '""',
                position: 'absolute',
                zIndex: 2,
                left: 0,
                top: 0,
                height: '100%',
                width: '100px',
                bgGradient: beforeGradient
              }}
              _after={{
                content: '""',
                position: 'absolute',
                zIndex: 2,
                right: 0,
                top: 0,
                height: '100%',
                width: '100px',
                bgGradient: afterGradient
              }}
            >
              <Flex
                width="fit-content"
                animation={`${slideAnimation} ${animationDuration} linear infinite`}
              >
                {allBrandLogos.map((brand, index) => (
                  <Flex
                    key={index}
                    align="center"
                    justify="center"
                    mx={10}
                    p={4}
                    bgColor={carouselBgColor}
                    borderRadius="lg"
                    minW="150px"
                    height="80px"
                    boxShadow="sm"
                    transition="all 0.3s ease"
                    _hover={{ 
                      transform: 'scale(1.05)',
                      boxShadow: 'md',
                      bgColor: carouselHoverBgColor
                    }}
                  >
                    <VStack spacing={1}>
                      <Icon as={brand.icon} boxSize={8} color={brand.color} />
                      <Text fontSize="sm" fontWeight="medium">{brand.name}</Text>
                    </VStack>
                  </Flex>
                ))}
              </Flex>
            </Box>
          </VStack>
        </Container>
      </Box>
      
      {/* Video Section */}
      <Box py={16} bg={videoSectionBg}>
        <Container maxW="container.xl">
          <Grid templateColumns={["1fr", "1fr", "1fr 1fr"]} gap={12} alignItems="center">
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <VStack align="flex-start" spacing={6}>
                <Heading size="2xl" lineHeight="shorter">
                  See how our <Text as="span" color="yellow.500">platform</Text> works
                </Heading>
                
                <Text fontSize="lg" color="gray.600">
                  Our dynamic learning environment combines expert instruction, interactive content, and AI-powered tools to create an immersive educational experience.
                </Text>
                
                <MotionButton
                  size="lg"
                  colorScheme="yellow"
                  rightIcon={<FaArrowRight />}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  as={Link}
                  to="/courses"
                >
                  Get Started Now
                </MotionButton>
              </VStack>
            </MotionBox>
            
            <MotionBox
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Box
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="2xl"
                position="relative"
              >
                <Box
                  position="absolute"
                  top="-30px"
                  left="-30px"
                  right="-30px"
                  bottom="-30px"
                  bgGradient="linear(to-br, yellow.100, yellow.400)"
                  filter="blur(60px)"
                  opacity="0.6"
                  zIndex={-1}
                />
                <video 
                  autoPlay={true}  
                  src={'https://cdn.pixabay.com/video/2023/04/15/159029-818026300_tiny.mp4'} 
                  controls 
                  controlsList='nodownload nofullscreen noremoteplayback' 
                  style={{ 
                    borderRadius: '16px', 
                    width: '100%', 
                    height: 'auto',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}
                />
              </Box>
            </MotionBox>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;