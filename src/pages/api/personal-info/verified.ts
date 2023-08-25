import dbConnect from '../../../lib/mongoose'
import User from '@/lib/model/userModel'

export default async function handler(req:any,res:any){
    await dbConnect()

        const {userId} = req.body
        if(userId){
                try{
                    const info = await User.findOne({_id:userId})
                    if(info){
                        res.status(201).json(info.verification && info.verification.kycVerified)
                    }
                   else{
                    res.status(201).json(false)
                   }
                }catch(err:any){
                    res.status(400).json({message:err.message})
                }
        
        }else{
            res.status(400).json({message:"Invalid request"})
        }
       
    
    
    
}