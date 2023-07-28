
import SWExtra from "@/lib/model/swExtra"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()
        try{
            const services = await SWExtra.find({},{services:true})
const options = services.map((serv)=>serv.services.flat().map((s:any)=> s.category))
                res.status(201).json(options)
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
}