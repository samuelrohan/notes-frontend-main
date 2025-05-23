import React, { useState } from 'react'
import { Box, Text, Stack, Input} from '@chakra-ui/react'
import {Field} from "../components/ui/field"
import {Button} from "../components/ui/button"
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {

    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleChange = async()=>{
       
        try {
            setLoading(true)
            const res = await fetch(`https://devnoteapp.onrender.com/user/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email})
            })
            const data = await res.json()
           
            
            setLoading(false)
            alert(data.message)
           if(data.resetToken){
                navigate(`/reset-password/${data.resetToken}`)
           }
            setEmail("")
            
        } catch (error) {
            alert(`An error occurred: ${error}`)
            setLoading(false)
        }
        
    }
  return (
    <Box fontFamily='Playwrite IS'>
        <Stack margin='auto' border='1px solid grey' p='5' width={{base:"160px", sm:"200px", md:"300px", lg:"400px", xl:"500px"}} borderRadius='md' mt='20'>
        <Text fontSize={{base:"12px", sm:"14px", md:"16px", lg:"20px"}} textAlign='center' pb='2'>Send Mail to Reset Password</Text>
            <Field  fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}} label='Enter Your Email' required>
                <Input fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}}   type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <Button  fontSize={{base:"10px", sm:"12px", md:"15px", lg:"16px"}} size={{base:'xs', sm:'sm', md:'md', lg:'lg', xl:'xl'}} loading={loading} loadingText="Sending link on mail" onClick={handleChange} backgroundColor='blue.600' width='full' >Send Link</Button>
            </Field>
        </Stack>
    </Box>
  )
}

export default ForgotPassword
