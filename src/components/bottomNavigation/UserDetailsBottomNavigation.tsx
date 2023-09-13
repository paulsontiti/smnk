import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { Typography, ListItemButton, Chip, ListItemText } from "@mui/material";
import { UserRating } from "../card/SWJobDetailsCard";
import { Wallet } from "../card/ClientDetailsDashboard";
import { useState, useEffect } from "react";
import { getUserSub } from "@/lib/user";
export default function UserDetailsBottomNavigation({
  jobsDone,
  userId,
  forClient,
}: {
  jobsDone: number;
  forClient: boolean;
  userId: string;
}) {
  const level = () => {
    switch (true) {
      case jobsDone < 11:
        return "Beginner";
      case jobsDone > 10 && jobsDone < 26:
        return "Advanced";
      case jobsDone > 25 && jobsDone < 41:
        return "Proficient";
      case jobsDone > 40:
        return "Expert";
      default:
        return "Beginner";
    }
  };
  return (
    <Box
      sx={{ minWidth: "100%" }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      flexWrap={"wrap"}
      p={2}
      gap={2}
    >
      <Box
        display={"flex"}
        alignItems={"flex-end"}
        justifyContent={"center"}
        gap={1}
      >
        <WorkHistoryIcon color="primary" />
        <Typography variant="caption">{jobsDone}</Typography>
      </Box>
      <UserRating userId={userId} />
      <Box display={"flex"} alignItems={"flex-end"} justifyContent={"center"}>
        <StarIcon color="primary" />
        <Typography variant="caption">{level()}</Typography>
      </Box>
      {!forClient && <Wallet userId={userId} />}
      <SMNKRating userId={userId} />
    </Box>
  );
}

export function SMNKRating({ userId }: { userId: string }) {
  const [subType, setSubType] = useState("Free");
  useEffect(() => {
    (async () => {
      const sub = await getUserSub(userId);
      setSubType(sub.type);
    })();
  }, [userId]);
  if (subType && subType.toLowerCase() === "free") return <p></p>;
  return (
    <Box position={"relative"}>
      <ListItemText
        primary={<Typography variant="caption">SMNK Rating</Typography>}
      />
      <Chip
        color="primary"
        sx={{
          fontSize: ".6rem",
          position: "absolute",
          top: -8,
          ml: 8,
        }}
        label={subType}
        size="small"
      />
    </Box>
  );
}
