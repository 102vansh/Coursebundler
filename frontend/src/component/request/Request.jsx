// // import React from 'react'
// // import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
// // import { Link } from 'react-router-dom'
// // import emailjs from '@emailjs/browser';
// // import { useRef } from 'react';
// // import toast from 'react-hot-toast';
// // const Request = () => {
  
// //     const [name, setName] = React.useState('')
// //     const [email, setEmail] = React.useState('')
// //     const [course, setCourse] = React.useState('')
// //     const form = useRef();

// //     const handlesubmit = (e) => {
// //       e.preventDefault();
// //       console.log("Form Submitted");
  
// //       emailjs
// //         .sendForm(
// //           'service_b3pqibe', // Your service ID
// //           'template_dg3jzfa', // Your template ID
// //           form.current,
// //           'jf56wdRYgXgY1ZNDd' // Your user ID
// //         )
// //         .then(
// //           (result) => {
// //             console.log(result.text);
// //             toast.success('Message sent successfully');
// //             form.current.reset();
// //           },
// //           (error) => {
// //             console.log(error.text);
// //           toast.error('Message not sent');
// //           }
// //         );
// //     };
  
// //   return (
// //     <Container height={'90vh'}>
// //     <VStack justifyContent={'center'} height={'full'}>
// //         <Heading children="Request New Course" />
// //         <form onSubmit={handlesubmit} ref = {form}>
// //         <Box my={4}>
// //         <FormLabel htmlFor='name' children="Name">
// //             <Input type='text' required id='name' placeholder='Enter Your Name' value={name} onChange={(e)=>setName(e.target.value)} focusBorderColor='yellow.500'></Input>
// //         </FormLabel>
// //         </Box>
// //         <Box my={4}>
// //         <FormLabel htmlFor='email' children="Email Address">
// //             <Input type='email' required id='email' placeholder='Enter Your Email Address' value={email} onChange={(e)=>setEmail(e.target.value)} focusBorderColor='yellow.500'></Input>
// //         </FormLabel>
// //         </Box>
// //         <Box my={4}>
// //         <FormLabel htmlFor='Course' children="message">
// //             <Input required id='Course' placeholder='Enter Message' value={course} onChange={(e)=>setCourse(e.target.value)} focusBorderColor='yellow.500' type='text'></Input>
// //         </FormLabel>
// //         </Box>
// //         <Button my={4} colorScheme='yellow' type='submit'>Send Message</Button>
// //         <Box my={4}>
// //         See Avialabe Courses ?{' '}
// //         <Link to={'/courses'}>
// //         <Button colorScheme='yellow' variant='link'>Click Here</Button>{' '}
// //         </Link>
// //         </Box>
// //          </form>
// //     </VStack>

// //     </Container>
// //   )
// // }

// // export default Request




import React, { useRef, useState } from 'react';
import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const Request = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');
    const form = useRef();
    const[loading,setLoading]=useState(false)

    const handlesubmit = (e) => {
        setLoading(true)
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
                    console.log('EmailJS Result:', result);
                    toast.success('Message sent successfully');
                    form.current.reset();
                    setName('');
                    setEmail('');
                    setCourse('');
                    setLoading(false)
                },
                (error) => {
                    console.error('EmailJS Error:', error);
                    toast.error('Message not sent');
                    setLoading(false)
                }
            );
    };

    return (
        <Container height={'90vh'}>
            <VStack justifyContent={'center'} height={'full'}>
                <Heading>Request New Course</Heading>
                <form onSubmit={handlesubmit} ref={form}>
                    <Box my={4}>
                        <FormLabel htmlFor='name'>Name</FormLabel>
                        <Input
                            type='text'
                            required
                            id='name'
                            placeholder='Enter Your Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            focusBorderColor='yellow.500'
                        />
                    </Box>
                    <Box my={4}>
                        <FormLabel htmlFor='email'>Email Address</FormLabel>
                        <Input
                            type='email'
                            required
                            id='email'
                            placeholder='Enter Your Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            focusBorderColor='yellow.500'
                        />
                    </Box>
                    <Box my={4}>
                        <FormLabel htmlFor='course'>Message</FormLabel>
                        <Input
                            required
                            id='course'
                            placeholder='Enter Message'
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            focusBorderColor='yellow.500'
                            type='text'
                        />
                    </Box>
                    <Button my={4} colorScheme='yellow' type='submit'>{loading ? 'Sending...' : 'Send Message'}</Button>
                    <Box my={4}>
                        See Available Courses?{' '}
                        <Link to={'/courses'}>
                            <Button colorScheme='yellow' variant='link'>Click Here</Button>{' '}
                        </Link>
                    </Box>
                </form>
            </VStack>
        </Container>
    );
}

export default Request;

