import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { getUserDp, getUserName } from "@/lib/utils/user";
import DPAvatar from "../avatar/DPAvatar";

export default function CommentsCard({ comment }: any) {
  const [dp, setDp] = useState("");
  const [rater, setRater] = useState("");

  useEffect(() => {
    (async () => {
      const name = await getUserName(comment.raterId ?? "");
      const dp = await getUserDp(comment.raterId ?? "");
      setRater(name);
      setDp(dp);
    })();
  }, [comment]);
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardHeader
        avatar={<DPAvatar dp={dp} />}
        title={rater && rater}
        subheader={
          comment.date ? new Date(comment.date).toDateString().slice(0, 10) : ""
        }
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {comment.comment}
        </Typography>
        <Rating value={comment.rating} readOnly />
      </CardContent>
    </Card>
  );
}
