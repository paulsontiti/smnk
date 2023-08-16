import SWExtra from "@/lib/model/swExtra"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {userId} = req.body
    try{
        const swExtra = await SWExtra.findOne({userId},{subscription:true})
        res.json(swExtra ? swExtra.subscription : null)
    }catch(err:any){
        console.log(err)
        res.json({errMsg:err.message})
    }
    
    
    
}