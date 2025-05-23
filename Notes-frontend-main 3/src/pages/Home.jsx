import { Box, Button, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <Box
      // border="1px solid black"
      height="100vh"
      
      backgroundColor="blue.200"
      fontFamily="Playwrite IS"
      
     
    >
      <Stack rowGap='70px'  align='center' height='100%' justify='center'>
      <Text fontWeight="bold" fontSize='30px'>Welcome to HomePage of Notes App</Text>

      <Button onClick={()=> navigate('/register')} variant='outline' color='blue.600' fontSize='18px' fontWeight='bold' border='1px solid blue' >To register click here</Button>
      </Stack>
    
    </Box>
  );
}

export default Home;
