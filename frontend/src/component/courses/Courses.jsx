import { 
  Button, Container, Heading, Input, VStack, 
  Grid, Text, HStack, Box, Image, Badge, 
  Flex, useColorModeValue, InputGroup, InputLeftElement,
  Tag, TagLabel, Icon, Divider
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getallcourses } from '../../redux/actions/course'
import { addtoPlaylist, getmyprofile } from '../../redux/actions/user'
import { FaSearch, FaBookOpen, FaEye, FaUserAlt, FaPlus, FaPlay } from 'react-icons/fa'

const Courses = () => {
  const { id } = useParams()
  const { loading, courses, error } = useSelector(state => state.course)
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState("")
  const [category, setCategory] = useState("")
  
  const categories = [
    'Web Development', 
    'Data Science', 
    'Machine Learning', 
    'Blockchain', 
    'Artificial Intelligence', 
    'Dsa'
  ]
  
  const addtoplaylist = async(courseid) => {
    await dispatch(addtoPlaylist(courseid))
    dispatch(getmyprofile())
  }

  useEffect(() => {
    dispatch(getallcourses(category, keyword))
  }, [category, keyword, dispatch]) 
      
  const Course = ({views, title, description, imagesrc, creator, id, lecturecount}) => {
    const cardBg = useColorModeValue('white', 'gray.800')
    const cardBorder = useColorModeValue('gray.200', 'gray.700')
    
    return (
      <Box 
        bg={cardBg}
        borderWidth="1px"
        borderColor={cardBorder}
        borderRadius="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ 
          transform: 'translateY(-5px)', 
          boxShadow: 'xl',
          borderColor: 'yellow.400'
        }}
      >
        <Box position="relative">
          <Image 
            src={imagesrc} 
            alt={title}
            objectFit="cover"
            height="200px"
            width="100%"
          />
          <Badge 
            position="absolute" 
            top="10px" 
            right="10px" 
            colorScheme="yellow" 
            fontSize="0.8em"
            borderRadius="full" 
            px="2"
          >
            <Flex align="center">
              <Icon as={FaEye} mr="1" />
              {views} views
            </Flex>
          </Badge>
        </Box>

        <Box p="5">
          <Heading 
            fontSize="xl" 
            fontWeight="semibold" 
            lineHeight="tight" 
            isTruncated
            mb={2}
          >
            {title}
          </Heading>
          
          <Text 
            fontSize="md" 
            color="gray.600" 
            noOfLines={2} 
            mb={4}
          >
            {description}
          </Text>
          
          <Divider mb={4} />
          
          <Flex justify="space-between" align="center" mb={4}>
            <Flex align="center">
              <Icon as={FaUserAlt} color="yellow.500" mr="2" />
              <Text fontSize="sm" fontWeight="medium">{creator}</Text>
            </Flex>
            
            <Flex align="center">
              <Icon as={FaBookOpen} color="yellow.500" mr="2" />
              <Text fontSize="sm" fontWeight="medium">{lecturecount} lectures</Text>
            </Flex>
          </Flex>
          
          <Flex mt={3} justify="space-between">
            <Link to={`/course/${id}`}>
              <Button 
                leftIcon={<FaPlay />}
                colorScheme="yellow" 
                variant="solid" 
                size="sm"
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
              >
                {loading ? 'Loading...' : 'Watch Now'}
              </Button>
            </Link>
            <Button 
              leftIcon={<FaPlus />}
              colorScheme="yellow" 
              variant="outline" 
              size="sm"
              onClick={() => addtoplaylist(id)}
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
            >
              {loading ? 'Loading...' : 'Add to Playlist'}
            </Button>
          </Flex>
        </Box>
      </Box>
    )
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8} textAlign="center">
        <Heading 
          as="h1" 
          size="xl" 
          mb={4}
          bgGradient="linear(to-r, yellow.400, yellow.600)"
          bgClip="text"
          fontWeight="extrabold"
        >
          Explore Our Courses
        </Heading>
        <Text color="gray.600" fontSize="lg">
          Enhance your skills with our expert-led courses
        </Text>
      </Box>
      
      <Box mb={6}>
        <InputGroup size="lg" mb={6}>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.300" />
          </InputLeftElement>
          <Input
            value={keyword}
            placeholder="Search for courses..."
            onChange={(e) => setKeyword(e.target.value)}
            focusBorderColor="yellow.400"
            borderRadius="full"
            boxShadow="sm"
          />
        </InputGroup>
        
        <Box overflowX="auto" pb={4} mb={4}>
          <Flex wrap="nowrap" gap={3} paddingY={2}>
            <Button
              key="all"
              onClick={() => setCategory("")}
              colorScheme={category === "" ? "yellow" : "gray"}
              variant={category === "" ? "solid" : "outline"}
              borderRadius="full"
              size="md"
              minW="auto"
              px={4}
            >
              All
            </Button>
            
            {categories.map((item, index) => (
              <Button
                key={index}
                onClick={() => setCategory(item)}
                colorScheme={category === item ? "yellow" : "gray"}
                variant={category === item ? "solid" : "outline"}
                borderRadius="full"
                size="md"
                minW="auto"
                px={4}
              >
                {item}
              </Button>
            ))}
          </Flex>
        </Box>
      </Box>
      
      {courses.length > 0 ? (
        <Grid 
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)"
          }}
          gap={6}
        >
          {courses?.map((item) => (
            <Course
              key={item._id}
              title={item.title}
              views={item.views}
              description={item.description}
              imagesrc={item.poster.url}
              creator={item.createdBy}
              lecturecount={item.numOfVideos}
              id={item._id}
            />
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" py={10}>
          <Heading size="lg" color="gray.500">No courses found</Heading>
          <Text mt={2}>Try adjusting your search or browse all courses</Text>
        </Box>
      )}
    </Container>
  )
}

export default Courses


