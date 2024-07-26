// import { Box, Container, Grid, Heading, VStack } from '@chakra-ui/react'
// import React from 'react'
// import { Text } from '@chakra-ui/react'

// const Coursepage = () => {
//     const lecturetitle = "Introduction"
//     const [lecturenumber,setLecturenumber] = React.useState(0) //lecturenumber 
//     const lectures = [{_id:1,title:"Introduction",description:"hello",video:{url:"https://drive.google.com/file/d/1quX6YAb8KpAfAatG4qTvZflFHuewUBX6/preview"}
//     },{_id:2,title:"Overview",description:"hello",video:{url:"https://drive.google.com/file/d/1quX6YAb8KpAfAatG4qTvZflFHuewUBX6/preview"}},
//     {_id:3,title:"Basics",description:"hello",video:{url:"https://drive.google.com/file/d/1quX6YAb8KpAfAatG4qTvZflFHuewUBX6/preview"}}]
//   return (
//     <Grid minH={'90vh'} templateColumns={'1fr ,3fr 1fr'}>
// <Box mb={5} >
// <iframe height={'100%'} width={'60%'}  controls controlsList='nodownload' src='https://drive.google.com/file/d/1quX6YAb8KpAfAatG4qTvZflFHuewUBX6/preview'></iframe>
// <Heading m={4} children={`#${lecturenumber+1} ${lectures[lecturenumber].title}`}></Heading>
// <Heading size={'lg'} children={lectures[lecturenumber].description} mt={'4'}></Heading>
// <Text ></Text>
// </Box>
// <VStack>
//     {
//         lectures.map((item,index)=>(

//             <button onClick={()=>setLecturenumber(index)} key={item._id} style={{width:'100%',padding:'10px',marginBottom:'5px', textAlign:'center'}}>
//                 <Text>#{index+1}{item.title}</Text>
//             </button>
//         ))
//     }
// </VStack>
//     </Grid>
//   )
// }

// export default Coursepage

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
              <Text>#{index + 1} {lecture?.title}</Text>
            </Button>
          ))}
        </VStack>
        <Box>
          <video
            height="400px"
            width="80%"
            src={lectures[lectureNumber]?.video?.url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></video>
          <Heading mt={4}>#{lectureNumber + 1} {lectures[lectureNumber]?.title}</Heading>
          <Text mt={2}>{lectures[lectureNumber]?.description}</Text>
        </Box>
      </Grid>
    </Container>
  );
};

export default CoursePage;
