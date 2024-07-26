import React from 'react'
import { Avatar, background, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registeruser } from '../../redux/actions/user'
export const fileuploadcss = {
    cursor:"pointer",
    marginLeft:"-5%",
    width:"100%",
    height:"100%",
    border:"none",
    opacity:0,
    backgroundColor:"white"
}
const fileupload = {
    "&::file-selector-button":fileuploadcss
       

    
}


const Register = () => {
  const dispatch = useDispatch()
  const[name,setName]=React.useState("")
    const[email,setEmail]=React.useState("")
    const[password,setPassword]=React.useState("")
    const[imageprev,setImageprev]=React.useState("")
const[avatar,setImage]=React.useState("")
    const changeimagehandler=(event)=>{
        const file=event.target.files[0]
        const reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onload=()=>{
            
                setImageprev(reader.result)
                setImage(file)
            
        }
    }

    const submithandler=(event)=>{
        event.preventDefault()
        const myform = new FormData()
        myform.append("name",name)
        myform.append("email",email)
        myform.append("password",password)
        myform.append("avatar",avatar)
        console.log(myform)
        dispatch(registeruser(myform))
    }

  return (
    <Container>
      <VStack my={"16"} padding={"16"} boxShadow={"lg"} borderRadius={"lg"}>
        <Heading textTransform={"uppercase"} children="Registeration"></Heading>
        <form style={{width:"100%"}} onSubmit={submithandler}>
        <Box my={4} display={"flex"} justifyContent={"center"}>
        <Avatar src={imageprev} size={'2xl'}></Avatar>
        </Box>
        <Box my={4}>
        <FormLabel htmlFor='name' children="Name">
            <Input required id='name' placeholder='Enter Your Name' value={name} onChange={(e)=>setName(e.target.value)} focusBorderColor='yellow.500'></Input>
        </FormLabel>
        </Box>
        <Box my={4}>
        <FormLabel htmlFor='email' children="Email Address">
            <Input required id='email' placeholder='Enter Your Email Address' value={email} onChange={(e)=>setEmail(e.target.value)} focusBorderColor='yellow.500'></Input>
        </FormLabel>
        </Box>
        <Box my={4}>
        <FormLabel htmlFor='password' children="Password">
            <Input required id='password' placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)} focusBorderColor='yellow.500'></Input>
        </FormLabel>
        </Box>
        <Box>
            <FormLabel htmlFor='choose Avatar' children="Choose Avatar">
              <input style={{
        display: 'block',
        width: '100%',
        padding: '8px',
        fontSize: '16px',
        color: '#555',
        // backgroundColor: '#fff',
        border: '2px solid yellow.500',
        borderRadius: '4px',
        cursor: 'pointer',
        outline: 'none',
      }} required id='choose Avatar' type={'file'} accept="image/*" focusBorderColor='yellow.500' css={fileupload} onChange={changeimagehandler} placeholder='choose Avatar'></input>  
            </FormLabel>
        </Box>
        
        <Button my={4} colorScheme='yellow' type='submit'>Signup</Button>
        <Box my={'4'}>Already have an account? <Link to="/login"><Button colorScheme='yellow' variant={"link"}>Login</Button></Link></Box>
        </form>
      </VStack>
    </Container>
  )
  
}

export default Register