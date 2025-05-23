import { Box, Input, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Field } from "../components/ui/field";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { token } = useParams();
  
  const navigate = useNavigate();

  const onChangePassword = async () => {
    try {
      setLoading(true);
      const newPassword = password;
      const res = await fetch(
        `https://devnoteapp.onrender.com/user/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
        }
      );
      const data = await res.json();
      setLoading(false);
      if(res.ok){
        setPassword("");
        navigate("/login");
      }
      alert(data.message);
    } catch (error) {
      setLoading(false);
      alert(`An error occurred: ${error}`);
    }
  };
  return (
    <Box>
      <Stack
        margin="auto"
        border="1px solid grey"
        p="5"
        width={{
          base: "160px",
          sm: "200px",
          md: "300px",
          lg: "400px",
          xl: "500px",
        }}
        borderRadius="md"
        mt="20"
      >
        <Text
          fontSize={{
            base: "12px",
            sm: "14px",
            md: "16px",
            lg: "20px",
            xl: "24px",
          }}
          textAlign="center"
        >
          Change Password
        </Text>
        <Field
          fontSize={{ base: "10px", sm: "12px", md: "15px", lg: "16px" }}
          label="Enter New Password"
          required
        >
          <Input
            height={{ base: "17px", sm: "20px", md: "40px" }}
            fontSize={{ base: "10px", sm: "12px", md: "15px", lg: "16px" }}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Button
          fontSize={{ base: "10px", sm: "12px", md: "15px", lg: "16px" }}
          size={{ base: "xs", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
          loading={loading}
          loadingText="Changing Password..."
          onClick={onChangePassword}
          backgroundColor="blue.600"
        >
          Change Password
        </Button>
      </Stack>
    </Box>
  );
}

export default ResetPassword;
