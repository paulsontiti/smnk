import dbConnect from '../../../lib/mongoose'
import Message from '@/lib/model/message'

export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {query:{receiverId}} = req
    
    try{
        if(receiverId){
            const msgs = await Message.find({receiverId,read:false})
        res.status(200).json(msgs.length)
        }else{
            res.status(400).json({message:'Invalid request.Provide Reciever Id'})
        }
        
    }catch(err){
        console.log(err)
        res.status(400).json({message:'Server error'})
    }
    
    
    
}