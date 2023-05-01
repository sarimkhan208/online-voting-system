const express = require("express")
const voterRouter = express.Router()
const jwt = require("jsonwebtoken");
const VoterModel = require("../models/voter.model");


// Register as Voter
voterRouter.post("/signup",async(req,res)=>{
    req.body.isVoted = false;
    try{
        const voter = new VoterModel(req.body);
        await voter.save()
        res.status(200).send({"msg":"Voter has been registered"})
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})


// Sign in as Voter
voterRouter.post("/signin",async (req,res)=>{
    const {email,pass} = req.body
    try{
        const data = await VoterModel.find({email,pass})
        if(data.length>0){
            var token = jwt.sign({ btech : "project" }, 'btech')
            res.status(200).send({"msg":"Login successfull","token":token})
        }else{
            res.status(200).send({"msg":"wrong credentials"})   
        }
        
        
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})





module.exports = voterRouter