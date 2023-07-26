import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getJobComments } from "./AdminJobStatus";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import ErrorAlert from "../alerts/Error";
import LoadingAlert from "../alerts/Loading";
import CommentsCard from "../card/CommentsCard";

function Comments() {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [comments, setComments] = useState<any[] | null>(null);
  const [error, setError] = useState();

  useEffect(() => {
    getJobComments(setComments, setError, _id);
  }, [_id]);

  if (error) return <ErrorAlert />;
  if (!comments) return <LoadingAlert />;
  if (comments.length === 0) return <p></p>;
  return (
    <>
      <Typography fontWeight={"bold"}>Comments:</Typography>
      {comments.map((comment: any) => (
        <>
          {comment.comments.map((comm: any) => (
            <CommentsCard key={comm._id} comment={comm} />
          ))}
        </>
      ))}
    </>
  );
}

export default Comments;
