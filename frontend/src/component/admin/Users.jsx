
import React from 'react'
import { useEffect } from 'react'
import { Box, Grid, Heading, HStack, Table, TableContainer } from '@chakra-ui/react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Tbody, Td, Th, Thead, Tr, TableCaption } from '@chakra-ui/react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import {  deleteusers, getallusers, updaterole } from '../../redux/reducer/admin'

const Users = () => {
    const dispatch = useDispatch()
    const{users,loading} = useSelector((state)=>state.admin)
    console.log(users)
    useEffect(() => {
       dispatch(getallusers())
    }, [dispatch])

    const updatehandler = (id) => {
        console.log(id)
        dispatch(updaterole(id))
    }

    const deleteuser = (id) => {
        console.log(id)
        dispatch(deleteusers(id))
    }

    return (
        <Grid
            minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]}>
            <Box p={["0", "16"]} overflowX={"auto"}>
                <Heading textAlign={"center"} children="All Users" my={"16"} textTransform={"uppercase"} />
                <TableContainer w={["100%", "full"]}>
                    <Table variant={"simple"} colorScheme="blackAlpha" size={'lg'}>
                        <TableCaption>All Users in The database</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Role</Th>
                                <Th>Subscription</Th>
                                <Th isNumeric>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        
                            {users?.map((item) => (

                                <Row key={item._id} item={item} updatehandler={(()=>updatehandler(item._id))} deleteuser={(()=>deleteuser(item._id))} />
                            ))
                
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <Sidebar />
        </Grid>
    )
}

export default Users

function Row({ item, updatehandler, deleteuser }) {
    return (
        <Tr>
            <Td>{item._id}</Td>
            <Td>{item.name}</Td>
            <Td>{item.email}</Td>
            <Td>{item.role}</Td>
            <Td>{item.subscription?.status === 'active' ? 'active' : 'notactive'}</Td>
            <Td isNumeric>
                <HStack justifyContent={"flex-end"}>
                    <Button onClick={() => updatehandler(item.id)} variant={'outline'} color={'purple.500'}>Change Role</Button>
                    <Button onClick={() => deleteuser(item.id)} variant={'outline'} color={'purple.500'}><RiDeleteBin7Fill /></Button>
                </HStack>
            </Td>
        </Tr>
    )
}
