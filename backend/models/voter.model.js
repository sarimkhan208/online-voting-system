const mongoose = require("mongoose")

const voterSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:Number,required:true},
    pass:{type:String,required:true},
    isVoted:{type:Boolean,required:true}
},{versionKey:false})

const VoterModel = mongoose.model("voter",voterSchema)

module.exports = VoterModel