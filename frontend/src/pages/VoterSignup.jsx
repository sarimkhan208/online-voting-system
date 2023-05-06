import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { Link as RouterLink, useNavigate } from "react-router-dom";
  import axios from 'axios'  
  export default function VoterSignup() {
    const toast = useToast()
    const [showPassword, setShowPassword] = useState(false);
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [mobileNo,setMobileNo] = useState("")
    const [dob,setDob] = useState("")
    const [address,setAddress] = useState("")
    const navigate = useNavigate()

    const handleSignUp = ()=>{
        
        if(!name || !email || !password || !mobileNo || !dob || !address){
            toast({
                title: 'Please fill out all fields.',
                description: "You do not fill all the respective fields",
                status: 'warning',
                duration: 2000,
                position: 'top',
                isClosable: true,
              })
        }else{
            let payload = {
                name,
                email,
                password,
                mobileNo,
                dob,
                address
            }
            axios.post(`${process.env.REACT_APP_BASE_URL}/voter/signup`,payload)
            .then((res)=>{
                toast({
                    title: 'Account created successfull.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 2000,
                    position: 'top',
                    isClosable: true,
                  })
                navigate('/')
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
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} width={'60%'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
                <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type="email" onChange={(e)=>setName(e.target.value)} />
                </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(e)=>setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input onChange={(e)=>setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="mobile" isRequired>
                <FormLabel>Mobile Number</FormLabel>
                <Input onChange={(e)=>setMobileNo(e.target.value)} type="number" />
              </FormControl>
              <FormControl id="dob" isRequired>
                <FormLabel>DOB</FormLabel>
                <Input type="date" onChange={(e)=>setDob(e.target.value)} />
              </FormControl>
              <FormControl id="address" isRequired>
                <FormLabel>Address</FormLabel>
                <Input type="email" onChange={(e)=>setAddress(e.target.value)} />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={()=>handleSignUp()}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text  display={'flex'} justifyContent={'center'} >
                  Already a user? <RouterLink to={'/'}><Text ml={'5px'} color={'blue.500'} >Sign in</Text></RouterLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }