import User from '@/lib/model/userModel'
import dbConnect from '../../../../lib/mongoose'

export default async function handler(req:any,res:any){
    await dbConnect()
    
        const {query:{userIdForExp}} = req
        if(userIdForExp){
                try{
                    
                    const user = await User.findOne({_id:userIdForExp},{experience:1,_id:0})
                    res.status(201).json(user.experience)
                }catch(err:any){
                    res.status(400).json(err)
                }
        
        }else{
            res.status(400).json({message:"Invalid request"})
        }
    
    
}