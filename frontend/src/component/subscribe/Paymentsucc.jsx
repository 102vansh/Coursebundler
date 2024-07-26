import { Box, Heading,  VStack } from '@chakra-ui/react'
import React from 'react'
import { Container } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { Link,useSearchParams } from 'react-router-dom'

export const Paymentsucc = () => {
  const search = useSearchParams()[0].get('reference')
  console.log(search)
  return (
    <Container hieght="90vh" p="16">
      <Heading textAlign={'center'} mb={'8'}>You have Pro Pack</Heading>
      <VStack mb={'36'} boxShadow={'lg'} borderRadius={'lg'} alignItems={'center'}>
        <Box w={'full'} bg={'yellow.400'} p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text color={'black'}>Payment Success</Text>
        </Box>
        <Box p={'4'}>
          <VStack textAlign={'center'} px={'8'} mt={'4'}>
            <Text>
              Congratulation you have a Pro Pack.You have access of Premium
            </Text>
<Heading size={'lg'} children={'Premium'} ><RiCheckboxCircleFill/></Heading>
          </VStack>

        </Box>
        <Link to={'/profile'} variant={'ghost'} color={'yellow.500'}>Go to Profile</Link><Link to={'/'} variant={'ghost'} color={'yellow.500'}></Link>
        <Heading size={'sm'} mb={'5'} > Reference: {search}</Heading>
      </VStack>
    </Container>
  )
}
