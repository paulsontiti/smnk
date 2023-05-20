import dbConnect from '../../../../lib/mongoose'
import User from '@/lib/model/userModel'

export default async function handler(req:any,res:any){
    await dbConnect()

        const {query:{userId}} = req

        
        if(userId){
                try{
                    const user = await User.findOne({_id:userId},{services:1,_id:0})
                    
                    res.status(201).json(user.services)
                }catch(err:any){
                    res.status(400).json({message:err.message})
                }
        
        }else{
            res.status(400).json({message:"Invalid request"})
        }
       
    
    
    
}