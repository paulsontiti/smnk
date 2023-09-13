import { Box, Typography } from "@mui/material";
import React from "react";
import UserProfileContent from "../dialog/contents/UserProfileContent";
import { SmnkErrorBoundary } from "@/pages/_app";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function SWProfileAccordion({ userId }: { userId: string }) {
  const { user } = useSelector((state: RootState) => state.users);
  if (!userId) return <p></p>;
  return (
    <SmnkErrorBoundary>
      <Box>
        <Typography variant="subtitle1">Profile:</Typography>
        <UserProfileContent userId={userId} type={user.type} />
      </Box>
    </SmnkErrorBoundary>
  );
}

export default SWProfileAccordion;
