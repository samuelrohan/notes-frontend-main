import { Box, Input, Stack, Text, LinkBox } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import {Button} from "../components/ui/button";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !gender) {
      alert("All fileds is required");
      return;
    }
    const payload = {
      name,
      email,
      gender,
      password,
    };

    try {
      setLoading(true);
      const res = await fetch(`https://devnoteapp.onrender.com/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      alert("User registered successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      alert(`An error occurred: ${error}`);
    }
  };

  return (
    <Box fontFamily="Playwrite IS" m='auto'  width={{base:"160px", sm:"200px", md:"300px", lg:"400px", xl:"500px"}}>
      <form>
        <Stack
          borderRadius="10px"
          border="1px solid grey"
          
          margin="auto"
          p="5"
          mt="5"
          gap="20px"
        >
          <Text fontSize={{base:"12px", sm:"14px", md:"16px", lg:"20px", xl:"24px"}} textAlign="center"  fontWeight="bold">
            Register
          </Text>
          <Field  fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}} required label="Name">
            <Input
               fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              height={{base:"17px", sm:"20px", md:"40px"}}
            />
          </Field>

          <Field required fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}} label="Email">
            <Input
             fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}}
            type='email'
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              height={{base:"17px", sm:"20px", md:"40px"}}
            />
          </Field>
          <Field required fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}} label="Select your gender">
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">-</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </Field>

          <Field required fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}} label="Password">
            <Input
            fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}}
            type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              height={{base:"17px", sm:"20px", md:"40px"}}
            />
          </Field>

          <Button
          size={{base:'xs', sm:'sm', md:'md', lg:'lg', xl:'xl'}}
          fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}}
            loading={loading ? true : false}
            loadingText={loading ? "Registering..." : ""}
            type="submit"
            background="blue.600"
            onClick={handleSubmit}
          >
            {loading ? "Registering..." : "Register"}
          </Button>

          <Text mt="5"
           fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}}>
            <Link style={{ color: "blue" }} to="/login">
              Please Login
            </Link>
            , if you're already registered
          </Text>
        </Stack>
      </form>
    </Box>
  );
}

export default Register;
