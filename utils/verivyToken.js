import jwt from "jsonwebtoken"

export const verifyUser = (req,res,next)=>{
    let token = req.cookies.accessToken
    if(!token){
        const header = req.headers["authorization"]
        if(!header){
            return res.status(403).json({success:false,message:"You are not authorize"})
        }
        token = header.split(" ")[1]
    }
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(401).json({success:false,message:"Token invalid"})
        }
        req.user = user
        next()
    })
} 
export const verifyAdmin = (req,res,next)=>{
    verifyUser(req,res,()=>{
        if(req.user.role == "admin"){
            next()
        }else{
            return res.status(401).json({success:false,message:"You are not authorize"})
        }
    })
}