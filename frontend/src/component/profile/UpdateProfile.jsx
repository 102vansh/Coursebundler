import React from 'react'
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateprofile } from '../../redux/actions/profile'
const UpdateProfile = () => {
const dispatch = useDispatch()
    const [name,setName]=useState("")
    const [email,setemail]=useState("")
    const submithandler = (e) => {
        e.preventDefault()
        dispatch(updateprofile(name,email))
    }
  return (
    <Container py={10} minH="90vh">
        <form onSubmit={submithandler}>
            <Heading mt={20} children="Update Profile" textAlign={"center"} textTransform={"uppercase"}></Heading>
            <VStack mt={10} spacing={3}>
            <Input  type='text' id='name' placeholder='Enter Your Name' value={name} onChange={(e)=>setName(e.target.value)} focusBorderColor='yellow.500'></Input>
            <Input  id='email' placeholder='Enter Your Email' value={email} onChange={(e)=>setemail(e.target.value)} focusBorderColor='yellow.500'></Input>
            <Button mt={15} bg="yellow.300" type='submit'>Profile Update</Button>
            </VStack>
        </form>
    </Container>
  )
}

export default UpdateProfile