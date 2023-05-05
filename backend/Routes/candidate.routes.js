const express = require("express")
const candidateRouter = express.Router()
const jwt = require("jsonwebtoken");
const CanditateModel = require("../models/candidate.model");
const auth = require("../middleware/auth.middleware");



// Register as Admin
candidateRouter.post("/create",auth,async(req,res)=>{
    req.body.voteCount=0
    try{
        const party = new CanditateModel(req.body);
        await party.save()
        res.status(200).send({"msg":"Party has been created"})
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

candidateRouter.get("/",async(req,res)=>{
    try{
        const party = await CanditateModel.find()
        res.status(200).send(party)
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

candidateRouter.get("/singlecandidate/:id",async(req,res)=>{
    const {id} = req.params
    const party = await CanditateModel.findOne({_id:id})
    try{
        res.status(200).send(party)
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

candidateRouter.patch("/update/:id",async (req,res)=>{
    const {id} = req.params;
    try{
        await CanditateModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({"msg":"Candidate has been updated"})
    }catch(err){
        res.status(400).send({"err":err})
    }
})



candidateRouter.delete("/delete/:id",async (req,res)=>{
    const {id} = req.params;
    try{
        await CanditateModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"Candidate has been deleted"})
    }catch(err){
        res.status(400).send({"err":err})
    }
})








module.exports = candidateRouter