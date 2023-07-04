import Chat from "@/lib/model/chat";
import dbConnect from "@/lib/mongoose";

export default async function handler(req: any, res: any) {
  //get database connection
  await dbConnect();
  const { senderId, receiverId, chat } = req.body;

  try {
    //check if this user has a chat history
    const chatHistory = await Chat.findOne({ userId: senderId });
    if (chatHistory) {
      //check if user has a chat history with the receiver
      const oldChat = chatHistory.chats.find(
        (chat: any) => chat.youId.toString() === receiverId
      );
      if (oldChat) {
        //add chat to existing chat history
        oldChat.me.push({ chat,time: new Date() });
        oldChat.lastChatAt = new Date()
        await chatHistory.save()
      } else {
        //create a new chat history
        chatHistory.chats.push({
            me:[{chat,time: new Date()}],youId:receiverId,lastChatAt:new Date()
        })
        await chatHistory.save()
      }
    } else {
      //create a chat history if no history
      const newChat = {
        userId: senderId,
        chats: [
          {
            me: [
              {
                chat,time: new Date()
              },
            ],
            youId: receiverId,lastChatAt:new Date()
          },
        ],
      };
      await Chat.create(newChat);
    }
    res.json("");
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Sorry an error occurred,please try again" });
  }
}
