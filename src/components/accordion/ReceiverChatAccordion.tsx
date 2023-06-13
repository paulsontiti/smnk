import ChatHeader from "../chat/ChatHeader";



export default function ReceiverChatAccordion({
  receiverId
}: {
  receiverId: string;
}) {
   return (
<ChatHeader isChatRoom={true} receiverId={receiverId}/>
   )
}


  