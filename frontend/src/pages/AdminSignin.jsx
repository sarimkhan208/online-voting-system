import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
  import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from '../Context/authContext';
import axios from 'axios';
import { Base_URL } from '../Base_URL';
  
  export default function AdminSignin() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const toast = useToast()
    const {setIsAdminAuth,setPrivateRoute,setIsVotingStarted} = useContext(AuthContext)

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
            axios.post(`${Base_URL}/admin/signin`,payload,{
              headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('admintoken'))}`
              }
          })
            .then((res)=>{
                if(res.data.msg == 'wrong credentials'){
                    toast({
                        title: 'Wrong Credentials.',
                        description: "You enter wrong credentials",
                        status: 'error',
                        duration: 2000,
                        position: 'top',
                        isClosable: true,
                    })
                }else{
                    toast({
                        title: 'Login Successfull',
                        status: 'success',
                        duration: 2000,
                        position: 'top',
                        isClosable: true,
                    })
                    setIsAdminAuth(true)
                    setPrivateRoute(true)
                    localStorage.setItem("admintoken",JSON.stringify(res.data.token))
                    navigate("/admindashboard")
                }
            })
            .catch((err)=>{
                toast({
                    title: 'Some Error occured.',
                    description: err,
                    status: 'error',
                    duration: 2000,
                    position: 'top',
                    isClosable: true,
                })
            })
        }
    }


    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} width={'50%'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading color={'teal'} fontSize={'4xl'}>Signin As Admin</Heading>
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
                <RouterLink to='/'>
                    <Button
                    width={'100%'}
                    bg={'teal'}
                    color={'white'}
                    _hover={{
                        bg: 'teal.500',
                    }}>
                    Back To Home
                    </Button>
                </RouterLink>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }