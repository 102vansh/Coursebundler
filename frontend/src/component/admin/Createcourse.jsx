// // import React, { useEffect } from 'react'
// // import { Box, Container, Grid, Heading, Input, VStack } from '@chakra-ui/react'
// // import Sidebar from './Sidebar'
// // import { Button, Image, Select } from '@chakra-ui/react'
// // import { fileuploadcss } from '../Auth/Register'
// // import { useDispatch, useSelector } from 'react-redux'
// // import { createcourse } from '../../redux/reducer/admin'
// // const Createcourse = () => {
// //     const dispatch = useDispatch()
// //     const{loading,message} = useSelector((store)=>store.admin)
// //     const[title,setTitle]=React.useState("")
// //     const[description,setDescription]=React.useState("")
// //     const[category,setCategory]=React.useState("")
// //     const[createdBy,setCreatedBy]=React.useState("")
// //     const[poster,setimage] = React.useState("")
// //     const[imagePrev,setImagePrev]=React.useState("")
// //     console.log(category)
// // const categories = [
// //     'Web Development',
// //     'Artificial Intelligence',
// //     'Data Science',
// //     'App Development',
// //     'Game Development',
// //     'Cyber Security',
// //     'Data Structures',
// //     'Machine Learning',
// // ]
// // const changeimagehandler=(e)=>{
// //     const file = e.target.files[0]
// //     const reader = new FileReader()
// //     reader.readAsDataURL(file)
// //     reader.onloadend = ()=>{
// //         setimage(reader.result)
// //         setImagePrev(reader.result)
// //     }
// // }
// // const submithandler=(e)=>{
// //     e.preventDefault()
// //     const myform = new FormData()
// //     myform.append('title',title)
// //     myform.append('description',description)
// //     myform.append('category',category)
// //     myform.append('createdby',createdBy)
// //     myform.append('poster',poster)
// //     console.log(myform)
// //     dispatch(createcourse(myform))
// // }
// // // useEffect(()=>{
// // //     if(poster){
// // //         console.log(poster)
// // //     }
// // // },[poster])
// //   return (
// //     <Grid 

// //      minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]}>
// // <Container py={'16'}>
// // <form onSubmit={submithandler}>
// // <Heading textTransform={"uppercase"} children="Create Course" 
// //     my={"16"}
// //     textAlign={["center", "left"]}
// // />
// // <VStack m={"auto"} spacing={"8"}>
// // <Input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" type={"text"} focusBorderColor="yellow.500"/>
// // <Input value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" type={"text"} focusBorderColor="yellow.500"/>
// // <Input value={createdBy} onChange={(e)=>setCreatedBy(e.target.value)} placeholder="Created By" type={"text"} focusBorderColor="yellow.500"/>

// // <Select value={category} onChange={(e)=>setCategory(e.target.value)} focusBorderColor="yellow.500">
// // {
// //     categories.map((item)=>(
// //         <option value={item}>{item}</option>
// //     ))
// // }

// // </Select>
// // <input type='file' placeholder='Uploadimage'  focusBorderColor="yellow.500" onChange={changeimagehandler} css={{
// //     '&::file-selector-button': {
// //         ...fileuploadcss,
// // }}  } ></input>
// // {imagePrev && <Image src={imagePrev} objectFit='contain' boxSize='26 ' />}

// // <Button w={'full'} type='submit' colorScheme={'yellow'}>Create</Button>
// // </VStack>
// // </form>
// // </Container>
// // <Sidebar/>
// //     </Grid>
// //   )
// // }

// // export default Createcourse
// import React, { useEffect } from 'react'
// import { Box, Container, Grid, Heading, Input, VStack } from '@chakra-ui/react'
// import Sidebar from './Sidebar'
// import { Button, Image, Select } from '@chakra-ui/react'
// import { fileuploadcss } from '../Auth/Register'
// import { useDispatch, useSelector } from 'react-redux'
// import { createcourse } from '../../redux/reducer/admin'

// const Createcourse = () => {
//     const dispatch = useDispatch()
//     const { loading, message } = useSelector((store) => store.admin)
//     const [title, setTitle] = React.useState("")
//     const [description, setDescription] = React.useState("")
//     const [category, setCategory] = React.useState("")
//     const [createdBy, setCreatedBy] = React.useState("")
//     const [poster, setImage] = React.useState("")
//     const [imagePrev, setImagePrev] = React.useState("")

//     const categories = [
//         'Web Development',
//         'Artificial Intelligence',
//         'Data Science',
//         'App Development',
//         'Game Development',
//         'Cyber Security',
//         'Data Structures',
//         'Machine Learning',
//     ]

//     const changeImageHandler = (e) => {
//         const file = e.target.files[0]
//         const reader = new FileReader()
//         reader.readAsDataURL(file)
//         reader.onloadend = () => {
//             setImage(reader.result)
//             setImagePrev(reader.result)
//         }
//     }

//     const submitHandler = (e) => {
//         e.preventDefault()
//         const myForm = new FormData()
//         myForm.append('title', title)
//         myForm.append('description', description)
//         myForm.append('category', category)
//         myForm.append('createdBy', createdBy)
//         myForm.append('poster', poster)
//         console.log(myForm)
//         dispatch(createcourse(myForm))
//     }

//     return (
//         <Grid minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]}>
//             <Container py={'16'}>
//                 <form onSubmit={submitHandler}>
//                     <Heading textTransform={"uppercase"} children="Create Course"
//                         my={"16"}
//                         textAlign={["center", "left"]}
//                     />
//                     <VStack m={"auto"} spacing={"8"}>
//                         <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" type={"text"} focusBorderColor="yellow.500" />
//                         <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" type={"text"} focusBorderColor="yellow.500" />
//                         <Input value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} placeholder="Created By" type={"text"} focusBorderColor="yellow.500" />
                        
//                         <Select value={category} onChange={(e) => setCategory(e.target.value)} focusBorderColor="yellow.500">
//                             <option value="" disabled>Select category</option>
//                             {categories.map((item, index) => (
//                                 <option key={index} value={item}>{item}</option>
//                             ))}
//                         </Select>
                        
//                         <input type='file' placeholder='Upload image' onChange={changeImageHandler} css={{
//                             '&::file-selector-button': {
//                                 ...fileuploadcss,
//                             }
//                         }} />
//                         {imagePrev && <Image src={imagePrev} objectFit='contain' boxSize='26' />}
                        
//                         <Button w={'full'} type='submit' colorScheme={'yellow'}>Create</Button>
//                     </VStack>
//                 </form>
//             </Container>
//             <Sidebar />
//         </Grid>
//     )
// }

// export default Createcourse
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid, Heading, Input, VStack, Button, Image, Select } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import { createcourse } from '../../redux/reducer/admin';
import { fileuploadcss } from '../Auth/Register';

const Createcourse = () => {
  const dispatch = useDispatch();
  const { loading, message } = useSelector((store) => store.admin);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [poster, setPoster] = useState(null);
  const [imagePrev, setImagePrev] = useState("");

  const categories = [
    'Web Development',
    'Artificial Intelligence',
    'Data Science',
    'App Development',
    'Game Development',
    'Cyber Security',
    'Data Structures',
    'Machine Learning',
  ];

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    setPoster(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('createdBy', createdBy);
    myForm.append('poster', poster);

    dispatch(createcourse(myForm));
  };

  return (
    <Grid minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]}>
      <Container py={'16'}>
        <form onSubmit={submitHandler}>
          <Heading textTransform={"uppercase"} my={"16"} textAlign={["center", "left"]}>Create Course</Heading>
          <VStack m={"auto"} spacing={"8"}>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" type={"text"} focusBorderColor="yellow.500" />
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" type={"text"} focusBorderColor="yellow.500" />
            <Input value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} placeholder="Created By" type={"text"} focusBorderColor="yellow.500" />
            <Select value={category} onChange={(e) => setCategory(e.target.value)} focusBorderColor="yellow.500">
              <option value="" disabled>Select category</option>
              {categories.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </Select>
            <input type='file' placeholder='Upload image' onChange={changeImageHandler} css={{
              '&::file-selector-button': {
                ...fileuploadcss,
              }
            }} />
            {imagePrev && <Image src={imagePrev} objectFit='contain' boxSize='26' />}
            <Button w={'full'} type='submit' colorScheme={'yellow'}>Create</Button>
          </VStack>
        </form>
      </Container>
      <Sidebar />
    </Grid>
  );
}

export default Createcourse;
