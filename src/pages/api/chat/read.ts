
import Chat from "@/lib/model/chat"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()
    const {senderId,receiverId} = req.body
        try{
            //get sender chats
           const senderChats = await Chat.find({senderId,receiverId})
           //get receiver chats
           const receiverChats = await Chat.find({senderId:receiverId,receiverId:senderId})
           //merge bothh in an array
           const chats = [senderChats,receiverChats]
           //flat the array and sort by createdAt time
           const sortedChats = chats.flat().sort((a,b)=> a.createdAt-b.createdAt) 
                res.status(201).json(sortedChats)
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
}