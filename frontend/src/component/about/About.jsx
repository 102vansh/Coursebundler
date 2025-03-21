import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  Divider,
  Badge
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RiSecurePaymentFill,
  RiUserHeartLine,
  RiAwardLine,
  RiBookOpenLine,
  RiTeamLine,
  RiGlobalLine,
  RiLinkedinBoxFill,
  RiGithubFill,
  RiTwitterFill,
  RiArrowRightLine
} from 'react-icons/ri';

// Motion components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);

const About = () => {
  // Colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const accentColor = useColorModeValue('yellow.500', 'yellow.400');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const subtleTextColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const gradientBg = useColorModeValue(
    'linear(to-br, yellow.400, orange.400)',
    'linear(to-br, yellow.500, orange.500)'
  );

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Stats data
  const stats = [
    { icon: RiUserHeartLine, label: 'Students', value: '10,000+' },
    { icon: RiBookOpenLine, label: 'Courses', value: '100+' },
    { icon: RiAwardLine, label: 'Awards', value: '15' },
    { icon: RiGlobalLine, label: 'Countries', value: '120+' }
  ];

  // Values data
  const values = [
    {
      title: 'Quality Education',
      description: 'We prioritize delivering high-quality educational content that is both comprehensive and easy to understand.'
    },
    {
      title: 'Affordable Learning',
      description: 'We believe education should be accessible to everyone, regardless of financial constraints.'
    },
    {
      title: 'Community Support',
      description: 'Our vibrant community of students and instructors foster a collaborative learning environment.'
    },
    {
      title: 'Cutting-Edge Technology',
      description: 'We leverage the latest technologies to provide an immersive and interactive learning experience.'
    }
  ];

  return (
    <Box bg={bgColor} py={16}>
      <Container maxW="container.xl">
        {/* Hero Section */}
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          mb={20}
          textAlign="center"
        >
          <Badge 
            colorScheme="yellow" 
            fontSize="md" 
            px={4} 
            py={1} 
            borderRadius="full" 
            mb={4}
          >
            About Us
          </Badge>
          <MotionHeading
            as="h1"
            size="2xl"
            fontWeight="bold"
            mb={6}
            bgGradient={gradientBg}
            bgClip="text"
          >
            Empowering Learning Journeys
          </MotionHeading>
          <MotionText
            fontSize="xl"
            color={subtleTextColor}
            maxW="3xl"
            mx="auto"
            mb={12}
          >
            Course Bundler is a premier online learning platform dedicated to providing high-quality educational content 
            and interactive learning experiences to students worldwide.
          </MotionText>
          
          <Flex justify="center" wrap="wrap" gap={4}>
            <Link to="/courses">
              <Button 
                size="lg"
                colorScheme="yellow"
                rightIcon={<RiArrowRightLine />}
                _hover={{ transform: 'translateY(-2px)' }}
                transition="all 0.3s"
              >
                Explore Courses
              </Button>
            </Link>
            <Link to="/subscribe">
              <Button 
                size="lg"
                variant="outline"
                colorScheme="yellow"
                _hover={{ transform: 'translateY(-2px)' }}
                transition="all 0.3s"
              >
                Subscribe Now
              </Button>
            </Link>
          </Flex>
        </MotionBox>

        {/* Founder Section */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          mb={20}
        >
          <Grid 
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap={10}
            alignItems="center"
          >
            <GridItem position="relative">
              <Box
                position="absolute"
                top="-10px"
                left="-10px"
                right="10px"
                bottom="10px"
                bg={accentColor}
                opacity="0.15"
                borderRadius="2xl"
                zIndex={0}
              />
              <Image
              
                src="/download.jpeg"
                borderRadius="xl"
                objectFit="cover"
                boxShadow="2xl"
                width="100%"
                height="400px"
                zIndex={1}
                position="relative"
              />
            </GridItem>
            
            <GridItem>
              <VStack align="flex-start" spacing={5}>
                <Badge colorScheme="purple" px={3} py={1} borderRadius="full">
                  Our Story
                </Badge>
                <Heading size="xl">Meet Our Founder</Heading>
                <Text fontSize="xl" fontWeight="bold" color={accentColor}>
                  Vansh Jain
                </Text>
                <Text color={subtleTextColor} fontSize="lg">
                  Vansh is a passionate Full Stack Developer and educator with a vision to make 
                  quality education accessible to everyone. With extensive experience in both 
                  software development and teaching, he founded Course Bundler to bridge the gap 
                  between traditional education and modern learning needs.
                </Text>
                <Text color={subtleTextColor} fontSize="lg">
                  "Our mission is to provide high-quality educational content that empowers 
                  learners to achieve their goals and transform their careers."
                </Text>
                
                <HStack spacing={4} pt={2}>
                  <ChakraLink href="https://linkedin.com" isExternal>
                    <Icon 
                      as={RiLinkedinBoxFill} 
                      boxSize={6} 
                      color={accentColor}
                      _hover={{ transform: 'scale(1.2)' }}
                      transition="all 0.3s"
                    />
                  </ChakraLink>
                  <ChakraLink href="https://github.com" isExternal>
                    <Icon 
                      as={RiGithubFill} 
                      boxSize={6} 
                      color={accentColor}
                      _hover={{ transform: 'scale(1.2)' }}
                      transition="all 0.3s"
                    />
                  </ChakraLink>
                  <ChakraLink href="https://twitter.com" isExternal>
                    <Icon 
                      as={RiTwitterFill} 
                      boxSize={6} 
                      color={accentColor}
                      _hover={{ transform: 'scale(1.2)' }}
                      transition="all 0.3s"
                    />
                  </ChakraLink>
                </HStack>
              </VStack>
            </GridItem>
          </Grid>
        </MotionBox>

        {/* Stats Section */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          mb={20}
        >
          <Box
            py={12}
            px={8}
            borderRadius="2xl"
            bgGradient={gradientBg}
            color="white"
            boxShadow="xl"
          >
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
              {stats.map((stat, index) => (
                <VStack key={index} spacing={2}>
                  <Icon as={stat.icon} boxSize={10} />
                  <Text fontSize="4xl" fontWeight="bold">
                    {stat.value}
                  </Text>
                  <Text fontSize="lg">{stat.label}</Text>
                </VStack>
              ))}
            </SimpleGrid>
          </Box>
        </MotionBox>

        {/* Video & Mission Section */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          mb={20}
        >
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10}>
            <GridItem order={{ base: 2, md: 1 }}>
              <VStack align="flex-start" spacing={6} height="100%" justify="center">
                <Badge colorScheme="green" px={3} py={1} borderRadius="full">
                  Our Vision
                </Badge>
                <Heading size="xl">Transforming Education</Heading>
                <Text color={subtleTextColor} fontSize="lg">
                  We're revolutionizing how people learn by providing interactive, engaging content
                  delivered by industry experts. Our platform combines cutting-edge technology with
                  effective teaching methodologies to create an immersive learning experience.
                </Text>
                
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} width="full" mt={4}>
                  {values.map((value, index) => (
                    <Box 
                      key={index} 
                      p={4} 
                      bg={cardBg} 
                      borderRadius="lg"
                      borderLeft="4px solid"
                      borderColor={accentColor}
                      boxShadow="sm"
                    >
                      <Heading size="sm" mb={2}>
                        {value.title}
                      </Heading>
                      <Text fontSize="sm" color={subtleTextColor}>
                        {value.description}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </VStack>
            </GridItem>
            
            <GridItem order={{ base: 1, md: 2 }}>
              <Box 
                borderRadius="xl"
                overflow="hidden"
                boxShadow="2xl"
                position="relative"
              >
                <Box
                  position="absolute"
                  top="-20px"
                  left="-20px"
                  right="-20px"
                  bottom="-20px"
                  bgGradient="linear(to-br, yellow.100, yellow.400)"
                  filter="blur(30px)"
                  opacity="0.4"
                  zIndex={-1}
                />
                <video 
                  width="100%" 
                  height="auto" 
                  autoPlay 
                  loop 
                  muted
                  style={{ 
                    borderRadius: "12px",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  src="https://cdn.pixabay.com/video/2021/03/31/69625-531621058_tiny.mp4"
                />
              </Box>
            </GridItem>
          </Grid>
        </MotionBox>

        {/* Terms and Subscription Section */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={10}>
            <GridItem>
              <Box 
                p={8}
                borderRadius="xl"
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                height="100%"
                boxShadow="md"
              >
                <Heading size="md" mb={4}>
                  Terms and Conditions
                </Heading>
                <Box 
                  h="200px" 
                  overflowY="auto" 
                  pr={4}
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      width: '10px',
                      background: useColorModeValue('gray.100', 'gray.600'),
                      borderRadius: '24px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: useColorModeValue('gray.400', 'gray.300'),
                      borderRadius: '24px',
                    },
                  }}
                >
                  <Text color={subtleTextColor} mb={4}>
                    By using Course Bundler, you agree to these terms and conditions. Our platform provides educational content and services subject to the following terms:
                  </Text>
                  
                  <Text color={subtleTextColor} mb={4}>
                    1. <strong>Account Registration:</strong> Users must provide accurate information when registering and are responsible for maintaining the security of their account.
                  </Text>
                  
                  <Text color={subtleTextColor} mb={4}>
                    2. <strong>Content Usage:</strong> Course materials are for personal, non-commercial use only and may not be redistributed without permission.
                  </Text>
                  
                  <Text color={subtleTextColor} mb={4}>
                    3. <strong>Subscription Terms:</strong> Premium subscriptions are billed according to the plan selected. Users may cancel at any time.
                  </Text>
                  
                  <Text color={subtleTextColor} mb={4}>
                    4. <strong>Refund Policy:</strong> Refunds are available within 7 days of purchase if you're unsatisfied with the course content.
                  </Text>
                  
                  <Heading size="sm" mt={6} mb={2}>
                    Refund and Cancellation Policy
                  </Heading>
                  <Text color={subtleTextColor}>
                    Refunds are processed within 7 days of the original purchase. Cancellations can be made at any time through your account settings. Partial refunds may be provided for unused subscription time.
                  </Text>
                </Box>
              </Box>
            </GridItem>
            
            <GridItem>
              <Flex 
                direction="column" 
                justify="center" 
                align="center"
                h="100%"
                p={8}
                borderRadius="xl"
                bg={accentColor}
                color="white"
                boxShadow="xl"
                textAlign="center"
              >
                <Icon as={RiSecurePaymentFill} boxSize={12} mb={4} />
                <Heading size="lg" mb={4}>
                  Secure Payments
                </Heading>
                <Text fontSize="md" mb={6}>
                  All payments are securely processed by Razorpay, ensuring your financial information is protected.
                </Text>
                <Link to="/subscribe">
                  <Button 
                    size="lg" 
                    bg="white" 
                    color={accentColor}
                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                    transition="all 0.3s"
                  >
                    Subscribe Today
                  </Button>
                </Link>
              </Flex>
            </GridItem>
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default About;