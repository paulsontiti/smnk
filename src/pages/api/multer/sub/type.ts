
import User from "@/lib/model/userModel"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    await dbConnect()
    const {body:{_id}} = req

    if(_id){

        try{
              const sub = await User.findById(_id,{subscription:true,_id:false})
                res.status(201).json(sub.subscription.type)
              
        }catch(err:any){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
    }else{
        res.status(400).json({message:"Invalid request. Provide User Id"})
    }
}