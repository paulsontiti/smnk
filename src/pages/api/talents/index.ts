
import SWExtra from "@/lib/model/swExtra"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()
        try{
            const swExtra = await SWExtra.find({},{services:true})
if(swExtra.length > 0){
    swExtra.map((sw)=>{
        if(sw.services.length > 0){
            const options =  sw.services.flat().map((s:any)=> s.category)
                res.status(201).json(options.flat())
        }else{
            res.status(201).json(undefined)
        }
 })
}else{
    res.status(201).json(undefined)
}
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
}