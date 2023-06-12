import { Box, Button, Icon, useToast } from "@chakra-ui/react"
import { useContext } from "react"
import { AuthContext } from "../Context/authContext"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import {GiHamburgerMenu} from 'react-icons/gi'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react'

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


    return <Box bg='teal' py={'3px'} display={'flex'} justifyContent={'space-between'} px={{base:'10px',sm:'50px'}} >
        <RouterLink to='/' ><Box fontWeight={'700'} textAlign={'left'} color={'white'} fontSize={{base:'25px',sm:'45px'}}>Online Voting System</Box></RouterLink>
        <Box display={isAdminAuth || isVoterAuth?'block':'none'} mt={{base:'2px',sm:'10px'}} >
            <Menu >
                <MenuButton as={Button} bg={'teal'}  _hover={{bg:'teal'}}  >
                    <Icon as={GiHamburgerMenu} bg={'teal'} color={'white'} _hover={{bg:'teal'}} />
                </MenuButton>
                <MenuList>
                    <MenuItem display={isAdminAuth?'block':'none'} onClick={()=>handleLogoutAdmin()} >Logout As Admin</MenuItem>
                    <MenuItem display={isVoterAuth?'block':'none'} onClick={()=>handleLogoutVoter()}>Logout As Voter</MenuItem>
                </MenuList>
            </Menu>
        </Box>
    </Box>
}