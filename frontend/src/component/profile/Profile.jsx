// // // src/ProfilePage.js
// // import React from 'react';
// // import {
// //   Box,
// //   Avatar,
// //   Heading,
// //   Text,
// //   VStack,
// //   HStack,
// //   Divider,
// //   Container,
// //   Button,
// // } from '@chakra-ui/react';
// // import { Link } from 'react-router-dom';

// // const Profile = () => {
// //   // Example user data
// //   const user = {
// //     name: 'John Doe',
// //     email: 'john.doe@example.com',
// //     bio: 'Full Stack Developer',
// //     createdAt: String(new Date()),
// //     avatarUrl: 'https://bit.ly/dan-abramov',
// //     role: 'user',
// //     subscription:{
// //         status:'active',
// //     },
// //   };

// //   return (
// //     <Container maxW="container.md" py={8}>
// //       <VStack spacing={6} alignItems="center">
// //         <Avatar size="2xl" name={user.name} src={user.avatarUrl} />
// //         <Heading>{user.name}</Heading>
// //         <Text color="gray.500">{user.email}</Text>
// //         <Divider />
// //         <Box p={4}  borderRadius="md" w="100%">
// //           <Text>{user.bio}</Text>
// //           <HStack>
// //             <Text color="gray.500">Created at: {user.createdAt}</Text>
// //          {user.role !='admin' && <HStack>
// //             <Text children={'Subscription'} fontWeight={'bold'} />
// //             {user.subscription.status == 'active' ? <Button colorScheme={'red.500'}>Cancel Subscription</Button>  : <Link to={'/subscribe'}><Button colorScheme='yellow'>Subscribe</Button> </Link> }
// //          </HStack>}   
// //           </HStack>
// //         </Box>
// //       </VStack>
// //     </Container>
// //   );
// // };

// // export default Profile;

// import React from 'react';
// import {
//   Box,
//   Avatar,
//   Heading,
//   Text,
//   VStack,
//   HStack,
//   Divider,
//   Container,
//   Button,
//   Stack,
//   Modal,
//   useDisclosure,
// } from '@chakra-ui/react';
// import { Link } from 'react-router-dom';
// import { Image } from '@chakra-ui/react';
// import {RiDeleteBin7Fill} from 'react-icons/ri'
// import { fileuploadcss } from '../Auth/Register';
// import { ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
// import { ModalFooter } from '@chakra-ui/react';
// const Profile = () => {
//   // Example user data
//   const user = {
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     bio: 'Full Stack Developer',
//     createdAt: new Date().toLocaleString(),
//     avatarUrl: 'https://bit.ly/dan-abramov',
//     role: 'user',
//     subscription: {
//       status: 'inactive',
//     },
//     playlist:[{
//         course:'course 1',
//         poster:' https://bit.ly/dan-abramov',

//     }]
//   };
// const removefromplaylist=(id)=>{
//     console.log(id)
// }
// const changeimage=({isOpen,onClose,changeimgsubmithandler})=>{
//     const[image,setimage] = useState('')
//     const[imgprev,setimgprev] = useState('')
// const file = e.target.files[0];
// const reader = new FileReader();    
// reader.readAsDataURL(file);
// reader.onload = () => {
//   console.log(reader.result)
// }
// const changeimgsubmithandler=(e,image)=>{
//     e.preventDefault()

// }
// const {isOpen,onClose,onOpen} = useDisclosure()

// }
//   return (
//     <Container maxW="container.md" py={8}>
//       <VStack spacing={6} alignItems="center">
//         <Avatar size="2xl" name={user.name} src={user.avatarUrl} />
//         <Button colorScheme={'yellow'} onClick={onOpen}>Change Profile Photo</Button>
//         <Heading>{user.name}</Heading>
//         <Text color="gray.500">{user.email}</Text>
//         <Divider />
//         <Box p={4} borderRadius="md" w="100%" >
//           <Text mb={4}>{user.bio}</Text>
//           <HStack justifyContent="space-between" w="100%">
//             <Text color="gray.500">Created at: {user.createdAt}</Text>
//             {user.role !== 'admin' && (
//               <HStack spacing={4}>
//                 <Text fontWeight="bold">Subscription:</Text>
//                 {user.subscription.status === 'active' ? (
//                   <Button colorScheme="red">Cancel Subscription</Button>
//                 ) : (
//                   <Link to="/subscribe">
//                     <Button colorScheme="yellow">Subscribe</Button>
//                   </Link>
//                 )}
//               </HStack>
//             )}
//           </HStack>
//         </Box>
//         <Stack direction={['column', 'row']} alignItems="center" spacing={4}>
//         <Link to={'/updateprofile'}><Button colorScheme={'yellow'}>Update Profile</Button></Link>

//         <Link to={'/changepassword'}><Button colorScheme={'yellow'}>Change Password</Button></Link>

//         </Stack>

//       </VStack>
//       <Heading children="Playlist" size={'lg'} my={8}></Heading>
//       {user.playlist.length > 0 && (
//         <Stack
//           direction={['column', 'row']}
//           alignItems="center"
//           spacing={4}
//           p={4}
//           flexWrap="wrap"
//           >

// {user.playlist.map((item)=>(
//     <VStack w={48} m={2} key={item.course}>
//     <Image boxSize="full" src={item.poster} objectFit="contain" />
//     <HStack>
//     <Link to={`/course/${item.course}`}>
//     <Button colorScheme={'yellow'}>Watch Now</Button>
//     </Link>
//     <Button onClick={()=>removefromplaylist(item.course)} colorScheme='red' ><RiDeleteBin7Fill/> </Button>
//     </HStack>

//     </VStack>
// ))}

//           </Stack>
//       )}
//       <Changephoto isOpen={isOpen} onClose={onClose} changeimgsubmithandler={changeimgsubmithandler}/>
//     </Container>
//   );
// };

// export default Profile;

// const Changephoto=({})=>{
//     return(
// <Modal isOpen={isOpen } onClose={onClose}>
//     <ModalOverlay backdropFilter="blur(10px)" />

//     <ModalContent>
//       <ModalHeader>Change Profile Photo</ModalHeader>
//       <ModalCloseButton />
//       <ModalBody>
//         <Container>
//             <form onSubmit={(e)=>changeimgsubmithandler(e)}>
//                 <VStack spacing={4} align={'stretch'}>
//                {imgprev &&   <Avatar boxSize={32} src="https://bit.ly/dan-abramov" />}
//                     <Input type={'file'} css={{'&::file-selector-button':fileuploadcss}} onchange={changeimage} />
//                     <Button colorScheme={'yellow'} type='submit'>Change Profile Photo</Button>
//                 </VStack>
//             </form>
//         </Container>
//       </ModalBody>
//     </ModalContent>
//   </Modal>
//     )
// }

import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Container,
  Button,
  Stack,
  Modal,
  useDisclosure,
  Image,
  Input,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileuploadcss } from '../Auth/Register';
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { profilepicture, removefromPlaylist } from '../../redux/actions/profile';
import { asyncThunkCreator } from '@reduxjs/toolkit';
import { cancelsubscription, getmyprofile } from '../../redux/actions/user';

const Profile = ({user}) => {
  // Example user data
  // const user = {
  //   name: 'John Doe',
  //   email: 'john.doe@example.com',
  //   bio: 'Full Stack Developer',
  //   createdAt: new Date().toLocaleString(),
  //   avatarUrl: 'https://bit.ly/dan-abramov',
  //   role: 'user',
  //   subscription: {
  //     status: 'inactive',
  //   },
  //   playlist: [
  //     {
  //       course: 'course 1',
  //       poster: 'https://bit.ly/dan-abramov',
  //     },
  //   ],
  // };
const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [avatar, setImage] = useState('');
  const [imgPrev, setImgPrev] = useState('');

  const changeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgPrev(reader.result);
      setImage(reader.result);
    };
  };

  const changeImgSubmitHandler = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.append('file', avatar);
    
dispatch(profilepicture(myform))
    // e.preventDefault();
    // console.log(avatar);
    // const filereader = new FileReader();
    // filereader.readAsDataURL(avatar);
    // filereader.onload = () => {
    //   setImgPrev(filereader.result);
    //   setImage(filereader.result);
    // };
    // Add logic to handle image change submission
  };

  const removeFromPlaylist =async(id) => {
    console.log(id);
   await  dispatch(removefromPlaylist(id)) 
   dispatch(getmyprofile())
    // Add logic to handle removing item from playlist
  };
const cancelsubs=async(id)=>{
  console.log('cancel')
 await  dispatch(cancelsubscription(id))
 dispatch(getmyprofile())
}
  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} alignItems="center">
        <Avatar size="2xl" name={user?.name} src={user?.avatar?.url} />
        <Button colorScheme="yellow" onClick={onOpen}>
          Change Profile Photo
        </Button>
        <Heading>{user?.name}</Heading>
        <Text color="gray.500">{user?.email}</Text>
        <Divider />
        <Box p={4} borderRadius="md" w="100%" >
          <Text mb={4}>{user?.bio}</Text>
          <HStack justifyContent="space-between" w="100%">
            <Text color="gray.500">Created at: {user?.createdAt}</Text>
            {user?.role !== 'admin' && (
              <HStack spacing={4}>
                <Text fontWeight="bold">Subscription:</Text>
                {user?.subscription?.status === 'active' ? (
                  <Button onClick={cancelsubs} colorScheme="red">Cancel Subscription</Button>
                ) : (
                  <Link to="/subscribe">
                    <Button colorScheme="yellow">Subscribe</Button>
                  </Link>
                )}
              </HStack>
            )}
          </HStack>
        </Box>
        <Stack direction={['column', 'row']} alignItems="center" spacing={4}>
          <Link to="/updateprofile">
            <Button colorScheme="yellow">Update Profile</Button>
          </Link>

          <Link to="/changepassword">
            <Button colorScheme="yellow">Change Password</Button>
          </Link>
        </Stack>
      </VStack>
      <Heading size="lg" my={8}>
        Playlist
      </Heading>
      {user?.playlist.length > 0 && (
        <Stack boxShadow={'dark-lg'}
          direction={['column', 'row']}
          alignItems="center"
          spacing={4}
          p={4}
          flexWrap="wrap"
        >
          {user?.playlist.map((item) => (
            <VStack w={48} m={2} key={item?.course} >
              <Image boxSize="full" src={item?.poster} objectFit="contain" />
              <HStack>
                <Link to={`/course/${item.course}`}>
                  <Button colorScheme="yellow">Watch Now</Button>
                </Link>
                <Button
                  onClick={() => removeFromPlaylist(item?.course)}
                  colorScheme="red"
                >
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}
      <ChangePhotoModal
        isOpen={isOpen}
        onClose={onClose}
        imgPrev={imgPrev}
        changeImage={changeImage}
        changeImgSubmitHandler={changeImgSubmitHandler}
      />
    </Container>
  );
};

const ChangePhotoModal = ({ isOpen, onClose, imgPrev, changeImage, changeImgSubmitHandler }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>Change Profile Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={changeImgSubmitHandler}>
              <VStack spacing={4} align="stretch">
                {imgPrev && <Avatar boxSize={32} src={imgPrev} />}
                <Input type="file" css={fileuploadcss} onChange={changeImage} />
                <Button colorScheme="yellow" type="submit">
                  Change Profile Photo
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Profile;
