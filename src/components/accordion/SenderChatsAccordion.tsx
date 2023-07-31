import { Box, Typography, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserInfo, getUserProfile } from "@/lib/utils/user";
import { useRouter } from "next/router";
import { SmnkErrorBoundary } from "@/pages/_app";

export default function SenderChatsAccordion({
  receiverId,
}: {
  receiverId: string;
}) {
  const [name, setName] = useState("");
  const [senderDp, setSenderDp] = useState("");
  const router = useRouter();

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
        const res = await getUserInfo(receiverId);
        if (res.data) {
          setSenderDp(res.data.dpFileName);
        }
      }
    })();
  }, [receiverId]);

  return (
    <SmnkErrorBoundary>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        p={1}
        onClick={() => {
          router.push(`/chat/${receiverId}`);
        }}
      >
        {senderDp ? (
          <Avatar src={`/uploads/images/dp/${senderDp}`} />
        ) : (
          <Avatar />
        )}
        <Typography sx={{ ml: "1rem" }}>{name}</Typography>
      </Box>
    </SmnkErrorBoundary>
  );
}
