const express = require("express")
const partyRouter = express.Router()
const jwt = require("jsonwebtoken");
const PartyModel = require("../models/partyCreation.model");


// Register as Admin
partyRouter.post("/create",async(req,res)=>{
    try{
        const party = new PartyModel(req.body);
        await party.save()
        res.status(200).send({"msg":"Party has been created"})
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

partyRouter.get("/",async(req,res)=>{
    try{
        const party = await PartyModel.find()
        res.status(200).send({"msg":party})
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})








module.exports = partyRouter