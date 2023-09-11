import { Box, Typography, Badge, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserDp, getUserProfile } from "@/lib/utils/user";
import { useRouter } from "next/router";
import { SmnkErrorBoundary } from "@/pages/_app";
import { BlackAvatar } from "../avatar/DashboardDp";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { unReadChats } from "@/lib/chat";

function ChatHeader({
  senderId,
  isChatRoom,
}: {
  isChatRoom: boolean;
  senderId: string;
}) {
  const [name, setName] = useState<string | null>(null);
  const [senderDp, setSenderDp] = useState("");
  const router = useRouter();
  const { type } = useSelector((state: RootState) => state.users.user);
  const { _id } = useSelector((state: RootState) => state.users.user);

  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await unReadChats(senderId, _id);
      setCount(data);
    })();
  });
  useEffect(() => {
    (async () => {
      if (senderId) {
        const { data } = await getUserProfile(senderId);
        if (data) {
          if (data.firstName) {
            setName(data.firstName + " " + data.lastName);
          } else {
            setName(data.name);
          }
        }

        //get sender dp
        const res = await getUserDp(senderId);
        if (res) {
          setSenderDp(res);
        }
      }
    })();
  }, [senderId]);
  return (
    <SmnkErrorBoundary>
      <Box
        onClick={() => {
          //clickable only in chatroom
          if (isChatRoom) {
            if (type === "admin") {
              router.push(`/a-dashboard/chat/${senderId}`);
            } else {
              router.push(`/chat/${senderId}`);
            }
          }
        }}
        minWidth={"100%"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={1}
        >
          <Box display={"flex"} alignItems={"center"}>
            {senderDp ? (
              <BlackAvatar
                src={`/api/multer/profile-pic/${senderDp}`}
                alt="dp"
                width={50}
                height={50}
              />
            ) : (
              <Avatar sx={{ width: 50, height: 50 }} />
            )}

            <Badge badgeContent={count} color="error">
              <Typography sx={{ ml: "1rem", textTransform: "capitalize" }}>
                {name ?? "Admin"}
              </Typography>
            </Badge>
          </Box>
        </Box>
      </Box>
    </SmnkErrorBoundary>
  );
}

export default ChatHeader;
