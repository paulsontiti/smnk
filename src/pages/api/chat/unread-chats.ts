import Chat from "@/lib/model/chat";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();
  const { receiverId,senderId } = req.body;
  
  if (receiverId && senderId) {
    try {
      const chats = await Chat.find({
       $and :[{userId:senderId},{ "chats.youId": receiverId}]
      });
      let count = 0
chats.map((chat)=>{
    chat.chats.map((c:any)=>{
c.me.map((msg:any)=>{
    if(msg.read === false){
       count++
    }
})
    })
})
      res.status(201).json(count);
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ message: "Sorry an error occurred,please try again" });
    }
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
}
