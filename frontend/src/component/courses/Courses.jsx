import { Button, Container, Heading ,Input, Stack, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Image } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getallcourses } from '../../redux/actions/course'
import { addtoPlaylist, getmyprofile } from '../../redux/actions/user'

const Courses = () => {
  const{id} = useParams()
  
  const{loading,courses,error} = useSelector(state=>state.course)
  const dispatch = useDispatch()
     const [keyword,setkeyword]=React.useState("")
    const [category,setcategory]=React.useState("")
    useEffect(()=>{
dispatch(getallcourses(keyword,category))
    },[category,keyword,dispatch])
    const categories =['web development','data science','machine learning','blockchain','artificial intelligence','dsa']
    const addtoplaylist=async(courseid)=>{
         await dispatch(addtoPlaylist(courseid))
        console.log(courseid)
        dispatch(getmyprofile())
    }
    const Course = ({views,title,description,imagesrc,creator,id,lecturecount}) => {
        
        return (
            <VStack boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"} className='course' alignItems={["center","flex-start"]}>
<Image ml={'5'} src={imagesrc} boxSize={"60"} objectFit={"contain"} />
<Heading ml={"5"} mt={"5"} textAlign={["center","left"]}  maxW={'200px'} fontFamily={'sans-serif'} children={title} size={"sm"} />

<Text ml={"5"} noOfLines={3} textAlign={["center","left"]} children={description} />
<HStack ml={'7'} mt={'2'}>
    <Text fontWeight={"bold"} children={`Creator : ${creator}`} textTransform={"uppercase"}></Text>
    <Text fontWeight={"bold"} children={`Lectures : ${lecturecount}`} textTransform={"uppercase"}></Text>
</HStack>
<Heading ml={"5"} mt={"2"} textAlign={["center","left"]} size={"sm"} children={`Views : ${views}`} />
<Stack direction={['column','row']} alignItems={["center","flex-start"]} >

</Stack>
<Stack direction={['column','row']} flexWrap={"wrap"} justifyContent={['flex-start',"space-evenly"]} alignItems={["center","flex-start"]} >
<Link ml={"8"} to={`/course/${id}`}><Button colorScheme="yellow" >Watch now</Button></Link>
<Button ml={"3"} variant={'ghost'} colorScheme="yellow" onClick={()=>addtoplaylist(id)}>Add to playlist</Button>
</Stack>

            </VStack>
        )
    }
  return (
<Container minH={"100vh"} maxW={"container.lg"} p={"8"}>
<Heading children="All courses" m={"8"}  />
<Input value={keyword} placeholder="Search for courses" m={"2"} onChange={(e)=>setkeyword(e.target.value)} focusBorderColor='yellow.500' type='text'/>
<HStack overflowX={"auto"} paddingY={"8"} css={{'&::-webkit-scrollbar':{display:"none"}}} >
{categories.map((item,index)=>(
    <Button key={index} onClick={()=>setcategory(item)} minW={"60"} colorScheme="yellow" children={item}></Button>
))}

</HStack>

{/* <Course title="web development" views="2k" description="this is the description" imagesrc="https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" creator="John" lecturecount="10" id={1} addtoplaylist={addtoplaylist}  /> 
*/}{
  courses.length>0 ?(
    courses?.map((item,index)=>(
    <Course key={item._id} title={item.title} views={item.views} description={item.description} imagesrc={item.poster.url} creator={item.createdBy} lecturecount={item.numofVideos} id={item._id} addtoplaylist={addtoplaylist} />
  ))
  ):(
    <Heading>No courses found</Heading>)
  
}
</Container>
  )
}

export default Courses


