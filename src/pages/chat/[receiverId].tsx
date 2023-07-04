import { ChatGround } from "@/components/chat";
import Layout from "@/components/dashboard/layout";
import { RootState } from "@/store";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function SingleChatPlatform() {
  const router = useRouter();
  const receiverId = router.query.receiverId as string;
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [chats, setChats] = useState([]);
  //fetch chats
  useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}/api/chat/read`,
          data: { senderId: _id, receiverId },
        });
        const data = res.data;
        setChats(data);
      } catch (err) {
        console.log(err);
      }
    })();
  });

  return (
    <Layout>
      <ChatGround senderId={_id} chats={chats} receiverId={receiverId} />
    </Layout>
  );
}

export default SingleChatPlatform;
