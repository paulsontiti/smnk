import SWExtra from "@/lib/model/swExtra"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    const {userId} = req.query

    if(userId){
 //get database connection
 await dbConnect()
    
 try{
     const swExtra = await SWExtra.findOne({userId},{experience:true,_id:false})
        res.status(201).json(swExtra ? swExtra.experience : null)
     
 }catch(err){
    console.log(err)
    res.status(400).json(null)
 }
    }else{
        res.status(400).json(null)
    }
   
    
    
    
}