const jwt = require("jsonwebtoken")

const auth = async (req,res,next) => {
    const token = req.headers.authorization
    if(token){
        try{
            const decoded = jwt.verify(token.split(" ")[1],"btech")
            if(decoded){
                next()
            }else{
                res.status(200).send({"msg":"Pls Login!!!"})
            }
        }catch(err){
            res.status(400).send({"err":err.message})
        }
    }else{
        res.status(200).send({"msg":"Please Login first"})
    }
}

module.exports = auth