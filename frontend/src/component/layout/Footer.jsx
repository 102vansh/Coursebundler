import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import { TiSocialGithub, TiSocialInstagram, TiSocialYoutubeCircular } from 'react-icons/ti'

const Footer = () => {
  return (
    <Box padding={'4'} bg={'blackAlpha.900'} minH={'10vh'} >
    <Stack direction={['column', 'row']}>
    <VStack alignItems={['center', 'flex-start']} width={'full'}>
<Heading children="All Rights Reserved" color={'whiteAlpha.700'} fontSize={'lg'} />
<Heading children="@Vansh jain" color={'yellow.400'} fontSize={'md'} />
    </VStack>
    <HStack spacing={[2, 10]}   justifyContent={['center', 'flex-end']} color={'whiteAlpha.700'} fontSize='40'>
<a href=''><TiSocialYoutubeCircular/></a>
<a href=''><TiSocialInstagram/></a>
<a href=''><TiSocialGithub/></a>
    </HStack>

    </Stack>

    </Box>
  )
}

export default Footer