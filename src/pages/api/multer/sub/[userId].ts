import Job from "@/lib/model/job"
import User from "@/lib/model/userModel"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    await dbConnect()
    const {query:{userId}} = req

    if(userId){

        try{
              const sub = await User.findOne({_id:userId},{subscription:1})
              //console.log(sub)
                res.status(201).json(sub.subscription.pop)
              
        }catch(err:any){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
    }else{
        res.status(400).json({message:"Invalid request. Provide User Id"})
    }
}