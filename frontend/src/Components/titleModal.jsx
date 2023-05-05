import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
  } from '@chakra-ui/react'
import { useContext } from 'react'
import { AuthContext } from '../Context/authContext'

  export function TitleModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {setTitle} = useContext(AuthContext)
    return (
      <>
        <Button onClick={onOpen} bg={'blue.500'} >Edit Title</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit the title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input type='text' onChange={(e)=>setTitle(e.target.value)}/>
            </ModalBody>
  
            <ModalFooter>
              <Button bg={'teal'} onClick={onClose}>Edit title</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }