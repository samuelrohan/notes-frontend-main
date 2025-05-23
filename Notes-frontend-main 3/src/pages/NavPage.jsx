import { Box, Button, HStack, Stack } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import './NavPage.css'

function NavPage() {
  const handleLogout = () => {
    if (!localStorage.getItem("token")) {
      alert("You are not logged in");
      return;
    }
    localStorage.removeItem("token");
    alert("You have been logged out");
    window.location.href = "/";
  };
  return (
    <Box>
    <Stack backgroundColor='blue.100'  p='5' boxShadow="rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" direction='row' justify='space-between' fontFamily='Playwrite IS'>
      
      <HStack>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/notes">Notes</NavLink>
        <NavLink to="/login">Login</NavLink>
        </HStack>


      <Button variant='subtle' color='blue.700' onClick={handleLogout}>Logout</Button>
   

    </Stack>
    </Box>
  );
}

export default NavPage;
