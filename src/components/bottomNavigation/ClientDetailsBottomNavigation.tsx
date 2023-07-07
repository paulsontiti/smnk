import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { Rating, Typography } from "@mui/material";
export default function ClientDetailsBottomNavigation({
  jobsDone,
  rating,
}: {
  jobsDone: number;
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
        <WorkHistoryIcon color="primary" />
        <Typography variant="caption">{jobsDone}</Typography>
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
