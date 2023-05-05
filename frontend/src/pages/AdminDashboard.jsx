import { Box, Button, Center, Flex, Heading, Image, Input, Stack, Text, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'


import axios from 'axios'
import { Base_URL } from '../Base_URL'
import { AuthContext } from '../Context/authContext'
import { useNavigate } from 'react-router-dom'
import AlertDialogBox from '../Components/AlertDialog'
import { TitleModal } from '../Components/titleModal'
import { HeroImageModal } from '../Components/HeroImageModal'
import { Link as RouterLink } from 'react-router-dom'

const AdminDashboard = () => {
    const {isAdminAuth} = useContext(AuthContext)
    const [candidateData,setCandidateData] = useState([])
    const [name,setName] = useState("")
    const [image,setImage] = useState("")
    const [position,setPosition] = useState("")
    const toast = useToast()
    const navigate = useNavigate()
    const [voterList,setVoterList] = useState([])
    const [voterFalseData,setVoterFalseData] = useState([])
    const [flag,setFlag] = useState(false)
    const {heroImage,isVotingStarted,setIsVotingStarted} = useContext(AuthContext)

    
    // ,{
    //     headers: {
    //       'Authorization': `Bearer ${JSON.parse(localStorage.getItem('admintoken'))}`
    //     }
    // }
    const getCandidatesData = ()=>{
        axios.get(`${Base_URL}/candidate`)
        .then((res)=>{
            setCandidateData([...res.data])
        }).catch((err)=>console.log(err))
    }

    const getVoterData = ()=>{
        axios.get(`${Base_URL}/voter`)
        .then((res)=>{
            setVoterList([...res.data])
            
        }).catch((err)=>console.log(err))
    }
    

    useEffect(()=>{
        getCandidatesData()
        getVoterData()
        
    },[flag])


    useEffect(()=>{
        const result = voterList.filter(el=> el.isVoted == false);
        setVoterFalseData([...result])
    },[flag])


    const forcedRender = ()=>{
        getCandidatesData()
    }

    if(!isAdminAuth){
        toast({
                title: 'Please Login first.',
                status: 'warning',
                duration: 2000,
                position: 'top',
                isClosable: true,
        })
        navigate('/adminsignin')
        return
    }

    

    const handleStartVoting = ()=>{
        setIsVotingStarted(!isVotingStarted)
        getVoterData()
        setFlag(!flag)
    }


    const handleAdd = ()=>{
        if(!name || !image || !position){
            toast({
                title: 'Please fill out all fields.',
                description: "You do not fill all the respective fields",
                status: 'warning',
                duration: 2000,
                position: 'top',
                isClosable: true,
            })
        }else{
            let payload={
                name,
                image,
                position
            }
            axios.post(`${Base_URL}/candidate/create`,payload,{
                headers: {
                  'Authorization': `Bearer ${JSON.parse(localStorage.getItem('admintoken'))}`
                }
            })
            .then((res)=>{
                toast({
                    title: 'New Candidate has been created',
                    description: "New Candidate has been added",
                    status: 'success',
                    duration: 2000,
                    position: 'top',
                    isClosable: true,
                })
                setName("")
                setImage("")
                setPosition("")
                getCandidatesData()
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
    <Box pt={'50px'} px={'60px'} bg={'gray.50'} mb={'150px'} >
        <Box border={'1px solid #E0E0E0'} borderRadius={'7px'} p={'20px'} display={'flex'} >
            <Image borderRadius={'7px'} mr={'20px'} height='80px' width='80px' src={heroImage} alt='logo' />
            <Box>
                <Heading color={'teal'} fontSize={'30px'} fontWeight={'500'} >Admin Dashboard</Heading>
            </Box>
            <Box display={'flex'} justifyContent={'space-evenly'}  width={'70%'} >
                <Box><Button onClick={()=>handleStartVoting()}  bg={isVotingStarted?'red':'green'} color={'white'} >{isVotingStarted?'Stop Voting':'Start Voting'}</Button></Box>
                <Box><Button bg={'yellow'} onClick={()=>setFlag(!flag)} color={'white'} >Refresh</Button></Box>
                <Box><TitleModal/></Box>
                <Box><HeroImageModal/></Box>
                <Box><RouterLink to='finalresult' ><Button color={'white'} bg={'green'}>Get Result</Button></RouterLink></Box>
            </Box>
        </Box>

        <Box display={'grid'} gridTemplateColumns= {{base:'50% 50%',sm:"49% 49%"}} gap={'2%'}> 
            <Box border={'1px solid #E0E0E0'} borderRadius={'7px'} p={'20px'} mt={'80px'} >
                <Heading mt={'20px'} color={'teal'} fontSize={'35px'} fontWeight={'500'} textAlign={'center'} >Voting status</Heading>
                {
                !isVotingStarted?<Box><Box><Heading textAlign='center' mt={'50px'} >No Status Voting not started yet</Heading></Box></Box>:<TableContainer border={'1px solid #E0E0E0'} borderRadius={'7px'} mt={'50px'} >
                    <Box><Heading color='teal' textAlign='center' >{voterFalseData.length}/{voterList.length}</Heading></Box>
                <Table variant='striped' colorScheme='teal'>
                    {voterFalseData.length==0?<TableCaption>No Voter Left</TableCaption>:<TableCaption></TableCaption>}
                    <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Mobile</Th>
                        <Th>Address</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
    
                        {
                            voterFalseData?.map((el)=>(
                                <Tr key={el._id} >
                                    <Td>{el.name}</Td>
                                    <Td>{el.mobileNo}</Td>
                                    <Td>{el.address}</Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
        </TableContainer>
            }
            </Box>

            <Box border={'1px solid #E0E0E0'} borderRadius={'7px'}  mt={'80px'} pb={'20px'} >
                <Flex justify={'center'} >
                    <Stack width={'60%'} >
                        <Heading  my={'20px'} color={'teal'} fontSize={'35px'} fontWeight={'500'} textAlign={'center'} >Candidates</Heading>
                        <Input my={'15px'} value={name} type='text' onChange={(e)=>setName(e.target.value)} placeholder='Name'/>
                        <Input my={'15px'} value={position} type='text' onChange={(e)=>setPosition(e.target.value)} placeholder='Position'/>
                        <Input my={'15px'} value={image} type='text'  onChange={(e)=>setImage(e.target.value)} placeholder='Image URL'/>
                        <Button my={'15px'} onClick={()=>handleAdd()} bg={'teal'} >Add</Button>
                    </Stack>
                </Flex>
            </Box>
        </Box>

        <Box>
            {
                candidateData.length==0?<Heading textAlign='center' mt={'50px'} >There is no candidate please add first</Heading>:<TableContainer border={'1px solid #E0E0E0'} borderRadius={'7px'} mt={'50px'} >
                <Table variant='striped' colorScheme='teal'>
                    {candidateData.legnth==0?<TableCaption>Add Candidates</TableCaption>:<TableCaption></TableCaption>}
                    <Thead>
                    <Tr>
                        <Th>Image</Th>
                        <Th>Name</Th>
                        <Th>Position</Th>
                        <Th>Action</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
    
                        {
                            candidateData?.map((el)=>(
                                <Tr key={el._id} >
                                    <Td><Image height={'60px'} width={'60px'} src={el.image} alt='image' /></Td>
                                    <Td>{el.name}</Td>
                                    <Td>{el.position}</Td>
                                    <Td><AlertDialogBox id={el._id} forcedRender={forcedRender}/></Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
        </TableContainer>
            }
        </Box>

    </Box>
  )
}

export default AdminDashboard



