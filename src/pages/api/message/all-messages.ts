import dbConnect from '../../../lib/mongoose'
import Message from '@/lib/model/message'

export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()
    //console.log('from all msgs')
    const {receiverId} = req.body

    try{
        if(receiverId){
            const msgs = await Message.find({receiverId:receiverId})
            //console.log(msgs)
            res.status(201).json(msgs)
        }else{
            res.status(400).json({message:'Invalid request. Provide Receiver Id'})
        }
        
    }catch(err){
        console.log(err)
        res.status(400).json({message:'Server error'})
    }
    
    
    
}