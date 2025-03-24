const jwt=require("jsonwebtoken");
require("dotenv").config();
const userJwt= process.env.userjwt_password;
function userMiddleware(req,res,next){
    const token=req.headers.token;
    const decode=jwt.verify(token,userJwt);
    if(decode){
        const userid=decode.id;
        next();
    }
    else{
        res.json("Invalid token");
    }
}

module.exports={
    userMiddleware
}