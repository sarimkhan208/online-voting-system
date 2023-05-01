const mongoose = require("mongoose")

const partySchema = mongoose.Schema({
    image:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
},{versionKey:false})

const PartyModel = mongoose.model("party",partySchema)

module.exports = PartyModel