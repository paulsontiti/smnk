
import User from "@/lib/model/userModel"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {userId} = req.body
    if(userId){
        
        try{
            const newUser = await User.findOneAndUpdate({_id:userId},{'verification.kycVerified':true},{new:true})
            
                if(newUser){
                    res.status(201).json({message:`User's account is verified`,successful:true})
                }else{
                    res.status(201).json({message:"Sorry an error occurred,please try again",successful:false})
                }
                
            
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again",successful:false})
        }
        
    }else{
        res.status(400).json({message:"Invalid request. Please provide User Id",successful:false})
    }
    
    
}