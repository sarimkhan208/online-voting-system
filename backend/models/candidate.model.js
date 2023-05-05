const mongoose = require("mongoose")

const canditateSchema = mongoose.Schema({
    image:{type:String,required:true},
    name:{type:String,required:true},
    position:{type:String,required:true},
    voteCount:{type:Number,required:true}
},{versionKey:false})

const CanditateModel = mongoose.model("candidate",canditateSchema)

module.exports = CanditateModel
