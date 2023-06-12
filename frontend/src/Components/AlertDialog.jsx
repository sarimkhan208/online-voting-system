import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
    useToast,
    Box
  } from '@chakra-ui/react'
import { useRef } from 'react'
import axios from 'axios'

 export default function AlertDialogBox({id,forcedRender}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const toast = useToast()

    

    const handleDelete = ()=>{
        onClose()
        axios.delete(`${process.env.REACT_APP_BASE_URL}/candidate/delete/${id}`,{
            headers: {
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('admintoken'))}`
            }
        })
        .then((res)=>{
            toast({
                title: 'Candidate has been deleted',
                status: 'error',
                duration: 2000,
                position: 'top',
                isClosable: true,
            })
        }).catch((err)=>{
            console.log(err)
        })
        forcedRender()
    }
  
    return (
      <Box>
        <Button justify="center" align="center"  fontSize={{base:'12px',sm:'15px'}} colorScheme='red' onClick={onOpen}>
          Remove
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Remove Candidate
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure? You want to remove this candidate.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red'  onClick={()=>handleDelete()}   ml={3}>
                  Remove Candidate
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    )
  }