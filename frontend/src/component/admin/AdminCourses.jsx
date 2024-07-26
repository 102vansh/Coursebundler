
// import React from 'react'
// import { Box, Grid, Heading, HStack, Table, TableContainer } from '@chakra-ui/react'
// import Sidebar from './Sidebar'
// import { useDisclosure } from '@chakra-ui/react'
// import { Button, Tbody, Td, Th, Thead, Tr, TableCaption } from '@chakra-ui/react'
// import { RiDeleteBin7Fill } from 'react-icons/ri'
// import Coursemodal from './Coursemodal'

// const AdminCourses = () => {
//     const courses = [
//         {
//             id: 1,
//             title: "Admin",
//             category: "admin@123",
            
//             poster: {
//                 url: "https://images.pexels.com/photos/9295809/pexels-photo-9295809.jpeg?auto=compress&cs=tinysrgb&dpr=20&h=750&w=1260"
//             },
//             createdBy: "Admin",
//             views: 10,
//             numofviedeos: 10
//         }
//     ]
//     const { isOpen, onOpen, onClose } = useDisclosure()

//     const coursedetail = (id) => {
//         console.log(id)
//         onOpen()
//     }

//     const deleteuser = (id) => {
//         console.log(id)
//     }
//     const deletelecture = ({courseid,lectureid}) => {
//         console.log(id)
//     }
//     const addlecture = ({e,courseid,title,description,video}) => {
//         console.log(id)
//     }

//     return (
//         <Grid
//             minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]}>
//             <Box p={["0", "16"]} overflowX={"auto"}>
//                 <Heading textAlign={"center"} children="All Users" my={"16"} textTransform={"uppercase"} />
//                 <TableContainer w={["100%", "full"]}>
//                     <Table variant={"simple"} colorScheme="blackAlpha" size={'lg'}>
//                         <TableCaption>All Available  Courses in Database in The database</TableCaption>
//                         <Thead>
//                             <Tr>
//                                 <Th>Id</Th>
//                                 <Th>Poster</Th>
//                                 <Th>Title</Th>
//                                 <Th>Category</Th>
//                                 <Th>Creator</Th>
//                                 <Th isNumeric>Views</Th>
//                                 <Th isNumeric>Lectures</Th>
//                                 <Th isNumeric>Action</Th>
//                             </Tr>
//                         </Thead>
//                         <Tbody>
//                             {courses.map((item) => (
//                                 <Row key={item.id} item={item} coursedetail={coursedetail} deleteuser={deleteuser} />
//                             ))}
//                         </Tbody>
//                     </Table>
//                 </TableContainer>
//                 <Coursemodal courseTitle={'React Basic'} isOpen={isOpen} onClose={onClose} deletebutton = {deletebutton} addlecture = {addlecture} id={'asd'}   />
//             </Box>
//             <Sidebar />
//         </Grid>
//     )
// }



// function Row({ item, coursedetail, deleteuser }) {
//     return (
//         <Tr>
//             <Td>{item.id}</Td>
//             <Td><img src={item.poster.url} alt={item.title} style={{ width: "100px" }} /></Td>
//             <Td>{item.title}</Td>
//             <Td>{item.category}</Td>
//             <Td>{item.createdBy}</Td>
//             <Td isNumeric>{item.views}</Td>
//             <Td isNumeric>{item.numofviedeos}</Td>

            
//             <Td isNumeric>
//                 <HStack justifyContent={"flex-end"}>
//                     <Button onClick={() => coursedetail(item.id)} variant={'outline'} color={'purple.500'}>Change Role</Button>
//                     <Button onClick={() => deleteuser(item.id)} variant={'outline'} color={'purple.500'}><RiDeleteBin7Fill /></Button>
//                 </HStack>
//             </Td>
//         </Tr>
//     )
// }


// export default AdminCourses

import React, { useEffect } from 'react'
import { Box, Grid, Heading, HStack, Table, TableContainer } from '@chakra-ui/react'
import Sidebar from './Sidebar'
import { useDisclosure } from '@chakra-ui/react'
import { Button, Tbody, Td, Th, Thead, Tr, TableCaption } from '@chakra-ui/react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseModal  from './Coursemodal'
import { useSelector, useDispatch } from 'react-redux'
import { getallcourses, getlectures } from '../../redux/actions/course'
import { addlectures, deletecourse } from '../../redux/reducer/admin'
import { useState } from 'react'

const AdminCourses = () => {
    // const courses = [
    //     {
    //         id: 1,
    //         title: "Admin",
    //         category: "admin@123",
    //         poster: {
    //             url: "https://images.pexels.com/photos/9295809/pexels-photo-9295809.jpeg?auto=compress&cs=tinysrgb&dpr=20&h=750&w=1260"
    //         },
    //         createdBy: "Admin",
    //         views: 10,
    //         numofviedeos: 10
    //     }
    // ]
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
const {courses,lectures} = useSelector(state=>state.course)
const[courseid,setCourseid] = useState("")
const[coursetitle,setCoursetitle] = useState('')
    const coursedetail = (courseid,title) => {
    
        dispatch(getlectures(courseid))

        onOpen()
        setCoursetitle(title)
        setCourseid(courseid)

        
    }

    const deleteuser = (id) => {
        console.log(id)
        dispatch(deletecourse(id))
    }
    

    const deletelecture = (courseid, lectureid) => {
        console.log(courseid, lectureid)
    }

    const addlecture = (e, courseid, title, description, video) => {
        console.log(courseid, title, description, video)
        const myform = new FormData()
        myform.append("title", title)
        myform.append("description", description)
        myform.append("video", video)
        dispatch(addlectures(myform, courseid))
    }
useEffect(()=>{
    dispatch(getallcourses())
},[dispatch])
    return (
        <Grid
            minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]}>
            <Box p={["0", "16"]} overflowX={"auto"}>
                <Heading textAlign={"center"} children="All Courses" my={"16"} textTransform={"uppercase"} />
                <TableContainer w={["100%", "full"]}>
                    <Table variant={"simple"} colorScheme="blackAlpha" size={'lg'}>
                        <TableCaption>All Available Courses in the Database</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Poster</Th>
                                <Th>Title</Th>
                                <Th>Category</Th>
                                <Th>Creator</Th>
                                <Th isNumeric>Views</Th>
                                <Th isNumeric>Lectures</Th>
                                <Th isNumeric>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {courses.map((item) => (
                                <Row key={item.id} item={item} coursedetail={coursedetail} deleteuser={deleteuser} />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <CourseModal courseTitle={coursetitle} isOpen={isOpen} onClose={onClose} deletebutton={deletelecture} addlecture={addlecture} id={courseid} lectures = {lectures} />
            </Box>
            <Sidebar />
        </Grid>
    )
}

function Row({ item, coursedetail, deleteuser }) {
    return (
        <Tr>
            <Td>{item._id}</Td>
            <Td><img src={item.poster.url} alt={item.title} style={{ width: "100px" }} /></Td>
            <Td>{item.title}</Td>
            <Td>{item.category}</Td>
            <Td>{item.createdBy}</Td>
            <Td isNumeric>{item.views}</Td>
            <Td isNumeric>{item.numofviedeos}</Td>
            <Td isNumeric>
                <HStack justifyContent={"flex-end"}>
                    <Button onClick={() => coursedetail(item._id)} variant={'outline'} color={'purple.500'}>Details</Button>
                    <Button onClick={() => deleteuser(item._id)} variant={'outline'} color={'purple.500'}><RiDeleteBin7Fill /></Button>
                </HStack>
            </Td>
        </Tr>
    )
}

export default AdminCourses
