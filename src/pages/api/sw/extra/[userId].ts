import SWExtra from "@/lib/model/swExtra"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {userId} = req.query
    try{
        const swExtra = await SWExtra.findOne({userId})
        res.json(swExtra)
    }catch(err:any){
        console.log(err)
        res.json({errMsg:err.message})
    }
    
    
    
}