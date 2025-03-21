

import { Box, Container, Grid, Heading, VStack, Text, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getlectures } from '../../redux/actions/course';
import { Navigate } from 'react-router-dom';
const CoursePage = ({user}) => {
  const dispatch = useDispatch()
  const {lectures,loading} = useSelector(state=>state.course)
  const params = useParams();
  const [lectureNumber, setLectureNumber] = React.useState(0);
  
  useEffect(() => {
    dispatch(getlectures(params.id))
  },[dispatch, params.id])
  

  if(user?.role!=='admin'&& (user?.subscription==undefined || user?.subscription.status!=='active')){
    return <Navigate to ={'/subscribe'}/>
      }
  return (
    
    <Container maxW="container.xl" py={8}>
      <Grid templateColumns="1fr 3fr" gap={8}>
        <VStack spacing={4} align="stretch">
          {lectures?.map((lecture, index) => (
            <Button
              key={lecture?._id}
              onClick={() => setLectureNumber(index)}
              variant={index === lectureNumber ? 'solid' : 'outline'}
              colorScheme="teal"
              width="100%"
            >
              <Text noOfLines={1}>{index + 1}. {lecture?.title}</Text>
            </Button>
          ))}
        </VStack>
        <Box>
          {lectures && lectures.length > 0 && lectures[lectureNumber]?.video?.url ? (
            <video
              key={lectures[lectureNumber]?._id}
              controls
              controlsList="nodownload" 
              width="100%"
              style={{ maxHeight: "70vh" }}
              src={lectures[lectureNumber]?.video?.url}
              type="video/mp4"
              autoPlay
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <Box height="300px" display="flex" alignItems="center" justifyContent="center">
              <Text>No video available</Text>
            </Box>
          )}
          <Heading mt={4} size="md"> {lectureNumber + 1} {lectures[lectureNumber]?.title}</Heading>
          <Text mt={2}>{lectures[lectureNumber]?.description}</Text>
        </Box>
      </Grid>
    </Container>
  );
};

export default CoursePage;
