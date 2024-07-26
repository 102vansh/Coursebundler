import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import './home.css'
import viedeo from "../assests/viedeo.mov"
import { Link } from 'react-router-dom'
import { Button, Image, Text } from '@chakra-ui/react'
import { CgGoogle, CgYoutube } from 'react-icons/cg'
import { SiCoursera, SiUdemy } from 'react-icons/si'
import { DiAws } from 'react-icons/di'
const Home = () => {
  return (
    <section className='container'>
        <Stack direction={["column", "row"]} height={'100%'} justifyContent={['center', "space-between"]} alignItems={['center']} spacing={["17", "60"]}>

<VStack width={"full"} alignItems={["center", "flex-end"]} >
<Heading children="LEARN FROM THE EXPERT" size={"2xl"}></Heading>
<Text fontFamily={'cursive'} children="Find valuable and easy way to learn"></Text>
<Link to="/courses">
<Button size={"lg"} colorScheme={'yellow'}>Explore</Button>
</Link>
</VStack>

<Image className='vector' src={'https://img.freepik.com/premium-vector/student-with-laptop-education-studying-concept-vector-illustration-young-boy-studying-la_549515-475.jpg'} boxSize="md" objectFit="contain" />
        </Stack>
        <Box padding={'8'} bg={'blackalpha.100'}>
            <Heading children="Our Brands" textAlign={['center']} color={'yellow.500'} fontFamily={'body'} />
            <HStack className='brnds' justifyContent={['space-evenly']} marginTop={'4'}>
                <CgGoogle/>
                <CgYoutube/>
                <SiCoursera/>
                <SiUdemy/>
                <DiAws/>
            </HStack>
        </Box>
        <div className='cont'>
            <video autoPlay={true}  src={'https://cdn.pixabay.com/video/2023/04/15/159029-818026300_tiny.mp4'} controls controlsList='nodownload nofullscreen noremoteplayback' overflow={'hidden'}>

            </video>
        </div>
    </section>
  )
}

export default Home