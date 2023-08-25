import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { UserRating } from "../card/SWJobDetailsCard";
import { Wallet } from "../card/ClientDetailsDashboard";
export default function ClientDetailsBottomNavigation({
  completedJobs,
  pendingJobs,
  userId,
  forClient,
}: {
  completedJobs: number;
  forClient: boolean;
  pendingJobs: number;
  userId: string;
}) {
  return (
    <Box
      sx={{ width: "95%" }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      gap={2}
      mt={5}
      mb={5}
    >
      <Box
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
      >
        <AssignmentTurnedInIcon />
        <Typography variant="caption">{completedJobs}</Typography>
      </Box>
      <Box
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
      >
        <PendingActionsIcon />
        <Typography variant="caption">{pendingJobs}</Typography>
      </Box>

      <UserRating userId={userId} />
      {!forClient && <Wallet userId={userId} />}
    </Box>
  );
}
