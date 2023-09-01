import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { Typography } from "@mui/material";
import { UserRating } from "../card/SWJobDetailsCard";
import { Wallet } from "../card/ClientDetailsDashboard";
export default function UserDetailsBottomNavigation({
  jobsDone,
  userId,
  level,
  forClient,
}: {
  jobsDone: number;
  forClient: boolean;
  userId: string;
  level: string;
}) {
  return (
    <Box
      sx={{ width: "95%" }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-start"}
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
        <Typography variant="caption">{level ?? "Beginner"}</Typography>
      </Box>
      {!forClient && <Wallet userId={userId} />}
    </Box>
  );
}
