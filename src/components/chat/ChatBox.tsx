import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ErrorAlert from "../alerts/Error";
import LoadingAlert from "../alerts/Loading";
import InfoAlert from "../alerts/Info";
import ChatHeader from "./ChatHeader";

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
        setChats(
          data.sort(function (a: any, b: any) {
            let x = a.date.toLowerCase();
            let y = b.date.toLowerCase();
            if (x < y) {
              return 1;
            }
            if (x > y) {
              return -1;
            }
            return 0;
          })
        );
      } catch (err) {
        console.log(err);
        setError(err);
      }
    })();
  }, [_id]);
  if (error)
    return <ErrorAlert message="An Error occurred while loading your chats" />;
  if (!chats) return <LoadingAlert />;
  if (chats && chats.length < 1)
    return (
      <Container>
        <Typography variant="h6">Chat Room</Typography>
        <InfoAlert message="No Chats" />
      </Container>
    );
  return (
    <Container sx={{ mt: "1rem" }}>
      <Typography variant="h6">Chat Room</Typography>

      {chats &&
        chats.map((chat) => (
          <ChatHeader
            receiverId={chat.userId}
            isChatRoom={true}
            key={chat.userId}
          />
        ))}
    </Container>
  );
};

export default ChatBox;
