import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../redux/actions/user'

const Login = () => {
    const[email,setEmail]=React.useState("")
    const[password,setPassword]=React.useState("")
    const dispatch = useDispatch()

    const submithandler=(e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }
  return (
    <Container>
      <VStack my={"16"} padding={"16"} boxShadow={"lg"} borderRadius={"lg"}>
        <Heading children="Welcome to CourseBundler"></Heading>
        <form style={{width:"100%"}} onSubmit={submithandler}>
        <Box my={4}>
        <FormLabel htmlFor='email' children="Email Address">
            <Input required id='email' placeholder='Enter Your Email Address' value={email} onChange={(e)=>setEmail(e.target.value)} focusBorderColor='yellow.500'></Input>
        </FormLabel>
        </Box>
        <Box my={4}>
        <FormLabel htmlFor='password' children="Password">
            <Input type='password' required id='password' placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)} focusBorderColor='yellow.500'></Input>
        </FormLabel>
        </Box>
        <Box>
            <Link to="/forgotpassword"><Button fontSize={"sm"} colorScheme="yellow" variant={"link"} >Forget Password?</Button></Link>

        </Box>
        <Button my={4} colorScheme='yellow' type='submit'>Login</Button>
        <Box my={'4'}>New User? <Link to="/register"><Button colorScheme='yellow' variant={"link"}>Sign Up</Button></Link></Box>
        </form>
      </VStack>
    </Container>
  )
}

export default Login