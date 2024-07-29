import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Box, FormLabel, Input } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { useRef } from 'react'
import toast from 'react-hot-toast'

const Contact = () => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [message, setMessage] = React.useState('')
    const form = useRef();
    const[loading,setloading] = useState(false)

    const handlesubmit = (e) => {
      setloading(true)
      e.preventDefault();
      console.log("Form Submitted");
  
      emailjs
        .sendForm(
          'service_b3pqibe', // Your service ID
          'template_dg3jzfa', // Your template ID
          form.current,
          'jf56wdRYgXgY1ZNDd' // Your user ID
        )
        .then(
          (result) => {
            console.log(result.text);
            toast.success('Message sent successfully');
            form.current.reset();
            setloading(false)
          },
          (error) => {
            console.log(error.text);
          toast.error('Message not sent');
          setloading(false)
          }
        );
    };
  

  return (
    <Container height={'90vh'}>
    <VStack justifyContent={'center'} height={'full'}>
        <Heading children="Contact Us" />
        <form onSubmit={handlesubmit} ref={form}>
        <Box my={4}>
        <FormLabel htmlFor='name' children="Name">
            <Input type='text' required id='name' placeholder='Enter Your Name' value={name} onChange={(e)=>setName(e.target.value)} focusBorderColor='yellow.500'></Input>
        </FormLabel>
        </Box>
        <Box my={4}>
        <FormLabel htmlFor='email' children="Email Address">
            <Input type='email' required id='email' placeholder='Enter Your Email Address' value={email} onChange={(e)=>setEmail(e.target.value)} focusBorderColor='yellow.500'></Input>
        </FormLabel>
        </Box>
        <Box my={4}>
        <FormLabel htmlFor='message' children="message">
            <Input required id='message' placeholder='Enter Message' value={message} onChange={(e)=>setMessage(e.target.value)} focusBorderColor='yellow.500' type='text'></Input>
        </FormLabel>
        </Box>
        <Button my={4} colorScheme='yellow' type='submit'>{loading ? 'Sending...' : 'Send Message'}</Button>
        <Box my={4}>
        Request for a course ?{' '}
        <Link to={'/request'}>
        <Button colorScheme='yellow' variant='link'>Click Here</Button>{' '}
        </Link>
        </Box>
         </form>
    </VStack>

    </Container>
  )
}

export default Contact