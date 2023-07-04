import Chat from "@/lib/model/chat";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();
  const {
    query: { receiverId },
  } = req;
  if(receiverId){
    try {
     const chats = await Chat.find({receiverId})
     //sort the chats according to created date
     const sortedChats = chats.sort((a,b)=> a.createdAt - b.createdAt)
     res.json(sortedChats)
    }catch(err){

    }
  }else{
    res
    .status(400)
    .json({ message: "Invalid request" });
  }
}
