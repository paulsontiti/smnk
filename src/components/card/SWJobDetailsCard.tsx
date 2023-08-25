import Typography from "@mui/material/Typography";
import { Box, Card, Divider, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SmnkErrorBoundary, theme } from "@/pages/_app";
import { getUserRating } from "@/lib/utils/user";
import { useRouter } from "next/router";
import { JobDetails } from "./ClientJobDetailsCard";
import { ClientProfile } from "./ClientDetailsDashboard";

export default function SWJobDetailsCard({
  jobId,
  userId,
  forSw,
}: {
  jobId: string;
  userId: string;
  forSw: boolean;
}) {
  const router = useRouter();
  return (
    <SmnkErrorBoundary>
      <Card sx={{ minWidth: "100%", maxWidth: "100%" }}>
        <Box flexDirection={"column"}>
          <ClientProfile clientId={userId} forSw={forSw} />
        </Box>
        <Divider />
        <JobDetails jobId={jobId} />
        <Typography
          color={theme.smnk[1200]}
          variant="caption"
          fontWeight={"bold"}
        >
          {" "}
          Dispatched payments are made after a deduction of 12% administrative
          fee.{" "}
        </Typography>
      </Card>{" "}
    </SmnkErrorBoundary>
  );
}

export function UserRating({ userId }: { userId: string }) {
  const [rating, setRating] = useState<any[] | null>(null);
  useEffect(() => {
    (async () => {
      const result = await getUserRating(userId);
      result.data && setRating(result.data);
    })();
  }, [userId]);

  if (!userId || !rating)
    return (
      <Box
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
      >
        <Rating value={0} readOnly size="small" />
        <Typography variant="caption">{0}</Typography>
      </Box>
    );

  let totalRating = 0;
  rating.map((comment) => {
    totalRating += comment.rating;
  });
  const ratingAverage = totalRating / rating.length;
  return (
    <Box
      display={"flex"}
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
    >
      <Rating value={ratingAverage} readOnly size="small" />
      <Typography variant="caption">{rating.length}</Typography>
    </Box>
  );
}
