import { Box, Button, useToast } from "@chakra-ui/react"
import { useContext } from "react"
import { AuthContext } from "../Context/authContext"
import { Link as RouterLink, useNavigate } from "react-router-dom"

export default function Navbar(){

    const {isAdminAuth,setIsAdminAuth,setPrivateRoute,isVoterAuth,setIsVoterAuth} = useContext(AuthContext)
    const toast = useToast()
    const navigate = useNavigate()
    const handleLogoutAdmin = ()=>{
        toast({
            title: 'Logout',
            status: 'error',
            duration: 2000,
            position: 'top',
            isClosable: true,
        })
        setPrivateRoute(false)
        setIsAdminAuth(false)
        navigate("/")
    }

    const handleLogoutVoter = ()=>{
        toast({
            title: 'Logout',
            status: 'error',
            duration: 2000,
            position: 'top',
            isClosable: true,
        })
        setIsVoterAuth(false)
        navigate("/")
    }


    return <Box bg='teal' py={'3px'} display={'flex'} justifyContent={'space-between'} px={'50px'} >
        <RouterLink to='/' ><Box fontWeight={'700'} textAlign={'center'} color={'white'} fontSize={'45px'}>Online Voting System</Box></RouterLink>
        <Box display={isAdminAuth?'block':'none'} ><Button _hover={{bg:"red"}} onClick={()=>handleLogoutAdmin()} mt={'8px'} >Logout Admin</Button></Box>
        <Box display={isVoterAuth?'block':'none'} ><Button _hover={{bg:"red"}} onClick={()=>handleLogoutVoter()} mt={'8px'} >Logout Voter</Button></Box>
    </Box>
}