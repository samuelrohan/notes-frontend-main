import { Box,  Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Field } from "../components/ui/field";
import {Button} from "../components/ui/button"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    if(!email || !password){
      alert("Please Enter your email and password")
      return
    }
    e.preventDefault()
    const payload = {
      email,
      password,
    };

    try {
      setLoading(true);
      const res = await fetch(`https://devnoteapp.onrender.com/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok === false) {
        alert(data.message);
      }

      if (data.token) {
        alert(`${data.message}`);
        localStorage.setItem("token", data.token);
        navigate("/notes");
      }

      setLoading(false);
    } catch (error) {
      alert(`An error occurred: ${error}`);
      setLoading(false);
    }
  };
  return (
    <Box fontFamily='Playwrite IS' width={{base:"160px", sm:"200px", md:"300px", lg:"400px", xl:"500px"}} margin="auto">
      <form
        style={{
          
          border: "1px solid grey",
          borderRadius:'10px',
          padding: "20px",
          textAlign: "center",
          margin: "auto",
          marginTop: "50px",
        }}
        onSubmit={handleLogin}
      >
        <Text fontSize={{base:"12px", sm:"14px", md:"16px", lg:"20px", xl:"24px"}} fontWeight='bold'>Login</Text>
        <Field label="Email"  required fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}} >
          <Input 
          fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}} 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            height={{base:"17px", sm:"20px", md:"40px"}}
          />
        </Field>
        <Field label="Password" required>
          <Input
          fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}} 
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            autoComplete="password"
            height={{base:"17px", sm:"20px", md:"40px"}}
          />
        </Field>
        <Button size={{base:'xs', sm:'sm', md:'md', lg:'lg', xl:'xl'}} fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}}  loading={loading} backgroundColor='blue.600' type='submit' mt="3" width="full" loadingText= {loading?"Logging in...":""}>
          Login
        </Button>
        <Text mt='5' fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}} >
          <Link  fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}}  style={{color:"blue"}} to='/register'>Please Register</Link> , if you're not registered 
        </Text>
      </form>
    </Box>
  );
}

export default Login;
