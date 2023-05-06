import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {CSVLink} from 'react-csv'
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
    Box,
    Button,
  } from '@chakra-ui/react'


const FinalResult = () => {
    const [data,setData] = useState([])
    let totalVote=0;
    let maxVote=-Infinity
    let winner;

    for(let i=0; i<data?.length; i++){
        totalVote+=data[i].voteCount;
        if(maxVote<data[i].voteCount){
            winner=data[i].name
            maxVote=data[i].voteCount
        }
    }


    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASE_URL}/candidate`)
        .then((res)=>{
            setData([...res.data])
        })
        .catch((err)=>console.log(err))
    },[])

    let excelData = [];
    if(data){
        let result1 = {
            "_id" : "",
            "image" : "",
            "name" : "",
            "position" : "",
            "voteCount" : ""
        }
        let result2 = {
            "_id" : "Total Vote",
            "image" : "",
            "name" : "",
            "position" : "",
            "voteCount" : totalVote
        }
        let result3 = {
            "_id" : "Winner",
            "image" : "",
            "name" : "",
            "position" : "",
            "voteCount" : winner
        }
        for(let i=0; i<data.length; i++){
            excelData.push(data[i])
        }
        excelData.push(result1)
        excelData.push(result2)
        excelData.push(result3)
    }

    


  return (
    <Box>
        <Button bg={'green.300'} color='white' m={'3'} mb={'5'} >
            <CSVLink data={excelData} onClick={()=>{}} >Export Data</CSVLink>
        </Button>
        <TableContainer>
            <Table>
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
                <Tr>
                <Th>Name</Th>
                <Th>Position</Th>
                <Th>Vote</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    data.map((el)=>(
                        <Tr key={el._id} >
                            <Td>{el.name}</Td>
                            <Td>{el.position}</Td>
                            <Td>{el.voteCount}</Td>
                        </Tr>
                    ))
                }
                <Tr fontWeight={'700'}>
                    <Td></Td>
                    <Td>Results</Td>
                    <Td></Td>
                </Tr>
                <Tr bg={'#E0F2F1'} fontWeight={'700'}>
                    <Td>Total Vote</Td>
                    <Td></Td>
                    <Td>{totalVote}</Td>
                </Tr>
                <Tr bg={'#A5D6A7'} fontWeight={'700'} >
                    <Td>Winner</Td>
                    <Td></Td>
                    <Td>{winner}</Td>
                </Tr>
            </Tbody>
            </Table>
        </TableContainer>
    </Box>
  )
}

export default FinalResult
