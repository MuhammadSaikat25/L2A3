import { RequestHandler } from "express";
import { authService } from "./auth.service";

const loginUser:RequestHandler=async(req,res,next)=>{
try {
  console.log(req.user,"AC")
  const result= await authService.loginUser(req.body)
  
  res.status(200).json({
    success:result?true:false,
    message:result?"User login successful":"User dose not exist",
    data:result
  })

} catch (error) {
    res.status(400).json({
        success:false,
        message:"Something went wrong"
    })
}
}

export const authController={
    loginUser
}