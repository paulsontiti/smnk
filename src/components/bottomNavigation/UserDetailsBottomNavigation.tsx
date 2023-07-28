import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { Rating, Typography } from "@mui/material";
export default function UserDetailsBottomNavigation({
  jobsDone,
  rating,
  level,
}: {
  jobsDone: number;
  rating: number;
  level: string;
}) {
  return (
    <Box
      sx={{ width: "95%" }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      p={2}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={"column"}
        mr={2}
      >
        <WorkHistoryIcon color="primary" />
        <Typography variant="caption">{jobsDone}</Typography>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={"column"}
        mr={2}
      >
        <Rating value={rating} size="small" />
        <Typography variant="caption">Rating</Typography>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={"column"}
        mr={2}
      >
        <StarIcon color="primary" />
        <Typography variant="caption">{level ?? "Beginner"}</Typography>
      </Box>
    </Box>
  );
}
