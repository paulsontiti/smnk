import dbConnect from '../../../lib/mongoose'
import User from '@/lib/model/userModel'

export default async function handler(req:any,res:any){
    await dbConnect()

        const {query:{userIdForInfo}} = req
        if(userIdForInfo){
                try{
                    const info = await User.findOne({_id:userIdForInfo})
                    res.status(201).json(info)
                }catch(err:any){
                    res.status(400).json({message:err.message})
                }
        
        }else{
            res.status(400).json({message:"Invalid request"})
        }
       
    
    
    
}