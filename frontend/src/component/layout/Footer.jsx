import React from 'react';
import { 
  Box, 
  Container, 
  Flex, 
  Heading, 
  HStack, 
  VStack, 
  Text, 
  Link as ChakraLink,
  Icon,
  Divider,
  useColorModeValue,
  IconButton,
  Stack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { 
  FaGithub, 
  FaInstagram, 
  FaYoutube, 
  FaTwitter, 
  FaLinkedin, 
  FaArrowUp 
} from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Colors
  const bgGradient = useColorModeValue(
    'linear(to-b, gray.900, black)',
    'linear(to-b, gray.900, black)'
  );
  const textColor = useColorModeValue('gray.300', 'gray.300');
  const headingColor = useColorModeValue('white', 'white');
  const accentColor = useColorModeValue('yellow.400', 'yellow.400');
  const dividerColor = useColorModeValue('gray.700', 'gray.700');
  const linkHoverColor = useColorModeValue('yellow.400', 'yellow.400');
  
  // Footer sections
  const sections = [
    {
      title: 'Learn',
      links: [
        { name: 'Courses', path: '/courses' },
        { name: 'Tutorials', path: '/tutorials' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Resources', path: '/resources' }
      ]
    },
    {
      title: 'Tools',
      links: [
        { name: 'AI Quiz', path: '/quiz' },
        { name: 'Code Editor', path: '/codeeditor' },
        { name: 'Mock Interview', path: '/mockint' },
        { name: 'Request Course', path: '/request' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' }
      ]
    }
  ];

  return (
    <Box 
      bgGradient={bgGradient}
      color={textColor}
      position="relative"
      mt={16}
    >
      {/* Top accent bar */}
      <Box h="4px" bgGradient="linear(to-r, yellow.400, purple.500)" />
      
      {/* Scroll to top button */}
      <IconButton
        aria-label="Back to top"
        icon={<FaArrowUp />}
        colorScheme="yellow"
        size="md"
        rounded="full"
        position="absolute"
        top="-20px"
        right="50%"
        transform="translateX(50%)"
        onClick={scrollToTop}
        boxShadow="lg"
      />
      
      <Container maxW="container.xl" pt={16} pb={10}>
        <Stack 
          direction={{ base: 'column', md: 'row' }} 
          spacing={{ base: 10, md: 20 }}
          mb={8}
        >
          {/* Branding section */}
          <VStack align="flex-start" spacing={4} flex={1.5}>
            <Heading color={headingColor} fontSize="2xl">
              Course<Box as="span" color={accentColor}>Bundler</Box>
            </Heading>
            <Text fontSize="sm" maxW="300px">
              Empowering learners with comprehensive courses and cutting-edge learning tools to advance their careers and enrich their knowledge.
            </Text>
            
            {/* Social icons */}
            <HStack spacing={4} mt={4}>
              {[
                { icon: FaYoutube, href: 'https://youtube.com', color: '#FF0000' },
                { icon: FaInstagram, href: 'https://instagram.com', color: '#E1306C' },
                { icon: FaGithub, href: 'https://github.com', color: '#333' },
                { icon: FaTwitter, href: 'https://twitter.com', color: '#1DA1F2' },
                { icon: FaLinkedin, href: 'https://linkedin.com', color: '#0077B5' }
              ].map((social, index) => (
                <ChakraLink 
                  href={social.href} 
                  key={index} 
                  isExternal
                  _hover={{ transform: 'translateY(-3px)' }}
                  transition="all 0.3s"
                >
                  <Icon 
                    as={social.icon} 
                    boxSize={5} 
                    color="gray.400"
                    _hover={{ color: social.color }}
                    transition="all 0.3s"
                  />
                </ChakraLink>
              ))}
            </HStack>
          </VStack>
          
          {/* Footer navigation sections */}
          {sections.map((section, idx) => (
            <VStack key={idx} align="flex-start" spacing={4} flex={1}>
              <Heading 
                size="sm" 
                color={headingColor}
                textTransform="uppercase"
                letterSpacing="wider"
              >
                {section.title}
              </Heading>
              {section.links.map((link, linkIdx) => (
                <ChakraLink 
                  as={Link} 
                  to={link.path} 
                  key={linkIdx}
                  fontSize="sm"
                  _hover={{ 
                    color: linkHoverColor,
                    textDecoration: 'none',
                    transform: 'translateX(3px)' 
                  }}
                  transition="all 0.2s"
                >
                  {link.name}
                </ChakraLink>
              ))}
            </VStack>
          ))}
        </Stack>
        
        <Divider borderColor={dividerColor} my={8} />
        
        {/* Copyright section */}
        <Flex 
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'center', md: 'center' }}
          textAlign={{ base: 'center', md: 'left' }}
          fontSize="sm"
          spacing={4}
        >
          <Text>&copy; {new Date().getFullYear()} Course Bundler. All Rights Reserved.</Text>
          <Text color={accentColor} fontWeight="medium">Designed &amp; Built by Vansh Jain</Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;