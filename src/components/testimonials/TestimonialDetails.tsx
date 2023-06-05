import { getUserDp } from "@/lib/utils/user";
import { Box, Avatar, Skeleton,Rating,Typography } from "@mui/material";
import moment from "moment";
import useSWR from "swr";

function TestimonialDetails({ rating }: { rating: any }) {
  const res = useSWR("getDp", getUserDp(rating.raterId));
  const dp = res.data;

  return (
    <Box>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
        {dp ? (
          <Avatar src={`/api/multer/profile-pic/${dp}`} />
        ) : (
          <Skeleton variant="circular" width={50} height={50} />
        )}
        <Rating value={rating.smnkRating} readOnly size="small"/>
        <Typography variant="caption" sx={{fontWeight:'bold'}}>{moment(rating.createdAt).format("DD/MM/YY")}</Typography>
      </Box>
      <Box p='1rem'>{rating.aboutSMNK}</Box>
    </Box>
  );
}

export default TestimonialDetails;
