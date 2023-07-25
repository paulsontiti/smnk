
import Chat from "@/lib/model/chat"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()
    const {receiverId} = req.body
       if(receiverId){
        try{
            const chats =  await Chat.find({'chats.youId':receiverId,'chats.me.seen':false})
//             let unSeenChats = 0
//             chats.map((chat)=>{
//                chat.chats.map((ch:any)=>{
//                 ch.me.map((me:any)=>{
//                    if(!me.seen){
// unSeenChats++
//                    }
//                 })
//                })
//             })

                  res.status(201).json(chats.length)
          }catch(err){
              console.log(err)
              res.status(400).json({message:"Sorry an error occurred,please try again"})
          }
       }else{
        res.status(400).json({message:"Invalid request"})
       }
}