import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getJobComments } from "./AdminJobStatus";

import ErrorAlert from "../alerts/Error";
import LoadingAlert from "../alerts/Loading";
import CommentsCard from "../card/CommentsCard";
import { SmnkErrorBoundary } from "@/pages/_app";
import InfoAlert from "../alerts/Info";

function Comments({ userId }: { userId: string }) {
  const [comments, setComments] = useState<any[] | null>(null);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    if (userId) {
      getJobComments(setComments, setError, userId);
    }
  }, [userId]);

  if (error) return <ErrorAlert message={error.toString()} />;
  if (!comments) return <LoadingAlert />;
  // if (Array.isArray(comments) && comments.length === 0)
  //   return <InfoAlert message="No Reviews" />;
  return (
    <SmnkErrorBoundary>
      <Box p={2} width={"100%"}>
        {comments.map((comment: any) => (
          <>
            {comment &&
              Array.isArray(comment.comments) &&
              comment.comments.map((comm: any) => (
                <CommentsCard key={comm && comm._id} comment={comm} />
              ))}
          </>
        ))}
      </Box>
    </SmnkErrorBoundary>
  );
}

export default Comments;
