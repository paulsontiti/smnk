import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Box, Typography, Rating } from "@mui/material";
import { getUserDp, getUserName } from "@/lib/utils/user";
import { BlackAvatar } from "../avatar/DashboardDp";
import { SmnkErrorBoundary } from "@/pages/_app";

export default function CommentsCard({ comment }: any) {
  const [dp, setDp] = useState("");
  const [rater, setRater] = useState("");

  useEffect(() => {
    (async () => {
      if (comment && comment.raterId) {
        const name = await getUserName(comment.raterId);
        const dp = await getUserDp(comment.raterId);
        setRater(name);
        setDp(dp);
      }
    })();
  }, [comment]);
  if (!comment) return <p></p>;
  return (
    <SmnkErrorBoundary>
      <Card sx={{ minWidth: "100%", maxWidth: "100%", mb: 1 }}>
        <CardHeader
          sx={{ alignItems: "flex-start" }}
          avatar={
            <BlackAvatar
              width={50}
              height={50}
              alt="Profice pic"
              src={`/api/multer/profile-pic/${dp}`}
            />
          }
          title={<Typography textTransform={"capitalize"}>{rater}</Typography>}
          subheader={
            <Box>
              <Rating
                readOnly
                value={comment.rating}
                size="small"
                precision={0.5}
              />
              <Typography variant="body2" color="text.secondary">
                {comment.comment}
              </Typography>
            </Box>
            // comment.date
            //   ? new Date(comment.date).toDateString().slice(0, 10)
            //   : ""
          }
        />
      </Card>
    </SmnkErrorBoundary>
  );
}
