
import Message from "@/lib/model/message"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    await dbConnect()

        const {message,receiverId,senderId,subject} = req.body
        
        if(message && receiverId && senderId && subject){
            try{
                  const msg = await Message.create(req.body)
                  if(msg){
                    res.status(201).json({message:"Your Message was successfully sent",successful:true})
                  }else{
                    res.status(201).json({message:"Sorry an error occurred,please try again",successful:false})
                  }
            }catch(err:any){
                console.log(err)
                res.status(400).json({message:"Sorry an error occurred,please try again",successful:false})
            }
        
        }else{
            res.status(400).json({message:"Incomplete details",successful:false})
        }   
    
}