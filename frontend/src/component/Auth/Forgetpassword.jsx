import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { Input } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { forgetpassword } from '../../redux/actions/profile'
const Forgetpassword = () => {
  const dispatch = useDispatch()
    const [email,setEmail]=useState("")
    const submithandler = (e) => {
        e.preventDefault()
        dispatch(forgetpassword(email))
        
    }
  return (
    <Container py={"16"} height={"90vh"}>
        <form onSubmit={submithandler}>
            <Heading textAlign={['center','left']} children='Reset Password' my={'16'} text-transform={'uppercase'}>

            </Heading>
            <VStack spacing={'8'}>
            <Input required id='email' placeholder='Enter Your Email Address' value={email} onChange={(e)=>setEmail(e.target.value)} focusBorderColor='yellow.500'></Input>
            <Button colorScheme={'yellow'} type='submit'>Send Reset Link</Button>
            </VStack>
        </form>
    </Container>
  )
}

export default Forgetpassword