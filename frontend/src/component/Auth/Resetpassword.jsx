import { Button } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Box, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { resetpassword } from '../../redux/actions/profile'
const Resetpassword = () => {
  const dispatch = useDispatch()
    const[password,setPassword]=useState("")
const params = useParams()
console.log(params.token)
const submithandler = (e) => {
    e.preventDefault()
    dispatch(resetpassword({password,token:params.token}))
    

}
  return (
    <Container>
      <VStack my={"16"} padding={"16"} boxShadow={"lg"} borderRadius={"lg"}>
        <Heading children="Forgot Password"></Heading>
        <form style={{width:"100%"}} onSubmit={submithandler}>
        <Box my={4}>
        <FormLabel htmlFor='password' children="Password">
            <Input required id='password'type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)} focusBorderColor='yellow.500'></Input>
        </FormLabel>
        </Box>
        
        <Button my={4} colorScheme='yellow' >Set New Password</Button>
        </form>
      </VStack>
    </Container>
  )
}

export default Resetpassword