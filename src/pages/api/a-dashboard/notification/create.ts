import Notification from "@/lib/model/notification"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    await dbConnect()
        const {title,message} = req.body
       
        if(title && message){
            try{
                const notification = await Notification.create({title,message})
                if(notification){
                    res.status(201).json({message:"Your message was successfully broadcasted",successful:true})
                }else{
                    res.status(400).json({message:"Sorry an error occurred,please try again",successful:false})
                }
            }catch(err:any){
                console.log(err)
                res.status(400).json({message:"Sorry an error occurred,please try again",successful:false})
            }
        
        }else{
            res.status(400).json({message:"Incomplete details",successful:false})
        }   
    
}