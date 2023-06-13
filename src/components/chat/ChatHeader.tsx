import { Box, Typography, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserInfo, getUserProfile } from "@/lib/utils/user";
import { useRouter } from "next/router";
import BackToChatRoomFloatingActionButtons from "../fab/BackToChatRoomFloatingActionButtons";

function ChatHeader({
  receiverId,
  isChatRoom,
}: {
  isChatRoom: boolean;
  receiverId: string;
}) {
  const [name, setName] = useState("Admin");
  const [senderDp, setSenderDp] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await getUserProfile(receiverId);

      if (data) {
        if (data.firstName) {
          setName(data.firstName + " " + data.lastName);
        } else {
          setName(data.name);
        }
      } else {
        setName("Admin");
      }
      //get sender dp
      const res = await getUserInfo(receiverId);
      if (res.data) {
        setSenderDp(res.data.dpFileName);
      }
    })();
  }, [receiverId]);

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={1}
      onClick={() => {
        //clickable only in chatroom
        if (isChatRoom) {
          router.push(`/chat/${receiverId}`);
        }
      }}
    >
      <Box display={"flex"} alignItems={"center"} justifyContent={"flex-start"}>
        {senderDp && <Avatar src={`/api/multer/profile-pic/${senderDp}`} />}
        <Typography sx={{ ml: "1rem", textTransform: "capitalize" }}>
          {name}
        </Typography>
      </Box>
      {!isChatRoom && <BackToChatRoomFloatingActionButtons/>}
    </Box>
  );
}

export default ChatHeader;
