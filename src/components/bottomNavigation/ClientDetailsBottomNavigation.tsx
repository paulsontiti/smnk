import Box from "@mui/material/Box";
import { Rating, Typography } from "@mui/material";
export default function ClientDetailsBottomNavigation({
  completedJobs,
  pendingJobs,
  rating,
}: {
  completedJobs: number;
  pendingJobs: number;
  rating: number;
}) {
  return (
    <Box
      sx={{ width: "95%" }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-start"}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        mr={1}
      >
        <Typography variant="caption">Completed Jobs</Typography>
        <Typography variant="caption">{completedJobs}</Typography>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        mr={1}
      >
        <Typography variant="caption">Pending Jobs</Typography>
        <Typography variant="caption">{pendingJobs}</Typography>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        mr={1}
      >
        <Rating value={rating} size="small" />
        <Typography variant="caption">Rating</Typography>
      </Box>
    </Box>
  );
}
