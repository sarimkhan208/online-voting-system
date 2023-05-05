const mongoose = require("mongoose")

const voterSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    mobileNo:{type:Number,required:true},
    dob:{type:String,required:true},
    address:{type:String,required:true},
    isVoted:{type:Boolean,required:true}
},{versionKey:false})

const VoterModel = mongoose.model("voter",voterSchema)

module.exports = VoterModel