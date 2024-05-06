import { Request, Response } from "express";

export const logoutHandler = async (req : Request , res : Response) => {
    if(req.user){
        req.logOut((error)=>{
            if(error) return res.json({error})
            req.session.destroy((error)=>{
                return res.json({error})
            })
    
            return res.json({
                success : true, 
                message:"user loged out successfully"
            })
        }) 
    }else{
        return res.json({
            success : false, 
            message:"User is already logged out!"
        })
    }  
}