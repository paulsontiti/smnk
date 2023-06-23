import Job from "@/lib/model/job"
import dbConnect from "@/lib/mongoose"
import { UpdateSWExtra } from "../../sw-dashboard/bank-details/edit-bank-details"
import SWExtra from "@/lib/model/swExtra"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {userId,catalog} = req.body
  try{
    const extra = await SWExtra.findOne({userId})
    extra.catalog = catalog
    const newSwExtra = await extra.save()
    if(newSwExtra){
        res.status(201).json({message:'Delete was successful',successful:true})
    }else{
        res.status(400).json({message:'Unable to delete,Please try again',successful:false})
    }
   
  }catch(err){
    console.log(err)
    res.status(400).json({message:'Unable to delete,Please try again',successful:false})
  }
    
    
}