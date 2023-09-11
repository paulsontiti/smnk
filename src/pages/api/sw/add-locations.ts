import SWExtra from "@/lib/model/swExtra"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {userId,locations} = req.body
    try{
        const swExtra = await SWExtra.findOne({userId})
        swExtra.subscription.locations = locations
        const newExtra = await swExtra.save()
        res.json(newExtra ? true : false)
    }catch(err:any){
        console.log(err)
        res.json({errMsg:err.message})
    }
    
    
    
}