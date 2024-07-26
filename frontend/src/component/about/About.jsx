import { Avatar, Button, Container, Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiSecurePaymentFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { Text } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
const Founder = () =>{
    return(
    <Stack direction={['column', 'row']} spacing={'24px'} padding={'24px'}>
        <VStack>
        <Avatar boxSize={[40,50]} src={'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} m={'auto'} />
        <Text children={'Co-founder'} />
        </VStack>
        <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
           <Heading children={'Vansh jain'} size={['md', 'lg']} />
           <Text mt={'6'} children={'Fullstack Devloper and a teacher. Our Mission is ti Provide a Quality Education'}></Text>
        </VStack>
    </Stack>
    )
}
const TandC = ({termsAndCondition}) => {
    return (
        <Box h='sm' p={'4'} overflowY={'scroll'}>
            <Heading size={'sm'} children={'Terms and Condition'} />
            <Text fontfamily={'sans-serif'} textAlign={['center', 'left']} children={termsAndCondition} />
            <Heading size={'sm'} children={'Refund and Cancellations only in 7 days'} />
        </Box>
    )
}
const Viedeoplayer = () => {
    return(
    <Box>
        <video width={'100%'}  autoPlay loop src={'https://cdn.pixabay.com/video/2021/03/31/69625-531621058_tiny.mp4'}></video>
    </Box>
    )
}
const About = () => {

  return (
    <Container maxW={'container.lg'} boxShadow={'lg'} padding={'20px'}>
    <Heading children={'About us'} textAlign={'center'}/>
    <Founder/>
    <Stack
    direction={['column', 'row']} alignItems={'center'} m={8}>
        <Text>
            We are Viedeo sTreaming platform some premimum coureses are avialavle
        </Text>
        <Link to={'/subscribe'}><Button colorScheme={'yellow'}>Suscribe</Button></Link>
    </Stack>
    
    <Viedeoplayer />
<TandC termsAndCondition={'termsandcondition'}/>
    <HStack m={8} padding={'8px'}>
        <RiSecurePaymentFill />
        <Heading size={'sm'} textTransform={'uppercase'} children={'Payment is  Secure by razorpay'} />
    </HStack>
    </Container>
  )
}



export default About