import Chat from "@/lib/model/chat";
import dbConnect from "@/lib/mongoose";
import { SeeChats } from "./see-chats";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();
  const { senderId, receiverId } = req.body;
  try {
    //get sender chats
    const senderChats = await Chat.findOne(
      { userId:senderId},
     { chats: true}
    );
    let sentChatsByReceiverId
    if(senderChats){
      sentChatsByReceiverId= senderChats.chats.filter((chat:any)=> chat.youId.toString() === receiverId )
      
     
    }
    //get receiver chats
    const receiverChats = await Chat.findOne(
      { userId: receiverId },
      { chats: true, }
    );
    let receivedChatsBySenderId 
    if(receiverChats){
      receivedChatsBySenderId =  receiverChats.chats.filter((chat:any)=> chat.youId.toString() === senderId )
   
     SeeChats(receiverChats,'read')
    }
    if (sentChatsByReceiverId && receivedChatsBySenderId) {
      res
        .status(201)
        .json({ sender: sentChatsByReceiverId[0], receiver: receivedChatsBySenderId[0] });
    } else if (sentChatsByReceiverId) {
      res.status(201).json({ sender: sentChatsByReceiverId[0], receiver: null });
    } else if (receivedChatsBySenderId) {
      res.status(201).json({ sender: null, receiver: receivedChatsBySenderId[0] });
    } else {
      res.status(201).json(null);
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Sorry an error occurred,please try again" });
  }
}
