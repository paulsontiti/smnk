import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ReceiverChatAccordion from "../accordion/ReceiverChatAccordion";
import ErrorAlert from "../alerts/Error";
import LoadingAlert from "../alerts/Loading";
import InfoAlert from "../alerts/Info";

const ChatBox = () => {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [chats, setChats] = useState<any[] | null>(null);
  const [error, setError] = useState<any | null>(null);

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
        console.log(err)
       setError(err)
      }
    })();
  }, [_id]);

  if(error) return <ErrorAlert message="An Error occurred while loading your chats"/>
  if(!chats) return <LoadingAlert/>
  if(chats && chats.length < 1)  return(
    <Container>
    <Typography variant="h6">Chat Room</Typography>
    <InfoAlert message="No Chats"/>
    </Container>
  )
  return (
    <Container sx={{ mt: "1rem" }}>
      <Typography variant="h6">Chat Room</Typography>

      {chats &&
        chats.filter((chat)=> chat).map((chat: any, i) =>
          //senderId was swapped here with the current user and the receiverId for the chat sender
          //this is for the correct working of the ChatsAccordion.
          //At the component that displays chats senderId is the receiver while the receiverId is the sender

          chat && chat.senderId ? (
            //this user is the sender for chats while the chat.sender is the receiver
            <ReceiverChatAccordion receiverId={chat && chat.senderId} key={i}/>
          ) : (
            <ReceiverChatAccordion receiverId={chat && chat.receiverId} key={i}/>
          )
        )}
    </Container>
  );
};

export default ChatBox;
