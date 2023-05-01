require("dotenv").config()
const express = require("express")
const connection = require("./connection/connection")
const adminRouter = require("./Routes/admin.routes")
const partyRouter = require("./Routes/party.routes")
const auth = require("./middleware/auth.middleware")
const voterRouter = require("./Routes/voter.routes")

const app = express()
app.use(express.json())

app.use("/admin",adminRouter)
app.use("/party",auth,partyRouter)
app.use("/voter",voterRouter)



app.listen(process.env.PORT,async ()=>{
    try{
        await connection
        console.log("You are now connected to mongoDB")
    }catch(err){
        console.log("An error occured",err)
    }
    console.log(`server is running at PORT : ${process.env.PORT}`)
})



// {
//     "email":"tony@gmail.com",
//     "image":"img",
//     "name":"sarim",
//     "mobile":"566"
//   }