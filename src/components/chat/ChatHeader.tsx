import { Box, Typography, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserDp, getUserProfile } from "@/lib/utils/user";
import { useRouter } from "next/router";
import { SmnkErrorBoundary } from "@/pages/_app";
import { BlackAvatar } from "../avatar/DashboardDp";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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
  const { type } = useSelector((state: RootState) => state.users.user);
  useEffect(() => {
    (async () => {
      if (receiverId) {
        const { data } = await getUserProfile(receiverId);
        if (data) {
          if (data.firstName) {
            setName(data.firstName + " " + data.lastName);
          } else {
            setName(data.name);
          }
        }

        //get sender dp
        const res = await getUserDp(receiverId);
        if (res) {
          setSenderDp(res);
        }
      }
    })();
  }, [receiverId]);
  return (
    <SmnkErrorBoundary>
      <Box
        onClick={() => {
          //clickable only in chatroom
          if (isChatRoom) {
            if (type === "admin") {
              router.push(`/a-dashboard/chat/${receiverId}`);
            } else {
              router.push(`/chat/${receiverId}`);
            }
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
            <BlackAvatar
              src={`/api/multer/profile-pic/${senderDp}`}
              alt="dp"
              width={70}
              height={70}
            />

            {name && (
              <Typography sx={{ ml: "1rem", textTransform: "capitalize" }}>
                {name}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </SmnkErrorBoundary>
  );
}

export default ChatHeader;
