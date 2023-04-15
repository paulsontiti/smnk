
import User from "@/lib/model/userModel"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()
        try{
            const users = await User.find({type:'skilled worker'})
                res.status(201).json(users)
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
}