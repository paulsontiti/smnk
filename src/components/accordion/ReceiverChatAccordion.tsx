import ChatHeader from "../chat/ChatHeader";



export default function ReceiverChatAccordion({isAdmin,
  receiverId
}: {
   isAdmin:boolean,
  receiverId: string;
}) {
   return (
<ChatHeader isChatRoom={true} receiverId={receiverId} isAdmin={isAdmin}/>
   )
}


  