import SWExtra from "@/lib/model/swExtra"
import dbConnect from "@/lib/mongoose"
import { SWExtra as SW } from "@/lib/types/userInfo"


export default async function handler(req:any,res:any){
    const {userId} = req.query

    if(userId){
 //get database connection
 await dbConnect()
    
 try{
     const swExtra = await SWExtra.findOne({userId})
     if(swExtra){
        res.status(201).json(swExtra)
     }else{
        res.status(201).json({} as SW)
     }
     
 }catch(err){
    console.log(err)
    res.status(400).json({})
 }
    }else{
        res.status(400).json({})
    }
   
    
    
    
}