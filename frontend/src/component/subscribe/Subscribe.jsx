// import { Box, Heading } from '@chakra-ui/react'
// import React from 'react'
// import { Button, Container, Text, VStack } from '@chakra-ui/react'


// const Subscribe = () => {
//   return (
// <Container>

// <Heading children='welcome' my={'8'}></Heading>
// <VStack boxshadow={'lg'} alignitems={'stretch'} borderRadius={'lg'} spacing={'8'}>

//     <Box bg={'yellow.200'} p={'4'} css={{borderRadius:'8px 8px 0 0'}}>
// <Text color ={'black'} children={'Pro Pack - $299'}></Text>
//     </Box>
//     <Box p={'4'}>
//       <VStack textAlign={'center'} px='8' mt={'4'} spacing='8'>
//         <Text  children={'Join Pro Pack and Get Access to all Content'}/>
//       </VStack>
//       <Button w='full'>Buy Now</Button>
//     </Box>
//     <Box bg='blackAlpha.600' p={'4'} css={{borderRadius:'0 0 8px 8px'}}>
//     <Heading color={'white'} children={'Pro Pack'} size={'100% refund'}></Heading>
// <Text fontsize={'sm'} color={'white'} children={'Terms and conditions apply'}></Text>
//     </Box>

    
// </VStack>
// </Container>

//   )
// }

// export default Subscribe
import { Box, Heading, Button, Container, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buysubscription } from '../../redux/actions/user';
import { userReducer } from '../../redux/reducer/userReducer';

const Subscribe = ({user}) => {
  const dispatch = useDispatch();
  const[key,setKey] = useState("")
  const {loading,error,subscriptionId} = useSelector((state) => state.subscription);
  const buynow = async() => {
const {data} =  await axios.get(`http://localhost:3001/api/v1/payment/getkey`)
setKey(data.key)
dispatch(buysubscription())
  }
  useEffect(() => {
    if(subscriptionId){
      const openpopup = async() => {
        const option = {
          key,
          name: "coursebundler",
          description: "Get access to All Premium Content",
          
          subscription_id: subscriptionId,

          callback_url:`http://localhost:3001/api/v1/payment/verification`,

          prefill: {
            name:user.name,
            email:user.email,

          },
          theme: {
            color: "#FFC800",
          }
      }
        const razor = new window.Razorpay(option);
        razor.open();
    }
    openpopup();
  }
    
  }, [dispatch,user.name,user.email,subscriptionId,key]);
  return (
    <Container>
      <Heading children="Welcome" my={8} mt={16} />
      <VStack boxShadow="lg" alignItems="stretch" borderRadius="lg" spacing={8}>
        <Box bg="yellow.200" p={4} borderRadius="8px 8px 0 0">
          <Text color="black" children="Pro Pack - $999" />
        </Box>
        <Box p={4}>
          <VStack textAlign="center" px={8} mt={4} spacing={8}>
            <Text children="Join Pro Pack and Get Access to all Content" />
          </VStack>
          <Button w="full" mt={4} colorScheme="yellow" onClick={buynow}>
            Buy Now
          </Button>
        </Box>
        <Box bg="blackAlpha.600" p={4} borderRadius="0 0 8px 8px">
          <Heading color="white" size="md" children="100% Refund" />
          <Text fontSize="sm" color="white" children="Terms and conditions apply" />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
