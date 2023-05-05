import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    HStack,
  } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../Context/authContext';
import { Base_URL } from '../Base_URL';
import axios from 'axios';
  
  export default function VoterCard() {

    const {voterDetail} = useContext(AuthContext)



    return (
      <Center py={6}>
        <Box
          maxW={'270px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Image
            h={'120px'}
            w={'full'}
            src={
              'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            }
            objectFit={'cover'}
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              src={
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
              }
              alt={'Author'}
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>
  
          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                {voterDetail?.name}
              </Heading>
              <Text color={'gray.500'}>{voterDetail?.address}</Text>
            </Stack>
  
            <Stack direction={'row'} justify={'center'} spacing={6}>
              <HStack spacing={0} align={'center'}>
                <Text mr={'10px'} fontSize={'sm'} color={'gray.500'}>
                  Mobile No
                </Text>
                <Text fontWeight={600} >{voterDetail?.mobileNo}</Text>
              </HStack>
            </Stack>

            <Stack direction={'row'} justify={'center'} spacing={6}>
              <HStack spacing={0} align={'center'}>
                <Text mr={'10px'} fontSize={'sm'} color={'gray.500'}>
                  Date of Birth
                </Text>
                <Text fontWeight={600} >{voterDetail?.dob}</Text>
              </HStack>
            </Stack>

            <Stack direction={'row'} justify={'center'} spacing={6}>
              <HStack spacing={0} align={'center'}>
                <Text mr={'10px'} fontSize={'sm'} color={'gray.500'}>
                  Voted
                </Text>
                <Text color={voterDetail.isVoted?"green":"red"} fontWeight={600} >{voterDetail?.isVoted?"True":"False"}</Text>
              </HStack>
            </Stack>
  
            <Button
              w={'full'}
              mt={8}
              bg={useColorModeValue('#151f21', 'gray.900')}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}>
              Follow
            </Button>
          </Box>
        </Box>
      </Center>
    );
  }