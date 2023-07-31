import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
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
      <Card sx={{ maxWidth: "100%", mb: 2 }}>
        <CardHeader
          avatar={
            <BlackAvatar
              width={50}
              height={50}
              alt="Profice pic"
              src={`/api/multer/profile-pic/${dp}`}
            />
          }
          title={rater && rater}
          subheader={
            comment.date
              ? new Date(comment.date).toDateString().slice(0, 10)
              : ""
          }
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {comment.comment}
          </Typography>
          <Rating value={comment.rating} readOnly />
        </CardContent>
      </Card>
    </SmnkErrorBoundary>
  );
}
