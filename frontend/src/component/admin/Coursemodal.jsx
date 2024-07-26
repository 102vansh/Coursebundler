
// import { Box, Grid, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, VStack, Text, Button } from '@chakra-ui/react'
// import React from 'react'
// import { RiDeleteBin7Fill } from 'react-icons/ri'

// const CourseModal = ({ isOpen, onClose, deletebutton, id, courseTitle, lectures = [1,2,3,4,5], addlecture }) => {
//   const [title, setTitle] = React.useState('')
//   const [description, setDescription] = React.useState('')
//   const [video, setVideo] = React.useState('')
//   const [videoPrev, setVideoPrev] = React.useState('')

//   const changeVideoHandler = (e) => {
//     const file = e.target.files[0]
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onloadend = () => {
//       setVideoPrev(reader.result)
//       setVideo(file)
//     }
//   }

//   const handleClose = () => {
//     setTitle('')
//     setDescription('')
//     setVideo('')
//     setVideoPrev('')
//     onClose()
//   }

//   return (
//     <Modal isOpen={isOpen} onClose={handleClose} scrollBehavior='outside'>
//       <ModalOverlay />
//       <ModalContent maxW="1000px">
//         <ModalHeader>{courseTitle}</ModalHeader>
//         <ModalCloseButton onClick={onClose} />
//         <ModalBody p={6}>
//           <Grid templateColumns={["1fr", "3fr 1fr"]} gap={6}>
//             <Box>
//               <Box mb={6}>
//                 <Heading size="lg">{courseTitle}</Heading>
//                 <Heading size="md" opacity={0.6}>#{id}</Heading>
//               </Box>
//               <Heading size="md" mb={4}>Lectures</Heading>
//               {lectures.map((lecture, index) => (
//                 <VideoCard 
//                   key={lecture.id} 
//                   title={lecture.title} 
//                   description={lecture.description} 
//                   num={index + 1} 
//                   lectureid={lecture.id} 
//                   courseid={id} 
//                   deletebutton={deletebutton} 
//                 />
//               ))}
//             </Box>
//             <Box>
//               <form onSubmit={(e) => addlecture(e, id, title, description, video)}>
//                 <VStack spacing={4}>
//                   <Heading size="md" textTransform="uppercase">Add Lecture</Heading>
//                   <Input 
//                     focusBorderColor="purple.500" 
//                     value={title} 
//                     onChange={(e) => setTitle(e.target.value)} 
//                     placeholder="Title" 
//                     required 
//                   />
//                   <Input 
//                     focusBorderColor="purple.500" 
//                     value={description} 
//                     onChange={(e) => setDescription(e.target.value)} 
//                     placeholder="Description" 
//                     required 
//                   />
//                   <Input 
//                     accept="video/*" 
//                     focusBorderColor="purple.500" 
//                     onChange={changeVideoHandler} 
//                     type="file" 
//                     required 
//                   />
//                   {videoPrev && <video src={videoPrev} controls style={{ width: '100%', marginTop: '16px' }} />}
//                   <Button w="full" colorScheme="purple" type="submit">Upload</Button>
//                 </VStack>
//               </form>
//             </Box>
//           </Grid>
//         </ModalBody>
//         <ModalFooter>
//           <Button onClick={onClose}>Close</Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   )
// }

// export default CourseModal

// function VideoCard({ title, description, num, lectureid, courseid, deletebutton }) {
//   return (
//     <Stack 
//       justifyContent={['flex-start', 'space-between']} 
//       direction={["column", "row"]} 
//       boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" 
//       p={4} 
//       borderRadius="lg" 
//       mb={4}
//     >
//       <Box>
//         <Heading size="sm">#{num} {title}</Heading>
//         <Text>{description}</Text>
//       </Box>
//       <Button onClick={() => deletebutton(courseid, lectureid)} colorScheme="red">
//         <RiDeleteBin7Fill />
//       </Button>
//     </Stack>
//   )
// }
import { Box, Grid, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, VStack, Text, Button } from '@chakra-ui/react'
import React from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'

const CourseModal = ({ isOpen, onClose, deletebutton, id, courseTitle, lectures, addlecture }) => {
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [video, setVideo] = React.useState('')
  const [videoPrev, setVideoPrev] = React.useState('')

  const changeVideoHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setVideoPrev(reader.result)
      setVideo(file)
    }
  }

  const handleClose = () => {
    setTitle('')
    setDescription('')
    setVideo('')
    setVideoPrev('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} scrollBehavior='outside'>
      <ModalOverlay />
      <ModalContent maxW="800px">
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody p={6}>
          <Grid templateColumns={["1fr", "2fr 1fr"]} gap={6}>
            <Box>
              <Box mb={6}>
                <Heading size="lg">{courseTitle}</Heading>
                <Heading size="md" opacity={0.6}>#{id}</Heading>
              </Box>
              <Heading size="md" mb={4}>Lectures</Heading>
              {lectures.map((lecture, index) => (
                <VideoCard 
                  key={index} 
                  title={lecture.title} 
                  description={lecture.description} 
                  num={index + 1} 
                  lectureid={lecture._id} 
                  courseid={id} 
                  deletebutton={deletebutton} 
                />
              ))}
            </Box>
            <Box>
              <form onSubmit={(e) => addlecture(e, id, title, description, video)}>
                <VStack spacing={4}>
                  <Heading size="md" textTransform="uppercase">Add Lecture</Heading>
                  <Input 
                    focusBorderColor="purple.500" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Title" 
                    required 
                  />
                  <Input 
                    focusBorderColor="purple.500" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Description" 
                    required 
                  />
                  <Input 
                    accept="video/*" 
                    focusBorderColor="purple.500" 
                    onChange={changeVideoHandler} 
                    type="file" 
                    required 
                  />
                  {videoPrev && <video src={videoPrev} controls style={{ width: '100%', marginTop: '16px' }} />}
                  <Button w="full" colorScheme="purple" type="submit">Upload</Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CourseModal

function VideoCard({ title, description, num, lectureid, courseid, deletebutton }) {
  return (
    <Stack 
      justifyContent={['flex-start', 'space-between']} 
      direction={["column", "row"]} 
      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" 
      p={4} 
      borderRadius="lg" 
      mb={4}
    >
      <Box>
        <Heading size="sm">#{num} {title}</Heading>
        <Text>{description}</Text>
      </Box>
      <Button onClick={() => deletebutton(courseid, lectureid)} colorScheme="red">
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  )
}
