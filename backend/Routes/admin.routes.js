const express = require("express")

const AdminModel = require("../models/admin.model");
const adminRouter = express.Router()
const jwt = require("jsonwebtoken")


// Register as Admin
adminRouter.post("/signup",async(req,res)=>{
    try{
        const user = new AdminModel(req.body);
        await user.save()
        res.status(200).send({"msg":"User has been registered"})
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})


// Sign in as Admin
adminRouter.post("/signin",async (req,res)=>{
    const {email,pass} = req.body
    try{
        const data = await AdminModel.find({email,pass})
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





module.exports = adminRouter