import { Message, allMessages } from "@/lib/message";
import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MessageComponent from "./MessageComponent";
import { Box } from "@mui/material";

function Messages() {
  const { _id } = useSelector((state: RootState) => state.users.user);

  const [msgs, setMsgs] = useState<Message[]>([]);
  useEffect(() => {
    (async function () {
      const data = await allMessages(_id);
      setMsgs(data);
    })();
  }, [_id]);
  //console.log(msgs)
  return (
    <Box>
      {msgs.map((msg) => (
        <MessageComponent key={msg._id} message={msg} />
      ))}
    </Box>
  );
}

export default Messages;
