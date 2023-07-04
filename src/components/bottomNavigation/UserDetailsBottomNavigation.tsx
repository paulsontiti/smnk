import Box from "@mui/material/Box";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import StarIcon from "@mui/icons-material/Star";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { Rating, Typography } from "@mui/material";
import GppBadIcon from "@mui/icons-material/GppBad";
export default function UserDetailsBottomNavigation({
  jobsDone,
  rating,
  level,
  verified,
}: {
  jobsDone: number;
  rating: number;
  level: string;
  verified: boolean;
}) {
  return (
    <Box
      sx={{ width: "95%" }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      {verified ? (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={"column"}
        >
          <VerifiedUserIcon color="primary" />
          <Typography variant="caption">Verified</Typography>
        </Box>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={"column"}
        >
          <GppBadIcon color="error" />
          <Typography variant="caption">Not Verified</Typography>
        </Box>
      )}
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={"column"}
      >
        <WorkHistoryIcon color="primary" />
        <Typography variant="caption">{jobsDone}</Typography>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={"column"}
      >
        <Rating value={rating} size="small" />
        <Typography variant="caption">Rating</Typography>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={"column"}
      >
        <StarIcon color="primary" />
        <Typography variant="caption">{level}</Typography>
      </Box>
    </Box>
  );
}
