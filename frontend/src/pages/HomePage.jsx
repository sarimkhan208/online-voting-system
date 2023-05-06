import { Box, Button, Center, Heading, Image, Input, Text, useToast } from "@chakra-ui/react";
import {
    Flex,
    FormControl,
    FormLabel,
    Checkbox,
    Stack,
    Link,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useContext, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/authContext";


export default function HomePage(){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const toast = useToast()
    const {title,heroImage,setVoterDetail,setIsVoterAuth} = useContext(AuthContext)

    const handleSignIn = ()=>{
        
        if(!email || !password){
            toast({
                title: 'Wrong Credentials.',
                description: "You enter wrong credentials",
                status: 'error',
                duration: 2000,
                position: 'top',
                isClosable: true,
              })
        }else{
            let payload = {
                email,
                password
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/voter/signin`,payload)
            .then((res)=>{
                if(res.data.msg == "Login successfull"){
                    toast({
                        title: 'Login Successfull',
                        status: 'success',
                        duration: 2000,
                        position: 'top',
                        isClosable: true,
                    })
                    setIsVoterAuth(true)
                    setVoterDetail({...res.data.voterDetail})
                    localStorage.setItem("votertoken",JSON.stringify(res.data.token))
                    navigate('/voterdashboard')
                }else{
                    toast({
                        title: 'Wrong Credentials',
                        status: 'error',
                        duration: 2000,
                        position: 'top',
                        isClosable: true,
                    })
                }
                
            })
            .catch((err)=>console.log("errorrr",err))
        }
    }




    return <Box bg={useColorModeValue('gray.50', 'gray.800')} display={'grid'} gridTemplateColumns= {{base:'50% 50%',sm:"50% 50%"}} pl={'15px'} >
        <Box bg={useColorModeValue('gray.50', 'gray.800')} >
                <Heading textAlign={'center'} display={'block'} mt={'40px'} >Welcome to Online Voting</Heading>
                <Center>
                <Image borderRadius={'7px'} my={'35px'} width={'200px'} height={'200px'} src={heroImage} alt='hero image' />
                </Center>
                <Heading  textAlign={'center'} fontSize={'lg'} fontWeight={'500'} >
                    {title}
                </Heading >
        </Box>
        <Box  >
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            </Stack>
            <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
                <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(e)=>setEmail(e.target.value)} />
                </FormControl>
                <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(e)=>setPassword(e.target.value)} />
                </FormControl>
                <Stack spacing={10}>
                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                    onClick={()=>handleSignIn()}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                    bg: 'blue.500',
                    }}>
                    Sign in
                </Button>
                <Text align={'center'}>
                    Not Registered? <RouterLink to={'signup'}><Text color={'blue.500'} >Create An Account</Text></RouterLink>
                </Text>
                <Text align={'left'}>
                    <RouterLink to={'adminsignin'}><Text color={'blue.500'} >Signin As Admin</Text></RouterLink>
                    <RouterLink to={'admindashboard'}><Text color={'blue.500'} >Admin Dashboard</Text></RouterLink>
                </Text>
                </Stack>
            </Stack>
            </Box>
        </Stack>
        </Flex>
        </Box>
        
    </Box>
}