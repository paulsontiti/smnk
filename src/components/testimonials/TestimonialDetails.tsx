import { getUserDp } from "@/lib/utils/user";
import { SmnkErrorBoundary } from "@/pages/_app";
import { Box, Avatar, Skeleton, Rating, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

function TestimonialDetails({ rating }: { rating: any }) {
  const [dp, setDp] = useState("");
  useEffect(() => {
    (async () => {
      if (rating) {
        const dp = await getUserDp(rating.raterId);
        setDp(dp);
      }
    })();
  }, [rating]);
  return (
    <SmnkErrorBoundary>
      <Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          {dp ? (
            <Avatar src={`/api/multer/profile-pic/${dp}`} />
          ) : (
            <Skeleton variant="circular" width={50} height={50} />
          )}
          <Rating value={rating.smnkRating} readOnly size="small" />
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            {moment(rating.createdAt).format("DD/MM/YY")}
          </Typography>
        </Box>
        <Box p="1rem">{rating.aboutSMNK}</Box>
      </Box>
    </SmnkErrorBoundary>
  );
}

export default TestimonialDetails;
