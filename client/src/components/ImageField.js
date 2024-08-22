import { useState } from 'react';
import {Box, Button, FormControl, FormLabel, Input, Text, Image, VStack,} from "@chakra-ui/react";
import axios from 'axios';


const ImageField = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [text, setText] = useState('');


  const handleImageChange = (photogiven) => {
    const file = photogiven.target.files[0]; // what is target.files
    if (file) { // if there is a file
      setImage(file);
      setPreview(URL.createObjectURL(file)); // what is create objecturl
    }
  };

  const handleSubmit = async (e) =>{
    e.preventDefault(); //what does this do
    if (!image) return; // return if img does not exist

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      setText(response.data.text);
    } catch (error) {
      console.error('Error uploading file:', error);
    }  
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack>
          <FormControl id='image-upload'>
            <Input
            type = 'file'
            accept = 'image/*'
            onChange = {handleImageChange}
            required/> 
          </FormControl>
          {preview && (<Image
          src = {preview}
          alt = 'image preview'
          objectFit='cover'/>)}
          <Button colorScheme="green" type="submit" w="full">
            Upload Image
          </Button>
        </VStack>
      </form>
      <Text fontSize='md'>{text}</Text>
    </Box>
  );
}

export default ImageField;