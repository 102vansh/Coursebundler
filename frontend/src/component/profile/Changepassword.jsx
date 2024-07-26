import { Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { Input, Container } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { changepassword } from '../../redux/actions/profile'

const Changepassword = () => {
  const dispatch = useDispatch()
    const[oldPassword,setoldPassword]=React.useState("")
    const[newPassword,setnewPassword]=React.useState("")
    const submithandler=async(e)=>{
        e.preventDefault()
        dispatch(changepassword(oldPassword,newPassword))

    }
  return (
    <Container py={10} minH="90vh">
        <form onSubmit={submithandler} >
            <Heading mt={20} children="Change Password" textAlign={"center"} textTransform={"uppercase"}></Heading>
            <VStack mt={25} spacing={3}>
            <Input required type='password' id='password' placeholder='Enter Your oldPassword' value={oldPassword} onChange={(e)=>setoldPassword(e.target.value)} focusBorderColor='yellow.500'></Input>
            <Input required id='password' placeholder='Enter Your newPassword' value={newPassword} onChange={(e)=>setnewPassword(e.target.value)} focusBorderColor='yellow.500' type='password'></Input>
            <Button mt={15} bg="yellow.300" type='submit'>Change Password</Button>
            </VStack>
        </form>
    </Container>
  )
}

export default Changepassword