require("dotenv").config()
const express = require("express")
const connection = require("./connection/connection")
const adminRouter = require("./Routes/admin.routes")
const candidateRouter = require("./Routes/candidate.routes")
const auth = require("./middleware/auth.middleware")
const voterRouter = require("./Routes/voter.routes")
const cors = require("cors")
const nodemailer = require("nodemailer")
const app = express()
app.use(express.json())
app.use(cors())

let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_MAIL, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
});



app.post("/send",async (req,res)=>{
    const {email,message} = req.body
    var mailOpt = {
        from:process.env.SMTP_MAIL,
        to:email,
        subject:"code verfication",
        text: message,
    }

    

    transporter.sendMail(mailOpt,(err,info)=>{
        if(err){
            console.log(err)
        }else{
            console.log("email send successfully")
        }
    })

    res.send("home")
})


app.use("/admin",adminRouter)
app.use("/candidate",candidateRouter)
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



