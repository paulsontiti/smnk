import { Card, CardContent, CardHeader } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getJobComments } from "./AdminJobStatus";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import ErrorAlert from "../alerts/Error";
import LoadingAlert from "../alerts/Loading";
import InfoAlert from "../alerts/Info";

function Comments() {
  const { _id } = useSelector((state: RootState) => state.users.user);

  const [comments, setComments] = useState<any[] | null>(null);
  const [error, setError] = useState();

  useEffect(() => {
    getJobComments(setComments, setError, _id);
  }, [_id]);

  if (error) return <ErrorAlert />;
  if (!comments) return <LoadingAlert />;
  if (comments.length === 0) return <InfoAlert message="No Comments" />;
  return (
    <>
      {comments.map((comment: any) => (
        <Card sx={{ marginBottom: "1rem" }} key={comment.userId}>
          <CardContent></CardContent>
        </Card>
      ))}
    </>
  );
}

export default Comments;
