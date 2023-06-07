import Chat from "@/lib/model/chat";
import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();
  const {
    query: { receiverId },
  } = req;
  if(receiverId){
    try {
      const receivedChats = await Chat.aggregate([
        { $match: { receiverId: new ObjectId(receiverId) } },
        { $group: { _id: "$senderId" } },
        { $project: { senderId: "$_id", _id: false } },
      ]);
      const sentChats = await Chat.aggregate([
        { $match: { senderId: new ObjectId(receiverId) } },
        { $group: { _id: "$receiverId" } },
        { $project: { receiverId: "$_id", _id: false } },
      ]);
  
      let filterredReceivedChats: any[] = [];
      if(sentChats.length > 0){
  
        sentChats.map((sentChat: any, i) => {
          filterredReceivedChats = receivedChats.map((receivedChat: any) => {
            if (
              receivedChat.senderId.toString() === sentChat.receiverId.toString()
            ) {
              sentChats[i] = undefined;
            }
            return receivedChat;
          });
        });
      }
      const chats = [sentChats, filterredReceivedChats];
      res.status(201).json(chats.flat());
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
