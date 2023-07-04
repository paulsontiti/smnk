import Chat from "@/lib/model/chat";
import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();
  const {
    query: { userId },
  } = req;
  
  if(userId){
    try {
   const sentChats = await Chat.findOne({userId})
   const receivedChats = await Chat.find({'chats.youId':userId})
   const idList:any[] = []
   if(sentChats){
    sentChats.chats.map((chat:any)=>{
      idList.push({userId:chat.youId.toString(),date:chat.lastChatAt})
     })
   }
   if(receivedChats){
    receivedChats.map((chat:any)=>{
     const sender = chat.userId.toString()
     let date;
      chat.chats.map((c:any)=>{
      if(c.youId.toString() === userId){
        date = c.lastChatAt
      }
     })
        idList.push({userId:sender,date})
     })
   }
   const filteredList:any[] = []
   idList.map((list,i)=>{
    if(!filteredList.find((item:any)=>item.userId === list.userId)){
     filteredList.push(list)
    }
   
   })
   res.status(201).json(filteredList)
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ message: "Sorry an error occurred,please try again" });
    }
  }else{
    res
    .status(400)
    .json({ message: "Invalid request" });
  }
}
