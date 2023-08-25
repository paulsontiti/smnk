import SWExtra from "@/lib/model/swExtra"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    const {userId} = req.query

    if(userId){
 //get database connection
 await dbConnect()
    
 try{
     const swExtra = await SWExtra.findOne({userId},{bankDetails:true,_id:false})
     console.log(swExtra)
     if(swExtra){
        res.status(201).json(swExtra.bankDetails)
     }else{
        res.status(201).json(null)
     }
     
 }catch(err){
    console.log(err)
    res.status(400).json({})
 }
    }else{
        res.status(400).json({})
    }
   
    
    
    
}