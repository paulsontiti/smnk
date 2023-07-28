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
  const [name, setName] = useState<string | null>(null);
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
      onClick={() => {
        //clickable only in chatroom
        if (isChatRoom) {
          router.push(`/chat/${receiverId}`);
        }
      }}
      minWidth={"100%"}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={2}
      >
        <Box display={"flex"} alignItems={"center"}>
          {" "}
          {senderDp && <Avatar src={`/api/multer/profile-pic/${senderDp}`} />}
          {name && (
            <Typography sx={{ ml: "1rem", textTransform: "capitalize" }}>
              {name}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ChatHeader;
