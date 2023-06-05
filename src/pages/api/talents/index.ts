
import User from "@/lib/model/userModel"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()
        try{
            const services = await User.find({type:'skilled worker'},{services:true})
const options = services.map((serv)=>serv.services.flat().map((s:any)=> [s.title,s.category]))
                res.status(201).json(options.flat())
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
}