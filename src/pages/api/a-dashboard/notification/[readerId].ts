import Notification from '@/lib/model/notification'
import dbConnect from '../../../../lib/mongoose'

export default async function handler(req:any,res:any){
    const {readerId} = req.query

    await dbConnect()
    
                try{
                    const notifications = await Notification.find()
                    const filtered = notifications.map((notification)=>{
                        if(notification.usersId.length === 0){
                            return notification
                        }
                      
                      const not = notification.usersId.find((userId:any)=>userId.toString() === readerId)
                       if(!not)                        return notification
                      
                    })
                    res.status(201).json(filtered.filter((not)=>not !== undefined))
                }catch(err:any){
                    console.log(err)
                    res.status(400).json({message:"Server Error"})
                }
    
}