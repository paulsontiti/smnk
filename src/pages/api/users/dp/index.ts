
import User from "@/lib/model/userModel"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {userId} = req.body
    if(userId){

        try{
            const user = await User.findById(userId,{_id:false,dpFileName:true})
            res.status(201).json(user.dpFileName)
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide Job Id"})
    }
    
    
}