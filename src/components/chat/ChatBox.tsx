import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ReceiverChatAccordion from "../accordion/ReceiverChatAccordion";

const ChatBox = ({isAdmin}:{isAdmin:boolean}) => {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `${process.env.SMNK_URL}/api/chat/${_id}`,
        });
        const data = res.data;
        setChats(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [_id]);
  return (
    <Container sx={{ mt: "1rem" }}>
      <Typography variant="h6">Chats</Typography>

      {chats &&
        chats.filter((chat)=> chat).map((chat: any, i) =>
          //senderId was swapped here with the current user and the receiverId for the chat sender
          //this is for the correct working of the ChatsAccordion.
          //At the component that displays chats senderId is the receiver while the receiverId is the sender

          chat && chat.senderId ? (
            //this user is the sender for chats while the chat.sender is the receiver
            <ReceiverChatAccordion receiverId={chat && chat.senderId} key={i} isAdmin={isAdmin} />
          ) : (
            <ReceiverChatAccordion receiverId={chat && chat.receiverId} key={i}  isAdmin={isAdmin}/>
          )
        )}
    </Container>
  );
};

export default ChatBox;
