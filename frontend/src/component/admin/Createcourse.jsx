
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid, Heading, Input, VStack, Button, Image, Select } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import { createcourse } from '../../redux/reducer/admin';
import { fileuploadcss } from '../Auth/Register';

const Createcourse = () => {
  
  const dispatch = useDispatch();
  const {  message,loading } = useSelector((store) => store.admin);
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
    setTitle("");
    setDescription("");
    setCategory("");
    setCreatedBy("");
    setPoster(null);
    setImagePrev(null);
    
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
            <Button w={'full'} type='submit' colorScheme={'yellow'}>{loading ? ('loading...'):('Create')}
                          </Button>
          </VStack>
        </form>
      </Container>
      <Sidebar />
    </Grid>
  );
}

export default Createcourse;
