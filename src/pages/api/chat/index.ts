
import Chat from "@/lib/model/chat"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()
    const {senderId,receiverId,chat} = req.body
    
        try{
            await Chat.create({senderId,receiverId,chat})
                res.status(201).json('')
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
}