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

  export function HeroImageModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {setHeroImage} = useContext(AuthContext)
    return (
      <>
        <Button onClick={onOpen} bg={'blue.100'} >Change Logo</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Change Logo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input type='text' onChange={(e)=>setHeroImage(e.target.value)}/>
            </ModalBody>
  
            <ModalFooter>
              <Button color={'white'} bg={'green.500'} onClick={onClose}>Change</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }