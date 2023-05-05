const express = require("express")
const voterRouter = express.Router()
const jwt = require("jsonwebtoken");
const VoterModel = require("../models/voter.model");
const auth = require("../middleware/auth.middleware");


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
    const {email,password} = req.body
    const voterDetail = await VoterModel.findOne({email:email,password:password})
    try{
        const data = await VoterModel.find({email,password})
        if(data.length>0){
            var token = jwt.sign({ btech : "project" }, 'btech')
            res.status(200).send({"msg":"Login successfull","token":token,"voterDetail":voterDetail})
        }else{
            res.status(200).send({"msg":"wrong credentials"})   
        }
        
        
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

voterRouter.get("/",async(req,res)=>{
    const voter = await VoterModel.find()
    try{
        res.status(200).send(voter)
    }catch(err){
        res.status(400).send({"err":err})
    }
})

voterRouter.get("/singlevoter/:id",async(req,res)=>{
    const {id} = req.params
    const voter = await VoterModel.findOne({_id:id})
    try{
        res.status(200).send(voter)
    }catch(err){
        res.status(400).send({"err":err})
    }
})

voterRouter.patch("/update/:id",async (req,res)=>{
    const {id} = req.params;
    try{
        await VoterModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({"msg":"voter is updated has been updated"})
    }catch(err){
        res.status(400).send({"err":err})
    }
})





module.exports = voterRouter